# BRIEF · WP-15

```text
(rol) plan/roles/WORKER.md
  (fuente: skills/swarm-orquestacion/reference/roles/WORKER.md)

WP: WP-15 · Back-links a nivel de tema
Rama: wp/15-back-links-tema
Worktree: <WORKTREE_BASE>/mundo-wp-15
Reporte: plan/REPORTES/WP-15-back-links-tema.md

Lecturas extra (además de PRACTICAS + WP en BACKLOG + VISION):
- plan/DECISIONES.md DC-8, DC-21, DC-24 (ratificada GO 2026-07-20)
- skills/site-web/reference/metodo-mecanismo.md (B11)
- skills/site-web/reference/protocolo-ghpages.md (§ Enlaces al back)
- docs/ (portal mundo-fuente: tema VitePress, nav/footer, páginas con
  bloques back actuales)
- plan/REPORTES/WP-08-enlaces-back.md (contexto de la entrega previa)
- Eje CA aplicable: III (dedup: una fuente de back-links) + ceguera

Notas del orquestador:
- Skill dominante: **site-web** + dogfood en portal (docs/).
- ALCANCE_DIFF = skills/site-web/ · docs/
  No tocar skills/swarm-orquestacion/ ni README/CHANGELOG/package.json
  del pack (WP-13/14).
- MUNDO_RAIZ = raíz de este repo · WORKTREE_BASE = hermano de MUNDO_RAIZ
- Parallelismo: dirs disjuntos respecto de WP-13/14.
- Cadencia: merge al ✅ (antes del corte WP-13).
- CA portal: npm run docs:build + docs:verificar verdes tras mover
  back-links a footer/nav del tema.
- Modo proyección: local-only (no export a issues).
- Ceguera 0 (árbol + git log -p); medir con grep -c / grep -q.

Empieza: sitúate en rama/worktree, lee PRACTICAS entero, luego implementa.
```
