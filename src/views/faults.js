/* ============================================================
   FAULTS — counterfactual shocks and downstream reach.
   ============================================================ */

import { app } from "../core/app.js";
import { coneOfAll } from "../lib/graph.js";

const GUTTER = 208;
const PAD_R = 20;
const ROW = 21;
const HEAD = 26;

let D = null, svg = null;
let faults = [];
let current = null;
let W = 1200, chartW = 960;

export function exposure(f, dn = app.DN) {
  const reach = coneOfAll(f.removes, dn);
  const reroute = new Set((f.reroutes || []).map(r => r.station));
  const dead = new Set((f.deadEnds || []).map(d => d.station));
  return {
    reach, reroute, dead,
    n: reach.size,
    unclassified: Math.max(0, reach.size - reroute.size - dead.size),
    strata: new Set([...reach].map(id => app.byId[id] && app.byId[id].L)).size
  };
}

export function tierOf(id, f, ex) {
  if (f.removes.includes(id)) return "removed";
  if (ex.dead.has(id)) return "dead";
  if (ex.reroute.has(id)) return "reroute";
  if (ex.reach.has(id)) return "reach";
  return "clear";
}

export function stats(data = D, dn = app.DN) {
  const rows = (data.faults || []).map(f => ({
    id: f.id,
    title: f.title,
    n: exposure(f, dn).n,
    lead: f.leadTimeYears || f.leadYears || 3
  }));
  const widest = rows.reduce((a, b) => (b.n > a.n ? b : a), rows[0]);
  const slowest = rows.reduce((a, b) => (b.lead > a.lead ? b : a), rows[0]);
  return { rows, widest, slowest, total: app.S.length };
}

function chip(id) {
  const s = app.byId[id];
  if (!s) return `<span>${esc(id)}</span>`;
  return `<button class="cas__st" data-station="${id}" style="--c:${app.col(s.L)}">
    <b>${app.pad(s.L)}</b>${esc(s.n)}</button>`;
}

function paint() {
  if (!svg || !current) return;
  const f = current;
  const ex = exposure(f);
  const H = HEAD + app.L.length * ROW + 12;
  svg.setAttribute("viewBox", `0 0 ${W} ${H}`);

  let out = `<g class="flt__matrix">`;
  app.L.forEach((l, idx) => {
    const y = HEAD + idx * ROW;
    const stations = app.S.filter(s => s.L === l.n);
    const inReach = stations.filter(s => ex.reach.has(s.i)).length;

    out += `<text x="190" y="${y + 13}" text-anchor="end" font-size="10.5" fill="var(--ash)" font-family="var(--mono)">${app.pad(l.n)} ${esc(l.t)}</text>`;
    out += `<text x="${W - 10}" y="${y + 13}" text-anchor="end" font-size="10" fill="var(--ash)" font-family="var(--mono)">${inReach ? `${inReach}/${stations.length}` : "—"}</text>`;

    const cellW = Math.min(22, Math.max(9, (chartW - 60) / Math.max(1, stations.length)));
    stations.forEach((s, j) => {
      const x = GUTTER + j * (cellW + 3);
      const tier = tierOf(s.i, f, ex);
      let col = "var(--line2)";
      let op = 0.25;

      if (tier === "removed") {
        col = "#ffffff";
        op = 1;
      } else if (tier === "dead") {
        col = "var(--mag)";
        op = 0.9;
      } else if (tier === "reroute") {
        col = "var(--brs)";
        op = 0.85;
      } else if (tier === "reach") {
        col = l.c;
        op = 0.55;
      }

      out += `<rect class="flt__c flt__c--${tier}" data-station="${s.i}" x="${x}" y="${y}" width="${cellW}" height="${ROW - 5}" rx="2" fill="${col}" fill-opacity="${op}">
        <title>${esc(s.n)} (${app.pad(s.L)})</title>
      </rect>`;
    });
  });
  out += `</g>`;

  svg.innerHTML = out;
  svg.querySelectorAll(".flt__c").forEach(r =>
    r.addEventListener("click", () => app.openStation(r.dataset.station)));
}

