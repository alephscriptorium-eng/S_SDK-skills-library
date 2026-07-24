# Contrarrevisión adversarial selectiva

Contrato para añadir una revisión **independiente** cuando el riesgo de un WP
lo justifica. No sustituye la revisión ordinaria del orquestador ni el gate
post-merge: es una barrera read-only, previa a la aceptación, cuyo objetivo es
intentar refutar los criterios de aceptación (CA).

## Activación selectiva

El orquestador clasifica el WP al preparar su brief:

| `RIESGO_REVISION` | Cuándo corresponde | Flujo |
| ----------------- | ------------------ | ----- |
| `normal` | documentación rutinaria, cambios mecánicos o riesgo acotado sin las clases siguientes | worker → revisión ordinaria |
| `independiente` | gate/parser con riesgo de falsos negativos; seguridad, permisos o fronteras de escritura; migración o demolición irreversible; publicación/release; cambio transversal del contrato del método; protocolo operativo que puede autorizar mutaciones | worker → contrarrevisión adversarial → revisión ordinaria |

La lista de riesgo es cerrada por defecto: la mera edición de documentación no
activa contrarrevisión. El orquestador puede elevar un caso no listado, pero
debe explicar el riesgo verificable en `MOTIVO_RIESGO`; no puede rebajarlo si
pertenece a una clase `independiente`.

## Campos del brief

- `RIESGO_REVISION`: `normal` o `independiente`.
- `MOTIVO_RIESGO`: clase de riesgo y efecto que podría escapar a la revisión
  ordinaria; para `normal`, explica por qué no activa una clase independiente.
- `CONTRAEVIDENCIA_REQUERIDA`: casos concretos con los que se intentará refutar
  los CA, incluidos verdes, inválidos y falsos negativos cuando correspondan.
- `REVISOR_DISTINTO_WORKER`: `sí` cuando el riesgo es `independiente`; para
  riesgo `normal`, `no requerido`.

Un brief de riesgo `independiente` queda incompleto si falta un campo, si el
revisor no es distinto o si la contraevidencia solo repite el camino feliz.

## Protocolo read-only

El revisor recibe rama, reporte, brief y base de comparación. No modifica
archivos, commits, BACKLOG, estados, tags ni remotas; tampoco acepta ni mergea.

1. Confirma identidad distinta respecto del worker y que el diff se limita al
   `ALCANCE_DIFF`.
2. Convierte cada CA y cada elemento de `CONTRAEVIDENCIA_REQUERIDA` en una
   hipótesis refutable.
3. Inspecciona el diff completo y reproduce gates locales cuando sea posible.
4. Busca caminos inválidos aceptados, falsos negativos, omisiones de alcance,
   dependencias runtime no declaradas y afirmaciones sostenidas solo por
   evidencia manual.
5. Distingue en su salida:
   - **prueba automatizada**: comando o probe repetible con resultado literal;
   - **evidencia manual**: inspección identificada como manual, sin presentarla
     como test;
   - **sin verificar**: cualquier observación no reproducida.
6. Emite exactamente uno de estos resultados:
   - `PASS`: no logró refutar los CA con los casos ejecutados;
   - `DEVUELTO`: lista numerada de defectos reproducibles o evidencia faltante.

`PASS` no equivale a aceptación. El orquestador conserva la revisión ordinaria,
decide la aceptación y realiza cualquier merge posterior.

## Casos de contrato

Estos casos prueban la selección, no el contenido de un WP concreto:

1. **Normal:** corregir redacción sin cambiar reglas, gates ni comportamiento
   declara `RIESGO_REVISION: normal` y no exige revisor independiente.
2. **Gate:** cambiar un parser que puede aceptar entradas inválidas declara
   `RIESGO_REVISION: independiente`, exige persona/agente distinto y
   contraevidencia con inválidos y falsos negativos.

Una comprobación automatizada puede validar que la tabla conserva ambos flujos;
la valoración de si un cambio real pertenece a una clase de riesgo sigue siendo
evidencia manual del orquestador y debe etiquetarse como tal.
