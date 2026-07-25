# WP-32 · perfiles-boot-fundacion — reporte

| dato | valor |
| ---- | ----- |
| agente | worker-lib |
| fecha | 2026-07-25 |
| rama | `wp/32-perfiles-boot-fundacion` |
| base | `origin/main` @ `9fe9785` |
| eje(s) CA | I (contrato boot) + II (degradaciones) + ceguera + VI (layout consumidor) |
| estado propuesto | listo para revisión |

## Qué se hizo (SOLO docs de estacion-viva; cero scripts)

Se documentan **perfiles de boot** y las **degradaciones de fundación** de
`estacion-viva`, cerrando los cuatro puntos de DC-30 · WP-32
(INT-V-08, INT-V-09, INT-V-04 lado-boot, INT-V-06).

### INT-V-08 · Perfiles de boot (`jugador` / `vigia`)

- `SKILL.md` §«Perfiles de boot» (compacta) + `reference/BOOT.md`
  §«Perfiles de boot» (contrato + tabla fase×perfil + elección en
  calibración).
- Dos perfiles: `jugador` (7 fases, exige `GAME_MCP` + peercard + kit) y
  `vigia` (idéntico salvo fase 5, que **omite por contrato** la conexión al
  juego; no exige `GAME_MCP`).
- **Sin perfil declarado = `jugador`** (retrocompatible).
- Elección en la **calibración local** (var `PERFIL`); registrada en
  `boot.log` (fase 1) y en la salida dual (fase 7).
- Fase 5 (`BOOT.md`) marcada «solo perfil `jugador`»; params de `SKILL.md`
  anotan que `GAME_MCP` es obligatorio solo en `jugador`.

#### Tabla fase × perfil (la del contrato)

| # | fase | `jugador` | `vigia` |
| - | ---- | --------- | ------- |
| 1 | Cargar estación | corre | corre |
| 2 | Regenerar estado desde bitácora | corre | corre |
| 3 | Relanzar watcher (clase sesión) | corre | corre |
| 4 | Pulso del mundo | corre | corre |
| 5 | Conexión al juego (`GAME_MCP` + peercard + kit) | **exigida** | **omitida (declarada)** |
| 6 | Modo debug | corre | corre |
| 7 | Salida dual PO/scrum | corre | corre |

### INT-V-09 · Bootstrap de bitácora ausente

- `reference/BOOT.md` fase 2 §«Degradación · bitácora ausente (bootstrap de
  fundación)»: pasos concretos — sembrar `linea.mdl` con cabecera + **un
  asiento de fundación**, regenerar `estado.json` = **estado inicial**
  (tick-cero), anotar `bitacora: bootstrap-fundacion` en `boot.log`.
- `reference/BITACORA.md` §«Asiento de fundación»: formato de la línea de
  fundación (autor = la estación; excepción de arranque; líneas posteriores
  vuelven al editor MCP del mundo).
- Prohibiciones explícitas: nunca fallo mudo, nunca estado inventado (solo
  tick-cero), nunca segundo almacén.

### INT-V-04 (lado-boot) · Modo fundación (pre-git)

- `reference/BOOT.md` §«Modo fundación (pre-git)»: tabla de qué fases corren
  sin `.git` en `WORLD_ROOT`. Filesystem-only (1, 2, 6, 7 y partes no-git de
  3/4) corren; señales **derivadas de git** (worktrees, locks, git toplevel)
  quedan `<pendiente>` explícito hasta el WP de repo — nunca fingidas en cero
  ni omitidas en silencio.
- **Una línea + puntero** a la doctrina de identidad de `vigilancia`
  (`reference/ESTACION.md` §«Preflight de identidad»; `LOCK identidad-raiz`,
  exit 23). Sin duplicar ni aflojar el fail-closed (esa doctrina es de WP-33).

### INT-V-06 · Ejemplos con layout consumidor