function detail(f) {
  current = f;
  const ex = exposure(f);

  const countEl = document.getElementById("fltCount");
  if (countEl) {
    countEl.innerHTML = `<b>${ex.n}</b> of ${app.S.length} stations downstream · 
      <i>${ex.reroute.size} reroutes</i> · 
      <i>${ex.dead.size} dead-ends</i> · 
      <i>${ex.unclassified} unclassified</i>`;
  }

  const host = document.getElementById("fltPanel");
  if (!host) return;

  host.innerHTML = `
    <div class="atl__pk">
      <span>Shock scenario</span>
      <b class="atl__prec">${f.horizon || "12–36 months"} lead time</b>
    </div>
    <h3 class="atl__pn">${esc(f.title)}</h3>
    <p class="atl__ps">${esc(f.sub)}</p>
    <p class="atl__pb">${esc(f.essay || f.note || "")}</p>

    <h4 class="flt__h flt__h--rem">Cut links <span>${f.removes.length} removed</span></h4>
    <div class="flt__list">${f.removes.map(chip).join(" ")}</div>

    ${(f.reroutes || []).length ? `
      <h4 class="flt__h flt__h--rr">Reroutes <span>${f.reroutes.length}</span></h4>
      <div class="flt__list">${f.reroutes.map(r => `
        <div class="flt__item">
          <div class="flt__ihead">${chip(r.station)} <span class="flt__lead">${r.leadYears || 2} yr lead time</span></div>
          <p>${esc(r.route)}</p>
          ${r.lag ? `<button class="grain__r" data-lag="${r.lag}">See precedent on the Lag chart →</button>` : ""}
        </div>`).join("")}</div>` : ""}

    ${(f.deadEnds || []).length ? `
      <h4 class="flt__h flt__h--dead">Dead-ends <span>${f.deadEnds.length}</span></h4>
      <div class="flt__list">${f.deadEnds.map(d => `
        <div class="flt__item flt__item--dead">
          <div class="flt__ihead">${chip(d.station)}</div>
          <p>${esc(d.why)}</p>
        </div>`).join("")}</div>` : ""}

    <p class="flt__unc">${ex.unclassified} of the ${ex.n} downstream stations are <b>not classified either way</b>. That is the honest boundary of what this graph model claims.</p>

    ${f.source ? `<p class="cas__cite">${f.source.url
      ? `<a href="${f.source.url}" target="_blank" rel="noopener">${esc(f.source.who)} — ${esc(f.source.what || "")} ↗</a>`
      : `${esc(f.source.who)} — ${esc(f.source.what || "")}`}</p>` : ""}`;

  document.querySelectorAll("#fltPanel [data-station]").forEach(b =>
    b.addEventListener("click", () => app.openStation(b.dataset.station)));
  document.querySelectorAll("#fltPanel [data-lag]").forEach(b =>
    b.addEventListener("click", () => { app.show("tml"); setTimeout(() => app.lagGoTo(b.dataset.lag), 60); }));

  document.querySelectorAll("#fltPicks button").forEach(b =>
    b.setAttribute("aria-pressed", String(b.dataset.fault === f.id)));

  paint();
}

function goTo(id) {
  const f = faults.find(x => x.id === id);
  if (f) detail(f);
}

function claim() {
  const s = stats();
  const host = document.getElementById("fltClaim");
  if (!host) return;
  host.innerHTML = `
    <button id="fltClaimBtn" class="atl__claimb">
      Reach is not damage. The widest blast radius here — <b>${s.widest.n}</b> of ${s.total} stations —
      routes around itself in <b>${s.widest.lead}</b> years. The slowest takes <b>${s.slowest.lead} years</b> and reaches <b>${s.slowest.n}</b>.
    </button>`;
  document.getElementById("fltClaimBtn")?.addEventListener("click", () => goTo(s.slowest.id));
}

function size() {
  if (!svg) return;
  const r = svg.getBoundingClientRect();
  W = Math.max(720, r.width || 1200);
  chartW = W - GUTTER - PAD_R;
  if (current) paint();
}

const esc = s => (s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;");

export async function initFaults() {
  const r = await fetch(new URL("../../data/static/counterfactuals.json", import.meta.url));
  if (!r.ok) throw new Error(`Could not load counterfactuals.json (${r.status})`);
  D = await r.json();
  faults = D.faults || [];

  svg = document.getElementById("fltSvg");

  const picksHost = document.getElementById("fltPicks");
  if (picksHost) {
    picksHost.innerHTML = faults
      .map(f => `<button data-fault="${f.id}" aria-pressed="false" title="${esc(f.sub)}">${esc(f.title)}</button>`)
      .join("");
    picksHost.querySelectorAll("button").forEach(b =>
      b.addEventListener("click", () => goTo(b.dataset.fault)));
  }

  const legendHost = document.getElementById("fltLegend");
  if (legendHost) {
    legendHost.innerHTML = `
      <span><i class="flt__sw" style="background:#ffffff"></i>Removed link</span>
      <span><i class="flt__sw" style="background:var(--brs)"></i>Reroutes</span>
      <span><i class="flt__sw" style="background:var(--mag)"></i>Dead-end</span>
      <span><i class="flt__sw" style="background:var(--ash)"></i>Downstream reach</span>`;
  }

  addEventListener("resize", () => {
    if (document.getElementById("v-flt").classList.contains("on")) size();
  });

  app.faultsGoTo = goTo;
  app.faultsFit = size;

  claim();
  size();
  if (faults[0]) detail(faults[0]);
}
