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

- **DC-15 · Proyección: LOCAL-ONLY por defecto (WP-10; custodio, seguridad).**
  El modo de trabajo por defecto es **solo-local** (modo a): nadie proyecta
  a GitHub. La proyección (export a issues) se activa **solo si el usuario
  lo pide explícitamente**. Mecanismos: (1) el orquestador **confirma el
  modo al inicio de sesión** (ritual; default local-only); (2)
  `proyectar-backlog.mjs export` exige **opt-in explícito**
  (`--habilitar-github` / `PROYECCION_GITHUB=1`) y rehúsa si falta — doble
  candado con el gate de ceguera; (3) el worker **nunca** proyecta; el
  vigía eleva cualquier proyección no declarada. Motivo: evitar líos por
  proyección accidental a un tracker público. El dry-run (preview, sin
  API) se permite siempre.
- **DC-16 · Copia sincronizada = gitignorada, no versionada (cierra DA-1;
  custodio).** La fuente de verdad **runner-agnóstica** es
  `node_modules/@alephscript/skills-scriptorium/skills/`. El directorio del
  runner (`.claude/skills/` es el **namespace de Claude Code**, no nuestro;
  otro runner usa su propia ruta) es un adaptador **derivado**: se regenera
  en `postinstall` y se **ignora en git**. No se commitea la carpeta de un
  IDE (si abrís con otro runner no ves cruft ajeno) ni se duplica el método
  (dedup; encaja con la regla 15). El doc aclara que `.claude` es
  convención de Claude Code, no universal.
- **DC-17 · Puntero de consumo = README + portal, no en `SKILL.md` (cierra
  DA-2; custodio).** El puntero a Consumo vive en el `README.md` de cada
  skill y en el portal; el `SKILL.md` queda enfocado en el método (no se
  repite el puntero en dos ficheros por skill).
- **DC-18 · Badge de método de swarm = v0.4.0 (custodio).** El catálogo
  muestra la **versión de método** del skill (`swarm-orquestacion` va por
  v0.4 desde la regla 15), distinta de la versión del **paquete** (0.3.2).
  Arreglo de verdad de contenido.

- **DC-19 · El export auto-cierra lo que no está en el conjunto proyectado
  (WP-12; custodio).** Tras procesar el conjunto elegido, todo issue del
  `sync-map` cuyo WP **no** esté en ese conjunto se **cierra** (con
  comentario) y sale del map. Cubre huérfanos (WP retirado del backlog) sin
  intervención manual. Modelo unificado: «proyectá el conjunto; cerrá lo
  que sobra».
- **DC-20 · Alcance de proyección configurable al activar (WP-12;
  custodio).** `--alcance todos|abiertos` (default **todos** =
  retrocompatible). `abiertos` proyecta solo `⬜`/`🔶` (trabajo accionable);
  los `✅` **no** se proyectan y sus issues se cierran (vía DC-19). El
  alcance se elige **en el momento de activar** la proyección; el
  orquestador lo confirma junto al modo en el ritual de inicio.

- **DC-21 · Intake de feedback externo de consumidor (mediación, Eje V).**
  Un **mundo consumidor** (monorepo npm-workspaces con changesets + portal
  VitePress) elevó, tras adoptar 0.3.1–0.3.3, tres puntos: (1) el contrato
  de método (regla 15) se sirvió como **patch**; (2) el gate de CHANGELOG
  **asume un solo paquete**; (3) los back-links **por página** son
  duplicación. Nota externa recibida 2026-07-20; entra por **reconciliación
  del orquestador** (no auto-ejecuta). Se abren WP-13/14/15 para 0.4.0.
  Convergencia a favor: el consumidor gitignoró la copia sincronizada,
  igual que DC-16.
- **DC-22 · Semver: contrato de método = minor; badge = eje distinto
  (cierra Punto 1; WP-13).** **Ratificado por el custodio (GO 2026-07-20).**
  Política: añadir/modificar una **regla de método** amplía el contrato →
  al menos **minor** del paquete; patch = solo correcciones sin cambio de
  contrato. La «versión de método» por skill (badge del catálogo) y el
  «semver del paquete» son **ejes distintos**; el README fija la
  correspondencia. Reconciliación prevista: **0.4.0** absorbe la expansión
  de contrato acumulada (regla 15 + gates 0.3.x) y estrena la doctrina.
  **Override ops (custodio, 2026-07-20):** el corte publicable de Ola 6 se
  retargeta a **0.3.4** (no se publica 0.4.0). La política (método →
  minor) permanece; solo cambia el número de corte de este release.
- **DC-23 · verificar-changelog = gate de GOBIERNO, parametrizable (cierra
  Punto 2; WP-14).** **Ratificado por el custodio (GO 2026-07-20).** El
  gate aplica al **CHANGELOG de gobierno** (uno por mundo, derivado del
  BACKLOG, WP-id-keyed). **No** asume ser el único changelog: en monorepos
  con changesets, los **CHANGELOG de paquete** (N, por SHA/semver,
  máquina-generados) son otro eje y no pasan por este gate. El gate se
  declara opt-in/parametrizable (rutas + rol) para ser adoptable en
  monorepos.
- **DC-24 · Back-links a nivel de tema, no por página (cierra Punto 3;
  WP-15).** **Ratificado por el custodio (GO 2026-07-20).** Los enlaces al
  back (repo/registry/CI) se declaran **una vez** como config de tema +
  placeholders (variables del sitio) y se renderizan vía footer/nav; nunca
  un bloque repetido por página (drift). El método `site-web` entrega
  WP-08 como **config de tema + placeholders**, no texto por página.
  Corrección de generador defectuoso = regenerar la pipeline con fuente
  única, no parchear página a página.
- **DC-25 · Intake feedback consumidor — Punto 4 (parser de proyección
  demasiado estricto).** Tras cerrar Ola 6, el mismo mundo consumidor
  elevó un **4º punto** (nacido al cablear WP-09 sobre un backlog real,
  no visible en el intake original DC-21): el parser de
  `proyectar-backlog.mjs` solo reconoce `- <estado> **WP-XX · título**`
  (el `·` es obligatorio, ID+título dentro del mismo `**…**`). Un backlog
  vivo mezcla `- <estado> **WP-XX** (prosa)` / `**WP-XX** — prosa`, y esos
  WP **no se parsean** → la proyección los omite **en silencio** (0
  proyectados sin aviso). **Verificado NO resuelto en 0.3.4** (parser sin
  cambios; regex `:62` sigue exigiendo `·`). **Pendiente de triaje/GO**
  (ver §Abiertas): opciones = flexibilizar el parser (aceptar ID fuera del
  bold + título tras `·`/`—`/`(`), **o** documentar el contrato de formato
  como requisito duro y verificarlo (fallar ruidoso, no silencioso). No
  auto-ejecuta.

## Abiertas

- **Punto 4 (DC-25) · parser de proyección** — recibido del consumidor,
  **pendiente de triaje/GO del custodio**. No resuelto en 0.3.4. Candidato
  a WP en el próximo lote (o al re-planear el reset). No bloquea lo
  publicado (0.3.4 estable); solo limita la proyección en backlogs de
  formato mixto.
- **Reset anticipado por el custodio (0 uso)** — mencionado como intención;
  **alcance sin definir**. No es WP hasta que el custodio fije qué resetea
  (versionado, estructura, o solo el número). Registrar aquí para que no se
  pierda.

_(Resueltas: DA-1/DA-2 → DC-16/DC-17; DA-3/DA-4 → DC-4/DC-5;
DC-22..24 ratificadas por GO 2026-07-20.)_
