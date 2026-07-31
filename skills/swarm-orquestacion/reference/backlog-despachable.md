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

**Solo cuenta lo que el lector ve como tabla del backlog.** Una tabla dentro de
un fence, de un comentario HTML, de un bloque **indentado** (4 espacios) o de
una **cita** (`>`) no declara WPs: se cuenta como línea velada y el diagnóstico
dice la causa. Sin esto, un documento que solo *documenta el formato* aprobaría
como backlog.

**La ausencia se declara.** `deps` sin dependencias se escribe `ninguna`
(configurable). Una celda en blanco, `—`, `?`, `TBD` o `pendiente` es **campo
ausente**, no «sin dependencias». Es la regla 21 (hostil-omite) aplicada al
plan: el default de lo que calla es denegar. Y declarar `ninguna` **junto a** una
dependencia real (o `ninguno` junto a un eje real) es una **contradicción**: el
linter no elige por el autor cuál de las dos mitades vale.

---

## 2. Qué bloquea y qué avisa

> **Bloquea lo decidible; avisa de lo opinable.**

| decide el exit | motivos |
| -------------- | ------- |
| **sí — bloquea** | `campo-ausente` · `columna-requerida-ausente` · `prioridad-invalida` · `eje-desconocido` · `ejes-contradictorios` · `deps-contradictorias` · `lane-desconocida` · `serie-no-declarada` · `id-duplicado` · `id-no-interpretable` · `fila-fuera-de-tabla-wp` · `dep-inexistente` · `dep-ciclo` · `brief-insuficiente` · `ca-insuficiente` · `backlog-vacio` · `sin-wps` |
| **no — avisa** | `CA-ornamental/valoracion` · `CA-ornamental/sin-ancla` · `CA-ornamental/sin-objeto` · `CA-ornamental/sin-referente` |

**Por qué el CA ornamental no bloquea.** La calidad de un CA es **juicio**, y un
gate no puede arrogárselo sin producir falsos rechazos que lo maten: un gate que
rechaza CAs correctos acaba **desactivado**, y entonces no protege de nada. La
detección de CA ornamental es información valiosa —dice dónde el plan promete
sin comprometerse— y se emite siempre, con su motivo, su cita literal y su
recuento; pero el veredicto de despacho lo deciden las cosas que un programa
puede decidir sin opinar: campos, conjuntos declarados, contradicciones,
dependencias, ciclos, suelos y **ausencia**.

El **suelo** (`brief-insuficiente`, `ca-insuficiente`) sí bloquea porque no
juzga calidad: cuenta **palabras significativas distintas**. `zzz zzz zzz` no
son tres palabras; es una repetida. Es objetivo, declarado y parametrizable
(`--min-palabras-brief`, `--min-palabras-ca`).

---

## 3. Qué hace ornamental a un CA (aviso)

> Un CA es **verificable** cuando nombra las dos mitades de una comprobación:
> el **ancla** (el acto observable que decide) y el **objeto** (sobre qué
> recae). Es **ornamental** cuando falta cualquiera de las dos, o cuando el
> juicio de valor domina el enunciado.

**Ancla** — lo que alguien puede ejecutar o mirar, y que puede dar rojo:
un comando, un script, un gate, un probe, una fixture, una suite, un `grep`, un
conteo, un `exit`, un checksum, un veredicto (`falla`, `deniega`, `pasa`,
`verde`), una **negación universal** comprobable («ninguna referencia queda en
el árbol», «ningún usuario sin rol abre la sala») o un comparador (`= 0`, `≥ 1`).
El léxico se reconoce por forma exacta **y por lema** (`ejecu-`, `verific-`,
`grep-`, `fall-`, `deneg-`…), para que «ejecuciones», «grepables» o
«verificable» cuenten tanto como «ejecuta», «grep» o «verifica».

**Objeto** — sobre qué recae la comprobación: al menos una palabra de contenido
que no sea ancla, ni valoración, ni palabra función. «El test pasa» tiene ancla
y no tiene objeto: ¿el test **de qué**?

**Valoración** — juicio sobre el resultado: *elegante, limpio, mejor, calidad,
robusto, coherente, claro, sencillo, adecuado, correcto, se revisa, queda…*. No
están prohibidas: está prohibido que **dominen** (ratio ≥ `--umbral-valoracion`,
0.5 por defecto).

### Dos asimetrías cerradas

1. **Un dígito no ancla nada.** Una cantidad suelta solo cuenta como ancla si va
   con **comparador** (`= 0`), con **unidad de medida** (`0 hits`,
   `1 definicion`) o **pegada a otra ancla** (`exit 0`). Si bastara un número,
   «queda elegante en 2 sitios» sería un CA verificable.
2. **Concatenar no diluye.** El CA se analiza además **por segmentos** (`·`,
   `;`, `<br>`, salto de línea): un CA ornamental pegado a uno bueno se cita por
   su segmento, en vez de esconderse en el ratio del conjunto. Los *fragmentos
   de medida* (sin valoraciones y con ≤2 palabras significativas, como
   `exit 0`) no se juzgan sueltos: solo dentro del conjunto.

### Los cuatro motivos

| motivo | qué pasó | ejemplo que avisa |
| ------ | -------- | ----------------- |
| `CA-ornamental/valoracion` | la valoración domina | «queda elegante» · «mejor estructurado» · «se revisa la calidad» |
| `CA-ornamental/sin-ancla` | no nombra ninguna comprobación | «el modulo queda listo para su uso» |
| `CA-ornamental/sin-objeto` | comprueba… ¿el qué? | «el test pasa» · «gate verde» |
| `CA-ornamental/sin-referente` | solo con `--ca-estricto`: sin código, ruta ni cantidad | «la suite del segundo cliente pasa en verde» |

