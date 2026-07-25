# Brief — WP-31 · Contador y coberturas ONCE/liveness

WP: WP-31 · Rama: wp/31-contador-coberturas
Worktree: C:\S_LAB\.worktrees\lib\wp-31-contador-coberturas
Reporte: plan/REPORTES/WP-31-contador-coberturas.md

## Lecturas
- plan/DECISIONES.md §DC-30 · plan/BACKLOG.md (INT-V-01, INT-V-05,
  menores #1/#3/#4 de la aceptación de WP-28)
- skills/estacion-viva/scripts/{contar-skills-mat.sh,
  watcher-sesion.sh, pulso-mundo.sh, comprobar-vivo.sh,
  probar-contrato-once-liveness.sh}

## Tarea
1. INT-V-01: `contar-skills-mat.sh` cuenta SOLO directorios que
   contengan `SKILL.md` (un fichero suelto como el README.md del
   espejo NO es un skill). Evidencia real: pulso reportó 8 con 7.
2. INT-V-05: el pulso/watcher honra `WORKTREE_BASE` externo cuando el
   param está definido (hoy solo mira `$WORLD_ROOT/.worktrees`);
   `worktrees_dir` refleja la base calibrada.
3. Menor #1 WP-28: `probar-contrato-once-liveness.sh` línea del
   `date -d '-450 seconds'` con fallback BSD (como ya hace la l.44)
   o requisito GNU declarado en cabecera del test.
4. Menor #3+#4 WP-28: fixtures nuevas — caso límite del umbral
   (tick a exactamente ~2×INTERVAL±1s: vivo justo dentro, muerto
   justo fuera) y fixture con fichero suelto + carpeta sin SKILL.md
   dentro de `.claude/skills` (el conteo no debe moverse).

## CA
- Pulso sobre espejo real de 7 skills + README.md → 7 (probado).
- WORKTREE_BASE externo con 2 worktrees sintéticos → worktrees_dir=2.
- Suite del contrato ampliada, verde; los casos límite muerden
  (cambiar el umbral o el conteo rompe tests — demuéstralo con una
  mutación en copia).
- Sin cambios fuera de scripts/ de estacion-viva.
- Contrarrevisión independiente PASS antes de ✅.

## ALCANCE_DIFF
- skills/estacion-viva/scripts/** (+ sus tests) · reporte.
  PROHIBIDO: SKILL.md y reference/ de estacion-viva (dueño WP-32) ·
  vigilancia (dueño WP-33) · swarm-orquestacion (dueño WP-34) ·
  plan/BACKLOG.md.
