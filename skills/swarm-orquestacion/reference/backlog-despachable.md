# BACKLOG despachable — contrato y linter

Un BACKLOG es **despachable** cuando el orquestador puede convertir cualquiera
de sus filas en un BRIEF sin preguntar nada. Este documento define ese contrato
y la doctrina del linter que lo verifica
(`../scripts/verificar-backlog.mjs`).

No sustituye al juicio del orquestador: **decide sobre la forma**, no sobre la
verdad. Un backlog despachable puede seguir siendo un mal plan; uno no
despachable no se puede repartir sin inventar.

---

## 1. Los siete campos por WP

| campo | qué decide | ausencia = |
| ----- | ---------- | ---------- |
| `lane` | quién lo despacha (carril / territorio) | no se puede repartir |
| `WP` | identidad literal del trabajo (serie del mundo) | no se puede citar ni cerrar |
| `BRIEF` | qué se hace | el worker lo inventa |
| `CA` | cuándo está hecho | la aceptación es opinión |
| `P` | prioridad dentro del conjunto declarado | no hay orden de ola |
| `deps` | qué debe estar antes | se despacha en orden imposible |
| `ejes` | qué eje de CA activa el tipo de WP (`ejes-ca.md`) | el eje se «recuerda», no se exige |

**Formato:** tabla markdown cuya cabecera declara la columna de ID (`WP` / `id`).
`lane` puede venir de columna o del encabezado de sección
(`--patron-lane`, por defecto `## Lane …` / `## Carril …`). Las tablas que **no**
declaran columna de ID se ignoran (metadatos, conteos) — pero si una de sus filas
empieza por un ID de serie declarada, el linter la caza: ningún WP vive fuera de
la tabla de WPs.

El formato de **lista** (`- ⬜ **ID · título**`, el que parsea
`proyectar-backlog.mjs` para proyectar issues) **no** es despachable: no tiene
sitio por fila para `deps` ni `ejes`. Un backlog en ese formato da 0 WPs y falla
ruidoso; no se «aprueba por no encontrar nada».

**La ausencia se declara.** `deps` sin dependencias se escribe `ninguna`
(configurable). Una celda en blanco, `—`, `?`, `TBD` o `pendiente` es **campo
ausente**, no «sin dependencias». Es la regla 21 (hostil-omite) aplicada al
plan: el default de lo que calla es denegar.

---

## 2. Qué hace ornamental a un CA

> Un CA es **verificable** cuando nombra las dos mitades de una comprobación:
> el **ancla** (el acto observable que decide) y el **objeto** (sobre qué
> recae). Es **ornamental** cuando falta cualquiera de las dos, o cuando el
> juicio de valor domina el enunciado.

**Ancla** — lo que alguien puede ejecutar o mirar, y que puede dar rojo:
un comando, un script, un gate, un probe, una fixture, una suite, un `grep`, un
conteo, un `exit`, un checksum, un veredicto (`falla`, `deniega`, `pasa`,
`verde`), una cantidad o un comparador (`= 0`, `≥ 1`).

**Objeto** — sobre qué recae la comprobación: al menos una palabra de contenido
que no sea ancla, ni valoración, ni palabra función. «El test pasa» tiene ancla
y no tiene objeto: ¿el test **de qué**?

**Valoración** — juicio sobre el resultado: *elegante, limpio, mejor, calidad,
robusto, coherente, claro, sencillo, adecuado, correcto, se revisa, queda…*. No
están prohibidas: está prohibido que **dominen**. Si la proporción de
valoraciones sobre el total de palabras significativas alcanza el umbral (0.5
por defecto, `--umbral-valoracion`), el CA es ornamental aunque lleve un número
suelto de adorno.

### Los cuatro motivos

| motivo | qué pasó | ejemplo que cae |
| ------ | -------- | --------------- |
| `CA-ornamental/valoracion` | la valoración domina | «queda elegante» · «mejor estructurado» · «se revisa la calidad» |
| `CA-ornamental/sin-ancla` | no nombra ninguna comprobación | «el modulo queda listo para su uso» |
| `CA-ornamental/sin-objeto` | comprueba… ¿el qué? | «el test pasa» · «gate verde» |
| `CA-ornamental/sin-referente` | solo con `--ca-estricto`: sin código, ruta ni cantidad | «la suite del segundo cliente pasa en verde» |

El mensaje cita **siempre** el WP, el campo, el motivo y el CA literal, más las
valoraciones y anclas detectadas. Un rechazo sin cita no sirve para corregir.

