// Suite del linter de BACKLOG despachable (verificar-backlog.mjs).
// Ejecutar: node --test skills/swarm-orquestacion/scripts/
//
// Dos caras: la fixture válida PASA (exit 0) y cada fixture inválida CAE POR SU
// MOTIVO (recuento exacto por motivo, no «hubo algún error»). La cara de
// AUSENCIA (fichero vacío, sin tabla, tabla sin filas, formato ajeno) es fallo
// ruidoso con exit 3: un linter que concede en falso es peor que no tenerlo.
//
// Fixtures SINTÉTICAS (serie FX-…), sin nombres ni rutas de ningún mundo.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync, mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { analizarCA, parsearBacklog, detectarCiclos, verificarBacklog, configurar, CAMPOS } from './verificar-backlog.mjs';

const SCRIPT = fileURLToPath(new URL('./verificar-backlog.mjs', import.meta.url));
const FIXTURES = fileURLToPath(new URL('../examples/fixture-backlog/', import.meta.url));
const CASOS = JSON.parse(readFileSync(join(FIXTURES, 'casos.json'), 'utf-8'));

function correr(ruta, extra = []) {
  const r = spawnSync(
    process.execPath,
    [SCRIPT, '--backlog', ruta, '--series', CASOS.series, '--prioridades', CASOS.prioridades, ...extra],
    { encoding: 'utf-8' }
  );
  return { status: r.status, salida: `${r.stdout}\n${r.stderr}` };
}

function correrJson(ruta, extra = []) {
  const r = correr(ruta, ['--json', ...extra]);
  return { ...r, reporte: JSON.parse(r.salida.trim()) };
}

// --- 1. Tabla de casos: cada fixture con su veredicto y su motivo ---------

for (const caso of CASOS.casos) {
  test(`fixture ${caso.cara}: ${caso.fixture} → exit ${caso.exit} (${caso.descripcion})`, () => {
    const ruta = join(FIXTURES, caso.fixture);
    const { status, salida } = correr(ruta);
    assert.equal(status, caso.exit, `exit inesperado.\n${salida}`);

    const { reporte } = correrJson(ruta);
    assert.equal(reporte.resumen.wps, caso.wps, `WPs parseados inesperados.\n${salida}`);
    assert.deepEqual(
      reporte.resumen.porMotivo,
      caso.motivos,
      `el recuento por motivo debe ser exacto: cada fixture cae por SU motivo.\n${salida}`
    );
    for (const cita of caso.citas) {
      assert.ok(salida.includes(cita), `el mensaje debe citar «${cita}».\n${salida}`);
    }
    // Cada defecto nombra el WP y el campo (regla del encargo).
    for (const d of reporte.defectos) {
      assert.ok(d.wp, 'todo defecto nombra el WP');
      assert.ok(CAMPOS.includes(d.campo), `campo desconocido: ${d.campo}`);
      assert.ok(d.detalle && d.detalle.length > 20, 'todo defecto explica el motivo');
    }
  });
}

test('la fixture válida es la ÚNICA con exit 0', () => {
  const verdes = CASOS.casos.filter((c) => c.exit === 0);
  assert.equal(verdes.length, 1);
  assert.equal(verdes[0].cara, 'valida');
});

// --- 2. Ausencia: probar lo que CALLA, no solo lo malformado --------------

test('AUSENCIA: fichero inexistente → exit 2, nunca verde', () => {
  const { status, salida } = correr(join(FIXTURES, 'no-existe-este-backlog.md'));
  assert.equal(status, 2);
  assert.match(salida, /inexistente/);
});

