# ESTACIÓN — plantilla de calibración (instanciable)

Plantilla del `plan/ESTACION.md` (nota de frontera local) de **un** mundo.
Rellena los `{{PLACEHOLDERS}}`; el resultado calibra la **composición
canónica** sin editar ningún script. El launcher
`scripts/estacion-de-vigilante.sh` consume el bloque de entorno de §3 tal
cual. Protocolo ≠ datos: esta plantilla no contiene mundos reales.

> Cómo instanciar: copiar a `plan/ESTACION.md` (o `OUT_DIR/ESTACION.md`),
> sustituir cada `{{…}}`, validar los JSON con `node -e "JSON.parse(process.argv[1])" '<json>'`
> y arrancar con el bloque de §3.

## 1 · Entradas (todas)

| entrada | consumidor | rol | ejemplo |
| ------- | ---------- | --- | ------- |
| `WORLD_ROOT` | vigilancia (launcher, watcher, preflight) | raíz candidata del repo vigilado | `/c/mundo/repo` |
| `CANONICAL_WORLD_ROOT` | vigilancia (preflight) | clone de trabajo canónico esperado | `/c/mundo/repo` |
| `READ_ONLY_ROOTS` | vigilancia (preflight) | array JSON de raíces solo-lectura | `["/c/mundo/_atlas"]` |
| `DOWNSTREAM_PATTERNS` | vigilancia (preflight) | array JSON de patrones por segmentos | `["consumidor/*/espejo"]` |
| `WORKTREE_BASE` | estacion-viva (INT-V-05) / worktrees del swarm | base externa de worktrees a honrar | `/c/mundo/.worktrees` |
| `OUT_DIR` | vigilancia + claim + watcher | logs/estado/claim del vigía | `/c/mundo/.vigia` |
| `INTERVAL` | watcher | segundos entre muestras (default 45) | `45` |
| `SIBLING_ROOT` | watcher (opcional) | segundo root hermano solo-lectura | `/c/mundo/gobierno` |
| `GAME_MCP` | estacion-viva (perfil jugador) | endpoint/descriptor del MCP de juego | `mcp://juego.local/estacion` |
| `BITACORA` | estacion-viva (boot fase 2) | ruta de la bitácora (fuente única de estado) | `/c/mundo/repo/bitacora/linea.mdl` |
| `ORIGEN` | claim | origen/rol del claim (`vigia:<carril>`) | `vigia:carril-obra` |
| `LEASE` | claim | segundos de lease del claim (default 90) | `90` |
| `PERFIL_BOOT` | estacion-viva (INT-V-08) | perfil de arranque: `vigia` o `jugador` | `vigia` |

Notas:

- El **perfil `vigia`** omite declaradamente la fase `GAME_MCP` (INT-V-08):
  `GAME_MCP`/`BITACORA` quedan como calibración inerte y el arranque usa el
  watcher **canónico** de vigilancia. El **perfil `jugador`** exige
  `GAME_MCP` y bootea con estacion-viva.
- `WORLD_ROOT` == `CANONICAL_WORLD_ROOT` en el clone de trabajo; difieren
  solo para forzar un LOCK de prueba.
- `DOWNSTREAM_PATTERNS`: cada patrón es una secuencia `/` de segmentos; `*`
  = exactamente un segmento. `**`, `.` y `..` producen LOCK.

## 2 · Bloque de calibración (JSON válido)

Sustituir valores; debe seguir siendo JSON parseable.

```json
{
  "world_root": "{{WORLD_ROOT}}",
  "canonical_world_root": "{{CANONICAL_WORLD_ROOT}}",
  "read_only_roots": ["{{READ_ONLY_ROOT_1}}"],
  "downstream_patterns": ["{{DOWNSTREAM_PATTERN_1}}"],
  "worktree_base": "{{WORKTREE_BASE}}",
  "out_dir": "{{OUT_DIR}}",
  "interval": 45,
  "sibling_root": "{{SIBLING_ROOT_O_VACIO}}",
  "game_mcp": "{{GAME_MCP_O_VACIO}}",
  "bitacora": "{{BITACORA}}",
  "origen": "{{ORIGEN}}",
  "lease": 90,
  "perfil_boot": "{{PERFIL_BOOT}}"
}
```

Ejemplo instanciado — **POSIX / Git Bash** (JSON válido):

