# WP-L-H06 · linter-backlog — reporte

| dato | valor |
| ---- | ----- |
| agente | worker L-H06 |
| fecha | 2026-08-01 |
| rama | `wp/lh06-linter-backlog` (base `main`) |
| commits | `d8d9705` (skill) + este reporte |
| eje(s) CA | I (consumidor real: la suite y el dogfood) · ceguera 13/14 (cara pública del skill) · hostil-omite (probar la ausencia) |
| riesgo de revisión | `independiente` — gate que **concede** |
| revisor distinto del worker | sí (contrarrevisión adversarial read-only) |
| estado propuesto | listo para revisión |

## Qué se hizo

Un linter que decide si un BACKLOG es **despachable**, con su contrato escrito,
sus fixtures en las dos caras y su suite. Habla el vocabulario del skill ya
publicado (WP · BRIEF · CA · ejes I–V + ceguera + hostil-omite · lane · P ·
deps); no inventa uno nuevo. Se añadió la regla 23 al `SKILL.md` y una sección
de gate al README del skill.

Decisión de diseño que conviene declarar antes de nada: el **formato
despachable es la tabla** con columna de ID. El formato de lista que parsea
`proyectar-backlog.mjs` no cabe en el contrato (no tiene sitio por fila para
`deps` ni `ejes`), así que un backlog en formato de lista **falla ruidoso** con
0 WPs en vez de aprobarse por no encontrar nada. Los dos parsers conviven sin
duplicar lógica: distinto propósito, distinto fichero.

## Dónde vive

| ruta (relativa a la raíz del repo) | qué es |
| ---------------------------------- | ------ |
| `skills/swarm-orquestacion/scripts/verificar-backlog.mjs` | el linter (Node ≥18, sin dependencias) |
| `skills/swarm-orquestacion/scripts/verificar-backlog.test.mjs` | suite de 43 casos (`node --test`) |
| `skills/swarm-orquestacion/reference/backlog-despachable.md` | contrato de los 7 campos + definición de CA ornamental + límites |
| `skills/swarm-orquestacion/examples/fixture-backlog/` | 16 fixtures + `casos.json` + README |
| `skills/swarm-orquestacion/SKILL.md` | regla 23 + 3 filas en Recursos |
| `skills/swarm-orquestacion/README.md` | sección «Gate · BACKLOG despachable» |

## La definición: qué hace ornamental a un CA

> Un CA es **verificable** cuando nombra las dos mitades de una comprobación:
> el **ancla** (el acto observable que decide) y el **objeto** (sobre qué
> recae). Es **ornamental** cuando falta cualquiera de las dos, o cuando el
> juicio de valor **domina** el enunciado.

- **Ancla**: comando, script, gate, probe, fixture, suite, `grep`, conteo,
  `exit`, checksum, veredicto (`falla`, `deniega`, `pasa`, `verde`), cantidad
  pura o comparador (`= 0`, `≥ 1`).
- **Objeto**: al menos una palabra de contenido que no sea ancla, ni valoración,
  ni palabra función. «El test pasa» tiene ancla y **no** tiene objeto.
- **Valoración**: *elegante, limpio, mejor, calidad, robusto, coherente, claro,
  sencillo, adecuado, correcto, se revisa, queda…*. No están prohibidas; está
  prohibido que **dominen** (ratio ≥ `--umbral-valoracion`, 0.5 por defecto).

Cómo se detecta: se tokeniza el CA (sin acentos, minúsculas), cada token se
clasifica en `valoracion` / `ancla` / `contenido` / palabra función, y se
aplican en orden cuatro reglas → cuatro motivos citables:

| motivo | dispara cuando |
| ------ | -------------- |
| `CA-ornamental/valoracion` | valoraciones / significativos ≥ umbral |
| `CA-ornamental/sin-ancla` | cero anclas |
| `CA-ornamental/sin-objeto` | anclas pero cero contenido |
| `CA-ornamental/sin-referente` | solo con `--ca-estricto`: sin código, ruta ni cantidad |

**Por qué no es una lista negra de palabras.** Una lista negra se esquiva con
un sinónimo y castiga CAs legítimos que mencionan calidad de paso. La regla
ancla+objeto ataca la **estructura**: para pasarla hay que decir qué se ejecuta
y sobre qué — exactamente lo que se pedía. El léxico de valoración solo decide
**con qué motivo** se cita el rechazo, y cubre el flanco del CA que sí nombra
algo pero solo para valorarlo («queda elegante en 3 sitios» cae por ratio pese
al número).

