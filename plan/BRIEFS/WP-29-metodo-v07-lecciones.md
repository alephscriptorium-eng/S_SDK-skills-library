# Brief — WP-29 · Método v0.7 · lecciones del relevo y del frente

WP: WP-29 · Rama: wp/29-metodo-v07-lecciones
Worktree: C:\S_LAB\.worktrees\lib\wp-29-metodo-v07-lecciones
Reporte: plan/REPORTES/WP-29-metodo-v07-lecciones.md

## Lecturas
- skills/swarm-orquestacion/reference/lecciones-vnext.md ·
  convivencia-multi-orquestador.md · ejes-ca.md · SKILL.md (§v0.6)
- skills/vigilancia/reference/ADDENDA-DOS-CARAS.md · ESTACION.md
  (§sucesión)
- plan/DECISIONES.md §DC-29 · evidencia de-identificada: relevo con
  rol temporal, doble-conductor, incidente de poda con junctions,
  cinco devoluciones con hallazgo, un FAIL documental por residuo de
  plantilla en ancla

## Tarea (SOLO docs de método; cero código)
1. Sucesión v2 «gorro» (lecciones-vnext + ESTACION §sucesión):
   handoff volátil · ronda Q&A · herencia de anomalías COMO anomalía ·
   rol temporal con origen declarado · anclas activas literales
   frente a citas históricas inertes marcadas (definir la marca).
2. Claim de carril pre-emulación (convivencia-multi-orquestador):
   antes de emular otro rol, claim en canal de estación + verificar
   idle real; doble-conductor = anomalía registrable.
3. Poda segura de worktrees (ciclo/higiene): desenlazar junctions
   ANTES de podar (borrar solo el enlace); chequeo de reparse points
   previo; alternativa symlinkDirectories.
4. Eje «hostil-omite» (ejes-ca + rol REVISION): probar SIEMPRE la
   ausencia — campo omitido, flag apagado, firma no aportada — no
   solo el envío malformado. Tres casos reales de-identificados:
   payload crudo reenviado · firma sin verificar · control opt-in del
   llamador.
5. Evidencia enmascarada (ADDENDA-DOS-CARAS/ceguera): estándar
   reforzado para caras públicas — el patrón vetado se cita
   enmascarado con conteo literal; aplicación retroactiva queda a
   cada mundo.
6. Declarar método v0.7 en SKILL.md de swarm-orquestacion
   (incremento = estas costuras; mismo patrón editorial que v0.6).

## CA
- Cada pieza en su fichero correcto, parametrizada («el mundo»), SIN
  nombres de mundos/juegos reales ni identificadores de sesión;
  comprobar-ceguera.sh PASS.
- v0.7 declarado con su resumen en SKILL.md.
- Contrarrevisión independiente PASS antes de ✅.

## ALCANCE_DIFF
- skills/swarm-orquestacion/SKILL.md y reference/** ·
  skills/vigilancia/reference/ADDENDA-DOS-CARAS.md y ESTACION.md
  (SOLO §sucesión) · reporte.
  Prohibido: scripts/** (dueños WP-27/WP-30) · estacion-viva (dueño
  WP-28) · plan/BACKLOG.md
