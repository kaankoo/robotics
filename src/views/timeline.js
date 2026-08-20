/* ============================================================
   TIMELINE (LAG) — capabilities and the years they waited.
   ============================================================ */

import { app } from "../core/app.js";

const REASON_COLOUR = {
  science: "var(--pls)",
  machine: "var(--brs)",
  application: "var(--ok)",
  compute: "var(--ind)",
  market: "var(--mag)"
};

let D = null, svg = null;
let events = [];
let year = 2026;
let playing = null;
let focused = null;
let W = 1200, H = 540;

const layers = { reason: false, long: false, sortLag: false };

function lagOf(e) {
  if (e.shipped == null) return null;
  return e.shipped - e.invented;
}

function landedBy(y) {
  const byStratum = {};
  let lit = 0;
  for (let l = 1; l <= app.L.length; l++) {
    const list = events.filter(e => e.stratum === l);
    const inCount = list.filter(e => e.invented <= y).length;
    if (inCount > 0) lit++;
    byStratum[l] = { in: inCount, n: list.length || 1 };
  }
  return { strata: byStratum, lit, of: app.L.length };
}

function strip() {
  const { strata, lit, of } = landedBy(year);
  const host = document.getElementById("tmlStrip");
  if (host) {
    host.innerHTML = app.L.map(l => {
      const s = strata[l.n];
      const frac = s ? s.in / s.n : 0;
      return `<i title="${app.pad(l.n)} ${esc(l.t)} — ${s ? s.in : 0} of ${s ? s.n : 0} landed by ${year}"
                style="--c:${l.c};opacity:${(0.1 + frac * 0.9).toFixed(2)}"></i>`;
    }).join("");
  }
  const yrEl = document.getElementById("tmlYear");
  if (yrEl) yrEl.textContent = year;
  const litEl = document.getElementById("tmlLit");
  if (litEl) litEl.innerHTML = `<b>${lit}</b> of <b>${of}</b> strata had something working`;
}

function paint() {
  if (!svg) return;
  strip();

  let list = [...events];
  if (layers.sortLag) {
    list.sort((a, b) => (lagOf(b) ?? 999) - (lagOf(a) ?? 999));
  }

  const [minY, maxY] = D.meta.span;
  const span = maxY - minY;
  const xOf = y => 180 + ((Math.max(minY, Math.min(maxY, y)) - minY) / span) * (W - 220);

  const rowH = 26;
  H = Math.max(480, list.length * rowH + 60);
  svg.setAttribute("viewBox", `0 0 ${W} ${H}`);

  let out = `<g class="tml__grid">`;
  for (let y = minY; y <= maxY; y += 10) {
    const x = xOf(y);
    out += `<line x1="${x}" y1="20" x2="${x}" y2="${H - 20}" stroke="var(--line)" stroke-dasharray="2 4" />
            <text x="${x}" y="${H - 6}" text-anchor="middle" font-size="10" fill="var(--ash)">${y}</text>`;
  }
  out += `</g>`;

  // Current year marker
  const curX = xOf(year);
  out += `<line x1="${curX}" y1="20" x2="${curX}" y2="${H - 20}" stroke="var(--pls)" stroke-width="1.5" />`;

  out += `<g class="tml__rows">`;
  list.forEach((e, i) => {
    const y = 36 + i * rowH;
    const x1 = xOf(e.invented);
    const x2 = e.shipped != null ? xOf(e.shipped) : xOf(maxY);
    const col = layers.reason ? (REASON_COLOUR[e.waitedFor] || "var(--ash)") : app.col(e.stratum);
    const lag = lagOf(e);
    const isDim = layers.long && lag != null && lag < 25;
    const isFoc = focused === e.id;

    out += `<g class="tml__r" data-id="${e.id}" transform="translate(0,${y})" style="cursor:pointer;opacity:${isDim ? 0.2 : 1}">
      <text x="160" y="14" text-anchor="end" font-size="11" fill="${isFoc ? "var(--qz)" : "var(--ash2)"}" font-weight="${isFoc ? "600" : "400"}">${esc(e.label)}</text>
      <rect x="${x1}" y="4" width="${Math.max(4, x2 - x1)}" height="12" rx="3" fill="${col}" fill-opacity="${e.invented <= year ? 0.85 : 0.2}" />
      ${e.shipped == null ? `<path d="M${x2 + 4} 10l-4-4v8z" fill="${col}" />` : ""}
      <text x="${x2 + 8}" y="14" font-size="10" fill="var(--ash)">${lag != null ? `${lag}y` : "—"}</text>
    </g>`;
  });
  out += `</g>`;

  svg.innerHTML = out;

  svg.querySelectorAll(".tml__r").forEach(g => {
    g.addEventListener("click", () => detail(g.dataset.id));
  });
}