### Límites honestos — falsos negativos que deja (documentados y probados)

1. **Forma correcta, verdad no verificada.** «el probe inventado de la capa
   fantasma falla si falta el campo» **pasa**: el linter no ejecuta nada del
   mundo. Hay un test que fija este límite como límite, no como acierto.
2. **Comprobación real + adorno.** «queda elegante y el build de docs pasa con
   exit 0» **pasa**: contiene una comprobación. Exigir pureza retórica daría
   más falsos positivos que verdad. También hay test.
3. **Ancla con objeto vago.** «el gate del portal pasa» pasa. `--ca-estricto`
   sube el listón (exige backticks, ruta o cantidad) a coste de rechazar prosa
   legítima.
4. **Idioma.** El léxico de valoración es castellano; otro idioma esquiva la
   regla de ratio (aunque suele caer igual por falta de ancla). Sustituible con
   `--lexico --lexico-modo reemplazar`.
5. **Semántica de `deps`**: se comprueba que resuelvan y no ciclen, no que sean
   ciertas. Un WP puede **omitir** una dependencia real y pasar.
6. **Filas descartadas arrastran sus defectos**: una fila con ID duplicado, ID
   ilegible o de serie no declarada se rechaza por eso y sus demás campos ya no
   se analizan. El motivo citado es el que bloquea, no la lista completa.
7. **Calibración del consumidor**: `--series` demasiado permisiva declara como
   propia cualquier serie. El linter no puede saber qué series son del mundo;
   eso lo fija el BRIEF.

Falso **positivo** conocido: un CA que delega en otro documento sin citar la
comprobación («ceguera», «DS-5») cae por `sin-ancla`. Es deliberado: el arreglo
es escribir «ceguera árbol+historial = 0», que pasa.

## Fixtures: fallo esperado vs salida real

Serie sintética `FX-[A-Z]\d{2}`, lanes `ALFA`/`BETA`, cero datos de instancia.
Cada fixture cae por **su** motivo, con recuento exacto (`casos.json`), no por
un error genérico. Salida real de la corrida completa:

| fixture | motivo esperado | salida real |
| ------- | --------------- | ----------- |
| `backlog-valido.md` | despachable | `4 WP · 0 defecto(s)` · **exit 0** |
| `backlog-ca-ornamental.md` | valoracion ×3, sin-ancla, sin-objeto | `valoracion=3 · sin-ancla=1 · sin-objeto=1` · exit 1 |
| `backlog-ciclo-corto.md` | `dep-ciclo` A→B→A | `dep-ciclo=1` · exit 1 |
| `backlog-ciclo-largo.md` | `dep-ciclo` A→B→C→A | `dep-ciclo=1` · exit 1 |
| `backlog-campo-ausente.md` | `campo-ausente` ×3 | `campo-ausente=3` · exit 1 |
| `backlog-prioridad-invalida.md` | `prioridad-invalida` ×2 | `prioridad-invalida=2` · exit 1 |
| `backlog-serie-no-declarada.md` | `serie-no-declarada` ×2 | `serie-no-declarada=2` · exit 1 |
| `backlog-id-duplicado.md` | `id-duplicado` | `id-duplicado=1` · exit 1 |
| `backlog-dep-inexistente.md` | `dep-inexistente` | `dep-inexistente=1` · exit 1 |
| `backlog-fila-fuera-de-tabla.md` | `fila-fuera-de-tabla-wp` | `fila-fuera-de-tabla-wp=1` · exit 1 |
| `backlog-columna-ausente.md` | `columna-requerida-ausente` ×2 | `columna-requerida-ausente=2` · exit 1 |
| `backlog-sin-lane.md` | `columna-requerida-ausente` (lane) | `columna-requerida-ausente=1` · exit 1 |
| `backlog-vacio.md` | **ausencia**: `backlog-vacio` | `backlog-vacio=1` · **exit 3** |
| `backlog-sin-wps.md` | **ausencia**: `sin-wps` | `sin-wps=1` · **exit 3** |
| `backlog-tabla-sin-filas.md` | **ausencia**: `sin-wps` | `sin-wps=1` · **exit 3** |
| `backlog-lista-sin-tabla.md` | **ausencia**: `sin-wps` | `sin-wps=1` · **exit 3** |

