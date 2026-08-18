/* ============================================================
   MOAT — the physical-intelligence stack, by where its organisations sit.
   ============================================================ */

import { app } from "../core/app.js";
import { jurisdictionsByStratum, bandConcentration, bandHeadcount, curationBand,
         chokepointsAt, coverage, pct, idx } from "../lib/metrics.js";
import { lookupFor } from "../lib/tickers.js";

const GUTTER = 210;
const PAD_R = 150;
const ROW = 21;
const BAR = 13;
const HEAD = 26;

let J = {}, cov = {}, svg = null;
let metric = "hhi";
let W = 1200, chartW = 900;

const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

function series() {
  const out = {};
  if (metric === "top") {
    app.L.forEach(l => { out[l.n] = J[l.n].topShare; });
    return { values: out, fmt: v => pct(v), label: "share of the layer held by its largest jurisdiction" };
  }
  app.L.forEach(l => { out[l.n] = J[l.n].hhi; });
  return { values: out, fmt: v => idx(v), label: "jurisdictional concentration — Herfindahl index, 0 to 1" };
}

function paint() {
  const { values, fmt, label } = series();
  const max = Math.max(...Object.values(values).filter(v => v != null), 1e-9);
  const H = HEAD + app.L.length * ROW + 12;
  svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
  svg.setAttribute("height", H);

  let out = "";
  app.L.slice().reverse().forEach((l, i) => {
    const y = HEAD + i * ROW;
    const v = values[l.n];
    const j = J[l.n];
    const w = v == null ? 0 : Math.max(1, (v / max) * chartW);
    const chk = chokepointsAt(app.S, l.n);

    const pips = chk
      ? Array.from({ length: chk }, (_, k) =>
          `<circle cx="${GUTTER + w + 58 + k * 9}" cy="${y + BAR / 2 - 1}" r="2.6" fill="var(--mag)" fill-opacity=".85"/>`).join("")
      : "";

    out += `<g class="moat__r" data-stratum="${l.n}">
      <rect class="moat__hit" x="0" y="${y - 3}" width="${W}" height="${ROW}"/>
      <text class="moat__l" x="${GUTTER - 46}" y="${y + BAR - 3}" text-anchor="end">${esc(l.t)}</text>
      <text class="moat__s" x="${GUTTER - 12}" y="${y + BAR - 3}" text-anchor="end" fill="${l.c}">${app.pad(l.n)}</text>
      <rect class="moat__b" x="${GUTTER}" y="${y}" width="${w.toFixed(1)}" height="${BAR}"
        fill="${l.c}" fill-opacity="${v == null ? "0.25" : (0.32 + (v / max) * 0.6).toFixed(2)}"/>
      <text class="moat__v" x="${GUTTER + w + 9}" y="${y + BAR - 3}">${fmt(v)}</text>
      ${pips}
    </g>`;
  });
  svg.innerHTML = out;
  svg.querySelectorAll(".moat__r").forEach(g =>
    g.addEventListener("click", () => detail(+g.dataset.stratum)));

  document.getElementById("moatAxis").textContent = label;
  document.querySelectorAll("#moatMetric button").forEach(b =>
    b.setAttribute("aria-pressed", String(b.dataset.metric === metric)));
}

