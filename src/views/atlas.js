/* ============================================================
   ATLAS — fifty-six key robotics sites, drawn to true scale.
   ============================================================ */

import { app } from "../core/app.js";
import {
  transform, project, unproject, wrapLon, fitTo,
  ringPath, graticule, R_EARTH
} from "../lib/projection.js";

const NS = "http://www.w3.org/2000/svg";
const KM_PER_DEG = Math.PI * R_EARTH / 180;   // 111.19 km per degree of great circle
const K_MIN = 0.9;        // pixels per degree — whole world
const K_MAX = 2600;       // high zoom
const LABEL_MAX = 13;     // name everything once this few are on screen
const WRAP = [-360, 0, 360];

let D = null, W = null;
let svg = null, gGeo = null, gMarks = null, defs = null, gRings = null, gStroke = [];
let sites = [], marks = [];
let cam = { lon: 138, lat: 36, k: 3.5 };
let target = null, raf = null, dragging = null, moved = 0;
let layers = { scale: true, chokepoint: false, names: false };
let focused = null;
let Wd = 1200, Hd = 560;

const esc = s => String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;");
const clampK = v => Math.max(K_MIN, Math.min(K_MAX, v));

const KIND = {
  mine: "Mineral extraction",
  refinery: "Metals & magnetic alloys",
  foundry: "Precision casting & foundry",
  fab: "Semiconductor fabrication",
  substation: "High-voltage power grid",
  assembly: "Actuator & robotics assembly",
  research: "Physical intelligence AI lab",
  facility: "Manufacturing hub",
  chokepoint: "Single point of failure"
};

const PRECISION = {
  sited: "the operator publishes this location",
  approx: "reconstructed from public reporting",
  area: "a district — the point is its centre"
};

function colourOf(s) {
  if (s.chokepoint) return "var(--brs)";
  const st = app.byId[s.stations?.[0]];
  return st ? app.col(st.L) : "var(--pls)";
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
  const spanKm = Math.max(2, (s.radius || s.radiusKm || 15) * mult);
  const dLat = spanKm / 111.32;
  const dLon = dLat / Math.max(0.12, Math.cos(s.lat * Math.PI / 180));
  return fitTo({ w: s.lon - dLon, e: s.lon + dLon, s: s.lat - dLat, n: s.lat + dLat }, Wd, Hd, 0.06);
}

function paint() {
  if (!svg || !gGeo) return;
  gGeo.setAttribute("transform", transform(cam, Wd, Hd));

  const u = 1 / cam.k;
  for (const [g, w] of gStroke) if (g) g.setAttribute("stroke-width", (w * u).toFixed(6));

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
    const labelStr = m.s.label || m.s.name || "";
    const w = labelStr.length * 5.7;
    const box = { x0: m.p.x - w / 2, x1: m.p.x + w / 2, y0: m.p.y - 22, y1: m.p.y - 8 };
    if (placed.some(b => b.x0 < box.x1 && box.x0 < b.x1 && b.y0 < box.y1 && box.y0 < b.y1)) continue;
    placed.push(box);
    m.label = true;
  }

  for (const m of marks) {
    m.g.setAttribute("transform", `translate(${m.p.x.toFixed(1)},${m.p.y.toFixed(1)})`);
    m.g.setAttribute("display", m.on ? "inline" : "none");
    m.g.setAttribute("opacity", layers.chokepoint && !m.s.chokepoint ? "0.22" : "1");
    m.t.setAttribute("display", m.label ? "inline" : "none");
    m.g.classList.toggle("on", m.s.id === focused);

    const col = colourOf(m.s);
    m.dot.setAttribute("fill", col);
    m.halo.setAttribute("stroke", col);
  }

  if (gRings) gRings.setAttribute("display", layers.scale ? "inline" : "none");

  const km = (Wd / cam.k) * KM_PER_DEG * Math.cos(cam.lat * Math.PI / 180);
  const scaleEl = document.getElementById("atlScale");
  if (scaleEl) {
    scaleEl.textContent = km >= 1000 ? `${Math.round(km / 100) / 10} thousand km` : km >= 10 ? `${Math.round(km)} km` : `${km.toFixed(1)} km`;
  }
}

