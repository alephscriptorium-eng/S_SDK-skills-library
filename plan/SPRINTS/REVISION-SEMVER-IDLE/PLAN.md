# Sprint · REVISION-SEMVER-IDLE

Estado: **preparado y autorizado; sin workers lanzados**.

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
8. salida dual PO/scrum entre vigilancia, custodio y orquestación.

`major-band` se define como `>=M.m.p <(M+1).0.0`. En `0.x` debe advertirse
que el rango permite saltos minor potencialmente incompatibles y exigirse
test de integración.

## Olas y propiedad de archivos

### Ola 1 · tres workers en paralelo

Los alcances no se solapan:

| WP | entrega | propiedad exclusiva |
| --- | ------- | ------------------- |
| WP-22 | revisión independiente + campos de riesgo | `skills/swarm-orquestacion/reference/roles/{BRIEF,REVISION}.md`; `skills/swarm-orquestacion/reference/plantilla-reporte.md`; referencia nueva de contrarrevisión |
| WP-23 | pulso idle + fixes retroactivos + salida dual del vigía | `skills/vigilancia/**` |
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
Por cambiar contrato de método, recibe contrarrevisión read-only independiente
antes de aceptación.

### Cierre

1. Gate post-merge `Rn-LIB` del tip integrado.
2. Ceguera de árbol e historial reachable sobre toda cara pública tocada.
3. Evidencia local determinista separada de cualquier C8 online.
4. Preparar la evidencia para el corte **0.10.0**; el bump/CHANGELOG, tag,
   workflow de Release, publish y C8 se ejecutan solo tras PASS final.
5. El GO condicionado no autoriza consumidores ni gitlinks.

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
- Antes de 🔶: higiene pre-despacho y PASS del siguiente gate `Rn-LIB`.
- GO de release condicionado para 0.10.0: no ejecutar bump/CHANGELOG, tag,
  Release ni publish hasta integrar WP-22…WP-25 y obtener `Rn-LIB` final
  PASS. Consumidores y gitlinks siguen fuera de alcance.

Secuencia:

1. Abrir WP-22, WP-23 y WP-24 en worktrees y ramas distintas; sus archivos
   no se solapan.
2. Exigir contrarrevisión read-only independiente de cada WP de Ola 1 antes
   de aceptar.
3. Integrar Ola 1; abrir WP-25 solo después.
4. Exigir contrarrevisión read-only independiente de WP-25.
5. Pedir gate post-merge `Rn-LIB` al vigilante propio de este repo.
6. Con PASS final y checklist completa, ejecutar el corte 0.10.0 y verificar
   C8; no adelantar ninguna interacción remota durante la preparación.

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

1. Calibra `WORLD_ROOT` a la raíz de skills-library y un `OUT_DIR` propio,
   fuera del repo.
2. Emite rondas únicamente como `Rn-LIB`; empieza por el siguiente número
   libre confirmado en el plan. No reutilices ni mezcles rondas de otro
   carril.
3. Antes del despacho, verifica higiene de worktrees/ramas/locks, diff limpio
   fuera de `plan/` y último CI principal. Persiste evidencia literal.
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
