# WP-L-H06 · linter-backlog — reporte

| dato | valor |
| ---- | ----- |
| agente | worker L-H06 |
| fecha | 2026-08-01 |
| rama | `wp/lh06-linter-backlog` (base `main`) |
| commits | `d8d9705` (skill) · `0eaf98c`+`a5027d4` (reporte) · `b1a36e8` (corrección de la devolución) |
| eje(s) CA | I (consumidor real: la suite y el dogfood) · ceguera 13/14 (cara pública del skill) · hostil-omite (probar la ausencia) |
| riesgo de revisión | `independiente` — gate que **concede** |
| revisor distinto del worker | sí (contrarrevisión adversarial read-only) |
| estado propuesto | corregido tras devolución · listo para nueva contrarrevisión |

## Qué se hizo

Un linter que decide si un BACKLOG es **despachable**, con su contrato escrito,
sus fixtures en las cuatro caras del veredicto y su suite. Habla el vocabulario del skill ya
publicado (WP · BRIEF · CA · ejes I–V + ceguera + hostil-omite · lane · P ·
deps); no inventa uno nuevo. Se añadió la regla 23 al `SKILL.md` y una sección
de gate al README del skill. Tras la devolución, el gate **bloquea lo decidible
y avisa de lo opinable** (ver «Corrección de la devolución» al final).

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
| `skills/swarm-orquestacion/scripts/verificar-backlog.test.mjs` | suite de 67 casos (`node --test`) |
| `skills/swarm-orquestacion/reference/backlog-despachable.md` | contrato de los 7 campos + definición de CA ornamental + límites |
| `skills/swarm-orquestacion/examples/fixture-backlog/` | 21 fixtures en cuatro caras + `casos.json` + README |
| `skills/swarm-orquestacion/SKILL.md` | regla 23 + 3 filas en Recursos |
| `skills/swarm-orquestacion/README.md` | sección «Gate · BACKLOG despachable» |

## Qué bloquea y qué avisa (política v2, decisión del custodio)

> **Bloquea lo decidible; avisa de lo opinable.**

| decide el exit | motivos |
| -------------- | ------- |
| **sí — bloquea** | `campo-ausente` · `columna-requerida-ausente` · `prioridad-invalida` · `eje-desconocido` · `ejes-contradictorios` · `deps-contradictorias` · `lane-desconocida` · `serie-no-declarada` · `id-duplicado` · `id-no-interpretable` · `fila-fuera-de-tabla-wp` · `dep-inexistente` · `dep-ciclo` · `brief-insuficiente` · `ca-insuficiente` · `backlog-vacio` · `sin-wps` |
| **no — avisa** | `CA-ornamental/valoracion` · `CA-ornamental/sin-ancla` · `CA-ornamental/sin-objeto` · `CA-ornamental/sin-referente` |

Razón escrita en el contrato (`reference/backlog-despachable.md` §2): la calidad
de un CA es **juicio**, y un gate no puede arrogárselo sin producir falsos
rechazos que lo maten — un gate que rechaza CAs correctos acaba **desactivado**,
y entonces no protege de nada. El aviso se emite igual, con motivo, cita literal
y recuento: en el dogfood son 35 avisos que valen como cola de mejora.

El **suelo** sí bloquea porque no juzga calidad: cuenta palabras significativas
**distintas** (`zzz zzz zzz` es una palabra repetida, no tres). Objetivo,
declarado y parametrizable (`--min-palabras-brief` 3, `--min-palabras-ca` 2).

## La definición: qué hace ornamental a un CA (aviso)

> Un CA es **verificable** cuando nombra las dos mitades de una comprobación:
> el **ancla** (el acto observable que decide) y el **objeto** (sobre qué
> recae). Es **ornamental** cuando falta cualquiera de las dos, o cuando el
> juicio de valor **domina** el enunciado.

- **Ancla**: comando, script, gate, probe, fixture, suite, `grep`, conteo,
  `exit`, checksum, veredicto (`falla`, `deniega`, `pasa`, `verde`), **negación
  universal** comprobable («ninguna referencia queda en el árbol») o comparador
  (`= 0`, `≥ 1`). Se reconoce por forma exacta **y por lema** (`ejecu-`,
  `verific-`, `grep-`, `fall-`, `deneg-`…): «ejecuciones» y «grepables» anclan
  tanto como «ejecuta» y «grep».
