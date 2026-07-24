# Sprint · REVISION-SEMVER-IDLE

Estado: **WP-22…WP-25 aceptados e integrados; R6-LIB local PASS**.

## Autoridad (custodio · 2026-07-24)

- **GO de planificación:** concedido.
- **GO de implementación/arranque:** concedido para WP-22…WP-25 dentro de
  este repo y de sus `ALCANCE_DIFF`.
- El orquestador puede marcar 🔶 y despachar tras higiene pre-despacho y
  PASS del gate canónico `Rn-LIB`; no necesita un GO adicional para esos
  WPs.
- **GO de release end-to-end condicionado:** concedido para **0.10.0**,
  únicamente después de WP-22…WP-25 aceptados e integrados, higiene de
  cierre, gates del plan, ceguera y `Rn-LIB` final en PASS. Incluye entonces
  bump/CHANGELOG, tag, workflow de Release, publish y C8 del artefacto.
  **No se ejecuta en esta preparación** y no habilita remotas antes de
  cumplir esas precondiciones.
- **No hay GO externo:** quedan fuera consumidores, `z-sdk`, cualquier otro
  repo y todos los gitlinks.

Esta preparación solo modifica `plan/`: no lanza agentes ni implementa
skills. Culmina en un único commit de gobierno; no hace push.

## Objetivo

Endurecer el método del paquete con:

1. contrarrevisión adversarial independiente y selectiva;
2. campos de riesgo en BRIEF y reporte;
3. pulso idle para residuos y fixes retroactivos;
4. separación entre gate local determinista y C8 online;
5. dependencias directas declaradas;
6. probes adversariales automatizados;
7. política semver configurable (`exact`, `caret-semver`, `major-band`);
8. salida dual PO/scrum entre vigilancia, custodio y orquestación;
9. identidad verificable del clone canónico y bloqueo fail-closed de raíces
   downstream/read-only antes de cualquier mutación.

`major-band` se define como `>=M.m.p <(M+1).0.0`. En `0.x` debe advertirse
que el rango permite saltos minor potencialmente incompatibles y exigirse
test de integración.

## Olas y propiedad de archivos

### Ola 1 · tres workers en paralelo

Los alcances no se solapan:

| WP | entrega | propiedad exclusiva |
| --- | ------- | ------------------- |
| WP-22 | revisión independiente + campos de riesgo | `skills/swarm-orquestacion/reference/roles/{BRIEF,REVISION}.md`; `skills/swarm-orquestacion/reference/plantilla-reporte.md`; referencia nueva de contrarrevisión |
| WP-23 | pulso idle + fixes retroactivos + salida dual + detector de identidad de raíz del vigía | `skills/vigilancia/**` |
| WP-24 | política semver + gate/probes | referencia/script/fixtures nuevos bajo `skills/swarm-orquestacion/`; `package.json` y lock solo si una dependencia runtime nueva resulta imprescindible |

Orden de integración: WP-22, WP-23 y WP-24 pueden entrar en cualquier orden.
Los tres reciben contrarrevisión read-only independiente antes de aceptación:
en este sprint cambian contrato de revisión, protocolo de vigilancia o un
gate/parser. Esta clasificación no convierte la contrarrevisión en requisito
global para documentación rutinaria.

### Ola 2 · integración secuencial

WP-25 comienza solo cuando WP-22…WP-24 están aceptados e integrados. Es dueño
de los puntos de entrada compartidos:

- `skills/swarm-orquestacion/SKILL.md`
- `skills/swarm-orquestacion/reference/ciclo.md`
- `skills/swarm-orquestacion/reference/roles/ORQUESTADOR.md`
- `skills/swarm-orquestacion/reference/roles/WORKER.md`
- `skills/swarm-orquestacion/reference/lecciones-vnext.md`

WP-25 enlaza, no duplica, las piezas de Ola 1 y demuestra el flujo completo.
También integra en el rol de orquestador la recepción y emisión de la salida
dual definida por WP-23, sin copiar el contrato de `vigilancia`.
Además integra por referencia el candado de identidad de raíz entregado por
WP-23 en `swarm-orquestacion` y `estacion-viva`: ningún arranque, plan,
watcher ni operación git mutable precede esa comprobación.
Por cambiar contrato de método, recibe contrarrevisión read-only independiente
antes de aceptación.

