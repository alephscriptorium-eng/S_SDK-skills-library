# BRIEF · WP-19

```text
(rol) plan/roles/WORKER.md
  (fuente: skills/swarm-orquestacion/reference/roles/WORKER.md)

WP: WP-19 · salida dual + nota frontera (NO merge)
Rama: wp/19-salida-dual-nota-frontera
Worktree: <WORKTREE_BASE>/mundo-wp-19
Reporte: plan/REPORTES/WP-19-salida-dual-nota-frontera.md

Lecturas extra (además de PRACTICAS + WP en BACKLOG + VISION):
- plan/ESTACION.md
- skills/estacion-viva/SKILL.md
- skills/estacion-viva/reference/BOOT.md
- skills/estacion-viva/reference/SALIDA-DUAL.md
- skills/vigilancia/SKILL.md
- skills/vigilancia/reference/ESTACION.md
- Eje CA aplicable: ceguera + 14

Notas del orquestador:
- Skill dominante: **vigilancia / estacion-viva**.
- ALCANCE_DIFF = plan/ESTACION.md · skills/estacion-viva/README.md ·
  skills/estacion-viva/SKILL.md · skills/estacion-viva/reference/SALIDA-DUAL.md ·
  skills/vigilancia/SKILL.md · skills/vigilancia/reference/ESTACION.md
- MUNDO_RAIZ = raíz de este repo · WORKTREE_BASE = hermano de MUNDO_RAIZ
- Gate pendiente: `Rn-LIB` del custodio; no abrir 🔶 antes del PASS.
- Mantener la nota de frontera como local-only; no marcar merge ni
  publicar salida dual fuera del contrato.
- `plan/ESTACION.md` está marcado como nuevo/untracked: tratarlo como
  calibración local hasta nuevo mandato del custodio.
- Ceguera 0 (árbol + git log -p) en lo tocado; medir con grep -c / grep -q.

Empieza: sitúate en rama/worktree, lee PRACTICAS entero, luego implementa.
```
