/* ============================================================
   LAG — the distance between working and shipping.
   ============================================================ */

import { app } from "../core/app.js";

const GUTTER = 216;
const PAD_R = 26;
const ROW = 15;
const BAR = 7;
const HEAD = 40;

const REASON_COLOUR = {
  unsolved: "var(--mag)", tooling: "var(--ind)", economics: "var(--cu)",
  scale: "var(--pls)", demand: "var(--brs)"
};

let D = null, events = [], svg = null;
let W = 1200, chartW = 960;
let year = 2026, playing = null, focused = null;
let layers = { reason: false, long: false, sortLag: false };

const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
const lagOf = e => (e.shipped == null ? null : e.shipped - e.invented);

export function stats(data = D) {
  const E = data.events, shipped = E.filter(e => e.shipped != null);
  const med = a => {
    const s = a.slice().sort((x, y) => x - y);
    return s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2;
  };
  const band = (lo, hi) => {
    const g = shipped.filter(e => e.stratum >= lo && e.stratum <= hi);
    return { n: g.length, median: med(g.map(e => e.shipped - e.invented)) };
  };
  const long = shipped.filter(e => e.shipped - e.invented >= 15);
  return {
    total: E.length,
    shipped: shipped.length,
    open: E.length - shipped.length,
    median: med(shipped.map(e => e.shipped - e.invented)),
    deep: band(1, 9), middle: band(10, 18), shallow: band(19, 27),
    long: long.length,
    longUnsolved: long.filter(e => e.waitedFor === "unsolved").length
  };
}

export function landedBy(y, data = D) {
  const strata = {};
  for (const e of data.events) {
    const s = (strata[e.stratum] = strata[e.stratum] || { n: 0, in: 0 });
    s.n++;
    if (e.shipped != null && e.shipped <= y) s.in++;
  }
  const lit = Object.values(strata).filter(s => s.in > 0).length;
  return { strata, lit, of: Object.keys(strata).length };
}

const x = y => GUTTER + ((y - D.meta.span[0]) / (D.meta.span[1] - D.meta.span[0])) * chartW;

function ordered() {
  const list = events.slice();
  if (layers.sortLag) {
    return list.sort((a, b) => {
      const la = lagOf(a), lb = lagOf(b);
      if (la == null && lb == null) return a.invented - b.invented;
      if (la == null) return -1;
      if (lb == null) return 1;
      return lb - la;
    });
  }
  return list.sort((a, b) => a.stratum - b.stratum || a.invented - b.invented);
}

function colourOf(e) {
  if (layers.reason) return REASON_COLOUR[e.waitedFor] || "var(--ash)";
  return app.col(e.stratum);
}

function paint() {
  const rows = ordered();
  const H = HEAD + rows.length * ROW + 16;
  svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
  svg.setAttribute("height", H);

  let ax = "";
  const [y0, y1] = D.meta.span;
  for (let y = Math.ceil(y0 / 10) * 10; y <= y1; y += 10) {
    ax += `<line class="tml__grid" x1="${x(y)}" y1="${HEAD - 12}" x2="${x(y)}" y2="${H - 10}"/>`;
    ax += `<text class="tml__tick" x="${x(y)}" y="${HEAD - 18}" text-anchor="middle">${y}</text>`;
  }
  ax += `<line class="tml__now" x1="${x(D.meta.now)}" y1="${HEAD - 16}" x2="${x(D.meta.now)}" y2="${H - 10}"/>`;
  ax += `<text class="tml__nowt" x="${x(D.meta.now) + 5}" y="${HEAD - 18}">now</text>`;
  ax += `<line class="tml__head" x1="${x(year)}" y1="${HEAD - 16}" x2="${x(year)}" y2="${H - 10}"/>`;

  let out = "";
  rows.forEach((e, i) => {
    const yTop = HEAD + i * ROW;
    const cy = yTop + ROW / 2;
    const c = colourOf(e);
    const lag = lagOf(e);
    const clamped = e.invented < y0;

    const started = e.invented <= year;
    const landed = e.shipped != null && e.shipped <= year;
    const dim = layers.long && lag != null && lag < 15;

    const x0 = Math.max(GUTTER, x(e.invented));
    const xEnd = e.shipped == null ? x(D.meta.now) : x(e.shipped);
    const xNow = Math.min(xEnd, x(year));

    out += `<g class="tml__r${focused === e.id ? " on" : ""}" data-id="${e.id}"
              opacity="${!started ? 0.13 : dim ? 0.22 : 1}">
              <rect class="tml__hit" x="0" y="${yTop}" width="${W}" height="${ROW}"/>`;

    out += `<text class="tml__l" x="${GUTTER - 12}" y="${cy + 3.5}" text-anchor="end">${esc(e.label)}</text>
            <rect class="tml__pip" x="8" y="${cy - 4}" width="4" height="8" fill="${app.col(e.stratum)}"/>
            <text class="tml__s" x="20" y="${cy + 3.5}">${app.pad(e.stratum)}</text>`;

    if (started) {
      out += `<rect class="tml__track" x="${x0}" y="${cy - BAR / 2}"
                width="${Math.max(1, xEnd - x0)}" height="${BAR}" fill="${c}"/>`;
      out += `<rect class="tml__fill" x="${x0}" y="${cy - BAR / 2}"
                width="${Math.max(1, xNow - x0)}" height="${BAR}" fill="${c}"/>`;

      if (clamped)
        out += `<path class="tml__cap" d="M${x0} ${cy - BAR / 2 - 2}l-7 ${BAR / 2 + 2}l7 ${BAR / 2 + 2}z" fill="${c}"/>`;

      if (e.shipped == null) {
        out += `<path class="tml__open" d="M${xEnd} ${cy}h14m-4 -4l4 4l-4 4" stroke="${c}"/>`;
      } else if (landed) {
        out += `<rect class="tml__land" x="${xEnd - 1.5}" y="${cy - BAR / 2 - 3}" width="3" height="${BAR + 6}" fill="${c}"/>`;
      }

      if (lag != null && (landed || !layers.long))
        out += `<text class="tml__y" x="${xEnd + 8}" y="${cy + 3.5}" fill="${c}">${lag}y</text>`;
    }
    out += `</g>`;
  });

  svg.innerHTML = ax + out;
  svg.querySelectorAll(".tml__r").forEach(g =>
    g.addEventListener("click", () => detail(g.dataset.id)));

  strip();
}