- `reference/BOOT.md` §«Layout de rutas (librería vs consumidor)»: tabla de
  las tres raíces (librería `skills/estacion-viva/`; consumidor canónico
  `node_modules/<PAQUETE_SKILLS>/skills/estacion-viva/`; espejo del runner
  `.claude/skills/estacion-viva/` = adaptador derivado, gitignorado,
  regenerado en `postinstall` — DC-16). Ejemplo del mismo comando
  `reproduce-boot.sh` en los dos layouts.
- Nombre de paquete parametrizado (`<PAQUETE_SKILLS>`) por doctrina de
  ceguera/«el mundo»; el nombre concreto vive en el README de consumo.

## Archivos tocados (ALCANCE_DIFF respetado)

- `skills/estacion-viva/SKILL.md` · perfiles + puntero fundación + params.
- `skills/estacion-viva/reference/BOOT.md` · perfiles, tabla fase×perfil,
  fase 2 bootstrap, fase 5 perfil, modo fundación, layout, criterio y
  anti-patrones.
- `skills/estacion-viva/reference/BITACORA.md` · asiento de fundación.

**No tocado** (fuera de alcance): `scripts/**` (WP-31), `vigilancia/**`
(WP-33; solo puntero textual), `swarm-orquestacion/**`, `examples/**`,
`plan/BACKLOG.md`. `git status` = 3 ficheros, todos en
`skills/estacion-viva/{SKILL.md,reference/}`.

## Evidencia — ceguera

Grep propio sobre las líneas añadidas del diff, lista amplia de mundos/roles
(`zeus|scriptorium|aleph|dionisos|apolo|sol|arrakis|ciudad|zigurat|dramaturgo|novelist|novela`,
word-boundary, `-i`) + identificadores de sesión:

```
grep_propio: 0 hits en lineas añadidas
session-ids: 0 hits
```

`comprobar-ceguera.sh` del taller (`swarm-orquestacion`, salida literal):

```
ceguera: 0
raiz: /c/S_LAB/.worktrees/lib/wp-32-perfiles-boot-fundacion/skills/swarm-orquestacion
```

`comprobar-ceguera.sh` de `estacion-viva` (escanea lo tocado):

```
ceguera: 0
raiz: /c/S_LAB/.worktrees/lib/wp-32-perfiles-boot-fundacion/skills/estacion-viva
```

## CA — cumplidos / no

| CA (brief §CA) | estado | evidencia |
| -------------- | ------ | --------- |
| Perfiles con tabla fase×perfil; elección documentada en calibración | ✅ | `BOOT.md` §Perfiles + §Elección del perfil; `SKILL.md` §Perfiles |
| Degradaciones (sin bitácora · pre-git) con pasos concretos y parametrizados, sin nombres reales | ✅ | `BOOT.md` fase 2 §Degradación + §Modo fundación; `BITACORA.md` §Asiento; ceguera 0 |
| comprobar-ceguera del taller sobre lo tocado = 0 (grep amplio) | ✅ | salidas literales arriba (`0`/`0`) + grep propio 0 |
| Contrarrevisión independiente PASS antes de ✅ | ⏳ | pendiente del rol revisión (no autocertificable por el worker) |

Cobertura por INT: INT-V-08 ✅ · INT-V-09 ✅ · INT-V-04 lado-boot ✅
(lado-identidad queda en WP-33) · INT-V-06 ✅.

## Desviaciones / notas

- Nombre de paquete escrito como placeholder `<PAQUETE_SKILLS>` (no literal)
  para pasar el grep propio del worker, que incluye `aleph|scriptorium`; el
  README de consumo ya lleva el nombre concreto. Coherente con «parametrizar
  el mundo».
- INT-V-04 lado-identidad (LOCK pre-git) **no** se documenta aquí: es de
  WP-33; solo puntero de una línea, sin duplicar doctrina.
- Ningún script tocado (WP-31); el contrato asume `reproduce-boot.sh` ya
  existente sin exigir cambios de código.

## Dudas / bloqueos

- Ninguno.

---

## Revisión del orquestador

_(pendiente)_
