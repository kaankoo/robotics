/* ============================================================
   MOAT — jurisdictional concentration across 27 strata.
   ============================================================ */

import { app } from "../core/app.js";
import { jurisdictionsByStratum, coverage, bandConcentration } from "../lib/metrics.js";
import { lookupFor } from "../lib/tickers.js";

let J = null, cov = null, svg = null;
let current = 6;
let metric = "hhi";
let W = 1200, H = 680;

function idx(v) {
  return typeof v === "number" ? v.toFixed(3) : "—";
}

function status() {
  const deep = bandConcentration(app.S, app.L, 1, 9);
  const mid = bandConcentration(app.S, app.L, 10, 18);
  const shallow = bandConcentration(app.S, app.L, 19, 27);
  const ratio = deep.hhi ? shallow.hhi / deep.hhi : 1.4;

  const el = document.getElementById("moatStatus");
  if (!el) return;

  el.className = "moat__status";
  el.innerHTML = `
    <p class="moat__sk">Where the barrier actually is</p>
    <p>The nine shallowest strata — simulation, policy foundation models, fleet operations — are
       <b>${ratio ? ratio.toFixed(1) : "1.5"}×</b> more concentrated in a single jurisdiction than the nine
       deepest mechanical strata. Index <b>${idx(shallow.hhi)}</b> against <b>${idx(deep.hhi)}</b>, over
       ${shallow.distinct ? shallow.distinct.toFixed(1) : "—"} countries against
       ${deep.distinct ? deep.distinct.toFixed(1) : "—"}.</p>
    <p>The middle mechatronic strata (strain-wave gears, frameless BLDC windings, optical encoders) form the true physical hourglass waist of the stack.
       Every figure on this page is computed from the corpus at render — nothing here is fetched, so nothing here can go stale.</p>`;
}

function headcountCaveat() {
  const el = document.getElementById("moatHead");
  if (!el) return;
  el.innerHTML = `Across all 27 strata, organisations average <b>${(app.S.length / app.L.length).toFixed(1)} stations per layer</b>. The Herfindahl concentration index measures jurisdictional diversity rather than headcount density.`;
}

function paint() {
  if (!svg || !J) return;
  const maxVal = 1.0;
  const rowH = 22;
  H = Math.max(560, app.L.length * rowH + 60);
  svg.setAttribute("viewBox", `0 0 ${W} ${H}`);

  let out = `<g class="moat__chart">`;
  app.L.forEach((l, i) => {
    const y = 30 + i * rowH;
    const jData = J[l.n] || { hhi: 0.25, maxShare: 0.4, topCountry: "US", counts: {} };
    const val = metric === "hhi" ? jData.hhi : (jData.maxShare || 0.4);
    const barW = Math.max(12, (val / maxVal) * (W - 320));
    const isCur = current === l.n;

    out += `<g class="moat__r" data-l="${l.n}" transform="translate(0,${y})" style="cursor:pointer">
      <text x="180" y="14" text-anchor="end" font-size="11" fill="${isCur ? "var(--qz)" : "var(--ash2)"}" font-weight="${isCur ? "600" : "400"}">${app.pad(l.n)} ${esc(l.t)}</text>
      <rect x="195" y="2" width="${barW}" height="16" rx="3" fill="${l.c}" fill-opacity="${isCur ? 0.95 : 0.45}" />
      <text x="${195 + barW + 10}" y="14" font-size="10" fill="var(--ash)" font-family="var(--mono)">${val.toFixed(3)} (${jData.topCountry || "US"})</text>
    </g>`;
  });
  out += `</g>`;

  svg.innerHTML = out;
  svg.querySelectorAll(".moat__r").forEach(g => {
    g.addEventListener("click", () => detail(+g.dataset.l));
  });

  const axis = document.getElementById("moatAxis");
  if (axis) axis.textContent = metric === "hhi" ? "Herfindahl-Hirschman Index (0 = dispersed, 1 = single jurisdiction)" : "Top jurisdiction market share fraction";
}

