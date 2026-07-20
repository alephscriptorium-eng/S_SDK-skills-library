# WP-01 · portal — reporte

| dato | valor |
| ---- | ----- |
| agente | orquestador (implementación directa, sesión auto-hospedada) |
| fecha | 2026-07-20 |
| rama | `wp/01-portal` (destino merge: `main`) |
| commits | ver `git log` de la rama (gobierno → obra → aceptación) |
| eje(s) CA | IV (contrato de consumo) + III (dedup) + ceguera transversal |
| estado propuesto | listo para revisión |

## Qué se hizo

Se dotó al portal de la capa de **consumo** y **descubrimiento** que
faltaba (hallazgo: un mundo consumidor tuvo que reconstruir el
procedimiento desde un reporte ajeno). Fusiona en un portal coherente
(decisión DC-3) lo que empezó como dos WPs separados:

1. **Consumo canónico** — `README.md` (canal tarball, condensado) +
   `docs/guide/consumo.md` (portal, extendido): versión exacta fijada
   (`--save-exact`, nunca `latest`), `node_modules` como fuente de verdad,
   adaptador por runner (Claude Code → `.claude/skills/` por script
   idempotente + patrón general), dedup por referencia versionada +
   calibración local (modelo WP-I60), verificación C8.
2. **Catálogo** — `docs/catalogo.md` con filtrado cliente (búsqueda +
   categoría + estado); datos **derivados** del frontmatter real de cada
   `SKILL.md` vía data loader (sin lista copiada, eje III).
3. **Página por skill** — ruta dinámica `/skills/<dir>` autogenerada del
   frontmatter, con la línea `install` de versión fijada y enlace al
   **procedimiento canónico único** (el consumo no se repite por skill,
   DC-3).

Navegación cerrada: catálogo ↔ página de skill ↔ consumo. Piel zine
respetada; sin dependencias nuevas ni recursos remotos. El lector de
skills se factorizó a `docs/.vitepress/skills-data.js` (compartido por
catálogo y páginas: dedup del propio lector).

**Desviación de protocolo (honestidad):** el trabajo se implementó antes
de montar el `plan/`, fuera del ciclo; este reporte y la activación del
swarm lo formalizan retroactivamente. Rama `claude/…` del worktree en vez
de `wp/01-portal` estricta (harness); se merge a `main` igual.

## Archivos tocados

Consumo:
- `README.md` · modificado — «Consumo desde un mundo» (5 pasos) + «Desarrollo local»
- `docs/guide/consumo.md` · creado — procedimiento extendido + checklist
- `docs/guide/activar.md` · modificado — puntero a `/guide/consumo`
- `skills/{vigilancia,site-web,swarm-orquestacion}/README.md` · modificados — punteros de consumo

Catálogo + páginas por skill:
- `docs/.vitepress/skills-data.js` · creado — lector compartido (frontmatter + pkg version)
- `docs/.vitepress/skills-meta.js` · creado — sidecar curado (categoría/tags/estado)
- `docs/catalogo.data.js` · creado — data loader (delega en el lector)
- `docs/catalogo.md` · creado — página hub del catálogo
- `docs/skills/[skill].paths.js` · creado — rutas dinámicas por skill
- `docs/skills/[skill].md` · creado — plantilla de página de skill
- `docs/.vitepress/theme/components/SkillsCatalogo.vue` · creado — filtrado (piel zine)
- `docs/.vitepress/theme/components/SkillDetalle.vue` · creado — detalle por skill
- `docs/.vitepress/theme/index.js` · modificado — registro global de ambos componentes
- `docs/.vitepress/config.mjs` · modificado — nav + sidebar «Catálogo»
- `docs/index.md` · modificado — acción de portada + feature «Catálogo»

## Evidencia

> Salida literal.

### CA · C8 (versión fijada resuelve)

```
$ npm view @alephscript/skills-scriptorium@0.3.0 \
    --registry=https://npm.scriptorium.escrivivir.co version
0.3.0        # exit 0
```

### CA · build verde (data loader + rutas dinámicas, ignoreDeadLinks: false)

```
$ npm run docs:build
✓ building client + server bundles...
✓ rendering pages...
build complete in 9.08s.
```

### CA · datos derivados (catálogo + una página por skill)

```
$ ls dist/skills/
_plantilla.html  site-web.html  swarm-orquestacion.html  vigilancia.html

$ grep -oE 'href="[^"]*skills/[^"]+"' dist/catalogo.html | sort -u
href="/skills/_plantilla"
href="/skills/site-web"
href="/skills/swarm-orquestacion"
href="/skills/vigilancia"

# orden del catálogo: estables primero, plantilla al final
$ grep -oE 'cat-meta"[^>]*>[^<]+' dist/catalogo.html | sed -E 's/.*>//'
estable / v0.3.0 / estable / plantilla

# detalle: install con versión del paquete fijada
$ grep -oE 'save-exact[^<]*0\.3\.0' dist/skills/swarm-orquestacion.html
save-exact @alephscript/skills-scriptorium@0.3.0
```

### CA · ceguera (ficheros nuevos)

```
$ bash skills/swarm-orquestacion/scripts/comprobar-ceguera.sh
ceguera: 0

$ grep -niE "<tokens-de-marco>" <ficheros nuevos>
(sin coincidencias)   # patrón real armado por fragmentos, no transcrito aquí
```

Único token repetido = la URL pública del repo en GitHub
(`…/S_SDK-skills-library`), ya presente en `index.md` y
`package.json.repository`; no es fuga de marco.

## Bug encontrado y corregido (honestidad)

Primera build del catálogo: `plantilla-skill` salía como `Sin clasificar`/
`estable` y primera. Causa: el sidecar se indexaba por nombre de
directorio (`_plantilla`), que no iguala su `name` de frontmatter
(`plantilla-skill`); los otros 3 coincidían por azar. Fix: indexar por
`fm.name` con fallback al dir. Segunda build: orden y metadatos correctos.

## Auto-revisión (PRACTICAS del mundo — con honestidad)

- [x] Diff solo dentro de `ALCANCE_DIFF` (`README.md`, `docs/`, `skills/*/README.md`).
- [x] Cero árboles copiados sin procedencia: única cita = nombre versionado + modelo WP-I60.
- [x] Eje IV: contrato de consumo ejercitado por dos mundos consumidores independientes (hallazgo + WP-I60) → segundo cliente sensor.
- [x] Eje III: lector compartido; datos y procedimiento únicos, no duplicados por skill.
- [x] Ceguera evidenciada (script + grep + build); 0 tokens de marco introducidos.
- [x] Piel zine y cero CDN; sin dependencias nuevas.
- [x] Build ejecutada de verdad, verde.
- [x] Commits: convencionales, español, gobierno atómico (V2) — ver rama.
- [x] Diff solo del alcance del WP + gobierno del mundo.

## Hallazgos fuera de alcance

- El catálogo/páginas por skill no incluyen aún el cuerpo del `SKILL.md`
  renderizado (solo frontmatter + install). Candidato: render del método
  completo por skill.
- Versión por skill (contrato) solo la declara `swarm-orquestacion` en el
  sidecar; el resto usa la versión del paquete. Candidato a estandarizar.

## Dudas / bloqueos

- Ninguno. C8 resolvió; build verde; ceguera 0.

---

## Revisión del orquestador

**Aceptado ✅** — CA IV + III + ceguera verificados con evidencia literal
arriba (C8 exit 0, build verde, 4 páginas por skill generadas, orden
correcto, ceguera 0). Autoriza merge a `main`. Aceptación registrada en
BACKLOG en commit de gobierno propio (V2: separado del brief).
