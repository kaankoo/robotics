/* ============================================================
   RULER — seventeen orders of magnitude, drawn to true scale.
   ============================================================ */

import { app } from "../core/app.js";
import { drawGlyph } from "../lib/glyphs.js";

const NS = "http://www.w3.org/2000/svg";

const PX_DECADE = 560;   // horizontal pixels per power of ten
const REF = 130;         // pixels an object measures when centred
const MIN_PX = 1.1;      // below this it is not worth drawing
const MAX_PX = 1000;

const LANES = 5;
const SPREAD = 0.88;     // share of the stage the tracks span
const SETTLE = 1.9;      // stage-heights at which a shape is fully recentred
const WHEEL_PX = 0.48;   // pixels of travel per wheel unit

/* SI ladder for the readout */
const SI = [
  [-12, "pm"], [-9, "nm"], [-6, "µm"], [-3, "mm"], [0, "m"], [3, "km"], [6, "Mm"]
];

let D = null, svg = null, stage = null, gWorld = null, gAxis = null;
let z = -5.3, target = -5.3, raf = null, dragging = null;
let objects = [];
let W = 1200, H = 560;
let sweeping = null;

/* ---------- formatting ---------- */

export function metres(v) {
  const e = Math.floor(Math.log10(Math.abs(v)));
  let [exp, unit] = SI[0];
  for (const [x, u] of SI) if (e >= x) { exp = x; unit = u; }
  const n = v / Math.pow(10, exp);
  const s = n >= 100 ? n.toFixed(0) : n >= 10 ? n.toFixed(1) : n >= 1 ? n.toFixed(2) : n.toFixed(3);
  const t = s.includes(".") ? s.replace(/0+$/, "").replace(/\.$/, "") : s;
  return `${t} ${unit}`;
}

function decadeLabel(e) {
  let [exp, unit] = SI[0];
  for (const [x, u] of SI) if (e >= x) { exp = x; unit = u; }
  const n = Math.pow(10, e - exp);
  return `${n >= 1000 ? n.toExponential(0) : n} ${unit}`;
}

/* ---------- camera ---------- */

const clamp = v => Math.max(D.meta.span[0], Math.min(D.meta.span[1], v));

function glide(to) {
  target = clamp(to);
  if (raf) return;
  const step = () => {
    const d = target - z;
    if (Math.abs(d) < 1e-4) { z = target; raf = null; paint(); return; }
    z += d * (app.RM ? 1 : 0.16);
    paint();
    raf = requestAnimationFrame(step);
  };
  raf = requestAnimationFrame(step);
}

function jump(to) { endSweep(); if (raf) { cancelAnimationFrame(raf); raf = null; } glide(to); }

function focus(id) {
  const o = objects.find(x => x.id === id);
  if (!o) return;
  jump(o.lg);
  detail(o);
}

function lane(o, px) {
  const mid = (H - 60) / 2;
  const band = (H - 96) * SPREAD;
  const u = o.lane / (LANES - 1) - 0.5;
  const room = Math.max(0, 1 - px / (H * SETTLE));
  return mid + u * band * room;
}

export function place(o, zNow = z) {
  const rel = o.lg - zNow;
  const px = REF * Math.pow(10, rel);
  const x = W / 2 + rel * PX_DECADE;
  let op = 1;
  if (px < MIN_PX * 6) op = Math.max(0, (px - MIN_PX) / (MIN_PX * 5));
  if (px > MAX_PX * 0.55) op = Math.max(0, 1 - (px - MAX_PX * 0.55) / (MAX_PX * 0.45));
  const visible = px >= MIN_PX && px <= MAX_PX && x > -px && x < W + px;
  return { rel, px, x, op, visible };
}

