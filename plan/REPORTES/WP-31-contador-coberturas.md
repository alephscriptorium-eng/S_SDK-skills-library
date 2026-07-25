# Reporte — WP-31 · Contador y coberturas ONCE/liveness

- **Rama**: `wp/31-contador-coberturas` (base `origin/main` = 9fe9785)
- **Worktree**: `C:\S_LAB\.worktrees\lib\wp-31-contador-coberturas`
- **Ficheros tocados** (SOLO `estacion-viva/scripts/**`):
  - `skills/estacion-viva/scripts/contar-skills-mat.sh`
  - `skills/estacion-viva/scripts/watcher-sesion.sh`
  - `skills/estacion-viva/scripts/probar-contrato-once-liveness.sh`

## Tareas (INT-V-01, INT-V-05, menores #1/#3/#4 de WP-28)

### 1. INT-V-01 — contador cuenta SOLO directorios con SKILL.md
La causa real de «pulso reportó 8 con 7» quedó reproducida: el
`find "$WORLD_ROOT/.claude/skills" -type f -name 'SKILL.md'` recursivo
**sobrecontaba** cuando un skill materializado trae un `SKILL.md` ANIDADO
(p. ej. `skill-1/examples/demo/.claude/skills/anidado/SKILL.md`) — daba 8
sobre un espejo de 7. (El README.md suelto ya no era el único ruido: el
`-name SKILL.md` ni lo veía; el problema es el anidamiento + entradas
sueltas.) `contar-skills-mat.sh` ahora cuenta los **directorios de primer
nivel** bajo `.claude/skills` que tienen su `SKILL.md` directo:

```sh
for d in "$base"/*/; do
  [ -f "${d}SKILL.md" ] && n=$((n+1))
done
```

- README.md suelto → es fichero, no lo capta el glob `*/`.
- carpeta sin SKILL.md → el `-f` la descarta.
- SKILL.md anidado dentro de un skill → el skill se cuenta UNA vez.

### 2. INT-V-05 — pulso/watcher honra WORKTREE_BASE externo
`watcher-sesion.sh` calcula `WORKTREE_BASE="${WORKTREE_BASE:-$WORLD_ROOT/.worktrees}"`
y cuenta subdirectorios de esa base calibrada (ficheros sueltos no cuentan).
`worktrees_dir` del snapshot refleja la base. `pulso-mundo.sh` **no** requirió
cambio: la variable se hereda del entorno al delegar en el watcher (verificado).

### 3. Menor #1 WP-28 — fallback BSD en el `date` del test
La línea `date -d '-450 seconds'` del test pasó a helper `hace_seg()` con el
MISMO patrón de fallback GNU→BSD que la l.44 / CA1
(`date -d … || date -v-<n>S`). Reutilizado por MUERTO y por los casos límite.

### 4. Menores #3+#4 WP-28 — fixtures nuevas
- **#3 umbral en el límite 2×INTERVAL** (`CA-UMBRAL`): con INTERVAL=45
  (THRESHOLD=90) sello JUSTO dentro (edad ~87 < 90 → vivo) y JUSTO fuera
  (edad ~93 ≥ 90 → muerto), aseverando literal `umbral=90s`.
- **#4 fichero suelto + carpeta sin SKILL.md** (`CA-CONTEO`): espejo de 7
  skills + README.md suelto + carpeta-sin-SKILL + SKILL.md anidado → 7, y
  «conteo inmóvil»: quitar el ruido sigue dando 7.

## CA por CA (evidencia literal)

**CA1 — Pulso sobre espejo real de 7 skills + README.md → 7.** CUMPLIDO.
```
PASS CA-CONTEO espejo 7 skills + README suelto + carpeta-sin-SKILL + SKILL.md anidado → 7 (no 8)
PASS CA-CONTEO conteo inmóvil: sin el ruido sigue siendo 7 (el ruido nunca sumó)
```

**CA2 — WORKTREE_BASE externo con 2 worktrees sintéticos → worktrees_dir=2.** CUMPLIDO.
```
PASS CA-WT WORKTREE_BASE externo (2 worktrees + fichero suelto) → worktrees_dir=2
PASS CA-WT fallback sin WORKTREE_BASE → $WORLD_ROOT/.worktrees (ausente = 0)
```
Comprobación adicional vía `pulso-mundo.sh` (3 worktrees externos):
`worktrees_dir: 3`.

