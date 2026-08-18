/* Engine parity assertion.  npm run parity
   Ensures the field-agnostic engine files stay in exact lockstep
   with the reference engine. */

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LOCK_FILE = path.join(ROOT, "engine.lock.json");

const PARITY_FILES = [
  "src/core/app.js",
  "src/core/data.js",
  "src/core/router.js",
  "src/core/notes.js",
  "src/lib/graph.js",
  "src/lib/projection.js",
  "src/lib/tickers.js",
  "scripts/world.mjs",
  "data/static/world.json"
];

function hashFile(relPath) {
  const full = path.join(ROOT, relPath);
  if (!fs.existsSync(full)) return null;
  const content = fs.readFileSync(full);
  return crypto.createHash("sha256").update(content).digest("hex");
}

const args = process.argv.slice(2);
const shouldLock = args.includes("--lock") || !fs.existsSync(LOCK_FILE);

if (shouldLock) {
  const lock = {
    updated: new Date().toISOString().split("T")[0],
    hashes: {}
  };
  PARITY_FILES.forEach(f => {
    const h = hashFile(f);
    if (!h) {
      console.error(`  [error] Missing parity file: ${f}`);
      process.exit(1);
    }
    lock.hashes[f] = h;
  });
  fs.writeFileSync(LOCK_FILE, JSON.stringify(lock, null, 2) + "\n");
  console.log(`\n  engine.lock.json generated (${PARITY_FILES.length} files locked)\n`);
  process.exit(0);
}

const lock = JSON.parse(fs.readFileSync(LOCK_FILE, "utf8"));
let drifted = 0;

PARITY_FILES.forEach(f => {
  const current = hashFile(f);
  const expected = lock.hashes[f];
  if (!current) {
    console.error(`  [drift] File missing: ${f}`);
    drifted++;
  } else if (current !== expected) {
    console.error(`  [drift] File modified: ${f}`);
    drifted++;
  }
});

if (drifted > 0) {
  console.error(`\n  Parity check failed: ${drifted} file(s) drifted from engine.lock.json.`);
  console.error(`  If intentional, re-lock with: node scripts/parity-engine.mjs --lock\n`);
  process.exit(1);
}

console.log(`  ok  engine parity (${PARITY_FILES.length} files matched)`);
