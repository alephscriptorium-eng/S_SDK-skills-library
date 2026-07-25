# ESTACIÓN DE VIGILANTE — composición (launcher · claim · pre-git)

Doctrina de la **composición canónica** «estación de vigilante»: cómo se
arranca una estación de vigía orquestando piezas que **siguen separadas**.
Marco-agnóstico. Parametriza «el mundo».

> **Regla dura (DA-S20 · componer, no fusionar).** El launcher
> `scripts/estacion-de-vigilante.sh` **INVOCA** cada componente; **no**
> absorbe su código. `vigilancia` y `estacion-viva` permanecen como skills
> distintos. Cero código movido entre skills.

## Secuencia orquestada

```
preflight identidad  →  claim durable  →  watcher
(si el mundo es git)     (§10 convivencia)   (pulso read-only)
```

| fase | pieza invocada | propietario | qué hace |
| ---- | -------------- | ----------- | -------- |
| 1 | `scripts/verificar-identidad-raiz.mjs` | vigilancia | preflight fail-closed; LOCK exit `23` antecede todo efecto |
| 2 | `scripts/claim-vigia.sh acquire` | vigilancia | claim durable en `OUT_DIR`; aviso doble-conductor |
| 3 | `scripts/watcher.sh` | vigilancia | pulso canónico worktrees/locks/CI (no `git status`) |
| — | `../estacion-viva` | estacion-viva | modo sesión/fundación; se invoca por ruta relativa del **espejo**, no se edita |

El launcher exporta las cinco entradas de identidad al preflight y al
watcher; el watcher **re-ejecuta** el preflight (defensa en profundidad).
El claim lo posee el PID del launcher, de modo que se **libera al cerrar**
(trap `EXIT/INT/TERM`) o por expiración de lease.

```bash
WORLD_ROOT=/c/mundo/repo CANONICAL_WORLD_ROOT=/c/mundo/repo \
READ_ONLY_ROOTS='["/c/mundo/_atlas"]' \
DOWNSTREAM_PATTERNS='["consumidor/*/espejo"]' \
OUT_DIR=/c/mundo/.vigia INTERVAL=45 ORIGEN='vigia:carril-obra' \
bash skills/vigilancia/scripts/estacion-de-vigilante.sh
```

## Qué watcher: canónico de vigilancia vs `watcher-sesion` de estacion-viva

Los dos watchers **coexisten**; el launcher del vigía elige el **canónico**.
Criterio de selección (no fusionar — elegir según el rol):

| eje | `watcher.sh` (vigilancia) | `watcher-sesion.sh` (estacion-viva) |
| --- | ------------------------- | ----------------------------------- |
| rol | **vigía read-only** del swarm | **boot de estación viva** que trabaja el mundo |
| vida | proceso de vigilancia; vive lo que dure la vigilancia | **clase sesión**: muere con la sesión (trap del boot) |
| materialización | no materializa skills; barre residuo IDE (regla 15) | aplica **whitelist `.claude/skills/`** (clase I71) para no emitir ~3k FP al materializar el paquete |
| snapshot | `watch.log` + `anomalias.log` | además contrato **ONCE** (`pulso.txt` atómico) + `skills_mat` de fuente única |
| identidad | preflight fail-closed obligatorio | boot regenera estado desde bitácora |

Decisión del launcher:

- **Vigía sobre un swarm ya montado (git)** → `watcher.sh` canónico. Es lo
  que arranca `estacion-de-vigilante.sh` en fase 3.
- **Estación que además materializa skills y bootea sobre bitácora** (perfil
  de estación viva) → `watcher-sesion.sh` de estacion-viva, arrancado por su
  propio boot (`estacion-viva` → `reference/BOOT.md` fase 3). El vigía
  **cita** ese watcher; no lo reimplementa.
- Ambos comparten el **lease de timestamp** como señal contractual de vida
  (`comprobar-vivo.sh` de estacion-viva; ver `ESTACION.md §Liveness`).

## Claim durable y doble-conductor (INT-V-10)

`scripts/claim-vigia.sh` materializa el §10 del contrato de convivencia
(«Claim en el canal de estación antes de emular») como artefacto durable
`OUT_DIR/claim-vigia.json`. El **contrato de método** es del skill
`swarm-orquestacion` (`reference/convivencia-multi-orquestador.md §10`);
aquí solo vive el **mecanismo**.

`claim-vigia.json` — cinco campos obligatorios + lease:

