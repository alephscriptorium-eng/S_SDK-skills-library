# BRIEF · WP-18

```text
(rol) plan/roles/WORKER.md
  (fuente: skills/swarm-orquestacion/reference/roles/WORKER.md)

WP: WP-18 · parser IDs mixtos + fallo ruidoso
Rama: wp/18-parser-ids-mixtos-fallo-ruidoso
Worktree: <WORKTREE_BASE>/mundo-wp-18
Reporte: plan/REPORTES/WP-18-parser-ids-mixtos-fallo-ruidoso.md

Lecturas extra (además de PRACTICAS + WP en BACKLOG + VISION):
- plan/DECISIONES.md DC-25
- skills/swarm-orquestacion/scripts/proyectar-backlog.mjs
- skills/swarm-orquestacion/reference/proyeccion-issues.md
- plan/REPORTES/WP-09-proyeccion.md
- plan/REPORTES/WP-12-proyeccion-refinamientos.md
- Eje CA aplicable: III + ceguera

Notas del orquestador:
- Skill dominante: **swarm-orquestacion**.
- ALCANCE_DIFF = skills/swarm-orquestacion/scripts/proyectar-backlog.mjs ·
  skills/swarm-orquestacion/reference/proyeccion-issues.md
- MUNDO_RAIZ = raíz de este repo · WORKTREE_BASE = hermano de MUNDO_RAIZ
- Gate pendiente: `Rn-LIB` del custodio; no abrir 🔶 antes del PASS.
- El parser no debe omitir IDs con formatos mixtos en silencio: si no
  puede interpretar, debe fallar ruidoso y dejar evidencia.
- Ceguera 0 (árbol + git log -p) en lo tocado; medir con grep -c / grep -q.

Empieza: sitúate en rama/worktree, lee PRACTICAS entero, luego implementa.
```
