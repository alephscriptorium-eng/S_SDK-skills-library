# Lecciones vNext (método)

Lecciones de operación iniciadas en el corte **0.7.0**. PORT al
skill — no reescritura tribal. Cruzan `swarm-orquestacion` +
`vigilancia` + checkout declarado del brief.

## 1 · Sucesión de vigía

La estación del vigía es **viva** (proceso/estación del carril), no un
subagente del orquestador. Gate `Rn-<carril>`: **sin PASS no hay 🔶**.
El vigía re-verifica CA de facto post-merge (C8 canal real). No se
sustituye por un chat auxiliar «de vigilancia».

Ver: skill `vigilancia` · `reference/ESTACION.md` · convivencia §8.

## 2 · Checkout declarado

Si el WP escribe fuera del `MUNDO_RAIZ` del índice, el brief nombra el
**path FS exacto** del checkout de obra. Casos fundantes:

| caso | checkout de obra |
| ---- | ---------------- |
| IB-01 | fuentes / cuadernos (lectura) declarados en mapa de raíz |
| IB-21 | librería (skill nuevo) en checkout hermano declarado |
| N0-02 / #15 | librería en checkout declarado (piel fanzine) |
| LIB-070 | patrón taller: clone materializado bajo taller `S_LAB` (path declarado en brief + mapa S-LAB + RAIZ) |

Atlas (gitlinks) = SOLO LECTURA; obra = checkout declarado.

## 3 · Worktree por rol

Un WP = una rama `wp/*` = (si hay paralelo) un worktree. Un worktree
por rol (worker / reporte / backstage). No mezclar roles en el mismo
worktree. Aplica a **todo** repo tocado, incluidos hermanos
(`reglas-metodo` · aislamiento).

## 4 · Raíz por constelación

| raíz | rol |
| ---- | --- |
| Atlas del carril (p. ej. `C:\S`) | mapa · estación · fuentes · gitlinks |
| Taller (p. ej. `C:\S_LAB`) | checkouts de obra por mundo / librería |

Nada nuevo sin declaración en el mapa canónico de esa raíz. Copia-release
FS regenerada desde el canónico en git.

## 5 · Identidad antes de efectos

`WORLD_ROOT` es candidata, no prueba. Todo punto de entrada reutiliza el
detector canónico y el LOCK sin efectos de
`../../vigilancia/reference/ESTACION.md`; no duplica implementación ni
calibración. El orden es PASS → mkdir/escritura/watcher/git mutable/plan/
rama/worktree. Ante LOCK, el custodio aporta otra raíz; orquestador y worker no
crean ni eligen clones.

El handoff a estación viva conserva ese orden antes de su fase 1:
`../../estacion-viva/reference/BOOT.md`.

## 6 · Revisión selectiva y gate final

La selección `normal`/`independiente`, los campos del brief y el protocolo
read-only viven en `revision-adversarial.md`. El flujo completo es:

```text
preflight → preparación → worker → contrarrevisión si corresponde →
revisión ordinaria/aceptación → merge → gate post-merge
```

PASS adversarial no acepta. El gate post-merge no reemplaza la
contrarrevisión. Cada barrera conserva su evidencia.

## 7 · Dependencias, semver y probes

`politica-dependencias-semver.md` es la fuente única para dependencias runtime
directas, `exact`, `caret-semver`, `major-band`, warning `0.x`, allow/deny y
probes. El gate local es determinista y sin red; C8 online verifica canal,
instalación limpia e integración después y se reporta aparte.

Brief y reporte registran riesgo, contraevidencia, dependencias, instalación y
si cada evidencia fue automatizada o manual. Un camino verde sin inválidos ni
falsos negativos no basta.

## 8 · Idle y salida dual bidireccional

El vigía recoge residuos en idle y los eleva sin editar BACKLOG. El
orquestador contrasta, pide GO y solo entonces planifica. La entrada y la
respuesta usan por referencia
`../../vigilancia/reference/ADDENDA-DOS-CARAS.md`: vista PO/SCRUM primero,
handoff técnico después. El orquestador opera el bloque técnico y rechaza con
el gate canónico cualquier salida incompleta, invertida, divergente o no
copiable; no copia plantilla ni parser.

