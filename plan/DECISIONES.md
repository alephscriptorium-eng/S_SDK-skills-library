# DECISIONES

Estados: las **abiertas** las resuelve el custodio, no el orquestador.

## Cerradas

- **DC-1 · Roles por referencia (mundo-fuente).** `plan/roles/` referencia
  `skills/swarm-orquestacion/reference/roles/` intra-repo; no copia.
  Cerrada al montar el plan (dogfood de dedup, modelo WP-I60).
- **DC-2 · `plan/` fuera del tarball.** `package.json.files` no incluye
  `plan/`; viaja solo `skills/ README LICENSE CHANGELOG`. El gobierno del
  mundo no contamina el paquete publicado.
- **DC-3 · IA del portal: consumo único + páginas por skill (regla 11).**
  El procedimiento de consumo es **agnóstico de skill** → vive una sola
  vez (`docs/guide/consumo.md` en el portal, `README.md` para el canal
  tarball); **no** se inlínea por skill. La «dedicación a cada skill» se
  da con **páginas autogeneradas** `/skills/<dir>` (ruta dinámica desde el
  frontmatter) que enlazan al procedimiento único. Esto fusiona los
  antiguos WP-01 (docs-consumo) y WP-04 (catálogo) en un solo WP-01
  (Portal). Motivo: evitar repetir el procedimiento N veces (anti-dedup)
  manteniendo descubrimiento y contrato por skill.
- **DC-4 · Política de efimeralidad (cierra DA-3, para WP-05).** Se
  **permiten** los ficheros de **configuración funcional** del IDE
  (settings, tasks, servidores MCP, cualquier config). Lo que se prohíbe y
  se limpia es el **texto de información**: markdowns/notas con estado de
  sesión, identificadores (tipo «U148»), decisiones; y tomar las
  **memorias internas** del agente como fuente de verdad. Vigilancia eleva
  los markdowns de info como residuo; la config **no** es residuo.
- **DC-5 · Rigor del gate de enlaces (cierra DA-4, para WP-06).** El gate
  **falla** (exit ≠ 0) ante enlace **interno o ancla** roto; los
  **externos** son *warning* listado (un 404 externo transitorio no
  bloquea el deploy). Corre en CI (`docs.yml`) tras build **y** disponible
  en local pre-deploy.
- **DC-6 · CHANGELOG estándar vinculado al backlog (WP-07).** Formato FOSS
  estándar (Keep a Changelog: `## [x.y.z] — fecha` + Added/Changed/Fixed).
  Contenido **derivado del backlog cerrado**: el agente copia los WP ✅ del
  plan, **no inventa texto**. Verificación: gate `verificar-changelog.mjs`
  pre-publish (falla si falta la sección de la versión o si un WP ✅ no está
  en el CHANGELOG) **y** doctrina de vigía. Aplicación de C9 (no listas que
  se pudren; generar de fuente).
- **DC-7 · Versión del release actual = 0.3.1 (custodio).** Pese a que
  WP-05/06 amplían contrato (por política, minor → 0.4.0), el custodio
  decide consolidar olas 1–2 como **0.3.1** (patch). Se respeta la decisión
  del custodio sobre la política; queda registrada la excepción. El publish
  (bump efectivo + `npm publish` + C8 de 0.3.1) es ops/CI.
- **DC-8 · Enlaces al back en el portal (WP-08).** Cada página del portal
  ofrece enlace a su **parte tec** (repo github.com, registry propio, CI);
  una **página dedicada** («Proyecto/DevOps») agrega los enlaces de infra
  no repartidos (repo, registry, Actions, Pages, CHANGELOG, contribuir).
  Objetivo: el navegante FOSS llega al back rápido (flujo devops).
- **DC-9 · Vía de release canónica = tag `v*` → `publish.yml` (CI).**
  Verificado 2026-07-20 con 0.3.1: con los secrets `NPM_USERNAME` /
  `NPM_PASSWORD` puestos en el repo S_SDK, el push de un tag `v*` dispara
  `publish.yml` → `npm publish` al Verdaccio (`npm.scriptorium.escrivivir.co`);
  C8 `@0.3.1` resuelto ✅. Hasta 0.3.0 el publish fue **local** (DE-I12,
  `ScriptoriumVps/scripts/publish-package.sh`); esa vía queda como
  **respaldo**. Próximo release: `git tag vX.Y.Z && git push origin vX.Y.Z`.
  Cierra el hallazgo «`publish.yml` era infra no probada / secrets sin
  cablear».
- **DC-10 · Proyección, no sync bidireccional (WP-09; custodio).** El
  markdown local del plan es la **fuente de verdad única** (regla 15); los
  GitHub Issues son **proyección desechable** (build artifact) y **nunca**
  tienen autoridad. El import remoto no escribe el BACKLOG: entra por
  `plan/INBOX-GH.md` y lo reconcilia a mano el orquestador (solo él escribe
  BACKLOG). Evita el pantano de conflictos del two-way sync por diseño.
- **DC-11 · Exportador propio, no git-bug (WP-09; custodio).** git-bug
  perdería el backlog-como-texto-con-marcas (corazón del método). Se
  construye un exportador propio sobre `gh api`, **remote-agnóstico**
  (adaptador: GitHub hoy; GitLab/nada mañana = otro adaptador).
- **DC-12 · Ceguera obligatoria en el export (WP-09; orquestador, candado
  de ceguera).** Los issues son cara pública: el export corre la prueba de
  ceguera sobre el contenido a proyectar y **rechaza** (exit ≠ 0) si hay
  tokens de marco. `plan/.sync-map.json` e `plan/INBOX-GH.md` viven en git
  (estado trazado, **no** residuo de IDE; regla 15).
- **DC-13 · Home y alcance de WP-09 (orquestador; alcance a ratificar).**
  El skill anfitrión es `swarm-orquestacion` (la proyección es del backlog,
  dominio del swarm). Alcance propuesto para **0.3.2**: modos (a) solo-local
  y (b) sesión + inbox + gate de ceguera. Modo (c) hook post-commit y check
  de vigía (proyección no diverge) = follow-up. **Ratificado por el custodio
  (2026-07-20):** alcance 0.3.2 = export + import/inbox + gate de ceguera
  (modos a/b); modo c y check de vigía = follow-up.
- **DC-14 · Mapeo marcas↔issue = open/closed, sin labels (WP-09; custodio).**
  `⬜`/`🔶` → issue **open**; `✅` → **closed**. Sin labels de estado ni
  eje (menos superficie pública que blindar; añadir labels después es
  trivial y reversible). El detalle del WP vive en el body proyectado.

## Abiertas

- **DA-1 · ¿Versionar la copia sincronizada en consumidores?** El adaptador
  Claude Code (`docs/guide/consumo.md` §3) sincroniza `node_modules →
  .claude/skills/`. Queda a criterio de cada mundo consumidor versionar el
  artefacto derivado o ignorarlo en git. El mundo-fuente solo **documenta**
  el patrón; no impone. → custodio confirma si el doc debe recomendar una
  opción por defecto.
- **DA-2 · Puntero de consumo en cada `SKILL.md`.** Los `README.md` de
  skills ya apuntan a `/guide/consumo`. ¿Debe el propio `SKILL.md`
  (frontmatter + cuerpo) llevar también el puntero, o se mantiene el
  README como único punto de entrada por skill? → custodio decide.

_(DA-3 y DA-4 se cerraron como DC-4/DC-5; DA-1 y DA-2 siguen abiertas.)_
