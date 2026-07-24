# WP-22 · revisión adversarial selectiva + campos de riesgo — reporte

| dato | valor |
| ---- | ----- |
| agente | worker fresco WP-22 |
| fecha | 2026-07-24 |
| rama | `wp/22-revision-adversarial-campos-riesgo` |
| commits | `0054bd1` (implementación); commit del reporte: ver historial de la rama |
| eje(s) CA | III + ceguera + regla 14 |
| riesgo de revisión | `independiente` |
| revisor distinto del worker | `sí` — ⏳ pendiente |
| estado propuesto | listo para contrarrevisión independiente |

## Qué se hizo

Se definió un contrato canónico de contrarrevisión adversarial selectiva con
dos clasificaciones: `normal` e `independiente`. Se fijaron las clases de riesgo,
el comportamiento read-only y la salida `PASS` o devolución numerada, sin
transferir aceptación ni merge al contrarrevisor. La plantilla de brief recibió
los cuatro campos de riesgo y la de reporte los cinco campos de evidencia. El
rol de revisión separa la contrarrevisión de la revisión ordinaria del
orquestador. No se tocaron puntos de integración reservados a WP-25.

## Archivos tocados

- Modificado `skills/swarm-orquestacion/reference/roles/BRIEF.md`: campos y
  reglas de clasificación selectiva.
- Modificado `skills/swarm-orquestacion/reference/roles/REVISION.md`: modos
  ordinario y adversarial, fronteras read-only y veredictos.
- Modificado `skills/swarm-orquestacion/reference/plantilla-reporte.md`: campos
  de riesgo, casos, dependencias, instalación, tipo de evidencia y veredicto.
- Creado `skills/swarm-orquestacion/reference/revision-adversarial.md`: fuente
  canónica del contrato y casos normal/gate.
- Creado
  `plan/REPORTES/WP-22-revision-adversarial-campos-riesgo.md`: este reporte.

## Evidencia

### Pruebas automatizadas

```text
$ git diff --check 71e446a...HEAD
(sin salida; exit 0)

$ bash skills/swarm-orquestacion/scripts/comprobar-ceguera.sh
ceguera: 0
raiz: /c/S_LAB/skills-library-wp-22/skills/swarm-orquestacion

$ node --input-type=module -e '<probe de campos y selección normal/gate>'
probe revision-selectiva: PASS
caso normal: revision ordinaria sin contrarrevision obligatoria
caso gate: contrarrevision independiente obligatoria

$ node --input-type=module -e '<gate de una definición canónica del encabezado Activación selectiva>'
gate dedup activacion-selectiva: PASS (definiciones=1)

$ git log -p -- <cuatro ficheros públicos tocados> | rg -q -i -e "$PATTERN"
ceguera historial reachable: 0
```

El primer intento del probe de selección terminó con `exit 1` por sustitución
de backticks del shell (`command not found` y
`Error: contrato selectivo incompleto`). Se corrigió únicamente el quoting y se
repitió el mismo control con `exit 0`, cuya salida PASS figura arriba.

### Evidencia manual

- Inspección manual del diff completo `71e446a...0054bd1`: cuatro ficheros de
  implementación, todos dentro de `ALCANCE_DIFF`; resultado conforme.
- Comparación manual contra PRACTICAS, brief y plan: documentación rutinaria no
  fuerza contrarrevisión; un gate/parser con riesgo de falsos negativos sí.
- Inspección manual de fronteras: el contrarrevisor no escribe, acepta, mergea,
  modifica BACKLOG, tags ni remotas; resultado conforme.
- `ReadLints` sobre los cuatro ficheros públicos: `No linter errors found.`

## Evidencia de riesgo y contrarrevisión

- `CASOS_ADVERSARIALES`:
  - `[automatizado]` WP normal de redacción — probe de tabla/caso — revisión
    ordinaria sin contrarrevisión obligatoria.
  - `[automatizado]` WP de gate/parser — probe de tabla/caso — contrarrevisión
    independiente obligatoria.
  - `[manual]` intento de confundir `PASS` con aceptación — inspección del
    contrato y rol — ambos lo prohíben explícitamente.
  - `[manual]` intento de escribir durante la contrarrevisión — inspección del
    protocolo — operaciones mutables enumeradas como prohibidas.
- `DEPENDENCIAS_DIRECTAS_VERIFICADAS`: no aplica; el diff solo añade Markdown,
  no carga runtime ni cambia `package.json`.
- `INSTALACION_LIMPIA`: no aplica; no hay código ejecutable ni dependencias
  nuevas. No se presenta esta justificación como test.
- `TEST_AUTOMATIZADO_VS_EVIDENCIA_MANUAL`:
  - Automatizado: `git diff --check`, ceguera de árbol, probe de campos y
    selección, gate dedup y ceguera de historial.
  - Manual: inspección del diff, correspondencia con el brief y fronteras
    read-only.
- `VEREDICTO_REVISOR`: `⏳ pendiente de revisor distinto`.

## Auto-revisión (PRACTICAS del mundo — con honestidad)

- [x] Diff solo dentro de `ALCANCE_DIFF`: los cinco paths están enumerados en
  el brief.
- [x] Cero árboles/ficheros copiados de otros mundos sin procedencia: contenido
  nuevo redactado para este skill.
- [x] Sellos con fuente; rutas citadas existentes: los resultados literales
  proceden de los comandos ejecutados y las rutas se verificaron en el árbol.
- [x] Sin fluff ni promesa de futuro sin `<pendiente>`: el único paso futuro,
  la contrarrevisión, figura `⏳ pendiente`.
- [x] Eje(s) aplicables evidenciado(s): dedup por definición canónica = 1;
  ceguera de árbol e historial = 0.
- [x] Gates ejecutados de verdad: resultados y un intento fallido se registran
  arriba.
- [x] Commits convencionales: `feat(revision): definir contrarrevision
  adversarial selectiva`; el reporte se asentará con commit convencional.
- [x] Diff solo del alcance del WP: no se editaron BACKLOG, SKILL, ciclo,
  ORQUESTADOR, WORKER ni otros WPs.
- [x] Riesgo y contraevidencia del brief cubiertos: caso normal y caso gate
  comprobados.
- [x] Pruebas automatizadas separadas de evidencia manual: secciones distintas
  y etiquetas por caso.

## Hallazgos fuera de alcance

Ninguno.

## Dudas / bloqueos

- Bloqueo de aceptación esperado: WP-22 exige un contrarrevisor distinto del
  worker. El veredicto sigue `⏳ pendiente`; este worker no puede autoemitirlo.
- Sin bloqueos de implementación ni de gates locales.

---

## Revisión del orquestador

_(la rellena el orquestador tras recibir el veredicto read-only independiente:
aceptado ✅ / devuelto con lista numerada)_