function detail(s) {
  focused = s.id;
  const first = app.byId[s.stations?.[0]];
  if (first) app.depth("atl", first.L);

  const chips = (s.stations || []).filter(id => app.byId[id]).map(id => {
    const st = app.byId[id];
    return `<button class="cas__st" data-station="${id}" style="--c:${app.col(st.L)}"><b>${app.pad(st.L)}</b>${esc(st.n)}</button>`;
  }).join("");

  const radKm = s.radius || s.radiusKm || 15;
  const prec = s.precision || "sited";

  document.getElementById("atlPanel").innerHTML = `
    <div class="atl__pk">
      <span>${esc(KIND[s.kind] || (s.chokepoint ? "Chokepoint" : "Facility"))}</span>
      <b class="atl__prec atl__prec--${prec}" title="${esc(PRECISION[prec] || "")}">${prec}</b>
      ${radKm ? `<em class="atl__rad">${radKm < 10 ? radKm : Math.round(radKm)} km radius, drawn to scale</em>` : ""}
    </div>
    <h3 class="atl__pn">${esc(s.label || s.name)}</h3>
    <p class="atl__ps">${esc(s.place || s.country)} · ${s.lat.toFixed(3)}°, ${s.lon.toFixed(3)}°</p>
    <p class="atl__pb">${esc(s.role || s.detail || s.note || "")}</p>
    ${s.orgs ? `<p class="atl__pr"><b>Key operators:</b> ${esc(s.orgs.join(", "))}</p>` : ""}
    ${s.source ? `<p class="cas__cite">${s.source.url
      ? `<a href="${s.source.url}" target="_blank" rel="noopener">${esc(s.source.who)} — ${esc(s.source.what || "")} ↗</a>`
      : `${esc(s.source.who)} — ${esc(s.source.what || "")}`}</p>` : ""}
    ${chips ? `<div class="atl__pl">${chips}</div>` : ""}
    ${s.ruler ? `<button class="grain__r" data-ruler="${s.ruler}">See this distance on the Ruler →</button>` : ""}`;

  document.querySelectorAll("#atlPanel [data-station]").forEach(b =>
    b.addEventListener("click", () => app.openStation(b.dataset.station)));
  document.querySelectorAll("#atlPanel [data-ruler]").forEach(b =>
    b.addEventListener("click", () => { app.show("rul"); setTimeout(() => app.rulerGoTo(b.dataset.ruler), 60); }));
  paint();
}

function tap(id) {
  const s = sites.find(x => x.id === id);
  if (!s) return;
  detail(s);
  document.getElementById("atlPanel")?.scrollIntoView({ behavior: app.RM ? "auto" : "smooth", block: "nearest" });
}

function goTo(id) {
  const s = sites.find(x => x.id === id);
  if (!s) return;
  const f = frame(s);
  glide({ lon: s.lon, lat: f.lat, k: f.k });
  detail(s);
}

function worldView() {
  glide({ lon: 40, lat: 22, k: Math.max(K_MIN, Wd / 380) });
}

function syncLayers() {
  document.querySelectorAll("#atlLayers button").forEach(b =>
    b.setAttribute("aria-pressed", String(layers[b.dataset.layer])));
  paint();
}

function concentration() {
  const chokepoints = sites.filter(s => s.chokepoint);
  const totalArea = chokepoints.reduce((sum, s) => sum + Math.PI * (s.radius || s.radiusKm || 15) ** 2, 0);
  const el = document.getElementById("atlClaim");
  if (el) {
    el.innerHTML = `
      <button class="atl__claimb" id="atlClaimBtn">
        <b>${chokepoints.length} chokepoint sites</b> across <b>${new Set(chokepoints.map(s => s.country)).size} countries</b> enclose roughly
        <b>${Math.round(totalArea).toLocaleString("en")} km²</b> of specialised ground.
      </button>`;
    document.getElementById("atlClaimBtn")?.addEventListener("click", () => goTo(chokepoints[0]?.id));
  }
}

