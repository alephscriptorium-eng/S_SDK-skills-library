# Roles del swarm (referencia intra-repo)

Este es el **mundo-fuente**: los prompts de rol viven nativos en
`skills/swarm-orquestacion/reference/roles/`. Aquí **no se copian** — se
referencian. Copiarlos sería el anti-patrón de dedup que el propio skill
predica (modelo emmanuel WP-I60: referencia versionada, no copia).

| rol | fuente |
| --- | ------ |
| orquestador | `skills/swarm-orquestacion/reference/roles/ORQUESTADOR.md` |
| worker | `skills/swarm-orquestacion/reference/roles/WORKER.md` |
| revisión | `skills/swarm-orquestacion/reference/roles/REVISION.md` |
| corrección | `skills/swarm-orquestacion/reference/roles/CORRECCION.md` |
| brief | `skills/swarm-orquestacion/reference/roles/BRIEF.md` |

Recursos de método (misma regla, referencia no copia):

- ciclo: `skills/swarm-orquestacion/reference/ciclo.md`
- ejes de CA: `skills/swarm-orquestacion/reference/ejes-ca.md`
- 14 reglas: `skills/swarm-orquestacion/reference/reglas-metodo-v03.md`
- plantilla de reporte:
  `skills/swarm-orquestacion/reference/plantilla-reporte.md`

## Calibración local del mundo-fuente

- **Rama principal:** `main`. **Ramas de WP:** `wp/<id>-<slug>`.
- **Reportes:** `plan/REPORTES/WP-<id>-<slug>.md` (plantilla referenciada
  arriba).
- Un mundo consumidor externo activaría estos roles vía
  `@alephscript/skills-scriptorium@X.Y.Z` (ver
  [docs/guide/consumo.md](../../docs/guide/consumo.md)); el mundo-fuente
  los tiene en el árbol.
