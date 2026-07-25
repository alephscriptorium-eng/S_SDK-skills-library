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
> **Feedback del consumidor (DC-21):** 4/4 puntos **cerrados**
> (WP-13/14/15 → DC-22/23/24; WP-18 → DC-25). El parser de proyección
> quedó resuelto por WP-18 y ya no está pendiente de triaje.
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

## Sprint REVISION-SEMVER-IDLE · release 0.10.0 publicado (2026-07-24)

Autoridad: **GO de planificación + GO de implementación/arranque del
custodio** para WP-22…WP-25. Antes de 🔶: higiene pre-despacho y PASS del
siguiente gate canónico `Rn-LIB`. Plan operativo y handoffs:
`plan/SPRINTS/REVISION-SEMVER-IDLE/PLAN.md`.

Fronteras: obra solo en este repo; no consumidores, no `z-sdk`, no gitlinks,
no publish/tag/release ni bump hasta cumplir el GO condicionado de cierre. La
preparación de este sprint no lanza agentes; se asienta en un único commit de
gobierno y no hace push.

### Ola 1 · paralela, sin solapamiento de archivos

- ✅ **WP-22 · revisión adversarial selectiva + campos de riesgo** —
  contrato read-only independiente; campos de BRIEF/reporte; PASS o
  devolución numerada antes de aceptación en clases de riesgo.
  Contrarrevisión independiente obligatoria para este WP.
  **Brief:** `plan/BRIEFS/WP-22-revision-adversarial-campos-riesgo.md`.
- ✅ **WP-23 · pulso idle + fixes retroactivos + salida dual del vigía** —
  residuos de gates, candidatos y propuesta de olas vía custodio; no escribir
  BACKLOG; gate post-merge separado de contrarrevisión. Toda salida al
  custodio lleva cara PO en llano seguida de handoff scrum copiable para el
  orquestador. Contrarrevisión independiente obligatoria para este WP.
  **CA ampliados:** `WORLD_ROOT` candidata se valida contra
  `CANONICAL_WORLD_ROOT`, `READ_ONLY_ROOTS` y `DOWNSTREAM_PATTERNS` mediante
  ruta absoluta/realpath, junction/symlink, git toplevel, normalización
  Windows y comparación por segmentos. Downstream igual/descendiente,
  ambigüedad o raíz distinta = LOCK fail-closed antes de cualquier mkdir,
  escritura, watcher o git/plan mutable. El vigía solicita al custodio otro
  clone de trabajo, pero no lo crea ni elige. Probes cubren canónico válido,
  falso prefijo, descendiente, alias de filesystem, toplevel distinto y raíz
  no resoluble, verificando cero efectos en casos bloqueados. Los patrones
  concretos viven solo en la calibración del consumidor.
  **Brief:** `plan/BRIEFS/WP-23-pulso-idle-fixes-retroactivos.md`.
- ✅ **WP-24 · gate semver + dependencias directas + probes** — políticas
  `exact`, `caret-semver` y `major-band: >=M.m.p <(M+1).0.0`; warning
  `0.x`; gate local determinista separado de C8 online; probes
  automatizados. Contrarrevisión independiente obligatoria.
  **Brief:** `plan/BRIEFS/WP-24-gate-semver-dependencias-probes.md`.

### Ola 2 · secuencial post Ola 1

- ✅ **WP-25 · integración revisión/semver/idle en el método** — empieza
  tras WP-22…24 aceptados; enlaza las entregas en ciclo/roles/SKILL sin
  duplicarlas e integra el handoff dual bidireccional con vigilancia.
  Contrarrevisión independiente obligatoria.
  **CA ampliados:** integra por referencia el detector de raíz de WP-23 en
  el preflight de `swarm-orquestacion` y el handoff a `estacion-viva`;
  identidad canónica PASS precede mkdir/escritura/watcher/git mutable/plan/
  rama/worktree. LOCK se devuelve al custodio sin crear ni escoger clone.
  Fixtures prueban arranque permitido y bloqueo sin efectos, sin duplicar
  detector ni calibración.
  **Brief:**
  `plan/BRIEFS/WP-25-integracion-metodo-revision-semver-idle.md`.