Salida literal de los tres casos que sostienen el WP:

```
[verificar-backlog] …/backlog-ca-ornamental.md · 5 WP · 5 defecto(s)
  x FX-A01 · campo CA · CA-ornamental/valoracion · linea 9
      la valoracion domina el CA (2/2 = 1 >= 0.5): «queda», «elegante». Anclas de verificacion: (ninguna). CA citado: «queda elegante»
  x FX-A02 · campo CA · CA-ornamental/valoracion · linea 10
      la valoracion domina el CA (1/2 = 0.5 >= 0.5): «mejor». Anclas de verificacion: (ninguna). CA citado: «mejor estructurado»
  x FX-A03 · campo CA · CA-ornamental/valoracion · linea 11
      la valoracion domina el CA (2/2 = 1 >= 0.5): «revisa», «calidad». Anclas de verificacion: (ninguna). CA citado: «se revisa la calidad»
  x FX-A04 · campo CA · CA-ornamental/sin-ancla · linea 12
      el CA no nombra ninguna comprobacion observable (comando, gate, probe, fixture, conteo, exit, veredicto falla/deniega/pasa, cantidad o comparador). CA citado: «el modulo queda listo para su uso»
  x FX-A05 · campo CA · CA-ornamental/sin-objeto · linea 13
      el CA nombra la comprobacion (test, pasa) pero no su OBJETO: no dice sobre que recae. CA citado: «el test pasa»
[verificar-backlog] NO DESPACHABLE · CA-ornamental/valoracion=3 · CA-ornamental/sin-ancla=1 · CA-ornamental/sin-objeto=1
EXIT=1

[verificar-backlog] …/backlog-ciclo-largo.md · 4 WP · 1 defecto(s)
  x FX-A01 · campo deps · dep-ciclo · linea 7
      dependencia circular (3 WP): FX-A01 -> FX-A02 -> FX-A03 -> FX-A01
EXIT=1

[verificar-backlog] …/backlog-lista-sin-tabla.md · 0 WP · 1 defecto(s)
  x (backlog) · campo WP · sin-wps · linea 0
      0 WPs: el backlog no contiene NINGUNA tabla. 3 linea(s) de lista detectada(s). El formato despachable es una tabla con columna de WP (ver reference/backlog-despachable.md). Ruta equivocada, fichero truncado o formato ajeno: no se concede en verde.
EXIT=3
```

### Suite

```
node --test skills/swarm-orquestacion/scripts/verificar-backlog.test.mjs
# tests 43 · pass 43 · fail 0

node --test skills/swarm-orquestacion/scripts/*.test.mjs
# tests 62 · pass 62 · fail 0      (43 nuevas + 19 previas, todas verdes)
```

## Ataques probados (hostil-omite: lo que CALLA, no lo malformado)

Escritos como test, no como intención:

- **Vacío por vacío**: fichero de 0 bytes, fichero solo con espacios, tabla sin
  filas, backlog sin tablas, backlog en formato de lista → exit 3 en los cinco.
- **`deps` en blanco ≠ «sin dependencias»**: la celda vacía es `campo-ausente`;
  declarar `ninguna` pasa. La ausencia se declara o cae.
- **Todas las filas de serie ajena** → 0 WPs + exit 3 (no «verde con 0 WPs»).
- **WP colado en una tabla sin columna de WP** (quedaría fuera del lint) →
  `fila-fuera-de-tabla-wp`.
- **WP escondido en un bloque de código o en un comentario HTML** → no cuenta:
  lo que el lector no ve tampoco se despacha; y el diagnóstico dice cuántas
  líneas se ignoraron.
- **Fila de totales colada en la tabla de WPs** (sin ID) → `campo-ausente`, no
  omisión silenciosa.
- **Celda de WP ilegible** (`FX-A01/FX-A02`, guion largo unicode en el ID) →
  `id-no-interpretable` / `campo-ausente`, nunca se salta.
- **Adornar un CA valorativo con un número** («queda elegante en 3 sitios»,
  «queda elegante; exit 0») → sigue cayendo por ratio.

