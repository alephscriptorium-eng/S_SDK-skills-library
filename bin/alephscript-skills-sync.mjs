#!/usr/bin/env node
/**
 * bin · alephscript-skills-sync — LIB-070 / issue #16
 *
 * Espejo auditable de skills del paquete instalado hacia el directorio
 * del runtime. Idempotente: borra-y-recrea por-skill (no arrasa).
 * Procedencia: nombre+versión LEÍDOS del package.json instalado.
 *
 * Uso:
 *   alephscript-skills-sync --runtime claude [--root <dir>]
 *   alephscript-skills-sync --runtime cursor
 *   alephscript-skills-sync --runtime openai
 */
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { createRequire } from 'node:module';

const HERE = dirname(fileURLToPath(import.meta.url));
const PKG_NAME = '@alephscript/skills-scriptorium';
const EXCLUDE = new Set(['_plantilla']);

/** Destinos por runtime (adapters). Añadir runtime = módulo aquí. */
const ADAPTERS = {
  claude: { destRel: join('.claude', 'skills'), label: 'claude' },
  cursor: { destRel: join('.cursor', 'skills'), label: 'cursor' },
  openai: { destRel: join('.openai', 'skills'), label: 'openai' },
};

function usage(code = 1) {
  console.error(`uso: alephscript-skills-sync --runtime <${Object.keys(ADAPTERS).join('|')}> [--root <dir>]`);
  process.exit(code);
}

function parseArgs(argv) {
  let runtime = null;
  let root = process.cwd();
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--runtime' || a === '-r') {
      runtime = argv[++i];
    } else if (a === '--root') {
      root = resolve(argv[++i] || '');
    } else if (a === '--help' || a === '-h') {
      usage(0);
    } else {
      console.error(`arg desconocido: ${a}`);
      usage(1);
    }
  }
  if (!runtime || !ADAPTERS[runtime]) {
    console.error(`runtime inválido o ausente: ${runtime ?? '(ninguno)'}`);
    usage(1);
  }
  return { runtime, root };
}

function resolvePkgDir(root) {
  // 1) node_modules del consumidor
  const local = join(root, 'node_modules', PKG_NAME);
  if (existsSync(join(local, 'package.json'))) return local;
  // 2) resolución desde este bin (cuando se invoca vía npx/path del paquete)
  try {
    const require = createRequire(join(HERE, '..', 'package.json'));
    const pkgJson = require.resolve(`${PKG_NAME}/package.json`);
    return dirname(pkgJson);
  } catch {
    /* fallthrough */
  }
  // 3) desarrollo: raíz del propio repo (bin/../)
  const self = resolve(HERE, '..');
  if (existsSync(join(self, 'package.json')) && existsSync(join(self, 'skills'))) {
    return self;
  }
  return null;
}

const { runtime, root } = parseArgs(process.argv.slice(2));
const adapter = ADAPTERS[runtime];
const pkgDir = resolvePkgDir(root);

if (!pkgDir) {
  console.error(
    `[skills-sync] paquete no encontrado: ${PKG_NAME}\n` +
      `  ejecuta 'npm install' en --root (${root}) antes de sincronizar.`,
  );
  process.exit(1);
}

const { name, version } = JSON.parse(
  readFileSync(join(pkgDir, 'package.json'), 'utf8'),
);
const srcRoot = join(pkgDir, 'skills');
if (!existsSync(srcRoot)) {
  console.error(`[skills-sync] fuente no encontrada: ${srcRoot}`);
  process.exit(1);
}

const destRoot = join(root, adapter.destRel);
const skills = readdirSync(srcRoot, { withFileTypes: true })
  .filter((d) => d.isDirectory() && !EXCLUDE.has(d.name))
  .map((d) => d.name)
  .sort();

mkdirSync(destRoot, { recursive: true });

for (const skill of skills) {
  const dest = join(destRoot, skill);
  rmSync(dest, { recursive: true, force: true });
  cpSync(join(srcRoot, skill), dest, { recursive: true });
  console.log(`[skills-sync] OK  ${skill}`);
}

const destLabel = adapter.destRel.split(/[\\/]/).join('/');
const readme = `<!-- GENERADO por alephscript-skills-sync — NO editar a mano -->
# ${destLabel} — espejo materializado

Estas skills son un **espejo** del paquete instalado. La **fuente de verdad**
es la dependencia versionada (fijada en \`package-lock.json\`), no este directorio.

| dato | valor |
| ---- | ----- |
| procedencia | \`${name}@${version}\` |
| origen | \`node_modules/${name}/skills/\` |
| generador | \`alephscript-skills-sync --runtime ${adapter.label}\` |
| skills | ${skills.map((s) => `\`${s}\``).join(', ')} |

Actualizar: \`npm install\` y luego \`npm run skills:sync\`. No edites
estos ficheros a mano — cada dir se borra-y-recrea en la siguiente sync.
`;
writeFileSync(join(destRoot, 'README.md'), readme);
console.log(`[skills-sync] OK  README.md (${name}@${version})`);
console.log(
  `[skills-sync] listo: ${skills.length} skills -> ${destRoot} (runtime=${adapter.label})`,
);
