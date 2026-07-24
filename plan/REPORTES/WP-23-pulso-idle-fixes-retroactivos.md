# WP-23 · pulso idle y fixes retroactivos — reporte

| dato | valor |
| ---- | ----- |
| agente | worker fresco WP-23 |
| fecha | 2026-07-24 |
| rama | `wp/23-pulso-idle-fixes-retroactivos` |
| commits de implementación | `274d39e`, `c2b0ffd` |
| eje(s) CA | III + ceguera + regla 14 |
| riesgo de revisión | independiente |
| estado propuesto | listo para revisión |

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
  once falsos negativos.
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
RECHAZO una-sola-parte: falta Parte 2
RECHAZO parte-1-cercada: Parte 1 no puede estar cercada
RECHAZO seccion-po-omitida: Parte 1 omite ### Decisión del custodio
RECHAZO go-oculto: GO no es visible en ambas partes
RECHAZO matriz-sin-bifurcacion: matriz sin bifurcación real declarada
RECHAZO parte-2-no-copiable: Parte 2 debe ser un único bloque cercado completamente copiable
RECHAZO handoff-con-fluff: Parte 2 contiene fluff
RECHAZO handoff-fuera-de-vocabulario: Parte 2 sale del vocabulario operativo: MOTIVACION
RECHAZO orden-invertido: orden inválido: debe ser Parte 1→Parte 2
RECHAZO estado-divergente: estado operativo distinto entre partes
RECHAZO demasiadas-referencias-wp: Parte 1 contiene más de 2 referencias WP
salida-dual-probes: PASS (12 casos)

$ for file in skills/vigilancia/examples/addenda-*.md; do node skills/vigilancia/scripts/verificar-salida-dual.mjs "$file" || exit 1; done
salida-dual: PASS
salida-dual: PASS
salida-dual: PASS
```

### Eje III, sintaxis, ceguera y alcance

```text
$ node skills/vigilancia/scripts/verificar-dedup-contratos.mjs
dedup CONTRATO_IDENTIDAD_RAIZ_V1: PASS definiciones=1
dedup CONTRATO_SALIDA_DUAL_V1: PASS definiciones=1
dedup-contratos: PASS

$ bash -n skills/vigilancia/scripts/watcher.sh
(sin salida; exit 0)

$ node --check skills/vigilancia/scripts/verificar-identidad-raiz.mjs
$ node --check skills/vigilancia/scripts/probar-identidad-raiz.mjs
$ node --check skills/vigilancia/scripts/verificar-salida-dual.mjs
$ node --check skills/vigilancia/scripts/probar-salida-dual.mjs
(sin salida; exit 0 en los cuatro comandos)

$ bash skills/vigilancia/scripts/comprobar-ceguera.sh
ceguera: 0
raiz: /c/S_LAB/skills-library-wp-23/skills/vigilancia

$ <búsqueda canónica por fragmentos sobre git log -p -- skills/vigilancia>
ceguera-historial: 0

$ git diff --check 71e446a..HEAD
(sin salida; exit 0)

$ git diff --name-only 71e446a..HEAD
skills/vigilancia/README.md
skills/vigilancia/SKILL.md
skills/vigilancia/examples/addenda-idle-sintetica.md
skills/vigilancia/examples/addenda-multi-carril-lock.md
skills/vigilancia/examples/addenda-sintetica.md
skills/vigilancia/reference/ADDENDA-DOS-CARAS.md
skills/vigilancia/reference/ESTACION.md
skills/vigilancia/scripts/probar-identidad-raiz.mjs
skills/vigilancia/scripts/probar-salida-dual.mjs
skills/vigilancia/scripts/verificar-dedup-contratos.mjs
skills/vigilancia/scripts/verificar-identidad-raiz.mjs
skills/vigilancia/scripts/verificar-salida-dual.mjs
skills/vigilancia/scripts/watcher.sh
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
- [x] Eje III evidenciado: ambos contratos canónicos tienen una definición.
- [x] Ceguera de árbol e historial reachable: `0`.
- [x] Propiedad positiva y falsos negativos automatizados: 9 probes de
  identidad y 12 de salida dual.
- [x] Casos bloqueados sin efectos: árbol y Git sin cambios, `OUT_DIR`
  ausente.
- [x] Dependencia cargada = directa: solo built-ins de Node; ninguna
  dependencia nueva.
- [x] Gate local determinista separado de C8 online: C8 no aplica a este WP.
- [x] Gates ejecutados de verdad: salidas literales arriba.
- [x] Commits convencionales en castellano: `274d39e`, `c2b0ffd`.
- [x] Sin BACKLOG, swarm-orquestacion, remotas, merge ni release.

## Hallazgos fuera de alcance

Ninguno.

## Dudas / bloqueos

- Contrarrevisión read-only por persona/agente distinto:
  `⏳ pendiente del orquestador`; no se lanzó subagente por instrucción
  explícita.
- Sin bloqueos de implementación ni gates locales.

---

## Revisión del orquestador

_(la rellena el orquestador: aceptado ✅ / devuelto con lista numerada)_
