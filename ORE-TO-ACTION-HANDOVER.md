# Ore to Action — project handover

**A sibling site to *Sand to Sentence* (`kaankoo/semicon`), mapping the physical-intelligence stack the way that one maps the AI stack.**

Handover written 18 Aug 2026. Reference repo: `kaankoo/semicon` — read its `CLAUDE.md` and `ROADMAP.md` before you read Part 3 of this document, because most of what follows is expressed as *deltas* from that repo rather than from scratch.

---

## Part 0 — How to use this file

This document is the **decision record**, not the implementation plan. It exists so the build session does not have to re-litigate anything that was already settled, and so that the parts that are genuinely unsettled are visible as unsettled rather than quietly guessed at.

Read it in this order:

| If you are | Read |
|---|---|
| Starting the repo | Parts 1, 3, 13 |
| Curating the corpus | Parts 4, 5, 6, 9, 11 |
| Building a view | Part 7 (that lens's brief), Part 14 |
| Building the Cascade | Part 8 |
| Starting field #3, not robotics | Part 16 only |

Three conventions used throughout, carried from Kankrecha's stated preferences:

- Claims are tagged `[established]`, `[cited — verify]`, `[inference]` or `[hypothesis]`. **Anything tagged `[hypothesis]` is a claim this document invented and has not checked. It must be computed or dropped, never typed into the site.**
- Where a decision was close, the runner-up is named in the same line. Where it was not close, it is stated flatly.
- Every figure in this document that came from a search carries its source class. **None of them are corpus-ready.** They are here so the curation session knows roughly what shape the answer is and can recognise a wrong one.

---

## Part 1 — Binding decisions

These are settled. Change them only with a written reason, in `ROADMAP.md`, the way semicon records why Money was removed.

### D1 · The name is **Ore to Action**

Subtitle: *— the physical-intelligence stack*. Hero line: *"Every action a machine takes begins as **ore.**"*

The reasoning is the load-bearing part. Semicon's title works because it names the first raw input and the last unit of value, and the parallel that makes these two sites a pair is exact: **the AI stack's terminal artifact is a token; the physical-AI stack's terminal artifact is an action.** That is not a pun — in the literature the model's output *is* an action, and every economic claim on this site will be denominated in one.

Runners-up: *Mine to Motion* (better alliteration, weaker terminal noun), *Ore to Effort*. Rejected: anything containing "humanoid" or "embodied" — the site must outlive the current humanoid cycle, and semicon does not say "LLM" in its title either.

### D2 · Scope: **physical intelligence, manipulation-first, investment-legible**

The inclusion test, to be written verbatim into the robotics `CLAUDE.md`:

> A station belongs on this site if it is a distinct technology, process or market that a machine which **senses, decides and physically acts** depends on, **and** its state materially changes what such a machine can do, cost or be allowed to do.

**Fully expanded:** industrial arms, cobots, AMRs and AGVs, mobile manipulation, humanoids, end-effectors and hands, precision mechatronics, onboard sensing, edge inference, control, simulation, teleoperation and demonstration data, robot foundation models, machine-safety certification, fleet operations, RaaS and the deployment economics.

**Present but not expanded** — each gets one station in stratum 24 (Work) and its organisations appear wherever they share the substrate, but none gets a vertical stack of its own: autonomous vehicles, UAS/drones, surgical robotics, agricultural robotics, construction and mining automation, marine and space robotics.

The reason is not squeamishness about scope. Those verticals sit on automotive and aerospace tier-1 supply chains, which are a **different, older and far better documented economy**, and expanding them would roughly double the curation while diluting the actual argument — that a common physical substrate (actuation, sensing, power, policy) now underlies all of them. Stating that and then not proving it in the corpus would be worse than stating it and pointing at the boundary.

**Out entirely:** RPA and software-only automation; CNC machine tools and industrial automation that does not sense-and-decide (these appear as *inputs* at stratum 04, which is where they belong); MES/ERP; warehouse racking.

### D3 · No cross-links to *Sand to Sentence* — and the rule that follows from it

You chose fully independent sites. Fine, but this is the single largest consequence in this document and it must be handled deliberately.

**The robotics site has to treat silicon and foundation models self-sufficiently**, because a reader will not be sent next door for them. The temptation will then be to re-expand the semiconductor stack inside stratum 11, and within a week you have a bad copy of semicon sitting in the middle of a robotics site.

The de-duplication rule, and it goes in `CLAUDE.md` as a hard rule:

> **This site covers compute and models only as far as they are onboard, real-time, or robotics-specific.** Edge inference SoCs, deterministic execution, thermal design inside a moving body, VLA architectures, action tokenisation, sim-to-real transfer — in. Hyperscale training clusters, HBM supply, lithography, packaging — out. They are named once, at the station `traincompute`, as a declared external dependency, and the station's own prose says that its upstream is deliberately not modelled here.

That single station is where the honest boundary lives. `check-data.mjs` should assert that `traincompute` is the only station in stratum 11 with no upstream edges, so the boundary cannot silently spread.

**A cross-link may be added later without violating this decision** — the site works standalone either way. Do not build for it now.

### D4 · Twenty-seven strata, and the number is earned rather than copied

The concordance in Part 4 was drafted before the count was checked, and the natural robotics decomposition landed at 27 without padding. That is convenient rather than mystical.

**If curation shows a stratum has fewer than three credible stations, merge it. Do not invent a station to defend the number.** But do prefer 27 where it is a genuine tie, because the rail, the core sample and four of the nine lenses render one row per stratum, and a reader who knows semicon's column can read this one immediately.

### D5 · The Cascade's terminal unit is **one hour of autonomous physical work**

Not "one pick" (too task-specific — a pick and a weld are not comparable), not "one robot" (a durable good cannot be compared to a flow). Defined against three reference machines toggled as an assumption, exactly as semicon toggles model class. Full specification in Part 8.

### D6 · Repo strategy: **fork, with an engine-parity test**

New repo, identical file layout, zero runtime dependencies, same `npm run dev / test / peek` surface. Plus `scripts/parity-engine.mjs`, which hashes the shared engine files against a committed `engine.lock.json` copied from semicon at fork time and fails `npm test` on drift. File list in Part 3.

**Do not abstract into a shared package until field #3 exists.** Two instances is not enough evidence about what the shared part actually is, and the abstraction would have to be forced back through semicon, which hard rule 1 exists to prevent.

### D7 · Vintage is stated, everywhere

"Public reporting through **<month year of first publication>**." Same wording as semicon's Descent footer and Method page. Robotics is moving faster than semiconductors right now — unit shipments, valuations and export-licence regimes all moved inside 2026 — so the vintage line is doing more work here than it does there.

### D8 · No page holds a price

Carried over verbatim from semicon hard rule 6, and it binds harder here. The robotics stack has a **much lower listed-pure-play density** than the AI stack: many of the load-bearing suppliers are private (Harmonic Drive's Western distributors, Heidenhain, Maxon, Pilz, Wittenstein, Sick, Festo), many are divisions of conglomerates whose robotics revenue is a rounding error, and the most-discussed names are pre-IPO. A market-cap view would draw the industry as being about the three or four firms that happen to be listed and liquid.

Same mechanism as semicon: the Index carries a Price column linking out to Yahoo, everything else shows a dash, a weekly job checks the links resolve and commits no numbers, and the smoke test fails if `valueOf`, `layerTotals`, `capitalAt` or `usd` ever appear in `metrics.js`.

**Make the low listedness a finding rather than a limitation** — see Part 9, finding 8.

### D9 · Never invent a figure — with a robotics-specific bite

Carried over. The specific hazard here: **bill-of-materials breakdowns for humanoids are almost entirely sell-side and consultancy estimates**, they disagree with each other by a factor of three, and they circulate as though they were measurements. Every one must carry the analyst and the date, be typed `cited` and never `derived`, and where two credible estimates disagree the site shows both. Same for unit-shipment forecasts.

### D10 · House style unchanged

British spelling, en-dashes, no exclamation marks. Numbers in `tabular-nums` and the mono face. Charts are hand-drawn SVG — no chart library, the house style is a lab notebook. Commits explain *why*, first line under 60 characters.

### D11 · New stratum ramp, identical chrome

All field colour lives in `strata.json`. `app.css`'s `:root` block stays byte-identical except the single brand accent. The two sites should read as siblings — same typography, same frame, same legends — with a different column. Draft ramp in Part 4.

### D12 · Criticality pips 0–3, same definition, same honesty

Concentration × substitutability, hand-set, declared on Method as the most influential and least defensible numbers on the site. A computed chokepoint score may sit *beside* them later; it may never replace them.

### D13 · Attribution rules unchanged

An organisation counts once per stratum however many stations it holds there. Dual-jurisdiction organisations count half in each — never as a `CN/JP` bucket of its own. Organisations with no stated base are excluded, not bucketed as unknown. State all three rules on the page that uses them, as Moat does.

### D14 · The homepage rule transfers on the day the Descent ships

Once the Descent is live it is frozen. Everything after is a new tab or depth inside an existing sheet. Evolutionary, not revolutionary.

### D15 · Nine tabs, same names, same order, in v1

**Descent · Web · Moat · Ruler · Atlas · Lag · Faults · Cascade · Index**, with **Method** outside the tab group in the header. A tenth lens — **Nines** — is designed in Part 7 and must not ship in v1. Parity first; the tenth tab is the reward for having shipped nine that match.

---

## Part 2 — The project in one page

> Between an ore body and a machine picking something up sit twenty-seven layers of civilisation. This is the whole chain, one layer at a time, with the companies that own each link.

Same asset, same method, different stack: **hand-curated knowledge is the product, the code is thin**, and each section is a different *index* on one body of knowledge rather than new content. 27 strata → ~130 stations → ~500 organisations, seen through nine lenses.

What makes it worth building rather than being a reskin:

1. **The two stacks are shaped differently, and the difference is legible.** Semicon's stack is a chain: rock to token, one long descent, and its concentration gradient runs monotonically — the *shallow* end is 2.4× more concentrated than the deep end. The robotics stack looks, from every direction so far, like it has a **waist**: diverse at the ore end (except two elements), diverse at the integration end (thousands of system integrators), and extremely concentrated through the precision-mechatronics middle. If that survives curation it is a genuinely new picture and it is the site's headline. `[hypothesis — Part 9, finding 4]`

2. **Robotics has an economics the AI stack does not.** A token is a flow; a robot is a durable good with a wear-out life, a duty cycle, an intervention rate and a wage to beat. The Cascade can therefore answer a question semicon cannot: *what does an hour of physical work actually cost, and against what does that compete?*

3. **The investment picture is inverted from what is investable.** Public robotics exposure is concentrated in the names that happen to be listed and liquid; the graph says the moat is in the middle of the stack, where a large share of the suppliers are private or are divisions. Stating that with the corpus behind it is the most useful thing this site can do for a reader with money at stake — and it needs no prices at all.

---

## Part 3 — What is invariant: the engine and the parity contract

### The parity set — files that must stay identical to semicon

These carry no field knowledge. `scripts/parity-engine.mjs` hashes them and `npm test` fails if any drifts from `engine.lock.json`.

| File | Why it is field-agnostic |
|---|---|
| `src/core/app.js` | Shared state and late-bound actions. 57 lines. |
| `src/core/data.js` | Loads the corpus, builds the indexes. |
| `src/core/router.js` | View switching plus the depth registry. |
| `src/core/notes.js` | Findings surfacing and cross-view wiring. |
| `src/lib/graph.js` | Traversal over dependency edges. 48 lines, pure. |
| `src/lib/projection.js` | Equirectangular projection, geodesics, graticule. 131 lines, pure. |
| `src/lib/tickers.js` | Price link construction. 60 lines, pure. |
| `scripts/dev.mjs` · `peek.mjs` · `parity.mjs` · `world.mjs` | Tooling. Unchanged for four phases in semicon. |
| `src/styles/app.css` | **Except** the `:root` brand accent. Everything else — frame, measure, legends, the `LAYOUT PARITY` block — is the reason the two sites will look like one family. |
| `.github/workflows/deploy.yml` | Same CI shape. |

### Files that are structurally identical but hold field content

Copy the file, replace the content. Do not restructure.

`src/views/*.js` (every one), `src/lib/metrics.js` (attribution and concentration arithmetic is field-agnostic; only the field names it reads are not), `index.html` (same sections, same ids, same classes — different copy), `scripts/check-data.mjs` and `scripts/smoke.mjs` (same section markers, different assertions).

### Files that are genuinely new work

`src/lib/cascade.js` — the conversion chain is field-specific arithmetic. `src/lib/glyphs.js` — the Ruler's schematic shapes are field-specific. All of `data/static/`.

### The layout contract, restated because it will be re-derived otherwise

Semicon spent a whole phase on this. Do not rediscover it.

- **Frame:** `max-width:min(1860px,95vw); padding:44px 3vw 80px`, identical across the seven full-width views — Ruler, Atlas, Lag, Faults, Cascade, Moat and Method — so switching tabs does not move the page edge.
- **No `<br>` in a headline.** A hard break is a layout decision typed into content and goes stale exactly like a typed number. `clamp()` on the font size handles narrow screens.
- **Blocks run the full frame.** Only body copy is measured.
- **The measure is in `px`, never `ch`.** A `ch` is the width of the digit zero *in that element's own font* — Newsreader at 14px makes it ~7px, so `118ch` is ~830px, not the ~1500px it reads like. `1100px` is the house ceiling for a single column of 14–16px serif. A smoke assertion enforces this.
- **No multi-column body text.** Tried and reverted in semicon: on a page that is one vertical read, columns send the eye back up the page mid-paragraph.
- **Every mark on a chart is named in a legend beside it**, not only in the footer.
- **Naming the marks is not naming the colours.** Keep them in separate legends — a shape swatch put in a colour legend comes and goes with the colours.
- **One bar, one variable.** If a bar encodes a value by length, its shade tracks the same value.
- **A position that means nothing must say so** — in as many words, in the legend.

---

## Part 4 — The taxonomy: twenty-seven strata

### 4.1 The concordance

This table is for you, not for the site. It is what makes the two columns readable as a pair, and it is where the *interesting* structural claim lives — in the rows that have no counterpart.

| # | Ore to Action | ↔ | # | Sand to Sentence | Relationship |
|---|---|---|---|---|---|
| 01 | Lithosphere | ↔ | 01 | Lithosphere | Same idea, different basket — rare earths, lithium, copper, iron over quartz and ore |
| 02 | Feedstock | ↔ | 02 | Feedstock | Same idea — magnet alloy and bearing steel over ultrapure chemicals |
| 03 | Stock | ↔ | 03 | Substrate | Analogous — billet, plate and prepreg over the wafer |
| 04 | Fabrication | | — | — | **Robotics only** |
| 05 | Bearings & guides | | — | — | **Robotics only** |
| 06 | Transmission | | — | — | **Robotics only — this stack's deepest moat, the structural counterpart of Patterning** |
| 07 | Motor | | — | — | **Robotics only** |
| 08 | Actuation | | — | — | **Robotics only** |
| 09 | Proprioception | | — | — | **Robotics only** |
| 10 | Exteroception | | — | — | **Robotics only** |
| 11 | Compute | ↔ | 10 | Silicon | Deliberately compressed by D3 — nine of semicon's strata sit inside this one row and are not modelled |
| 12 | Power | ↔ | 13 | Power | Inverted — the robot carries its own grid rather than queueing for one |
| 13 | Chassis & end-effector | ↔ | 12 | System | Analogous — the mechanical assembly that makes components a machine |
| 14 | Assembly | | — | — | **Robotics only** |
| 15 | Firmware & real-time | ↔ | 17 | Kernel | Analogous — the software that makes the hardware fast, and here also safe |
| 16 | Middleware | ↔ | 16 | Cluster | Analogous — orchestration and plumbing |
| 17 | Control | | — | — | **Robotics only — sixty years of theory with no AI-stack counterpart** |
| 18 | Data | ↔ | 18 | Corpus | **Exact parallel, opposite economics** — one crawls, one buys by the hour |
| 19 | Simulation | | — | — | **Robotics only — what you build when you cannot buy the data** |
| 20 | Policy | ↔ | 19 | Model | **Exact parallel** |
| 21 | Assay | ↔ | 20 | Assay | **Exact parallel, plus statutory certification that has no AI counterpart** |
| 22 | Autonomy | ↔ | 22 | Agency | Analogous |
| 23 | Fleet | ↔ | 21 | Serve | Analogous — the economics of running it |
| 24 | Work | ↔ | 23 | Application | **Exact parallel** |
| 25 | Interface | ↔ | 25 | Surface | **Exact parallel** |
| 26 | Capital & control | ↔ | 26 | Capital & control | **Exact parallel** |
| 27 | Return & residue | ↔ | 27 | Return & residue | **Exact parallel** |

**The absences are the argument of the pair, and there are three of them.**

*First.* Semicon's strata 04–09, 11, 14 and 15 — Design, Patterning, Process, Node, Memory, Package, Fabric, Thermal, Site — have **no robotics row at all**. Nine layers of *making a chip and housing it at scale* compress into one bought-in component here.

*Second.* Robotics' 04–10, 17 and 19 have **no AI row**. Nine layers of *moving mass precisely* — tolerance, bearings, gearing, torque, proprioception, contact, control — have no counterpart in a stack whose output is a number.

Nine against nine, in opposite directions, from the same twenty-seven-row frame. That symmetry is the sentence that justifies building the second site at all, and it belongs in `ROADMAP.md` on day one.

*Third, and it is the one to hold on to.* **Semicon's stratum 24 is called Embodiment**, and its tagline reads: *"Physical AI: the same architectures pointed at joints, wheels and grippers, where being wrong has consequences that no retry button can undo."* One row on that site is this entire site. Nothing needs to link the two for that to be true, and it is worth stating plainly somewhere in the robotics copy — not as a cross-reference, but as the reason the stack deserved its own column.

### 4.2 The twenty-seven, with draft taglines

Taglines are written in semicon's voice and are the actual `a` field of `strata.json`. Edit them, but keep the register: one declarative claim, one surprising fact, no hedging.

| # | Title | Draft tagline |
|---|---|---|
| 01 | **Lithosphere** | Before there is a joint there is a hole in the ground. Iron, copper, aluminium, lithium and the rare earths that make a motor small enough to fit inside an arm — and at the refined end, the last of those come from effectively one country. |
| 02 | **Feedstock** | Purification and alloying. Sintered neodymium–iron–boron doped with dysprosium so it survives a hot motor, cathode powder, bearing steel held to one part in ten thousand, and the grease that decides how long a gearbox lives. |
| 03 | **Stock** | Metal in the shapes you can buy it in — billet, plate, extrusion, casting, carbon prepreg, powder for the bed. Everything above this line is subtraction, fusion or forming. |
| 04 | **Fabrication** | Tolerance is bought, not designed. Grinding, gear hobbing, hard turning, sintering and additive: a robot's repeatability is set by the machines that made its parts, and those machines come from about a dozen firms. |
| 05 | **Bearings & guides** | Something has to hold an axis still while it turns. Crossed-roller bearings, linear rails, ball screws and thin-section rings — the least glamorous parts in the stack, and among the most concentrated. |
| 06 | **Transmission** | This is robotics' deepest moat. A strain-wave gear puts a hundred-to-one reduction and near-zero backlash inside a pancake the width of two fingers, and the world has been buying almost all of them from two Japanese firms. |
| 07 | **Motor** | Torque per kilogram is the whole game. Brushless permanent-magnet machines, built frameless so the joint can be assembled around them, and a magnet whose behaviour at 120 °C decides how hard the arm can push. |
| 08 | **Actuation** | The joint as a product: motor, gearbox, encoder, brake, driver and thermal path sold as one part. This is where most of a modern robot's cost sits, which is why the actuator rather than the algorithm sets the price. |
| 09 | **Proprioception** | Knowing where your own body is turns out to be harder than seeing the room. Encoders, resolvers, inertial measurement, joint torque and current sensing — the difference between a machine that can push and one that can only move. |
| 10 | **Exteroception** | Cameras, depth, LiDAR, radar, event sensors and skin. The cost curve here bent roughly a decade after the algorithms were ready, which is most of the reason perception arrived when it did rather than when it could have. |
| 11 | **Compute** | Inference that has to finish. A robot's compute budget is bounded by what a battery can carry and what a control loop can wait for — a different problem from the one a data centre solves, and solved by different parts. |
| 12 | **Power** | The robot carries its own grid. Cells, pack, battery management, DC bus and power stage — and an energy budget in which the actuators, not the compute, are the load. |
| 13 | **Chassis & end-effector** | Links, housings, cable routing, ingress protection, and the hand at the end of it. The arm is close to commoditised; what it holds is not, and gripper design is where most integration effort actually goes. |
| 14 | **Assembly** | Who actually builds robots. Contract manufacture, harnessing, calibration rigs and the burn-in that decides whether the machine you receive matches the datasheet you bought. |
| 15 | **Firmware & real-time** | Loops that must close. Current control at tens of kilohertz, EtherCAT and CAN on the wire, a real-time kernel underneath, and a safety-rated path that has to keep working when everything else has stopped. |
| 16 | **Middleware** | The plumbing between a policy and a joint. ROS 2 and DDS, drivers, transforms, logging and digital twins — unglamorous, near-universal, and the reason a research demonstration and a product are different objects. |
| 17 | **Control** | Kinematics, dynamics and the arithmetic of contact. Model-predictive control, whole-body control, impedance and admittance — sixty years of theory that a learned policy sits on top of rather than replaces. |
| 18 | **Data** | Robotics has no internet to crawl. Every hour of manipulation data is bought — teleoperated, demonstrated, or harvested from a deployed fleet — and the cost of that hour is the most important number in the field's economics. |
| 19 | **Simulation** | What you build when you cannot buy the data. Physics engines, rendering, domain randomisation and generated scenes — with a reality gap that is narrow for locomotion and stubbornly wide for contact. |
| 20 | **Policy** | The model that turns pixels and proprioception into torque. Vision-language-action models, diffusion policies, reinforcement and imitation learning — the layer that made this a live field again after twenty flat years. |
| 21 | **Assay** | You cannot ship what you cannot certify. Benchmarks, reliability testing, mean time between failures, and a statutory safety case — which for anything sharing a floor with a person is a longer pole than autonomy. |
| 22 | **Autonomy** | What happens when it goes wrong. Task planning, recovery behaviours, teleoperation fallback and the intervention rate — the number that decides whether a deployment has a business model. |
| 23 | **Fleet** | One robot is a demonstration. The interesting object is four hundred of them running unattended across nine sites, which is an operations problem wearing a robotics costume. |
| 24 | **Work** | Where torque meets a job to be done. Picking, palletising, welding, assembly, inspection, transport, cleaning, harvest, surgery, last mile — measured against a wage, an hour and a defect rate, not against a benchmark. |
| 25 | **Interface** | How a person tells a machine what to do, and stays safe while it does it. Teach pendants, lead-through, natural language, no-code, light curtains, and speed-and-separation monitoring. |
| 26 | **Capital & control** | The money and the rules. Robots-as-a-service rather than capex, subsidy regimes that rewrite themselves annually, export controls now reaching into actuators and magnets, and a liability question nobody has answered. |
| 27 | **Return & residue** | Payback period, utilisation, the labour that moved rather than vanished — and what is left behind: magnets almost nobody recycles, packs that must be, and machines worth more refurbished than scrapped. |

### 4.3 The colour ramp

The rule, which matters more than the hexes: **deep is warm and saturated, shallow is cool and pale, and the mechanical band 04–14 is deliberately desaturated** because those layers are grey industry and the column should say so. Semicon runs a full spectral sweep; this one runs the same sweep rotated, so a reader can tell the two columns apart at a glance without learning a new encoding.

```
01 #6F4E3C   08 #4184D8   15 #8ACE5F   22 #CE5288
02 #855E42   09 #3D96DE   16 #ADC751   23 #B45AAE
03 #9C7149   10 #3AA9DC   17 #CBBC48   24 #9166C9
04 #93887A   11 #34BCD2   18 #DFA841   25 #7C7FD4
05 #7D8B92   12 #35CFB6   19 #E58F42   26 #93A6BE
06 #5E86AC   13 #45D796   20 #E3714E   27 #C4CEDD
07 #4E86C4   14 #63D577   21 #DC5A66
```

Tune in the browser against the core sample, not in a swatch grid — the bar heights change how the ramp reads. Keep 06 (Transmission) and 20 (Policy) as the two most saturated steps; they are the two layers the site most wants you to look at.

---

## Part 5 — Stations: ~150 candidates, to be trimmed to ~130

A **station** is a distinct technology, process or market with its own physics and its own incumbents. The test semicon uses, which transfers exactly: *if you can name five to eight organisations who genuinely compete at it, and a different five to eight at the thing next to it, they are two stations.*

**Trim rule:** merge any station that cannot name four credible organisations. Better a stratum of four dense stations than seven thin ones — the Moat page's whole "why not a headcount" argument depends on the corpus being *evenly* curated, and semicon enforces that with a test.

Ids below are the actual `i` field. Keep them short, lowercase, no hyphens where avoidable.

### 01 Lithosphere
`ndpr` Neodymium & praseodymium · `heavyre` Dysprosium & terbium · `li` Lithium · `cu` Copper · `feni` Iron, nickel & cobalt · `graphite` Natural & synthetic graphite

### 02 Feedstock
`ndfeb` NdFeB alloy & sintering · `smco` Samarium–cobalt, ferrite & rare-earth-free magnets · `cathode` Cathode & anode active material · `steels` Bearing & tool steel · `polymers` Engineering polymers & elastomers · `lube` Gearbox lubricants & greases

### 03 Stock
`billet` Billet, plate & extrusion · `cfrp` Carbon fibre & prepreg · `castings` Castings & forgings · `powder` Metal powder for additive

### 04 Fabrication
`grind` Precision grinding & superfinishing · `hobbing` Gear cutting & hobbing · `hardturn` Hard turning & five-axis machining · `mim` Metal injection moulding & sintering · `am` Additive manufacture · `metrol` Dimensional metrology & CMM

### 05 Bearings & guides
`xroller` Crossed-roller & thin-section bearings · `linrail` Linear guides & rails · `ballscrew` Ball & roller screws · `bushings` Plain bearings, bushings & seals

### 06 Transmission
`strainwave` Strain-wave (harmonic) gearing · `cycloid` Cycloidal & RV reducers · `planetary` Planetary gearboxes · `qdd` Quasi-direct drive & low-ratio · `belts` Belt, cable & tendon drives · `linact` Linear actuators & screw drives

### 07 Motor
`frameless` Frameless PMSM & BLDC · `torquemotor` Direct-drive torque motors · `servo` Industrial servo motors · `magassy` Rotor & magnet assembly · `windings` Stator winding & lamination

### 08 Actuation
`jointmod` Integrated joint modules · `drives` Servo drives & motor controllers · `brakes` Fail-safe brakes & clutches · `sea` Series-elastic & compliant actuation · `fluidic` Hydraulic & pneumatic actuation · `thermact` Actuator thermal management

### 09 Proprioception
`encoders` Optical & magnetic encoders · `resolver` Resolvers & inductive position · `imu` MEMS inertial measurement · `jts` Joint torque & force–torque sensing · `sensorless` Current & back-EMF sensing

### 10 Exteroception
`cam` Industrial & embedded cameras · `depth` Stereo & structured-light depth · `lidar` LiDAR · `radar` Radar & UWB · `tactile` Tactile sensing & e-skin · `event` Event cameras & neuromorphic sensing

### 11 Compute
`edgesoc` Edge inference SoCs · `mcu` Real-time MCUs & FPGAs · `robomodule` Robot compute modules & carrier boards · `traincompute` Training compute for robot policies **← the declared boundary station (D3)** · `determinism` Deterministic execution & time-sensitive networking

### 12 Power
`cells` Cells for mobile robots · `pack` Packs, BMS & fast charge · `powerstage` Power electronics & DC bus · `tether` Mains, tether & slip rings · `dock` Docking, swap & opportunity charging

### 13 Chassis & end-effector
`links` Links, housings & structural design · `gripper` Grippers & vacuum end-effectors · `hand` Dexterous hands · `toolchange` Tool changers & quick-change · `cabling` Cable routing & dress packs · `ingress` Ingress protection, cleanroom & washdown

### 14 Assembly
`cm` Contract manufacture & EMS for robots · `harness` Wire harness & connectors · `calib` Calibration, burn-in & acceptance test · `secondsource` Supplier qualification & second sourcing

### 15 Firmware & real-time
`currentloop` Current & torque control loops · `fieldbus` EtherCAT, CAN & fieldbus · `rtos` Real-time OS & scheduling · `safetyio` Safety-rated I/O & functional safety · `otafw` Firmware update & rollback

### 16 Middleware
`ros` ROS 2 & DDS · `drivers` Drivers, URDF & transforms · `twin` Digital twin & offline programming · `logging` Logging, replay & observability · `bt` Task orchestration & behaviour trees

### 17 Control
`kine` Kinematics & inverse kinematics · `dyn` Dynamics & system identification · `mpc` Model-predictive control · `wbc` Whole-body & balance control · `impedance` Impedance & admittance control · `motionplan` Motion planning & collision avoidance

### 18 Data
`teleop` Teleoperation rigs & data collection · `demo` Human demonstration & wearable capture · `fleetdata` Fleet-harvested data · `openx` Open datasets & data consortia · `annot` Annotation & curation for action data

### 19 Simulation
`physeng` Physics engines & contact solvers · `render` Photoreal rendering & synthetic data · `domainrand` Domain randomisation & sim-to-real · `scenegen` Scene & asset generation · `benchsim` Simulation benchmarks

### 20 Policy
`vla` Vision-language-action models · `diffpolicy` Diffusion & flow policies · `rl` Reinforcement learning for control · `il` Imitation & behaviour cloning · `worldmodel` World models & predictive models · `rfm` Robot foundation model providers

### 21 Assay
`benchmark` Manipulation & locomotion benchmarks · `reliability` Reliability, MTBF & durability testing · `machsafety` Machine safety standards · `servicesafety` Service & personal-care robot standards · `certbody` Notified bodies & certification · `failure` Failure analysis & adversarial testing

### 22 Autonomy
`taskplan` Task planning & sequencing · `recovery` Error recovery & exception handling · `remoteassist` Teleoperation fallback & remote assist · `intervention` Intervention rate & autonomy measurement · `hri` Human–robot interaction & shared autonomy

### 23 Fleet
`fleetops` Fleet management & scheduling · `ota` Over-the-air update & configuration · `roc` Remote operations centres · `service` Field service, spares & uptime · `interop` Multi-vendor interoperability

### 24 Work
`pickpack` Piece picking & order fulfilment · `palletise` Palletising & depalletising · `weld` Welding & material joining · `assemble` Assembly & screwdriving · `inspect` Inspection & in-line metrology · `intralog` Intralogistics & AMR transport · `clean` Cleaning & facilities · `agri` Agriculture & harvest · `surg` Surgical robotics · `avdrone` Autonomous vehicles & UAS · `lastmile` Last mile & sidewalk delivery · `construct` Construction & mining automation

*(24 is the widest stratum by design, as Application is in semicon. The last four are the D2 boundary stations: present, named, not expanded.)*

### 25 Interface
`pendant` Teach pendants & lead-through · `nlprog` Natural-language & no-code programming · `commission` Offline programming & commissioning · `perimeter` Safety perimeters, scanners & light curtains · `ssm` Speed-and-separation & power-and-force limiting

### 26 Capital & control
`raas` Robots-as-a-service & leasing · `capexpolicy` Capex, subsidy & industrial policy · `exportctl` Export control & dual-use · `liability` Liability, insurance & standards liability · `mechip` Patents & IP in mechatronics · `labourlaw` Labour law, works councils & deployment consent

### 27 Return & residue
`payback` Payback, utilisation & cost per hour · `labourshift` Displaced and created labour · `refurb` Refurbishment & secondary market · `recycle` Magnet, motor & pack recycling · `decom` Decommissioning & end of life

**Total: 150 candidates.** Trim to ~130 during curation using the four-organisation rule.

---

## Part 6 — Organisations, and the investment thread

### 6.1 The model, unchanged

Each station names five to eight organisations in `co[][]` as `[name, role, domain, jurisdiction]` — **editorial policy, not a ranking and not a census.** `companies.json` is the separate ticker spine: `{name, kind, ticker, parent, parentShare, stations[], attribution, attributionBasis}`, where `parent` on a division holds a **ticker, not a name**.

### 6.2 A seed list — to verify, never to cite

Everything below is a starting point drawn from search on 18 Aug 2026 and from general knowledge. **None of it is corpus-ready.** Verify every name, listing, ownership and jurisdiction against a primary source at curation time; several of these changed hands inside the last eighteen months.

| Band | Names to start from |
|---|---|
| **Rare earth & magnets (01–02)** | MP Materials, Lynas, China Northern Rare Earth, JL MAG, Ningbo Yunsheng, Shin-Etsu Chemical, TDK, Proterial, Vacuumschmelze, Neo Performance Materials, Niron Magnetics, Solvay, Energy Fuels |
| **Steel, polymer, lubricant (02–03)** | Sandvik, Böhler, Daido Steel, Klüber (Freudenberg), Fuchs, Nye Lubricants, Toray, Teijin, Hexcel, DuPont, Igus |
| **Fabrication & metrology (04)** | DMG Mori, Yamazaki Mazak, Okuma, Makino, Studer (United Grinding), Gleason, Klingelnberg, Hexagon, Zeiss, Renishaw, Mitutoyo, Keyence |
| **Bearings & guides (05)** | NSK, NTN, JTEKT, THK, HIWIN, IKO/Nippon Thompson, Schaeffler, SKF, Timken, RBC Bearings, PMI, Kaydon (Timken), Luoyang LYC |
| **Transmission (06)** | Harmonic Drive Systems, Nabtesco, Sumitomo Heavy Industries, Leaderdrive, Zhejiang Shuanghuan Driveline, Ningbo Zhongda Leader, Spinea (Nabtesco), Wittenstein, Neugart, Apex Dynamics, Sejin, Nidec Drive Technology |
| **Motors (07)** | Nidec, MinebeaMitsumi, Maxon, Faulhaber, Kollmorgen (Regal Rexnord), Moog, Allient, Sanyo Denki, Tamagawa Seiki, Estun, Inovance, Leadshine, Sanhua, Tuopu |
| **Actuation & drives (08)** | Schaeffler, Bosch Rexroth, Magna, Parker Hannifin, Festo, SMC, Elmo Motion Control, Advanced Motion Controls, Copley, Technosoft, Mabuchi, Dynamixel/Robotis |
| **Proprioception (09)** | Heidenhain, Renishaw, Broadcom, iC-Haus, Posital, Netzer, RLS, Sanyo Denki, Bosch Sensortec, TDK InvenSense, Analog Devices, STMicroelectronics, Honeywell, Epson, ATI (Novanta), Bota Systems, Kistler, HBK (Spectris), Robotiq |
| **Exteroception (10)** | Basler, Cognex, Sony Semiconductor, onsemi, Teledyne FLIR, Intel RealSense, Orbbec, Luxonis, Zivid, Photoneo, Hesai, RoboSense, Ouster, Luminar, Innoviz, Aeva, Prophesee, iniVation, GelSight, Contactile, Tacterion |
| **Compute (11)** | NVIDIA (Jetson/Isaac), Qualcomm, Texas Instruments, NXP, Infineon, STMicroelectronics, Renesas, Microchip, AMD/Xilinx, Ambarella, Hailo, Horizon Robotics, Rockchip, Advantech, Aetina, Connect Tech |
| **Power (12)** | CATL, BYD, LG Energy Solution, Samsung SDI, Panasonic Energy, EVE, Molicel, RRC, Vicor, Infineon, onsemi, Mersen |
| **End-effectors & hands (13)** | Schunk, Zimmer, OnRobot, Robotiq, Piab, Schmalz, Soft Robotics, Righthand Robotics, Shadow Robot, Wonik, Tesollo, Sanctuary, Inspire Robots, LinkerBot |
| **Assembly (14)** | Jabil, Foxconn, Flex, Celestica, Benchmark, Sanmina, TE Connectivity, Molex, Harting, Lapp, Amphenol |
| **Firmware, middleware, control (15–17)** | Beckhoff, Bosch Rexroth, Codesys, Wind River, Blackberry QNX, eProsima, RTI, ZettaScale, Apex.AI, Open Source Robotics Alliance, Intrinsic (Alphabet), Foxglove, Formant, InOrbit, Freedom Robotics, Realtime Robotics, Wandelbots, Micropsi |
| **Data & simulation (18–19)** | Scale AI, Encord, Surge, Dexmate, NVIDIA (Omniverse/Isaac Sim), Google DeepMind (MuJoCo), Unity, Epic Games, Coppelia, Genesis, Applied Intuition, Foretellix, Duality, Open X-Embodiment consortium |
| **Policy (20)** | Physical Intelligence, Skild AI, Google DeepMind (Gemini Robotics), NVIDIA (GR00T), Covariant (Amazon), Figure (Helix), Generalist, Dyna Robotics, AgiBot, Unitree, Boston Dynamics, Toyota Research Institute, Meta FAIR |
| **Assay & safety (21)** | TÜV Süd, TÜV Rheinland, TÜV Nord, UL Solutions, DEKRA, Pilz, Sick, Keyence, Omron, Banner, Schmersal, ISO/TC 299, A3, IEC |
| **Platforms & integrators (22–25)** | Fanuc, Yaskawa, ABB Robotics (SoftBank), KUKA (Midea), Kawasaki, Denso, Epson, Staubli, Comau, Universal Robots & MiR (Teradyne), Doosan Robotics, Rainbow Robotics, Techman, Estun, JAKA, AUBO, Elite Robots, Neura Robotics, Agile Robots |
| **Mobile & warehouse (23–24)** | Symbotic, AutoStore, Ocado, Dematic (Kion), Daifuku, Murata Machinery, Locus Robotics, 6 River, Fetch (Zebra), Geek+, Hai Robotics, Quicktron, Exotec, Vecna, Seegrid, Third Wave |
| **Humanoids (13, 20, 24)** | Figure, Tesla (Optimus), 1X, Apptronik, Agility Robotics, Boston Dynamics (Hyundai), Unitree, AgiBot, UBTech, Fourier, Galbot, Xpeng, Sanctuary, Neura, PaXini |
| **Capital & indices (26)** | KraneShares KOID, ROBO Global, ARK, Global X BOTZ, SoftBank, Hyundai, Midea, Amazon, Alphabet, Nvidia's venture arm |

### 6.3 The investment thread, without holding a price

This is the part the brief specifically asked for, and it is served by four things, none of which needs market data:

1. **The Index**, exactly as semicon builds it — every organisation with a listing gets a Price column that links out to Yahoo; everything else shows a dash. The dashes are informative.

2. **Moat**, which is the pricing-power map. Jurisdictional concentration per stratum, chokepoint pips beside it, per-layer roster on click.

3. **Fragility-adjusted exposure** — semicon's highest-value unbuilt idea, and it is worth *more* here. One computed sentence per organisation: *"X's production passes through N single-source stations."* It comes out of `cone()` and the criticality pips and needs nothing new. **Ship this in v1 rather than deferring it**; it is the most quotable thing the corpus can produce and it is the sentence an investor actually wants.

4. **Listedness coverage as a stated finding.** Compute what fraction of the corpus is investable at all, by stratum, and put the number on Moat. The expected shape — investable at the shallow and compute ends, largely private through the mechanical middle — is the site's most useful claim for a reader with money at stake, and it is arithmetic over `companies.json`. See Part 9, finding 8.

**The claim to aim at, if the corpus supports it:** *the robotics indices buy the ends of the stack; the graph says the moat is in the middle.* Testable, computed, and no other site can draw it.

---

## Part 7 — The nine tabs and Method, one brief each

Each brief gives: what is identical, what changes, the **headline arithmetic** (which must be computed at render and reconciled by a test, never typed), and the acceptance conditions. Semicon's pattern — *a headline claim is arithmetic, never a typed sentence* — is the single most valuable thing to carry over.

### 7.1 Descent · depth · `#v-strata`

**Identical:** hero, core sample, rail, stratum sections, station cards with criticality pips, the sheet, the guided tour.

**Changes:** copy only. Hero: *"Every action a machine takes begins as **ore.**"* Subhead names the surprising middle of the chain — strain-wave gears, sintered magnets, crossed-roller bearings, joint torque sensing, contact dynamics, teleoperation rigs, diffusion policies, and finally a machine putting something down where it was asked to.

**Headline arithmetic:** hero stats computed from the corpus — strata, stations, organisations, jurisdictions.

**Acceptance:** every station resolves to a stratum; every stratum has at least three stations; the tour visits a coherent path from 01 to 27. Freeze on ship (D14).

### 7.2 Web · causality · `#v-web`

**Identical:** the whole view. `cone()` from `lib/graph.js`, upstream/downstream tracing, pan and zoom.

**Changes:** `edges.json` only.

**Watch:** the robotics graph is shaped differently from semicon's. Semicon's is close to a chain with fan-in; this one is a **convergent assembly tree** — dozens of components converge on stratum 13, and then a much thinner software chain runs up from there. Expect a visibly different silhouette, and do not "fix" it. Expect roughly 350–450 edges.

**Acceptance:** no unresolvable edge references; `traincompute` is the only station in 11 with no upstream (D3); every station above 13 has at least one path down to stratum 01.

### 7.3 Moat · barrier to entry · `#v-moat`

**Identical:** the whole mechanic — bar length and shade encode one variable, chokepoint pips beside but never folded in, per-layer roster on click, the three handling rules stated on the page.

**Changes:** the finding, and possibly the shape.

**Headline arithmetic:** mean jurisdictional concentration across the deepest nine strata, the middle nine, and the shallowest nine. Semicon reports **deepest nine 0.24, shallowest nine 0.59** — monotonic, shallow end more concentrated. Report all three bands here, because the expected robotics shape is a **waist**, not a gradient, and a two-band comparison would hide it.

**Also compute, and put on the page:** the "why not a headcount" control — organisations per stratum across the three bands — exactly as semicon does, so the reader can see the corpus is evenly curated and the concentration figure is a measurement rather than an artefact of how it was written.

**New for this site:** listedness coverage per stratum (Part 6.3, item 4). One additional metric button beside the concentration axis. It is arithmetic over `companies.json` and holds no price.

**Acceptance:** every stratum has at least one organisation with a stated jurisdiction, or `check-data` fails. The three-band figures are computed at render and asserted. The pips are never summed into the index.

### 7.4 Ruler · scale · `#v-rul`

**Identical:** the entire mechanic. One camera value `z = log₁₀(metres)`; an object of size *d* sits `log₁₀d − z` decades from centre and is drawn `REF × 10^(log₁₀d − z)` pixels across. `PX_DECADE / REF` **must clear 4.13** or objects are drawn inside their neighbours — see Part 14. Precision flags `exact` / `typical` / `approx`. Five lanes with the legend stating in as many words that vertical position carries no data.

**Changes:** all 36 objects, and `lib/glyphs.js`.

**Span:** roughly `[-9.2, 7.2]` — about sixteen decades, comparable to semicon's 17.7. Deep end is surface finish and encoder resolution rather than a lattice constant.

**Draft objects, deep to shallow:** bearing raceway roughness (~2×10⁻⁸ m) · encoder interpolation resolution · gear tooth profile error (~1×10⁻⁶) · encoder line pitch (~2×10⁻⁵) · industrial arm repeatability, ±0.02 mm (2×10⁻⁵) · a human hair (7×10⁻⁵) · MEMS IMU proof mass · flexspline wall thickness (~3×10⁻⁴) · humanoid hand repeatability (~1×10⁻³) · tactile taxel pitch (~2×10⁻³) · a bearing ball (5×10⁻³) · human fingertip contact patch (~1×10⁻²) · a magnet segment (~2×10⁻²) · a motor stator (~5×10⁻²) · gripper stroke (~8×10⁻²) · a joint module (~1.2×10⁻¹) · human hand span (~1.9×10⁻¹) · humanoid forearm (~3×10⁻¹) · human reach (~7×10⁻¹) · a cobot's reach (~1.3) · a humanoid (~1.7) · an industrial arm's reach (~2.8) · a robot cell (~1×10¹) · a warehouse floor (~1×10²) · a fulfilment centre (~3×10²) · a car plant (~1×10³) · a port terminal (~2×10³) · a delivery service radius (~1×10⁴) · a national fleet footprint (~1×10⁶) · the Earth (1.27×10⁷).

**The two teaching moments** — this is what makes the Ruler worth having, and both are robotics-specific:

- **Around 10⁻⁵.** An industrial arm's repeatability (±20 µm) sits beside a human hair (70 µm) and a gear profile error (1 µm). *A robot arm repeats better than you can see, and still cannot reliably put a peg in a hole* — because repeatability is not accuracy, and neither one is dexterity. This is the single best thing on the page and the copy should say it plainly.
- **Around 10⁻¹.** The human hand span at ~190 mm beside a dexterous robot hand and a two-finger gripper. Hold it up to the screen. Direct counterpart of semicon's reticle-field moment.

**Acceptance:** the scale-truth assertion (ten times bigger is drawn ten times bigger) — carry it over verbatim, it is the page's whole integrity. No empty decade in the middle. Two objects cross-checked against the Atlas, as semicon cross-checks Spruce Pine and Hsinchu.

### 7.5 Atlas · space · `#v-atl`

**Identical:** hand-rolled equirectangular projection, geodesic rings computed as a hundred points each *r* km from centre, strokes counter-scaled in `paint()`, `clampCam()` folding, the ±170° constraint, the four layers, the tap-resolved-in-`pointerup` pattern (Part 14).

**Changes:** all ~56 sites, and the headline.

**Site classes to cover:** rare-earth mines and separation (Bayan Obo/Baotou, Ganzhou, Mount Pass, Kalgoorlie/Kuantan, Silmet) · magnet sintering (Ningbo, Ganzhou, Shin-Etsu Takefu, Vacuumschmelze Hanau) · precision gear works (Hotaka/Nagano, Tsu, Yuhuan/Taizhou, Suzhou) · bearing and screw plants (Schweinfurt, Herzogenaurach, Gothenburg, Fujisawa, Taichung, Yamagata) · encoder works (Traunreut, Wotton-under-Edge) · sensor fabs · cell plants (Ningde, Ochang, Kariya) · robot assembly (Oshino, Kitakyushu, Västerås, Augsburg, Odense, Hangzhou, Shanghai, Fremont, Austin, Salem, Waltham) · deployment concentrations (a fulfilment network, a car plant cluster) · one chokepoint strait or corridor.

**Headline arithmetic — the counterpart of semicon's 170 km²:** draw a true-scale circle around every site on Earth that can separate heavy rare earths *and* every site that can sinter robotics-grade NdFeB, and report the enclosed ground. Semicon's version — nine leading-edge logic sites enclosing about 170 km², less than Milan — is the most travelled sentence on that site. Find this site's equivalent, compute it, and let the build fail if it stops being true. **Do not type a number here until it is computed.**

**Acceptance:** every site resolves to at least one station. Rings true to one part in 10⁹. Drawn aspect matches 1/cos(latitude), not 1. No site within 10° of the antimeridian. Two sites cross-checked against the Ruler.

### 7.6 Lag · time · `#v-tml`

**Identical:** two dates per capability, one bar each, laid out by stratum, no camera, a scrubber from the earliest year, a 27-cell strip lighting strata as they land, unfinished capabilities drawn with no right-hand end and marked `open`.

**Changes:** ~70 capabilities, and `meta.span` — start at **1954** (the first industrial-robot patent) or **1961** (Unimate at GM) rather than semicon's 1947.

**Seed capabilities, invented → shipped in volume:** strain-wave gearing (1955 → 1970s) · the industrial arm (1961 → 1970s) · the vacuum gripper · SCARA (1978 → 1980s) · delta robot (1985 → 1990s) · impedance control (1985 → 2010s) · behaviour cloning, ALVINN (1988 → 2023) · SLAM (1986–2000s → 2010s AMRs) · RRT (1998 → 2000s) · ROS (2007 → 2010s) · power-and-force-limited cobots (2008 → ISO/TS 15066 in 2016) · quasi-direct-drive legged actuation (2013 → 2020s) · solid-state LiDAR (2010s → 2020s) · sim-to-real deep RL locomotion (2017–19 → 2021+) · diffusion policies (2023 → open) · vision-language-action models (2023 → open) · dexterous hands (1986 → open) · tactile skin (1980s → open) · whole-body MPC · battery-electric humanoids (Asimo 2000 → 2024+).

**Headline arithmetic:** the median wait per band, and the gradient across the column. Semicon reports **10 years from rock to package, 6 through silicon, 3 from software to sentence**, strictly decreasing, and asserts both the numbers and the monotonicity.

**The finding to look for** — and this is a `[hypothesis]`, so compute it or drop it: *robotics' median wait is materially longer than the AI stack's, and the binding constraint was almost never the science.* Semicon found that of twelve capabilities that waited thirty years or more, only three were waiting on the science. The robotics version of that sentence should be sharper still, because the constraint here has usually been **cost per newton-metre or cost per pixel**, not a missing idea. Count them, name them, and let `check-data.mjs` hold the prose to the corpus the way semicon does.

**Acceptance:** no stratum with zero entries or only unshipped ones. An entry with no ship date must be marked `open` or the build fails. An arrow is not a forecast.

### 7.7 Faults · counterfactual · `#v-flt`

**Identical:** remove a station, walk the graph downstream with `cone()`, draw the reach. **Reach is arithmetic; reroutes and dead-ends are declared judgement; the two are drawn in different colours and never added together.** The unclassified remainder stays visible and the build fails if any scenario classifies its whole blast radius.

**Changes:** eight scenarios.

**Draft scenarios:** heavy rare earths (dysprosium/terbium licensing) · strain-wave gearing · precision bearings and ball screws · edge inference silicon · LiDAR and depth sensing · lithium cells · the teleoperation and demonstration data supply · **a fatal incident and a certification freeze**.

That last one has no counterpart on semicon and is the reason this page is worth rebuilding rather than porting. It is not a supply shock — it is a **permission shock**, it propagates upward through Assay rather than downward through the graph, and the corpus is the only way to show what it touches. Model it explicitly as a different kind of edge if the graph will not carry it; do not force it into the supply topology just because the machinery exists.

**Headline arithmetic:** the comparison semicon makes — the widest blast radius versus the slowest one, and the fact that they are different faults. Compute the same two figures here and let `check-data.mjs` fail if the wider one stops being the faster one, because at that point the page's argument has evaporated.

**Acceptance:** every declared reroute or dead-end names a station the graph actually connects to the removal; no station classified twice; every cited precedent resolves to a real capability on the Lag chart.

### 7.8 Cascade · energy & matter · `#v-cas`

Full specification in Part 8. Identical mechanics: every parameter in `cascade.json` with a **range**, a **derivation written out in full** and a **source**; the chain in `lib/cascade.js` as plain arithmetic; the operator shown is the operator applied; `reconcile()` re-checks the displayed arithmetic across every assumption combination on every test run.

### 7.9 Index · `#v-idx`

**Identical:** searchable table, one row per organisation per station, Price column linking out to Yahoo, dash where there is no listing. The `q` field built in `initTable()`.

**Changes:** the corpus, and the tickers' symbol conventions — Tokyo, Taipei, Shenzhen, Shanghai STAR, Seoul, Hong Kong, Frankfurt, Stockholm and Oslo will all appear. Yahoo's convention is what `tickers.js` already assumes; keep it, for exactly the reason semicon states — every other provider would need a hand-maintained symbol map.

### 7.10 Method · outside the tab group

**Identical:** generated from the same JSON the site runs on. Claims grouped by kind — **judgement first**, then curated, cited, derived — reading definitions, the assumption ledger straight out of `cascade.json`, and a limits section that is the point of the page.

**Robotics-specific limits to state up front, because they are real:**
- Bill-of-materials breakdowns are analyst estimates that disagree by a factor of three (D9).
- Unit shipments and installed base for humanoids are largely company-reported.
- Market shares in precision reducers are contested; published figures range widely and vintages matter.
- Jurisdiction is the country of the operating entity, not of ultimate ownership — the same limit semicon states, and it bites harder here because of how many suppliers are subsidiaries.
- The certification landscape moved in 2025–26 and any standard cited must carry its edition year.

### 7.11 The tenth tab — **Nines** — designed, not shipped

Do not build this in v1. Build it as Phase 12, after nine tabs match semicon's nine.

**The question:** how much does each additional nine of reliability cost, and what does it buy?

This is the single largest structural difference between the two stacks, and neither site can currently show it. In the AI stack, an answer that is 95% right is often useful. In the physical stack, an action that succeeds 95% of the time means an intervention every twenty attempts — which is not a slightly worse product, it is **no product**, because the intervention needs a human, and the human is the cost the robot existed to remove.

**Shape:** x = success rate on a log-odds axis (90%, 99%, 99.9%, 99.99%); y = human-minutes per robot-hour implied at that rate; a band of task classes drawn at the reliability each currently reaches. The reader sees the wall.

**Why it waits:** it needs `intervention` and `reliability` curated to a standard the corpus will not reach in v1, and shipping it thin would make the site's best argument its weakest page.

**Two further lenses worth designing later, in priority order:** **Duty** (cost per robot-hour against a wage, by geography — the investing lens, and it needs `payback` curated) and **Envelope** (the payload × reach × repeatability × speed trade space, which is the one chart every robotics buyer draws by hand).

---

## Part 8 — The Cascade, specified

Semicon's Cascade follows 1,000 output tokens backwards through the stack until it arrives at rock, with every conversion parameter carrying a range, a full derivation and a source. This is the direct counterpart, and it is the lens most likely to produce this site's most quoted sentence.

### 8.1 The unit

**One hour of autonomous physical work.**

A robot is a durable good, not a flow, so the unit has to amortise a machine across the hours it works. That amortisation is not a technicality — it *is* the argument, because it means every answer on the page moves with utilisation, and utilisation is the number the industry argues about.

### 8.2 The three reference machines

Declared in `cascade.json` as the first assumption. Figures below are **placeholders of the right order of magnitude**; source and range every one at curation.

| | **A · Industrial arm** | **B · Mobile manipulator** | **C · General-purpose humanoid** |
|---|---|---|---|
| Form | 6-axis, fixed base | AMR base + arm | bipedal, ~1.6 m |
| Payload | ~20 kg | ~5 kg | ~15 kg |
| Mass | ~250 kg | ~150 kg | ~60 kg |
| Actuated joints | 6 | ~8 | 30–45 |
| Average electrical draw | ~1.5 kW | ~600 W | ~500 W |
| Power source | mains | battery | battery |
| Service life | 10–15 y | 6–8 y | 3–5 y |
| Duty | 4,000–6,000 h/y | 2,000–4,000 h/y | 1,000–3,000 h/y |

The three exist because **the answer changes sign between them**, and a page that hid that behind a single "representative robot" would be lying by averaging.

### 8.3 The four assumptions

Mirrors semicon's four (model class, service life, utilisation, grid intensity) and produces **192 combinations** against semicon's 108. `reconcile()` must check every one on every test run.

1. **Machine class** — A / B / C above. Dominates everything downstream, the way model class dominates semicon's chain.
2. **Service life** — 3 / 5 / 10 / 15 years. The same argument as accelerator depreciation: obsolescence, not failure, is what usually ends it.
3. **Duty cycle** — 1,000 / 2,000 / 4,000 / 6,000 hours per year. This is robotics' single most contested number and everything amortised scales inversely with it.
4. **Autonomy level** — fully autonomous / one intervention per 100 h / one per 10 h / continuously teleoperated. Converts to **human-minutes per robot-hour**, which is the axis that has no counterpart on semicon and is where the honest answer about "autonomy" lives.

### 8.4 The chain — eight steps, backwards

| Step | From → to | The parameter that matters |
|---|---|---|
| 1 · **Work** | 1 robot-hour → tasks completed | cycle time, success rate, changeover |
| 2 · **Energy** | → Wh drawn in that hour | split explicitly into **actuation / compute / thermal / idle**. The split is a finding in itself. |
| 3 · **Wear** | → hours consumed from the wear parts | gearbox L10 life, bearing life, battery cycles, harness flex life, brake cycles |
| 4 · **Machine** | → fraction of one machine consumed | 1 ÷ lifetime hours; yields grams of machine per robot-hour |
| 5 · **Materials** | → that mass, decomposed | steel, aluminium, copper, NdFeB, Li-ion, polymer, silicon |
| 6 · **Embodied energy** | → MJ to make that mass | per-material embodied energy, and it is where aluminium and magnets surprise people |
| 7 · **Ore** | → kg of rock moved | ore grade and recovery rate. **The rare-earth line is the shocking one** — dysprosium and terbium sit at parts-per-million in the ore body, so a few grams of magnet carries a large number here. |
| 8 · **Human** | → human-minutes per robot-hour | supervision, intervention, maintenance, integration amortised, and demonstration hours amortised across the fleet |

**Step 8 has no semicon counterpart and it is the most interesting step in the chain.** Put it last so the page lands on it.

### 8.5 The branches

Six, matching semicon's count: **water** (manufacturing, not cooling) · **CO₂e** (embodied plus operating, at a grid-intensity assumption) · **rare-earth mass and its provenance** · **cost per robot-hour** (amortised capex + energy + service + human) · **data** (hours of demonstration amortised per robot-hour) · **downtime** (unplanned stop-hours per 1,000 robot-hours).

The cost branch is the one that matters commercially, because it is the only figure on either site that can be **compared to a wage**. Give it a jurisdiction selector and let the reader see where the crossover sits. Hold the wage figure to a cited source with a vintage, like everything else.

### 8.6 The finding to chase

Semicon's headline is that **running the chip costs about 500× the fab energy embodied in it** — the sand was never the constraint.

The robotics counterpart is *not* a constant, and that is the point. A rough sketch, which the next session should redo properly:

- A humanoid at ~60 kg embodies something in the region of 5–15 GJ (1,400–4,200 kWh) across steel, aluminium, copper, magnet, cells and electronics. `[hypothesis]`
- At 500 W and 10,000 lifetime hours it draws ~5,000 kWh operating. Comparable.
- At 2,000 lifetime hours — one optimistic year — embodied energy dominates heavily.
- An industrial arm at 1.5 kW over 40,000+ lifetime hours draws ~60,000 kWh against a few thousand embodied. Operating dominates by an order of magnitude.

So: **in the physical stack, the making/running ratio is not a constant. It crosses over inside the range of plausible assumptions, and where it crosses is the entire argument for utilisation.** If that survives the arithmetic it is a better finding than a single ratio would have been, and it justifies the assumption toggles rather than merely decorating them. `[hypothesis — compute it]`

### 8.7 Non-negotiable properties

Carried over verbatim, because they are what make the page believable:

- **The operator shown is the operator applied.** The engine reports the factor it used at each step and the interface displays that value rather than re-deriving one.
- **The arithmetic reconciles.** `reconcile()` applies each reported factor to the quantity it claims to act on and checks the result matches the value shown, across all 192 combinations, on every test run.
- **Every parameter carries a range, a derivation written out in full, and a source.** The build fails if a parameter loses its source or falls outside its own declared range.
- **State the largest single uncertainty out loud.** On semicon it is energy per output token. Here it will almost certainly be **duty cycle**, and saying so is the honest version of the page.

---

## Part 9 — Findings to seed

`notes.json` holds findings that cut against the grain. Each is load-bearing — it changes how the rest of the stack reads — and each is either derived from the corpus or cited. Weight 3 renders as a full callout, 2 as a compact one, 1 as an inline flag. Each names the stations, strata, cascade step, ruler object, atlas site, timeline entry or fault it belongs to, and appears everywhere it applies. **`check-data.mjs` recomputes the numbers stated in the prose and fails if the sentence has drifted** — carry that over; it is the single best idea on semicon.

Nine candidates, in the order they are most likely to survive:

**1 · The magnet, not the model.** Most of a modern robot's cost sits in its joints, and the joint's scarcest input is a heavy-rare-earth-doped magnet from effectively one country. *(Anchor: precision reducers are reported at roughly a third of an industrial robot's bill of materials, and China at roughly 90% of permanent-magnet processing `[cited — verify]`.)* This is the direct counterpart of semicon's "most of the silicon is memory, not compute" and should be weight 3.

**2 · Proprioception is harder than vision.** The field's public story is about seeing; the engineering constraint is knowing where your own body is under load. Anchored on the Ruler's 10⁻⁵ moment and on the fact that force–torque sensing has a much thinner supplier base than cameras.

**3 · The constraint was almost never the algorithm.** Compute from the Lag chart: of the capabilities that waited longest, how many were waiting on science versus on cost per newton-metre or cost per pixel. Semicon found three of twelve. `[hypothesis]`

**4 · The stack has a waist.** Concentration is highest through the precision-mechatronics middle, not at either end — the opposite shape to the AI stack's monotonic gradient. Compute across three bands on Moat. This is the site's most important finding if it holds. `[hypothesis]`

**5 · Reliability, not capability, is the price.** Getting from 99% to 99.9% costs more than getting from nothing to 99%, because the last increment is where the human in the loop is finally removed — and the human was the entire cost being attacked. Feeds the Nines lens later.

**6 · The gripper is the bottleneck, not the arm.** Arms are close to commoditised and price-competitive; end-of-arm tooling is bespoke per application, and it is where most integration effort and most integration cost actually go.

**7 · Making and running cross over.** The Cascade finding from Part 8.6 — the embodied/operating ratio inverts between machine classes and duty cycles. Pairs directly with semicon's 500×.

**8 · You cannot buy the moat.** Compute listedness coverage per stratum. If the shape is what it looks like — investable at the ends, largely private through the middle — then the available robotics exposure is systematically *not* the part of the stack the graph says is defensible. `[hypothesis]` This is the finding that pays for the whole investing thread.

**9 · Permission is a longer pole than autonomy.** For anything sharing a floor with a person, the binding constraint on deployment is a statutory safety case, not a capability. Anchored on the certification stations and the 2025 standards revisions `[cited — verify edition years]`.

Two rules from semicon that make these work: **a finding must surface somewhere or the build fails**, and **derived and declared are never blended** — where a finding mixes computed reach with hand-written judgement, draw them in different colours and count the unclassified remainder out loud.

---

## Part 10 — Nomenclature map

Keep the ontology words identical. A reader who learns one site should not have to learn a second vocabulary.

| Concept | Sand to Sentence | Ore to Action | Change? |
|---|---|---|---|
| A layer of the stack | stratum | stratum | none |
| A technology/process/market inside one | station | station | none |
| A company at a station | organisation | organisation | none |
| Single-point-of-failure read | criticality, 0–3 pips | criticality, 0–3 pips | none |
| Counterintuitive finding | against the grain | against the grain | none |
| Dependency | edge / cone / reach | edge / cone / reach | none |
| Provenance classes | judgement · curated · cited · derived | same | none |
| Precision flags | exact · typical · approx | same | none |
| Terminal unit of value | 1,000 output tokens | one hour of autonomous physical work | **changed (D5)** |
| The raw origin | sand / quartz | ore | **changed** |
| Tab names | Descent · Web · Moat · Ruler · Atlas · Lag · Faults · Cascade · Index · Method | identical | none |
| The persistent depth indicator | the rail | the rail | none |
| The homepage stack graphic | the core sample | the core sample | none |
| Station dossier | the sheet | the sheet | none |
| Guided walk | the descent | the descent | none |

**One new term is permitted**, and only one: **intervention rate** (human-minutes per robot-hour). Define it on Method, use it consistently, and resist adding a second.

---

## Part 11 — Data schemas

Identical to semicon except where marked. `check-data.mjs` validates each in its own labelled section.

```jsonc
// strata.json — 27 records
{ "n": 6, "t": "Transmission", "c": "#5E86AC", "a": "This is robotics' deepest moat…" }

// stations.json — ~130 records. NEVER read whole; use `npm run peek`
{
  "i": "strainwave",           // id
  "L": 6,                      // stratum
  "n": "Strain-wave gearing",
  "s": "A hundred to one, no backlash, two fingers thick",
  "w": "…what it is",
  "h": ["…how it actually works"],
  "k": [["<1 arc-min", "hysteresis loss"]],
  "c": 3,                      // criticality 0–3
  "x": "…why it's a chokepoint",
  "co": [["Harmonic Drive Systems", "role", "harmonicdrive.net", "JP"]]
}

// edges.json — id → [upstream ids]
// companies.json — the ticker spine
{ "name":"…", "kind":"…", "ticker":"…", "parent":"<TICKER, not a name>",
  "parentShare":0.0, "stations":["…"], "attribution":0.0, "attributionBasis":"…" }

// ruler.json      { id, m, glyph, label, sub, precision, station, note }, meta.span
// atlas.json      { id, lat, lon, kind, radiusKm, stations[], precision, regime, risk, source }
// timeline.json   { id, stratum, station, invented, shipped, waitedFor, confidence, source }
// counterfactuals.json { id, removes[], essay, leadTimeYears, precedent, reroutes[], deadEnds[] }
// notes.json      { id, weight, title, figure, figureNote, body, soWhat,
//                   stations[], strata[], cascadeStep, ruler, atlas, timeline, faults,
//                   basis, source{who,what,url} }
// cascade.json    { meta{unit,updated,note}, assumptions[], constants{}, chain[], branches[], stepSources{} }
// method.json     { meta{updated,vintage}, intro, reading[], provenance[], limits[], corrections{} }
// world.json      GENERATED by scripts/world.mjs. Never hand-edit.
// live/tickers.json GENERATED by the weekly link check. Never hand-edit.
```

**Two robotics-specific additions, both optional and both deferrable:**

- `stations.json` may carry `sub: "<capability|component|market>"` to distinguish a physical part from a practice. Only add it if a view needs it; an unused field is a maintenance cost.
- `edges.json` may eventually need a second edge kind for the permission shock in Faults (Part 7.7). Design it as a separate file (`permits.json`) rather than overloading `edges.json`, so the supply graph stays one thing.

---

## Part 12 — Test surface

Semicon runs on the order of **280 assertions plus corpus validation of eleven data files**. Match that discipline; the count will differ.

*(Worth knowing before you copy a number out of that repo: its own three documents disagree — `README.md` says 200 assertions, `ROADMAP.md` says 264 plus eleven data files, `CLAUDE.md` says 283. Nothing recomputes them, which is the one place semicon does not hold its own prose to its corpus. **Make the assertion count computed and asserted on this site**, so the same drift cannot happen twice.)*

**Carried over verbatim** (these are field-agnostic and they are what make the site honest):

- Ruler scale-truth: something ten times bigger is drawn ten times bigger.
- Ruler: no empty decade inside the span; the sweep never blanks the stage.
- Atlas: every ring radius true to one part in 10⁹; drawn aspect matches 1/cos(latitude), not 1; no site within 10° of the antimeridian.
- Lag: no stratum with zero entries or only unshipped ones; an entry with no ship date must be `open`.
- Faults: no scenario classifies its whole reach; no station classified twice; every reroute/dead-end names a station the graph connects; every precedent resolves to a Lag entry.
- Cascade: `reconcile()` across all 192 assumption combinations; every parameter inside its declared range and carrying a source.
- Notes: every finding surfaces somewhere; every named station/stratum/step/object/site exists; **prose figures recomputed against the corpus**.
- Moat: every stratum has at least one organisation with a stated jurisdiction; headline band figures computed at render and asserted.
- Layout parity: the frame is identical across the seven full-width views (Method included); no `ch` measure anywhere in the group; every chart has a marks legend beside it.
- Price hygiene: `valueOf`, `layerTotals`, `capitalAt` and `usd` must not appear in `metrics.js`.

**New for this site:**

- **Engine parity** (D6): the files in Part 3's parity set hash-match `engine.lock.json`.
- **Boundary integrity** (D3): `traincompute` is the only station in stratum 11 with no upstream edges.
- **Even curation**: organisations per stratum does not vary beyond a stated band across the three depth bands — the Moat page's headcount control depends on it.
- **Cross-view consistency**: at least two Ruler objects and two Atlas sites are held to the same number, and the build fails if they disagree. Semicon does this with Spruce Pine and Hsinchu.

---

## Part 13 — Build phases

Each phase ships and is recorded in `ROADMAP.md` with **what it actually landed against the brief it set itself**, including the deviations. That retrospective section is the most useful thing in semicon's roadmap and it should be written every time.

| Phase | Lands | Acceptance |
|---|---|---|
| **0 · Fork & scaffold** | Repo, engine parity test, `engine.lock.json`, empty corpus files, CI, Pages deploy | `npm test` green on an empty corpus; `npm run dev` serves |
| **1 · Strata & Descent** | `strata.json`, `stations.json` (~130), `edges.json`, the Descent, sheet, tour, Index | Every station resolves; hero stats computed; **freeze the homepage on merge (D14)** |
| **2 · Web** | The dependency graph | Boundary integrity assertion passes; graph silhouette reviewed, not "fixed" |
| **3 · Grain & Method** | `notes.json`, `method.json`, the Method page | Every finding surfaces; prose held to the corpus; limits section written before the findings |
| **4 · Cascade** | `cascade.json`, `lib/cascade.js` | `reconcile()` green across 192 combinations; the crossover finding computed or dropped |
| **5 · Moat** | Jurisdictional concentration, three bands, roster, listedness coverage | Three-band figures computed; headcount control on the page; waist finding computed or dropped |
| **6 · Ruler** | 36 objects, `glyphs.js`, two teaching moments | Scale-truth asserted; `PX_DECADE / REF` clears 4.13; no empty decade |
| **7 · Atlas** | ~56 sites, the enclosed-ground headline | Rings geodesic and asserted twice; headline computed, never typed |
| **8 · Lag** | ~70 capabilities, the scrubber | Gradient computed and asserted; nothing unfinished given a date |
| **9 · Faults** | 8 scenarios including the permission shock | Unclassified remainder visible; widest ≠ slowest asserted |
| **10 · Layout parity** | The pass semicon needed and will be needed here too | Eighteen parity assertions; every `ch` gone |
| **11 · Fragility-adjusted exposure** | The computed per-organisation sentence (Part 6.3) | One sentence per organisation with a cone; asserted against the graph |
| **12 · Nines** | The tenth lens (Part 7.11) | Only after `intervention` and `reliability` are curated to depth |

**Order matters in one place:** ship **Cascade before Moat** rather than the other way round. Semicon shipped Cascade at Phase 1 and it set the tone for everything after — it is the page that proves the site does arithmetic rather than assertion, and every later view inherits that credibility.

---

## Part 14 — Traps inherited from semicon

Every one of these cost a debugging session there. Do not rediscover them.

| Symptom | Cause and fix |
|---|---|
| **Ruler objects sit on top of each other** | `PX_DECADE / REF` must clear **4.13**. Shapes grow with 10^Δ and the gap only with Δ, so no amount of vertical stagger fixes an insufficient ratio. Assert it. |
| **A Ruler label reads an order of magnitude off** | Trimming trailing zeros off a whole number turned 550 nm into "55 nm". The bug is in `metres()`, not the JSON. Round-trip it in a test. |
| **Zoom only works over a shape, or the page scrolls instead** | An SVG only hit-tests where it has painted. Bind the wheel to the containing block, not the SVG, and give it `touch-action:none`. |
| **Clicking a mark on a pannable chart does nothing** | `setPointerCapture` retargets every later pointer event *and the synthesised click* to the capturing element, so a listener on the mark can never fire. Resolve the tap in `pointerup` with `elementFromPoint`, guarded by a small drag threshold. This made all 56 Atlas sites unopenable while the preset buttons worked. |
| **…and the target is smaller than it looks** | `fill:none` does not hit-test. A 3 px dot inside an unfilled halo is a 3 px target. Paint a transparent hit disc. |
| **An Atlas circle vanishes after flying somewhere** | Camera left [-180,180); rings drawn once, coastline three times. `clampCam()` folds for this reason. |
| **A page looks narrow on a wide screen** | Check the **unit** first. `ch` is the width of the digit zero in that element's own font; `118ch` in a 14px serif is ~830px, not ~1500px. Never `ch`. |
| **A chart view's layout drifts from the others** | The `LAYOUT PARITY` block at the foot of `app.css` is the one deliberate break in prefix locality. Anything true of all the full-width views lives there, with its reasoning. |
| **The rail is lit for a different page than the one you are on** | The view's `detail()` is not calling `app.depth("<view>", n)`, or is calling it with a stratum it cannot resolve. A view that cannot resolve one reports nothing rather than guessing. |
| **One view blank, others fine** | That view's `init*()` threw; boot is sequential so everything after it stops. |
| **Clicking a chip does nothing** | Chips are re-wired after every re-render — `wireNotes()`. |
| **Blank page, "Could not load the corpus"** | You opened `file://`. ES modules and `fetch` both need HTTP. |
| **Two names claim one ticker** | A duplicate organisation in `stations.json`. Fix the name, regenerate. |
| **CI red, local green** | `npm ci` vs `npm install`, or a file not committed. |

Plus the two process rules that prevented most of the rest: **never read `stations.json` whole — use `npm run peek`**, and **guarantees go in tests, not in care**.

---

## Part 15 — Open questions for the next project

Genuinely unsettled. Each names what would settle it.

1. **Does the waist hold?** Compute three-band concentration early — as soon as `stations.json` has jurisdictions — because findings 4 and 8 and a good deal of the site's copy depend on it. If it comes out monotonic like semicon's, say so and rewrite the copy rather than the data.

2. **Is `Assembly` (14) a real stratum or three stations inside `Chassis` (13)?** It is the weakest of the 27. Merge if it cannot name four organisations who genuinely compete at it.

3. **Should `Simulation` (19) sit above or below `Data` (18)?** Argued both ways: simulation is what you build *because* you lack data (so it sits above), but a simulator is also an input to data generation (so it sits below). Current draft puts Data first. Pick one, write the reason in `ROADMAP.md`, and do not revisit.

4. **How is the permission shock modelled in Faults?** Either a second edge kind in a separate `permits.json`, or a scenario type that walks the corpus by certification class rather than by supply edge. Do not force it into `edges.json`.

5. **What is the Atlas headline?** Semicon's 170 km² is the sentence that travels. The candidate here is enclosed ground across heavy-rare-earth separation plus robotics-grade magnet sintering, but it must be computed before it is promised. If the number turns out unremarkable, find a different one rather than dressing it up.

6. **Which two objects cross-check between Ruler and Atlas?** Needs to be picked once and asserted.

7. **Does the corpus support a wage comparison?** The Cascade's cost branch is the commercially interesting one, but it needs a cited wage series with a vintage and a jurisdiction. If a defensible source cannot be found, ship the branch without it rather than typing a number.

8. **Does this document's org seed list survive contact with primary sources?** Assume roughly a fifth of it is wrong — ownership changes, renames, and at least one acquisition that closed after this was written.

---

## Part 16 — The field template

**This part is field-agnostic. It is what you hand to field #3 and #4 instead of this whole document.**

Everything above is *Sand to Sentence* applied to robotics. What follows is the machine that generated it, written down so the next application is a fill-in rather than a re-derivation.

### 16.1 What one of these sites actually is

> **One hand-curated body of knowledge about a physical production chain, presented as N different indexes on itself, where every headline claim is arithmetic over that body and every arithmetic is held by a test.**

Three properties do all the work, and dropping any one of them collapses the format into an ordinary explainer:

1. **The corpus is the asset and the code is thin.** Adding a section adds a *lens*, not content. If a new feature needs new facts, it is probably a different site.
2. **Nothing is typed that can be computed.** Headlines, medians, totals, gradients — all computed at render, all reconciled by an assertion, so a stale sentence breaks the build instead of shipping.
3. **The limits are a feature, not a disclaimer.** Judgement is labelled judgement, derived and declared are drawn in different colours, the unclassified remainder stays visible, and absent data renders as a dash rather than a zero.

### 16.2 The intake — fourteen questions to answer before writing any JSON

Answer all fourteen in writing, in the field's own handover document, before touching the corpus. Nine of the fourteen determine the site's whole shape.

| # | Question | Why it decides something |
|---|---|---|
| 1 | **What is the terminal unit of value?** | Names the site, anchors the Cascade, and denominates every economic claim. AI: 1,000 tokens. Robotics: one robot-hour. |
| 2 | **What is the raw origin?** | The other half of the title, and the bottom of the column. |
| 3 | **How many strata, and what are they?** | The spine. Order strictly by physical dependence, deep → shallow. |
| 4 | **What is a station in this field?** | The test that decides where one ends and the next begins. Use the five-to-eight-competitors rule. |
| 5 | **What is the editorial policy on organisations?** | State it, hold to it evenly, and prove the evenness with a test — otherwise every per-layer count measures how you wrote rather than what is true. |
| 6 | **Where does the field's boundary sit, and which single station declares it?** | Every field leans on another field's stack. Name the one station where the dependency is declared and not modelled. |
| 7 | **What is the field's deepest moat, and which stratum is it?** | AI: Patterning. Robotics: Transmission. If you cannot name it, you do not understand the field well enough to map it yet. |
| 8 | **Which of the nine lenses does the field earn, and which does it not?** | See 16.3. Do not build a lens the field does not earn. |
| 9 | **What lens does this field earn that no other does?** | Robotics earns Nines. Every field should earn at least one, and it is the reason to build the site. |
| 10 | **What is the field's counterintuitive headline?** | The one sentence a reader repeats. It should be computable, and if it is not, it is not ready. |
| 11 | **What is the field's largest single uncertainty?** | Goes on Method, prominently, and usually becomes an assumption toggle on the Cascade. |
| 12 | **What is the vintage, and how fast does it rot?** | Decides how loud the vintage line is and whether anything is worth automating. |
| 13 | **Does any page hold a price? (No.)** | The answer is always no. The question is here so the reasoning gets rewritten each time rather than inherited unexamined. |
| 14 | **What would make this site wrong?** | If nothing would, it is not making a claim. |

### 16.3 The lens catalogue

| Lens | The question | Universal? |
|---|---|---|
| **Descent** — depth | What sits on top of what? | **Always.** The spine and the front door. |
| **Web** — causality | What depends on what? | **Always.** Needs an edge set, which every production chain has. |
| **Method** — provenance | How do we know? | **Always.** Generated from the corpus, so it cannot drift. |
| **Index** | Who is in this, and where do I look them up? | **Always.** |
| **Moat** — barrier | Who is allowed to do this, and from where? | Whenever jurisdiction is stated per organisation. Nearly always. |
| **Cascade** — matter & energy | What does one unit consume, all the way back? | Whenever a terminal unit exists and the conversions are sourceable. |
| **Faults** — counterfactual | What breaks if this breaks? | Whenever the edge set is dense enough for reach to be interesting. |
| **Atlas** — space | Where on Earth does it happen? | Only where geography is genuinely concentrated. A field with diffuse geography gets a boring map, and a boring map is worse than no map. |
| **Ruler** — scale | How big is it, physically? | Only where the field spans many decades of size. Skip it in a field that lives inside two. |
| **Lag** — time | When did this become possible? | Whenever capabilities have a defensible invented-year and shipped-year. |
| *Field-specific tenth* | — | **Design one. Ship it after the universal set.** |

**Rule:** ship the universal five first, then the field-appropriate ones, then the field-specific tenth. Parity before novelty — a tenth lens on a site whose first nine do not match its siblings reads as a different project.

### 16.4 Worked examples

Two sketches, to show the intake produces different answers rather than the same site repainted.

| | **Sun to Socket** (energy) | **Molecule to Medicine** (therapeutics) |
|---|---|---|
| Terminal unit | one delivered kWh | one patient-year of treatment |
| Raw origin | irradiance, or a gas reservoir | a target and a molecule |
| Deepest moat | grid interconnection and transformers | regulatory data exclusivity, and sterile fill–finish |
| Boundary station | semiconductor supply for inverters and cells | instrumentation and reagents |
| Earns Atlas? | **Strongly** — everything is sited | Weakly — a few manufacturing clusters |
| Earns Ruler? | Weakly | **Strongly** — angstroms to epidemiology |
| Earns Lag? | **Strongly** — long deployment lags | **Strongly** — the development timeline *is* the field |
| Its own tenth lens | **Queue** — what is waiting for permission to connect, and for how long | **Attrition** — survival by phase, and what each failure cost |
| Counterintuitive headline candidate | the constraint is not generation | most of the cost is in the failures, not the winner |

### 16.5 The rules that transfer unchanged

Copy these into every field's `CLAUDE.md`:

1. Never rewrite the homepage once it ships. New work is additive.
2. Views never import each other. Shared logic goes in `lib/`. The module graph stays acyclic.
3. Never read the station corpus whole. Use `peek`.
4. Guarantees go in tests, not in care.
5. Every claim carries a source and a vintage. Judgement is labelled judgement. Never invent a figure — if it is not derivable from something committed, it renders as a dash.
6. No page holds a price.
7. Run the test suite before committing.
8. A headline claim is arithmetic, never a typed sentence.
9. Prose in JSON is held to the corpus too — recompute the numbers stated in prose and fail if the sentence has drifted.
10. Derived and declared are never blended. Count the unclassified remainder out loud.
11. Absent data renders as a dash. Return null, never 0.

### 16.6 When to extract a shared engine

**Not at two sites.** At two, fork and hold the engine with a hash-parity test (D6): the drift is visible, nothing is coupled, and neither site can break the other.

**At three, extract.** By then you have real evidence about what is genuinely shared — and the evidence is exactly the parity set, because it is the list of files that did not need to change across three fields. Everything that fell out of the parity set is field-specific by demonstration rather than by guess.

The extraction, when it comes: `@stack/engine` holding `core/`, `lib/graph.js`, `lib/projection.js`, `lib/tickers.js`, `app.css` and the tooling; each field keeps its own `data/`, `views/`, `cascade.js`, `glyphs.js` and copy. Keep zero runtime dependencies — the engine ships as source, not as a build step.

### 16.7 The single-paragraph brief for a new field

Paste this at the top of the next field's handover:

> Build a static, dependency-free site mapping the **<field>** economy as N strata → M stations → K organisations, seen through the lenses **<list>**, with **Method** and **Index** outside the tab group. The corpus is hand-curated and is the asset; the code is thin. Every headline is arithmetic over the corpus, computed at render and reconciled by a test, so a stale sentence breaks the build. Judgement is labelled judgement, derived and declared are never blended, absent data renders as a dash, and no page holds a price. The terminal unit is **<unit>**; everything on the site is denominated in it. Match the file layout, conventions and layout contract of `kaankoo/semicon` exactly, and hold the shared engine files to it with a hash-parity test.

---

## Appendix — what this document is not

It is not a corpus, and it is not a source. Every figure here is either explicitly hypothetical or drawn from a search on 18 Aug 2026 and marked for verification. The numbers exist so the curation session can recognise a wrong answer, not so it can skip finding a right one.

It is also not exhaustive on content. The taxonomy in Parts 4 and 5 is a scaffold that should visibly change during curation — stations will merge, one stratum will probably disappear, and the org list will be a fifth wrong. **What must not change without a written reason is Part 1.**

**Sources consulted for the landscape sketch (all `[cited — verify]`, none corpus-ready):**

- KraneShares, *Humanoid Robotics in 2026: The Race From Pilot To Platform* — deployment counts, BOM ranges, supply-chain concentration figures, index constituents
- Next Financial, *The Joint Problem* — precision-reducer market shares and BOM share, with the author's own caveats about the circulating figures
- S&P Global and IEA commentary on 2026 rare-earth export controls and critical-mineral supply concentration
- ANSI and A3 on the ISO 10218-1/-2:2025 revisions; ISO/TS 15066 and ISO 13482 for the collaborative and personal-care cases
- KraneShares and market coverage of the Unitree STAR Market listing, August 2026
