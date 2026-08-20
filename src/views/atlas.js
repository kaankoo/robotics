/* ============================================================
   ATLAS — fifty-six key robotics sites, drawn to true scale.
   ============================================================ */

import { app } from "../core/app.js";
import { project, transform, wrapLon, ringPath } from "../lib/projection.js";

const KIND = {
  mine: "Mineral extraction",
  refinery: "Metals & magnetic alloys",
  foundry: "Precision casting & foundry",
  fab: "Semiconductor fabrication",
  substation: "High-voltage power grid",
  assembly: "Actuator & robotics assembly",
  research: "Physical intelligence AI lab",
  facility: "Manufacturing hub",
  chokepoint: "Chokepoint"
};

const PRECISION = {
  sited: "the operator publishes this location",
  approx: "reconstructed from public reporting",
  area: "a district — the point is its centre"
};

let D = null, world = null, svg = null;
let sites = [];
let focused = null;
let W = 1200, H = 620;
let cam = { lon: 138, lat: 36, k: 3.5 };
let targetCam = { ...cam };
let raf = null;
let dragging = null;

const layers = { scale: true, chokepoint: true, names: false };

function paint() {
  if (!svg) return;
  const p = (lon, lat) => project(lon, lat, cam, W, H);

  let out = `<g class="atl__geo" transform="${transform(cam, W, H)}">`;
  out += `<g class="atl__land">`;
  if (world && world.polygons) {
    for (const poly of world.polygons) {
      let d = "";
      for (let i = 0; i < poly.length; i += 2) {
        d += (i === 0 ? "M" : "L") + poly[i].toFixed(2) + " " + (-poly[i + 1]).toFixed(2);
      }
      out += `<path d="${d}Z" />`;
    }
  }
  out += `</g>`;

  // Geodesic radius rings
  if (layers.scale) {
    out += `<g class="atl__rings">`;
    for (const s of sites) {
      const rad = s.radius || 15;
      const d = ringPath(s.lon, s.lat, rad, 48);
      const cls = s.chokepoint ? "atl__ring atl__ring--cp" : "atl__ring";
      out += `<path class="${cls}" d="${d}" fill="currentColor" fill-opacity="0.08" stroke="currentColor" stroke-width="${(1.2 / cam.k).toFixed(4)}" />`;
    }
    out += `</g>`;
  }
  out += `</g>`;

  // Markers in screen-space
  out += `<g class="atl__markers">`;
  for (const s of sites) {
    const wrappedLon = wrapLon(s.lon, cam.lon);
    const pt = p(wrappedLon, s.lat);
    if (pt.x < -40 || pt.x > W + 40 || pt.y < -40 || pt.y > H + 40) continue;
    const isFoc = focused === s.id;
    const col = s.chokepoint ? "var(--brs)" : (s.stratum ? app.col(s.stratum) : "var(--ash2)");
    const r = isFoc ? 8 : (s.chokepoint ? 5.5 : 3.8);

    out += `<g class="atl__m" data-id="${s.id}" transform="translate(${pt.x.toFixed(1)},${pt.y.toFixed(1)})" style="cursor:pointer">
      <circle r="${r + (isFoc ? 4 : 2)}" fill="${col}" fill-opacity="${isFoc ? 0.4 : 0.18}" />
      <circle r="${r}" fill="${col}" stroke="var(--sub)" stroke-width="1.2" />
      ${layers.names || isFoc ? `<text class="atl__ml" y="-12" text-anchor="middle" fill="var(--qz)" font-size="11" font-weight="${isFoc ? "600" : "400"}">${esc(s.label)}</text>` : ""}
    </g>`;
  }
  out += `</g>`;

  svg.innerHTML = out;

  svg.querySelectorAll(".atl__m").forEach(g => {
    g.addEventListener("click", e => {
      e.stopPropagation();
      tap(g.dataset.id);
    });
  });

  const scaleKm = ((W / cam.k) * 111.32 * Math.cos(cam.lat * Math.PI / 180)).toFixed(0);
  const scaleEl = document.getElementById("atlScale");
  if (scaleEl) scaleEl.textContent = `~${scaleKm} km across`;
}

