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
- Contrarrevisión independiente: pendiente (rol de revisión del swarm), no
  ejecutada por el worker.
