# BRIEF · WP-25

```text
(rol) plan/roles/WORKER.md
  (fuente: skills/swarm-orquestacion/reference/roles/WORKER.md)

WP: WP-25 · integración del método revisión/semver/idle
Rama: wp/25-integracion-metodo-revision-semver-idle
Worktree: C:\S_LAB\skills-library-wp-25
Reporte: plan/REPORTES/WP-25-integracion-metodo-revision-semver-idle.md

Precondición:
- WP-22, WP-23 y WP-24 aceptados e integrados en main.

Lecturas extra (además de PRACTICAS + WP en BACKLOG + VISION):
- plan/SPRINTS/REVISION-SEMVER-IDLE/PLAN.md
- entregas y reportes WP-22…WP-24
- skills/swarm-orquestacion/SKILL.md
- skills/swarm-orquestacion/reference/ciclo.md
- skills/swarm-orquestacion/reference/roles/ORQUESTADOR.md
- skills/swarm-orquestacion/reference/roles/WORKER.md
- skills/swarm-orquestacion/reference/lecciones-vnext.md
- Ejes CA: III + IV + ceguera + regla 14

Notas del orquestador:
- ALCANCE_DIFF =
  skills/swarm-orquestacion/SKILL.md
  skills/swarm-orquestacion/reference/ciclo.md
  skills/swarm-orquestacion/reference/roles/ORQUESTADOR.md
  skills/swarm-orquestacion/reference/roles/WORKER.md
  skills/swarm-orquestacion/reference/lecciones-vnext.md
  plan/REPORTES/WP-25-integracion-metodo-revision-semver-idle.md
- Enlazar, no duplicar, las referencias creadas en WP-22…WP-24.
- Integrar el flujo:
  prep → worker → contrarrevisión selectiva → aceptación → merge →
  gate post-merge.
- El orquestador conserva aceptación/merge; el revisor opera read-only.
- El ritual de idle recibe candidatos de fixes retroactivos del vigilante,
  pero solo el orquestador escribe BACKLOG tras GO.
- Integrar el contrato dual entregado por WP-23 en el rol de orquestador:
  recibe vista PO/SCRUM + handoff operativo, opera solo sobre el bloque
  técnico y responde al custodio con el mismo orden cuando comunique
  estado/decisión. Enlazar la referencia de `vigilancia`; no duplicar
  plantillas.
- Parte 1: Markdown renderizable fuera de caja, breve y en lenguaje humano,
  con «Qué cambió», «Qué sigue» y «Decisión del custodio»; GO/check/PASS
  visibles como ✅/⏳/⛔ y pocas referencias WP. Matriz compacta solo ante
  bifurcación real o petición de ampliar, preferentemente como lista vertical.
- Parte 2: un único fenced code block íntegramente copy/paste, sin fluff y
  limitado a backlog/gates/alcances/secuencia.
- Integrar por referencia el contrato/detector de identidad de raíz de WP-23
  en el preflight de `swarm-orquestacion` y en el handoff a
  `estacion-viva`; no duplicar implementación ni calibraciones de
  consumidor.
- El orden obligatorio es identidad canónica PASS → cualquier `mkdir`,
  escritura, watcher, git mutable, edición de plan, rama o worktree. Un
  candidato downstream, ambiguo, no resoluble o distinto de
  `CANONICAL_WORLD_ROOT` conserva LOCK fail-closed.
- El orquestador y el arranque de estación devuelven el bloqueo al custodio
  y solicitan un clone de trabajo fuera de `READ_ONLY_ROOTS`; no crean ni
  eligen ese clone.
- Probar el intercambio bidireccional con fixtures de PASS y bloqueo. Debe
  rechazarse si falta una parte, se invierte el orden, Parte 1 está cercada o
  no es breve, el estado no coincide entre partes, o Parte 2 contiene fluff,
  queda parcialmente fuera de caja o no es copiable.
- Documentar que gate local determinista y C8 online producen evidencia
  separada.
- Verificar que campos de BRIEF/reporte, dependencia directa y probes
  automatizados quedan exigidos en los puntos correctos.
- Verificar por referencia, sin copiarlo a la cara FOSS, el gate forward
  post-release `z-sdk-backlog-u145` definido en
  `plan/SPRINTS/REVISION-SEMVER-IDLE/PLAN.md`: solo se entrega tras publish +
  C8 exacto de 0.10.0, solicita R12-Z sin conceder GO externo y exige retorno
  de versión resuelta, tests y run-ids/N/A justificado. WP-25 no edita, opera
  ni reabre el backlog downstream.
- No cambiar package version, CHANGELOG ni workflows de release dentro de
  este WP. La versión autorizada para el cierre posterior es 0.10.0,
  condicionada a integración completa, higiene, gates/ceguera y `Rn-LIB`
  final PASS.
- Requiere contrarrevisión independiente read-only antes de aceptación.
- RIESGO_REVISION: independiente
- MOTIVO_RIESGO: integra un cambio de contrato transversal del método.
- CONTRAEVIDENCIA_REQUERIDA: un WP normal sin contrarrevisión obligatoria,
  un WP de riesgo devuelto sin PASS, separación pre-merge/post-merge y un
  intercambio vigilancia↔orquestación rechazado cuando falte una parte,
  Parte 1 pierda word-wrap o el handoff tenga fluff/no sea copiable; además,
  un arranque bloqueado que demuestre cero efectos antes del LOCK y un
  arranque canónico que continúe sin duplicar el detector.
- REVISOR_DISTINTO_WORKER: sí

Empieza: sitúate en rama/worktree, lee PRACTICAS entero, luego implementa.
```
