# BRIEF · WP-22

```text
(rol) plan/roles/WORKER.md
  (fuente: skills/swarm-orquestacion/reference/roles/WORKER.md)

WP: WP-22 · revisión adversarial selectiva + campos de riesgo
Rama: wp/22-revision-adversarial-campos-riesgo
Worktree: C:\S_LAB\skills-library-wp-22
Reporte: plan/REPORTES/WP-22-revision-adversarial-campos-riesgo.md

Lecturas extra (además de PRACTICAS + WP en BACKLOG + VISION):
- plan/SPRINTS/REVISION-SEMVER-IDLE/PLAN.md
- skills/swarm-orquestacion/reference/roles/BRIEF.md
- skills/swarm-orquestacion/reference/roles/REVISION.md
- skills/swarm-orquestacion/reference/plantilla-reporte.md
- Ejes CA: III + ceguera + regla 14

Notas del orquestador:
- ALCANCE_DIFF =
  skills/swarm-orquestacion/reference/roles/BRIEF.md
  skills/swarm-orquestacion/reference/roles/REVISION.md
  skills/swarm-orquestacion/reference/plantilla-reporte.md
  skills/swarm-orquestacion/reference/revision-adversarial.md (nuevo)
  plan/REPORTES/WP-22-revision-adversarial-campos-riesgo.md
- No tocar SKILL.md, ciclo.md, ORQUESTADOR.md ni WORKER.md; WP-25 integra.
- Definir activación selectiva por clase de riesgo, no para toda documentación.
- Añadir al BRIEF:
  RIESGO_REVISION, MOTIVO_RIESGO, CONTRAEVIDENCIA_REQUERIDA,
  REVISOR_DISTINTO_WORKER.
- Añadir al reporte:
  CASOS_ADVERSARIALES, DEPENDENCIAS_DIRECTAS_VERIFICADAS,
  INSTALACION_LIMPIA, TEST_AUTOMATIZADO_VS_EVIDENCIA_MANUAL,
  VEREDICTO_REVISOR.
- El revisor es distinto del worker, read-only, intenta refutar y emite PASS
  o devolución numerada. No acepta ni mergea.
- Probes/casos citados deben ser automatizados o declararse manuales.
- RIESGO_REVISION: independiente
- MOTIVO_RIESGO: cambia el contrato de revisión del método.
- CONTRAEVIDENCIA_REQUERIDA: demostrar que un WP normal no fuerza revisión
  independiente y que un WP de gate sí la exige.
- REVISOR_DISTINTO_WORKER: sí

Empieza: sitúate en rama/worktree, lee PRACTICAS entero, luego implementa.
```
