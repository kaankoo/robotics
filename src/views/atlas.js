/* ============================================================
   ATLAS — where the physical-intelligence stack physically is.
   ============================================================ */

import { app } from "../core/app.js";
import {
  transform, project, unproject, wrapLon, fitTo,
  ringPath, graticule, R_EARTH
} from "../lib/projection.js";

const NS = "http://www.w3.org/2000/svg";
const KM_PER_DEG = Math.PI * R_EARTH / 180;
const K_MIN = 0.9;
const K_MAX = 2600;
const LABEL_MAX = 13;
const WRAP = [-360, 0, 360];

let D = null, W = null;
let svg = null, gGeo = null, gMarks = null, defs = null, gRings = null, gRisk = null, gStroke = [];
let sites = [], marks = [];
let cam = { lon: 138, lat: 36, k: 3.5 };
let target = null, raf = null, dragging = null, moved = 0;
let layers = { scale: true, names: false };
let focused = null;
let Wd = 1200, Hd = 560;

const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
const clampK = v => Math.max(K_MIN, Math.min(K_MAX, v));

function colourOf(s) {
  const st = s.stations && s.stations[0] && app.byId[s.stations[0]];
  return st ? app.col(st.L) : "var(--fg)";
}

function clampCam(c) {
  const k = clampK(c.k);
  const halfLat = Hd / 2 / k;
  const lat = Math.max(-88 + halfLat, Math.min(88 - halfLat, c.lat));
  const lon = ((c.lon + 180) % 360 + 360) % 360 - 180;
  return { lon, lat: Hd / k >= 176 ? 0 : lat, k };
}

export function camera() { return { ...cam, W: Wd, H: Hd }; }

function glide(to) {
  target = clampCam(to);
  if (raf) return;
  const step = () => {
    const dl = wrapLon(target.lon, cam.lon) - cam.lon;
    const da = target.lat - cam.lat;
    const dk = Math.log(target.k) - Math.log(cam.k);
    if (Math.abs(dl) < 1e-4 && Math.abs(da) < 1e-4 && Math.abs(dk) < 1e-5) {
      cam = target; raf = null; paint(); return;
    }
    const e = app.RM ? 1 : 0.17;
    cam = clampCam({ lon: cam.lon + dl * e, lat: cam.lat + da * e, k: Math.exp(Math.log(cam.k) + dk * e) });
    paint();
    raf = requestAnimationFrame(step);
  };
  raf = requestAnimationFrame(step);
}

function set(c) { if (raf) { cancelAnimationFrame(raf); raf = null; } cam = clampCam(c); paint(); }

function frame(s, mult = 5.5) {
  const spanKm = Math.max(2, (s.radius || 6) * mult);
  const dLat = spanKm / 111.32;
  const dLon = dLat / Math.max(0.12, Math.cos(s.lat * Math.PI / 180));
  return fitTo({ w: s.lon - dLon, e: s.lon + dLon, s: s.lat - dLat, n: s.lat + dLat }, Wd, Hd, 0.06);
}

function paint() {
  gGeo.setAttribute("transform", transform(cam, Wd, Hd));

  const u = 1 / cam.k;
  for (const [g, w] of gStroke) g.setAttribute("stroke-width", (w * u).toFixed(6));

  const on = [];
  for (const m of marks) {
    const p = project(wrapLon(m.s.lon, cam.lon), m.s.lat, cam, Wd, Hd);
    m.p = p;
    m.on = p.x > -60 && p.x < Wd + 60 && p.y > -40 && p.y < Hd + 40;
    if (m.on) on.push(m);
  }

  const named = layers.names || on.length <= LABEL_MAX;
  const rank = m => (m.s.id === focused ? 0 : m.s.chokepoint ? 1 : 2);
  const placed = [];
  for (const m of marks) m.label = false;
  for (const m of on.slice().sort((a, b) => rank(a) - rank(b))) {
    if (rank(m) > 1 && !named) continue;
    const w = m.s.name.length * 5.7, box =
      { x0: m.p.x - w / 2, x1: m.p.x + w / 2, y0: m.p.y - 22, y1: m.p.y - 8 };
    if (placed.some(b => b.x0 < box.x1 && box.x0 < b.x1 && b.y0 < box.y1 && box.y0 < b.y1)) continue;
    placed.push(box);
    m.label = true;
  }
  for (const m of marks) {
    m.g.setAttribute("transform", `translate(${m.p.x.toFixed(1)},${m.p.y.toFixed(1)})`);
    m.g.setAttribute("display", m.on ? "inline" : "none");
    m.t.setAttribute("display", m.label ? "inline" : "none");
    m.g.classList.toggle("on", m.s.id === focused);
  }

  gRings.setAttribute("display", layers.scale ? "inline" : "none");

  const km = (Wd / cam.k) * KM_PER_DEG * Math.cos(cam.lat * Math.PI / 180);
  const scEl = document.getElementById("atlScale");
  if (scEl) scEl.textContent = km >= 1000 ? `${Math.round(km / 100) / 10} thousand km` : km >= 10 ? `${Math.round(km)} km` : `${km.toFixed(1)} km`;
}