test('AUSENCIA: fichero solo con espacios en blanco → exit 3', () => {
  const dir = mkdtempSync(join(tmpdir(), 'lint-backlog-'));
  try {
    const f = join(dir, 'BACKLOG.md');
    writeFileSync(f, '\n\n   \n\t\n');
    const { status, salida } = correr(f);
    assert.equal(status, 3, salida);
    assert.match(salida, /backlog-vacio/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('AUSENCIA: todas las filas de serie ajena → 0 WPs y exit 3 (jamás verde por vacío)', () => {
  const texto = `# BACKLOG

## Lane A · ALFA

| WP | P | BRIEF | CA | deps | ejes |
| -- | - | ----- | -- | ---- | ---- |
| **ZZ-01** | P0 | fila de serie ajena al mundo | el probe de la fixture falla sin firma | ninguna | I |
`;
  const r = verificarBacklog(texto, configurar({ series: 'FX-[A-Z][0-9]{2}' }));
  assert.equal(r.exit, 3);
  assert.equal(r.resumen.wps, 0);
  assert.equal(r.resumen.porMotivo['serie-no-declarada'], 1);
  assert.equal(r.resumen.porMotivo['sin-wps'], 1);
});

test('AUSENCIA: deps en blanco NO significa «sin dependencias» (se declara o cae)', () => {
  const fila = (deps) => `# B

## Lane A · ALFA

| WP | P | BRIEF | CA | deps | ejes |
| -- | - | ----- | -- | ---- | ---- |
| **FX-A01** | P0 | extraer el kit de plantillas | el probe del consumidor devuelve exit 0 | ${deps} | I |
`;
  const cfg = configurar({ series: 'FX-[A-Z][0-9]{2}' });
  assert.equal(verificarBacklog(fila('ninguna'), cfg).exit, 0, 'declarar «ninguna» pasa');
  const omitido = verificarBacklog(fila(' '), cfg);
  assert.equal(omitido.exit, 1, 'omitir el campo NO pasa');
  assert.equal(omitido.defectos[0].motivo, 'campo-ausente');
  assert.equal(omitido.defectos[0].campo, 'deps');
});

// --- 3. El corazón: qué hace ornamental a un CA --------------------------

const cfg = configurar();

test('CA ornamental: la valoración domina («queda elegante»)', () => {
  const a = analizarCA('queda elegante', cfg);
  assert.equal(a.ok, false);
  assert.equal(a.motivo, 'CA-ornamental/valoracion');
  assert.deepEqual(a.valoraciones, ['queda', 'elegante']);
  assert.match(a.detalle, /queda/);
});

test('CA ornamental: «mejor estructurado» y «se revisa la calidad» caen por valoración', () => {
  assert.equal(analizarCA('mejor estructurado', cfg).motivo, 'CA-ornamental/valoracion');
  assert.equal(analizarCA('se revisa la calidad', cfg).motivo, 'CA-ornamental/valoracion');
});

test('CA ornamental: sin ancla de verificación («el modulo queda listo para su uso»)', () => {
  const a = analizarCA('el modulo queda listo para su uso', cfg);
  assert.equal(a.motivo, 'CA-ornamental/sin-ancla');
  assert.deepEqual(a.anclas, []);
});

test('CA ornamental: ancla sin objeto («el test pasa» — ¿el test de qué?)', () => {
  const a = analizarCA('el test pasa', cfg);
  assert.equal(a.motivo, 'CA-ornamental/sin-objeto');
  assert.deepEqual(a.contenido, []);
});

test('CA verificable: ancla + objeto pasan (ambas mitades presentes)', () => {
  for (const ca of [
    'el probe del consumidor sintetico resuelve la plantilla con exit 0',
    'grep del simbolo devuelve 1 definicion en el adaptador',
    'el script de ceguera imprime `ceguera: 0` en arbol e historial',
    'la suite del segundo cliente pasa en verde sin tocar al primero',
    'el gate deniega el mensaje cuando la firma no se aporta',
  ]) {
    const a = analizarCA(ca, cfg);
    assert.equal(a.ok, true, `deberia pasar: «${ca}» → ${a.motivo}`);
  }
});

test('bypass: adornar con una cantidad NO salva un CA valorativo', () => {
  // El ratio de valoración sigue mandando aunque haya un número suelto.
  assert.equal(analizarCA('queda elegante en 3 sitios', cfg).motivo, 'CA-ornamental/valoracion');
  assert.equal(analizarCA('la documentacion queda mas clara para el lector', cfg).motivo, 'CA-ornamental/valoracion');
  assert.equal(analizarCA('queda elegante; exit 0', cfg).motivo, 'CA-ornamental/valoracion');
});

test('LÍMITE HONESTO: un CA con comprobación real Y adorno pasa (contiene una comprobación)', () => {
  // Documentado en reference/backlog-despachable.md §Límites: el linter exige
  // que HAYA comprobación, no que no haya prosa. Esto es un falso negativo
  // conocido y deliberado, no un descuido.
  assert.equal(analizarCA('queda elegante y el build de docs pasa con exit 0', cfg).ok, true);
});

test('LÍMITE HONESTO: el linter valida la FORMA del CA, no su verdad', () => {
  // Nombra un probe que puede no existir: forma correcta, verdad no verificada.
  assert.equal(analizarCA('el probe inventado de la capa fantasma falla si falta el campo', cfg).ok, true);
});

test('--ca-estricto sube el listón: exige referente fuerte (código, ruta o cantidad)', () => {
  const suave = configurar();
  const estricto = configurar({ caEstricto: true });
  const ca = 'la suite del segundo cliente pasa en verde sin tocar al primero';
  assert.equal(analizarCA(ca, suave).ok, true);
  assert.equal(analizarCA(ca, estricto).motivo, 'CA-ornamental/sin-referente');
  assert.equal(analizarCA('`npm test` del cliente sintetico devuelve exit 0', estricto).ok, true);
});

// --- 4. Ciclos concretos -------------------------------------------------

test('ciclo propio (A → A) se señala como ciclo de 1', () => {
  const wps = [{ id: 'FX-A01', depsIds: ['FX-A01'] }];
  assert.deepEqual(detectarCiclos(wps), [['FX-A01', 'FX-A01']]);
});

test('un mismo ciclo no se reporta dos veces', () => {
  const wps = [
    { id: 'FX-A01', depsIds: ['FX-A02'] },
    { id: 'FX-A02', depsIds: ['FX-A03'] },
    { id: 'FX-A03', depsIds: ['FX-A01'] },
  ];
  assert.equal(detectarCiclos(wps).length, 1);
});

test('dos ciclos independientes se reportan por separado', () => {
  const wps = [
    { id: 'FX-A01', depsIds: ['FX-A02'] },
    { id: 'FX-A02', depsIds: ['FX-A01'] },
    { id: 'FX-B01', depsIds: ['FX-B02'] },
    { id: 'FX-B02', depsIds: ['FX-B01'] },
  ];
  assert.equal(detectarCiclos(wps).length, 2);
});

test('un DAG profundo no inventa ciclos', () => {
  const wps = [
    { id: 'FX-A01', depsIds: [] },
    { id: 'FX-A02', depsIds: ['FX-A01'] },
    { id: 'FX-A03', depsIds: ['FX-A01', 'FX-A02'] },
    { id: 'FX-B01', depsIds: ['FX-A03'] },
  ];
  assert.deepEqual(detectarCiclos(wps), []);
});

// --- 5. Parametrización: nada cableado a un mundo concreto ---------------

test('los conjuntos de prioridades y ejes son del consumidor', () => {
  const texto = `# B

## Carril A · ALFA

| WP | P | BRIEF | CA | deps | ejes |
| -- | - | ----- | -- | ---- | ---- |
| **QQ-7** | urgente | extraer el kit de plantillas | el probe del consumidor devuelve exit 0 | ninguna | forma |
`;
  const estandar = verificarBacklog(texto, configurar({ series: 'QQ-[0-9]+' }));
  assert.equal(estandar.exit, 1);
  assert.ok(estandar.resumen.porMotivo['prioridad-invalida']);
  assert.ok(estandar.resumen.porMotivo['eje-desconocido']);

  const propio = verificarBacklog(
    texto,
    configurar({ series: 'QQ-[0-9]+', prioridades: ['urgente', 'normal'], ejes: ['forma', 'fondo'] })
  );
  assert.equal(propio.exit, 0, 'con los conjuntos del consumidor, el mismo backlog es despachable');
  assert.equal(propio.wps[0].lane, 'A · ALFA', 'la lane se toma del encabezado (patrón parametrizable)');
});

test('--deps-externas permite dependencias fuera del backlog cuando el mundo lo declara', () => {
  const texto = `# B

## Lane A · ALFA

| WP | P | BRIEF | CA | deps | ejes |
| -- | - | ----- | -- | ---- | ---- |
| **FX-A01** | P0 | extraer el kit de plantillas | el probe del consumidor devuelve exit 0 | EXT-9 | I |
`;
  const cerrado = configurar({ series: 'FX-[A-Z][0-9]{2}' });
  assert.equal(verificarBacklog(texto, cerrado).resumen.porMotivo['dep-inexistente'], 1);
  const abierto = configurar({ series: 'FX-[A-Z][0-9]{2}', depsExternas: 'EXT-[0-9]+' });
  assert.equal(verificarBacklog(texto, abierto).exit, 0);
});

test('el léxico ornamental es sustituible por el consumidor', () => {
  const cfgOtro = configurar({ lexico: { ...configurar().lexico, ornamentales: ['chachi'] } });
  assert.equal(analizarCA('queda elegante', cfgOtro).motivo, 'CA-ornamental/sin-ancla', 'sin su léxico, cae igual por falta de ancla');
  assert.equal(analizarCA('chachi chachi', cfgOtro).motivo, 'CA-ornamental/valoracion');
});

test('alias de columnas: el mundo puede llamar a sus columnas como quiera', () => {
  const texto = `# B

## Lane A · ALFA

| id | prioridad | encargo | criterio | dependencias | eje |
| -- | --------- | ------- | -------- | ------------ | --- |
| **FX-A01** | P0 | extraer el kit de plantillas | el probe del consumidor devuelve exit 0 | ninguna | I |
`;
  const r = verificarBacklog(texto, configurar({ series: 'FX-[A-Z][0-9]{2}' }));
  assert.equal(r.exit, 0, JSON.stringify(r.defectos, null, 2));
});

// --- 6. Parseo: lo que NO es una fila de WP ------------------------------

test('las tablas sin columna de WP se ignoran, pero delatan IDs colados', () => {
  const texto = `# B

| dato | valor |
| ---- | ----- |
| serie | FX-… |

## Lane A · ALFA

| WP | P | BRIEF | CA | deps | ejes |
| -- | - | ----- | -- | ---- | ---- |
| **FX-A01** | P0 | extraer el kit de plantillas | el probe del consumidor devuelve exit 0 | ninguna | I |
`;
  const { wps, defectos } = parsearBacklog(texto, configurar({ series: 'FX-[A-Z][0-9]{2}' }));
  assert.equal(wps.length, 1);
  assert.deepEqual(defectos, [], 'la tabla de metadatos no genera ruido');
});

test('fila de tabla de WPs sin ID → defecto, no omisión silenciosa', () => {
  const texto = `# B

## Lane A · ALFA

| WP | P | BRIEF | CA | deps | ejes |
| -- | - | ----- | -- | ---- | ---- |
| Total | P0 | fila de totales colada en la tabla | conteo de la tabla | ninguna | I |
| **FX-A01** | P0 | extraer el kit de plantillas | el probe del consumidor devuelve exit 0 | ninguna | I |
`;
  const r = verificarBacklog(texto, configurar({ series: 'FX-[A-Z][0-9]{2}' }));
  assert.equal(r.exit, 1);
  assert.equal(r.resumen.porMotivo['campo-ausente'], 1);
  assert.equal(r.defectos[0].campo, 'WP');
});

test('lo que el lector NO ve tampoco se despacha: fence y comentario HTML', () => {
  const texto = `# BACKLOG

\`\`\`
| WP | P | BRIEF | CA | deps | ejes |
| -- | - | ----- | -- | ---- | ---- |
| **FX-A01** | P0 | tabla de ejemplo dentro de un fence | el probe devuelve exit 0 sobre la plantilla | ninguna | I |
\`\`\`

<!--
## Lane A · ALFA

| WP | P | BRIEF | CA | deps | ejes |
| -- | - | ----- | -- | ---- | ---- |
| **FX-A02** | P0 | tabla comentada para que no se vea | el probe devuelve exit 0 sobre la plantilla | ninguna | I |
-->
`;
  const r = verificarBacklog(texto, configurar({ series: 'FX-[A-Z][0-9]{2}' }));
  assert.equal(r.exit, 3, 'un backlog cuyos WPs solo viven en fences/comentarios no tiene WPs');
  assert.equal(r.resumen.wps, 0);
  assert.match(r.defectos.at(-1).detalle, /bloque de codigo o comentario/);
});

test('celda de WP ilegible (dos IDs, guion unicode) → defecto citado, no omisión', () => {
  const texto = `# B

## Lane A · ALFA

| WP | P | BRIEF | CA | deps | ejes |
| -- | - | ----- | -- | ---- | ---- |
| **FX-A01/FX-A02** | P0 | dos WPs en una fila para ahorrar | el probe devuelve exit 0 sobre la plantilla | ninguna | I |
| FX–B01 | P0 | guion largo unicode en el id | el probe devuelve exit 0 sobre la plantilla | ninguna | I |
`;
  const r = verificarBacklog(texto, configurar({ series: 'FX-[A-Z][0-9]{2}' }));
  assert.equal(r.resumen.porMotivo['id-no-interpretable'], 1);
  assert.equal(r.resumen.porMotivo['campo-ausente'], 1);
  assert.equal(r.exit, 3, '0 WPs de 2 filas: nunca verde');
});

test('BRIEF de una palabra → brief-insuficiente (el BRIEF también se lintea)', () => {
  const texto = `# B

## Lane A · ALFA

| WP | P | BRIEF | CA | deps | ejes |
| -- | - | ----- | -- | ---- | ---- |
| **FX-A01** | P0 | arreglarlo | el probe del consumidor devuelve exit 0 | ninguna | I |
`;
  const r = verificarBacklog(texto, configurar({ series: 'FX-[A-Z][0-9]{2}' }));
  assert.equal(r.resumen.porMotivo['brief-insuficiente'], 1);
});
