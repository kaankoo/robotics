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

  let out = "";
  let focal = null, best = Infinity;

  objects.forEach(o => {
    const p = place(o);
    if (!p.visible || p.op <= 0) return;
    const d = Math.abs(p.rel);
    if (d < best) { best = d; focal = o; }

    const y = lane(o, p.px);
    const s = p.px / 100;
    const t = `translate(${p.x.toFixed(1)},${y.toFixed(1)}) scale(${s.toFixed(4)}) translate(-50,-50)`;
    const glyph = drawGlyph(o.glyph, o.color || "var(--fg)");

    out += `<g class="rul__obj" data-id="${o.id}" style="opacity:${p.op.toFixed(3)}">
      <g transform="${t}">${glyph}</g>
      <text class="rul__lbl" x="${p.x.toFixed(1)}" y="${(y + p.px / 2 + 16).toFixed(1)}" text-anchor="middle">${o.name}</text>
      <text class="rul__sub" x="${p.x.toFixed(1)}" y="${(y + p.px / 2 + 28).toFixed(1)}" text-anchor="middle">${metres(o.size)}</text>
    </g>`;
  });

  gWorld.innerHTML = out;
  gWorld.querySelectorAll(".rul__obj").forEach(g => {
    g.addEventListener("click", () => {
      const o = objects.find(x => x.id === g.dataset.id);
      if (o) { jump(o.lg); detail(o); }
    });
  });

  document.getElementById("rulScale").textContent = metres(Math.pow(10, z));
  const range = document.getElementById("rulRange");
  if (range) range.value = String(z);

  if (focal && best < 0.3) detail(focal);
}

function detail(o) {
  const panel = document.getElementById("rulPanel");
  if (!panel) return;
  const s = o.station && app.byId[o.station];
  panel.innerHTML = `
    <div class="atl__pk">
      <b class="atl__pno">${metres(o.size)}</b>
      <span class="tag" style="--c:${s ? app.col(s.L) : "var(--fg)"}">${s ? `${app.pad(s.L)} ${s.n}` : "Physical Scale"}</span>
      <span class="atl__prec atl__prec--${o.precision}">${o.precision}</span>
    </div>
    <h3 class="atl__pn">${o.name}</h3>
    <p class="atl__ps">${o.detail}</p>
    <p class="atl__pb">${o.note}</p>
    ${s ? `<button class="btn btn--p" data-open="${s.i}" style="margin-top:14px">Open ${s.n} station →</button>` : ""}`;

  const ob = panel.querySelector("[data-open]");
  if (ob) ob.addEventListener("click", () => app.openStation(ob.dataset.open));
}

function endSweep() {
  if (sweeping) { clearInterval(sweeping); sweeping = null; }
  const b = document.getElementById("rulPlay");
  if (b) b.textContent = "Sweep lattice → Earth";
}

function startSweep() {
  endSweep();
  const span = D.meta.span;
  let cur = span[0];
  jump(cur);
  const b = document.getElementById("rulPlay");
  if (b) b.textContent = "Stop sweep";
  sweeping = setInterval(() => {
    cur += 0.05;
    if (cur > span[1]) { endSweep(); return; }
    glide(cur);
  }, 35);
}

export async function initRuler() {
  svg = document.getElementById("rulSvg");
  stage = svg.parentElement;
  const url = new URL("../../data/static/ruler.json", import.meta.url);
  const r = await fetch(url);
  if (!r.ok) throw new Error(`Could not load ruler.json (${r.status})`);
  D = await r.json();

  const span = D.meta.span;
  objects = D.objects.map((o, idx) => {
    const lg = Math.log10(o.size);
    const laneIdx = (idx % (LANES * 2 - 2));
    const l = laneIdx < LANES ? laneIdx : (LANES * 2 - 2 - laneIdx);
    return { ...o, lg, lane: l };
  });

  document.getElementById("rulPxDecade").textContent = String(PX_DECADE);

  svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
  gWorld = document.createElementNS(NS, "g");
  gAxis = document.createElementNS(NS, "g");
  svg.appendChild(gWorld);
  svg.appendChild(gAxis);

  const range = document.getElementById("rulRange");
  range.min = String(span[0]);
  range.max = String(span[1]);
  range.step = "0.01";
  range.value = String(z);
  range.addEventListener("input", e => jump(+e.target.value));

  document.getElementById("rulStops").innerHTML = D.meta.stops.map(s =>
    `<button class="chip" data-z="${s.z}">${s.name}</button>`).join("");

  document.querySelectorAll("#rulStops .chip").forEach(b =>
    b.addEventListener("click", () => jump(+b.dataset.z)));

  document.getElementById("rulPlay").addEventListener("click", () => {
    if (sweeping) endSweep(); else startSweep();
  });

  svg.addEventListener("mousedown", e => {
    dragging = { x: e.clientX, z: z };
  });
  addEventListener("mousemove", e => {
    if (!dragging) return;
    const dx = e.clientX - dragging.x;
    jump(dragging.z - dx / PX_DECADE);
  });
  addEventListener("mouseup", () => { dragging = null; });

  svg.addEventListener("wheel", e => {
    e.preventDefault();
    jump(z + (e.deltaY * WHEEL_PX) / PX_DECADE);
  }, { passive: false });

  glide(z);
}
