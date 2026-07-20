#!/usr/bin/env node
// verificar-changelog.mjs — gate pre-publish: el CHANGELOG estándar
// corresponde con el backlog cerrado. Marco-agnóstico; sin deps (Node ≥18).
//
// Disciplina (aplicación de C9): el CHANGELOG no se inventa — se **deriva**
// del backlog cerrado. Este gate lo verifica:
//   1) Existe la sección de la versión a publicar (`## [x.y.z]` o `## x.y.z`).
//   2) Todo WP marcado ✅ en el BACKLOG aparece referenciado en el CHANGELOG
//      (nada cerrado en el plan queda sin registrar en la versión).
// Exit ≠ 0 si falla cualquiera de las dos.
//
// Uso:
//   node verificar-changelog.mjs [--version x.y.z] [--changelog F] [--backlog F]
//   VERSION=... CHANGELOG=CHANGELOG.md BACKLOG=plan/BACKLOG.md node verificar-changelog.mjs

import { readFileSync, existsSync } from 'node:fs';

const argv = process.argv.slice(2);
const arg = (n, d) => {
  const i = argv.indexOf(n);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : d;
};

const CHANGELOG = arg('--changelog', process.env.CHANGELOG || 'CHANGELOG.md');
const BACKLOG = arg('--backlog', process.env.BACKLOG || 'plan/BACKLOG.md');
let VERSION = arg('--version', process.env.VERSION || '');
if (!VERSION) {
  try {
    VERSION = JSON.parse(readFileSync('package.json', 'utf-8')).version;
  } catch {}
}

for (const [label, f] of [['CHANGELOG', CHANGELOG], ['BACKLOG', BACKLOG]]) {
  if (!existsSync(f)) {
    console.error(`[verificar-changelog] ${label} inexistente: ${f}`);
    process.exit(2);
  }
}

const changelog = readFileSync(CHANGELOG, 'utf-8');
const backlog = readFileSync(BACKLOG, 'utf-8');

const problemas = [];

// 1) sección de la versión
if (VERSION) {
  const escaped = VERSION.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`^##\\s*\\[?${escaped}\\]?\\b`, 'm');
  if (!re.test(changelog)) {
    problemas.push(`falta la sección del CHANGELOG para la versión ${VERSION} (## [${VERSION}] o ## ${VERSION})`);
  }
} else {
  console.error('[verificar-changelog] sin versión (ni --version ni package.json); no se puede verificar la sección');
  process.exit(2);
}

// 2) todo WP ✅ del backlog está en el CHANGELOG
const cerrados = new Set();
for (const line of backlog.split(/\r?\n/)) {
  if (!line.includes('✅')) continue;
  const m = line.match(/\bWP-[A-Za-z0-9]+/);
  if (m) cerrados.add(m[0]);
}
const faltan = [...cerrados].filter((wp) => !new RegExp(`\\b${wp}\\b`).test(changelog));

console.log(`[verificar-changelog] version=${VERSION} · WP ✅ en backlog: ${cerrados.size}`);
if (faltan.length) problemas.push(`WP cerrados ausentes del CHANGELOG: ${faltan.join(', ')}`);

if (problemas.length) {
  for (const p of problemas) console.error(`  ✗ ${p}`);
  console.error(`\n[verificar-changelog] FALLO: ${problemas.length} problema(s). El CHANGELOG debe reflejar el backlog cerrado (copiar, no inventar).`);
  process.exit(1);
}
console.log(`[verificar-changelog] OK: sección ${VERSION} presente y todos los WP ✅ referenciados.`);
