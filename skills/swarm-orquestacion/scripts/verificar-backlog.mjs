#!/usr/bin/env node
// ============================================================================
// verificar-backlog.mjs — LINTER de BACKLOG DESPACHABLE
// ----------------------------------------------------------------------------
// Decide si un BACKLOG puede despacharse: cada WP declara los SIETE campos
// (`lane`, `WP`, `BRIEF`, `CA`, `P`, `deps`, `ejes`), la prioridad está en el
// conjunto declarado, las dependencias resuelven y no ciclan, y el CA es
// VERIFICABLE (no ornamental). Marco-agnóstico y sin dependencias (Node ≥18).
//
// Contrato, doctrina y límites honestos: `../reference/backlog-despachable.md`.
// Fixtures de las dos caras: `../examples/fixture-backlog/`.
//
// DOCTRINA — CONCEDER EN FALSO ES PEOR QUE NO TENER LINTER (hereda DC-25/DC-29
// de `proyectar-backlog.mjs`): la AUSENCIA es fallo ruidoso. Fichero vacío,
// backlog sin ninguna tabla de WPs, tabla sin filas o filas que no producen
// ningún WP → exit 3. Un backlog que lintea a cero JAMÁS es despachable.
//
// PARAMETRIZADO (nada cableado a un mundo concreto): rutas, serie(s) de ID,
// conjunto de prioridades, conjunto de ejes, patrón de lane, alias de columnas,
// tokens de «sin dependencias», léxico de CA y umbral de valoración.
//
// Uso:
//   node verificar-backlog.mjs --backlog plan/BACKLOG.md \
//        [--series 'FX-[A-Z]\d{2}'] [--prioridades P0,P1,P2] \
//        [--ejes I,II,III,IV,V,ceguera,hostil-omite,ninguno] \
//        [--deps-externas 'EXT-\d+'] [--ca-estricto] [--json] [--ayuda]
//
// Exit: 0 despachable · 1 defectos · 2 uso/E-S · 3 AUSENCIA (vacío / 0 WPs).
// ============================================================================

