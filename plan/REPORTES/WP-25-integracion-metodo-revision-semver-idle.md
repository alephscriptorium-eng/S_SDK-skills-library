# WP-25 · integración del método revisión/semver/idle — reporte

| dato | valor |
| ---- | ----- |
| agente | worker fresco WP-25 |
| fecha | 2026-07-24 |
| rama | `wp/25-integracion-metodo-revision-semver-idle` |
| base viva / main / merge-base | `d52e91d52c5a5dd010300c057bd0dfca310d829a` |
| commits alcanzables | `348e4789`, `b67bf625`, `032310ad`, `c8d6c110`, `36263598`, `8211b065`, `b4d53ea9`, `d1591ad9`, `ea97940a`, `e91cc46f`; actualización de este reporte: ver historial de la rama |
| eje(s) CA | III + IV + ceguera + regla 14 |
| riesgo de revisión | `independiente` |
| revisor distinto del worker | `⏳ sin verificar` |
| estado propuesto | devuelto-corregido |

## Qué se hizo

Se integró por referencia el contrato de contrarrevisión selectiva, la política
semver/dependencias y el pulso idle en los puntos de entrada compartidos del
método. El ciclo distingue selección normal/riesgo, revisión read-only
pre-aceptación, aceptación/merge del orquestador y gate post-merge.

El preflight apunta al detector canónico de `vigilancia` y precede cualquier
efecto, incluido el handoff a `estacion-viva`; LOCK vuelve al custodio sin crear
ni elegir otro clone. La salida dual quedó bidireccional por referencia y el
gate forward post-release se consume solo desde la fuente local del mundo.

Se añadió un probe embebido en un fichero autorizado. Compone los probes de
WP-22/23/24 sin duplicar detector, parser, políticas ni calibraciones.

## Devolución numerada corregida

1. El método exige ahora las cuatro entradas `WORLD_ROOT`,
   `CANONICAL_WORLD_ROOT`, `READ_ONLY_ROOTS` y `DOWNSTREAM_PATTERNS` en cada
   despacho/handoff aunque la plantilla base del brief no las contenga.
   Orquestador, worker y ciclo bloquean calibración incompleta. El orquestador
   ejecuta el detector y conserva `identidad-raiz: PASS` antes de construir o
   entregar un handoff, invocar boot/script/fase 1 de `estacion-viva` o permitir
   la creación de `OUT_DIR`. LOCK vuelve al custodio sin efectos.
2. El probe integrado rechaza mutantes sin salida dual del orquestador, sin
   referencias/handoff a estación, sin cada campo de calibración y con BOOT
   anterior al detector o sin PASS previo.
3. El Eje IV de WP-25 se acredita con dos consumidores independientes:
   `ORQUESTADOR.md` y el cliente `WORKER.md`/`ciclo.md`. Ambos ejercitan
   calibración, detector, PASS, estación y bloqueo; el segundo cliente semver
   de WP-24 queda como evidencia compuesta, no como sustituto.
4. La segunda devolución mostró que el probe aún aceptaba omitir LOCK o
   adelantar efectos al bloqueo. El contrato fija ahora
   `DETECTOR → PASS|LOCK → EFECTOS` y exige `LOCK identidad-raiz` fail-closed
   con cero `mkdir`, escritura, watcher, git mutable, plan, rama, worktree,
   boot, handoff y `OUT_DIR`. Los mutantes
   `orquestador-sin-LOCK` y
   `orquestador-con-efectos-antes-del-bloqueo` quedan rechazados.
5. La tercera devolución mostró que buscar efectos en el documento completo
   aceptaba una cláusula incompleta si `boot`/`handoff` aparecían después. El
   probe extrae ahora, por consumidor, la única cláusula entre
   `LOCK identidad-raiz`, `cero efectos:` y `OUT_DIR`; exige dentro de ella los
   diez efectos en el orden literal. El mutante persistente
   `clausula-sin-boot-handoff` queda rechazado.
6. La cuarta devolución mostró que el orden simbólico podía coexistir con una
   instrucción operativa que dijera «después». El probe vincula ahora cada
   consumidor con su cláusula temporal inmediatamente anterior al detector y
   exige literalmente detector/preflight **antes** del primer efecto. Los
   mutantes `orquestador-despues-de-mkdir`, `worker-despues-de-mkdir` y
   `ciclo-despues-de-efecto` quedan rechazados.