| campo | rol |
| ----- | --- |
| `origen_rol` | quién reclama y con qué gorro (`vigia:<carril>`) |
| `ts_iso` | timestamp ISO-8601 UTC de la toma |
| `pid` | PID del conductor (pista **secundaria** no contractual) |
| `version_skill` | versión del skill que tomó el claim |
| `world_root` | raíz vigilada asociada al claim |
| `lease_seg` / `expira_iso` | ventana de validez (lease) |

Contrato de vida del claim (misma disciplina que el liveness del watcher):

- **VIVO**: `now < ts_iso + lease_seg`. El **lease es contractual**; el PID
  es pista secundaria (en Git Bash el árbol de procesos puede no verificarse
  aunque el lease siga fresco → manda el lease).
- **EXPIRADO / libre**: `acquire` toma el carril y **reclama** un claim viejo
  (sobrescribe un lease vencido).
- **Doble-conductor**: `acquire` sobre un claim **vivo de otro origen** →
  exit `17`, aviso, **sin** tomar el carril y **sin** sobrescribir. El
  launcher, ante `17`, **no arranca un segundo watcher**. Resolución (§10):
  soltar un gorro y registrar la anomalía; reintentar tras expirar el lease
  o tras `release` del titular.
- **Liberación**: `release` borra el claim si es **nuestro** (PID del
  launcher) o con `FORCE=1`. El launcher libera en su trap de salida.

```bash
OUT_DIR=/c/mundo/.vigia WORLD_ROOT=/c/mundo/repo ORIGEN='vigia:carril-obra' \
  bash skills/vigilancia/scripts/claim-vigia.sh acquire   # 0 ok · 17 doble-conductor
OUT_DIR=/c/mundo/.vigia bash skills/vigilancia/scripts/claim-vigia.sh status
OUT_DIR=/c/mundo/.vigia bash skills/vigilancia/scripts/claim-vigia.sh release
```

## §pre-git — LOCK exit 23 es COMPORTAMIENTO ESPERADO (INT-V-04 lado-identidad)

En un mundo **pre-git** (sin `.git`, git toplevel no resoluble) el preflight
`verificar-identidad-raiz.mjs` **LOCKea con exit `23`** porque
`git rev-parse --show-toplevel` falla. Esto **NO es un defecto**: es el
fail-closed funcionando. El launcher lo trata así:

1. **LOCK exit 23 = esperado**, no error a silenciar. El detector **no se
   afloja**: identidad git no acreditada ⇒ el watcher **canónico** no
   arranca (no se crea `OUT_DIR`, ni watcher, ni artefacto de vigilancia).
2. **Fail-closed intacto.** No se degrada el preflight para «tolerar»
   pre-git. La disciplina de `ESTACION.md §Preflight de identidad` sigue
   entera.
3. **Modo sesión/fundación ofrecido explícitamente.** La fundación de un
   mundo pre-git **no** vive aquí: vive en el skill **estacion-viva** (boot
   `reference/BOOT.md` fase 1 «`WORLD_ROOT` existe y es usable (repo o
   fixture)», que sí puede arrancar sobre un fixture pre-git). El launcher
   **apunta** a ese modo (`OFRECER-MODO-SESION -> ../estacion-viva`); no lo
   duplica ni lo edita.

Distinción que hace el launcher ante exit 23:

| situación | mensaje | acción |
| --------- | ------- | ------ |
| **pre-git** (sin `.git`) | `LOCK-PRE-GIT` | ofrecer modo sesión de estacion-viva; fail-closed intacto |
| **git pero identidad no acreditada** (alias downstream, canónico distinto, read-only…) | `LOCK-IDENTIDAD` | pedir al custodio un clone canónico fuera de las raíces observadas |

En ambos casos el exit es `23` (fail-closed propagado); cambia el **puntero
de remedio**, no la severidad.

## Test reproducible

`scripts/probar-estacion-de-vigilante.sh` — mundos sintéticos temporales
(`git init` real vs directorio pre-git) y asserts por `grep`:

- **git completo**: identidad `PASS` → claim adquirido → watcher lanzado con
  tick en `watch.log`; claim liberado al desmontar.
- **pre-git**: `LOCK-PRE-GIT` reportado y `OFRECER-MODO-SESION` explícito; sin
  `OUT_DIR` de vigilancia creado.
- **claim ya tomado**: `DOBLE-CONDUCTOR`, exit 17, **sin** segundo watcher.
- **claim**: cinco campos presentes; lease que expira (claim viejo → `acquire`
  lo reclama).

Portable Git Bash (win) + POSIX. `exit 0` si todo pasa.
