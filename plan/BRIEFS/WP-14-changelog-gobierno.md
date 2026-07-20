# BRIEF · WP-14

```text
(rol) plan/roles/WORKER.md
  (fuente: skills/swarm-orquestacion/reference/roles/WORKER.md)

WP: WP-14 · verificar-changelog: gobierno vs paquete
Rama: wp/14-changelog-gobierno
Worktree: <WORKTREE_BASE>/mundo-wp-14
Reporte: plan/REPORTES/WP-14-changelog-gobierno.md

Lecturas extra (además de PRACTICAS + WP en BACKLOG + VISION):
- plan/DECISIONES.md DC-6, DC-21, DC-23 (ratificada GO 2026-07-20)
- plan/BRIEFS/WP-13-semver-doctrina.md (conflicto / orden de merge)
- skills/swarm-orquestacion/scripts/verificar-changelog.mjs
- skills/swarm-orquestacion/reference/reglas-metodo-v04.md
  (§ práctica CHANGELOG)
- skills/swarm-orquestacion/SKILL.md (índice de recursos)
- Eje CA aplicable: ceguera + IV (2º cliente: adoptable en monorepo /
  consumidor con N changelogs de paquete; evidenciar parametrización)

Notas del orquestador:
- Skill dominante: **swarm-orquestacion**.
- ALCANCE_DIFF = skills/swarm-orquestacion/ (scripts + reference + SKILL/
  README del skill si el contrato del gate se documenta ahí).
  No bump de package.json ni sección [0.4.0] del CHANGELOG raíz (WP-13).
- MUNDO_RAIZ = raíz de este repo · WORKTREE_BASE = hermano de MUNDO_RAIZ
- Parallelismo: no tocar README.md / CHANGELOG.md / package.json del pack
  (WP-13) ni skills/site-web/ ni docs/ (WP-15).
- Cadencia: merge al ✅ (antes del corte WP-13).
- Modo proyección: local-only (no export a issues).
- Ceguera 0 (árbol + git log -p); medir con grep -c / grep -q.

Empieza: sitúate en rama/worktree, lee PRACTICAS entero, luego implementa.
```
