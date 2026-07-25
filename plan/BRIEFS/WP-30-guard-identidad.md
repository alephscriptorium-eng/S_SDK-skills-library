# Brief — WP-30 · Guard de identidad opt-in

WP: WP-30 · Rama: wp/30-guard-identidad
Worktree: C:\S_LAB\.worktrees\lib\wp-30-guard-identidad
Reporte: plan/REPORTES/WP-30-guard-identidad.md

## Lecturas
- skills/swarm-orquestacion/scripts/ (convención de scripts) ·
  reference/roles/ORQUESTADOR.md
- plan/DECISIONES.md §DC-29 · evidencia: commits de gobierno
  atribuidos al placeholder por defecto de git en repo downstream

## Tarea
1. Script nuevo skills/swarm-orquestacion/scripts/verificar-identidad.mjs:
   comprueba la identidad EFECTIVA de git para un repo dado
   (config user.name/user.email + vars GIT_AUTHOR/COMMITTER); si casa
   con la lista de placeholders (default: "Your Name" /
   "you@example.com"; ampliable por flag o env) emite WARNING claro
   con remedios sugeridos (identidad por invocación con git -c, o
   aprovisionar el entorno). Exit 0 SIEMPRE (warn-only).
2. Jamás modifica git config, jamás reescribe historia, jamás
   bloquea.
3. Tests `node --test` con repos temporales sintéticos (placeholder
   → warning; identidad real → silencio).
4. Documentar el preflight opt-in en roles/ORQUESTADOR.md (sección
   corta: correrlo antes de commits de gobierno y merges).

## CA
- Placeholder detectado → warning con diagnóstico; identidad
  legítima → sin ruido; exit 0 en ambos casos.
- Cero efectos secundarios (ni config ni historia).
- Contrarrevisión independiente PASS antes de ✅.

## ALCANCE_DIFF
- skills/swarm-orquestacion/scripts/verificar-identidad.mjs (+ test) ·
  reference/roles/ORQUESTADOR.md (sección nueva) · reporte.
  Prohibido: proyectar-backlog.mjs (dueño WP-27) · reference fuera de
  roles/ (dueño WP-29) · plan/BACKLOG.md
