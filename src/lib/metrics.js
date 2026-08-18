/* ============================================================
   METRICS — the arithmetic behind the Moat.

   Pure functions, no DOM, no fetch, no network-derived input.
   Computed directly from the static corpus.
   ============================================================ */

export function weightsFor(c) {
  if (c.attribution) return c.attribution;
  return evenWeights(c);
}

export function evenWeights(c) {
  const w = {}, n = c.stations.length || 1;
  c.stations.forEach(s => { w[s] = 1 / n; });
  return w;
}

export function hhi(values) {
  const v = values.filter(x => x > 0);
  const sum = v.reduce((a, b) => a + b, 0);
  if (!sum) return null;
  return v.reduce((a, b) => a + (b / sum) ** 2, 0);
}

const NAMED = c => c && c[0] && c[0] !== "—";
const JUR = c => (c[3] && c[3] !== "—" ? c[3] : null);

export function splitJurisdiction(j) {
  if (!j) return [];
  const parts = j.split("/").map(x => x.trim()).filter(Boolean);
  const w = 1 / parts.length;
  return parts.map(p => [p, w]);
}

export function orgsAt(stations, stratum) {
  const seen = new Map();
  stations.filter(s => s.L === stratum).forEach(s =>
    s.co.filter(NAMED).forEach(c => { if (!seen.has(c[0])) seen.set(c[0], JUR(c)); }));
  return seen;
}

export function stratumJurisdictions(stations, stratum) {
  const orgs = orgsAt(stations, stratum);
  const tally = {};
  let stated = 0, unstated = 0, dual = 0;
  for (const j of orgs.values()) {
    if (!j) { unstated++; continue; }
    stated++;
    const parts = splitJurisdiction(j);
    if (parts.length > 1) dual++;
    parts.forEach(([k, w]) => { tally[k] = (tally[k] || 0) + w; });
  }
  const ranked = Object.entries(tally).sort((a, b) => b[1] - a[1]);
  return {
    orgs: orgs.size,
    stated, unstated, dual,
    distinct: ranked.length,
    top: ranked.length ? ranked[0][0] : null,
    topShare: stated ? ranked[0][1] / stated : null,
    hhi: stated ? hhi(Object.values(tally)) : null,
    tally
  };
}

export function jurisdictionsByStratum(stations, strata) {
  const out = {};
  strata.forEach(l => { out[l.n] = stratumJurisdictions(stations, l.n); });
  return out;
}

export function bandConcentration(stations, strata, lo, hi) {
  const rows = strata.filter(l => l.n >= lo && l.n <= hi)
    .map(l => stratumJurisdictions(stations, l.n))
    .filter(r => r.hhi != null);
  if (!rows.length) return { hhi: null, distinct: null, strata: 0 };
  return {
    hhi: rows.reduce((a, r) => a + r.hhi, 0) / rows.length,
    distinct: rows.reduce((a, r) => a + r.distinct, 0) / rows.length,
    strata: rows.length
  };
}

export function bandHeadcount(stations, strata, lo, hi) {
  const band = strata.filter(l => l.n >= lo && l.n <= hi);
  if (!band.length) return null;
  const total = band.reduce((a, l) => a + orgsAt(stations, l.n).size, 0);
  return total / band.length;
}

export function curationBand(stations) {
  const per = stations.map(s =>
    new Set(s.co.filter(NAMED).map(c => c[0])).size);
  return { lo: Math.min(...per), hi: Math.max(...per) };
}

export function chokepointsAt(stations, stratum) {
  return stations.filter(s => s.L === stratum && s.c >= 3).length;
}

export function coverage(companies, stations, strata) {
  const curated = new Set(Object.values(companies).map(c => c.name));
  const out = {};
  strata.forEach(l => {
    const all = new Set(), done = new Set();
    stations.filter(s => s.L === l.n).forEach(s => s.co.forEach(x => {
      if (!NAMED(x)) return;
      all.add(x[0]);
      if (curated.has(x[0])) done.add(x[0]);
    }));
    out[l.n] = { curated: done.size, corpus: all.size, share: all.size ? done.size / all.size : 0 };
  });
  return out;
}

export function pct(v, digits = 0) {
  return v == null || !isFinite(v) ? "—" : `${(v * 100).toFixed(digits)}%`;
}

export function idx(v) {
  return v == null || !isFinite(v) ? "—" : v.toFixed(2);
}
