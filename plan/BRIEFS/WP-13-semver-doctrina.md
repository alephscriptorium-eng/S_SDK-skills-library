# BRIEF · WP-13

```text
(rol) plan/roles/WORKER.md
  (fuente: skills/swarm-orquestacion/reference/roles/WORKER.md)

WP: WP-13 · Doctrina semver + reconciliación 0.4.0
Rama: wp/13-semver-doctrina
Worktree: <WORKTREE_BASE>/mundo-wp-13
Reporte: plan/REPORTES/WP-13-semver-doctrina.md

Lecturas extra (además de PRACTICAS + WP en BACKLOG + VISION):
- plan/DECISIONES.md DC-18, DC-21, DC-22 (ratificada GO 2026-07-20)
- plan/BRIEFS/WP-14-changelog-gobierno.md (conflicto / orden de merge)
- README.md, CHANGELOG.md, package.json (versión actual 0.3.3)
- skills/swarm-orquestacion/reference/reglas-metodo-v04.md (regla 15)
- docs/.vitepress/skills-meta.js (badge método v0.4 — no contradecir DC-18)
- Eje CA aplicable: ceguera (cara pública: README/CHANGELOG/skills tocados)

Notas del orquestador:
- Skill dominante: **pack** (README/CHANGELOG/semver del paquete).
- ALCANCE_DIFF = README.md · CHANGELOG.md · package.json ·
  skills/swarm-orquestacion/README.md (solo si hace falta anclar la
  doctrina; no tocar scripts/ ni reference/ del gate — eso es WP-14)
- MUNDO_RAIZ = raíz de este repo · WORKTREE_BASE = hermano de MUNDO_RAIZ
- Parallelismo Ola 6: no pisar `skills/swarm-orquestacion/scripts/` ni
  `reference/reglas-metodo-v04.md` §CHANGELOG (WP-14) ni `skills/site-web/`
  ni `docs/` (WP-15).
- Cadencia: **merge último** del lote (corte 0.4.0). Esperar ✅ de WP-14 y
  WP-15 antes de cortar versión, o dejar sección [0.4.0] lista para
  incorporar sus ids al merge final.
- Modo proyección: local-only (no export a issues).
- Ceguera 0 (árbol + git log -p) en lo tocado; medir con grep -c / grep -q.

Empieza: sitúate en rama/worktree, lee PRACTICAS entero, luego implementa.
```