**CA3 — Suite ampliada verde; los casos límite muerden (mutación en copia).** CUMPLIDO.
Suite completa (16 aserciones) en verde:
```
PASS CA1 ONCE refrescó pulso.txt (ts fresco: …, +0s)
PASS CA1 ONCE dejó línea de tick en watch.log
PASS CA3 skills_mat único = 3 (watch.log=3 snapshot=3 directo=3 sesion2=3; ruido excluido)
PASS CA-CONTEO espejo 7 skills + README suelto + carpeta-sin-SKILL + SKILL.md anidado → 7 (no 8)
PASS CA-CONTEO conteo inmóvil: sin el ruido sigue siendo 7 (el ruido nunca sumó)
PASS CA2 lease VIVO (tick fresco). …
PASS CA2 lease MUERTO (tick rancio). … edad=451s umbral=90s …
PASS CA2 lease DUDOSO (sin watch.log). …
PASS CA2 lease DUDOSO (log sin tick parseable). …
PASS CA-UMBRAL VIVO justo dentro (edad ~87 < 90). … edad=88s umbral=90s …
PASS CA-UMBRAL MUERTO justo fuera (edad ~93 >= 90). … edad=93s umbral=90s …
PASS CA2/PID tick fresco con PID no verificable ⇒ VIVO (pid no contractual). …
PASS INTEGR ONCE→pulso reciente ⇒ lease VIVO. …
PASS FUENTE pulso-mundo.sh == 3 (misma fuente que sesión)
PASS CA-WT WORKTREE_BASE externo (2 worktrees + fichero suelto) → worktrees_dir=2
PASS CA-WT fallback sin WORKTREE_BASE → $WORLD_ROOT/.worktrees (ausente = 0)
---
probar-contrato-once-liveness: PASS (todos los CA)
```

**Mutación demostrativa (en COPIA del scripts/, sin tocar los ficheros reales):**

Mutación A — revertir el contador a `find -type f -name SKILL.md` recursivo:
```
FAIL CA-CONTEO espejo debía contar 7 (README/carpeta/anidado no son skills), dio 8
FAIL CA-CONTEO el conteo se movió al quitar ruido (8 != 7)
probar-contrato-once-liveness: FAIL (2 aserciones)   [rc=1]
```

Mutación B — cambiar `THRESHOLD=$(( 2 * INTERVAL ))` a `3 * INTERVAL`:
```
FAIL CA-UMBRAL debía ser vivo justo dentro del umbral (rc=0). … edad=88s umbral=135s …
FAIL CA-UMBRAL debía ser muerto justo fuera del umbral (rc=0). … edad=94s umbral=135s …
probar-contrato-once-liveness: FAIL (2 aserciones)   [rc=1]
```

**CA4 — Sin cambios fuera de `scripts/` de estacion-viva.** CUMPLIDO.
`git diff --name-only` = exactamente los 3 scripts listados. No se tocó
`SKILL.md`, `reference/`, `examples/`, `vigilancia`, `swarm-orquestacion`,
ni `plan/BACKLOG.md`.

**CA5 — Contrarrevisión independiente PASS antes de ✅.** PENDIENTE (rol revisión).

## Higiene / método-agnóstico
- `grep -rniE 'zeus|scriptorium|aleph|dionisos|apolo|arrakis|ciudad|zigurat|dramaturgo|\bsol\b'`
  sobre `scripts/` → sin coincidencias. Fixtures sintéticas y neutras.
- No se creó junction de `node_modules` (no fue necesario; nada que eliminar).

## Desviaciones
- El «±1s» exacto del brief para el caso límite es demasiado fino para el
  reloj de pared en Git Bash (jitter medido de una invocación ~0.23s). Se
  usa margen ±3s alrededor de 2×INTERVAL y se asevera además `umbral=90s`
  literal; el caso sigue mordiendo el multiplicador 2× y cualquier
  desplazamiento ≥3s del umbral (demostrado por la mutación B).
- `pulso-mundo.sh` no necesitó edición para INT-V-05: hereda `WORKTREE_BASE`
  del entorno al delegar en el watcher (verificado: worktrees_dir=3).