- **Objeto**: al menos una palabra de contenido que no sea ancla, ni valoración,
  ni palabra función. «El test pasa» tiene ancla y **no** tiene objeto.
- **Valoración**: *elegante, limpio, mejor, calidad, robusto, coherente, claro,
  sencillo, adecuado, correcto, se revisa, queda…*. No están prohibidas; está
  prohibido que **dominen** (ratio ≥ `--umbral-valoracion`, 0.5 por defecto).

| motivo | dispara cuando |
| ------ | -------------- |
| `CA-ornamental/valoracion` | valoraciones / significativos ≥ umbral |
| `CA-ornamental/sin-ancla` | cero anclas |
| `CA-ornamental/sin-objeto` | anclas pero cero contenido |
| `CA-ornamental/sin-referente` | solo con `--ca-estricto`: sin código, ruta ni cantidad |

**Las dos asimetrías, cerradas** (aunque el motivo ya no bloquee):

1. **Un dígito no ancla nada.** Una cantidad suelta solo cuenta como ancla con
   comparador (`= 0`), con unidad de medida (`0 hits`, `1 definicion`) o pegada
   a otra ancla (`exit 0`). Antes, «…en 2 sitios» convertía cualquier frase en
   verificable.
2. **Concatenar no diluye.** El CA se analiza además **por segmentos** (`·`,
   `;`, `<br>`, salto de línea): «queda elegante · el probe deniega el mensaje
   sin firma» se cita por su segmento en vez de esconderse en el ratio. Los
   fragmentos de medida (`exit 0`) no se juzgan sueltos.

**Por qué no es una lista negra de palabras.** Una lista negra se esquiva con un
sinónimo y castiga CAs legítimos que mencionan calidad de paso. La regla
ancla+objeto ataca la **estructura**. Aun así **sigue siendo un léxico**, con
las dos caras del error — y por eso avisa en vez de bloquear.

### Límites honestos — falsos negativos y positivos (documentados y probados)

1. **Forma correcta, verdad no verificada.** «el probe inventado de la capa
   fantasma falla si falta el campo» **pasa**: el linter no ejecuta nada del
   mundo. Hay un test que fija este límite como límite, no como acierto.
2. **Comprobación real + adorno.** «queda elegante y el build de docs pasa con
   exit 0» **pasa**: contiene una comprobación. También hay test.
3. **Ancla con objeto vago.** «el gate del portal pasa» pasa. `--ca-estricto`
   sube el listón a coste de rechazar prosa legítima.
4. **Idioma.** El léxico es castellano; un CA en inglés avisa por falta de
   ancla. Sustituible con `--lexico --lexico-modo reemplazar` (hay test que lo
   demuestra con anclas inglesas).
5. **CA telegráfico (falso positivo declarado).** Cerrar la asimetría del dígito
   tiene precio: «ceguera 0» o «DS-5 · ceguera» avisan por `sin-ancla`. Se
   corrige escribiendo la medida, y mientras tanto **no bloquea**.
6. **Semántica de `deps`**: se comprueba que resuelvan, que no se contradigan y
   que no ciclen, no que sean ciertas. Un WP puede **omitir** una dependencia
   real y pasar.
7. **Filas descartadas arrastran sus defectos**: ID duplicado, ilegible o de
   serie no declarada se rechaza por eso y sus demás campos ya no se analizan.
8. **Calibración del consumidor**: `--series` demasiado permisiva declara como
   propia cualquier serie; los conjuntos los fija el BRIEF.

Medida del rechazo indebido, con los 12 CAs legítimos que citó la
contrarrevisión: **pasan 9** (antes 4). Los 3 restantes —uno en inglés y dos
telegráficos— solo **avisan**, y su corrección está escrita.

## Fixtures: veredicto esperado vs salida real

Serie sintética `FX-[A-Z]\d{2}`, lanes `ALFA`/`BETA`, cero datos de instancia.
21 fixtures en **cuatro caras**: 2 válidas (exit 0), 1 de avisos (exit 0 con CA
ornamental citado), 12 inválidas (exit 1) y 6 de ausencia (exit 3). Cada una cae
por **su** motivo, con recuento exacto de defectos **y** de avisos
(`casos.json`), no por un error genérico.