import { readFileSync, existsSync, realpathSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// ---------------------------------------------------------------------------
// 1. Léxico y defaults (todo sustituible por el consumidor)
// ---------------------------------------------------------------------------

// Palabras función: no aportan ni comprobación ni objeto.
const STOPWORDS = `a al ante bajo cada como con contra cual cuando cuyo de del desde donde durante e el ella ellas ellos en entre es esa ese eso esos esta estan estas este esto estos ha hacia han hasta hay la las le les lo los mas menos mi mientras misma mismo mucha mucho muy ni no nos o otra otras otro otros para pero por porque que quien se segun ser sera si sin sobre son su sus tambien tan tanto tiene tienen todas todo todos tras tu un una unas unos y ya debe deben puede pueden sea sean solo`.split(/\s+/);

// ANCLAS de verificación: nombran el acto observable que decide (comando,
// gate, probe, conteo, exit, veredicto). Sin ancla, un CA no se puede ejecutar.
const ANCLAS = `falla fallar falle fallo fallan fallara rechaza rechazar rechazado rechaza-se deniega denegar denegado pasa pasar pasan supera verde rojo exit exitcode salida stdout stderr comando script gate gates probe probes prueba pruebas test tests suite fixture fixtures caso casos grep conteo cuenta contador contar build compila ci run-id checksum hash sha snapshot assert verifica verificar verificado verificada verificable comprueba comprobar comprobado mide medir medida ejecuta ejecutar ejecutado reproduce reproducible npm node bash diff log retorna devuelve aborta abortar bloquea bloquear lock hits ocurrencias dry-run cero`.split(/\s+/);

// VALORACIONES: juicios sobre el resultado. Describen una impresión, no una
// comprobación. Su presencia no está prohibida; su DOMINANCIA sí.
const ORNAMENTALES = `elegante elegancia bonito bonita bello bella precioso limpio limpia limpieza pulido pulida pulcro prolijo mejor mejores mejora mejorar mejorado mejorada optimo optima optimizado optimizada calidad robusto robusta robustez solido solida solidez adecuado adecuada correcto correcta correctamente coherente coherencia claro clara claridad legible legibilidad sencillo sencilla simple simplificado razonable aceptable consistente consistencia decente apropiado apropiada satisfactorio suficiente bueno buena buen bien revisa revisar revisado revision repasa repasar queda quedar quede luce parece agradable amigable intuitivo usable moderno profesional estetico estetica presentable armonioso fluido comodo ordenado ordenada organizado organizada`.split(/\s+/);

// Valores MARCADORES: la celda existe pero no dice nada.
const VACIAS = `- -- --- — – ? ?? ??? . .. ... … * _ tbd todo wip pendiente n/a na x xx xxx idem varios ver`.split(/\s+/);
const VACIAS_FRASE = ['por definir', 'sin definir', 'a definir', 'por concretar', 'ver arriba', 'ver abajo', 'como arriba', 'sin especificar'];

const ALIAS = {
  wp: ['wp', 'id', 'wp id'],
  p: ['p', 'prioridad', 'prio'],
  brief: ['brief', 'descripcion', 'resumen', 'encargo', 'objeto'],
  ca: ['ca', 'ca tentativo', 'ca minimo', 'criterio', 'criterios', 'criterio de aceptacion', 'criterios de aceptacion', 'aceptacion'],
  deps: ['deps', 'dependencias', 'depende de', 'depende', 'dep'],
  ejes: ['ejes', 'eje', 'eje ca', 'ejes ca', 'eje(s)', 'eje(s) ca'],
  lane: ['lane', 'carril', 'via'],
};

export const DEFAULTS = {
  backlog: 'plan/BACKLOG.md',
  series: 'WP-[A-Za-z0-9]+',
  prioridades: ['P0', 'P1', 'P2'],
  ejes: ['I', 'II', 'III', 'IV', 'V', 'ceguera', 'hostil-omite', 'ninguno'],
  patronLane: '^#{1,6}\\s*(?:lane|carril)\\b[\\s·:.\\-]*(.*)$',
  sinDeps: ['ninguna', 'ninguno', 'sin-deps', 'sin deps', 'none'],
  depsExternas: '', // regex; '' = ninguna dependencia externa permitida
  umbralValoracion: 0.5,
  minPalabrasBrief: 3,
  caEstricto: false,
  alias: ALIAS,
  lexico: { stopwords: STOPWORDS, anclas: ANCLAS, ornamentales: ORNAMENTALES, vacias: VACIAS, vaciasFrase: VACIAS_FRASE },
};

// Campos exigidos por WP (el orden es el del reporte).
export const CAMPOS = ['lane', 'WP', 'BRIEF', 'CA', 'P', 'deps', 'ejes'];

// ---------------------------------------------------------------------------
// 2. Utilidades de texto
// ---------------------------------------------------------------------------

const sinAcentos = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
const norm = (s) => sinAcentos(String(s || '')).toLowerCase().trim();

/** Quita énfasis markdown, backticks y marcas de estado de una celda. */
function limpiarCelda(s) {
  return String(s || '')
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{23E9}-\u{23FA}\u{FE0F}]/gu, ' ')
    .replace(/\*\*/g, '')
    .replace(/(^|\s)\*(\S)/g, '$1$2')
    .replace(/`/g, '')
    .replace(/\\\|/g, '|')
    .replace(/\s+/g, ' ')
    .trim();
}

/** ¿La celda es un marcador vacío (`—`, `?`, `TBD`, `por definir`…)? */
function esMarcador(valor, lex) {
  const v = norm(limpiarCelda(valor));
  if (!v) return true;
  if (lex.vacias.includes(v)) return true;
  if (lex.vaciasFrase.includes(v)) return true;
  return /^[\s\-–—.·?*_…]+$/.test(v);
}

/** Tokeniza para el análisis de CA/BRIEF: palabras, cantidades y rutas. */
export function tokenizar(texto) {
  const plano = norm(texto);
  const brutos = plano.match(/[a-z0-9][a-z0-9_.:/\\-]*/g) || [];
  return brutos.map((t) => t.replace(/[.:,;]+$/, '')).filter(Boolean);
}

function clasificarToken(t, lex) {
  if (lex.stopwords.includes(t)) return 'vacia';
  if (lex.ornamentales.includes(t)) return 'valoracion';
  if (lex.anclas.includes(t)) return 'ancla';
  if (/^\d+([.,]\d+)?%?$/.test(t)) return 'ancla'; // cantidad pura: 0, 1, 100%
  return 'contenido';
}

// ---------------------------------------------------------------------------
// 3. EL CORAZÓN: ¿es este CA verificable o es ornamental?
// ---------------------------------------------------------------------------
//
// Un CA es DESPACHABLE cuando nombra las dos mitades de una comprobación:
//
//   (1) ANCLA  — el acto observable que decide: un comando, un gate, un probe,
//                una fixture, un conteo, un exit, un veredicto («falla»,
//                «deniega», «pasa»), una cantidad o un comparador.
//   (2) OBJETO — sobre QUÉ recae: al menos una palabra de contenido que no sea
//                ancla, ni valoración, ni palabra función.
//
// Es ORNAMENTAL cuando falta cualquiera de las dos, o cuando el juicio de valor
// DOMINA el enunciado (ratio de valoraciones ≥ umbral). Ornamental = describe
// una impresión sobre el resultado; nadie puede ejecutarlo ni verlo dar rojo.
//
// Motivos (estables, grepables):
//   CA-ornamental/valoracion   la valoración domina («queda elegante»)
//   CA-ornamental/sin-ancla    no nombra ninguna comprobación
//   CA-ornamental/sin-objeto   comprueba… ¿el qué? («el test pasa»)
//   CA-ornamental/sin-referente  (solo --ca-estricto) sin comando/ruta/cantidad
//
export function analizarCA(texto, cfg = configurar()) {
  const lex = cfg.lexico;
  const toks = tokenizar(texto);
  const clas = toks.map((t) => [t, clasificarToken(t, lex)]);
  const valoraciones = clas.filter(([, c]) => c === 'valoracion').map(([t]) => t);
  const anclas = clas.filter(([, c]) => c === 'ancla').map(([t]) => t);
  const contenido = clas.filter(([, c]) => c === 'contenido').map(([t]) => t);
  // Comparadores explícitos (`= 0`, `≥ 1`, `≠ 0`) cuentan como ancla aunque el
  // tokenizador descarte el símbolo.
  if (/[=≥≤≠<>]\s*\d/.test(texto)) anclas.push('comparador');

  const significativos = valoraciones.length + anclas.length + contenido.length;
  const ratio = significativos ? valoraciones.length / significativos : 0;
  const base = { valoraciones, anclas, contenido, ratio: Number(ratio.toFixed(3)) };
  const cita = limpiarCelda(texto);

  if (valoraciones.length && ratio >= cfg.umbralValoracion) {
    return {
      ...base,
      ok: false,
      motivo: 'CA-ornamental/valoracion',
      detalle:
        `la valoracion domina el CA (${valoraciones.length}/${significativos} = ${base.ratio} >= ${cfg.umbralValoracion}): ` +
        `«${valoraciones.join('», «')}». Anclas de verificacion: ${anclas.length ? anclas.join(', ') : '(ninguna)'}. ` +
        `CA citado: «${cita}»`,
    };
  }
  if (anclas.length === 0) {
    return {
      ...base,
      ok: false,
      motivo: 'CA-ornamental/sin-ancla',
      detalle:
        'el CA no nombra ninguna comprobacion observable (comando, gate, probe, fixture, conteo, exit, ' +
        `veredicto falla/deniega/pasa, cantidad o comparador). CA citado: «${cita}»`,
    };
  }
  if (contenido.length === 0) {
    return {
      ...base,
      ok: false,
      motivo: 'CA-ornamental/sin-objeto',
      detalle:
        `el CA nombra la comprobacion (${anclas.join(', ')}) pero no su OBJETO: no dice sobre que recae. ` +
        `CA citado: «${cita}»`,
    };
  }
  if (cfg.caEstricto && !tieneReferenteFuerte(texto)) {
    return {
      ...base,
      ok: false,
      motivo: 'CA-ornamental/sin-referente',
      detalle:
        'modo --ca-estricto: el CA no cita ningun referente fuerte (codigo entre backticks, ruta/fichero, ' +
        `cantidad o comparador). CA citado: «${cita}»`,
    };
  }
  return { ...base, ok: true, motivo: null, detalle: null };
}

function tieneReferenteFuerte(texto) {
  if (/`[^`]+`/.test(texto)) return true;
  if (/[\w.-]+\.(?:md|mjs|cjs|js|ts|json|ya?ml|sh|toml|lock)\b/i.test(texto)) return true;
  if (/(?:^|[\s(])[\w.-]+\/[\w.-]/.test(texto)) return true;
  if (/(?:^|\s)\d+([.,]\d+)?%?(?:\s|$)/.test(texto)) return true;
  if (/[=≥≤≠]\s*\d/.test(texto)) return true;
  return false;
}

