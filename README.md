# Ore to Action

An interactive cross-section of the physical-intelligence stack — **27 strata, ~130 stations, 500+ organisations**, from a neodymium seam in Bayan Obo to the completion of autonomous physical work.

Between an ore body in the ground and an arm picking something up sit roughly twenty-seven layers of civilisation. This is the whole chain, one layer at a time, with the companies that own each link.

A sibling site to *Sand to Sentence* (`kaankoo/semicon`), built on the identical zero-dependency, static architecture.

---

## Running it locally

ES modules and `fetch()` both require HTTP, so the site cannot be opened straight from disk.

```bash
npm run dev          # → http://localhost:5173
npm test             # Corpus validation + headless boot + engine parity
npm run peek -- strainwave  # inspect one station from CLI
```

No runtime dependencies. Node 20+. Zero build steps.

Nine lenses on one body of knowledge: **Descent · Web · Moat · Ruler · Atlas · Lag · Faults · Cascade**, with **Method** and **Index** alongside.

---

## The Data Model

- **Stratum** — one layer of the physical stack (`strata.json`).
- **Station** — a distinct technology, process or market with its own physics and incumbents (`stations.json`).
- **Edges** — `edges.json` maps each station ID to its upstream dependencies.
- **Cascade** — `cascade.json` quantifies the conversion chain backwards from 1 hour of physical work.

---

## Symmetry with *Sand to Sentence*

- **AI Stack (Semicon)**: Terminal artifact is a **token**. Shallow end is 2.4× more concentrated.
- **Physical Stack (Robotics)**: Terminal artifact is an **action**. The stack features a mechatronic **waist** where concentration peaks through precision gearing and actuation.
