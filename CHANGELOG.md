# Changelog

## Unreleased — destinado a 0.4.0

Contrato ampliado (minor). **Publicación pendiente** (ops/CI): hasta
publicar, la versión fijada vigente para consumo sigue siendo `0.3.0`; por
eso `package.json` no se bumpea aún (evita anunciar una versión que el
registry no resuelve).

### `swarm-orquestacion` — regla 15 (WP-05)

- **Fuente de verdad única y efimeralidad**
  (`reference/reglas-metodo-v04.md`): el plan trazado en git es la única
  verdad; la memoria interna del agente y las carpetas de IDE
  (`.claude`/`.cursor`/…) son scratch efímero. Se conserva la config
  funcional (settings/tasks/MCP); se prohíbe el texto de info de sesión
  (markdowns, identificadores). Verificar contra el plan, no contra el
  recuerdo. Checklist de cierre de ola extendida.

### `vigilancia` — residuo de info (WP-05)

- El vigía **eleva** markdowns de info bajo carpetas de IDE como anomalía
  (`scripts/watcher.sh`, doctrina en `reference/ESTACION.md`). La config
  funcional no es residuo.

### `site-web` — gate de verificación de sitio (WP-06)

- `scripts/verificar-sitio.mjs`: sobre el `dist/` construido valida todos
  los `<a href>` (internos → fichero respetando `base`+`cleanUrls`, anclas
  `#id`, externos → warning) más verdad de contenido opcional por
  manifiesto. Cubre los hrefs de componentes `.vue` que el
  `ignoreDeadLinks` de VitePress no revisa — origen de los enlaces rotos
  en deploys previos. Falla ante roto interno/ancla (DC-5). Integrado en
  `reference/protocolo-ghpages.md`.

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