// ---------------------------------------------------------------------------
// 4. Parseo del BACKLOG (formato despachable = tabla con columna de ID)
// ---------------------------------------------------------------------------

const esFilaTabla = (l) => /^\s*\|.*\|\s*$/.test(l);
const esSeparador = (l) => typeof l === 'string' && /^\s*\|[\s:|-]+\|\s*$/.test(l) && /-/.test(l);

function celdas(linea) {
  return linea
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split(/(?<!\\)\|/)
    .map((c) => c.trim());
}

function resolverColumnas(cabeceras, alias) {
  const mapa = {};
  cabeceras.forEach((raw, idx) => {
    const clave = norm(limpiarCelda(raw)).replace(/[:]+$/, '');
    for (const [campo, nombres] of Object.entries(alias)) {
      if (nombres.includes(clave) && mapa[campo] === undefined) mapa[campo] = idx;
    }
  });
  return mapa;
}

// Token con forma de ID (para cazar series NO declaradas, igual que el parser
// de proyección): prefijo alfanumérico + `-` + cola que contiene un dígito.
const FORMA_ID = /^([A-Za-z][A-Za-z0-9]*-[A-Za-z0-9.\-]*\d[A-Za-z0-9.\-]*)/;

function extraerId(celda, reSerie) {
  const limpio = limpiarCelda(celda);
  if (!limpio) return { id: null, token: null, roto: false };
  const primero = limpio.split(/[\s·,;]+/)[0];
  if (reSerie.test(primero)) return { id: primero, token: primero, roto: false };
  const forma = primero.match(FORMA_ID);
  if (!forma) return { id: null, token: null, roto: false };
  // Token con forma de ID: ¿es de serie DECLARADA pero la celda lo enturbia
  // (`FX-A01/FX-A02`, `FX-A01bis`)? Entonces la celda es ilegible, no ajena.
  return { id: null, token: forma[1], roto: reSerie.test(forma[1]) };
}

