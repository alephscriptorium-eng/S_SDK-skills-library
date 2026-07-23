# BACKLOG

Estados: ⬜ pendiente · 🔶 en curso · ✅ aceptado.
Solo el orquestador edita este fichero, en `main`.

## Ola 1 — Portal de skills

- ✅ **WP-01 · Portal de consumo + catálogo** — dar al portal la capa que
  faltaba para un mundo consumidor y para el descubrimiento de skills.
  Fusiona el consumo canónico y el catálogo en un portal coherente:
  hub (catálogo con filtrado) → página por skill (autogenerada) →
  procedimiento canónico único. Método: skills `site-web` (piel zine,
  ceguera) y `swarm-orquestacion` (este plan).
  **Rama:** `wp/01-portal` · **Eje(s):** IV (contrato de consumo; segundo
  cliente sensor) + III (dedup: datos y procedimiento derivados/únicos, no
  copiados) + ceguera transversal (cara pública).
  **CA:**
  - **Consumo canónico** en `README.md` (canal tarball) + `docs/guide/consumo.md`
    (portal): versión **exacta** fijada (`--save-exact`, nunca `latest`),
    `node_modules` como fuente, adaptador por runner (Claude Code +
    patrón general), dedup (referencia versionada + calibración local,
    modelo WP-I60), C8.
  - **Catálogo** `docs/catalogo.md` con filtrado (búsqueda + categoría +
    estado); datos derivados del frontmatter real de `skills/*/SKILL.md`
    (data loader), no lista copiada.
  - **Página por skill** `/skills/<dir>` autogenerada (ruta dinámica) con
    `install` de versión fijada y enlace al procedimiento canónico único
    (el consumo no se repite por skill).
  - Enlazado en nav + sidebar + portada; navegación cerrada
    catálogo ↔ skill ↔ consumo.
  - Piel zine respetada (tokens `--vp-c-*`/`--zine-*`, radius 0, hover
    negativo, mono, claro/oscuro), **cero CDN / fuentes remotas**, sin
    dependencias nuevas.
  - `npm run docs:build` verde (`ignoreDeadLinks: false`).
  - Ceguera: 0 tokens de marco en ficheros nuevos (árbol + `git log -p`).
  **Reporte:** `plan/REPORTES/WP-01-portal.md`.
  **Historia:** fusiona los antiguos WP-01 (docs-consumo) y WP-04
  (catálogo) por decisión DC-3.

## Ola 2 — higiene de método y verificación (planificados)

- ✅ **WP-05 · Efimeralidad y fuente de verdad única** — cerrar el
  anti-patrón vivido: carpetas de IDE (`.claude`/`.cursor`/`.github`) y
  **memorias internas** de agentes acumulan info efímera que solo conoce
  ese agente, se pierde al cerrar sesión, y hace que los agentes tomen su
  memoria como fuente de verdad sin verificar contra el plan. Bloquea el
  trabajo multi-IDE/multi-equipo. Interpretar y trasladar profesionalmente
  (no copiar literal).
  **Skills:** `swarm-orquestacion` (+ regla) y `vigilancia` (+ check) ·
  **Rama:** `wp/05-efimeralidad` · **Eje(s):** ceguera + III (dedup de
  fuente de verdad: una sola, el plan).
  **CA:**
  - `swarm-orquestacion`: **regla 15 (Fuente de verdad única + efimeralidad)**
    en `reference/reglas-metodo-v04.md` y resumen en `SKILL.md`: el plan
    trazado (git) es la única fuente de verdad; memoria interna del agente
    y carpetas de IDE = scratch efímero, no compartible ni citable como
    verdad; verificar SIEMPRE contra el plan, no contra recuerdos.
  - Al **cierre de sesión/ola**: las carpetas de IDE no dejan markdowns de
    info (identificadores tipo «U148», estado, decisiones). Si el entorno
    necesita `config`/`tasks`/`mcp` funcional, se conserva ESO — sin texto
    de sesión. Añadir el ítem a la checklist de cierre de ola.
  - `vigilancia`: check que **eleva residuo de info** en carpetas de IDE
    ajenas (p. ej. `*.md` no-config bajo `.claude`/`.cursor`) y refuerza
    «persistir a disco trazado, no a memoria de chat» en `ESTACION.md`.
  - Semver: contrato de ambos skills ampliado → bump **minor** del paquete
    + entrada en `CHANGELOG.md`.
  - Ceguera 0 (árbol + `git log -p`) en la cara pública tocada.