### Release · PASS

- **Versión:** `0.10.0` (minor compatible, DC-22/DC-27).
- **Tip/tag:** `f251066927e673005cec5dae631c4537f42e53fd` · `v0.10.0`
  anotado y publicado; `main` local/remoto alineado en ese tip antes de este
  cierre de gobierno.
- **Docs:** run `30125503524` · `success`.
- **Publish:** run `30125507369` · `success`.
- **Release homólogo:** GitHub Release `v0.10.0` publicado; este repo no tiene
  workflow `Release` separado, por lo que no existe run-id de Actions que
  atribuirle.
- **Registry/C8:** `npm view
  @alephscript/skills-scriptorium@0.10.0 --registry=https://npm.scriptorium.escrivivir.co
  version` → `0.10.0`; `latest=0.10.0`. Instalación limpia con política
  `exact`: declarada, resuelta en lock e instalada `0.10.0`; sync materializó
  `swarm-orquestacion`, `vigilancia` y `estacion-viva`; probes semver 32/32 e
  integración de método PASS desde la raíz del paquete instalado.
- **Evidencia corregida:** una primera invocación del probe integrado desde la
  raíz del consumidor falló `ENOENT` por cwd incorrecto; la repetición desde
  la raíz del paquete instalado terminó `C8 limpio corregido: PASS`.
- **Frontera:** consumo externo, gitlinks y WP-26 no fueron tocados. El sprint
  no se declara `IDLE sin pendientes`: queda entregar el gate forward
  `z-sdk-backlog-u145`.

### Gate forward post-release · pendiente