Corrección implementada en `032310ad`, sin editar `BOOT.md` ni
`roles/BRIEF.md`; endurecimiento fail-closed añadido en `8211b065` y
extracción semántica de cláusula en `d1591ad9`; orden temporal exacto añadido
en `e91cc46f`.

## Reconciliación post-rebase

La rama se rebasó sobre `d52e91d52c5a5dd010300c057bd0dfca310d829a`.
`main` y el merge-base resuelven exactamente al mismo commit. El cambio
concurrente modifica solo `plan/.sync-map.json`, fuera de los contratos,
scripts, fixtures y reporte de WP-25; por tanto no altera sus CA ni probes.

```text
$ git rev-parse main
d52e91d52c5a5dd010300c057bd0dfca310d829a

$ git merge-base main HEAD
d52e91d52c5a5dd010300c057bd0dfca310d829a

$ git diff --name-status d52e91d52c5a5dd010300c057bd0dfca310d829a^ d52e91d52c5a5dd010300c057bd0dfca310d829a
M plan/.sync-map.json
```

## Archivos tocados

- Modificado `skills/swarm-orquestacion/SKILL.md`: preflight, flujo y recursos
  canónicos.
- Modificado `skills/swarm-orquestacion/reference/ciclo.md`: flujo completo,
  barreras pre/post-merge, campos, dependencias y C8 separado.
- Modificado
  `skills/swarm-orquestacion/reference/roles/ORQUESTADOR.md`: recepción/emisión
  dual, idle, identidad, selección de riesgo y gate forward por referencia.
- Modificado `skills/swarm-orquestacion/reference/roles/WORKER.md`: preflight,
  campos de reporte, dependencias, probes y fronteras del rol.
- Modificado `skills/swarm-orquestacion/reference/lecciones-vnext.md`:
  lecciones integradas y probe ejecutable.
- Creado este reporte.

## Evidencia

### Pruebas automatizadas

```text
$ awk '/^```js integracion-metodo-probe$/{on=1;next} /^```$/{if(on) exit} on' skills/swarm-orquestacion/reference/lecciones-vnext.md | node --input-type=module
seleccion normal/riesgo: PASS
identidad PASS/LOCK y cero efectos: PASS
salida dual valida/invalida: PASS
dedup contratos: PASS
semver verdes/invalidos/falsos-negativos: PASS
segundo cliente semver: PASS
Eje IV consumidor orquestador: PASS
Eje IV consumidor worker/ciclo: PASS
mutante orquestador-sin-salida-dual: RECHAZADO
mutante orquestador-sin-estacion-viva: RECHAZADO
mutante worker-sin-estacion-viva: RECHAZADO
mutante orquestador-sin-WORLD_ROOT: RECHAZADO
mutante orquestador-sin-CANONICAL_WORLD_ROOT: RECHAZADO
mutante orquestador-sin-READ_ONLY_ROOTS: RECHAZADO
mutante orquestador-sin-DOWNSTREAM_PATTERNS: RECHAZADO
mutante orquestador-boot-antes-de-detector: RECHAZADO
mutante ciclo-sin-pass-previo-al-boot: RECHAZADO
mutante orquestador-sin-LOCK: RECHAZADO
mutante orquestador-con-efectos-antes-del-bloqueo: RECHAZADO
mutante clausula-sin-boot-handoff: RECHAZADO
mutante orquestador-despues-de-mkdir: RECHAZADO
mutante worker-despues-de-mkdir: RECHAZADO
mutante ciclo-despues-de-efecto: RECHAZADO
integracion-metodo: PASS
pre-merge/post-merge: evidencia separada

$ bash skills/swarm-orquestacion/scripts/comprobar-ceguera.sh
ceguera: 0
raiz: /c/S_LAB/skills-library-wp-25/skills/swarm-orquestacion

$ <búsqueda canónica por fragmentos sobre git log -p d52e91d52c5a5dd010300c057bd0dfca310d829a..HEAD -- cinco rutas públicas>
ceguera historial reachable: 0

$ git diff --check d52e91d52c5a5dd010300c057bd0dfca310d829a...HEAD
(sin salida; exit 0)

$ git diff --name-status d52e91d52c5a5dd010300c057bd0dfca310d829a...HEAD
A plan/REPORTES/WP-25-integracion-metodo-revision-semver-idle.md
M skills/swarm-orquestacion/SKILL.md
M skills/swarm-orquestacion/reference/ciclo.md
M skills/swarm-orquestacion/reference/lecciones-vnext.md
M skills/swarm-orquestacion/reference/roles/ORQUESTADOR.md
M skills/swarm-orquestacion/reference/roles/WORKER.md
```