- ✅ **WP-06 · Gate de verificación de sitio (enlaces + verdad)** — cada
  deploy tuvo enlaces rotos porque `ignoreDeadLinks:false` **no** cubre
  hrefs en componentes `.vue` (catálogo/páginas por skill), ni externos,
  ni anclas. Falta además verificar que la info del sitio es cierta.
  **Skill:** `site-web` · **Rama:** `wp/06-verificar-sitio` · **Eje(s):**
  III (gate de dedup/verdad) + ceguera + IV (segundo cliente: el gate lo
  ejercita el propio portal del mundo-fuente).
  **CA:**
  - `site-web`: script `scripts/verificar-sitio.sh` (o `.mjs`) que tras
    `docs:build` rastrea `dist/` y verifica **todos** los `<a href>`:
    internos resuelven a fichero en `dist` (respetando `base` + `cleanUrls`),
    anclas `#id` existen en la página destino, externos `http(s)` devuelven
    estado sano (online; offline → listados para revisión). Exit ≠ 0 si hay
    roto interno/ancla.
  - **Verdad de contenido** (C8 reforzado): paso explícito que verifica que
    afirmaciones/versión/comandos del sitio casan con su fuente (p. ej.
    versión mostrada == `package.json`; comandos ejecutados en su canal).
  - Gate añadido a `reference/protocolo-ghpages.md` (checklist de
    publicación) y como filtro del pipeline (p. ej. «C10 · enlaces»).
  - Se **estrena** sobre el portal de este mundo-fuente (segundo cliente):
    el propio catálogo/páginas por skill pasan el gate.
  - Semver: contrato de `site-web` ampliado → bump **minor** del paquete +
    `CHANGELOG.md`.

## Ola 3 — CHANGELOG disciplinado y enlaces al back

- ✅ **WP-07 · CHANGELOG estándar vinculado al backlog** — hoy cada agente
  apunta texto libre en el CHANGELOG. Restringirlo: formato FOSS estándar
  (Keep a Changelog), contenido **derivado del backlog cerrado** (el
  agente copia los WP ✅, no inventa texto), y un mecanismo que asegura que
  el swarm lo mantiene al día y **corresponde con lo cerrado del plan**.
  Extiende C9 (no listas que se pudren; generar de fuente).
  **Skills:** `swarm-orquestacion` (regla/práctica + gate) y `vigilancia`
  (check) · **Rama:** `main` (solo-secuencial) · **Eje(s):** III (una
  fuente: el backlog) + ceguera.
  **CA:**
  - `swarm-orquestacion`: práctica «CHANGELOG estándar vinculado al
    backlog» en el método + `scripts/verificar-changelog.mjs`: falla si
    (a) falta la sección de la versión a publicar, o (b) un WP ✅ del
    BACKLOG no aparece referenciado en el CHANGELOG.
  - `vigilancia`: el vigía incluye en su pulso que cada WP ✅ del plan está
    reflejado en el CHANGELOG; eleva el desfase como anomalía.
  - **Inicialización (dogfood):** reescribir el CHANGELOG actual en formato
    estándar como release **0.3.1** (DC-7), con los WP cerrados de las olas
    1–2 copiados del backlog.
  - Ceguera 0.