### Cierre

1. Gate post-merge `Rn-LIB` del tip integrado.
2. Ceguera de árbol e historial reachable sobre toda cara pública tocada.
3. Evidencia local determinista separada de cualquier C8 online.
4. Preparar la evidencia para el corte **0.10.0**; el bump/CHANGELOG, tag,
   workflow de Release, publish y C8 se ejecutan solo tras PASS final.
5. El GO condicionado no autoriza consumidores ni gitlinks.
6. WP-26 permanece futuro e independiente: no forma parte de las olas, del
   gate ni del release 0.10.0 de este sprint.
7. Tras publish + C8 exacto de 0.10.0, entregar el gate forward
   `z-sdk-backlog-u145`; no adelantarlo ni convertir su ejecución downstream
   en precondición del release.

## Gates y CA comunes

- Un revisor distinto del worker intenta refutar los CA; no edita la rama.
- PASS o devolución numerada antes de la aceptación de WP-22…WP-25.
- Toda dependencia cargada en runtime aparece como dependencia directa; si el
  gate usa solo built-ins de Node, se evidencia explícitamente.
- Casos verdes, inválidos y falsos negativos viven en probes automatizados.
- Evidencia manual se etiqueta como manual y no se presenta como test.
- Gate local: sintaxis, rangos, allow/deny y fixtures deterministas sin red.
- C8 online: versión mínima/resuelta existe e instalación limpia integra; se
  ejecuta aparte y puede quedar `⏳ sin verificar` cuando no haya canal.
- `major-band`: acepta `>=M.m.p <(M+1).0.0`; rechaza rangos abiertos, `*`,
  tags, Git/URL, aliases y rutas.
- Para major `0`, warning obligatorio + test integrado.
- Ceguera: 0 coincidencias en árbol y `git log -p`.
- Toda salida de vigilancia al custodio y todo handoff operativo con
  orquestación tiene dos partes, en este orden:
  1. **Vista PO/SCRUM:** Markdown renderizable fuera de cualquier fenced
     code block, lenguaje humano y sin sintaxis de backlog salvo referencias
     WP imprescindibles. Explica brevemente qué cambió, qué sigue y qué debe
     decidir el custodio; muestra GO/check/PASS de forma inequívoca. Usa
     listas verticales para conservar word-wrap. Solo añade una matriz corta
     si existe una bifurcación real o el custodio pide ampliar.
  2. **Handoff operativo:** técnico, sin fluff, limitado a
     backlog/gates/alcances/secuencia y listo para copy/paste. La parte
     completa va dentro de un único fenced code block.
- Probe documental dual: fixture con un PASS y un bloqueo debe demostrar
  orden PO→handoff, estado visible en ambas partes, brevedad, pocas
  referencias WP en la vista, ausencia de fluff y un bloque técnico copiable
  completo; una salida de una sola parte o una Parte 1 cercada se devuelve.
- `WORLD_ROOT` identifica una raíz candidata, pero por sí solo no demuestra
  que sea el clone de trabajo canónico. El contrato recibe explícitamente
  `CANONICAL_WORLD_ROOT`, `READ_ONLY_ROOTS` y `DOWNSTREAM_PATTERNS`.
- La identidad normaliza rutas absolutas en Windows y verifica
  `realpath`/junction/symlink y `git rev-parse --show-toplevel`; compara por
  segmentos de ruta, nunca por prefijo textual.
- Antes de cualquier `mkdir`, escritura, watcher, operación git mutable,
  edición de plan, rama o worktree: candidato igual/descendiente de un
  downstream, ambiguo, no resoluble o distinto del canónico → **LOCK
  fail-closed**.
- El vigía no crea ni elige otro clone: pide al custodio una raíz de trabajo
  canónica fuera de las raíces read-only/downstream y espera nueva
  calibración.
- `DOWNSTREAM_PATTERNS` es calibración del consumidor. El patrón real
  `scriptorium/codebase/<algo>` queda solo en este gobierno y nunca se
  hardcodea en la cara FOSS.
- Probes mínimos de identidad: canónico válido; ruta lexicalmente parecida
  pero en otro segmento; descendiente downstream; junction/symlink al
  downstream; `git toplevel` distinto; raíz inexistente/ambigua. Solo el
  primer caso permite continuar; todos los demás bloquean antes de crear
  artefactos.

