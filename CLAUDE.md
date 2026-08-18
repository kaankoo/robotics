# Working on Ore to Action

Read this file, then read **only what the routing table tells you to**. The corpus is the crown asset; opening files speculatively burns the session.

---

## What this is

A static, dependency-free site mapping the physical-intelligence stack as 27 physical strata → ~130 stations → 500+ organisations, seen through nine lenses: **Descent · Web · Moat · Ruler · Atlas · Lag · Faults · Cascade**, with **Method** and **Index** alongside. Hand-curated knowledge is the asset; the code is thin.

Terminal unit: **One hour of autonomous physical work**, denominated across three reference machine classes (Industrial arm, Mobile manipulator, Humanoid).

```bash
npm run dev      # http://localhost:5173 — ES modules need HTTP, file:// will not work
npm test         # check-data + smoke + parity. Run before every commit
npm run peek -- strainwave   # one station, without opening stations.json
npm run peek -- --ids        # all station ids
npm run peek -- --find motor # search names, taglines and prose
npm run peek -- --org fanuc  # every station an org appears at
npm run peek -- --stratum 6  # a whole stratum
```

---

## Hard rules

1. **Never rewrite the homepage once shipped.** The Descent (`#v-strata`) is the front door and stays as it is. New work is additive — a new tab, or depth inside an existing sheet. Evolutionary, not revolutionary.
2. **Views never import each other.** Each registers its actions on `app` (`src/core/app.js`) and calls `app.<action>()` for anything owned elsewhere. Shared logic goes in `src/lib/`, which views may import. The module graph stays acyclic.
3. **Never read `stations.json` whole.** Use `npm run peek`.
4. **Guarantees go in tests, not in care.** If a property matters, assert it in `scripts/smoke.mjs` or `scripts/check-data.mjs` so it cannot silently rot.
5. **Every claim carries a source and a vintage.** Judgement is labelled as judgement. **Never invent a figure** — if it is not derivable from something committed, it renders as a dash.
6. **No page holds a price.** Public tickers link out to Yahoo Finance; private suppliers/unlisted divisions show a dash. Smoke assertions fail if `valueOf`, `layerTotals`, `capitalAt` or `usd` ever appear in `metrics.js`.
7. **Scope boundary (D3):** This site covers compute and models only as far as they are onboard, real-time, or robotics-specific. External hyperscale training compute is declared once at station `traincompute` in Stratum 11 with no upstream edges.
8. **Run `npm test` before committing.**

---

## Routing table — what to read for what

| Task | Read (in order) | Never open |
|---|---|---|
| **Any change at all** | this file, `src/core/app.js` (58 lines) | — |
| **Content is wrong anywhere** | that view's JSON in `data/static/` | the JS |
| Cascade number looks wrong | `data/static/cascade.json` — every parameter has its derivation | the JS |
| Bug in the Cascade | `src/views/cascade.js`, `src/lib/cascade.js` | stations.json |
| A Ruler object is the wrong size | `data/static/ruler.json` (`m` is the value) | the JS |
| Bug in the Ruler | `src/views/ruler.js`; glyph problems → `src/lib/glyphs.js` | stations.json |
| A circle is the wrong size, or site misplaced | `data/static/atlas.json` — `lat`, `lon`, `radiusKm` | the JS |
| Bug in the Atlas | `src/views/atlas.js` | stations.json, world.json |
| Projection, geodesic or wrapping problem | `src/lib/projection.js` (132 lines, pure) | — |
| A Lag bar is wrong length/date | `data/static/timeline.json` — `invented`, `shipped`, `stratum` | the JS |
| Bug in the Lag chart | `src/views/timeline.js` | stations.json |
| A blast radius looks wrong | `data/static/edges.json` — reach is the graph, not the view | the JS |
| A reroute or dead-end is disputed | `data/static/counterfactuals.json` — each is individually argued | — |
| Bug in the Faults page | `src/views/faults.js` | stations.json |
| Traversal problem in Web or Faults | `src/lib/graph.js` (49 lines, pure) | — |
| Bug in the Moat page | `src/views/moat.js`, `src/lib/metrics.js` | stations.json |
| Edit station prose or companies | `npm run peek -- <id>` then targeted edit | the whole file |
| Add a station | `stations.json` (append), `edges.json`, `companies.json`, then `npm test` | — |
| A finding shows in the wrong place | `data/static/notes.json` | — |
| Method page missing an entry | `data/static/method.json` | the JS |
| Wrong tab opens / nav broken | `src/core/router.js` (55 lines), nav in `index.html` | — |
| Styling | `src/styles/app.css` — grep the banner | — |

---

## Layout Parity Contract

- **Frame:** `max-width:min(1860px,95vw); padding:44px 3vw 80px`, identical across all full-width views.
- **No hard line breaks in headlines.** Use `clamp()` for responsive sizing.
- **Measure in `px`, never `ch`.** House ceiling is `1100px` for prose.
- **No multi-column body text.**
- **Every mark on a chart is named in a legend beside it.**
- **One bar, one variable.** Length and shade track the same variable.
- **Numbers** use `font-variant-numeric: tabular-nums` and the mono face.
- **Prose** is British spelling, en-dashes, no exclamation marks.