function detail(s) {
  focused = s ? s.id : null;
  const panel = document.getElementById("atlPanel");
  if (!panel || !s) return;

  const st = s.stations && s.stations[0] && app.byId[s.stations[0]];
  panel.innerHTML = `
    <div class="atl__pk">
      <b class="atl__pno">${s.country}</b>
      <span class="tag" style="--c:${st ? app.col(st.L) : "var(--fg)"}">${st ? `${app.pad(st.L)} ${st.n}` : "Global Site"}</span>
      ${s.chokepoint ? `<span class="moat__chk">Single point of failure</span>` : ""}
      <span class="atl__prec atl__prec--${s.precision}">${s.precision} · ${s.radius} km radius</span>
    </div>
    <h3 class="atl__pn">${esc(s.name)}</h3>
    <p class="atl__ps">${esc(s.role)}</p>
    <p class="atl__pb">${esc(s.detail)}</p>
    <div class="blk__h" style="margin-top:12px">Key Organisations</div>
    <div class="co">${(s.orgs || []).map(o => `<div class="nolink"><span class="cnm">${esc(o)}</span></div>`).join("")}</div>
    ${st ? `<button class="btn btn--p" data-open="${st.i}" style="margin-top:14px">Open ${st.n} dossier →</button>` : ""}`;

  const ob = panel.querySelector("[data-open]");
  if (ob) ob.addEventListener("click", () => app.openStation(ob.dataset.open));
  paint();
}

export async function initAtlas() {
  svg = document.getElementById("atlSvg");
  const [ra, rw] = await Promise.all([
    fetch(new URL("../../data/static/atlas.json", import.meta.url)),
    fetch(new URL("../../data/static/world.json", import.meta.url))
  ]);
  if (!ra.ok || !rw.ok) throw new Error("Could not load atlas or world data");
  D = await ra.json();
  W = await rw.json();

  sites = D.sites;

  svg.setAttribute("viewBox", `0 0 ${Wd} ${Hd}`);
  defs = document.createElementNS(NS, "defs");
  gGeo = document.createElementNS(NS, "g");
  gMarks = document.createElementNS(NS, "g");
  svg.appendChild(defs);
  svg.appendChild(gGeo);
  svg.appendChild(gMarks);

  /* Build map geometry */
  const tmpl = document.createElementNS(NS, "g");
  tmpl.id = "world-tmpl";

  const gGrat = document.createElementNS(NS, "g");
  gGrat.innerHTML = graticule(30);
  tmpl.appendChild(gGrat);
  gStroke.push([gGrat, 0.7]);

  const gLand = document.createElementNS(NS, "g");
  const pLand = document.createElementNS(NS, "path");
  pLand.setAttribute("d", W.land);
  pLand.setAttribute("class", "atl__land");
  gLand.appendChild(pLand);
  tmpl.appendChild(gLand);

  gRings = document.createElementNS(NS, "g");
  gRings.setAttribute("class", "atl__rings");
  sites.forEach(s => {
    const p = document.createElementNS(NS, "path");
    p.setAttribute("d", ringPath(s.lon, s.lat, s.radius));
    p.setAttribute("fill", colourOf(s));
    p.setAttribute("fill-opacity", s.chokepoint ? "0.22" : "0.12");
    p.setAttribute("stroke", colourOf(s));
    p.setAttribute("stroke-opacity", "0.6");
    gRings.appendChild(p);
  });
  tmpl.appendChild(gRings);
  gStroke.push([gRings, 1.2]);

  defs.appendChild(tmpl);

  WRAP.forEach(dx => {
    const u = document.createElementNS(NS, "use");
    u.setAttribute("href", "#world-tmpl");
    u.setAttribute("x", String(dx));
    gGeo.appendChild(u);
  });

  marks = sites.map(s => {
    const g = document.createElementNS(NS, "g");
    g.setAttribute("class", `atl__m ${s.chokepoint ? "atl__m--chk" : ""}`);
    const c = document.createElementNS(NS, "circle");
    c.setAttribute("r", s.chokepoint ? "5.5" : "4");
    c.setAttribute("fill", colourOf(s));
    const t = document.createElementNS(NS, "text");
    t.setAttribute("class", "atl__lbl");
    t.setAttribute("y", "-10");
    t.setAttribute("text-anchor", "middle");
    t.textContent = s.name.length > 20 ? s.name.slice(0, 19) + "…" : s.name;
    g.appendChild(c);
    g.appendChild(t);
    g.addEventListener("click", e => {
      e.stopPropagation();
      detail(s);
      glide(frame(s));
    });
    gMarks.appendChild(g);
    return { s, g, t, p: { x: 0, y: 0 }, on: true, label: false };
  });

  document.getElementById("atlStops").innerHTML = D.meta.stops.map(st =>
    `<button class="chip" data-stop="${st.id}">${st.name}</button>`).join("");

  document.querySelectorAll("#atlStops .chip").forEach(b =>
    b.addEventListener("click", () => {
      const st = D.meta.stops.find(x => x.id === b.dataset.stop);
      if (st) glide({ lon: st.lon, lat: st.lat, k: st.zoom });
    }));

  const resetBtn = document.getElementById("atlReset");
  if (resetBtn) resetBtn.addEventListener("click", () =>
    glide({ lon: 138, lat: 36, k: 3.5 }));

  svg.addEventListener("mousedown", e => {
    dragging = { x: e.clientX, y: e.clientY, lon: cam.lon, lat: cam.lat };
    moved = 0;
  });
  addEventListener("mousemove", e => {
    if (!dragging) return;
    const dx = e.clientX - dragging.x, dy = e.clientY - dragging.y;
    moved += Math.abs(dx) + Math.abs(dy);
    set({ lon: dragging.lon - dx / cam.k, lat: dragging.lat + dy / cam.k, k: cam.k });
  });
  addEventListener("mouseup", () => { dragging = null; });

  svg.addEventListener("wheel", e => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.2 : 1 / 1.2;
    set({ lon: cam.lon, lat: cam.lat, k: cam.k * factor });
  }, { passive: false });

  paint();
  const defaultSite = sites.find(s => s.id === "hotaka-nagano") || sites[0];
  if (defaultSite) detail(defaultSite);
}
