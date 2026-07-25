# Brief — WP-28 · Contrato ONCE + liveness del watcher

WP: WP-28 · Rama: wp/28-contrato-once-liveness
Worktree: C:\S_LAB\.worktrees\lib\wp-28-contrato-once-liveness
Reporte: plan/REPORTES/WP-28-contrato-once-liveness.md

## Lecturas
- skills/estacion-viva/scripts/watcher-sesion.sh
- skills/vigilancia/scripts/watcher.sh · reference/ESTACION.md
- plan/DECISIONES.md §DC-29 (contrato decidido) · evidencia: estación
  del consumidor 2026-07-25 (pulso.txt con sello rancio y watcher
  vivo; skills_mat 6 vs 8; pid no verificable con ticks frescos)

## Tarea
1. ONCE=1 escribe SIEMPRE `pulso.txt` (snapshot canónico, ts fresco)
   más línea en watch.log. Documentar el contrato en el propio script
   y en reference.
2. Liveness portable: lease de timestamp — último tick de watch.log
   menor que 2×INTERVAL implica vivo; el PID pasa a pista secundaria
   no contractual. Añadir chequeo (`comprobar-vivo.sh` o flag) que
   emita vivo/muerto/dudoso con evidencia.
3. Fuente ÚNICA para skills_mat (mismo conteo en ONCE y en sesión).
4. Tests reproducibles: fixtures con logs sintéticos + asserts por
   grep/diff en un test ejecutable.

## CA
- ONCE refresca pulso.txt (probado partiendo de sello previo rancio).
- El lease detecta vivo y muerto con logs sintéticos (ambos casos).
- skills_mat idéntico entre ONCE y sesión sobre el mismo árbol.
- Win (Git Bash) + POSIX: sin tasklist/ps como fuente primaria.
- Contrarrevisión independiente PASS antes de ✅.

## ALCANCE_DIFF
- skills/estacion-viva/** · skills/vigilancia/scripts/** y su
  reference SOLO en secciones watcher/liveness (las de sucesión son
  de WP-29) · reporte.
  Prohibido: swarm-orquestacion · site-web · plan/BACKLOG.md