function paint() {
  if (!gAxis || !gWorld) return;

  /* --- axis --- */
  let ax = "";
  const from = Math.ceil(z - W / 2 / PX_DECADE), to = Math.floor(z + W / 2 / PX_DECADE);
  for (let e = from; e <= to; e++) {
    const x = W / 2 + (e - z) * PX_DECADE;
    const major = ((e % 3) + 3) % 3 === 0;
    ax += `<line x1="${x}" y1="${H - 34}" x2="${x}" y2="${H - (major ? 20 : 27)}"
             stroke="var(--line2)" stroke-width="1" stroke-opacity="${major ? 1 : .55}"/>`;
    ax += `<text class="rul__tick${major ? " rul__tick--m" : ""}" x="${x}" y="${H - 8}"
             text-anchor="middle">${decadeLabel(e)}</text>`;
  }
  ax += `<line x1="0" y1="${H - 34}" x2="${W}" y2="${H - 34}" stroke="var(--line)" stroke-width="1"/>`;
  ax += `<path d="M${W / 2} ${H - 44}l5 9h-10z" fill="var(--pls)"/>`;
  gAxis.innerHTML = ax;

  /* --- objects with collision avoidance --- */
  let out = "";
  let focal = null, best = Infinity;

  const taken = [];
  const free = (x0, x1, y) => !taken.some(q => x0 < q.x1 && x1 > q.x0 && Math.abs(q.y - y) < 15);
  const claim = (x0, x1, y) => { taken.push({ x0, x1, y }); return y; };

  for (const o of objects) {
    const p = place(o);
    if (!p.visible || p.op <= 0) continue;
    const d = Math.abs(p.rel);
    if (d < best) { best = d; focal = o; }

    const s = p.px / 100;
    const cy = lane(o, p.px);

    out += `<g class="rul__o rul__obj" data-id="${o.id}" opacity="${p.op.toFixed(3)}"
              transform="translate(${x2(p.x)},${cy})">
              <g transform="translate(${-p.px / 2},${-p.px / 2}) scale(${s})">${o.svg}</g>`;

    const half = Math.max(p.px, 6) / 2;
    const named = p.px > 26;
    if ((named || p.px > 5) && p.x > 24 && p.x < W - 24) {
      const labelText = o.label || o.name || "";
      const w = (named ? labelText.length * 6.6 : metres(o.m).length * 6) / 2 + 6;
      const x0 = p.x - w, x1 = p.x + w;
      const rungs = named
        ? [-half - 15, half + 27, -half - 39, half + 51, -half + 26, half - 14]
        : [-half - 6, half + 12, -half - 24, half + 30];
      const top = 14, floor = H - 50;
      let y = rungs.find(r => cy + r > top && cy + r < floor && free(x0, x1, cy + r));
      if (y === undefined) y = Math.min(floor - cy, Math.max(top - cy, rungs[0]));
      claim(x0, x1, cy + y);
      const under = y > 0;

      out += named
        ? (under
          ? `<text class="rul__m" x="0" y="${y - 13}" text-anchor="middle">${metres(o.m)}</text>
             <text class="rul__n" x="0" y="${y}" text-anchor="middle">${esc(labelText)}</text>`
          : `<text class="rul__n" x="0" y="${y}" text-anchor="middle">${esc(labelText)}</text>
             <text class="rul__m" x="0" y="${y + 12}" text-anchor="middle">${metres(o.m)}</text>`)
        : `<text class="rul__m" x="0" y="${y}" text-anchor="middle">${metres(o.m)}</text>`;
    }
    out += `</g>`;
  }

  gWorld.innerHTML = out;
  gWorld.querySelectorAll(".rul__o").forEach(g =>
    g.addEventListener("click", () => focus(g.dataset.id)));

  const scaleEl = document.getElementById("rulScale");
  if (scaleEl) scaleEl.textContent = metres(Math.pow(10, z));
  const rangeEl = document.getElementById("rulRange");
  if (rangeEl) rangeEl.value = String(z);
  if (focal) detail(focal);
}

const x2 = v => Math.round(v * 100) / 100;
const esc = s => String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;");

/* ---------- detail panel ---------- */

let shown = null;
function detail(o) {
  if (shown === o.id) return;
  shown = o.id;

  const st = app.byId[o.station];
  if (st) app.depth("rul", st.L);

  const precision = {
    exact: "defined physical quantity or standard",
    typical: "representative production value",
    approx: "order of magnitude",
    area: "geographic district or facility envelope"
  };

  const labelText = o.label || o.name || "";
  const descText = o.note || o.desc || o.sub || "";

  document.getElementById("rulPanel").innerHTML = `
    <div class="atl__pk">
      <span>10<sup>${o.lg.toFixed(1)}</sup> m</span>
      <b class="atl__prec atl__prec--${o.precision || "typical"}" title="${esc(precision[o.precision] || "")}">${o.precision || "typical"}</b>
    </div>
    <h3 class="atl__pn">${esc(labelText)}</h3>
    <p class="atl__ps">${metres(o.m)} · ${esc(o.sub || "")}</p>
    <p class="atl__pb">${esc(descText)}</p>
    ${o.source ? `<p class="cas__cite">${o.source.url
      ? `<a href="${o.source.url}" target="_blank" rel="noopener">${esc(o.source.who)} — ${esc(o.source.what || "")} ↗</a>`
      : `${esc(o.source.who)} — ${esc(o.source.what || "")}`}</p>` : ""}
    ${st ? `<div class="atl__pl"><button class="cas__st" data-station="${o.station}" style="--c:${app.col(st.L)}">
      <b>${app.pad(st.L)}</b>${esc(st.n)}</button></div>` : ""}`;

  const b = document.querySelector("#rulPanel [data-station]");
  if (b) b.addEventListener("click", () => app.openStation(b.dataset.station));
}