```json
{
  "world_root": "/c/mundo/repo",
  "canonical_world_root": "/c/mundo/repo",
  "read_only_roots": ["/c/mundo/_atlas", "/c/mundo/gobierno"],
  "downstream_patterns": ["consumidor/*/espejo"],
  "worktree_base": "/c/mundo/.worktrees",
  "out_dir": "/c/mundo/.vigia",
  "interval": 45,
  "sibling_root": "/c/mundo/gobierno",
  "game_mcp": "",
  "bitacora": "/c/mundo/repo/bitacora/linea.mdl",
  "origen": "vigia:carril-obra",
  "lease": 90,
  "perfil_boot": "vigia"
}
```

Ejemplo instanciado — **Windows** (JSON válido; backslashes escapados):

```json
{
  "world_root": "C:\\mundo\\repo",
  "canonical_world_root": "C:\\mundo\\repo",
  "read_only_roots": ["C:\\mundo\\_atlas", "C:\\mundo\\gobierno"],
  "downstream_patterns": ["consumidor\\*\\espejo"],
  "worktree_base": "C:\\mundo\\.worktrees",
  "out_dir": "C:\\mundo\\.vigia",
  "interval": 45,
  "sibling_root": "C:\\mundo\\gobierno",
  "game_mcp": "",
  "bitacora": "C:\\mundo\\repo\\bitacora\\linea.mdl",
  "origen": "vigia:carril-obra",
  "lease": 90,
  "perfil_boot": "vigia"
}
```

## 3 · Bloque de arranque (el launcher lo consume sin editar scripts)

### POSIX / Git Bash

```bash
export WORLD_ROOT="{{WORLD_ROOT}}"
export CANONICAL_WORLD_ROOT="{{CANONICAL_WORLD_ROOT}}"
export READ_ONLY_ROOTS='["{{READ_ONLY_ROOT_1}}"]'
export DOWNSTREAM_PATTERNS='["{{DOWNSTREAM_PATTERN_1}}"]'
export OUT_DIR="{{OUT_DIR}}"
export INTERVAL=45
export SIBLING_ROOT="{{SIBLING_ROOT_O_VACIO}}"
export ORIGEN="{{ORIGEN}}"
export LEASE=90
bash skills/vigilancia/scripts/estacion-de-vigilante.sh
```

### Windows (PowerShell, invocando Git Bash)

```powershell
$env:WORLD_ROOT            = "C:\mundo\repo"
$env:CANONICAL_WORLD_ROOT  = "C:\mundo\repo"
$env:READ_ONLY_ROOTS       = '["C:/mundo/_atlas"]'   # JSON: usar / o \\ escapado
$env:DOWNSTREAM_PATTERNS   = '["consumidor/*/espejo"]'
$env:OUT_DIR               = "C:\mundo\.vigia"
$env:INTERVAL              = "45"
$env:ORIGEN                = "vigia:carril-obra"
$env:LEASE                 = "90"
bash skills/vigilancia/scripts/estacion-de-vigilante.sh
```

### Ejemplo listo (POSIX, perfil vigía)

```bash
export WORLD_ROOT="/c/mundo/repo"
export CANONICAL_WORLD_ROOT="/c/mundo/repo"
export READ_ONLY_ROOTS='["/c/mundo/_atlas"]'
export DOWNSTREAM_PATTERNS='["consumidor/*/espejo"]'
export OUT_DIR="/c/mundo/.vigia"
export INTERVAL=45
export ORIGEN="vigia:carril-obra"
export LEASE=90
bash skills/vigilancia/scripts/estacion-de-vigilante.sh
```

## 4 · Perfil de boot

| perfil | watcher | fase GAME_MCP | fuente de estado |
| ------ | ------- | ------------- | ---------------- |
| `vigia` | `watcher.sh` canónico (vigilancia) | **omitida** (declarado, INT-V-08) | `watch.log` / `anomalias.log` en `OUT_DIR` |
| `jugador` | `watcher-sesion.sh` (estacion-viva, boot fase 3) | requerida (`GAME_MCP` no vacío) | bitácora (`BITACORA`) regenerada en boot |

El launcher de vigilancia implementa el **perfil `vigia`**. El perfil
`jugador` se arranca por el boot de estacion-viva (skill aparte; el launcher
lo cita, no lo edita — DA-S20). Ambos comparten identidad fail-closed y
lease de vida.

## 5 · Frontera (recordatorio)

- Esta plantilla es **calibración local**; no vive en el skill como dato de
  instancia. Instanciada, se guarda en `plan/ESTACION.md` u `OUT_DIR`.
- El launcher **no** edita estacion-viva ni swarm-orquestacion: los invoca
  por ruta relativa del espejo (`.claude/skills/…`).
- Rellenar esta plantilla NO exige tocar ningún `.sh`/`.mjs`.