### Por qué esta definición y no una lista negra

Una lista negra de palabras («prohibido decir elegante») se esquiva con un
sinónimo y castiga CAs legítimos que mencionan calidad de paso. La regla
ancla+objeto ataca la **estructura** del enunciado: para pasarla hay que decir
qué se ejecuta y sobre qué — que es exactamente lo que se pedía. El léxico de
valoración solo decide **con qué motivo** se cita el rechazo y protege el flanco
del CA que sí nombra algo, pero solo para valorarlo.

---

## 3. Límites honestos (falsos negativos conocidos)

El linter mira la forma del texto. Deja pasar, **por diseño**:

1. **Forma correcta, verdad no verificada.** «el probe de la capa X falla si
   falta el campo» pasa aunque ese probe no exista. El linter no ejecuta nada
   del mundo: eso es trabajo de la revisión y del gate del carril.
2. **Comprobación real + prosa ornamental.** «queda elegante y el build de docs
   pasa con exit 0» pasa: contiene una comprobación. Exigir pureza retórica
   produciría más falsos positivos que verdad.
3. **Ancla con objeto vago.** «el gate del portal pasa» tiene ancla y objeto y
   pasa, aunque no diga qué gate ni con qué salida. `--ca-estricto` sube el
   listón (exige código entre backticks, ruta o cantidad), a coste de rechazar
   CAs de prosa legítimos.
4. **Léxico dependiente del idioma.** El léxico de valoración es castellano;
   otro idioma pasa el test de valoración (aunque suele caer igual por falta de
   ancla). Se sustituye con `--lexico`/`--lexico-modo reemplazar`.
5. **Semántica de `deps`.** Se comprueba que resuelvan y no ciclen, no que la
   dependencia sea *cierta*: un WP puede omitir una dependencia real y pasar.
6. **Estado del WP.** Se lintean **todas** las filas, incluidas las ya
   aceptadas: no hay marca que exima de lint (una exención sería la primera
   puerta que usaría un backlog basura).
7. **Filas descartadas arrastran sus defectos.** Una fila con ID duplicado, ID
   ilegible o de serie no declarada se rechaza por eso y sus demás campos ya no
   se analizan: el defecto citado es el que bloquea, no la lista completa.

Y **no** deja pasar, por diseño: el vacío. Fichero vacío, sin tablas, tabla sin
filas, filas que no producen ningún WP, o WPs que solo viven dentro de un bloque
de código o de un comentario HTML → **exit 3**. Un linter que concede en falso
es peor que no tener linter.

---

## 4. Uso

```bash
node scripts/verificar-backlog.mjs \
  --backlog plan/BACKLOG.md \
  --series 'AA-[0-9]+|BB-[0-9]+' \
  --prioridades P0,P1,P2 \
  --ejes I,II,III,IV,V,ceguera,hostil-omite,ninguno
```

| exit | significado |
| ---- | ----------- |
| 0 | despachable |
| 1 | defectos citados por WP y campo |
| 2 | uso o E/S (backlog inexistente, config inválida) |
| 3 | **ausencia**: vacío o 0 WPs |

Parámetros (todos con env equivalente): `--backlog`, `--series`,
`--prioridades`, `--ejes`, `--patron-lane`, `--sin-deps`, `--deps-externas`,
`--umbral-valoracion`, `--min-palabras-brief`, `--ca-estricto`, `--lexico`
(+`--lexico-modo`), `--alias` (+`--alias-modo`), `--json`. Nada está cableado a
un mundo concreto: series, prioridades, ejes, nombres de columna y léxico son
del consumidor.

Fixtures de las dos caras (una válida, quince inválidas, con su motivo esperado
en `casos.json`): `../examples/fixture-backlog/`. Suite:
`node --test scripts/verificar-backlog.test.mjs`.

---

## 5. Dónde encaja en el ciclo

- **Antes del despacho** (paso 1 del ciclo, `ciclo.md`): el orquestador lintea
  el BACKLOG; si no es despachable, no hay ola.
- **Al montar un mundo nuevo**: el primer BACKLOG nace ya con los siete campos.
- **En el cierre de ola**: un WP nuevo encolado sin `deps` ni `ejes` no espera
  a la revisión para que se note.

El linter **no** escribe el BACKLOG (regla de oro 2: solo el orquestador
escribe en él) ni decide prioridades: dice qué falta para poder repartir.
