/* Pull one record out of the corpus without reading a large file.

     npm run peek -- strainwave       one station, full record
     npm run peek -- strainwave --brief  just the identity line
     npm run peek -- --stratum 6      every station in a stratum
     npm run peek -- --find flexspline search names, taglines and prose
     npm run peek -- --org "Harmonic Drive" every station an organisation appears at
     npm run peek -- --ids            all 150 ids with their stratum
*/

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const D = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../data/static");
const read = f => JSON.parse(fs.readFileSync(path.join(D, f), "utf8"));
const L = read("strata.json"), S = read("stations.json"), E = read("edges.json");

const args = process.argv.slice(2);
const flag = n => { const i = args.indexOf("--" + n); return i < 0 ? null : (args[i + 1] ?? true); };
const brief = args.includes("--brief");
const pad = n => String(n).padStart(2, "0");
const line = s => `${pad(s.L)} ${L[s.L - 1].t.padEnd(24)} ${s.i.padEnd(14)} ${s.n}`;

if (args.includes("--ids") || !args.length) {
  S.forEach(s => console.log(line(s)));
  console.log(`\n${S.length} stations across ${L.length} strata`);
  process.exit(0);
}

if (flag("stratum")) {
  const n = +flag("stratum");
  console.log(`\n${pad(n)} ${L[n - 1].t}\n${L[n - 1].a}\n`);
  S.filter(s => s.L === n).forEach(s => console.log(`  ${s.i.padEnd(14)} ${s.n.padEnd(34)} ${s.s}`));
  process.exit(0);
}

if (flag("find")) {
  const q = String(flag("find")).toLowerCase();
  const hits = S.filter(s => (s.n + s.s + s.w + s.i).toLowerCase().includes(q));
  hits.forEach(s => console.log(line(s)));
  console.log(`\n${hits.length} station${hits.length === 1 ? "" : "s"} match "${q}"`);
  process.exit(0);
}

if (flag("org")) {
  const q = String(flag("org")).toLowerCase();
  let n = 0;
  S.forEach(s => s.co.forEach(c => {
    if (c[0].toLowerCase().includes(q)) { n++; console.log(`${line(s).padEnd(56)} ${c[0]} — ${c[1]}`); }
  }));
  console.log(`\n${n} appearance${n === 1 ? "" : "s"}`);
  process.exit(0);
}

/* a single station */
const id = args.find(a => !a.startsWith("--"));
const s = S.find(x => x.i === id);
if (!s) {
  console.error(`Unknown station id "${id}". Run npm run peek -- --ids to list them.`);
  process.exit(1);
}

if (brief) {
  console.log(line(s));
  process.exit(0);
}

console.log(`\n${pad(s.L)} · ${L[s.L - 1].t.toUpperCase()}`);
console.log(`${s.n} (${s.i})`);
console.log(`Criticality: ${s.c}/3  ·  ${s.s}\n`);
console.log(s.w + "\n");
console.log("HOW IT ACTUALLY WORKS:");
s.h.forEach(x => console.log(`  • ${x}`));
console.log("\nBY THE NUMBERS:");
s.k.forEach(k => console.log(`  ${k[0].padEnd(24)} ${k[1]}`));
if (s.x) console.log(`\nCRITICALITY NOTE: ${s.x}`);
console.log(`\nORGANISATIONS (${s.co.length}):`);
s.co.forEach(c => console.log(`  • ${c[0].padEnd(30)} ${c[1]} [${c[3]}] (${c[2]})`));
const up = E[s.i] || [];
console.log(`\nDEPENDS ON (${up.length}): ${up.join(", ") || "none"}`);
const dn = S.filter(x => (E[x.i] || []).includes(s.i)).map(x => x.i);
console.log(`FEEDS INTO (${dn.length}): ${dn.join(", ") || "none"}\n`);
