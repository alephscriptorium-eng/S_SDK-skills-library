# Brief — WP-33 · Estación de vigilante: composición, claim y plantilla

WP: WP-33 · Rama: wp/33-estacion-vigilante-claim
Worktree: C:\S_LAB\.worktrees\lib\wp-33-estacion-vigilante-claim
Reporte: plan/REPORTES/WP-33-estacion-vigilante-claim.md

## Lecturas
- plan/DECISIONES.md §DC-30 (INT-V-02, INT-V-10, INT-V-04
  lado-identidad, INT-V-03, menor #2 WP-28) · DA-S20 (NO merge
  vigilancia↔estacion-viva — VIGENTE: componer, no fusionar)
- skills/vigilancia/** completo (watcher.sh, verificar-identidad-raiz,
  reference/ESTACION.md, ADDENDA-DOS-CARAS)
- Evidencia: el vigía fundacional del consumidor V encontró «dos
  arranques sin puente» y tuvo que elegir a mano

## Tarea (zona: SOLO skills/vigilancia/**)
1. INT-V-02: composición canónica «estación de vigilante» — un
   launcher `estacion-de-vigilante.sh` en vigilancia/scripts que
   orquesta la secuencia completa: preflight identidad (si el mundo
   es git) → claim → watcher; y su doctrina en reference (cuándo usar
   watcher-sesion de estacion-viva vs watcher canónico de
   vigilancia). PROHIBIDO fusionar los skills (DA-S20): el launcher
   INVOCA, no absorbe.
2. INT-V-10: `claim-vigia.sh` — claim durable en OUT_DIR
   (`claim-vigia.json`: origen/rol, ts ISO, PID, versión del skill,
   WORLD_ROOT); detecta claim previo vivo (lease) y avisa
   doble-conductor; liberar claim al cerrar (o expiración por lease).
3. INT-V-04 (lado identidad): documentar en reference que en mundo
   pre-git el preflight LOCK exit 23 es COMPORTAMIENTO ESPERADO
   (fail-closed intacto); el modo fundación vive en estacion-viva
   (puntero, sin duplicar).
4. INT-V-03: plantilla completa de calibración
   `reference/plantillas/ESTACION.md.tpl` con TODAS las entradas
   (WORLD_ROOT, CANONICAL_WORLD_ROOT, READ_ONLY_ROOTS,
   DOWNSTREAM_PATTERNS, WORKTREE_BASE, OUT_DIR, INTERVAL,
   SIBLING_ROOT, GAME_MCP, BITACORA, perfil de boot), con ejemplos
   JSON válidos y paths estilo Windows Y POSIX.
5. Menor #2 WP-28: el snippet inline de reference/ESTACION.md:~230
   (`date -d`) con fallback BSD o rótulo de requisito GNU coherente
   con comprobar-vivo.sh.

## CA
- Launcher probado en los 3 modos: mundo git completo (identidad→
  claim→watcher) · mundo pre-git (LOCK reportado y modo sesión
  ofrecido explícitamente) · claim ya tomado (aviso doble-conductor,
  no arranca segundo watcher). Tests con mundos sintéticos.
- claim-vigia.json con los 5 campos; lease funciona (claim viejo
  expira).
- Plantilla instanciable: rellenarla para un mundo sintético produce
  calibración que el launcher consume sin editar scripts.
- DA-S20 respetado (cero código movido entre skills) · ceguera 0.
- Contrarrevisión independiente PASS antes de ✅.

## ALCANCE_DIFF
- skills/vigilancia/** (+tests) · reporte. PROHIBIDO: estacion-viva
  (dueños WP-31/32; el launcher la invoca por ruta relativa del
  espejo, no la edita) · swarm-orquestacion (dueño WP-34) ·
  plan/BACKLOG.md.
