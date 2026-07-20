# Changelog

Formato [Keep a Changelog](https://keepachangelog.com/es/1.1.0/);
versionado [SemVer](https://semver.org/lang/es/). Las entradas se
**derivan del backlog cerrado** (`plan/BACKLOG.md`) — se copian los WP ✅,
no se inventa texto. Gate:
`skills/swarm-orquestacion/scripts/verificar-changelog.mjs`.

## [0.3.2] — 2026-07-20

Sistema de scrum: proyección del backlog a issues sin sync bidireccional.
Entrada copiada del WP ✅ del backlog.

### Added

- **WP-09 · Proyección del backlog a GitHub Issues** —
  `skills/swarm-orquestacion/scripts/proyectar-backlog.mjs` + método
  (`reference/proyeccion-issues.md`): export idempotente local→GH
  (`plan/.sync-map.json` + marcador oculto; `✅`→closed, `⬜🔶`→open),
  import → `plan/INBOX-GH.md` (no escribe el BACKLOG), adaptador `gh`
  remote-agnóstico y **gate de ceguera obligatorio** (`CEGUERA_PATTERN`
  por env). El markdown local sigue siendo la fuente de verdad única.

## [0.3.1] — 2026-07-20

Consolidación de las olas 1–2 del plan (portal + higiene de método +
verificación + enlaces al back). Entradas copiadas de los WP ✅ del
backlog. `package.json` en 0.3.1; **queda `npm publish` + verificación C8
de 0.3.1** = paso ops/CI final (fuera de esta sesión).

### Added

- **WP-01 · Portal de consumo + catálogo** — guía de consumo canónica
  (`docs/guide/consumo.md`), catálogo con filtrado y página autogenerada
  por skill (`/skills/<dir>`).
- **WP-06 · Gate de verificación de sitio** —
  `skills/site-web/scripts/verificar-sitio.mjs`: valida enlaces
  internos/anclas/externos + verdad de contenido sobre el `dist/`
  construido (cubre los hrefs de componentes `.vue`).
- **WP-07 · CHANGELOG estándar vinculado al backlog** —
  `skills/swarm-orquestacion/scripts/verificar-changelog.mjs` + práctica
  de método + doctrina de vigía.
- **WP-08 · Enlaces al back (DevOps)** — enlaces al repo/registry/CI por
  página y página «Proyecto» (`docs/proyecto.md`).

### Changed

- **WP-05 · Efimeralidad y fuente de verdad única** — `swarm-orquestacion`
  regla 15 (`reference/reglas-metodo-v04.md`): el plan trazado es la única
  verdad; carpetas de IDE y memoria interna son scratch efímero (se
  conserva la config funcional). Check de residuo en `vigilancia`.

## 0.3.0 — 2026-07-19

Bump menor del contrato de `swarm-orquestacion` (ceguera de activación).

### Contenido

- `swarm-orquestacion` v0.3: 14 reglas de método
  (`reference/reglas-metodo-v03.md`) — reglas 1–12 de v0.2 + **13**
  (activación = agente fresco solo-skill) + **14** (ceguera sobre
  historial reachable `git log -p`; squash ante fuga intermedia)
- Práctica de medida canónica: `grep -c` / `grep -q`, nunca
  `grep | head && echo OK`
- CA transversal de ceguera + filas de activación/publish en
  `reference/ejes-ca.md`; reglas 9–10 en `SKILL.md`; §§6–7 en
  `reference/ciclo.md`; anti-patrones en ORQUESTADOR

### Semver

`0.3.0` — minor: contrato del skill ampliado (reglas 13–14); sin
ruptura de layout ni frontmatter. v0.2 queda como histórico.

## 0.2.0 — 2026-07-19

Bump menor del contrato de `swarm-orquestacion` (costuras de método).

### Contenido

- `swarm-orquestacion` v0.2: 12 reglas de método
  (`reference/reglas-metodo-v02.md`)
- Práctica V2: commit de gobierno atómico (aceptación ≠ brief mezclados)
- Checklist de higiene al cierre de ola (regla 10), estrenado en este bump
- Scrub F7: comentarios de `publish.yml` → «Verdaccio canónico» (sin
  nombres de mundos en cara pública)

### Semver

`0.2.0` — minor: contrato del skill ampliado (reglas + checklist); sin
ruptura de layout ni frontmatter.

## 0.1.0 — 2026-07-19

Primera publicación al registry propio
(`https://npm.scriptorium.escrivivir.co`).

### Contenido

- Skills marco-agnósticos: `swarm-orquestacion`, `site-web`, `vigilancia`
- Plantilla vacía: `skills/_plantilla/`
- Fixture de-identificada de ejemplo (no va en el tarball npm; vive en
  `instancias/` del repo)
- Docs VitePress en `skills.s-sdk.escrivivir.co` (Pages; no van en el
  tarball)

### Semver

`0.1.0` — semver inicial del paquete público. Incrementos posteriores
siguen Conventional Commits / semver (patch = notas/skills menores;
minor = skill nuevo o contrato ampliado; major = ruptura de layout o
frontmatter).
