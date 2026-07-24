# WP-22 · revisión adversarial selectiva + campos de riesgo — reporte

| dato | valor |
| ---- | ----- |
| agente | worker fresco WP-22 |
| fecha | 2026-07-24 |
| rama | `wp/22-revision-adversarial-campos-riesgo` |
| commits | `0054bd1`, `b9a8cc2`, `6efbc03`, `5aabf43`, `4b49398`; commit final del reporte: ver historial de la rama |
| eje(s) CA | III + ceguera + regla 14 |
| riesgo de revisión | `independiente` |
| revisor distinto del worker | `sí` — dos revisiones: `DEVUELTO` |
| estado propuesto | devuelto-corregido |

## Qué se hizo

Se definió un contrato canónico de contrarrevisión adversarial selectiva con
dos clasificaciones: `normal` e `independiente`. Se fijaron las clases de riesgo,
el comportamiento read-only y la salida `PASS` o devolución numerada, sin
transferir aceptación ni merge al contrarrevisor. La plantilla de brief recibió
los cuatro campos de riesgo y la de reporte los cinco campos de evidencia. El
rol de revisión separa la contrarrevisión de la revisión ordinaria del
orquestador. Tras la devolución, se eliminó la clasificación duplicada del
brief y se añadió un probe persistente que rechaza una duplicación semántica
inyectada. Tras la segunda devolución, el probe se amplió a los tres
consumidores contractuales y el mutante se movió a `REVISION.md`. No se tocaron
puntos de integración reservados a WP-25.

## Correcciones de la devolución numerada

1. Se sustituyeron los placeholders no ejecutables del reporte por el comando
   exacto del probe persistente y por comandos literales de los demás gates.
2. La clasificación vive únicamente en `revision-adversarial.md`; `BRIEF.md`
   solo registra campos y apunta a esa fuente. El nuevo probe comprueba señales
   semánticas de las seis clases y demuestra que un duplicado mutante es
   rechazado.

Corregido en commit `6efbc03`.

## Correcciones de la segunda devolución numerada

1. El probe ahora inspecciona `BRIEF.md`, `REVISION.md` y
   `plantilla-reporte.md`. Extrae las seis clases de la fila canónica en vez de
   redefinirlas, y demuestra que una copia inyectada en `REVISION.md` queda
   rechazada.
2. La evidencia runtime reconoce que el probe ejecuta Node e importa el
   built-in `node:fs`; no añade ninguna dependencia npm. La instalación limpia
   no aplica porque el built-in forma parte del runtime, no porque falte código
   ejecutable.

Corregido en commit `4b49398`.

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

$ awk '/^```js revision-adversarial-probe$/{on=1;next} /^```$/{if(on) exit} on' skills/swarm-orquestacion/reference/revision-adversarial.md | node --input-type=module
probe revision-adversarial: PASS
caso normal: revisión ordinaria sin contrarrevisión obligatoria
caso gate: contrarrevisión independiente obligatoria
dedup semántico: PASS (fuente canónica=1; consumidores=3; duplicados=0)
mutante REVISION.md: RECHAZADO (clases=6)

$ node --version
v22.21.1

$ bash skills/swarm-orquestacion/scripts/comprobar-ceguera.sh
ceguera: 0
raiz: /c/S_LAB/skills-library-wp-22/skills/swarm-orquestacion

$ P1="ze"; P1+="us"; P2="ho"; P2+="l"; P2+=$'\u00f3'; P2+="n"; P3="ho"; P3+="larqu"; P3+=$'\u00ed'; P3+="a"; P4="SCRI"; P4+="PT_"; P4+="SDK"; P5="S_"; P5+="SDK"; P6="jun"; P6+="tura"; PATTERN="${P1}|${P2}|${P3}|${P4}|${P5}|${P6}"; if git log -p -- skills/swarm-orquestacion/reference/roles/BRIEF.md skills/swarm-orquestacion/reference/roles/REVISION.md skills/swarm-orquestacion/reference/plantilla-reporte.md skills/swarm-orquestacion/reference/revision-adversarial.md | rg -q -i -e "$PATTERN"; then echo "ceguera historial: FAIL"; exit 1; else CODE=$?; test "$CODE" -eq 1 || exit "$CODE"; echo "ceguera historial reachable: 0"; fi
ceguera historial reachable: 0

