#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const skillRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const tokens = [
  ["CONTRATO", "IDENTIDAD", "RAIZ", "V1"].join("_"),
  ["CONTRATO", "SALIDA", "DUAL", "V1"].join("_"),
];
const files = [];

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(absolute);
    else files.push(absolute);
  }
}

walk(skillRoot);
let failed = false;
for (const token of tokens) {
  const definitions = files.filter((file) => fs.readFileSync(file, "utf8").includes(token));
  if (definitions.length !== 1) {
    failed = true;
    console.error(`dedup ${token}: FAIL definiciones=${definitions.length}`);
    for (const file of definitions) console.error(`- ${path.relative(skillRoot, file)}`);
  } else {
    console.log(`dedup ${token}: PASS definiciones=1`);
  }
}

if (failed) process.exit(1);
console.log("dedup-contratos: PASS");