## Addenda · identidad de raíz

Ownership sin WP adicional:

- **WP-23** define bajo `skills/vigilancia/**` el contrato, detector, probes,
  LOCK fail-closed y salida dual que solicita al custodio un clone de trabajo
  fuera de las raíces observadas.
- **WP-25** integra el preflight por referencia en los puntos de entrada de
  `swarm-orquestacion` y en el handoff a `estacion-viva`; no duplica detector
  ni calibración.

La calibración local de este mundo reconoce como downstream read-only las
rutas que casen por segmentos con `scriptorium/codebase/<algo>`. La ruta
concreta no viaja a ninguna cara copiable o pública.

## Gate forward post-release · gobierno local

Identificador estable:
**[z-sdk-backlog-u145](file:///C:/S_LAB/z-sdk/plan/BACKLOG.md)**. Deriva del
ID real **WP-U145**, punto de adopción de la dependencia registry en el
backlog Z; **WP-U147** define el sync del runner y **D-36** la política hoy
vigente (`0.x`, resolución efectiva por lock). Se apunta a esas fuentes: no se
copian, no se reabren y no se inventa un WP Z desde LIB.

Semántica:

- **Prerequisito:** Release/Publish de LIB verde y C8 exacto
  `@alephscript/skills-scriptorium@0.10.0` contra el registry.
- **Entonces:** el custodio entrega el handoff siguiente y solicita/inicia
  `R12-Z`.
- **Autoridad:** el mensaje no concede GO en Z. Z permanece IDLE hasta que su
  propio custodio/vigilante emita `R12-Z` y autorice lo que corresponda.
- **No bloquea:** bump, tag, publish o C8 de LIB 0.10.0; tampoco WP-26.
- **Sí bloquea:** declarar `IDLE sin pendientes` post-release antes de
  entregar el aviso. El resultado downstream se registra como evidencia del
  gate forward y no revierte el release LIB ya verificado.
- **Frontera:** no cherry-pick, no editar/operar Z desde LIB, no duplicar
  WP-23/WP-25/WP-26/DC-28. La política semver efectiva se toma del resultado
  integrado de este sprint y se reconcilia bajo el gobierno Z.

### Handoff copy/paste · custodio → Z

```text
GATE FORWARD LIB 0.10.0 → Z

FUENTES
- LIB: C:\S_LAB\skills-library\plan\SPRINTS\REVISION-SEMVER-IDLE\PLAN.md
- Z backlog: C:\S_LAB\z-sdk\plan\BACKLOG.md
- Enlace estable: z-sdk-backlog-u145 (WP-U145; continuidad WP-U147; política D-36)
- Paquete requerido: @alephscript/skills-scriptorium@0.10.0

AUTORIDAD
1. Solicitar/iniciar R12-Z al custodio/vigilante propio de Z.
2. Mantener Z IDLE y sin GO operativo hasta que ese gate sea emitido.
3. No cherry-pick desde LIB ni intervenir otro carril.

RESOLUCIÓN
1. Verificar el artefacto exacto:
   npm view @alephscript/skills-scriptorium@0.10.0 --registry=https://npm.scriptorium.escrivivir.co version
   Resultado requerido: 0.10.0, exit 0.
2. Leer la política semver integrada por WP-24/WP-25 en LIB y reconciliarla
   con C:\S_LAB\z-sdk\plan\DECISIONES.md D-36.
3. Declarar el rango permitido y resolver el lock exactamente a 0.10.0 usando
   <según package manager/gate de z-sdk>. No usar latest ni aceptar otra
   versión resuelta.

INTEGRACIÓN
1. Ejecutar:
   npm run skills:sync
   npm run gates
2. Ejecutar <tests de integración de z-sdk que cubran vigilancia,
   swarm-orquestacion, materialización del runner y política semver>.
3. Si el diff activa CI, obtener run_id + conclusion mediante el canal
   canónico de Z; si aplica paths-ignore, registrar N/A sin inventar verde.

DEVOLUCIÓN
- gate: R12-Z <PASS|FAIL|HOLD>
- versión declarada: <rango>
- versión resuelta en lock: <debe ser 0.10.0>
- npm view exacto: <salida + exit>
- tests ejecutados: <comando → exit/conclusión>
- run_ids: <id + conclusion, o N/A justificado>
- diff/commit Z: <rutas + hash, si hubo mutación autorizada>
- destinatario: <LIB o custodio, según contrato emitido por R12-Z>
- bloqueos/residuos: <evidencia literal; sin promesas>
```

## Gate vigente antes de despacho

`R4-LIB` validó exactamente `b5e3ae23ead5357c6a58f89ad4a440eb5d7d830a`
(`b5e3ae2`). Este nuevo commit de gobierno cambia el tip medido: **R4-LIB no
autoriza despacho**. El vigilante debe emitir **R5-LIB** sobre el nuevo tip y
dar PASS antes de cualquier 🔶, worker, rama o worktree.

## Ejemplo visual del modo dual

El contenido siguiente es un **fixture de formato**, no el estado actual del
sprint.

### Parte 1 · Vista PO/SCRUM

> **Estado:** ⏳ El resultado técnico está listo, pero el despacho espera el
> gate de entrada.

#### Qué cambió

- ✅ La revisión anterior terminó en **PASS**.
- ✅ El riesgo y la evidencia quedaron registrados en lenguaje verificable.

#### Qué sigue

- ⏳ Ejecutar higiene y pedir el gate canónico.
- ⛔ No despachar trabajo si el gate devuelve bloqueo.

#### Decisión del custodio

- ✅ **GO ya concedido:** continuar automáticamente cuando higiene + gate
  estén en PASS.
- ⏳ **HOLD:** pausar el arranque si el custodio desea cambiar prioridad o
  alcance antes del PASS.
- ⛔ **Bloqueado:** si falla el gate, no hay decisión de despacho; se devuelve
  la evidencia numerada para corrección.

La lista anterior es la matriz compacta porque hay una bifurcación real entre
continuar y pausar. Si no hubiera opciones, esta sección mostraría una sola
decisión requerida.

### Parte 2 · Handoff operativo

```markdown
BACKLOG
- Ola 1: tres paquetes pendientes y paralelizables.
- Ola 2: integración pendiente; bloqueada hasta aceptar Ola 1.

GATES
- Pre-despacho: higiene + Rn-LIB PASS.
- Post-merge: contrarrevisión selectiva y gate canónico son evidencias
  distintas.

ALCANCE
- Escribir solo en los alcances asignados del repo.
- No tocar consumidores, gitlinks ni release.

SECUENCIA
1. Obtener PASS pre-despacho.
2. Despachar Ola 1 sin solapes.
3. Aceptar e integrar sus tres entregas.
4. Ejecutar la integración de Ola 2.
5. Pedir PASS final antes del corte autorizado.
```

## Procedencia reconciliada

- `C:\S\scriptorium\plan\SPRINTS\PRUEBA-DE-DOS\APERTURA-APOLO.md`, fila
  **d**, encoló el modo dual para toda salida de `vigilancia`.
- `skills/estacion-viva/reference/SALIDA-DUAL.md` ya aporta el patrón de boot,
  y WP-19 dejó la frontera local-only; ninguno cubre todavía todos los
  informes del vigía ni el handoff bidireccional con orquestación.
- La ampliación se reparte entre WP-23 (`skills/vigilancia/**`) y WP-25
  (puntos de entrada compartidos del orquestador), sin WP nuevo y sin
  solapamiento de archivos. Se mantiene la decisión externa DA-S20:
  `vigilancia` y `estacion-viva` no se fusionan.

## Handoff copiable · orquestador

Copiar solo este bloque:

```markdown
### §ORQUESTADOR

Opera el sprint `REVISION-SEMVER-IDLE` de skills-library.

Autoridad:

- GO de planificación y GO de implementación/arranque para WP-22…WP-25.
- R4-LIB validó el tip anterior, no este gobierno. Antes de 🔶: identidad de
  raíz canónica, higiene pre-despacho y R5-LIB PASS sobre el nuevo tip.
- GO de release condicionado para 0.10.0: no ejecutar bump/CHANGELOG, tag,
  Release ni publish hasta integrar WP-22…WP-25 y obtener `Rn-LIB` final
  PASS. Consumidores y gitlinks siguen fuera de alcance.
- WP-26 es futuro independiente: R5-LIB no autoriza su despacho y 0.10.0 no
  depende de él.

Secuencia:

1. Confirmar que la candidata coincide con `CANONICAL_WORLD_ROOT` y queda
   fuera de `READ_ONLY_ROOTS`/downstream. Ambigüedad o diferencia = LOCK sin
   efectos; pedir al custodio otro clone, sin crearlo ni elegirlo.
2. Tras R5-LIB PASS, abrir WP-22, WP-23 y WP-24 en worktrees y ramas
   distintas; sus archivos no se solapan.
3. Exigir contrarrevisión read-only independiente de cada WP de Ola 1 antes
   de aceptar.
4. Integrar Ola 1; abrir WP-25 solo después.
5. Exigir contrarrevisión read-only independiente de WP-25.
6. Pedir gate post-merge `Rn-LIB` al vigilante propio de este repo.
7. Con PASS final y checklist completa, ejecutar el corte 0.10.0 y verificar
   C8; no adelantar ninguna interacción remota durante la preparación.
8. Solo después del C8 exacto, entregar el gate forward post-release definido
   en el gobierno local; no tratar su ejecución externa como bloqueo del
   publish ya verificado.

Usa los briefs `plan/BRIEFS/WP-22-*.md` a `WP-25-*.md`. Solo el orquestador
edita BACKLOG. No mezcles este carril con rondas de otros mundos.

Esta entrega prepara el arranque: no lances workers ni marques 🔶 en esta
sesión de gobierno.
```

## Handoff copiable · vigilante

Copiar solo este bloque:

```markdown
### §VIGILANTE

Eres el vigilante read-only del carril canónico `LIB` para el repo
skills-library. No eres worker, orquestador ni aceptador.

1. Calibra `WORLD_ROOT` candidata, `CANONICAL_WORLD_ROOT`,
   `READ_ONLY_ROOTS`, `DOWNSTREAM_PATTERNS` y un `OUT_DIR` propio fuera del
   repo. Compara raíces por segmentos tras normalizar y resolver aliases.
2. R4-LIB midió `b5e3ae2`, no el nuevo tip de gobierno. Emite R5-LIB sobre
   el nuevo tip; no autorices ninguna marca en curso antes de PASS.
3. Antes del despacho, verifica identidad del clone canónico, higiene de
   worktrees/ramas/locks, diff limpio fuera de `plan/` y último CI principal.
   Una raíz candidata downstream, ambigua o distinta del canónico queda en
   LOCK antes de cualquier mutación; pide al custodio otro clone de trabajo
   y no lo crees ni elijas. Persiste evidencia literal.
4. Durante la ola, observa sin editar. Para WP-22…WP-25, el orquestador
   puede pedir una contrarrevisión read-only independiente pre-merge; esa
   revisión no sustituye el gate post-merge.
5. En idle, eleva residuos técnicos y candidatos de fix retroactivo mediante
   addenda dos caras; no escribas BACKLOG ni abras WPs.
6. Entrega al custodio primero una vista PO/SCRUM renderizable fuera de caja
   y después un handoff operativo íntegramente copiable para el orquestador;
   no entregues una sola parte.
7. Separa resultados del gate local determinista de comprobaciones C8 online.
8. Tras integración, emite PASS o devolución numerada `Rn-LIB`, con ceguera
   de la cara copiable igual a 0.

Fronteras: read-only durante vigilancia; no tocar consumidores, no modificar
gitlinks y no escribir en ningún repo observado. El release 0.10.0 solo puede
iniciarlo el orquestador tras el PASS final y las precondiciones del plan.
```

## Prueba de ceguera de handoffs

Caras comprobables: solo `§ORQUESTADOR` y `§VIGILANTE`.

Vocabulario prohibido local:

```text
SOL|z-sdk|scriptorium|mediación|marco|§interna|Rn-Z|Rn-S
```

Comando desde la raíz:

```bash
awk '
  /^### §ORQUESTADOR$/{on=1}
  /^### §VIGILANTE$/{on=1}
  /^## Prueba de ceguera de handoffs$/{on=0}
  on
' plan/SPRINTS/REVISION-SEMVER-IDLE/PLAN.md |
  rg -n -i '\bSOL\b|z-sdk|scriptorium|mediación|marco|§interna|Rn-Z|Rn-S'
```

Resultado requerido: `0` coincidencias.