| fixture | cara | veredicto esperado | salida real |
| ------- | ---- | ------------------ | ----------- |
| `backlog-valido.md` | válida | despachable | `4 WP · 0 defecto(s) · 0 aviso(s)` · **exit 0** |
| `backlog-dep-enlace.md` | válida | dep en enlace resuelve | `3 WP · 0 defecto(s) · 0 aviso(s)` · **exit 0** |
| `backlog-ca-ornamental.md` | aviso | 5 avisos, 0 bloqueos | `valoracion=3 · sin-ancla=1 · sin-objeto=1` · **exit 0** |
| `backlog-ciclo-corto.md` | inválida | `dep-ciclo` A→B→A | `dep-ciclo=1` · exit 1 |
| `backlog-ciclo-largo.md` | inválida | `dep-ciclo` A→B→C→A | `dep-ciclo=1` · exit 1 |
| `backlog-campo-ausente.md` | inválida | `campo-ausente` ×3 | `campo-ausente=3` · exit 1 |
| `backlog-prioridad-invalida.md` | inválida | `prioridad-invalida` ×2 | `prioridad-invalida=2` · exit 1 |
| `backlog-suelo-minimo.md` | inválida | suelo de BRIEF y de CA | `brief-insuficiente=1 · ca-insuficiente=1` · exit 1 |
| `backlog-contradicciones.md` | inválida | contradicciones declaradas | `deps-contradictorias=1 · ejes-contradictorios=1` · exit 1 |
| `backlog-serie-no-declarada.md` | inválida | `serie-no-declarada` ×2 | `serie-no-declarada=2` · exit 1 |
| `backlog-id-duplicado.md` | inválida | `id-duplicado` | `id-duplicado=1` · exit 1 |
| `backlog-dep-inexistente.md` | inválida | `dep-inexistente` | `dep-inexistente=1` · exit 1 |
| `backlog-fila-fuera-de-tabla.md` | inválida | `fila-fuera-de-tabla-wp` | `fila-fuera-de-tabla-wp=1` · exit 1 |
| `backlog-columna-ausente.md` | inválida | `columna-requerida-ausente` ×2 | `columna-requerida-ausente=2` · exit 1 |
| `backlog-sin-lane.md` | inválida | `columna-requerida-ausente` (lane) | `columna-requerida-ausente=1` · exit 1 |
| `backlog-vacio.md` | ausencia | `backlog-vacio` | `backlog-vacio=1` · **exit 3** |
| `backlog-sin-wps.md` | ausencia | `sin-wps` | `sin-wps=1` · **exit 3** |
| `backlog-tabla-sin-filas.md` | ausencia | `sin-wps` | `sin-wps=1` · **exit 3** |
| `backlog-lista-sin-tabla.md` | ausencia | `sin-wps` | `sin-wps=1` · **exit 3** |
| `backlog-tabla-indentada.md` | ausencia | `sin-wps` (indentado) | `sin-wps=1 · indentado=4` · **exit 3** |
| `backlog-tabla-en-cita.md` | ausencia | `sin-wps` (cita) | `sin-wps=1 · cita=3` · **exit 3** |

Salida literal de los casos que sostienen el WP:

```
[verificar-backlog] …/backlog-ca-ornamental.md · 5 WP · 0 defecto(s) · 5 aviso(s)
  ! FX-A01 · campo CA · CA-ornamental/valoracion · linea 9 (AVISO, no bloquea)
      la valoracion domina (2/2 = 1 >= 0.5): «queda», «elegante». Anclas de verificacion: (ninguna). CA citado: «queda elegante»
  ! FX-A03 · campo CA · CA-ornamental/valoracion · linea 11 (AVISO, no bloquea)
      la valoracion domina (2/2 = 1 >= 0.5): «revisa», «calidad». Anclas de verificacion: (ninguna). CA citado: «se revisa la calidad»
  ! FX-A05 · campo CA · CA-ornamental/sin-objeto · linea 13 (AVISO, no bloquea)
      nombra la comprobacion (test, pasa) pero no su OBJETO: no dice sobre que recae. CA citado: «el test pasa»
[verificar-backlog] DESPACHABLE: los 7 campos declarados, conjuntos respetados, deps sin ciclos, suelos cumplidos.
[verificar-backlog] avisos (no bloquean) · CA-ornamental/valoracion=3 · CA-ornamental/sin-ancla=1 · CA-ornamental/sin-objeto=1
EXIT=0

[verificar-backlog] …/backlog-ciclo-largo.md · 4 WP · 1 defecto(s) · 0 aviso(s)
  x FX-A01 · campo deps · dep-ciclo · linea 7
      dependencia circular (3 WP): FX-A01 -> FX-A02 -> FX-A03 -> FX-A01
EXIT=1

[verificar-backlog] …/backlog-tabla-indentada.md · 0 WP · 1 defecto(s) · 0 aviso(s)
  x (backlog) · campo WP · sin-wps · linea 0
      0 WPs: el backlog no contiene NINGUNA tabla legible. 0 linea(s) de lista detectada(s). … Ademas se ignoraron 4 linea(s) NO legibles como tabla (indentado=4): lo que el lector no ve como tabla del backlog tampoco se despacha.
EXIT=3

[verificar-backlog] …/backlog-suelo-minimo.md · 2 WP · 2 defecto(s) · 0 aviso(s)
  x FX-A01 · campo BRIEF · brief-insuficiente · linea 12
      el BRIEF tiene 1 palabra(s) significativa(s) DISTINTA(S) [zzz], minimo 3: «zzz zzz zzz»
  x FX-A01 · campo CA · ca-insuficiente · linea 12
      el CA tiene 1 palabra(s) significativa(s) DISTINTA(S) [ok], minimo 2: «ok ok». Suelo objetivo, no juicio de calidad.
EXIT=1
```

### Suite

```
node --test skills/swarm-orquestacion/scripts/verificar-backlog.test.mjs
# tests 67 · pass 67 · fail 0

node --test skills/swarm-orquestacion/scripts/*.test.mjs
# tests 86 · pass 86 · fail 0      (67 nuevas + 19 previas, todas verdes)
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
- **WP escondido donde el lector no lo ve como tabla**: fence, comentario HTML,
  **bloque indentado** (4 espacios) y **cita** (`>`) → exit 3 en las cuatro
  envolturas, con la causa contada en el mensaje (`fence=`, `comentario=`,
  `indentado=`, `cita=`). Hay un test que recorre las cuatro con el **mismo**
  contenido y exige el mismo veredicto.
- **Fila de totales colada en la tabla de WPs** (sin ID) → `campo-ausente`, no
  omisión silenciosa.
- **Celda de WP ilegible** (`FX-A01/FX-A02`, guion largo unicode en el ID) →
  `id-no-interpretable` / `campo-ausente`, nunca se salta.
- **Celdas llenas que no dicen nada** (`zzz zzz zzz`, `ok ok`) →
  `brief-insuficiente` / `ca-insuficiente`: el suelo cuenta palabras
  **distintas**.
- **Contradicción declarada** (`ninguna, FX-A01`; `ninguno, I`) →
  `deps-contradictorias` / `ejes-contradictorios`: el linter no elige mitad.
- **Adornar un CA valorativo con un número** («queda elegante en 3 sitios»,
  «queda elegante; exit 0») → sigue avisando por ratio; y **un dígito ya no
  ancla**: «el modulo queda listo … en 2 sitios» avisa por `sin-ancla`.
- **Concatenar un CA malo con uno bueno** → se cita el **segmento** malo.
- **Argumentos que apuntan a otro sitio**: flag desconocida (`--backlgo`),
  posicional suelto, flag sin valor, número no numérico, regex rota → **exit 2**
  siempre; nunca un veredicto sobre `plan/BACKLOG.md` por defecto.

Los vectores de fence/comentario y celda ilegible salieron de auto-atacarme;
los de bloque indentado, cita, argv, config numérica y suelo los trajo la
**contrarrevisión** y se cerraron en la corrección (ver última sección).

## Parametrización (nada cableado a un mundo)

`--backlog`, `--series`, `--prioridades`, `--ejes`, `--ejes-ninguno`,
`--lanes`, `--patron-lane`, `--sin-deps`, `--deps-externas`,
`--umbral-valoracion`, `--min-palabras-brief`, `--min-palabras-ca`,
`--ca-estricto`, `--lexico` (+modo), `--alias` (+modo), `--json`; cada uno con
su env, y todos admiten `--flag=valor`. Hay test de que el **mismo** backlog es
no-despachable con el conjunto por defecto y despachable con
`prioridades=['urgente','normal']` y `ejes=['forma','fondo']`, con columnas en
castellano y lane por encabezado `## Carril …`; de que `--lanes` valida el
carril solo cuando el mundo lo declara; y de que un léxico con anclas inglesas
hace pasar un CA en inglés.

