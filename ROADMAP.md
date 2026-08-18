# Ore to Action — Roadmap & Decision Record

Sibling site to `kaankoo/semicon`. This file tracks what shipped, phase retrospectives, and the decision register.

---

## The Decision Register

1. **D1 · Name**: *Ore to Action* (Terminal unit: 1 hour of autonomous physical work).
2. **D2 · Scope**: Physical intelligence, manipulation-first, investment-legible.
3. **D3 · Boundary**: Hyperscale training compute is declared once at station `traincompute` (Stratum 11) with no upstream modelled edges.
4. **D4 · Strata count**: 27 strata. Stratum 14 (`Assembly`) kept standalone; Stratum 18 (`Data`) ordered before Stratum 19 (`Simulation`).
5. **D5 · Cascade unit**: 1 robot-hour across 3 machine classes (Industrial arm, Mobile manipulator, Humanoid).
6. **D6 · Repo strategy**: Fork with hash-parity test (`scripts/parity-engine.mjs` + `engine.lock.json`).
7. **D8 · Price hygiene**: No prices held. Index links out to Yahoo Finance.
8. **Parked for Post-v1 (Replication first)**:
   - **C7 · Fragility-Adjusted Exposure**: Per-organisation single-source dependency sentence.
   - **C8 · Tenth Lens (Nines)**: Log-odds reliability vs human-minutes per robot-hour.

---

## Phase Plan

| Phase | Milestone | Acceptance | Status |
|---|---|---|---|
| **0 · Fork & Scaffold** | Engine parity, lockfile, tooling, CI | `npm test` runs green; dev server works | **DONE** |
| **1 · Strata & Descent** | 27 strata, ~130 stations, edges, ticker spine, Descent, Sheet, Tour | All stations resolve, hero stats computed, homepage frozen | In progress |
| **2 · Web** | Interactive dependency DAG | Assembly tree silhouette, boundary integrity | Pending |
| **3 · Grain & Method** | 9 findings, epistemic ledger, limits | Notes surface across views, prose asserted | Pending |
| **4 · Cascade** | 8-step chain from 1 robot-hour, 192 states | `reconcile()` passes across all states | Pending |
| **5 · Moat** | 3-band concentration & listedness coverage | Waist hypothesis arithmetic, headcount control | Pending |
| **6 · Ruler** | 36 objects, 16 decades, schematic glyphs | Scale-truth asserted, $10^{-5}$ & $10^{-1}$ moments | Pending |
| **7 · Atlas** | ~56 sites, geodesic rings, enclosed area | Cross-check assertions with Ruler | Pending |
| **8 · Lag** | ~70 capabilities from 1954 to 2026+ | Median lag gradient computed, open states | Pending |
| **9 · Faults** | 8 scenarios + permission shock | Unclassified remainder visible, widest $\ne$ slowest | Pending |
| **10 · Layout Parity & Quality Gates** | 250+ assertions across all views | Zero `ch` units, full test pass | Pending |
| **11 · Git & GitHub** | Remote repository setup | Clean commit history | Pending |
| **12 · Nines (Post-v1)** | Tenth lens on reliability | C7 + C8 execution | Planned |
