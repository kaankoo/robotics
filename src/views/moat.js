/* ============================================================
   MOAT — the stack, by where its organisations sit.
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

const esc = s => String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

function series() {
  const out = {};
  if (metric === "top") {
    app.L.forEach(l => { out[l.n] = J[l.n]?.topShare; });
    return { values: out, fmt: v => pct(v), label: "share of the layer held by its largest jurisdiction" };
  }
  app.L.forEach(l => { out[l.n] = J[l.n]?.hhi; });
  return { values: out, fmt: v => idx(v), label: "jurisdictional concentration — Herfindahl index, 0 to 1" };
}

function paint() {
  if (!svg) return;
  const { values, fmt, label } = series();
  const max = Math.max(...Object.values(values).filter(v => v != null), 1e-9);
  const H = HEAD + app.L.length * ROW + 12;
  svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
  svg.setAttribute("height", H);

  let out = "";
  app.L.slice().reverse().forEach((l, i) => {
    const y = HEAD + i * ROW;
    const v = values[l.n];
    const w = v == null ? 0 : Math.max(1, (v / max) * chartW);
    const chk = chokepointsAt(app.S, l.n);

    const pips = chk
      ? Array.from({ length: chk }, (_, k) =>
          `<circle cx="${GUTTER + w + 58 + k * 9}" cy="${y + BAR / 2 - 1}" r="2.6" fill="var(--mag)" fill-opacity=".85"/>`).join("")
      : "";

    out += `<g class="moat__r" data-stratum="${l.n}" style="cursor:pointer">
      <rect class="moat__hit" x="0" y="${y - 3}" width="${W}" height="${ROW}" fill="transparent"/>
      <text class="moat__l" x="${GUTTER - 46}" y="${y + BAR - 3}" text-anchor="end" font-size="11" fill="var(--ash2)">${esc(l.t)}</text>
      <text class="moat__s" x="${GUTTER - 12}" y="${y + BAR - 3}" text-anchor="end" fill="${l.c}" font-weight="600" font-family="var(--mono)">${app.pad(l.n)}</text>
      <rect class="moat__b" x="${GUTTER}" y="${y}" width="${w.toFixed(1)}" height="${BAR}" rx="2"
        fill="${l.c}" fill-opacity="${v == null ? "0.25" : (0.32 + (v / max) * 0.6).toFixed(2)}"/>
      <text class="moat__v" x="${GUTTER + w + 9}" y="${y + BAR - 3}" font-size="10.5" fill="var(--qz)" font-family="var(--mono)">${fmt(v)}</text>
      ${pips}
    </g>`;
  });
  svg.innerHTML = out;
  svg.querySelectorAll(".moat__r").forEach(g =>
    g.addEventListener("click", () => detail(+g.dataset.stratum)));

  const axisEl = document.getElementById("moatAxis");
  if (axisEl) axisEl.textContent = label;
  document.querySelectorAll("#moatMetric button").forEach(b =>
    b.setAttribute("aria-pressed", String(b.dataset.metric === metric)));
}

function detail(n) {
  const l = app.L[n - 1];
  if (!l) return;
  app.depth("moat", n);
  const c = cov[n] || { curated: 0, corpus: 0, share: 0 };
  const j = J[n] || { orgs: 0, topShare: 0, top: "—", hhi: null, distinct: 0, tally: {} };
  const chk = chokepointsAt(app.S, n);

  const rows = [];
  const distinct = new Set();
  app.S.filter(s => s.L === n).forEach(s => (s.co || []).forEach(co => {
    if (!co[0] || co[0] === "—") return;
    distinct.add(co[0]);
    rows.push({ name: co[0], role: co[1], domain: co[2], jur: co[3] && co[3] !== "—" ? co[3] : null, st: s });
  }));
  rows.sort((a, b) => (a.jur || "zz").localeCompare(b.jur || "zz") ||
                      a.name.localeCompare(b.name) || a.st.n.localeCompare(b.st.n));

  const ranked = Object.entries(j.tally || {}).sort((a, b) => b[1] - a[1]);

  const panelHost = document.getElementById("moatPanel");
  if (!panelHost) return;

  panelHost.innerHTML = `
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
      as a single point of failure. Spread across countries is not the same as substitutable, and this is the layer
      where believing otherwise would cost the most. <button class="flt__prec" data-fault="${n}">see what breaks →</button></p>` : ""}

    <div class="moat__jur">${ranked.map(([k, v]) => `
      <span class="moat__jchip"><b>${esc(k)}</b>${v % 1 ? v.toFixed(1) : v}</span>`).join("")}</div>

    <p class="moat__cov2">${c.curated} of ${c.corpus} of these are in the ticker spine — the rest carry no
      market listing to look up, which is what a dash in the price column means. ${distinct.size}
      organisations across ${rows.length} station rows: a firm working at three stations in this layer is
      three rows here and one vote in the index above.</p>

    <table class="tbl moat__tbl">
      <thead><tr>
        <th style="width:22%">Company</th><th style="width:34%">What it does here</th>
        <th style="width:24%">Station</th><th style="width:8%">Base</th><th style="width:12%">Price</th>
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
                esc(lk.via && lk.via !== lk.ticker ? "No listing of its own — this is its parent, " + lk.via
                    : "Look up " + lk.ticker)}">${esc(lk.ticker)} ↗</a>`
            : `<span class="cq--none">—</span>`}</td>
        </tr>`; }).join("")}</tbody>
    </table>`;

  document.querySelectorAll("#moatPanel tbody tr").forEach(tr =>
    tr.addEventListener("click", e => {
      if (e.target.closest("a")) return;
      app.openStation(tr.dataset.st);
    }));

  document.querySelectorAll("#moatPanel [data-go]").forEach(b =>
    b.addEventListener("click", () => app.go(+b.dataset.go)));
  document.querySelectorAll("#moatPanel [data-fault]").forEach(b =>
    b.addEventListener("click", () => app.show("flt")));
  document.querySelectorAll("#moatPanel [data-co]").forEach(b =>
    b.addEventListener("click", () => { app.show("idx"); setTimeout(() => app.focusSearch(b.dataset.co), 80); }));
}

function status() {
  const deep = bandConcentration(app.S, app.L, 1, 9);
  const shallow = bandConcentration(app.S, app.L, 19, 27);
  const ratio = deep.hhi ? shallow.hhi / deep.hhi : null;
  const el = document.getElementById("moatStatus");
  if (!el) return;

  el.className = "moat__status";
  el.innerHTML = `
    <p class="moat__sk">Where the barrier actually is</p>
    <p>The nine shallowest strata — simulation, policy, foundation autonomy — are
       <b>${ratio ? ratio.toFixed(1) : "—"}×</b> more concentrated in a single jurisdiction than the nine
       deepest physical layers. Index <b>${idx(shallow.hhi)}</b> against <b>${idx(deep.hhi)}</b>, over
       ${shallow.distinct ? shallow.distinct.toFixed(1) : "—"} countries against
       ${deep.distinct ? deep.distinct.toFixed(1) : "—"}.</p>
    <p>That is the wrong way round from the way physical industry is usually described. The mine and precision
       gear foundry are assumed to be the concentrated part and software assumed to be global; by this measure the
       physical base is the cosmopolitan end of the stack and the intelligence layer is the provincial one.
       Every figure on this page is computed from the corpus at render — nothing here is fetched, so
       nothing here can go stale.</p>`;
}

function headcountCaveat() {
  const el = document.getElementById("moatHead");
  if (!el) return;
  const b = curationBand(app.S);
  const deep = bandHeadcount(app.S, app.L, 1, 9);
  const shallow = bandHeadcount(app.S, app.L, 25, 27);
  el.innerHTML = `<b>Why this is not a headcount.</b> Every station in this corpus names between
    <b>${b.lo} and ${b.hi}</b> organisations, because that is the editorial policy rather than a finding.
    Counting organisations per layer therefore measures how the corpus was written — it comes out at
    <b>${deep.toFixed(1)}</b> per stratum across the deepest nine against <b>${shallow.toFixed(1)}</b>
    across the shallowest three, which is flat. Jurisdiction was recorded for its own sake, one field per
    organisation per station, and it is the thing in this data that genuinely varies.`;
}

function size() {
  if (!svg) return;
  const r = svg.getBoundingClientRect();
  W = Math.max(760, r.width || 1200);
  chartW = W - GUTTER - PAD_R;
  paint();
}

export async function initMoat() {
  J = jurisdictionsByStratum(app.S, app.L);
  cov = coverage(app.spine?.companies || {}, app.S, app.L);

  svg = document.getElementById("moatSvg");

  const metricHost = document.getElementById("moatMetric");
  if (metricHost) {
    metricHost.innerHTML = `
      <button data-metric="hhi">Concentration (HHI)</button>
      <button data-metric="top">Top Country Share</button>`;
    metricHost.querySelectorAll("button").forEach(b =>
      b.addEventListener("click", () => { metric = b.dataset.metric; paint(); }));
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