## Dogfood (consumidor real, eje I)

Se pasó el linter por los dos backlogs de este `plan/` (no se editó ninguno:
regla de oro 2). **Comandos literales** — sin la serie del mundo el resultado es
otro (`exit 3 · 0 WPs`), así que la calibración es parte de la evidencia:

```bash
node skills/swarm-orquestacion/scripts/verificar-backlog.mjs \
  --backlog plan/BACKLOG-F2.md --series 'L-[A-Z][0-9]{2}'
# exit 1 · 73 WP · 167 defecto(s) · 35 aviso(s)
#   columna-requerida-ausente=146 · campo-ausente=17 · ca-insuficiente=3 · brief-insuficiente=1
#   avisos: CA-ornamental/sin-ancla=34 · CA-ornamental/sin-objeto=1

node skills/swarm-orquestacion/scripts/verificar-backlog.mjs \
  --backlog plan/BACKLOG.md --series 'WP-[0-9]+'
# exit 3 · sin-wps · 124 lineas de lista · 119 lineas veladas (indentado=99, cita=20)
```

El de formato tabla parsea **73 WPs** — coincide con el total que su propia
tabla de conteos declara, corroboración independiente del parser. Los 146
`columna-requerida-ausente` son 73 × 2: la tabla no declara columnas `deps` ni
`ejes`. Los 35 avisos de CA no bloquean nada: son la cola de mejora que el
orquestador decide si atiende.

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

1. **El patrón de ceguera cubre menos de lo que cree.** `comprobar-ceguera.sh`
   valida 6 fragmentos y da `ceguera: 0`, pero deja fuera al menos dos clases
   de fuga **pre-existentes** en la cara pública del skill: (a) rutas de
   máquina —3 hits en `reference/lecciones-vnext.md` líneas 26, 41 y 42, con
   letra de unidad y nombre de raíz— y (b) tokens de marco que su propio patrón
   no enumera —`reference/reglas-metodo-v04.md` líneas 20 y 22 nombran carpetas
   de herramienta/IDE del marco—. Ninguna la introduce este WP. Candidato:
   ampliar el patrón y de-identificar los ejemplos. **No entra en este diff**
   (ALCANCE_DIFF).
2. **Formato del BACKLOG de este mundo**: para ser despachable necesitaría
   columnas `deps` y `ejes` (146 de sus 167 defectos bloqueantes son
   exactamente eso), y 35 de sus CAs entran en la cola de avisos. Decisión del
   custodio/orquestador, no del worker.
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
      historial con control positivo), hostil-omite (13 vectores de ausencia y
      de argumentos).
- [x] Gates ejecutados de verdad: 67/67 y 86/86 en verde, salida pegada.
- [x] Commits convencionales en castellano, un repo por commit.
- [x] Riesgo y contraevidencia cubiertos: sección «Ataques probados»; dos
      agujeros por auto-ataque y seis vías de la contrarrevisión, todos
      cerrados con código + caso rojo permanente.
- [x] Pruebas automatizadas separadas de evidencia manual: todo lo de arriba es
      automatizado salvo el dogfood y los greps de ceguera, que son corridas
      manuales con salida literal.

## Evidencia de riesgo y contrarrevisión

- `CASOS_ADVERSARIALES`: `[automatizado]` los 21 casos de `casos.json` con
  recuento exacto de defectos **y** de avisos · `[automatizado]` 13 vectores de
  ausencia y de argumentos (las 6 vías de exit 0 de la contrarrevisión, cada una
  con su caso rojo `[B1]`…`[B4]`, `[M1]`…`[M5]`) · `[automatizado]` 3 intentos
  de adornar un CA valorativo y 2 de diluirlo concatenando · `[automatizado]` 4
  límites honestos fijados como límites · `[manual]` dogfood sobre dos backlogs
  reales del plan (lectura).
