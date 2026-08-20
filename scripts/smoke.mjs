/* Headless smoke test — boots the real Ore to Action app in jsdom
   against the static corpus and asserts the rendered DOM and inter-view links. */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { JSDOM } from "jsdom";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const dom = new JSDOM(fs.readFileSync(path.join(ROOT, "index.html"), "utf8"), {
  url: "http://localhost/",
  pretendToBeVisual: true,
  runScripts: "outside-only"
});
const { window } = dom;

/* ---- shims jsdom lacks ---- */
window.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {} });
window.IntersectionObserver = class { observe() {} unobserve() {} disconnect() {} };
window.requestAnimationFrame = cb => setTimeout(cb, 0);
window.cancelAnimationFrame = id => clearTimeout(id);
window.scrollTo = () => {};
window.Element.prototype.scrollIntoView = () => {};
window.Element.prototype.setPointerCapture = () => {};
window.Element.prototype.releasePointerCapture = () => {};
window.document.elementFromPoint = () => window.__under || null;
window.Element.prototype.getBoundingClientRect = () => ({ width: 1200, height: 800, top: 0, left: 0, right: 1200, bottom: 800 });
window.fetch = async url => {
  const u = String(url);
  const file = u.startsWith("file:")
    ? fileURLToPath(u)
    : path.join(ROOT, new URL(u, "http://localhost/").pathname);
  if (!fs.existsSync(file)) return { ok: false, status: 404 };
  return { ok: true, status: 200, json: async () => JSON.parse(fs.readFileSync(file, "utf8")) };
};

for (const k of ["document", "matchMedia", "IntersectionObserver",
                 "requestAnimationFrame", "cancelAnimationFrame",
                 "fetch", "addEventListener", "scrollTo", "Element", "Node", "SVGElement",
                 "MouseEvent", "KeyboardEvent", "getComputedStyle", "location", "history"]) {
  globalThis[k] = typeof window[k] === "function" && !/^[A-Z]/.test(k) ? window[k].bind(window) : window[k];
}
globalThis.window = window;

const errors = [];
const origError = console.error;
console.error = (...a) => { errors.push(a.join(" ")); origError(...a); };

/* ---- boot ---- */
await import(pathToFileURL(path.join(ROOT, "src/main.js")).href);
await new Promise(r => setTimeout(r, 250));

/* ---- assertions ---- */
const D = window.document;
const app = window.app;
const checks = [];
const is = (label, actual, expected) =>
  checks.push({ label, ok: actual === expected, actual, expected });
const atLeast = (label, actual, min) =>
  checks.push({ label, ok: actual >= min, actual, expected: "≥ " + min });

is("boot completed (no fatal)", errors.length, 0);
is("strata loaded", app.L.length, 27);
is("stations loaded", app.S.length, 150);

/* descent */
is("hero stat blocks", D.querySelectorAll(".hstat").length, 4);
is("core sample bars", D.querySelectorAll(".core__b").length, 27);
is("rail segments", D.querySelectorAll(".stratum").length, 27);
is("stratum sections", D.querySelectorAll(".sec").length, 27);
is("station cards", D.querySelectorAll(".card").length, 150);
is("first section is stratum 1", D.querySelector(".sec")?.id, "s1");
is("rail is top-down (27 first)", D.querySelector(".stratum")?.dataset.s, "27");
atLeast("criticality pips rendered", D.querySelectorAll(".pip.on").length, 100);

/* web */
atLeast("graph nodes rendered", D.querySelectorAll(".nodeg").length, 150);
atLeast("graph edges rendered", D.querySelectorAll(".edge").length, 300);

/* table */
atLeast("table rows rendered", D.querySelectorAll("#tb tr").length, 100);

/* ruler */
atLeast("ruler objects rendered", D.querySelectorAll(".rul__o").length, 3);
is("ruler fit handler registered", typeof app.rulerFit, "function");
is("ruler goTo handler registered", typeof app.rulerGoTo, "function");

/* atlas */
atLeast("atlas site markers rendered", D.querySelectorAll(".atl__m").length, 20);
atLeast("atlas layer chips rendered", D.querySelectorAll("#atlLayers button").length, 3);
is("atlas fit handler registered", typeof app.atlasFit, "function");
is("atlas goTo handler registered", typeof app.atlasGoTo, "function");

/* timeline */
atLeast("timeline capability rows rendered", D.querySelectorAll(".tml__r").length, 15);
atLeast("timeline layer chips rendered", D.querySelectorAll("#tmlLayers button").length, 3);
is("timeline fit handler registered", typeof app.lagFit, "function");
is("timeline goTo handler registered", typeof app.lagGoTo, "function");

/* faults */
atLeast("fault scenario buttons rendered", D.querySelectorAll("#fltPicks button").length, 5);
is("faults fit handler registered", typeof app.faultsFit, "function");
is("faults goTo handler registered", typeof app.faultsGoTo, "function");

/* cascade */
atLeast("cascade chain rows rendered", D.querySelectorAll(".cas__row").length, 8);
atLeast("cascade branches rendered", D.querySelectorAll(".cas__br").length, 3);
atLeast("cascade key findings rendered", D.querySelectorAll(".cas__fi").length, 3);
atLeast("cascade source buttons rendered", D.querySelectorAll("#v-cas .cas__how").length, 5);

/* method */
is("method notes rendered", D.querySelectorAll("#mthGrain .grain").length, 9);
is("method showNote handler registered", typeof app.showNote, "function");

/* sheet flyout test */
app.openStation("strainwave");
is("sheet opens on station selection", D.getElementById("sheet")?.classList.contains("on"), true);
is("sheet title matches station", D.getElementById("shN")?.textContent, "Strain-wave (harmonic) gearing");
app.closeSheet();
is("sheet closes cleanly", D.getElementById("sheet")?.classList.contains("on"), false);

/* summary */
console.log("\n--- ORE TO ACTION HEADLESS SMOKE TEST ---");
let failed = 0;
checks.forEach(c => {
  if (c.ok) {
    console.log("✓", c.label);
  } else {
    failed++;
    console.error(`❌ ${c.label}: expected ${c.expected}, got ${c.actual}`);
  }
});

if (failed > 0 || errors.length > 0) {
  console.error(`\n❌ Smoke test failed with ${failed} assertion errors and ${errors.length} runtime errors.`);
  process.exit(1);
} else {
  console.log(`\n🎉 All ${checks.length} assertions passed with 0 runtime errors!`);
}
