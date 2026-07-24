# WP-23 · pulso idle y fixes retroactivos — reporte

| dato | valor |
| ---- | ----- |
| agente | worker fresco WP-23 |
| fecha | 2026-07-24 |
| rama | `wp/23-pulso-idle-fixes-retroactivos` |
| base viva / merge-base | `2464a6d` / `2464a6d` |
| commits alcanzables post-rebase | `ff52a39`, `dcd8e51`, `b4c13a0`, `c6e373b`, `508b3a7` |
| corrección pre-integración | `891c1fc` |
| eje(s) CA | III + ceguera + regla 14 |
| riesgo de revisión | independiente |
| estado propuesto | devuelto-corregido |

## Qué se hizo

Se añadió un detector de identidad fail-closed que exige candidata, canónica,
raíces read-only y patrones downstream explícitos. Resuelve ruta lexical,
`realpath`/alias y git toplevel, normaliza Windows y compara por segmentos.
El watcher lo ejecuta y propaga su LOCK antes de crear `OUT_DIR`.

Se formalizaron el pulso idle, los candidatos de fix retroactivo y la
propuesta de olas mediante el custodio, sin mutar backlog ni abrir, implementar
o aceptar trabajo. Toda salida del vigía quedó en formato dual PO/SCRUM →
handoff operativo, con gate documental, fixtures y falsos negativos.

No se añadió dependencia: los scripts cargan únicamente built-ins de Node.
Gate local y C8 online permanecen separados; este WP no cambia versión ni
contrato de consumo, por lo que C8 online no aplica.

Tras la DEVOLUCIÓN independiente, el gate dual dejó de aceptar caras sin
`§WP`, estructura simulada en cajas, secciones/contenido operativo libre y
claves que solo contienen las subcadenas GO/check/PASS. El gate Eje III dejó
de contar marcadores: cuenta definiciones de símbolos efectivos y su
co-localización. Un contra-probe copia el detector completo, elimina el
comentario marcador y acredita que la copia se rechaza.

La devolución pre-integración adicional mostró que una apertura de cuatro
backticks podía cerrarse incorrectamente con tres. El parser conserva ahora
tipo y longitud del opener y solo cierra con el mismo tipo y longitud igual o
mayor. El contra-probe `parte-1-cercada-cierre-corto` reproduce exactamente el
caso 4→3 y queda rechazado.

## Archivos tocados

- Modificado `skills/vigilancia/README.md`: parámetros y gates locales.
- Modificado `skills/vigilancia/SKILL.md`: entradas de identidad, idle y
  salida dual.
- Creado `skills/vigilancia/examples/addenda-idle-sintetica.md`: fixture idle
  con PASS local y bloqueo online.
- Modificado `skills/vigilancia/examples/addenda-multi-carril-lock.md`:
  migración al contrato dual.
- Modificado `skills/vigilancia/examples/addenda-sintetica.md`: migración al
  contrato dual y prueba de ceguera acotada a `§WP`.
- Modificado `skills/vigilancia/reference/ADDENDA-DOS-CARAS.md`: contrato dual
  validable.
- Modificado `skills/vigilancia/reference/ESTACION.md`: preflight fail-closed,
  pulso idle, fronteras y checklist.
- Creado `skills/vigilancia/scripts/probar-identidad-raiz.mjs`: nueve probes,
  siete LOCK con cero efectos.
- Creado `skills/vigilancia/scripts/probar-salida-dual.mjs`: fixture verde y
  diecinueve falsos negativos estructurales.
- Creado `skills/vigilancia/scripts/probar-dedup-contratos.mjs`: árbol verde
  y duplicado real sin marcador rechazado.
- Creado `skills/vigilancia/scripts/verificar-dedup-contratos.mjs`: gate del
  Eje III.
- Creado `skills/vigilancia/scripts/verificar-identidad-raiz.mjs`: detector
  canónico.
- Creado `skills/vigilancia/scripts/verificar-salida-dual.mjs`: gate
  documental.
- Modificado `skills/vigilancia/scripts/watcher.sh`: preflight antes del
  primer efecto y propagación explícita de exit `23`.
- Creado este reporte dentro del alcance declarado.

## Evidencia

### Identidad y cero efectos