function strip() {
  const { strata, lit } = landedBy(year);
  const host = document.getElementById("tmlStrata");
  if (!host) return;
  host.innerHTML = app.L.map(l => {
    const s = strata[l.n] || { n: 0, in: 0 };
    const on = s.in > 0;
    return `<div class="tml__st ${on ? "on" : ""}" style="--c:${l.c}" title="${app.pad(l.n)} ${l.t}">
              <b>${app.pad(l.n)}</b>
            </div>`;
  }).join("");

  const yEl = document.getElementById("tmlYear");
  if (yEl) yEl.textContent = String(year);
}

function detail(id) {
  focused = id;
  const e = events.find(x => x.id === id);
  const panel = document.getElementById("tmlPanel");
  if (!panel || !e) return;

  const st = e.station && app.byId[e.station];
  const lag = lagOf(e);
  const wait = D.meta.waitedFor.find(w => w.id === e.waitedFor);

  panel.innerHTML = `
    <div class="atl__pk">
      <b class="atl__pno">${e.invented} → ${e.shipped || "present"}</b>
      <span class="tag" style="--c:${app.col(e.stratum)}">${st ? `${app.pad(st.L)} ${st.n}` : `Stratum ${app.pad(e.stratum)}`}</span>
      <span class="atl__prec atl__prec--${e.confidence}">${e.confidence} · ${lag != null ? `${lag} yr lag` : "In progress"}</span>
    </div>
    <h3 class="atl__pn">${esc(e.label)}</h3>
    <p class="atl__ps"><b>Waited for: ${wait ? wait.label : e.waitedFor}</b> — ${wait ? wait.note : ""}</p>
    <p class="atl__pb">${esc(e.note)}</p>
    ${e.source ? `<p class="cas__cite" style="margin-top:10px"><a href="${e.source.url}" target="_blank" rel="noopener">${esc(e.source.who)} — ${esc(e.source.what)} ↗</a></p>` : ""}
    ${st ? `<button class="btn btn--p" data-open="${st.i}" style="margin-top:14px">Open ${st.n} station →</button>` : ""}`;

  const ob = panel.querySelector("[data-open]");
  if (ob) ob.addEventListener("click", () => app.openStation(ob.dataset.open));
  paint();
}

function togglePlay() {
  const btn = document.getElementById("tmlPlay");
  if (playing) {
    clearInterval(playing);
    playing = null;
    if (btn) btn.textContent = "Play history";
    return;
  }
  if (btn) btn.textContent = "Pause";
  year = D.meta.span[0];
  playing = setInterval(() => {
    year++;
    if (year > D.meta.span[1]) {
      year = D.meta.span[1];
      togglePlay();
    }
    const r = document.getElementById("tmlRange");
    if (r) r.value = String(year);
    paint();
  }, 180);
}

export async function initTimeline() {
  svg = document.getElementById("tmlSvg");
  const r = await fetch(new URL("../../data/static/timeline.json", import.meta.url));
  if (!r.ok) throw new Error("Could not load timeline.json");
  D = await r.json();
  events = D.events;

  const st = stats(D);
  const sumEl = document.getElementById("tmlSummary");
  if (sumEl) {
    sumEl.innerHTML = `<b>${st.median} years</b> median lag between working prototype and industrial volume. Deep hardware base median lag: <b>${st.deep.median} years</b>; middle compute: <b>${st.middle.median} years</b>; shallow software & AI: <b>${st.shallow.median} years</b>.`;
  }

  const range = document.getElementById("tmlRange");
  if (range) {
    range.min = String(D.meta.span[0]);
    range.max = String(D.meta.span[1]);
    range.value = String(year);
    range.addEventListener("input", e => {
      year = +e.target.value;
      paint();
    });
  }

  const playBtn = document.getElementById("tmlPlay");
  if (playBtn) playBtn.addEventListener("click", togglePlay);

  const sortBtn = document.getElementById("tmlSort");
  if (sortBtn) sortBtn.addEventListener("click", () => {
    layers.sortLag = !layers.sortLag;
    sortBtn.setAttribute("aria-pressed", String(layers.sortLag));
    paint();
  });

  const reasonBtn = document.getElementById("tmlReason");
  if (reasonBtn) reasonBtn.addEventListener("click", () => {
    layers.reason = !layers.reason;
    reasonBtn.setAttribute("aria-pressed", String(layers.reason));
    paint();
  });

  paint();
  if (events[0]) detail(events[0].id);
}
