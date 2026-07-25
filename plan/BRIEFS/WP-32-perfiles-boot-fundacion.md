# Brief — WP-32 · Perfiles de boot y degradaciones de fundación

WP: WP-32 · Rama: wp/32-perfiles-boot-fundacion
Worktree: C:\S_LAB\.worktrees\lib\wp-32-perfiles-boot-fundacion
Reporte: plan/REPORTES/WP-32-perfiles-boot-fundacion.md

## Lecturas
- plan/DECISIONES.md §DC-30 (INT-V-08, INT-V-09, INT-V-04 lado-boot,
  INT-V-06) · evidencia: boot fundacional del consumidor V (mundo
  pre-git, sin bitácora, sin juego: el vigía tuvo que improvisar qué
  fases aplicaban)
- skills/estacion-viva/SKILL.md + reference/** (las 7 fases del boot)

## Tarea (SOLO docs de estacion-viva; cero scripts)
1. INT-V-08: declarar PERFILES de boot — `jugador` (7 fases, exige
   GAME_MCP+peercard) y `vigia` (omite declaradamente la fase de
   conexión al juego; el resto igual). El perfil se elige en la
   calibración del mundo; sin perfil declarado = jugador (compat).
2. INT-V-09: fase «regenerar estado desde bitácora» con degradación
   documentada para mundo nuevo: si no hay bitácora, bootstrap
   explícito (crear linea.mdl vacía con asiento de fundación +
   estado inicial), nunca fallo mudo ni invento de estado.
3. INT-V-04 (lado boot): sección «modo fundación (pre-git)» — qué
   fases corren sin `.git` en WORLD_ROOT y cuáles quedan `<pendiente>`
   hasta el WP de repo; referencia cruzada al LOCK de identidad de
   vigilancia SIN duplicar su doctrina (una línea + puntero).
4. INT-V-06: los ejemplos de rutas muestran TAMBIÉN el layout
   consumidor (espejo `.claude/skills` vía node_modules), no solo el
   layout de la librería.

## CA
- Perfiles con tabla fase×perfil; elección documentada en calibración.
- Degradaciones (sin bitácora · pre-git) con pasos concretos y
  parametrizados («el mundo»), sin nombres de mundos reales.
- comprobar-ceguera del taller sobre lo tocado = 0 (grep amplio:
  zeus|scriptorium|aleph|dionisos|apolo|arrakis|ciudad|zigurat).
- Contrarrevisión independiente PASS antes de ✅.

## ALCANCE_DIFF
- skills/estacion-viva/SKILL.md · skills/estacion-viva/reference/** ·
  reporte. PROHIBIDO: scripts/ de estacion-viva (dueño WP-31) ·
  vigilancia (dueño WP-33; solo puntero textual) · swarm-orquestacion ·
  plan/BACKLOG.md.
