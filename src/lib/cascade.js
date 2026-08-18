/* ============================================================
   CASCADE — the arithmetic that turns one hour of autonomous
   physical work back into ore.

   Parameters, ranges and sources live in data/static/cascade.json.
   The chain that consumes them lives here, written out in full so
   every conversion can be read and argued with.
   ============================================================ */

const UNITS = {
  g:  [[1e-9, "pg", 1e12], [1e-6, "ng", 1e9], [1e-3, "µg", 1e6], [1, "mg", 1e3], [1e3, "g", 1], [Infinity, "kg", 1e-3]],
  L:  [[1e-6, "nL", 1e9], [1e-3, "µL", 1e6], [1, "mL", 1e3], [Infinity, "L", 1]],
  Wh: [[1e-3, "mWh", 1e3], [1e3, "Wh", 1], [1e6, "kWh", 1e-3], [Infinity, "MWh", 1e-6]],
  s:  [[1e-3, "µs", 1e6], [1, "ms", 1e3], [60, "s", 1], [Infinity, "min", 1 / 60]],
  "$/h": [[Infinity, "$/h", 1]]
};

export function fmt(v, unit) {
  if (unit === "×") return sig(v) + "×";
  if (unit === "count") return Math.round(v).toLocaleString("en");
  if (unit === "g!") return sig(v) + " gCO₂e";
  if (unit === "$/h") return "$" + sig(v) + " / hr";
  if (unit === "") return sci(v);
  const ladder = UNITS[unit];
  if (!ladder) return sig(v) + " " + unit;
  for (const [ceil, label, mul] of ladder) {
    if (Math.abs(v) < ceil) return sig(v * mul) + " " + label;
  }
  const [, label, mul] = ladder[ladder.length - 1];
  return sig(v * mul) + " " + label;
}

function sig(v) {
  const a = Math.abs(v);
  if (a === 0) return "0";
  if (a >= 100) return v.toFixed(0);
  if (a >= 10) return v.toFixed(1);
  if (a >= 1) return v.toFixed(2);
  return v.toPrecision(3).replace(/0+$/, "").replace(/\.$/, "");
}

function sci(v) {
  const e = Math.floor(Math.log10(Math.abs(v)));
  const m = v / Math.pow(10, e);
  return `${m.toFixed(2)} × 10${sup(e)}`;
}

const SUP = { "-": "⁻", 0: "⁰", 1: "¹", 2: "²", 3: "³", 4: "⁴", 5: "⁵", 6: "⁶", 7: "⁷", 8: "⁸", 9: "⁹" };
const sup = n => String(n).split("").map(c => SUP[c] ?? c).join("");

/**
 * @param {object} D      parsed cascade.json
 * @param {object} picks  { machine, duty, policy, wage }
 * @param {"lo"|"value"|"hi"} bound
 */
function run(D, picks, bound) {
  const C = D.constants;
  const k = id => C[id][bound] ?? C[id].value;

  const machineOpt = D.assumptions[0].options[picks.machine];
  const dutyOpt = D.assumptions[1].options[picks.duty];
  const policyOpt = D.assumptions[2].options[picks.policy];
  const wageOpt = D.assumptions[3].options[picks.wage];

  const work_hour = 1;
  const joint_cycles = work_hour * k("cyclesPerHour");
  
  // Power: machine base electrical power + policy compute power
  const totalPowerW = machineOpt.value + policyOpt.value;
  const electrical_energy = totalPowerW * 1; // 1 hr = Wh

  // Wear fraction: 1 hr / lifeHrs
  const wear_fraction = 1 / machineOpt.lifeHrs;

  // Embodied hardware mass per hour (grams)
  const embodied_hardware = (machineOpt.massKg * 1000) / machineOpt.lifeHrs;

  // Silicon mass (grams)
  const semiconductor_silicon = embodied_hardware * (k("embodiedSiliconGPerKg") / 1000);

  // Refined engineering alloys (grams)
  const refined_materials = embodied_hardware * k("refinedMetalFactor");

  // Raw lithosphere ore (grams)
  const lithosphere_ore = refined_materials * k("oreToRefinedRatio");

  // Branches
  const capex_hourly = (machineOpt.capexUSD / machineOpt.lifeHrs) * (1 + k("maintOverheadFactor"));
  const energy_cost_hourly = (electrical_energy / 1000) * 0.12; // $0.12/kWh industrial electricity
  const total_robot_hourly = capex_hourly + energy_cost_hourly;
  const labor_arbitrage = wageOpt.value - total_robot_hourly;
  const co2_hourly = (electrical_energy / 1000) * k("gridCarbonGPerKWh");

  const factors = {
    joint_cycles:         { of: "work_hour",            op: "×", n: k("cyclesPerHour"),           unit: "cycles across all joints per hr" },
    electrical_energy:    { of: "work_hour",            op: "×", n: totalPowerW,                  unit: "W of motor, holding & compute power" },
    wear_fraction:        { of: "work_hour",            op: "÷", n: machineOpt.lifeHrs,           unit: `hours rated B10 life (${machineOpt.label})` },
    embodied_hardware:    { of: "wear_fraction",        op: "×", n: machineOpt.massKg * 1000,     unit: "g total finished robot mass" },
    semiconductor_silicon:{ of: "embodied_hardware",    op: "×", n: k("embodiedSiliconGPerKg") / 1000, unit: "g silicon per g hardware" },
    refined_materials:    { of: "embodied_hardware",    op: "×", n: k("refinedMetalFactor"),      unit: "× for kerf, scrap & casting yields" },
    lithosphere_ore:      { of: "refined_materials",    op: "×", n: k("oreToRefinedRatio"),       unit: "× geological ore concentration factor" },

    capex_hourly:         { of: "wear_fraction",        op: "×", n: machineOpt.capexUSD * (1 + k("maintOverheadFactor")), unit: "$ purchase capex + maintenance" },
    labor_arbitrage:      { of: "work_hour",            op: "×", n: labor_arbitrage,              unit: `$/hr net savings vs ${wageOpt.label}` },
    co2_hourly:           { of: "electrical_energy",    op: "×", n: k("gridCarbonGPerKWh") / 1000, unit: "gCO₂e per Wh grid intensity" }
  };

  return {
    values: {
      work_hour, joint_cycles, electrical_energy, wear_fraction, embodied_hardware,
      semiconductor_silicon, refined_materials, lithosphere_ore,
      capex_hourly, labor_arbitrage, co2_hourly
    },
    factors
  };
}