$ git diff --name-status 71e446a...HEAD
A plan/REPORTES/WP-22-revision-adversarial-campos-riesgo.md
M skills/swarm-orquestacion/reference/plantilla-reporte.md
A skills/swarm-orquestacion/reference/revision-adversarial.md
M skills/swarm-orquestacion/reference/roles/BRIEF.md
M skills/swarm-orquestacion/reference/roles/REVISION.md
```

### Evidencia manual

- Inspección manual del diff completo `71e446a...4b49398`: cinco ficheros,
  todos dentro de `ALCANCE_DIFF`; resultado conforme.
- Comparación manual contra PRACTICAS, brief y plan: documentación rutinaria no
  fuerza contrarrevisión; un gate/parser con riesgo de falsos negativos sí.
- Inspección manual de fronteras: el contrarrevisor no escribe, acepta, mergea,
  modifica BACKLOG, tags ni remotas; resultado conforme.
- Inspección manual de dedup: los tres consumidores conservan sus contratos
  operativos sin enumerar la clasificación; resultado conforme.
- `ReadLints` sobre los ficheros corregidos: `No linter errors found.`

## Evidencia de riesgo y contrarrevisión

- `CASOS_ADVERSARIALES`:
  - `[automatizado]` WP normal de redacción — probe persistente — revisión
    ordinaria sin contrarrevisión obligatoria.
  - `[automatizado]` WP de gate/parser — probe persistente — contrarrevisión
    independiente obligatoria.
  - `[automatizado]` copia de las seis clases dentro de `REVISION.md` — mutación
    en memoria — rechazada con `clases=6`.
  - `[manual]` intento de confundir `PASS` con aceptación — inspección del
    contrato y rol — ambos lo prohíben explícitamente.
  - `[manual]` intento de escribir durante la contrarrevisión — inspección del
    protocolo — operaciones mutables enumeradas como prohibidas.
- `DEPENDENCIAS_DIRECTAS_VERIFICADAS`: el probe ejecuta Node e importa
  directamente su built-in `node:fs`. Dependencias npm nuevas: cero;
  `package.json` no cambió.
- `INSTALACION_LIMPIA`: no aplica instalación npm: `node:fs` forma parte de
  Node. El probe sí es código ejecutable y se verificó con Node `v22.21.1`.
- `TEST_AUTOMATIZADO_VS_EVIDENCIA_MANUAL`:
  - Automatizado: `git diff --check`, ceguera de árbol, probe persistente de
    campos/selección/dedup semántico y ceguera de historial.
  - Manual: inspección del diff, correspondencia con el brief y fronteras
    read-only.
- `VEREDICTO_REVISOR`: `DEVUELTO` por segunda vez; correcciones aplicadas en
  `4b49398`, pendiente de nueva contrarrevisión read-only.

## Auto-revisión (PRACTICAS del mundo — con honestidad)

- [x] Diff solo dentro de `ALCANCE_DIFF`: los cinco paths están enumerados en
  el brief.
- [x] Cero árboles/ficheros copiados de otros mundos sin procedencia: contenido
  nuevo redactado para este skill.
- [x] Sellos con fuente; rutas citadas existentes: los resultados literales
  proceden de los comandos ejecutados y las rutas se verificaron en el árbol.
- [x] Sin fluff ni promesa de futuro sin `<pendiente>`: el único paso futuro,
  la contrarrevisión, figura `⏳ pendiente`.
- [x] Eje(s) aplicables evidenciado(s): el probe rechaza una duplicación
  semántica efectiva fuera de BRIEF, inspecciona los tres consumidores y
  acredita una fuente canónica; ceguera de árbol e historial = 0.
- [x] Gates ejecutados de verdad: comandos exactos y resultados literales
  figuran arriba, sin placeholders.
- [x] Commits convencionales: `feat(revision): definir contrarrevision
  adversarial selectiva`, `docs(reporte): registrar evidencia de WP-22` y
  `fix(revision): deduplicar clasificacion de riesgo`; el reporte corregido se
  asentó convencionalmente y la segunda corrección usa
  `fix(revision): ampliar dedup a todos los consumidores`.
- [x] Diff solo del alcance del WP: no se editaron BACKLOG, SKILL, ciclo,
  ORQUESTADOR, WORKER ni otros WPs.
- [x] Riesgo y contraevidencia del brief cubiertos: caso normal y caso gate
  comprobados.
- [x] Pruebas automatizadas separadas de evidencia manual: secciones distintas
  y etiquetas por caso.

## Hallazgos fuera de alcance

Ninguno.

## Dudas / bloqueos

- Bloqueo de aceptación esperado: WP-22 exige nueva contrarrevisión de una
  identidad distinta. El worker no puede convertir por sí mismo `DEVUELTO` en
  `PASS`.
- Sin bloqueos de implementación ni de gates locales.

---

## Revisión del orquestador

Primera contrarrevisión independiente: **DEVUELTO**.

1. Evidencia automatizada no reproducible por placeholders.
2. Gate de Eje III insuficiente y clasificación semántica duplicada.

Correcciones aplicadas en `6efbc03`; pendiente de nueva contrarrevisión
read-only independiente.

Segunda contrarrevisión independiente: **DEVUELTO**.

1. El gate no cubría consumidores contractuales fuera de `BRIEF.md`.
2. La evidencia negaba ejecución runtime pese al probe Node con `node:fs`.

Correcciones aplicadas en `4b49398`; pendiente de nueva contrarrevisión
read-only independiente y decisión del orquestador.
