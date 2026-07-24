# Brief para lanzar worker

_Plantilla que rellena el **orquestador** (tras marcar 🔶 en BACKLOG) y el
usuario pega en un **chat nuevo** junto con el rol WORKER._

---

```text
(rol) plan/roles/WORKER.md
  (o el equivalente activado desde el skill swarm-orquestacion)

WP: WP-<id> · <título>
Rama: wp/<id>-<slug>
Worktree: <WORKTREE_BASE>/mundo-wp-<id>   (solo si hay workers en paralelo)
Reporte: plan/REPORTES/WP-<id>-<slug>.md

Lecturas extra (además de PRACTICAS + WP en BACKLOG + VISION):
- plan/DECISIONES.md DE-?/DA-?
- (archivos concretos que el orquestador ya identificó)
- Eje CA aplicable: I | II | III | IV | V | (ninguno / varios)

Notas del orquestador:
- (conflictos con otros WPs en vuelo, orden de merge, excepciones de gates…)
- ALCANCE_DIFF = …
- MUNDO_RAIZ = …
- RIESGO_REVISION: normal | independiente
- MOTIVO_RIESGO: (clase y efecto verificable; justificar también `normal`)
- CONTRAEVIDENCIA_REQUERIDA: (casos que intentarán refutar los CA)
- REVISOR_DISTINTO_WORKER: no requerido | sí

Empieza: sitúate en rama/worktree, lee PRACTICAS entero, luego implementa.
```

---

## Notas de uso

- Un brief por WP; no reutilices el mismo chat para dos WPs.
- Declará el **eje** si el tipo de WP lo activa (extracción, demolición,
  auditoría, contrato, mediación con swarms ajenos).
- Paralelismo: worktree distinto por worker; dirs de entrega que no se pisen.
- Clasificá el riesgo según
  `../revision-adversarial.md`. La revisión independiente es selectiva: se
  exige para gates/parsers con riesgo de falsos negativos, seguridad o
  fronteras de escritura, cambios irreversibles, publicación/release, cambios
  transversales del contrato del método y protocolos que autorizan mutaciones;
  no para documentación rutinaria por el solo hecho de ser documentación.
- Si `RIESGO_REVISION` es `independiente`, los cuatro campos son obligatorios,
  el revisor debe ser distinto del worker y la contraevidencia debe incluir
  algo más que el camino feliz.