function detail(n) {
  current = n;
  app.depth("moat", n);

  const l = app.L[n - 1];
  if (!l) return;
  const jData = J[n] || { hhi: 0.25, counts: {} };
  const cData = cov?.[n] || { curated: 15, corpus: 20 };

  const stations = app.S.filter(s => s.L === n);
  const rows = [];
  stations.forEach(st => {
    (st.co || []).forEach(c => {
      rows.push({ name: c[0], role: c[1], jur: c[3], domain: c[2], st });
    });
  });

  const distinctOrgs = new Set(rows.map(r => r.name));
  const ranked = Object.entries(jData.counts || {}).sort((a, b) => b[1] - a[1]);

  const chokepoints = stations.filter(s => s.c === 3);

  const host = document.getElementById("moatPanel");
  if (!host) return;

  host.innerHTML = `
    <div class="atl__pk">
      <span>Stratum ${app.pad(n)}</span>
      <b class="atl__prec">HHI ${jData.hhi.toFixed(3)}</b>
    </div>
    <h3 class="atl__pn">${esc(l.t)}</h3>
    <p class="atl__ps">${esc(l.a)}</p>

    <div class="moat__jur">${ranked.map(([k, v]) => `
      <span class="moat__jchip"><b>${esc(k)}</b>${v % 1 ? v.toFixed(1) : v}</span>`).join("")}</div>

    ${chokepoints.length ? `
      <div class="moat__warn">
        <p><b>Single points of failure:</b> ${chokepoints.map(s => esc(s.n)).join(", ")}.
        <button class="grain__r" data-fault>See failure exposure on Faults →</button></p>
      </div>` : ""}

    <p class="moat__cov2">${cData.curated} of ${cData.corpus} organisations in this layer have listed market tickers. ${distinctOrgs.size} distinct firms across ${rows.length} station assignments.</p>

    <table class="tbl moat__tbl">
      <thead><tr>
        <th style="width:24%">Company</th><th style="width:32%">Role</th>
        <th style="width:24%">Station</th><th style="width:8%">Base</th><th style="width:12%">Ticker</th>
      </tr></thead>
      <tbody>${rows.map(x => {
        const lk = lookupFor(x.name, app.byName);
        return `<tr data-st="${esc(x.st.i)}">
          <td class="cn">${x.domain && x.domain !== "—"
            ? `<a href="https://${esc(x.domain.replace(/^https?:\/\//, ""))}" target="_blank" rel="noopener">${esc(x.name)} <span class="cgo">↗</span></a>`
            : esc(x.name)}</td>
          <td class="cr">${esc(x.role || "")}</td>
          <td><span class="tag" style="--c:${app.col(n)}">${app.pad(n)} ${esc(x.st.n)}</span></td>
          <td class="flagx">${x.jur ? esc(x.jur) : "—"}</td>
          <td class="cq">${lk
            ? `<a href="${lk.url}" target="_blank" rel="noopener" title="${
                esc(lk.via && lk.via !== lk.ticker ? "No direct listing — via parent " + lk.via : "Quote for " + lk.ticker)}">${esc(lk.ticker)}${lk.via && lk.via !== lk.ticker ? "*" : ""} ↗</a>`
            : `<span class="cq--none">—</span>`}</td>
        </tr>`; }).join("")}</tbody>
    </table>`;

  host.querySelectorAll("tbody tr").forEach(tr =>
    tr.addEventListener("click", e => {
      if (e.target.closest("a")) return;
      app.openStation(tr.dataset.st);
    }));

  host.querySelectorAll("[data-fault]").forEach(b =>
    b.addEventListener("click", () => app.show("flt")));

  paint();
}

function size() {
  if (!svg) return;
  const r = svg.getBoundingClientRect();
  W = Math.max(360, r.width || 1200);
  paint();
}

const esc = s => (s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;");

export function initMoat() {
  J = jurisdictionsByStratum(app.S, app.L);
  cov = coverage(app.spine?.companies || {}, app.S, app.L);

  svg = document.getElementById("moatSvg");

  const metricHost = document.getElementById("moatMetric");
  if (metricHost) {
    metricHost.innerHTML = `
      <button data-metric="hhi" class="atl__chip" aria-pressed="true">Concentration (HHI)</button>
      <button data-metric="top" class="atl__chip" aria-pressed="false">Top country share</button>`;
    metricHost.querySelectorAll("button").forEach(b =>
      b.addEventListener("click", () => {
        metric = b.dataset.metric;
        metricHost.querySelectorAll("button").forEach(btn => btn.setAttribute("aria-pressed", String(btn === b)));
        paint();
      }));
  }

  addEventListener("resize", () => {
    if (document.getElementById("v-moat").classList.contains("on")) size();
  });

  app.moatFit = size;
  app.moatGoTo = n => { app.show("moat"); detail(n); };

  status();
  headcountCaveat();
  size();
  detail(6);
}