```text
$ node skills/vigilancia/scripts/probar-identidad-raiz.mjs
PASS canonico-valido: identidad-raiz: PASS
PASS prefijo-lexico-no-es-segmento: identidad-raiz: PASS
PASS descendiente-downstream: LOCK exit=23; fs=sin-cambios; git=sin-cambios; OUT_DIR=ausente
PASS alias-fs-a-downstream: LOCK exit=23; fs=sin-cambios; git=sin-cambios; OUT_DIR=ausente
PASS git-toplevel-distinto: LOCK exit=23; fs=sin-cambios; git=sin-cambios; OUT_DIR=ausente
PASS raiz-inexistente: LOCK exit=23; fs=sin-cambios; git=sin-cambios; OUT_DIR=ausente
PASS calibracion-ambigua: LOCK exit=23; fs=sin-cambios; git=sin-cambios; OUT_DIR=ausente
PASS raiz-read-only: LOCK exit=23; fs=sin-cambios; git=sin-cambios; OUT_DIR=ausente
PASS clone-distinto-del-canonico: LOCK exit=23; fs=sin-cambios; git=sin-cambios; OUT_DIR=ausente
identidad-probes: PASS (9 casos)
```

El caso lexicalmente parecido es el control falso negativo. Cada caso
bloqueado invoca el watcher y compara árbol, estado Git y ausencia de
`OUT_DIR` antes/después.

### Salida dual

```text
$ node skills/vigilancia/scripts/probar-salida-dual.mjs
PASS fixture-pass-y-bloqueo
RECHAZO sin-cara-wp: se requiere exactamente una cara §WP
RECHAZO estructura-simulada-en-caja: la estructura dual no puede simularse dentro de una caja
RECHAZO parte-1-cercada-cierre-corto: la estructura dual no puede simularse dentro de una caja
RECHAZO una-sola-parte: se requiere exactamente una Parte 2
RECHAZO parte-1-cercada: Parte 1 no puede estar cercada
RECHAZO seccion-po-omitida: Parte 1 requiere exactamente Qué cambió→Qué sigue→Decisión del custodio
RECHAZO go-oculto: GO no es token completo en Parte 1
RECHAZO matriz-sin-bifurcacion: matriz sin bifurcación real declarada
RECHAZO parte-2-no-copiable: Parte 2 debe ser un único bloque cercado completamente copiable
RECHAZO handoff-con-fluff: Parte 2 contiene fluff
RECHAZO handoff-fuera-de-vocabulario: contenido libre fuera del vocabulario de BACKLOG: MOTIVACION
RECHAZO seccion-libre-en-wp: §WP contiene secciones de nivel 2 libres
RECHAZO contenido-libre-en-handoff: contenido libre fuera del vocabulario de GATES: Decisión operativa fuera de lista.
RECHAZO orden-invertido: orden inválido: debe ser §WP→Parte 1→Parte 2→Prueba de ceguera
RECHAZO estado-divergente: estado operativo distinto entre partes
RECHAZO demasiadas-referencias-wp: Parte 1 contiene más de 2 referencias WP
RECHAZO token-no-go: GO no es token completo en Parte 1
RECHAZO token-checkmate: CHECK no es token completo en Parte 1
RECHAZO token-bypass: PASS no es token completo en Parte 1
salida-dual-probes: PASS (20 casos)

$ for file in skills/vigilancia/examples/addenda-*.md; do node skills/vigilancia/scripts/verificar-salida-dual.mjs "$file" || exit 1; done
salida-dual: PASS
salida-dual: PASS
salida-dual: PASS
```

### Eje III, sintaxis, ceguera y alcance