- ⬜ **GF-0.10.0-Z · aviso de consumo tras registry/C8 verde** —
  **[z-sdk-backlog-u145](file:///C:/S_LAB/z-sdk/plan/BACKLOG.md)** apunta al
  backlog real del consumidor, ancla estable **WP-U145** (dependencia
  registry), con continuidad en **WP-U147** (`skills:sync`) y política vigente
  **D-36** (`0.x`; versión efectiva en lock). No reabre esos WPs ni crea un WP
  de implementación en LIB.
  **Disparo:** únicamente cuando
  `@alephscript/skills-scriptorium@0.10.0` esté publicado y C8 haya verificado
  que el registry resuelve exactamente `0.10.0`.
  **Acción obligatoria del orquestador/custodio LIB:** entregar el bloque
  copy/paste de
  `plan/SPRINTS/REVISION-SEMVER-IDLE/PLAN.md` §Gate forward post-release al
  custodio para solicitar/iniciar **R12-Z**; Z permanece IDLE y sin GO
  operativo hasta que su propio custodio/vigilante emita ese gate.
  **Evidencia de cierre del gate forward:** versión resuelta `0.10.0`, tests de
  integración relevantes, run-ids/conclusiones aplicables y destinatario de
  devolución asentados por el custodio. La ejecución ocurre en Z bajo su
  gobierno; LIB solo apunta y recibe la evidencia, no contiene ni opera su
  backlog.
  **No bloquea:** bump, tag, publish ni C8 de LIB 0.10.0.
  **Sí bloquea:** declarar `IDLE sin pendientes` post-release sin haber
  entregado el handoff; un HOLD/FAIL posterior de Z no invalida ni revierte el
  release ya verificado de LIB.

## Futuro posterior a REVISION-SEMVER-IDLE

- ⬜ **WP-26 · rescatar skill runtime prueba-de-dos** — port manual de obra
  externa al destino `skills/prueba-de-dos/**`; no cherry-pick, no reapertura
  de WP-21 y no forma parte de Ola 1/Ola 2. Fuente local de gobierno:
  `C:\S\scriptorium`, commits `4427caa4`, `107ae6d6` y únicamente los cambios
  pertinentes de `b66436e2` bajo `playground/prueba-de-dos/**`.
  Reusar por referencia `skills/operador-rooms` para PEERCARD/ACL/salud.
  Excluir `.env`, `.npmrc`, handoffs/outputs H/M,
  `playground/ciudad/**` y metadata privada. Probes obligatorios:
  `--sin-install`, no-clobber, operador inválido y merge idempotente de
  scripts; revalidar Node 22 y dependencias directas.
  **Gate:** requiere planificación futura propia, GO y `Rn-LIB` de su tip;
  no está autorizado para despacho por R5-LIB de este sprint.
  **Release:** independiente y fuera de 0.10.0; no bloquea ese corte.
  **Brief:** `plan/BRIEFS/WP-26-rescatar-skill-runtime-prueba-de-dos.md`.

## Intake de feedback — candidatos no autorizados (2026-07-25)

Estos IDs son anclas estables de intake, **no WPs** y no usan estados
⬜/🔶/✅. El archivo del feedback no concede GO: la obra permanece **IDLE**.
Fuente y deduplicación:
`plan/REPORTES/ADDENDA-INTAKE-Z-2026-07-25.md`.

- **INT-Z-01 · contrato de pulso ONCE** — `<pendiente de decisión>`.
  **Naturaleza:** bug probable / hipótesis. **Alcance probable:**
  `estacion-viva` (`watcher-sesion.sh`, `pulso-mundo.sh`, `pulso.txt`).
  **Evidencia:** sello `2026-07-23T18:44:49Z` y diferencia observada
  `skills_mat=6` vs `8`; no reproducida. **Promover solo si:** el custodio
  fija que `ONCE=1` directo promete refrescar `pulso.txt` y una reproducción
  literal prueba el incumplimiento. **Solape:** afinidad con WP-23, sin
  reabrirlo. **Pregunta:** ¿esa garantía pertenece a `ONCE=1` directo o solo
  a `pulso-mundo.sh`?
- **INT-Z-02 · liveness watcher cross-platform** —
  `<pendiente de decisión>`. **Naturaleza:** anomalía cross-platform.
  **Alcance probable:** `estacion-viva` + `vigilancia`. **Evidencia:**
  `watcher.pid=4627` no verificable con ticks frescos; no demuestra proceso
  muerto. **Promover solo si:** hay caso reproducible por plataforma y se
  decide la señal canónica de liveness. **Solape:** BOOT/WATCHER exigen PID
  vivo; WP-23 no cubre esta divergencia. **Pregunta:** ¿qué señal portable y
  qué plataformas forman el contrato?
- **INT-Z-03 · sucesión de vigía v2 («gorro»)** —
  `<pendiente de decisión>`. **Naturaleza:** wishlist / protocolo.
  **Alcance probable:** `swarm-orquestacion` + `vigilancia`. **Evidencia:**
  la sucesión básica ya existe en `lecciones-vnext.md`; faltan handoff
  volátil, Q&A, herencia explícita de anomalías, rol temporal con origen y
  anclas activas frente a históricas. `R13-Z` aportó un FAIL documental por
  residuo de plantilla en sello. **Promover solo si:** el custodio acepta y
  delimita las piezas obligatorias del patrón. **Solape:** ampliación de la
  sucesión existente, no reapertura de WP-23. **Pregunta:** ¿qué piezas son
  obligatorias y cómo se marca una ancla histórica inerte?
- **INT-Z-04 · guard de identidad en commits de gobierno** —
  `<pendiente de decisión>`. **Naturaleza:** wishlist / protocolo.
  **Alcance probable:** preflight opt-in de `swarm-orquestacion`.
  **Evidencia:** `3bec18a`, `b348c59`, `46c3e5c` atribuidos a
  `Your Name <you@example.com>`. **Promover solo si:** se define el conjunto
  de placeholders, los flujos alcanzados y warning opt-in. **Solape:**
  WP-23/WP-25/DC-28 validan raíz, no autoría. **Pregunta:** ¿qué placeholders
  advertir y en qué punto del flujo, sin bloquear, cambiar git config ni
  reescribir historia?

Cross-reference cerrado: **DA-S17 → WP-18 / DC-25**; el consumidor proyectó
`0 WPs`. No reabrir ni duplicar por defecto.

## Ola de promoción DC-29 (2026-07-26 · GO custodio · gorro de Apolo)

- 🔶 **WP-27 · Parser de proyección multi-serie** — despachado
  (2026-07-26). Promoción explícita DA-S17/DC-25 (WP nuevo, no reabre
  WP-18). `proyectar-backlog.mjs`: aceptar series de ID configurables
  del mundo (`IB-nn`,`PD-nn`,`LIB-0nn`,`N0-nn`,`WP-Unnn`,…), fallar
  ruidoso ante ambigüedad/mixtos no declarados, **cero normalización**
  de IDs del consumidor. Caso de aceptación real: el BACKLOG de S
  proyectaba 0 WPs. Rama `wp/27-parser-multi-serie`.
  _Brief:_ `BRIEFS/WP-27-parser-multi-serie.md`
- 🔶 **WP-28 · Contrato ONCE + liveness del watcher** — despachado
  (2026-07-26). INT-Z-01+02 promovidos con contrato DC-29: ONCE
  refresca `pulso.txt` siempre; liveness por lease de timestamp en
  `watch.log` (PID = pista secundaria); fuente única para
  `skills_mat`. Rama `wp/28-contrato-once-liveness`.
  _Brief:_ `BRIEFS/WP-28-contrato-once-liveness.md`
- 🔶 **WP-29 · Método v0.7 · lecciones del relevo y del frente** —
  despachado (2026-07-26). INT-Z-03 + intake nuevo DC-29: sucesión v2
  «gorro» · claim de carril pre-emulación · poda segura de worktrees
  con junctions · eje «hostil-omite» en contrarrevisión · estándar de
  evidencia enmascarada. Solo referencias/docs de método.
  Rama `wp/29-metodo-v07-lecciones`.
  _Brief:_ `BRIEFS/WP-29-metodo-v07-lecciones.md`
- 🔶 **WP-30 · Guard de identidad opt-in** — despachado (2026-07-26).
  INT-Z-04 promovido: preflight warn-only de placeholders en commits
  de gobierno. Rama `wp/30-guard-identidad`.
  _Brief:_ `BRIEFS/WP-30-guard-identidad.md`

Circuito: workers ∥ en worktrees `C:\S_LAB\.worktrees\lib\` ·
contrarrevisión independiente por WP · merge+gate `Rn-LIB` del
orquestador (emulado, claim en estación).
- ✅ **WP-30 · guard de identidad opt-in** — aceptado (2026-07-26).
  Rama wp/30-guard-identidad · tip obra bce6ded · merge 19347f7.
  Contrarrevisión: PASS DIRECTO (mutation testing 3 mutantes con
  asserts que muerden · 6 bordes de error forzados, exit 0 en todos ·
  cero efectos por hash de .git/config). 14/14 en main.
- ✅ **WP-28 · contrato ONCE + liveness del watcher** — aceptado
  (2026-07-26). Rama wp/28-contrato-once-liveness · tip obra 505e178 ·
  merge en main. Contrarrevisión: PASS con reproducción propia
  (refresco desde sello rancio 2019 · lease vivo/muerto/dudoso ·
  pista-secundaria PID · fuente única skills_mat irrompible con
  ruido). 4 menores follow-up: fallback BSD en test harness (l.83) y
  snippet ESTACION.md:230 · fixture del umbral sin caso límite 2x ·
  fixture sin carpeta-huérfana. Dictamen portabilidad: contrato
  DC-29 (win GitBash + POSIX/Linux GNU) CUMPLIDO; soporte BSD
  parcial, declarado como límite.
