// Lector compartido de skills (build-time). Fuente de verdad: el
// frontmatter de cada skills/<dir>/SKILL.md. Lo usan tanto el catálogo
// (catalogo.data.js) como las páginas por skill (skills/[skill].paths.js);
// así la lógica de lectura vive en un solo sitio (dedup, eje III).
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join } from 'node:path';
import meta from './skills-meta.js';

const here = dirname(fileURLToPath(import.meta.url)); // docs/.vitepress
const ROOT = resolve(here, '../..'); // raíz del repo
const SKILLS_DIR = join(ROOT, 'skills');

// Parser acotado del frontmatter de nuestro estándar de skill: bloque
// entre `---`, `name:` (línea) y `description:` (escalar plegado `>-`).
// No es YAML general — basta para el formato que este repo controla.
function parseFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return {};
  const lines = m[1].split(/\r?\n/);
  const fm = {};
  for (let i = 0; i < lines.length; i++) {
    const kv = lines[i].match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!kv) continue;
    const key = kv[1];
    let val = kv[2];
    if (['>-', '>', '|', '|-'].includes(val.trim())) {
      const collected = [];
      let j = i + 1;
      while (j < lines.length && !/^[A-Za-z0-9_-]+:/.test(lines[j])) {
        if (lines[j].trim() !== '') collected.push(lines[j].trim());
        j++;
      }
      val = collected.join(' ').replace(/\s+/g, ' ').trim();
      i = j - 1;
    } else {
      val = val.replace(/^['"]|['"]$/g, '').trim();
    }
    fm[key] = val;
  }
  return fm;
}

export function pkgVersion() {
  try {
    return JSON.parse(fs.readFileSync(join(ROOT, 'package.json'), 'utf-8')).version;
  } catch {
    return null;
  }
}

export function readSkills() {
  const skills = [];
  for (const d of fs.readdirSync(SKILLS_DIR, { withFileTypes: true })) {
    if (!d.isDirectory()) continue;
    const file = join(SKILLS_DIR, d.name, 'SKILL.md');
    if (!fs.existsSync(file)) continue;
    const fm = parseFrontmatter(fs.readFileSync(file, 'utf-8'));
    // clave del sidecar = `name` canónico (el dir puede diferir, p. ej.
    // `_plantilla` → name `plantilla-skill`); fallback al dir.
    const extra = meta[fm.name] ?? meta[d.name] ?? {};
    skills.push({
      dir: d.name,
      name: fm.name ?? d.name,
      description: fm.description ?? '',
      categoria: extra.categoria ?? 'Sin clasificar',
      tags: extra.tags ?? [],
      estado: extra.estado ?? 'estable',
      version: extra.version ?? null,
    });
  }
  return skills.sort((a, b) => {
    const pa = a.estado === 'plantilla' ? 1 : 0;
    const pb = b.estado === 'plantilla' ? 1 : 0;
    return pa - pb || a.name.localeCompare(b.name);
  });
}
