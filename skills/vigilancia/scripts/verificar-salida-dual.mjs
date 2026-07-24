#!/usr/bin/env node
import fs from "node:fs";
import { pathToFileURL } from "node:url";

// CONTRATO_SALIDA_DUAL_V1: implementación canónica; no duplicar.
const PART1 = "## Parte 1 · Vista PO/SCRUM";
const PART2 = "## Parte 2 · Handoff operativo";
const REQUIRED_PO = [
  "### Qué cambió",
  "### Qué sigue",
  "### Decisión del custodio",
];
const REQUIRED_HANDOFF = ["BACKLOG", "GATES", "ALCANCES", "SECUENCIA"];
const FLUFF = /\b(excelente|maravilloso|celebramos|emocionante|gran trabajo|sinergia)\b/i;

export function validateDualOutput(source) {
  const errors = [];
  const first = source.indexOf(PART1);
  const second = source.indexOf(PART2);
  if (first < 0) errors.push("falta Parte 1");
  if (second < 0) errors.push("falta Parte 2");
  if (first >= 0 && second >= 0 && first >= second) {
    errors.push("orden inválido: debe ser Parte 1→Parte 2");
  }
  if (errors.length) return errors;

  const proof = source.indexOf("\n## Prueba de ceguera", second);
  const po = source.slice(first + PART1.length, second);
  const handoffEnvelope = source
    .slice(second + PART2.length, proof >= 0 ? proof : source.length)
    .trim();
  if (po.includes("```")) errors.push("Parte 1 no puede estar cercada");
  for (const heading of REQUIRED_PO) {
    if (!po.includes(heading)) errors.push(`Parte 1 omite ${heading}`);
  }

  const poWords = po.match(/\p{L}[\p{L}\p{N}_/-]*/gu) ?? [];
  if (poWords.length > 180) errors.push("Parte 1 excede 180 palabras");
  const wpReferences = po.match(/\bWP-\d+\b/gi) ?? [];
  if (wpReferences.length > 2) errors.push("Parte 1 contiene más de 2 referencias WP");
  const hasTable = po.split(/\r?\n/).filter((line) => /^\s*\|.*\|\s*$/.test(line)).length >= 2;
  if (hasTable && !/BIFURCACIÓN:\s*sí/i.test(po)) {
    errors.push("matriz sin bifurcación real declarada");
  }
  if (FLUFF.test(po)) errors.push("Parte 1 contiene fluff");

  const fenced = handoffEnvelope.match(/^```(?:markdown|text)?\r?\n([\s\S]*?)\r?\n```\s*$/);
  if (!fenced) {
    errors.push("Parte 2 debe ser un único bloque cercado completamente copiable");
    return errors;
  }
  const handoff = fenced[1];
  for (const heading of REQUIRED_HANDOFF) {
    if (!new RegExp(`^${heading}\\s*$`, "m").test(handoff)) {
      errors.push(`Parte 2 omite ${heading}`);
    }
  }
  const unexpectedHeading = handoff
    .split(/\r?\n/)
    .filter((line) => /^[A-ZÁÉÍÓÚÑ][A-ZÁÉÍÓÚÑ ]+$/.test(line.trim()))
    .filter((line) => !REQUIRED_HANDOFF.includes(line.trim()));
  if (unexpectedHeading.length) {
    errors.push(`Parte 2 sale del vocabulario operativo: ${unexpectedHeading.join(", ")}`);
  }
  if (FLUFF.test(handoff)) errors.push("Parte 2 contiene fluff");

  const poState = po.match(/^ESTADO:\s*(.+)$/mi)?.[1]?.trim();
  const handoffState = handoff.match(/^ESTADO:\s*(.+)$/mi)?.[1]?.trim();
  if (!poState || !handoffState) {
    errors.push("estado operativo no visible en ambas partes");
  } else if (poState !== handoffState) {
    errors.push("estado operativo distinto entre partes");
  }
  for (const token of ["GO", "CHECK", "PASS"]) {
    if (!poState?.includes(token) || !handoffState?.includes(token)) {
      errors.push(`${token} no es visible en ambas partes`);
    }
  }
  if (!/[✅⏳⛔]/u.test(poState ?? "") || !/[✅⏳⛔]/u.test(handoffState ?? "")) {
    errors.push("estado sin señal inequívoca");
  }
  return errors;
}

function main() {
  const file = process.argv[2];
  if (!file) {
    console.error(`uso: node ${process.argv[1]} <salida.md>`);
    process.exit(2);
  }
  const errors = validateDualOutput(fs.readFileSync(file, "utf8"));
  if (errors.length) {
    console.error("salida-dual: FAIL");
    for (const [index, error] of errors.entries()) {
      console.error(`${index + 1}. ${error}`);
    }
    process.exit(1);
  }
  console.log("salida-dual: PASS");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
