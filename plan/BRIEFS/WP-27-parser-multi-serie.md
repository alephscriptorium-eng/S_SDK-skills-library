# Brief — WP-27 · Parser de proyección multi-serie

WP: WP-27 · Rama: wp/27-parser-multi-serie
Worktree: C:\S_LAB\.worktrees\lib\wp-27-parser-multi-serie
Reporte: plan/REPORTES/WP-27-parser-multi-serie.md

## Lecturas
- skills/swarm-orquestacion/scripts/proyectar-backlog.mjs (estado actual)
- skills/swarm-orquestacion/reference/proyeccion-issues.md
- plan/DECISIONES.md §DC-29 y §DC-25 · caso real: BACKLOG de S → 0 WPs

## Tarea
1. El parser acepta series de ID del mundo por configuración
   (env/flag `--series` o auto-detección declarada): `IB-\d+`,
   `PD-\d+`, `LIB-\d+`, `N0-\d+`, `WP-U?\d+`, etc.
2. Fallar RUIDOSO (exit distinto de 0 + mensaje con las series
   detectadas) ante IDs mixtos no declarados o ambigüedad — nunca
   silencio con 0 WPs.
3. CERO normalización de IDs del consumidor (DA-S17 lo veta).
4. Tests `node --test` junto al script (fixtures sintéticas de
   BACKLOG estilo multi-serie y estilo WP-Unnn) — verde: parsea las
   series declaradas; rojo: mixto no declarado falla ruidoso.
5. Actualizar reference/proyeccion-issues.md (uso de series).

## CA
- BACKLOG multi-serie sintético → N WPs correctos (antes 0).
- Mixto no declarado → fallo ruidoso con diagnóstico.
- Sin normalización; sync-map y marcadores intactos para WP-XX.
- Contrarrevisión independiente PASS antes de ✅.

## ALCANCE_DIFF
- skills/swarm-orquestacion/scripts/proyectar-backlog.mjs (+ test)
- skills/swarm-orquestacion/reference/proyeccion-issues.md
- reporte. Prohibido: otros skills · bin/ · docs/ · plan/BACKLOG.md