- ✅ **WP-08 · Enlaces al back (DevOps) en el portal** — aprovechar que el
  portal vive en GitHub Pages: cada página ofrece enlace a su **parte tec**
  (repo en github.com, registry propio, CI) y una **sección dedicada** que
  agrega los enlaces de infra no repartidos, para que el navegante FOSS
  llegue rápido al back. Cubre el flujo devops. Extiende B9/B10 (conector
  entre portales, vía de contribución) y C8 (canal real).
  **Skill:** `site-web` (método + protocolo) · **mundo-fuente** (portal) ·
  **Rama:** `main` · **Eje(s):** IV (2º cliente: el portal) + ceguera.
  **CA:**
  - `site-web`: patrón «enlaces al back» en `reference/metodo-mecanismo.md`
    + sección en `reference/protocolo-ghpages.md` (contexto GitHub/Pages);
    plantilla de página «Proyecto/DevOps».
  - **mundo-fuente:** página `docs/proyecto.md` que agrega repo + registry
    + CI/Actions + Pages + CHANGELOG + contribuir; enlazada en nav; enlaces
    al back presentes por página (fuente ya existe en skill; añadir donde
    falte).
  - `verificar-sitio.mjs` verde sobre el portal ampliado (enlaces nuevos).
  - Ceguera 0.

## Ola 4 — proyección del scrum a issues (release 0.3.2)