- `DEPENDENCIAS_DIRECTAS_VERIFICADAS`: ninguna. Solo built-ins de Node
  (`node:fs`, `node:url`, `node:test`, `node:child_process`, `node:path`,
  `node:os`).
- `INSTALACION_LIMPIA`: no aplica (sin dependencias nuevas; el script corre con
  el Node del repo, ≥22 declarado en `engines`).
- `TEST_AUTOMATIZADO_VS_EVIDENCIA_MANUAL`:
  - Automatizado: `node --test …/verificar-backlog.test.mjs` (67) y la suite
    completa de `scripts/` (86).
  - Manual: corridas del CLI fixture por fixture, dogfood y greps de ceguera.
- `VEREDICTO_REVISOR`: **DEVUELTO** en la primera contrarrevisión (6 vías de
  exit 0 + 8/12 CAs legítimos rechazados) → corregido en `b1a36e8`; ⏳ pendiente
  de la nueva contrarrevisión.

## Dudas / bloqueos

- El umbral de valoración (0.5) y los suelos (3 y 2 palabras distintas) son
  calibraciones contra las fixtures y el BACKLOG de este plan. Al no bloquear el
  umbral, un error de calibración ya solo produce ruido de aviso; los suelos sí
  bloquean, y por eso son deliberadamente bajos: cortan lo degenerado, no lo
  telegráfico.
- Si el custodio quiere que el formato de lista también sea despachable, hace
  falta decidir dónde viven `deps` y `ejes` por WP en ese formato — es un
  cambio de contrato, no del linter.

## Corrección de la devolución

Devolución tras contrarrevisión: seis vías de `exit 0` con basura y 8 de 12 CAs
legítimos rechazados. Commit de corrección: `b1a36e8` (misma rama, sin
reescribir historia). Cada punto lleva su **caso rojo permanente** en la suite.

### La decisión que cambia el diseño (del custodio)

`CA-ornamental` **deja de bloquear** y pasa a **aviso citado**. Razón escrita en
`reference/backlog-despachable.md` §2 y en la cabecera del script: la calidad de
un CA es juicio, y un gate no puede arrogárselo sin producir falsos rechazos que
lo maten — un gate que rechaza CAs correctos acaba desactivado, y entonces no
protege de nada. El exit lo deciden ahora solo motivos decidibles. Con eso, los
defectos 5, 6 y 7 del informe dejan de ser bloqueantes; **las dos asimetrías se
arreglaron igual** en el aviso.

### Bloqueantes

| # | defecto | cierre | caso rojo |
| - | ------- | ------ | --------- |
| **B1** | tabla indentada 4 espacios → exit 0 | `velarNoVisible` vela también **bloque indentado** y **cita**, contando la causa; `esFilaTabla` sigue igual porque la línea ya llega velada | `[B1]` ×2: la fixture `backlog-tabla-indentada.md` y un test que pasa el **mismo** contenido por las cuatro envolturas (fence, comentario, indentado, cita) y exige exit 3 y la causa nombrada |
| **B2** | `--umbral-valoracion perro` → `NaN` → regla desactivada en silencio | `numeroValido()`: no finito, no entero o fuera de rango → `ErrorUso` → **exit 2**. Igual para los dos suelos | `[B2]` ×2: 7 invocaciones (NaN, `0`, `1.5`, umbral `7`) |
| **B3** | `--backlog=RUTA` y `--backlgo RUTA` caían al defecto y linteaban otro fichero | `parsearArgv()` estricto: whitelist de flags, **soporte real de `--flag=valor`**, rechazo de posicionales, de valor ausente y de booleana con valor; sugiere la flag parecida | `[B3]` ×4, incluido `assert.doesNotMatch(salida, /DESPACHABLE/)` |
| **B4** | no había suelo: BRIEF/CA degenerados pasaban | `brief-insuficiente` y `ca-insuficiente` cuentan **palabras significativas distintas** (`significativosDistintos`), 3 y 2 por defecto, parametrizables | `[B4]` ×3 + fixture `backlog-suelo-minimo.md` |

### Menores