function detail(id) {
  const e = events.find(v => v.id === id);
  if (!e) return;
  focused = id;
  app.depth("tml", e.stratum);

  const st = app.byId[e.station];
  const conf = (D.meta.confidence || []).find(c => c.id === e.confidence);
  const why = (D.meta.waitedFor || []).find(c => c.id === e.waitedFor);
  const lag = lagOf(e);

  document.getElementById("tmlPanel").innerHTML = `
    <div class="tml__pk">
      <span>${e.invented}${e.shipped == null ? " → not shipped" : ` → ${e.shipped}`}</span>
      ${lag == null ? `<b class="tml__lag tml__lag--open">no end date</b>`
                    : `<b class="tml__lag">${lag} year${lag === 1 ? "" : "s"}</b>`}
      <b class="tml__conf tml__conf--${e.confidence}" title="${esc(conf ? conf.note : "")}">${conf ? conf.label : e.confidence}</b>
    </div>
    <h3 class="atl__pn">${esc(e.label)}</h3>
    <p class="atl__ps">${app.pad(e.stratum)} · ${esc(app.lname(e.stratum))}${e.invented < D.meta.span[0] ? ` · demonstrated in ${e.invented}, before chart begins` : ""}</p>
    <p class="atl__pb">${esc(e.note)}</p>
    ${why ? `<p class="atl__pr"><i style="background:${REASON_COLOUR[e.waitedFor]}"></i>
      <b>Waited for ${esc(why.label.toLowerCase())}:</b> ${esc(why.note)}</p>` : ""}
    ${e.source ? `<p class="cas__cite">${e.source.url
      ? `<a href="${e.source.url}" target="_blank" rel="noopener">${esc(e.source.who)} — ${esc(e.source.what || "")} ↗</a>`
      : `${esc(e.source.who)} — ${esc(e.source.what || "")}`}</p>` : ""}
    ${st ? `<div class="atl__pl"><button class="cas__st" data-station="${e.station}" style="--c:${app.col(st.L)}">
      <b>${app.pad(st.L)}</b>${esc(st.n)}</button></div>` : ""}`;

  const b = document.querySelector("#tmlPanel [data-station]");
  if (b) b.addEventListener("click", () => app.openStation(b.dataset.station));
  paint();
}

function goTo(id) {
  const e = events.find(v => v.id === id);
  if (!e) return;
  setYear(D.meta.now);
  detail(id);
  document.querySelector(`#tmlSvg [data-id="${id}"]`)?.scrollIntoView({ block: "center", behavior: app.RM ? "auto" : "smooth" });
}

function setYear(y) {
  year = Math.max(D.meta.span[0], Math.min(D.meta.now, Math.round(y)));
  const range = document.getElementById("tmlRange");
  if (range) range.value = String(year);
  paint();
}

function play() {
  if (playing) { stop(); return; }
  if (year >= D.meta.now) setYear(D.meta.span[0]);
  const btn = document.getElementById("tmlPlay");
  if (btn) btn.textContent = "Pause";
  playing = setInterval(() => {
    if (year >= D.meta.now) { stop(); return; }
    setYear(year + 1);
  }, app.RM ? 20 : 90);
}

function stop() {
  clearInterval(playing);
  playing = null;
  const btn = document.getElementById("tmlPlay");
  if (btn) btn.textContent = "Sweep 1954 → now";
}

function layerControls() {
  const host = document.getElementById("tmlLayers");
  if (!host) return;
  const LAYERS = [
    ["reason", "What it waited for", "Colour by bottleneck category rather than stratum."],
    ["long", "Only the long waits", "Dim everything that shipped within 25 years."],
    ["sortLag", "Sort by wait", "Reorder longest wait first, instead of by depth in the stack."]
  ];
  host.innerHTML = LAYERS.map(([id, label, title]) =>
    `<button class="atl__chip" data-layer="${id}" aria-pressed="${layers[id]}" title="${title}">${label}</button>`).join("");

  host.querySelectorAll(".atl__chip").forEach(b =>
    b.addEventListener("click", () => {
      const id = b.dataset.layer;
      layers[id] = !layers[id];
      b.setAttribute("aria-pressed", String(layers[id]));
      paint();
    }));

  const legend = document.getElementById("tmlLegend");
  if (legend) {
    legend.innerHTML = Object.entries(REASON_COLOUR).map(([k, c]) =>
      `<span><i style="background:${c}"></i>${k}</span>`).join("");
  }
}

function size() {
  if (!svg) return;
  const r = svg.getBoundingClientRect();
  W = Math.max(360, r.width || 1200);
  paint();
}

const esc = s => (s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;");

export async function initTimeline() {
  const url = new URL("../../data/static/timeline.json", import.meta.url);
  const r = await fetch(url);
  if (!r.ok) throw new Error(`Could not load timeline.json (${r.status})`);
  D = await r.json();
  events = D.events || [];

  svg = document.getElementById("tmlSvg");

  const range = document.getElementById("tmlRange");
  if (range) {
    range.min = String(D.meta.span[0]);
    range.max = String(D.meta.span[1]);
    range.value = String(year);
    range.addEventListener("input", e => setYear(+e.target.value));
  }

  const playBtn = document.getElementById("tmlPlay");
  if (playBtn) playBtn.addEventListener("click", play);

  layerControls();

  addEventListener("resize", () => {
    if (document.getElementById("v-tml").classList.contains("on")) size();
  });

  app.lagGoTo = goTo;
  app.lagFit = size;
  size();
  if (events[0]) detail(events[0].id);
}