Los dos últimos vectores (fence/comentario y celda ilegible) se encontraron
**probando contra el propio linter** después de la primera versión verde, y se
cerraron con código + test.

## Parametrización (nada cableado a un mundo)

`--backlog`, `--series`, `--prioridades`, `--ejes`, `--patron-lane`,
`--sin-deps`, `--deps-externas`, `--umbral-valoracion`, `--min-palabras-brief`,
`--ca-estricto`, `--lexico` (+modo), `--alias` (+modo), `--json`; cada uno con
su env. Hay test de que el **mismo** backlog es no-despachable con el conjunto
por defecto y despachable con `prioridades=['urgente','normal']` y
`ejes=['forma','fondo']`, con columnas en castellano y lane por encabezado
`## Carril …`.

## Dogfood (consumidor real, eje I)

Se pasó el linter por los dos backlogs de este `plan/` (no se editó ninguno:
regla de oro 2). El de formato tabla parsea **73 WPs** — coincide con el total
que su propia tabla de conteos declara, corroboración independiente del parser
— y sale `exit 1` con 192 defectos:
`columna-requerida-ausente=146` (73 × 2: la tabla no declara columnas `deps` ni
`ejes`), `CA-ornamental/sin-ancla=26`, `campo-ausente=17`,
`CA-ornamental/sin-objeto=2`, `brief-insuficiente=1`. El de formato lista sale
`exit 3` con `sin-wps` y 124 líneas de lista detectadas.

Es el resultado esperado del contrato, no un fallo del linter: hoy ese formato
declara 4 de los 7 campos. Encaja como candidato de método (ver hallazgos).

## Prueba de ceguera (patrón + salida)

Patrón de **rutas de máquina y nombres de raíz**, ensamblado por fragmentos
para que el propio reporte no se auto-detecte (mismo truco que
`comprobar-ceguera.sh`):

```bash
Q1="S_"; Q1+="LAB"; Q2="skills-"; Q2+="library"; Q3="wt/"; Q3+="l-h"
Q4="\b[A-Za-z]"; Q4+=":[\\/]"          # letra de unidad + separador
Q5="/ho"; Q5+="me/|/Us"; Q5+="ers/"    # raices de usuario POSIX
PAT="${Q1}|${Q2}|${Q3}|${Q4}|${Q5}"
```

(los fragmentos van partidos a propósito: así el propio reporte da 0 hits
contra su propio patrón, y la medida sigue siendo reproducible)

```
# ficheros nuevos de este WP (linter, suite, referencia, fixtures)
grep -REn "$PAT" <ficheros del WP> | grep -c .      → 0
# historial alcanzable de la rama (regla 14)
git log -p main..HEAD | grep -Ec "$PAT"             → 0   (exit 1 = sin match)
git log -p main..HEAD | grep -E '^\+' | grep -Ec "$PAT" → 0
```

Tokens de marco (patrón del propio skill, 6 fragmentos):

```
bash skills/swarm-orquestacion/scripts/comprobar-ceguera.sh   → ceguera: 0   (exit 0)
git log -p main..HEAD -- skills/swarm-orquestacion | grep -Eic "$PATM" → 0 (exit 1)
control POSITIVO del mismo patrón sobre una línea sembrada           → 1
```

Medida canónica por exit de `grep -c`/`grep -Ec`; ningún `grep | head && echo OK`.

## Lo que NO hice

- **No edité ningún BACKLOG** (ni el de este plan): el linter señala, el
  orquestador escribe (regla de oro 2). El dogfood es lectura.
- **No añadí el gate a CI ni a `package.json`**: no hay `scripts.test` en este
  repo y meter uno cambia el contrato de release; queda como propuesta.
- **No toqué `docs/`**: el portal no enumera scripts por skill, así que no hay
  página que quede obsoleta; y así no arrastro el gate `docs:build` a este WP.
- **No soporté el formato de lista** como despachable (decisión declarada
  arriba) ni implementé auto-fix, ni salida SARIF/JUnit.
- **No verifiqué la existencia real** de los probes/comandos que citan los CA:
  el linter valida forma, no verdad (límite 1).
- **No hay exención por estado** (`✅`): se lintean todas las filas. Una marca
  que exima sería la primera puerta de un backlog basura.