function sweep() {
  if (sweeping) { endSweep(); return; }
  jump(D.meta.span[0]);
  const btn = document.getElementById("rulSweep");
  if (btn) { btn.classList.add("on"); btn.textContent = "pause"; }
  const start = performance.now();
  const dur = app.RM ? 4000 : 28000;
  const from = D.meta.span[0], span = D.meta.span[1] - from;
  const tick = now => {
    const u = Math.min(1, (now - start) / dur);
    z = from + span * u;
    target = z;
    paint();
    if (u < 1) sweeping = requestAnimationFrame(tick);
    else endSweep();
  };
  sweeping = requestAnimationFrame(tick);
}

function endSweep() {
  if (sweeping) { cancelAnimationFrame(sweeping); sweeping = null; }
  const btn = document.getElementById("rulSweep");
  if (btn) { btn.classList.remove("on"); btn.textContent = "sweep the full stack"; }
}

function stops() {
  const host = document.getElementById("rulStops");
  if (!host) return;
  host.innerHTML = (D.stops || []).map(st => {
    const targetObj = objects.find(o => o.id === st.id);
    const zVal = targetObj ? targetObj.lg : (st.z || 0);
    return `<button class="rul__stop" data-z="${zVal}"><b>${esc(st.label || st.name)}</b><span>${esc(st.sub)}</span></button>`;
  }).join("");

  host.querySelectorAll(".rul__stop").forEach(b =>
    b.addEventListener("click", () => jump(+b.dataset.z)));
}

function size() {
  if (!svg) return;
  const r = svg.getBoundingClientRect();
  W = Math.max(360, r.width || 1200);
  H = Math.max(380, r.height || 560);
  svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
  paint();
}

export async function initRuler() {
  const r = await fetch(new URL("../../data/static/ruler.json", import.meta.url));
  D = await r.json();

  svg = document.getElementById("rulSvg");
  stage = svg.parentElement;
  svg.innerHTML = "";
  gWorld = document.createElementNS(NS, "g");
  gAxis = document.createElementNS(NS, "g");
  svg.appendChild(gWorld);
  svg.appendChild(gAxis);

  objects = (D.objects || []).slice().sort((a, b) => a.m - b.m).map((o, i) => {
    const cycle = (LANES - 1) * 2;
    const pos = i % cycle;
    const track = pos < LANES ? pos : cycle - pos;
    const st = app.byId[o.station];
    const col = st ? app.col(st.L) : "var(--pls)";
    return {
      ...o,
      lg: Math.log10(o.m),
      lane: track,
      svg: drawGlyph(o.glyph, col, o.sub)
    };
  });

  stops();

  svg.addEventListener("wheel", e => {
    e.preventDefault();
    endSweep();
    const dz = (e.deltaX + e.deltaY) * 0.0016;
    jump(z + dz);
  }, { passive: false });

  svg.addEventListener("pointerdown", e => {
    dragging = { x: e.clientX, z };
    svg.setPointerCapture(e.pointerId);
    svg.classList.add("drag");
  });
  svg.addEventListener("pointermove", e => {
    if (!dragging) return;
    const dx = e.clientX - dragging.x;
    jump(dragging.z - dx / PX_DECADE);
  });
  const stop = () => { dragging = null; svg.classList.remove("drag"); };
  svg.addEventListener("pointerup", stop);
  svg.addEventListener("pointercancel", stop);

  const range = document.getElementById("rulRange");
  if (range) {
    range.min = String(D.meta.span[0]);
    range.max = String(D.meta.span[1]);
    range.step = "0.01";
    range.addEventListener("input", () => jump(+range.value));
  }

  document.getElementById("rulSweep")?.addEventListener("click", sweep);

  addEventListener("keydown", e => {
    if (!document.getElementById("v-rul").classList.contains("on")) return;
    if (e.target.tagName === "INPUT") return;
    if (e.key === "ArrowRight") { jump(z + 0.25); e.preventDefault(); }
    if (e.key === "ArrowLeft") { jump(z - 0.25); e.preventDefault(); }
  });

  addEventListener("resize", () => {
    if (document.getElementById("v-rul").classList.contains("on")) size();
  });

  app.rulerGoTo = id => focus(id);
  app.rulerFit = size;

  size();
  focus(objects[0]?.id || "ndfeb-lattice");
}