## 9 · Gate forward por fuente local

Un gate forward post-release pertenece al plan del mundo. El método solo lo
enlaza: el orquestador espera el trigger publish + C8 declarado por esa fuente,
entrega entonces su handoff y conserva la autoridad externa. No adelanta el
aviso, no concede GO downstream y no edita ni opera su backlog.

## Probe integrado

Este probe ejecuta las fuentes canónicas en vez de recrearlas. Cubre PASS/LOCK
sin efectos, salida dual inválida, selección normal/independiente, semver,
segundo cliente y separación pre/post-merge.

```bash
awk '/^```js integracion-metodo-probe$/{on=1;next} /^```$/{if(on) exit} on' \
  skills/swarm-orquestacion/reference/lecciones-vnext.md |
  node --input-type=module
```

Runtime: Node 22 y built-ins `node:fs`/`node:child_process`; dependencias npm
nuevas: cero.

```js integracion-metodo-probe
import fs from "node:fs";
import { spawnSync } from "node:child_process";

const read = (file) => fs.readFileSync(file, "utf8");
const run = (label, args, options = {}) => {
  const result = spawnSync(process.execPath, args, {
    encoding: "utf8",
    ...options,
  });
  if (result.status !== 0) {
    throw new Error(
      `${label}: FAIL\n${result.stdout ?? ""}${result.stderr ?? ""}`,
    );
  }
  console.log(`${label}: PASS`);
  return result.stdout;
};

const revisionPath =
  "skills/swarm-orquestacion/reference/revision-adversarial.md";
const revision = read(revisionPath);
const match = revision.match(
  /```js revision-adversarial-probe\r?\n([\s\S]*?)\r?\n```/,
);
if (!match) throw new Error("probe adversarial no encontrado");
run("seleccion normal/riesgo", ["--input-type=module"], { input: match[1] });

const identity = run("identidad PASS/LOCK y cero efectos", [
  "skills/vigilancia/scripts/probar-identidad-raiz.mjs",
]);
if (!identity.includes("identidad-probes: PASS (9 casos)")) {
  throw new Error("cobertura de identidad incompleta");
}

const dual = run("salida dual valida/invalida", [
  "skills/vigilancia/scripts/probar-salida-dual.mjs",
]);
for (const signal of [
  "PASS fixture-pass-y-bloqueo",
  "RECHAZO una-sola-parte",
  "RECHAZO orden-invertido",
  "RECHAZO estado-divergente",
  "RECHAZO handoff-con-fluff",
]) {
  if (!dual.includes(signal)) throw new Error(`falta caso dual: ${signal}`);
}

run("dedup contratos", [
  "skills/vigilancia/scripts/probar-dedup-contratos.mjs",
]);
run("semver verdes/invalidos/falsos-negativos", [
  "skills/swarm-orquestacion/examples/fixture-semver/probes.mjs",
]);
run("segundo cliente semver", [
  "skills/swarm-orquestacion/examples/fixture-semver/cliente-independiente/probe.mjs",
]);

const ciclo = read("skills/swarm-orquestacion/reference/ciclo.md");
const ordered = [
  "## 3. Contrarrevisión selectiva pre-aceptación",
  "## 4. Revisión ordinaria y aceptación",
  "## 6. Merge y gate post-merge",
];
let cursor = -1;
for (const heading of ordered) {
  const next = ciclo.indexOf(heading);
  if (next <= cursor) throw new Error(`orden de ciclo inválido: ${heading}`);
  cursor = next;
}

for (const file of [
  "skills/swarm-orquestacion/SKILL.md",
  "skills/swarm-orquestacion/reference/ciclo.md",
  "skills/swarm-orquestacion/reference/roles/ORQUESTADOR.md",
  "skills/swarm-orquestacion/reference/roles/WORKER.md",
]) {
  const text = read(file);
  if (!text.includes("verificar-identidad-raiz.mjs")) {
    throw new Error(`falta referencia de identidad: ${file}`);
  }
}

console.log("integracion-metodo: PASS");
console.log("pre-merge/post-merge: evidencia separada");
```