## Hallazgos fuera de alcance (candidatos a WP; NO se arreglaron aquí)

1. **Fuga de rutas de máquina en la cara pública del skill**: el patrón de
   arriba da **3 hits pre-existentes** en
   `skills/swarm-orquestacion/reference/lecciones-vnext.md` (líneas 26, 41, 42:
   ejemplos de rutas de taller con letra de unidad y nombre de raíz). No los
   detecta `comprobar-ceguera.sh` porque su patrón solo cubre tokens de marco,
   no rutas de máquina. Candidato: ampliar el patrón del script de ceguera y
   de-identificar esos ejemplos. **No entra en este diff** (ALCANCE_DIFF).
2. **Formato del BACKLOG de este mundo**: para ser despachable necesitaría
   columnas `deps` y `ejes` (146 de sus 192 defectos son exactamente eso), y 28
   de sus CAs no citan comprobación. Decisión del custodio/orquestador, no del
   worker.
3. **Gate en CI**: correr el linter sobre el BACKLOG antes de abrir ola.

## Auto-revisión (PRACTICAS — con honestidad)

- [x] Diff solo dentro de `ALCANCE_DIFF`: `skills/swarm-orquestacion/` +
      `plan/REPORTES/`. Nada más tocado.
- [x] Cero árboles/ficheros copiados de otros mundos: fixtures **sintéticas**
      (serie `FX-…`, lanes ALFA/BETA), inventadas para este WP.
- [x] Sellos con fuente; rutas citadas existentes: todas las rutas del reporte
      existen en el árbol de la rama.
- [x] Sin fluff ni promesa de futuro: lo no hecho está en «Lo que NO hice»; los
      falsos negativos, en «Límites honestos» y con test.
- [x] Eje(s) evidenciado(s): I (suite + dogfood), ceguera 13/14 (árbol +
      historial con control positivo), hostil-omite (8 vectores de ausencia).
- [x] Gates ejecutados de verdad: 43/43 y 62/62 en verde, salida pegada.
- [x] Commits convencionales en castellano, un repo por commit.
- [x] Riesgo y contraevidencia cubiertos: sección «Ataques probados»; dos
      agujeros hallados por auto-ataque y cerrados con código + test.
- [x] Pruebas automatizadas separadas de evidencia manual: todo lo de arriba es
      automatizado salvo el dogfood y los greps de ceguera, que son corridas
      manuales con salida literal.

## Evidencia de riesgo y contrarrevisión

- `CASOS_ADVERSARIALES`: `[automatizado]` los 16 casos de `casos.json` con
  recuento exacto por motivo · `[automatizado]` 8 vectores de ausencia ·
  `[automatizado]` 3 intentos de adornar un CA valorativo · `[automatizado]` 2
  límites honestos fijados como límites · `[manual]` dogfood sobre dos backlogs
  reales del plan (lectura).
- `DEPENDENCIAS_DIRECTAS_VERIFICADAS`: ninguna. Solo built-ins de Node
  (`node:fs`, `node:url`, `node:test`, `node:child_process`, `node:path`,
  `node:os`).
- `INSTALACION_LIMPIA`: no aplica (sin dependencias nuevas; el script corre con
  el Node del repo, ≥22 declarado en `engines`).
- `TEST_AUTOMATIZADO_VS_EVIDENCIA_MANUAL`:
  - Automatizado: `node --test …/verificar-backlog.test.mjs` (43) y la suite
    completa de `scripts/` (60).
  - Manual: corridas del CLI fixture por fixture, dogfood y greps de ceguera.
- `VEREDICTO_REVISOR`: ⏳ pendiente de revisor distinto (gate que concede).

## Dudas / bloqueos

- El umbral de valoración (0.5) es un juicio calibrado contra las fixtures y el
  BACKLOG de este plan; si la contrarrevisión trae un corpus con más CAs de
  prosa larga, el umbral es lo primero que habría que recalibrar (es un
  parámetro, no una constante).
- Si el custodio quiere que el formato de lista también sea despachable, hace
  falta decidir dónde viven `deps` y `ejes` por WP en ese formato — es un
  cambio de contrato, no del linter.

---

## Revisión del orquestador

_(la rellena el orquestador: aceptado ✅ / devuelto con lista numerada)_
