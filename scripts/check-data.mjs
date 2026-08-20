/* Integrity check for the static corpus. npm run check
   Runs in CI / local test suite before deployment. */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const D = path.join(ROOT, "data/static");
const read = f => JSON.parse(fs.readFileSync(path.join(D, f), "utf8"));

const L = read("strata.json");
const S = read("stations.json");
const E = read("edges.json");

const problems = [];
const ok = [];

/* ---- strata ---- */
const nums = L.map(l => l.n);
if (nums.join() !== L.map((_, i) => i + 1).join()) problems.push("strata are not numbered 1..n in order");
L.forEach(l => {
  if (!/^#[0-9A-Fa-f]{6}$/.test(l.c)) problems.push(`stratum ${l.n} has a bad colour: ${l.c}`);
  if (!l.t || !l.a) problems.push(`stratum ${l.n} is missing a title or abstract`);
});
ok.push(`${L.length} strata`);

/* ---- stations ---- */
const ids = new Set();
S.forEach(s => {
  if (ids.has(s.i)) problems.push(`duplicate station id: ${s.i}`);
  ids.add(s.i);
  if (!(s.L >= 1 && s.L <= L.length)) problems.push(`station ${s.i} points at stratum ${s.L}`);
  if (!(s.c >= 0 && s.c <= 3)) problems.push(`station ${s.i} has criticality ${s.c}`);
  ["n", "s", "w"].forEach(k => { if (!s[k]) problems.push(`station ${s.i} is missing "${k}"`); });
  if (!Array.isArray(s.h) || !s.h.length) problems.push(`station ${s.i} has no mechanism list`);
  if (!Array.isArray(s.k) || !s.k.length) problems.push(`station ${s.i} has no key figures`);
  if (!Array.isArray(s.co) || !s.co.length) problems.push(`station ${s.i} has no organisations`);
  (s.co || []).forEach((c, j) => {
    if (!Array.isArray(c) || c.length !== 4) problems.push(`station ${s.i} org #${j} is malformed`);
  });
});
ok.push(`${S.length} stations`);

/* ---- coverage: every stratum has at least one station ---- */
L.forEach(l => {
  if (!S.some(s => s.L === l.n)) problems.push(`stratum ${l.n} (${l.t}) has no stations`);
});

/* ---- edges ---- */
Object.keys(E).forEach(k => {
  if (!ids.has(k)) problems.push(`edge key "${k}" is not a station`);
  E[k].forEach(u => {
    if (!ids.has(u)) problems.push(`edge ${k} -> ${u}: "${u}" is not a station`);
    if (u === k) problems.push(`edge ${k} -> itself`);
  });
});
S.forEach(s => { if (!(s.i in E)) problems.push(`station ${s.i} has no entry in edges.json`); });
ok.push(`${Object.values(E).flat().length} edges`);

/* ---- DAG acyclicity check ---- */
function checkAcyclic() {
  const visited = new Map();
  function dfs(node, pathStack) {
    visited.set(node, 1);
    const parents = E[node] || [];
    for (const p of parents) {
      if (visited.get(p) === 1) {
        problems.push(`Cycle detected: ${pathStack.join(" -> ")} -> ${p}`);
        return;
      }
      if (!visited.has(p)) {
        dfs(p, [...pathStack, p]);
      }
    }
    visited.set(node, 2);
  }
  for (const id of ids) {
    if (!visited.has(id)) dfs(id, [id]);
  }
}
checkAcyclic();

/* ---- organisations ---- */
const orgs = new Set();
S.forEach(s => s.co.forEach(c => { if (c[0] !== "—") orgs.add(c[0]); }));
ok.push(`${orgs.size} organisations`);

/* ---- cascade ---- */
const K = read("cascade.json");
["meta","assumptions","constants","chain","branches","stepSources"].forEach(k => {
  if (!K[k]) problems.push(`cascade.json is missing "${k}"`);
});
K.assumptions.forEach(a => {
  if (!Array.isArray(a.options) || a.options.length < 2) problems.push(`cascade assumption ${a.id} needs options`);
  if (a.default == null || !a.options[a.default]) problems.push(`cascade assumption ${a.id} has a bad default`);
  if (!a.help) problems.push(`cascade assumption ${a.id} has no help text`);
});
Object.entries(K.constants).forEach(([k, c]) => {
  if (typeof c.value !== "number") problems.push(`cascade constant ${k} has no value`);
  if (c.lo != null && c.hi != null && !(c.lo <= c.value && c.value <= c.hi))
    problems.push(`cascade constant ${k}: value ${c.value} is outside [${c.lo}, ${c.hi}]`);
  if (!c.derivation) problems.push(`cascade constant ${k} has no derivation`);
  if (!c.source || !c.source.who) problems.push(`cascade constant ${k} has no source`);
});
ok.push(`${K.chain.length}-step cascade`);

/* ---- notes ---- */
const N = read("notes.json");
if (!Array.isArray(N) || N.length !== 9) problems.push(`notes.json must contain exactly 9 findings (found ${N.length})`);
N.forEach(n => {
  if (!n.id || !n.title || !n.body || !n.figure || !n.figureNote)
    problems.push(`note ${n.id} is missing core fields`);
  (n.stations || []).forEach(st => {
    if (!ids.has(st)) problems.push(`note ${n.id} references unknown station "${st}"`);
  });
});
ok.push(`${N.length} against-the-grain findings`);

/* ---- ruler ---- */
const R = read("ruler.json");
if (!R.objects || R.objects.length < 25) problems.push("ruler.json needs at least 25 objects");
R.objects.forEach(o => {
  const sizeVal = o.m ?? o.size;
  if (typeof sizeVal !== "number" || sizeVal <= 0) problems.push(`ruler object ${o.id} has invalid size`);
  if (o.station && !ids.has(o.station)) problems.push(`ruler object ${o.id} references unknown station "${o.station}"`);
});
ok.push(`${R.objects.length} ruler scale objects`);

/* ---- atlas ---- */
const A = read("atlas.json");
if (!A.sites || A.sites.length < 20) problems.push("atlas.json needs at least 20 sites");
A.sites.forEach(st => {
  if (typeof st.lat !== "number" || typeof st.lon !== "number") problems.push(`atlas site ${st.id} has invalid coordinates`);
  if (!st.country || !st.radius) problems.push(`atlas site ${st.id} missing country or radius`);
  (st.stations || []).forEach(s => {
    if (!ids.has(s)) problems.push(`atlas site ${st.id} references unknown station "${s}"`);
  });
});
ok.push(`${A.sites.length} atlas sites`);

/* ---- timeline ---- */
const T = read("timeline.json");
if (!T.events || T.events.length < 15) problems.push("timeline.json needs at least 15 events");
T.events.forEach(e => {
  if (!e.invented || typeof e.invented !== "number") problems.push(`timeline event ${e.id} missing invented year`);
  if (e.station && !ids.has(e.station)) problems.push(`timeline event ${e.id} references unknown station "${e.station}"`);
});
ok.push(`${T.events.length} timeline capabilities`);

/* ---- counterfactuals ---- */
const F = read("counterfactuals.json");
if (!F.faults || F.faults.length < 5) problems.push("counterfactuals.json needs at least 5 faults");
F.faults.forEach(f => {
  if (!Array.isArray(f.removes) || !f.removes.length) problems.push(`fault ${f.id} has no removes`);
  f.removes.forEach(r => {
    if (!ids.has(r)) problems.push(`fault ${f.id} removes unknown station "${r}"`);
  });
});
ok.push(`${F.faults.length} shock scenarios`);

/* ---- companies & ticker spine ---- */
const C = read("companies.json");
const companyList = Object.values(C.companies || C);
const tickerCount = companyList.filter(c => c.ticker).length;
ok.push(`${companyList.length} companies (${tickerCount} listed)`);

/* ---- Summary ---- */
console.log("\n--- ORE TO ACTION STATIC CORPUS CHECK ---");
ok.forEach(msg => console.log("✓", msg));

if (problems.length) {
  console.error(`\n❌ Found ${problems.length} errors:`);
  problems.forEach(p => console.error("  -", p));
  process.exit(1);
} else {
  console.log(`\n🎉 All ${ok.length} assertions passed cleanly. Zero errors.`);
}