| # | defecto | cierre | caso rojo |
| - | ------- | ------ | --------- |
| **M1** | regex inválida → excepción → exit 1 | `regexValida()` dentro de `configurar` (valida cruda y envuelta) → exit 2 | `[M1]`: `--series`, `--patron-lane`, `--deps-externas` |
| **M2** | dep en enlace markdown → falso `dep-inexistente` | `limpiarCelda` resuelve `[texto](url)` → texto | `[M2]` + fixture verde `backlog-dep-enlace.md` |
| **M3** | `ninguna, FX-A01` aceptado en silencio | `deps-contradictorias` (bloqueante) | `[M3]` + fixture `backlog-contradicciones.md` |
| **M4** | `ninguno` junto a ejes; `lane` sin conjunto | `ejes-contradictorios` (bloqueante) y `--lanes` opcional → `lane-desconocida` | `[M4]` ×2 |
| **M5** | mensaje mentía en la tabla citada | el diagnóstico dice «NINGUNA tabla **legible**» y enumera causas con conteo | `[M5]` |

### Las dos asimetrías del aviso

1. **Un dígito ya no ancla.** Una cantidad solo cuenta como ancla con
   comparador, con unidad de medida o pegada a otra ancla. Antes:
   `el modulo queda listo … en 2 sitios` pasaba; ahora avisa por `sin-ancla`.
2. **Concatenar ya no diluye.** El CA se analiza por segmentos (`·`, `;`,
   `<br>`, salto de línea) además de en conjunto; los fragmentos de medida
   (`exit 0`) no se juzgan sueltos. `queda elegante · el probe deniega …` se
   cita por su segmento.

### Falsos rechazos: de 4/12 a 9/12

Anclas por **lema** (`ejecu-`, `verific-`, `grep-`, `fall-`, `deneg-`,
`compara-`…) y **negación universal** (`ningún/ninguna`, `nadie`, `nunca`) como
ancla comprobable. De los 12 CAs legítimos citados por la contrarrevisión pasan
**9**; los 3 restantes solo **avisan**:

| CA | antes | ahora |
| -- | ----- | ----- |
| `ningun usuario sin rol puede abrir la sala` | rechazado | **pasa** |
| `la migracion es idempotente: dos ejecuciones dejan la tabla igual` | rechazado | **pasa** |
| `no queda ninguna referencia al simbolo antiguo en el arbol` (doctrina de ceguera) | rechazado | **pasa** |
| `frases-contrato grepables` | rechazado | **pasa** |
| `dos builds comparan el manifiesto logico` | rechazado | **pasa** |
| `push default bloqueado y documentado` | rechazado | **pasa** |
| `no user without a role can open the room` (inglés) | rechazado | avisa · se corrige con `--lexico` (hay test) |
| `ceguera 0` · `DS-5 · ceguera` | pasaba por el dígito | avisa · precio declarado de cerrar la asimetría 1 |

### Contabilidad

1. **Línea 312 del reporte**: decía 60; el commit anterior arregló solo la otra
   aparición. Ahora ambas dicen los números reales de esta corrida: **67**
   propias y **86** con las previas.
2. **Dogfood reproducible**: el comando literal (con `--series 'L-[A-Z][0-9]{2}'`,
   sin la cual salen `exit 3 · 0 WPs`) está pegado en su sección, con los
   números de la política nueva: `exit 1 · 73 WP · 167 defectos · 35 avisos`.
3. **Prosa de las caras**: ya no dice «1 válida + 15 inválidas». Son **21
   fixtures en cuatro caras**: 2 válidas, 1 de avisos, 12 inválidas (exit 1) y 6
   de ausencia (exit 3) — y la suite tiene un test que verifica que la tabla de
   casos y las caras no se contradigan.

### Lo que la contrarrevisión validó y no se tocó

`casos.json` con recuento exacto (ahora también de avisos), la familia de
ciclos, los exit 2 de E/S, el fence y el comentario HTML, la ceguera de árbol e
historial. La precisión sobre el hallazgo de ceguera está incorporada: el patrón
de `comprobar-ceguera.sh` **cubre menos de lo que cree** (rutas de máquina *y*
tokens de marco no enumerados), y sigue yendo a WP aparte.


---

## Revisión del orquestador

_(la rellena el orquestador: aceptado ✅ / devuelto con lista numerada)_