- ✅ **WP-09 · Proyección del backlog a GitHub Issues** — dar al scrum de
  markdown una proyección a un tracker externo **sin sync bidireccional**:
  el markdown local es la **fuente de verdad única** (regla 15); los issues
  son proyección desechable (build artifact); el remoto **nunca** tiene
  autoridad. Propuesta del custodio (2026-07-20), refinada por el
  orquestador (gate de ceguera).
  **Skill:** `swarm-orquestacion` (método + script) · **Rama:** `wp/09-proyeccion`
  · **Eje(s):** III (una fuente de verdad) + ceguera (issues = cara pública)
  + IV (2º cliente: el propio repo).
  **CA:**
  - **Export local→GH** determinista e idempotente: cada WP con su **ID
    estable** (parseado del BACKLOG, `WP-[A-Za-z0-9]+`) → issue;
    `plan/.sync-map.json` (WP-ID → issue #) git-tracked; crear/actualizar +
    cerrar (`✅`→closed, `🔶/⬜`→open) vía adaptador `gh api`. Re-correr no
    duplica; regenerable desde cero.
  - **Import GH→local** **jamás** escribe el BACKLOG: comentarios/cierres
    remotos → `plan/INBOX-GH.md` (git-tracked) que el orquestador reconcilia
    a mano (solo el orquestador escribe BACKLOG).
  - **Gate de ceguera en el export (DC-12):** antes de proyectar a issues
    **públicos**, correr la prueba de ceguera sobre el contenido a exportar;
    **rechazar** (exit ≠ 0) si hay tokens de marco. Nadie proyecta un
    backlog no-blindado a un tracker público.
  - Cuerpo del issue: nota «proyección generada — comentad, no editéis; los
    comentarios entran por inbox».
  - **Remote-agnóstico:** adaptador (GitHub hoy; GitLab/nada mañana = otro
    adaptador). Método documentado en `reference/`.
  - **Modos:** (a) solo-local (no correr), (b) sesión (import-inbox al abrir
    + export al cerrar). Modo (c) continuo (hook post-commit) = patrón
    documentado, no implementado en 0.3.2.
  - Semver: contrato de `swarm-orquestacion` ampliado → **0.3.2**
    (`CHANGELOG` + gate `verificar-changelog`). Ceguera 0.
  **Decisiones:** DC-10..DC-13. **Pendiente:** GO del custodio + alcance
  (ver decisiones).

- ✅ **WP-10 · Proyección local-only por defecto + modo de sesión** —
  blindar WP-09: por defecto **nadie proyecta** a GitHub; solo con opt-in
  explícito del usuario. Endurecimiento de seguridad (DC-15), dentro de
  0.3.2. **Skill:** `swarm-orquestacion` · **Rama:** `main` · **Eje(s):**
  ceguera (evitar cara pública accidental).
  **CA:**
  - `proyectar-backlog.mjs export` **rehúsa** sin opt-in explícito
    (`--habilitar-github` / `PROYECCION_GITHUB=1`); dry-run sigue permitido.
  - `reference/proyeccion-issues.md`: modo por defecto **local-only**
    destacado; GitHub = opt-in; el modo se declara al inicio de sesión.
  - `reference/roles/ORQUESTADOR.md`: ritual de inicio confirma el modo
    con el usuario (default local-only). Worker no proyecta; vigía eleva
    proyección no declarada.
  - Ceguera 0.

- ✅ **WP-11 · Cerrar DA-1/DA-2 + badge de método v0.4** — resolver las
  decisiones pendientes del portal/consumo (DC-16..DC-18), dentro de 0.3.2.
  **Skill:** `site-web` (doc) · **mundo-fuente** (portal) · **Rama:** `main`
  · **Eje(s):** ceguera + III (dedup).
  **CA:**
  - `docs/.vitepress/skills-meta.js`: badge de `swarm-orquestacion` → `0.4.0`
    (DC-18).
  - `docs/guide/consumo.md` §3 + `README.md`: aclarar que `.claude/skills/`
    es namespace de **Claude Code** (no universal); fuente runner-agnóstica
    = `node_modules/.../skills/`; recomendar **gitignorar** la copia
    sincronizada (DC-16).
  - DA-2 cerrada sin cambio de código (DC-17): README + portal como únicas
    entradas.
  - `verificar-sitio.mjs` verde; ceguera 0.

## Ola 5 — refinamientos de proyección (release 0.3.3)

- ✅ **WP-12 · Proyección: auto-cierre de huérfanos + modo de alcance** —
  dos refinamientos del exportador (WP-09), unificados en una lógica:
  «proyectá el conjunto elegido; cerrá lo que ya no esté en él».
  **Skill:** `swarm-orquestacion` · **Rama:** `main` · **Eje(s):** ceguera.
  **CA:**
  - **Auto-cierre (DC-19):** todo issue del `sync-map` cuyo WP no esté en
    el conjunto proyectado se cierra (con comentario) y sale del map.
    Verificable: retirar un WP + re-export → su issue se cierra solo.
  - **Alcance configurable (DC-20):** `--alcance todos|abiertos` (default
    `todos`). `abiertos` proyecta solo `⬜`/`🔶`; los `✅` se cierran.
  - `reference/proyeccion-issues.md` + `roles/ORQUESTADOR.md`: el alcance
    se confirma al activar (ritual de inicio).
  - Dry-run cubre ambos (preview sin API); ceguera 0.
  - Semver: contrato ampliado → **0.3.3** (`CHANGELOG` + gate).

## Ola 6 — feedback de consumidor (release 0.3.4) · cerrada

Origen: feedback externo de un mundo consumidor (DC-21). GO del custodio
(2026-07-20): abre WP-13/14/15 (🔶) y ratifica DC-22..24. Modo sesión:
**local-only** (sin proyección a issues). Briefs: `plan/BRIEFS/`.
Cadencia de merge del lote: WP-14 y WP-15 al ✅; **WP-13 último**.
Corte publicable: **0.3.4** (custodio retargeta el 0.4.0 previsto; ver
DC-22).

- ✅ **WP-13 · Doctrina semver + reconciliación 0.4.0** (Punto 1, DC-22).
  **Skill:** pack (README/CHANGELOG) + `swarm-orquestacion` · **Rama:**
  `main` · **Eje(s):** ceguera.
  **Brief:** `plan/BRIEFS/WP-13-semver-doctrina.md`.
  **CA:**
  - README/CHANGELOG fijan la doctrina: cambio de **regla de método** =
    minor; patch = sin cambio de contrato; «versión de método» (badge) y
    «semver de paquete» = ejes distintos, con correspondencia declarada.
  - **0.4.0** cortada (minor) reconciliando la expansión de contrato
    acumulada (regla 15 + gates 0.3.x). El badge v0.4 queda con relación
    documentada al paquete.

- ✅ **WP-14 · verificar-changelog: gobierno vs paquete** (Punto 2, DC-23).
  **Skill:** `swarm-orquestacion` · **Rama:** `main` ·
  **Eje(s):** ceguera + IV (consumidor monorepo como 2º cliente).
  **Brief:** `plan/BRIEFS/WP-14-changelog-gobierno.md`.
  **CA:**
  - La práctica y el gate distinguen **CHANGELOG de gobierno** (uno/mundo,
    WP-id-keyed) de **CHANGELOG de paquete** (N, changesets/semver).
  - El gate es **opt-in/parametrizable** (rutas + declaración de rol); no
    asume changelog único. Documentado como adoptable en monorepos.

- ✅ **WP-15 · Back-links a nivel de tema** (Punto 3, DC-24).
  **Skill:** `site-web` + mundo-fuente (portal) · **Rama:** `main` ·
  **Eje(s):** III (dedup) + ceguera.
  **Brief:** `plan/BRIEFS/WP-15-back-links-tema.md`.
  **CA:**
  - `metodo-mecanismo.md` (B11) + `protocolo-ghpages.md`: back-links =
    config de tema + placeholders únicos (footer/nav), **no** texto por
    página. Corrección de generador = regenerar con fuente única.
  - Mundo-fuente: back-links movidos a footer/nav del tema (fuente única);
    `verificar-sitio` verde.

## Retirados por decisión

No son ⬜/🔶/✅ (no se entregaron como WP): quedaron resueltos por decisión.
No cuentan para el gate de CHANGELOG; sus issues de proyección se cierran.

- **WP-02 · Puntero de consumo en `SKILL.md`** — **descartado** por DC-17:
  el puntero vive solo en README + portal; el `SKILL.md` no lo lleva.
- **WP-03 · Default de la copia sincronizada** — **resuelto** por DC-16
  (gitignorar), implementado en WP-11 (`docs/guide/consumo.md` §3).

## Estado — Ola 6 cerrada (2026-07-20)

> **Olas 1–6 ✅.** Publicado **0.3.4** (registry `latest`; retarget del
> 0.4.0 previsto — DC-22; el artefacto de historial `chore(release): 0.4.0`
> quedó reconciliado por `chore(release): 0.3.4`, sin efecto en lo
> publicado). Gates verdes: gobierno (`--role gobierno`, 12 WP ✅) y sitio
> (`verificar-sitio` @0.3.4).
>
> **Feedback del consumidor (DC-21):** 3/4 puntos **resueltos**
> (WP-13/14/15 → DC-22/23/24). **Punto 4 (parser de proyección)** llegó
> después, **pendiente de triaje** (DC-25 · §Abiertas) — no resuelto en
> 0.3.4.
>
> **Proyección backlog→Issues:** implementada **local-only** (WP-09/10);
> **GO de proyección real a un tracker = pendiente del custodio**.
>
> **Reset anticipado** (custodio, 0 uso): alcance sin definir (§Abiertas).
>
> Estado declarado: **IDLE** — esperando: triaje del Punto 4 · GO de
> proyección real · definición del reset. Ninguno bloquea 0.3.4 publicado.

## Ola 7 — reglas 16–17 (release 0.4.0) · feedback consumidor

Micro-lote gobierno+obra: dos reglas de método destiladas de clases
reincidentes en mundos consumidores (cierre sin run-id; sync-map
especulativo). Semver **minor** (DC-22: cambio de regla de método). Badge
de método `swarm-orquestacion` → **v0.5.0**.

- ✅ **WP-16 · Reglas 16–17 (run-id verde + sync-map post-apply)** —
  `swarm-orquestacion` gana `reference/reglas-metodo-v05.md` (reglas 16 y
  17), resumen en `SKILL.md` (reglas de oro 12–13), checklist en
  `ciclo.md` / `ORQUESTADOR.md`, y nota post-apply en
  `proyeccion-issues.md`. Badge catálogo → v0.5.0.
  **Rama:** `main` (micro-lote gobierno+obra) · **Eje(s):** ceguera + III
  (dedup: el método vive en el skill, no en PRACTICAS de un solo mundo).
  **CA:**
  - Regla 16: cierre de ola cita run-id VERDE de CI (+ Release/homólogo)
    por cada repo tocado; sin cita = ola no cerrada.
  - Regla 17: sync-map se commitea post-apply; mapa especulativo =
    devolución.
  - Ceguera árbol = 0 sobre ficheros tocados.
  - Contrato ampliado → bump **minor** del paquete (WP-17).
  **Reporte:** `plan/REPORTES/WP-16-reglas-16-17.md`.

- ✅ **WP-17 · Release 0.4.0 + regenerar portal** — `package.json` →
  **0.4.0**; CHANGELOG/README; `npm publish` canal real; `workflow_dispatch`
  Docs → `skills.s-sdk.escrivivir.co` regenerado.
  **Rama:** `main` · **Eje(s):** IV (canal real) + ceguera.
  **CA:**
  - `npm view @alephscript/skills-scriptorium@0.4.0` resuelve.
  - Portal HTTP 200; badge método v0.5.0 visible en catálogo/skill.
  - Ceguera 0.
  **Reporte:** `plan/REPORTES/WP-17-release-040.md`.

## Sprint GO DA-S17 / DA-S20

Gate `Rn-LIB` PASS del custodio. Tip de referencia: `cc59e4e`
(`@alephscript/skills-scriptorium@0.9.0`).

- ✅ **WP-18 · parser IDs mixtos + fallo ruidoso** — fallo ruidoso para
  entradas de formato mixto; commit `ec86019` en main.
  **Skill:** `swarm-orquestacion` · **Rama:** `wp/18-parser-ids-mixtos-fallo-ruidoso`
  · **Brief:** `plan/BRIEFS/WP-18-parser-ids-mixtos-fallo-ruidoso.md` ·
  **Reporte:** `plan/REPORTES/WP-18-parser-ids-mixtos-fallo-ruidoso.md`.

- ✅ **WP-19 · salida dual + nota frontera** — aceptado e integrado en
  `main`; calibración local conservada sin trackear `plan/ESTACION.md`.
  Referencia de commits: `cbc6865` + `ea9ac0f`.
  **Skill:** `vigilancia` / `estacion-viva` · **Rama:** `wp/19-salida-dual-nota-frontera`
  · **Brief:** `plan/BRIEFS/WP-19-salida-dual-nota-frontera.md` ·
  **Reporte:** `plan/REPORTES/WP-19-salida-dual-nota-frontera.md`.

- ✅ **WP-20 · operador-rooms (peercard/ACL/salud)** — skill nuevo
  definido; contratos de peercard, ACL y salud en `main`.
  **Skill:** `operador-rooms` · **Rama:** `wp/20-operador-rooms-peercard-acl-salud`
  · **Brief:** `plan/BRIEFS/WP-20-operador-rooms-peercard-acl-salud.md` ·
  **Reporte:** `plan/REPORTES/WP-20-operador-rooms-peercard-acl-salud.md`.

- ✅ **WP-21 · intake prueba-de-dos → skill** — aceptado; mergeado en
  `main` por ff-only.
  **Skill:** `intake-prueba-de-dos` · **Rama:** `wp/21-intake-prueba-de-dos-skill`
  · **Brief:** `plan/BRIEFS/WP-21-intake-prueba-de-dos-skill.md` ·
  **Reporte:** `plan/REPORTES/WP-21-intake-prueba-de-dos-skill.md`.

- release · **minor post ✅ A+B** · tip `735989e` · tag `v0.9.0` · Docs
  `30041973425` ✅ · Publish `30041973372` ✅ · registry `0.9.0` ·
  R2-LIB: PASS.