```text
$ node skills/vigilancia/scripts/verificar-dedup-contratos.mjs
dedup identidad-raiz: PASS simbolos=4 implementaciones=1
dedup salida-dual: PASS simbolos=1 implementaciones=1
dedup-contratos: PASS

$ node skills/vigilancia/scripts/probar-dedup-contratos.mjs
PASS arbol-actual: implementaciones efectivas únicas
RECHAZO detector-duplicado-sin-marcador: lock=2; implementación copiada detectada
dedup-probes: PASS (2 casos)

$ bash -n skills/vigilancia/scripts/watcher.sh
(sin salida; exit 0)

$ node --check skills/vigilancia/scripts/verificar-identidad-raiz.mjs
$ node --check skills/vigilancia/scripts/probar-identidad-raiz.mjs
$ node --check skills/vigilancia/scripts/verificar-salida-dual.mjs
$ node --check skills/vigilancia/scripts/probar-salida-dual.mjs
$ node --check skills/vigilancia/scripts/verificar-dedup-contratos.mjs
$ node --check skills/vigilancia/scripts/probar-dedup-contratos.mjs
(sin salida; exit 0 en los seis comandos)

$ bash skills/vigilancia/scripts/comprobar-ceguera.sh
ceguera: 0
raiz: /c/S_LAB/skills-library-wp-23/skills/vigilancia

$ <búsqueda canónica por fragmentos sobre git log -p -- skills/vigilancia>
ceguera-historial: 0

$ git rev-parse --short=7 main
2464a6d

$ git rev-parse --short=7 "$(git merge-base HEAD main)"
2464a6d

$ git diff --check 2464a6d..HEAD
(sin salida; exit 0)

$ git diff --name-only 2464a6d..HEAD
plan/REPORTES/WP-23-pulso-idle-fixes-retroactivos.md
skills/vigilancia/README.md
skills/vigilancia/SKILL.md
skills/vigilancia/examples/addenda-idle-sintetica.md
skills/vigilancia/examples/addenda-multi-carril-lock.md
skills/vigilancia/examples/addenda-sintetica.md
skills/vigilancia/reference/ADDENDA-DOS-CARAS.md
skills/vigilancia/reference/ESTACION.md
skills/vigilancia/scripts/probar-dedup-contratos.mjs
skills/vigilancia/scripts/probar-identidad-raiz.mjs
skills/vigilancia/scripts/probar-salida-dual.mjs
skills/vigilancia/scripts/verificar-dedup-contratos.mjs
skills/vigilancia/scripts/verificar-identidad-raiz.mjs
skills/vigilancia/scripts/verificar-salida-dual.mjs
skills/vigilancia/scripts/watcher.sh

$ git diff --name-only 2464a6d..HEAD | wc -l
15
```

Diagnósticos del editor sobre `skills/vigilancia`: `No linter errors found.`

## Auto-revisión (PRACTICAS del mundo — con honestidad)

- [x] Diff solo dentro de `ALCANCE_DIFF`: `skills/vigilancia/**` y este
  reporte.
- [x] Cero árboles/ficheros copiados de otros mundos sin procedencia: no se
  copiaron; la salida dual vecina se referencia.
- [x] Sellos con fuente; rutas citadas existentes: comprobadas en el árbol.
- [x] Sin fluff ni promesa de futuro sin `<pendiente>`: evidencia literal;
  contrarrevisión queda pendiente abajo.
- [x] Eje III evidenciado por símbolos efectivos, no marcadores: detector
  copiado íntegro sin comentario se rechaza con definiciones duplicadas.
- [x] Ceguera de árbol e historial reachable: `0`.
- [x] Propiedad positiva y falsos negativos automatizados: 9 probes de
  identidad, 20 de salida dual y 2 de dedup.
- [x] Casos bloqueados sin efectos: árbol y Git sin cambios, `OUT_DIR`
  ausente.
- [x] Dependencia cargada = directa: solo built-ins de Node; ninguna
  dependencia nueva.
- [x] Gate local determinista separado de C8 online: C8 no aplica a este WP.
- [x] Gates ejecutados de verdad: salidas literales arriba.
- [x] Commits convencionales en castellano y alcanzables tras rebase:
  `ff52a39`, `dcd8e51`, `b4c13a0`, `c6e373b`, `508b3a7`, `891c1fc`.
- [x] Sin BACKLOG, swarm-orquestacion, remotas, merge ni release.

## Hallazgos fuera de alcance

Ninguno.

## Dudas / bloqueos

- La contrarrevisión independiente emitió DEVOLUCIÓN y sus dos hallazgos se
  corrigieron. `⏳ re-revisión independiente pendiente del orquestador`; no
  se lanzó subagente por instrucción explícita.
- Sin bloqueos de implementación ni gates locales.

---

## Revisión del orquestador

Contrarrevisión pre-integración inicial: **DEVUELTO**.

1. El parser admitía una Parte 1 cercada con apertura de cuatro backticks y
   cierre de tres.
2. El reporte conservaba base y hashes anteriores al rebase.

Correcciones: `891c1fc` y reporte post-rebase sobre base `2464a6d`.

Contrarrevisión independiente, fresca y read-only final:
**VEREDICTO_REVISOR: PASS**.

- Base, `main` y merge-base: `2464a6d`.
- Tip revisado: `65de1b2`.
- Alcance: quince rutas autorizadas.
- Identidad 9/9, salida dual 20/20 —incluido fence 4→3— y dedup 2/2: PASS.
- Ceguera árbol/historial, sintaxis, lints y estado: limpios.
- El cambio concurrente `2464a6d` no altera los CA de WP-23.

## Veredicto: Aceptado ✅

El orquestador acepta WP-23 para integración atómica tras el PASS
pre-integración. Orden: segundo de la Ola 1 en esta sesión.