El mensaje cita **siempre** el WP, el campo, el motivo y el CA literal (o el
segmento), más las valoraciones y anclas detectadas. Un aviso sin cita no sirve
para corregir.

### Por qué esta definición y no una lista negra

Una lista negra de palabras («prohibido decir elegante») se esquiva con un
sinónimo y castiga CAs legítimos que mencionan calidad de paso. La regla
ancla+objeto ataca la **estructura** del enunciado. Aun así **sigue siendo un
léxico**, con las dos caras del error; por eso avisa en vez de bloquear.

---

## 4. Límites honestos

El aviso de CA mira la forma del texto. Deja pasar, **por diseño**:

1. **Forma correcta, verdad no verificada.** «el probe de la capa X falla si
   falta el campo» pasa aunque ese probe no exista. El linter no ejecuta nada
   del mundo: eso es trabajo de la revisión y del gate del carril.
2. **Comprobación real + prosa ornamental.** «queda elegante y el build de docs
   pasa con exit 0» pasa: contiene una comprobación.
3. **Ancla con objeto vago.** «el gate del portal pasa» tiene ancla y objeto y
   pasa. `--ca-estricto` sube el listón (exige código entre backticks, ruta o
   cantidad), a coste de rechazar CAs de prosa legítimos.
4. **Léxico dependiente del idioma.** Anclas y valoraciones son castellanas; un
   CA en otro idioma casi siempre avisa por falta de ancla. Se sustituye con
   `--lexico` (`--lexico-modo reemplazar`), incluidos los lemas.
5. **CA telegráfico.** Cerrar la asimetría del dígito tiene precio: «ceguera 0»
   o «DS-5 · ceguera» avisan por `sin-ancla`. Se corrige escribiendo la medida
   («`grep` de ceguera en árbol e historial = 0»), y mientras tanto **no
   bloquea**.
6. **Semántica de `deps`.** Se comprueba que resuelvan, que no se contradigan y
   que no ciclen, no que la dependencia sea *cierta*: un WP puede **omitir** una
   dependencia real y pasar.
7. **Estado del WP.** Se lintean **todas** las filas, incluidas las ya
   aceptadas: no hay marca que exima de lint (una exención sería la primera
   puerta que usaría un backlog basura).
8. **Filas descartadas arrastran sus defectos.** Una fila con ID duplicado, ID
   ilegible o de serie no declarada se rechaza por eso y sus demás campos ya no
   se analizan: el defecto citado es el que bloquea, no la lista completa.
9. **Calibración del consumidor.** Un `--series` demasiado permisivo declara
   como propia cualquier serie; los conjuntos los fija el BRIEF, no el linter.

Y **no** deja pasar, por diseño: el vacío y la duda de uso. Fichero vacío, sin
tablas, tabla sin filas, filas que no producen ningún WP, o WPs que solo viven
donde el lector no los ve → **exit 3**. Flag desconocida, argumento suelto,
número no numérico o regex inválida → **exit 2**, nunca un veredicto: en CI solo
se lee el exit, y un linter que contesta sobre un fichero que nadie pidió
concede en falso.

---

## 5. Uso

```bash
node scripts/verificar-backlog.mjs \
  --backlog plan/BACKLOG.md \
  --series 'AA-[0-9]+|BB-[0-9]+' \
  --prioridades P0,P1,P2 \
  --ejes I,II,III,IV,V,ceguera,hostil-omite,ninguno
```

| exit | significado |
| ---- | ----------- |
| 0 | despachable (puede llevar avisos de CA) |
| 1 | defectos bloqueantes, citados por WP y campo |
| 2 | **uso o configuración**: flag desconocida, valor no numérico, regex inválida, backlog inexistente |
| 3 | **ausencia**: vacío o 0 WPs |

Parámetros (todos con env equivalente): `--backlog`, `--series`,
`--prioridades`, `--ejes`, `--ejes-ninguno`, `--lanes`, `--patron-lane`,
`--sin-deps`, `--deps-externas`, `--umbral-valoracion`, `--min-palabras-brief`,
`--min-palabras-ca`, `--ca-estricto`, `--lexico` (+`--lexico-modo`), `--alias`
(+`--alias-modo`), `--json`. Admite también `--flag=valor`. Nada está cableado a
un mundo concreto: series, prioridades, ejes, lanes, nombres de columna, suelos
y léxico son del consumidor.

Fixtures en cuatro caras (2 válidas, 1 de avisos, 12 inválidas y 6 de
ausencia, con su veredicto y recuento exacto en `casos.json`):
`../examples/fixture-backlog/`. Suite:
`node --test scripts/verificar-backlog.test.mjs`.

---

## 6. Dónde encaja en el ciclo

- **Antes del despacho** (paso 1 del ciclo, `ciclo.md`): el orquestador lintea
  el BACKLOG; si no es despachable, no hay ola. Los avisos de CA se leen como
  cola de mejora, no como bloqueo.
- **Al montar un mundo nuevo**: el primer BACKLOG nace ya con los siete campos.
- **En el cierre de ola**: un WP nuevo encolado sin `deps` ni `ejes` no espera
  a la revisión para que se note.

El linter **no** escribe el BACKLOG (regla de oro 2: solo el orquestador
escribe en él) ni decide prioridades: dice qué falta para poder repartir.
