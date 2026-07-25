# Reporte — WP-33 · Estación de vigilante: composición, claim y plantilla

Rama: `wp/33-estacion-vigilante-claim` (base `origin/main` @ `9fe9785`)
Zona: **SOLO** `skills/vigilancia/**` (+ este reporte). DA-S20 respetado
(cero código movido entre skills; el launcher INVOCA, no absorbe).

## Ficheros

Nuevos:

- `skills/vigilancia/scripts/estacion-de-vigilante.sh` — launcher de
  composición (orquesta preflight identidad → claim → watcher).
- `skills/vigilancia/scripts/claim-vigia.sh` — claim durable
  `claim-vigia.json` (5 campos + lease; aviso doble-conductor; release).
- `skills/vigilancia/scripts/probar-estacion-de-vigilante.sh` — test de los
  3 modos + claim/lease + instanciación de plantilla.
- `skills/vigilancia/reference/ESTACION-DE-VIGILANTE.md` — doctrina de
  composición (qué watcher, claim, pre-git LOCK 23 esperado).
- `skills/vigilancia/reference/plantillas/ESTACION.md.tpl` — plantilla de
  calibración completa e instanciable.

Editados:

- `skills/vigilancia/reference/ESTACION.md` — §Composición «estación de
  vigilante»; nota pre-git (LOCK 23 esperado + puntero estacion-viva);
  snippet `date -d` con fallback BSD (menor #2 WP-28).
- `skills/vigilancia/SKILL.md` — Recursos: nuevos scripts/reference.

## CA por CA

### CA1 — Launcher probado en los 3 modos (mundos sintéticos)

`bash skills/vigilancia/scripts/probar-estacion-de-vigilante.sh` → `exit 0`
(`TODO PASS`). Evidencia literal (breve):

**(a) git completo — identidad → claim → watcher**
```
estacion-de-vigilante: MODO detectado: git-completo (WORLD_ROOT=…/w1)
  [identidad] identidad-raiz: PASS
estacion-de-vigilante: identidad=PASS
  [claim] claim-vigia: adquirido origen='vigia:carril-obra' pid=… version='vigilancia@0.11.0' lease=90s …
estacion-de-vigilante: watcher=lanzado (canónico vigilancia) pid=… interval=1s log=…/watch.log
estacion-de-vigilante: SMOKE ok: primer tick presente en watch.log; desmontando.
  [claim] claim-vigia: liberado origen='vigia:carril-obra' pid=…      ← liberación al cerrar
```

**(b) pre-git — LOCK 23 reportado + modo sesión ofrecido**
```
estacion-de-vigilante: MODO detectado: pre-git (WORLD_ROOT=…/w2-pregit)
  [identidad] LOCK identidad-raiz: WORLD_ROOT no acredita git toplevel: 128
estacion-de-vigilante: LOCK-PRE-GIT exit=23 (esperado en mundo pre-git; fail-closed INTACTO — el detector no afloja).
estacion-de-vigilante: OFRECER-MODO-SESION -> …/skills/estacion-viva (boot de fundación/sesión de estacion-viva).
```
exit 23; sin `watch.log` (el watcher canónico NO arranca).

**(c) claim ya tomado — aviso doble-conductor, sin segundo watcher**
```
estacion-de-vigilante: identidad=PASS
  [claim] claim-vigia: DOBLE-CONDUCTOR — claim VIVO de otro conductor; NO se toma el carril.
  [claim]   claim vivo: origen='vigia:otro-conductor' pid=999999 edad=2s/90s pista=pid-no-verificable
estacion-de-vigilante: DOBLE-CONDUCTOR: claim vivo de otro conductor; NO se lanza un segundo watcher (§10 convivencia).
```
exit 17; sin `watcher.pid`; claim ajeno intacto.

### CA2 — claim-vigia.json con los 5 campos + lease que expira

- 5 campos verificados presentes: `origen_rol`, `ts_iso`, `pid`,
  `version_skill`, `world_root` (+ `lease_seg`/`expira_iso`). JSON parsea.
- Lease: claim con `ts_iso=2000-01-01…` → `status` = `estado=expirado`;
  `acquire` lo **reclama** (`[reclamado(lease-expirado: origen previo=…)]`,
  exit 0) y reescribe con el nuevo origen. Lease contractual; PID = pista
  secundaria (misma disciplina que `comprobar-vivo.sh`).
- `release` respeta propiedad: ajeno → `NO liberado` exit 3; propio → libera.

### CA3 — Plantilla instanciable (launcher la consume sin editar scripts)

El test extrae el bloque «Ejemplo listo» de `ESTACION.md.tpl`, sustituye
**solo** los paths para un mundo sintético y lo ejecuta:
```
== INSTANCIACIÓN · la plantilla ESTACION.md.tpl la consume el launcher ==
  PASS plantilla instanciada → preflight PASS
  PASS plantilla instanciada → watcher lanzado
  PASS instanciación exit 0
```
Ningún `.sh`/`.mjs` fue editado para instanciar. La plantilla cubre TODAS
las entradas (WORLD_ROOT, CANONICAL_WORLD_ROOT, READ_ONLY_ROOTS,
DOWNSTREAM_PATTERNS, WORKTREE_BASE, OUT_DIR, INTERVAL, SIBLING_ROOT,
GAME_MCP, BITACORA, ORIGEN/LEASE, PERFIL_BOOT) con JSON válidos y ejemplos
Windows Y POSIX.

### CA4 — DA-S20 (cero código movido) · ceguera 0

- Cero código movido entre skills; el launcher invoca `../estacion-viva`
  por ruta relativa del espejo, **no** la edita. Diff = solo
  `skills/vigilancia/**`.
- `bash skills/vigilancia/scripts/comprobar-ceguera.sh` → `ceguera: 0`.
- Vocabulario prohibido del brief (whole-word) sobre los ficheros nuevos =
  0 hits.

### Menores integrados

- **INT-V-04 lado-identidad**: `ESTACION.md §Preflight` + `ESTACION-DE-
  VIGILANTE.md §pre-git`: LOCK 23 en pre-git = comportamiento esperado,
  fail-closed intacto, puntero al modo fundación de estacion-viva.
- **Menor #2 WP-28**: snippet `date -d` de `ESTACION.md` ahora con
  `ts_to_epoch()` GNU + fallback BSD, coherente con `comprobar-vivo.sh`.

## Desviaciones / notas

- El test corre `SMOKE=1` (arranca watcher, espera primer tick y desmonta)
  para ser determinista; el modo producción bloquea en `wait` y libera el
  claim en el trap de salida.
- Artefacto de entorno documentado en el test: paths POSIX `/tmp/...`
  dentro de un JSON de env **no** los auto-convierte MSYS; la instanciación
  usa `cygpath -m` para expresar los paths como haría una calibración real
  en Windows. No afecta a POSIX puro.
- Contrarrevisión independiente: PASS con devolución (4 obs); ver §Corrección.

## Corrección (devolución de contrarrevisión)

El revisor reprodujo dos agujeros que vaciaban el guard anti-doble-conductor.
Ambos cerrados en la misma rama; el criterio lease-manda-sobre-PID, DA-S20 y
la frontera `skills/vigilancia/**` se mantienen sin cambios.

### OBS-1 (BLOQUEANTE) — el claim expiraba con el watcher vivo
`estacion-de-vigilante.sh` adquiría el claim UNA vez y bloqueaba en `wait`;
con LEASE=90 el claim quedaba `expirado` a los 90s aunque la estación
siguiera viva → un rival podía `acquire` (exit 0) = dos watchers.
**FIX:** heartbeat de renovación — el launcher lanza un lazo en background
que refresca el claim (`acquire` idempotente, mismo origen+pid) cada
`LEASE/3` s (≥1) mientras el watcher viva; el teardown lo para ANTES del
release. El lease de un conductor vivo ya no expira.
**Prueba nueva (bite):** estación viva con `LEASE=4`; a `2×LEASE+1` s el
claim sigue `estado=vivo` (edad ~3s) y un rival es **RECHAZADO exit 17**;
un solo `watcher.pid` (mismo pid). Sin el fix el claim daría `expirado` y el
rival exit 0.

### OBS-2 (BLOQUEANTE) — TOCTOU en la adquisición
Sin lock entre leer-estado y escribir, N `acquire` concurrentes sobre claim
libre daban N ganadores (cada uno lanzaría su watcher).
**FIX:** adquisición atómica — mutex por `mkdir` de un lockdir
(`$OUT_DIR/.claim-vigia.lock`; `mkdir` atómico en POSIX y MSYS) alrededor del
read-check-write, con ruptura de lock rancio (`MUTEX_STALE`, default 10s) por
si un titular muere en la sección crítica.
**Prueba nueva (bite):** 8 `acquire` concurrentes sobre claim libre →
`ganadores(exit0)=1  perdedores(exit17)=7`. Sin el fix serían 8 ganadores.

### OBS-3 (menor) — corrupto tratado como expirado en silencio
**FIX:** `claim_estado` distingue `corrupto` (sin `ts_iso`, `ts_iso` no
parseable, o sin `origen_rol`) de `expirado`; `status` lo reporta con
`diagnostico=…` y `acquire` emite `AVISO claim corrupto (…)`. El
seguro-por-defecto no cambia: corrupto sigue siendo reclamable.

### OBS-4 (menor) — el trap solo se probaba vía SMOKE
**Prueba nueva:** estación viva real → `SIGTERM` al launcher → se verifica
que el claim se **libera** (fichero ausente) y que el **watcher hijo muere**
(`kill -0` falla). PASS.

Sin cambios (confirmado): (a) lease-manda-sobre-PID — un PID muerto con ts
fresco RECHAZA el robo (exit 17), coherente con WP-28; (b) DA-S20 (se sigue
invocando `estacion-viva`, no se absorbe); (c) frontera `skills/vigilancia/**`
+ reporte.

Suite completa tras la corrección: `TODO PASS` (exit 0), con las pruebas de
OBS-1 y OBS-2 mordiendo. Ceguera 0. Vocabulario prohibido 0.