function detail(n) {
  const l = app.L[n - 1];
  app.depth("moat", n);
  const c = cov[n] || { curated: 0, corpus: 0, share: 0 };
  const j = J[n];
  const chk = chokepointsAt(app.S, n);

  const rows = [];
  const distinct = new Set();
  app.S.filter(s => s.L === n).forEach(s => s.co.forEach(co => {
    if (!co[0] || co[0] === "—") return;
    distinct.add(co[0]);
    rows.push({ name: co[0], role: co[1], domain: co[2], jur: co[3] && co[3] !== "—" ? co[3] : null, st: s });
  }));
  rows.sort((a, b) => (a.jur || "zz").localeCompare(b.jur || "zz") ||
                      a.name.localeCompare(b.name) || a.st.n.localeCompare(b.st.n));

  const ranked = Object.entries(j.tally).sort((a, b) => b[1] - a[1]);

  document.getElementById("moatPanel").innerHTML = `
    <div class="moat__pk">
      <span style="color:${l.c}">${app.pad(l.n)}</span>
      <b class="moat__fig">${idx(j.hhi)}</b>
      <b class="moat__sub">${j.distinct} ${j.distinct === 1 ? "jurisdiction" : "jurisdictions"}</b>
      ${chk ? `<b class="moat__chk" title="Stations here the corpus marks as single points of failure.">${chk} chokepoint${chk > 1 ? "s" : ""}</b>` : ""}
      <button class="flt__prec" data-go="${n}">open this stratum →</button>
    </div>
    <h3 class="atl__pn">${esc(l.t)}</h3>
    <p class="atl__ps">${j.orgs} organisations · ${pct(j.topShare)} of them in ${esc(j.top || "—")}${
      j.dual ? ` · ${j.dual} based in two countries, counted half in each` : ""}${
      j.unstated ? ` · ${j.unstated} with no stated base, excluded from the index` : ""}</p>
    <p class="atl__pb">${esc(l.a)}</p>

    ${chk && j.hhi != null && j.hhi < 0.35 ? `<p class="moat__warn"><b>Diverse in aggregate, single-sourced at the joints</b>
      This layer spans ${j.distinct} jurisdictions and still holds ${chk} station${chk > 1 ? "s" : ""} the corpus marks
      as a single point of failure. Spread across countries is not the same as substitutable. <button class="flt__prec" data-fault="${n}">see what breaks →</button></p>` : ""}

    <div class="moat__jur">${ranked.map(([k, v]) => `
      <div class="moat__jb">
        <span class="moat__jn">${k}</span>
        <div class="moat__jtr"><div class="moat__jfill" style="width:${(v / j.stated * 100).toFixed(0)}%;background:${l.c}"></div></div>
        <span class="moat__jp">${pct(v / j.stated)}</span>
      </div>`).join("")}</div>

    <div class="moat__tblw">
      <table class="moat__tbl">
        <thead><tr><th>Organisation</th><th>Station</th><th>Role</th><th class="hcol">Base</th><th class="hcol">Price</th></tr></thead>
        <tbody>${rows.map(r => {
          const lk = lookupFor(r.name, app.byName);
          const pr = lk
            ? `<a href="${lk.url}" target="_blank" rel="noopener" title="${lk.via ? `Via parent ${lk.via}` : `Look up ${lk.ticker}`}">${lk.ticker}${lk.via ? " ↗*" : " ↗"}</a>`
            : `<span class="cq--none">—</span>`;
          return `<tr>
            <td class="moat__cn">${r.domain && r.domain !== "—" ? `<a href="https://${r.domain}" target="_blank" rel="noopener">${esc(r.name)} ↗</a>` : esc(r.name)}</td>
            <td class="moat__st"><span class="tag" style="--c:${app.col(r.st.L)}">${app.pad(r.st.L)} ${esc(r.st.n)}</span></td>
            <td class="moat__cr">${esc(r.role)}</td>
            <td class="moat__cb hcol flagx">${r.jur || "—"}</td>
            <td class="moat__cq hcol cq">${pr}</td>
          </tr>`;
        }).join("")}</tbody>
      </table>
    </div>`;

  const p = document.getElementById("moatPanel");
  const gb = p.querySelector("[data-go]");
  if (gb) gb.addEventListener("click", () => app.go(n));
  const fb = p.querySelector("[data-fault]");
  if (fb) fb.addEventListener("click", () => { app.show("flt"); });
}

export function initMoat() {
  svg = document.getElementById("moatSvg");
  J = jurisdictionsByStratum(app.S, app.L);
  cov = coverage(app.companies || {}, app.S, app.L);

  const deep = bandConcentration(app.S, app.L, 1, 9);
  const mid = bandConcentration(app.S, app.L, 10, 18);
  const shallow = bandConcentration(app.S, app.L, 19, 27);

  document.getElementById("moatStatus").innerHTML = `
    <div class="moat__sb">
      <b>${idx(deep.hhi)}</b>
      <span>Deep hardware base<br>01–09 mean concentration</span>
    </div>
    <div class="moat__sb">
      <b>${idx(mid.hhi)}</b>
      <span>Middle compute & data<br>10–18 mean concentration</span>
    </div>
    <div class="moat__sb">
      <b>${idx(shallow.hhi)}</b>
      <span>Shallow software & work<br>19–27 mean concentration</span>
    </div>`;

  const hcDeep = bandHeadcount(app.S, app.L, 1, 9);
  const hcShallow = bandHeadcount(app.S, app.L, 19, 27);
  const cur = curationBand(app.S);
  document.getElementById("moatHead").innerHTML =
    `<b>Why not count organisations per layer?</b> Every station in the corpus names between ${cur.lo} and ${cur.hi} organisations because that is the editorial policy, so a headcount per layer is roughly stations times six — <b>${hcDeep ? hcDeep.toFixed(1) : "—"}</b> per stratum across the deepest nine against <b>${hcShallow ? hcShallow.toFixed(1) : "—"}</b> across the shallowest nine. A headcount chart would report our curation rule, not the industry. Jurisdiction varies genuinely.`;

  document.getElementById("moatMetric").innerHTML = `
    <button class="chip" data-metric="hhi" aria-pressed="true">Concentration (HHI)</button>
    <button class="chip" data-metric="top" aria-pressed="false">Top country share</button>`;

  document.querySelectorAll("#moatMetric button").forEach(b =>
    b.addEventListener("click", () => {
      metric = b.dataset.metric;
      paint();
    }));

  paint();
  detail(6); // Default highlight Stratum 06 (Transmission)
}
