/* ============================================================
   RULER — sixteen orders of magnitude, drawn to true scale.
   ============================================================ */

import { app } from "../core/app.js";
import { drawGlyph } from "../lib/glyphs.js";

const NS = "http://www.w3.org/2000/svg";

const PX_DECADE = 560;
const REF = 130;
const MIN_PX = 1.1;
const MAX_PX = 1000;

const LANES = 5;
const SPREAD = 0.88;
const SETTLE = 1.9;
const WHEEL_PX = 0.48;

const SI = [
  [-12, "pm"], [-9, "nm"], [-6, "µm"], [-3, "mm"], [0, "m"], [3, "km"], [6, "Mm"]
];

let D = null, svg = null, stage = null, gWorld = null, gAxis = null;
let z = -5.3, target = -5.3, raf = null, dragging = null;
let objects = [];
let W = 1200, H = 560;
let sweeping = null;

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
      const w = (named ? o.name.length * 6.6 : metres(o.size).length * 6) / 2 + 6;
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
          ? `<text class="rul__m" x="0" y="${y - 13}" text-anchor="middle">${metres(o.size)}</text>
             <text class="rul__n" x="0" y="${y}" text-anchor="middle">${esc(o.name)}</text>`
          : `<text class="rul__n" x="0" y="${y}" text-anchor="middle">${esc(o.name)}</text>
             <text class="rul__m" x="0" y="${y + 12}" text-anchor="middle">${metres(o.size)}</text>`)
        : `<text class="rul__m" x="0" y="${y}" text-anchor="middle">${metres(o.size)}</text>`;
    }
    out += `</g>`;
  }

  gWorld.innerHTML = out;
  gWorld.querySelectorAll(".rul__o").forEach(g =>
    g.addEventListener("click", () => focus(g.dataset.id)));

  document.getElementById("rulScale").textContent = metres(Math.pow(10, z));
  document.getElementById("rulRange").value = String(z);
  if (focal) detail(focal);
}

const x2 = v => Math.round(v * 100) / 100;
const esc = s => (s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;");

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
    approx: "order of magnitude"
  };

  document.getElementById("rulPanel").innerHTML = `
    <div class="atl__pk">
      <span>10<sup>${o.lg.toFixed(1)}</sup> m</span>
      <b class="atl__prec atl__prec--${o.precision}" title="${esc(precision[o.precision] || "")}">${o.precision}</b>
    </div>
    <h3 class="atl__pn">${esc(o.name)}</h3>
    <p class="atl__ps">${metres(o.size)}</p>
    <p class="atl__pb">${esc(o.desc || o.why || "")}</p>
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
  const btn = document.getElementById("rulPlay");
  if (btn) btn.textContent = "Pause";
  const start = performance.now();
  const span = D.meta.span[1] - D.meta.span[0];
  const dur = app.RM ? 2000 : 18000;

  const frame = now => {
    const t = Math.min(1, (now - start) / dur);
    z = target = D.meta.span[0] + t * span;
    paint();
    if (t < 1) sweeping = requestAnimationFrame(frame);
    else endSweep();
  };
  sweeping = requestAnimationFrame(frame);
}

function endSweep() {
  if (!sweeping) return;
  cancelAnimationFrame(sweeping);
  sweeping = null;
  const btn = document.getElementById("rulPlay");
  if (btn) btn.textContent = "Sweep lattice → Earth";
}

function stops() {
  const host = document.getElementById("rulStops");
  if (!host) return;
  host.innerHTML = (D.stops || []).map(s =>
    `<button class="rul__stop" data-id="${s.id}"><b>${s.label}</b><span>${s.sub}</span></button>`).join("");

  host.querySelectorAll(".rul__stop").forEach(b =>
    b.addEventListener("click", () => focus(b.dataset.id)));
}

function size() {
  if (!svg) return;
  const r = svg.getBoundingClientRect();
  W = Math.max(360, r.width || 1200);
  H = Math.max(380, r.height || 560);
  svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
  shown = null;
  paint();
}

export async function initRuler() {
  const url = new URL("../../data/static/ruler.json", import.meta.url);
  const r = await fetch(url);
  if (!r.ok) throw new Error(`Could not load ruler.json (${r.status})`);
  D = await r.json();

  svg = document.getElementById("rulSvg");
  stage = svg.closest(".rul__stage");

  svg.innerHTML = `<g id="rulWorld"></g><g id="rulAxis"></g>`;
  gWorld = document.getElementById("rulWorld");
  gAxis = document.getElementById("rulAxis");

  objects = (D.objects || []).map(o => ({
    ...o,
    lg: Math.log10(o.size),
    svg: drawGlyph(o.glyph, o.color || "currentColor")
  }));

  stops();

  const range = document.getElementById("rulRange");
  range.min = String(D.meta.span[0]);
  range.max = String(D.meta.span[1]);
  range.step = "0.01";
  range.value = String(z);

  range.addEventListener("input", e => jump(+e.target.value));

  stage.addEventListener("wheel", e => {
    e.preventDefault();
    const d = (e.deltaX + e.deltaY) * (e.deltaMode === 1 ? 16 : 1);
    jump(target + (d * WHEEL_PX) / PX_DECADE);
  }, { passive: false });

  stage.addEventListener("pointerdown", e => {
    if (e.target.closest(".rul__o")) return;
    dragging = { x: e.clientX, z };
    stage.setPointerCapture(e.pointerId);
    stage.classList.add("drag");
  });
  stage.addEventListener("pointermove", e => {
    if (!dragging) return;
    endSweep();
    if (raf) { cancelAnimationFrame(raf); raf = null; }
    z = target = clamp(dragging.z - (e.clientX - dragging.x) / PX_DECADE);
    paint();
  });
  const stopDrag = () => { dragging = null; stage.classList.remove("drag"); };
  stage.addEventListener("pointerup", stopDrag);
  stage.addEventListener("pointercancel", stopDrag);

  const playBtn = document.getElementById("rulPlay");
  if (playBtn) playBtn.addEventListener("click", sweep);

  addEventListener("keydown", e => {
    if (!document.getElementById("v-rul").classList.contains("on")) return;
    if (e.target.tagName === "INPUT") return;
    if (e.key === "ArrowRight") { jump(target + 0.5); e.preventDefault(); }
    if (e.key === "ArrowLeft") { jump(target - 0.5); e.preventDefault(); }
  });

  addEventListener("resize", () => {
    if (document.getElementById("v-rul").classList.contains("on")) size();
  });

  const pxLabel = document.getElementById("rulPxDecade");
  if (pxLabel) pxLabel.textContent = PX_DECADE;

  app.rulerGoTo = focus;
  app.rulerFit = size;
  size();
}