/**
 * Oculta lo que el lector del backlog tampoco ve: bloques de código y
 * comentarios HTML. Un WP escondido en un fence o comentado NO cuenta como
 * despachable (y una tabla de ejemplo dentro de un fence no salva a un backlog
 * sin WPs reales). Se blanquea la línea para conservar la numeración.
 */
function velarNoVisible(lineas, stats) {
  let enFence = false;
  let enComentario = false;
  return lineas.map((l) => {
    if (/^\s*(?:```|~~~)/.test(l)) {
      enFence = !enFence;
      stats.lineasOcultas++;
      return '';
    }
    if (enFence) {
      stats.lineasOcultas++;
      return '';
    }
    let linea = l.replace(/<!--.*?-->/g, '');
    if (enComentario) {
      stats.lineasOcultas++;
      if (/-->/.test(linea)) {
        enComentario = false;
        linea = linea.replace(/^[\s\S]*?-->/, '');
        return linea;
      }
      return '';
    }
    if (/<!--/.test(linea)) {
      enComentario = true;
      stats.lineasOcultas++;
      return linea.replace(/<!--[\s\S]*$/, '');
    }
    return linea;
  });
}

/**
 * Parsea el backlog. Devuelve WPs, defectos estructurales y estadísticas de
 * AUSENCIA (para que un backlog que lintea a cero nunca pase en silencio).
 */
export function parsearBacklog(texto, cfg = configurar()) {
  const laneRe = new RegExp(cfg.patronLane, 'i');
  const reSerie = new RegExp(`^(?:${cfg.series})$`);
  const defectos = [];
  const wps = [];
  const stats = { tablasWp: 0, tablasIgnoradas: 0, filasDato: 0, filasVacias: 0, lineasLista: 0, lineasOcultas: 0 };
  const lineas = velarNoVisible(texto.split(/\r?\n/), stats);

  let lane = null;
  let i = 0;
  while (i < lineas.length) {
    const l = lineas[i];
    if (/^\s*#{1,6}\s/.test(l)) {
      const m = l.match(laneRe);
      lane = m ? limpiarCelda(m[1]) || limpiarCelda(l.replace(/^\s*#+\s*/, '')) : null;
      i++;
      continue;
    }
    if (/^\s*[-*]\s+/.test(l)) stats.lineasLista++;
    if (esFilaTabla(l) && esSeparador(lineas[i + 1])) {
      const cabeceras = celdas(l);
      const mapa = resolverColumnas(cabeceras, cfg.alias);
      const filas = [];
      let j = i + 2;
      while (j < lineas.length && esFilaTabla(lineas[j])) {
        if (!esSeparador(lineas[j])) filas.push({ celdas: celdas(lineas[j]), n: j + 1, raw: lineas[j] });
        j++;
      }
      if (mapa.wp === undefined) {
        stats.tablasIgnoradas++;
        // Contrabando: una fila con ID de serie declarada escondida en una
        // tabla que NO declara columna de WP quedaría fuera del lint.
        for (const fila of filas) {
          const { id } = extraerId(fila.celdas[0] || '', reSerie);
          if (id) {
            defectos.push({
              wp: id,
              campo: 'WP',
              motivo: 'fila-fuera-de-tabla-wp',
              linea: fila.n,
              detalle:
                `la fila declara el ID «${id}» (serie declarada) en una tabla SIN columna de WP ` +
                `(cabecera linea ${i + 1}: ${cabeceras.join(' | ')}). Ningun WP puede vivir fuera de la tabla de WPs.`,
            });
          }
        }
      } else {
        stats.tablasWp++;
        for (const fila of filas) {
          if (fila.celdas.every((c) => !limpiarCelda(c))) {
            stats.filasVacias++;
            continue;
          }
          stats.filasDato++;
          procesarFila(fila, mapa, lane, cfg, reSerie, wps, defectos, cabeceras, i + 1);
        }
      }
      i = j;
      continue;
    }
    i++;
  }
  return { wps, defectos, stats };
}

function procesarFila(fila, mapa, laneHeading, cfg, reSerie, wps, defectos, cabeceras, cabeceraLinea) {
  const celda = (campo) => (mapa[campo] === undefined ? undefined : fila.celdas[mapa[campo]]);
  const { id, token, roto } = extraerId(celda('wp') || '', reSerie);

  if (!id) {
    if (roto) {
      defectos.push({
        wp: token,
        campo: 'WP',
        motivo: 'id-no-interpretable',
        linea: fila.n,
        detalle:
          `la celda de WP contiene el ID declarado «${token}» pero no se puede interpretar como un unico ID: ` +
          `«${limpiarCelda(celda('wp'))}». Un ID por fila, literal.`,
      });
    } else if (token) {
      defectos.push({
        wp: token,
        campo: 'WP',
        motivo: 'serie-no-declarada',
        linea: fila.n,
        detalle:
          `el ID «${token}» tiene forma de ID pero NO pertenece a ninguna serie declarada ` +
          `(--series '${cfg.series}'). Declara la serie o corrige el ID; no se lintea en silencio.`,
      });
    } else {
      defectos.push({
        wp: `(linea ${fila.n})`,
        campo: 'WP',
        motivo: 'campo-ausente',
        linea: fila.n,
        detalle: `fila de la tabla de WPs (cabecera linea ${cabeceraLinea}) sin ID: «${fila.raw.trim()}»`,
      });
    }
    return;
  }
  if (wps.some((w) => w.id === id)) {
    defectos.push({
      wp: id,
      campo: 'WP',
      motivo: 'id-duplicado',
      linea: fila.n,
      detalle: `el ID «${id}» ya estaba declarado en la linea ${wps.find((w) => w.id === id).linea}`,
    });
    return;
  }

  const lane = mapa.lane !== undefined ? limpiarCelda(celda('lane')) : laneHeading;
  const wp = {
    id,
    linea: fila.n,
    lane,
    p: mapa.p === undefined ? undefined : celda('p'),
    brief: mapa.brief === undefined ? undefined : celda('brief'),
    ca: mapa.ca === undefined ? undefined : celda('ca'),
    deps: mapa.deps === undefined ? undefined : celda('deps'),
    ejes: mapa.ejes === undefined ? undefined : celda('ejes'),
  };

  // --- campos ausentes / marcadores vacíos ---
  const presencia = [
    ['lane', wp.lane, mapa.lane !== undefined || laneHeading !== null],
    ['P', wp.p, mapa.p !== undefined],
    ['BRIEF', wp.brief, mapa.brief !== undefined],
    ['CA', wp.ca, mapa.ca !== undefined],
    ['deps', wp.deps, mapa.deps !== undefined],
    ['ejes', wp.ejes, mapa.ejes !== undefined],
  ];
  for (const [campo, valor, declarado] of presencia) {
    if (!declarado) {
      defectos.push({
        wp: id,
        campo,
        motivo: 'columna-requerida-ausente',
        linea: fila.n,
        detalle:
          campo === 'lane'
            ? `sin columna «lane» y sin encabezado de lane que cubra la fila (patron ${cfg.patronLane})`
            : `la tabla (cabecera linea ${cabeceraLinea}: ${cabeceras.join(' | ')}) no declara la columna «${campo}»`,
      });
      continue;
    }
    if (esMarcador(valor, cfg.lexico)) {
      defectos.push({
        wp: id,
        campo,
        motivo: 'campo-ausente',
        linea: fila.n,
        detalle: `el campo «${campo}» esta vacio o es un marcador sin contenido: «${limpiarCelda(valor)}»`,
      });
    }
  }

  // --- prioridad dentro del conjunto declarado ---
  if (wp.p !== undefined && !esMarcador(wp.p, cfg.lexico)) {
    const p = limpiarCelda(wp.p);
    if (!cfg.prioridades.some((x) => norm(x) === norm(p))) {
      defectos.push({
        wp: id,
        campo: 'P',
        motivo: 'prioridad-invalida',
        linea: fila.n,
        detalle: `prioridad «${p}» fuera del conjunto declarado {${cfg.prioridades.join(', ')}}`,
      });
    }
  }

  // --- ejes dentro del conjunto declarado ---
  if (wp.ejes !== undefined && !esMarcador(wp.ejes, cfg.lexico)) {
    const tokensEjes = limpiarCelda(wp.ejes).split(/[\s,;+/·]+/).filter(Boolean);
    for (const t of tokensEjes) {
      if (!cfg.ejes.some((x) => norm(x) === norm(t))) {
        defectos.push({
          wp: id,
          campo: 'ejes',
          motivo: 'eje-desconocido',
          linea: fila.n,
          detalle: `eje «${t}» fuera del conjunto declarado {${cfg.ejes.join(', ')}}`,
        });
      }
    }
  }

  // --- BRIEF con contenido real ---
  if (wp.brief !== undefined && !esMarcador(wp.brief, cfg.lexico)) {
    const sig = tokenizar(wp.brief).filter((t) => !cfg.lexico.stopwords.includes(t));
    if (sig.length < cfg.minPalabrasBrief) {
      defectos.push({
        wp: id,
        campo: 'BRIEF',
        motivo: 'brief-insuficiente',
        linea: fila.n,
        detalle: `el BRIEF tiene ${sig.length} palabra(s) significativa(s), minimo ${cfg.minPalabrasBrief}: «${limpiarCelda(wp.brief)}»`,
      });
    }
  }

  // --- CA verificable (el corazón) ---
  if (wp.ca !== undefined && !esMarcador(wp.ca, cfg.lexico)) {
    const an = analizarCA(wp.ca, cfg);
    if (!an.ok) defectos.push({ wp: id, campo: 'CA', motivo: an.motivo, linea: fila.n, detalle: an.detalle });
  }

  // --- deps: se declaran SIEMPRE, incluso para decir «ninguna» ---
  wp.depsIds = [];
  if (wp.deps !== undefined && !esMarcador(wp.deps, cfg.lexico)) {
    const crudo = limpiarCelda(wp.deps);
    if (!cfg.sinDeps.some((x) => norm(x) === norm(crudo))) {
      const tokensDeps = crudo.split(/[\s,;+/·→>]+/).filter(Boolean);
      for (const t of tokensDeps) {
        if (cfg.sinDeps.some((x) => norm(x) === norm(t))) continue;
        wp.depsIds.push(t);
      }
    }
  }
  wps.push(wp);
}

// ---------------------------------------------------------------------------
// 5. Grafo de dependencias: existencia + ciclos concretos
// ---------------------------------------------------------------------------

export function detectarCiclos(wps) {
  const grafo = new Map(wps.map((w) => [w.id, (w.depsIds || []).filter((d) => wps.some((x) => x.id === d))]));
  const ciclos = [];
  const vistos = new Set();
  const estado = new Map(); // 0 = en pila, 1 = cerrado
  const pila = [];

  function dfs(nodo) {
    estado.set(nodo, 0);
    pila.push(nodo);
    for (const sig of grafo.get(nodo) || []) {
      if (!estado.has(sig)) {
        dfs(sig);
      } else if (estado.get(sig) === 0) {
        const desde = pila.indexOf(sig);
        const ciclo = pila.slice(desde);
        const clave = canonizarCiclo(ciclo);
        if (!vistos.has(clave)) {
          vistos.add(clave);
          ciclos.push([...ciclo, sig]);
        }
      }
    }
    pila.pop();
    estado.set(nodo, 1);
  }
  for (const w of wps) if (!estado.has(w.id)) dfs(w.id);
  return ciclos;
}

function canonizarCiclo(ciclo) {
  const min = ciclo.reduce((a, b) => (a < b ? a : b));
  const idx = ciclo.indexOf(min);
  return [...ciclo.slice(idx), ...ciclo.slice(0, idx)].join('>');
}

function verificarDeps(wps, cfg, defectos) {
  const ids = new Set(wps.map((w) => w.id));
  const reExterna = cfg.depsExternas ? new RegExp(`^(?:${cfg.depsExternas})$`) : null;
  for (const w of wps) {
    for (const d of w.depsIds || []) {
      if (ids.has(d)) continue;
      if (reExterna && reExterna.test(d)) continue;
      defectos.push({
        wp: w.id,
        campo: 'deps',
        motivo: 'dep-inexistente',
        linea: w.linea,
        detalle:
          `depende de «${d}», que no es ningun WP del backlog` +
          (cfg.depsExternas ? ` ni casa con --deps-externas '${cfg.depsExternas}'` : ' (no hay dependencias externas permitidas: --deps-externas)'),
      });
    }
  }
  for (const ciclo of detectarCiclos(wps)) {
    const cabeza = ciclo[0];
    defectos.push({
      wp: cabeza,
      campo: 'deps',
      motivo: 'dep-ciclo',
      linea: (wps.find((w) => w.id === cabeza) || {}).linea,
      detalle: `dependencia circular (${ciclo.length - 1} WP): ${ciclo.join(' -> ')}`,
    });
  }
}

// ---------------------------------------------------------------------------
// 6. Veredicto
// ---------------------------------------------------------------------------

export function verificarBacklog(texto, cfg = configurar()) {
  const defectos = [];
  const resumen = { wps: 0, defectos: 0, porMotivo: {} };

  if (!texto || !texto.trim()) {
    defectos.push({
      wp: '(backlog)',
      campo: 'WP',
      motivo: 'backlog-vacio',
      linea: 0,
      detalle: 'el fichero esta vacio (0 caracteres utiles): no hay nada que despachar. Nunca es verde.',
    });
    return finalizar({ ok: false, exit: 3, defectos, resumen, wps: [], stats: null });
  }

  const { wps, defectos: dParse, stats } = parsearBacklog(texto, cfg);
  defectos.push(...dParse);
  verificarDeps(wps, cfg, defectos);

  if (wps.length === 0) {
    let detalle;
    if (stats.tablasWp === 0 && stats.tablasIgnoradas === 0) {
      detalle =
        `0 WPs: el backlog no contiene NINGUNA tabla. ${stats.lineasLista} linea(s) de lista detectada(s). ` +
        'El formato despachable es una tabla con columna de WP (ver reference/backlog-despachable.md). ' +
        'Ruta equivocada, fichero truncado o formato ajeno: no se concede en verde.';
    } else if (stats.tablasWp === 0) {
      detalle =
        `0 WPs: hay ${stats.tablasIgnoradas} tabla(s) pero NINGUNA declara columna de WP ` +
        `(alias aceptados: ${cfg.alias.wp.join(', ')}).`;
    } else if (stats.filasDato === 0) {
      detalle = `0 WPs: hay ${stats.tablasWp} tabla(s) de WPs pero SIN filas de datos (cabecera y separador solos).`;
    } else {
      detalle =
        `0 WPs de ${stats.filasDato} fila(s) de datos: ninguna fila produjo un WP valido ` +
        '(ID ausente o de serie no declarada). Revisa --series.';
    }
    if (stats.lineasOcultas) {
      detalle +=
        ` Ademas se ignoraron ${stats.lineasOcultas} linea(s) por estar en bloque de codigo o comentario HTML: ` +
        'lo que el lector no ve tampoco se despacha.';
    }
    defectos.push({ wp: '(backlog)', campo: 'WP', motivo: 'sin-wps', linea: 0, detalle });
    return finalizar({ ok: false, exit: 3, defectos, resumen, wps, stats });
  }

  const exit = defectos.length ? 1 : 0;
  return finalizar({ ok: exit === 0, exit, defectos, resumen, wps, stats });
}

function finalizar(r) {
  r.resumen.wps = r.wps.length;
  r.resumen.defectos = r.defectos.length;
  for (const d of r.defectos) r.resumen.porMotivo[d.motivo] = (r.resumen.porMotivo[d.motivo] || 0) + 1;
  r.defectos.sort((a, b) => (a.linea || 0) - (b.linea || 0) || String(a.wp).localeCompare(String(b.wp)));
  return r;
}

// ---------------------------------------------------------------------------
// 7. Configuración (CLI + env)
// ---------------------------------------------------------------------------

export function configurar(over = {}, argv = [], env = {}) {
  const has = (f) => argv.includes(f);
  const val = (f, d) => {
    const i = argv.indexOf(f);
    return i >= 0 && argv[i + 1] !== undefined ? argv[i + 1] : d;
  };
  const lista = (s) => String(s).split(/[,;]/).map((x) => x.trim()).filter(Boolean);

  const cfg = {
    ...DEFAULTS,
    backlog: val('--backlog', env.BACKLOG_RUTA || DEFAULTS.backlog),
    series: val('--series', env.BACKLOG_SERIES || DEFAULTS.series),
    prioridades: lista(val('--prioridades', env.BACKLOG_PRIORIDADES || DEFAULTS.prioridades.join(','))),
    ejes: lista(val('--ejes', env.BACKLOG_EJES || DEFAULTS.ejes.join(','))),
    patronLane: val('--patron-lane', env.BACKLOG_PATRON_LANE || DEFAULTS.patronLane),
    sinDeps: lista(val('--sin-deps', env.BACKLOG_SIN_DEPS || DEFAULTS.sinDeps.join(','))),
    depsExternas: val('--deps-externas', env.BACKLOG_DEPS_EXTERNAS || DEFAULTS.depsExternas),
    umbralValoracion: Number(val('--umbral-valoracion', env.BACKLOG_UMBRAL || DEFAULTS.umbralValoracion)),
    minPalabrasBrief: Number(val('--min-palabras-brief', env.BACKLOG_MIN_BRIEF || DEFAULTS.minPalabrasBrief)),
    caEstricto: has('--ca-estricto') || env.BACKLOG_CA_ESTRICTO === '1',
    alias: { ...DEFAULTS.alias },
    lexico: { ...DEFAULTS.lexico },
    json: has('--json'),
  };

  // Léxico y alias sustituibles por fichero JSON del consumidor.
  const rutaLexico = val('--lexico', env.BACKLOG_LEXICO || '');
  if (rutaLexico) {
    const extra = JSON.parse(readFileSync(rutaLexico, 'utf-8'));
    const modo = val('--lexico-modo', 'extender');
    for (const clave of Object.keys(cfg.lexico)) {
      if (!extra[clave]) continue;
      cfg.lexico[clave] = modo === 'reemplazar' ? extra[clave] : [...cfg.lexico[clave], ...extra[clave]];
    }
  }
  const rutaAlias = val('--alias', env.BACKLOG_ALIAS || '');
  if (rutaAlias) {
    const extra = JSON.parse(readFileSync(rutaAlias, 'utf-8'));
    const modo = val('--alias-modo', 'extender');
    for (const campo of Object.keys(cfg.alias)) {
      if (!extra[campo]) continue;
      cfg.alias[campo] = modo === 'reemplazar' ? extra[campo].map(norm) : [...cfg.alias[campo], ...extra[campo].map(norm)];
    }
  }
  Object.assign(cfg, over);
  return cfg;
}

const AYUDA = `verificar-backlog.mjs — linter de BACKLOG despachable

  --backlog RUTA            fichero a lintear (def. plan/BACKLOG.md)
  --series REGEX|REGEX      serie(s) de ID del mundo (def. WP-[A-Za-z0-9]+)
  --prioridades P0,P1,P2    conjunto de prioridades admitido
  --ejes I,II,...           conjunto de ejes de CA admitido
  --patron-lane REGEX       encabezado que abre una lane (grupo 1 = nombre)
  --sin-deps ninguna,none   tokens que declaran «sin dependencias»
  --deps-externas REGEX     IDs permitidos fuera del backlog (def. ninguno)
  --umbral-valoracion 0.5   ratio de valoracion que vuelve ornamental un CA
  --min-palabras-brief 3    minimo de palabras significativas del BRIEF
  --ca-estricto             exige ademas referente fuerte en el CA
  --lexico F.json [--lexico-modo extender|reemplazar]
  --alias  F.json [--alias-modo  extender|reemplazar]
  --json                    reporte en JSON
  --ayuda

Exit: 0 despachable · 1 defectos · 2 uso/E-S · 3 AUSENCIA (vacio / 0 WPs).
Doctrina y limites: reference/backlog-despachable.md`;

// ---------------------------------------------------------------------------
// 8. CLI
// ---------------------------------------------------------------------------

function imprimir(r, cfg) {
  if (cfg.json) {
    console.log(JSON.stringify({ ok: r.ok, exit: r.exit, resumen: r.resumen, defectos: r.defectos, wps: r.wps.map((w) => ({ id: w.id, lane: w.lane, p: limpiarCelda(w.p), deps: w.depsIds })) }, null, 2));
    return;
  }
  console.log(`[verificar-backlog] ${cfg.backlog} · ${r.resumen.wps} WP · ${r.resumen.defectos} defecto(s)`);
  for (const d of r.defectos) {
    console.log(`  x ${d.wp} · campo ${d.campo} · ${d.motivo} · linea ${d.linea}`);
    console.log(`      ${d.detalle}`);
  }
  if (r.resumen.defectos) {
    const porMotivo = Object.entries(r.resumen.porMotivo).map(([m, n]) => `${m}=${n}`).join(' · ');
    console.log(`[verificar-backlog] NO DESPACHABLE · ${porMotivo}`);
  } else {
    console.log('[verificar-backlog] DESPACHABLE: los 7 campos declarados, prioridades y ejes en conjunto, deps sin ciclos, CA verificables.');
  }
}

const invocado = process.argv[1] ? realpathSync(process.argv[1]) : '';
const esMain = invocado && realpathSync(fileURLToPath(import.meta.url)) === invocado;
if (esMain) {
  const argv = process.argv.slice(2);
  if (argv.includes('--ayuda') || argv.includes('-h') || argv.includes('--help')) {
    console.log(AYUDA);
    process.exit(0);
  }
  let cfg;
  try {
    cfg = configurar({}, argv, process.env);
  } catch (e) {
    console.error(`[verificar-backlog] configuracion invalida: ${e.message}`);
    process.exit(2);
  }
  if (!existsSync(cfg.backlog)) {
    console.error(`[verificar-backlog] BACKLOG inexistente: ${cfg.backlog} (motivo backlog-ausente). Un backlog que no se puede leer NO es despachable.`);
    process.exit(2);
  }
  let texto;
  try {
    texto = readFileSync(cfg.backlog, 'utf-8');
  } catch (e) {
    console.error(`[verificar-backlog] no se pudo leer ${cfg.backlog}: ${e.message}`);
    process.exit(2);
  }
  const r = verificarBacklog(texto, cfg);
  imprimir(r, cfg);
  process.exit(r.exit);
}
