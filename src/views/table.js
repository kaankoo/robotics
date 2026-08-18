/* ============================================================
   TABLE — the searchable index of every organisation at every
   station, grouped into coarse bands of the stack.
   ============================================================ */

import { app } from "../core/app.js";
import { lookupFor } from "../lib/tickers.js";

const GROUPS = [
  ["Everything", 1, 27],
  ["Earth & materials", 1, 3],
  ["Fabrication & mechanics", 4, 6],
  ["Motors & sensing", 7, 9],
  ["Vision & compute", 10, 12],
  ["Chassis & assembly", 13, 14],
  ["Firmware & control", 15, 17],
  ["Data & policy", 18, 20],
  ["Assay & fleet", 21, 23],
  ["Work & interface", 24, 25],
  ["Capital & return", 26, 27]
];

let gSel = 0, ROWS = [], qEl;

function renderTable() {
  const { col, pad } = app;
  const q = qEl.value.trim().toLowerCase(), g = GROUPS[gSel];
  let rows = ROWS.filter(r => r.s.L >= g[1] && r.s.L <= g[2]);
  if (q) rows = rows.filter(r => r.q.includes(q));
  const cap = rows.slice(0, 450);
  document.getElementById("tb").innerHTML = cap.map(r =>
    `<tr data-id="${r.s.i}">
       <td class="cn">${r.d && r.d !== "—" ? `<a href="https://${r.d}" target="_blank" rel="noopener" style="text-decoration:none">${r.n} <span style="color:var(--ash);font-size:11px">↗</span></a>` : r.n}</td>
       <td class="cr">${r.r}</td>
       <td class="hcol"><span class="tag" style="--c:${col(r.s.L)}">${pad(r.s.L)} ${r.s.n}</span></td>
       <td class="hcol flagx">${r.b || ""}</td>
       <td class="hcol cq">${r.k
         ? `<a href="${r.k.url}" target="_blank" rel="noopener" title="${
             r.k.via ? `No listing of its own — this is its parent, ${r.k.via}` : `Look up ${r.k.ticker}`
           }">${r.k.ticker}${r.k.via ? " ↗*" : " ↗"}</a>`
         : `<span class="cq--none" title="No market listing — private, a division with no listed parent, or an institution">—</span>`}</td>
     </tr>`).join("");
  document.querySelectorAll("#tb tr").forEach(tr => tr.addEventListener("click", e => {
    if (e.target.closest("a")) return;
    app.openStation(tr.dataset.id);
  }));
  document.getElementById("tbNote").textContent =
    rows.length ? `Showing ${cap.length} of ${rows.length} entries. Click any row to open its station.`
                : "Nothing matches that. Try a company, a component, or a technology.";
}

export function initTable() {
  const { S, lname } = app;

  ROWS = [];
  S.forEach(s => s.co.forEach(c => ROWS.push({
    n: c[0], r: c[1], d: c[2], b: c[3], s: s, k: lookupFor(c[0], app.byName),
    q: (c[0] + " " + c[1] + " " + s.n + " " + s.s + " " + lname(s.L)).toLowerCase()
  })));

  document.getElementById("chips").innerHTML = GROUPS.map((g, i) =>
    `<button class="chip" data-g="${i}" aria-pressed="${i === 0}">${g[0]}</button>`).join("");
  document.querySelectorAll("#chips .chip").forEach(b => b.addEventListener("click", () => {
    gSel = +b.dataset.g;
    document.querySelectorAll("#chips .chip").forEach(x => x.setAttribute("aria-pressed", x === b));
    renderTable();
  }));

  qEl = document.getElementById("q");
  qEl.addEventListener("input", renderTable);
  renderTable();

  app.focusSearch = q => {
    if (q != null) { qEl.value = q; renderTable(); }
    qEl.focus();
  };
}