El probe compuesto ejecutó los 9 casos de identidad de WP-23 —incluidos siete
LOCK sin cambios de FS/Git ni `OUT_DIR`—, los 20 casos duales, los 2 casos de
dedup, los 32 casos semver y el segundo cliente semver. También extrajo y
ejecutó el probe de selección de WP-22. Para la integración WP-25 ejercitó dos
clientes y rechazó quince mutantes contractuales.

### Evidencia manual

- Inspección manual del diff completo contra PRACTICAS, BACKLOG, VISION, PLAN y
  BRIEF: cinco rutas de método y este reporte, todas autorizadas.
- Inspección manual de referencias relativas: detector/contrato de vigilancia
  y BOOT de estación viva existen en el árbol; no se copiaron sus cuerpos.
- Inspección manual de la devolución: `BOOT.md` y `roles/BRIEF.md` permanecen
  sin cambios; el cierre vive únicamente en los cinco puntos de método
  autorizados.
- Inspección manual de autoridad: el contrarrevisor no acepta ni mergea; el
  vigía no escribe BACKLOG; el worker no opera gate forward.
- Inspección manual de fail-closed: los cinco puntos de método enumeran LOCK y
  los diez efectos prohibidos antes de resolver PASS/LOCK.
- Inspección manual del probe: la lista se valida sobre la cláusula extraída de
  cada consumidor, no sobre presencia global en el documento.
- Inspección manual temporal: cada consumidor exige «antes» en el contexto
  inmediato al detector; el orden simbólico no sustituye esa frase operativa.
- Inspección manual de frontera release: no se editaron versión, CHANGELOG,
  workflows, paquete ni fuentes downstream; no se usó red.
- Diagnósticos del editor sobre los cinco ficheros modificados:
  `No linter errors found.`

## Evidencia de riesgo y contrarrevisión

- `CASOS_ADVERSARIALES`:
  - `[automatizado]` selección normal — probe WP-22 — revisión ordinaria sin
    contrarrevisión obligatoria.
  - `[automatizado]` selección independiente — probe WP-22 — revisor distinto
    y contraevidencia no limitada al camino feliz.
  - `[automatizado]` raíz canónica válida — probe WP-23 — PASS y continuidad.
  - `[automatizado]` raíces inválidas/ambiguas/downstream — probe WP-23 — LOCK
    antes de efectos.
  - `[automatizado]` salida dual PASS/bloqueo — fixture WP-23 — estado visible
    y mismo orden en ambas partes.
  - `[automatizado]` parte ausente, orden invertido, estado divergente, Parte 1
    cercada y fluff/no-copiable — probe WP-23 — RECHAZO.
  - `[automatizado]` políticas semver verdes e inválidas, allow/deny,
    dependencias runtime y falsos negativos — probe WP-24 — 32/32.
  - `[automatizado]` orden pre-aceptación → aceptación/merge → post-merge —
    probe integrado — PASS.
  - `[automatizado]` consumidor ORQUESTADOR — calibración completa,
    detector→PASS→estación y salida dual bidireccional — PASS.
  - `[automatizado]` consumidor WORKER/ciclo — calibración ausente bloqueada,
    detector→PASS→estación y LOCK sin boot/handoff — PASS.
  - `[automatizado]` eliminación de salida dual, estación, cada campo o PASS
    previo; inversión BOOT/detector; eliminación de LOCK; efectos antes del
    bloqueo; cláusula sin boot/handoff; tres cambios antes→después — quince
    mutantes — RECHAZADOS.
- `DEPENDENCIAS_DIRECTAS_VERIFICADAS`: el probe integrado usa directamente
  built-ins `node:fs` y `node:child_process`; los probes compuestos usan
  built-ins declarados por sus fuentes. Dependencias npm nuevas: cero.
