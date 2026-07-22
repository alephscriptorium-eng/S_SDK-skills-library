# Changelog

Formato [Keep a Changelog](https://keepachangelog.com/es/1.1.0/);
versionado [SemVer](https://semver.org/lang/es/). Las entradas se
**derivan del backlog cerrado** (`plan/BACKLOG.md`) — se copian los WP ✅,
no se inventa texto. Gate:
`skills/swarm-orquestacion/scripts/verificar-changelog.mjs`.

Doctrina semver del paquete (DC-22, estrenada en este corte): cambio de
**regla de método** → al menos **minor**; **patch** = sin cambio de
contrato. La «versión de método» (badge del catálogo) y el «semver del
paquete» son ejes distintos; la correspondencia se declara en el
`README.md` raíz.

## [Unreleased]

### Added

- **WP-S01 · Convivencia multi-orquestador (método v0.6)** —
  contrato de método: partición de obra/gobierno, V2 por carril, vigía
  único con rondas `Rn-<carril>`, higiene pre-despacho, e2e por vías
  permitidas y freeze mutuo ante locks. Fuente única:
  `skills/swarm-orquestacion/reference/convivencia-multi-orquestador.md`
  (+ enlaces en SKILL, ciclo, ORQUESTADOR, README del skill). Caso
  fundante 2026-07-22 como lección abstracta. Sin bump de
  `package.json` (corte publicable = otro WP).
- **WP-S02 · Vigilancia pulso multi-carril** —
  etiquetas `Rn-<carril>`, higiene §8, freeze por `index.lock`,
  `SIBLING_ROOT` opcional, supuestos blandos de shape S01 y
  `scripts/comprobar-ceguera.sh` del skill vigilancia.

### Changed

- **WP-S05 · Portal skills / docs consumo** — portal alineado al método
  `site-web`; consumo canónico `@0.4.0`; badge swarm v0.6; plantilla CI
  engancha `docs:verificar`.

### Notes

- **Lección 3ª (R14-bosque / caso fundante post-idle)** — checklist
  cierre de ola += (1) gobierno commiteado **ANTES** del aviso de gate;
  (2) barrido `reflog`/`fsck` tras worker separado o cierre post-idle
  (dangling ≠ obra perdida si delta trivial). S02 ya tipifica clase
  huérfano; este caso funda el ritual de higiene. Sin reopen S02.

## [0.4.0] — 2026-07-21

Minor: dos reglas de método nuevas (16–17). Badge de método
`swarm-orquestacion` → **v0.5.0**. Entradas copiadas de los WP ✅ del
backlog (Ola 7: WP-16/17).

### Added

- **WP-16 · Reglas 16–17 (run-id verde + sync-map post-apply)** —
  `swarm-orquestacion` contrato v0.5: regla 16 (cierre de ola cita run-id
  VERDE de CI/+Release por cada repo tocado) y regla 17 (sync-map
  post-apply; mapa especulativo = devolución).
  `reference/reglas-metodo-v05.md` + checklist/roles/proyección.
- **WP-17 · Release 0.4.0 + regenerar portal** — publish canal real;
  portal `skills.s-sdk.escrivivir.co` regenerado (badge v0.5.0).

## [0.3.4] — 2026-07-20

Reconciliación de la expansión de contrato acumulada (regla 15 + gates
0.3.x) y estreno de la doctrina semver (DC-22). Corte publicable
**0.3.4** por decisión del custodio (retarget del 0.4.0 previsto).
Entradas copiadas de los WP ✅ del backlog (Ola 6: WP-13/14/15).

### Changed

- **WP-13 · Doctrina semver + reconciliación 0.4.0** — README/CHANGELOG
  fijan la doctrina: cambio de **regla de método** = minor; patch = sin
  cambio de contrato; «versión de método» (badge) y «semver de paquete» =
  ejes distintos, con correspondencia declarada. Contenido de Ola 6
  publicado como **0.3.4** (override del custodio frente al corte minor
  0.4.0 previsto); el badge v0.4 queda con relación documentada al
  paquete.
- **WP-14 · verificar-changelog: gobierno vs paquete** — la práctica y el
  gate distinguen CHANGELOG de **gobierno** (uno/mundo, WP-id-keyed) de
  CHANGELOG de **paquete** (N, changesets/semver); el gate es
  opt-in/parametrizable (`--role gobierno`, rutas) y adoptable en
  monorepos.
- **WP-15 · Back-links a nivel de tema** — back-links = config de tema +
  placeholders únicos (footer/nav), no texto por página; generador =
  regenerar desde fuente única. Mundo-fuente: back-links en footer/nav
  del tema.

## [0.3.3] — 2026-07-20

Refinamientos de la proyección del backlog a issues. Entrada copiada del
WP ✅ del backlog.

### Added

- **WP-12 · Proyección: auto-cierre de huérfanos + alcance configurable** —
  el `export` de `proyectar-backlog.mjs` **auto-cierra** los issues del
  `sync-map` cuyo WP ya no está en el conjunto proyectado (DC-19) y acepta
  **`--alcance todos|abiertos`** (DC-20: `abiertos` proyecta solo `⬜`/`🔶`
  y cierra los `✅`). Lógica unificada: «proyectá el conjunto; cerrá lo que
  sobra».

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
- **WP-10 · Proyección local-only por defecto** — la proyección a GitHub
  es **opt-in** (DC-15): el `export` real rehúsa sin `--habilitar-github` /
  `PROYECCION_GITHUB=1` (dry-run permitido); el orquestador confirma el
  modo al inicio de sesión (default local-only); el vigía eleva proyección
  no declarada. Doble candado con el gate de ceguera.

### Changed

- **WP-11 · Portal/consumo: badge v0.4 + copia gitignorada** — el catálogo
  muestra la versión de método de `swarm-orquestacion` (v0.4.0, DC-18); el
  doc de consumo aclara que `.claude/skills/` es namespace de Claude Code
  y recomienda **gitignorar** la copia sincronizada (fuente =
  `node_modules/.../skills/`; DC-16). Puntero de consumo solo en README +
  portal (DC-17).

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