const LAYERS = [
  ["scale", "Geodesic rings", "Rings drawn at each site's true ground radius."],
  ["chokepoint", "Chokepoints only", "Dim every site that is not a single point of failure."],
  ["names", "All site labels", "Show names next to every marker on the map."]
];

const STOPS = [
  ["World", ""],
  ["Nagano (Harmonic Drive)", "hotaka-nagano"],
  ["Bayan Obo (Rare Earths)", "bayan-obo-mine"],
  ["Tsu, Mie (Nabtesco)", "tsu-mie-nabtesco"],
  ["Odense (Cobots)", "odense-hub"],
  ["SF Bay (Foundation AI)", "sf-bay-physical-ai"]
];

function size() {
  if (!svg) return;
  const r = svg.getBoundingClientRect();
  Wd = Math.max(360, r.width || 1200);
  Hd = Math.max(360, r.height || 560);
  svg.setAttribute("viewBox", `0 0 ${Wd} ${Hd}`);
  cam = clampCam(cam);
  paint();
}

export async function initAtlas() {
  const [rD, rW] = await Promise.all([
    fetch(new URL("../../data/static/atlas.json", import.meta.url)),
    fetch(new URL("../../data/static/world.json", import.meta.url))
  ]);
  D = await rD.json();
  W = await rW.json();
  sites = D.sites || [];

  svg = document.getElementById("atlSvg");
  svg.innerHTML = "";

  defs = document.createElementNS(NS, "defs");
  gGeo = document.createElementNS(NS, "g");
  gMarks = document.createElementNS(NS, "g");
  svg.append(defs, gGeo, gMarks);

  defs.innerHTML = `
    <g id="atlWorld">
      <g class="atl__gg" stroke="var(--line)" stroke-opacity=".5" fill="none">
        <path class="atl__grat" d="${graticule(15)}"/>
      </g>
      <g class="atl__lg" stroke="#4A5B85" stroke-linejoin="round">
        <path class="atl__land" d="${W.land}" fill="var(--ox2)" fill-opacity=".9"/>
      </g>
      <g class="atl__bg" stroke="#2E3B5E" fill="none">
        <path class="atl__bord" d="${W.borders}"/>
      </g>
    </g>`;

  gGeo.innerHTML =
    WRAP.map(dx => `<use href="#atlWorld" x="${dx}"/>`).join("") +
    `<g class="atl__rings" fill-opacity=".07" stroke-opacity=".9">${
      sites.map(s => {
        const rad = s.radius || s.radiusKm || 15;
        const col = colourOf(s);
        return `<path class="atl__ring" data-site="${s.id}" fill="${col}" stroke="${col}" d="${ringPath(s.lon, s.lat, rad)}"/>`;
      }).join("")
    }</g>`;

  gRings = gGeo.querySelector(".atl__rings");
  gStroke = [
    [defs.querySelector(".atl__gg"), 0.7],
    [defs.querySelector(".atl__lg"), 1.0],
    [defs.querySelector(".atl__bg"), 0.8],
    [gRings, 1.4]
  ];

  gMarks.innerHTML = sites.map(s => `
    <g class="atl__m atl__m--${s.chokepoint ? "chokepoint" : "facility"}" data-site="${s.id}">
      <circle class="atl__hit" r="${s.chokepoint ? 16 : 13}" fill="transparent"/>
      <circle class="atl__halo" r="${s.chokepoint ? 11 : 8}" fill="none" stroke-opacity=".35" stroke-width="1"/>
      <circle class="atl__dot" r="${s.chokepoint ? 4 : 3}"/>
      <text class="atl__t" x="0" y="-13" text-anchor="middle">${esc(s.label || s.name)}</text>
    </g>`).join("");

  marks = [...gMarks.querySelectorAll(".atl__m")].map(g => ({
    g, s: sites.find(x => x.id === g.dataset.site),
    dot: g.querySelector(".atl__dot"), halo: g.querySelector(".atl__halo"), t: g.querySelector(".atl__t")
  }));

  document.getElementById("atlLayers").innerHTML = LAYERS
    .map(([id, label, help]) => `<button data-layer="${id}" title="${esc(help)}" aria-pressed="false">${label}</button>`)
    .join("");
  document.querySelectorAll("#atlLayers button").forEach(b =>
    b.addEventListener("click", () => { layers[b.dataset.layer] = !layers[b.dataset.layer]; syncLayers(); }));

  document.getElementById("atlStops").innerHTML = STOPS
    .map(([l, id]) => `<button data-goto="${id || ""}">${l}</button>`).join("");
  document.querySelectorAll("#atlStops button").forEach(b =>
    b.addEventListener("click", () => b.dataset.goto ? goTo(b.dataset.goto) : worldView()));

  svg.addEventListener("wheel", e => {
    e.preventDefault();
    const at = unproject(e.offsetX ?? Wd / 2, e.offsetY ?? Hd / 2, cam, Wd, Hd);
    const k = clampK(cam.k * Math.exp(-e.deltaY * 0.0022));
    set({ k, lon: at.lon - (((e.offsetX ?? Wd / 2) - Wd / 2) / k), lat: at.lat + (((e.offsetY ?? Hd / 2) - Hd / 2) / k) });
  }, { passive: false });

  svg.addEventListener("pointerdown", e => {
    dragging = { x: e.clientX, y: e.clientY, cam: { ...cam } };
    moved = 0;
    svg.setPointerCapture(e.pointerId);
    svg.classList.add("drag");
  });
  svg.addEventListener("pointermove", e => {
    if (!dragging) return;
    const dx = e.clientX - dragging.x, dy = e.clientY - dragging.y;
    moved = Math.max(moved, Math.abs(dx) + Math.abs(dy));
    set({ k: dragging.cam.k, lon: dragging.cam.lon - dx / dragging.cam.k, lat: dragging.cam.lat + dy / dragging.cam.k });
  });
  const stop = () => { dragging = null; svg.classList.remove("drag"); };
  svg.addEventListener("pointercancel", stop);

  svg.addEventListener("pointerup", e => {
    const tapped = dragging && moved < 5;
    stop();
    if (!tapped) return;
    const g = document.elementFromPoint(e.clientX, e.clientY)?.closest?.(".atl__m");
    if (g) tap(g.dataset.site);
  });

  addEventListener("keydown", e => {
    if (!document.getElementById("v-atl").classList.contains("on")) return;
    if (e.target.tagName === "INPUT") return;
    const step = 90 / cam.k;
    if (e.key === "ArrowRight") { glide({ ...cam, lon: cam.lon + step }); e.preventDefault(); }
    if (e.key === "ArrowLeft") { glide({ ...cam, lon: cam.lon - step }); e.preventDefault(); }
    if (e.key === "ArrowUp") { glide({ ...cam, lat: cam.lat + step }); e.preventDefault(); }
    if (e.key === "ArrowDown") { glide({ ...cam, lat: cam.lat - step }); e.preventDefault(); }
    if (e.key === "+" || e.key === "=") { glide({ ...cam, k: cam.k * 1.8 }); e.preventDefault(); }
    if (e.key === "-") { glide({ ...cam, k: cam.k / 1.8 }); e.preventDefault(); }
  });

  addEventListener("resize", () => { if (document.getElementById("v-atl").classList.contains("on")) size(); });

  app.atlasGoTo = goTo;
  app.atlasFit = size;

  concentration();
  syncLayers();
  size();
  worldView();
  if (sites[0]) detail(sites[0]);
}