- `INSTALACION_LIMPIA`: no aplica al cambio documental ni a built-ins de Node.
  C8 online queda `⏳ sin verificar` por prohibición explícita de red/release.
- `TEST_AUTOMATIZADO_VS_EVIDENCIA_MANUAL`:
  - Automatizado: probe integrado, ceguera árbol/historial y `diff --check`.
  - Manual: alcance, referencias, autoridad de roles y frontera de release.
- `VEREDICTO_REVISOR`: `⏳ pendiente de revisor distinto`.

## Auto-revisión (PRACTICAS del mundo — con honestidad)

- [x] Diff solo dentro de `ALCANCE_DIFF`: cinco rutas de método y este reporte.
- [x] Cero árboles/ficheros copiados de otros mundos sin procedencia: contratos
  de WP-22/23/24 enlazados; no duplicados.
- [x] Sellos con fuente; rutas citadas existentes: probes y rutas comprobados
  sobre la base integrada.
- [x] Sin fluff ni promesa de futuro sin `<pendiente>`: C8 y contrarrevisión
  figuran `⏳`.
- [x] Eje(s) aplicables evidenciado(s): dedup del detector/parser, dos
  consumidores independientes de WP-25, segundo cliente semver compuesto y
  ceguera árbol/historial.
- [x] Gates ejecutados de verdad: salidas literales arriba.
- [x] Commits convencionales y alcanzables post-rebase: `348e4789`,
  `b67bf625`, `032310ad`, `c8d6c110`, `36263598`, `8211b065`, `b4d53ea9`,
  `d1591ad9`, `ea97940a`, `e91cc46f`; esta actualización se asienta en commit
  documental separado.
- [x] Diff solo del alcance del WP: comprobado contra base exacta
  `d52e91d52c5a5dd010300c057bd0dfca310d829a`; seis rutas autorizadas.
- [x] Riesgo y contraevidencia del brief cubiertos: normal/riesgo, PASS/LOCK,
  cláusula aislada, temporalidad antes, cero efectos, quince mutantes, dual
  inválida, semver y pre/post-merge.
- [x] Pruebas automatizadas separadas de evidencia manual: secciones distintas.

## Hallazgos fuera de alcance

Ninguno.

## Dudas / bloqueos

- Bloqueo de aceptación esperado: WP-25 requiere contrarrevisión independiente
  read-only por una identidad distinta. El worker no puede emitir ese PASS.
- C8 online y cualquier gate forward post-release quedan `⏳ sin verificar`;
  este WP prohíbe red, publish y operación downstream.
- Sin bloqueos de implementación ni de gates locales.

---

## Revisión del orquestador

La contrarrevisión independiente devolvió iterativamente bypasses de preflight,
LOCK, cero efectos, cláusula aislada y temporalidad. Las correcciones quedaron
en la misma rama y ampliaron el probe a quince mutantes permanentes.

Contrarrevisión independiente, fresca y read-only final:
**VEREDICTO_REVISOR: PASS DEFINITIVO**.

- Base, `main` y merge-base: `d52e91d`.
- Tip revisado: `61fdb36`.
- Alcance: seis rutas autorizadas.
- Probe integral: PASS; quince mutantes: RECHAZADOS.
- Eje IV: ORQUESTADOR y WORKER/ciclo: PASS.
- Identidad 9/9, salida dual 20/20 y semver 32/32: PASS.
- Ceguera árbol/historial, `diff --check` y worktree: limpios.
- `d52e91d` solo cambia `plan/.sync-map.json` y no altera CA ni alcance.
- C8 online: `⏳ sin verificar`; no se usó red.

## Veredicto: Aceptado ✅

El orquestador acepta WP-25 para integración atómica tras el PASS definitivo.

## Gate post-merge local

Primera ejecución: **DEVUELTO** exclusivamente por higiene; la rama y el
worktree WP-25 ya integrados seguían registrados.

Tras verificar que estaban limpios, se removieron el worktree y la rama local.
La repetición read-only sobre `main` produjo:

```text
R6-LIB POST-MERGE: PASS
HEAD/main: f7248ec
WP-25: ✅
WP-26: ⬜
C8 online: ⏳ sin verificar
```

Sin red, remotas, release, publish ni cambios sobre WP-26.