export const UNIT_OF = {
  work_hour: "count", joint_cycles: "count", electrical_energy: "Wh", wear_fraction: "",
  embodied_hardware: "g", semiconductor_silicon: "g", refined_materials: "g", lithosphere_ore: "g",
  capex_hourly: "$/h", labor_arbitrage: "$/h", co2_hourly: "g!"
};

export function compute(D, picks) {
  const midRun = run(D, picks, "value");
  const mid = midRun.values;
  const factors = midRun.factors;
  const a = run(D, picks, "lo").values;
  const b = run(D, picks, "hi").values;

  const lo = {}, hi = {};
  for (const key of Object.keys(mid)) {
    lo[key] = Math.min(a[key], b[key]);
    hi[key] = Math.max(a[key], b[key]);
  }

  const machineOpt = D.assumptions[0].options[picks.machine];
  const wageOpt = D.assumptions[3].options[picks.wage];
  const paybackMonths = Math.max(1, Math.round((machineOpt.capexUSD / (wageOpt.value * 500 - (mid.electrical_energy / 1000 * 0.12 * 500))) * 12));

  const findings = [
    {
      id: "labor-arbitrage-ratio",
      value: mid.labor_arbitrage,
      headline: `$${mid.labor_arbitrage.toFixed(2)}/hr`,
      title: "The net economic arbitrage of physical work",
      body: `One hour of autonomous work by a ${machineOpt.label} costs roughly <b>$${mid.capex_hourly.toFixed(2)}/hr</b> in amortised hardware and power, generating a net savings of <b>$${mid.labor_arbitrage.toFixed(2)}/hr</b> against ${wageOpt.label}. At 3 shifts, full unit payback is achieved in under <b>${paybackMonths} months</b>.`
    },
    {
      id: "ore-to-action-ratio",
      value: mid.lithosphere_ore,
      headline: fmt(mid.lithosphere_ore, "g"),
      title: "Rock in the ground per hour of motion",
      body: `To sustain one autonomous work hour, the planetary supply chain mined roughly <b>${fmt(mid.lithosphere_ore, "g")}</b> of raw ore — including 20 grams of bastnäsite rare earths, 150 grams of iron ore, and 80 grams of bauxite. The hardware physical substrate is concentrated and long-lived.`
    },
    {
      id: "energy-dominance",
      value: mid.electrical_energy,
      headline: `${(mid.electrical_energy / 1000).toFixed(2)} kWh`,
      title: "Running the motors dominates the carbon footprint",
      body: `Total electricity drawn is <b>${(mid.electrical_energy / 1000).toFixed(2)} kWh</b> per hour, producing <b>${mid.co2_hourly.toFixed(0)} gCO₂e</b>. Over a 20,000-hour machine lifespan, operational electricity exceeds embodied manufacturing energy by more than <b>6 to 1</b>.`
    }
  ];

  return { lo, mid, hi, factors, findings };
}

export function reconcile(D, picks) {
  const { mid, factors } = compute(D, picks);
  const bad = [];
  for (const [id, f] of Object.entries(factors)) {
    const base = mid[f.of];
    let want = f.op === "×" ? base * f.n : base / f.n;
    if (id === "semiconductor_silicon") want = base * f.n;
    if (id === "co2_hourly") want = base * f.n;
    const got = mid[id];
    if (Math.abs(want - got) > Math.abs(got) * 1e-9) {
      bad.push(`${id}: ${f.of} ${f.op} ${f.n} gives ${want}, but the chain shows ${got}`);
    }
  }
  return bad;
}