function detail(s) {
  focused = s.id;
  const first = app.byId[s.stations?.[0]];
  if (first) app.depth("atl", first.L);

  const chips = (s.stations || []).filter(id => app.byId[id]).map(id => {
    const st = app.byId[id];
    return `<button class="cas__st" data-station="${id}" style="--c:${app.col(st.L)}"><b>${app.pad(st.L)}</b>${esc(st.n)}</button>`;
  }).join("");

  document.getElementById("atlPanel").innerHTML = `
    <div class="atl__pk">
      <span>${esc(KIND[s.kind] || s.kind)}</span>
      <b class="atl__prec atl__prec--${s.precision}" title="${esc(PRECISION[s.precision] || "")}">${s.precision}</b>
      ${s.radius ? `<em class="atl__rad">${s.radius < 10 ? s.radius : Math.round(s.radius)} km radius, drawn to scale</em>` : ""}
    </div>
    <h3 class="atl__pn">${esc(s.label)}</h3>
    <p class="atl__ps">${esc(s.place || s.country)} · ${s.lat.toFixed(3)}°, ${s.lon.toFixed(3)}°</p>
    <p class="atl__pb">${esc(s.role || s.note || "")}</p>
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
  glide({ lon: s.lon, lat: s.lat, k: s.zoom || 3.5 });
  detail(s);
}

function glide(to) {
  targetCam = { ...to };
  if (raf) return;
  const step = () => {
    const dLon = targetCam.lon - cam.lon;
    const dLat = targetCam.lat - cam.lat;
    const dK = targetCam.k - cam.k;
    if (Math.abs(dLon) < 1e-3 && Math.abs(dLat) < 1e-3 && Math.abs(dK) < 1e-3) {
      cam = { ...targetCam };
      raf = null;
      paint();
      return;
    }
    const f = app.RM ? 1 : 0.16;
    cam.lon += dLon * f;
    cam.lat += dLat * f;
    cam.k += dK * f;
    paint();
    raf = requestAnimationFrame(step);
  };
  raf = requestAnimationFrame(step);
}

function stops() {
  const host = document.getElementById("atlStops");
  if (!host) return;
  host.innerHTML = (D.stops || []).map(st =>
    `<button class="rul__stop atl__stop" data-id="${st.id}"><b>${st.label}</b><span>${st.sub}</span></button>`).join("");

  host.querySelectorAll(".atl__stop").forEach(b =>
    b.addEventListener("click", () => goTo(b.dataset.id)));
}

function layerControls() {
  const host = document.getElementById("atlLayers");
  if (!host) return;
  const LAYERS = [
    ["scale", "Geodesic rings", "Circles showing true physical extent in kilometres."],
    ["chokepoint", "Chokepoints only", "Highlight single points of failure in amber."],
    ["names", "All site labels", "Show names next to every marker across the globe."]
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
}

function size() {
  if (!svg) return;
  const r = svg.getBoundingClientRect();
  W = Math.max(360, r.width || 1200);
  H = Math.max(380, r.height || 620);
  svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
  paint();
}

const esc = s => (s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;");

export async function initAtlas() {
  const [rD, rW] = await Promise.all([
    fetch(new URL("../../data/static/atlas.json", import.meta.url)),
    fetch(new URL("../../data/static/world.json", import.meta.url))
  ]);
  D = await rD.json();
  world = await rW.json();
  sites = D.sites || [];

  svg = document.getElementById("atlSvg");

  stops();
  layerControls();

  const totalRadiusArea = sites.reduce((sum, s) => sum + Math.PI * (s.radius || 10) * (s.radius || 10), 0);
  const claim = document.getElementById("atlClaim");
  if (claim) {
    claim.innerHTML = `<button class="atl__claimb">
      <b>${sites.length} sites</b> across <b>${new Set(sites.map(s => s.country)).size} countries</b> enclose roughly <b>${Math.round(totalRadiusArea).toLocaleString("en")} km²</b> of specialised ground.
    </button>`;
  }

  svg.addEventListener("mousedown", e => {
    dragging = { x: e.clientX, y: e.clientY, lon: cam.lon, lat: cam.lat };
  });
  window.addEventListener("mousemove", e => {
    if (!dragging) return;
    const dx = e.clientX - dragging.x;
    const dy = e.clientY - dragging.y;
    cam.lon = dragging.lon - (dx / (cam.k * 3.2));
    cam.lat = Math.max(-75, Math.min(75, dragging.lat + (dy / (cam.k * 3.2))));
    targetCam = { ...cam };
    paint();
  });
  window.addEventListener("mouseup", () => { dragging = null; });

  svg.addEventListener("wheel", e => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.15 : 0.85;
    cam.k = Math.max(1.2, Math.min(24, cam.k * factor));
    targetCam = { ...cam };
    paint();
  }, { passive: false });

  addEventListener("resize", () => {
    if (document.getElementById("v-atl").classList.contains("on")) size();
  });

  app.atlasGoTo = goTo;
  app.atlasFit = size;
  size();
  if (sites[0]) detail(sites[0]);
}
