#!/usr/bin/env node
// Gate local de dependencias runtime. Determinista, sin red y sin paquetes
// externos: usa únicamente built-ins de Node >=22.

import { builtinModules } from 'node:module';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const POLICIES = new Set(['exact', 'caret-semver', 'major-band']);
const CORE = '(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)';
const EXACT_RE = new RegExp(
  `^${CORE}(?:-[0-9A-Za-z-]+(?:\\.[0-9A-Za-z-]+)*)?(?:\\+[0-9A-Za-z-]+(?:\\.[0-9A-Za-z-]+)*)?$`,
);
const CARET_RE = new RegExp(`^\\^${CORE}$`);
const BAND_RE = new RegExp(`^>=${CORE} <${CORE}$`);
const BUILTINS = new Set(
  builtinModules.flatMap((name) => [name, `node:${name}`]),
);

function failInput(message) {
  console.error(`[dependencias-semver] CONFIG: ${message}`);
  process.exitCode = 2;
}

function packageName(specifier) {
  if (BUILTINS.has(specifier)) return null;
  if (specifier.startsWith('.') || specifier.startsWith('/')) return null;
  if (specifier.startsWith('@')) {
    const parts = specifier.split('/');
    return parts.length >= 2 ? `${parts[0]}/${parts[1]}` : specifier;
  }
  return specifier.split('/')[0];
}

function parseRange(range, policy) {
  let match;
  if (policy === 'exact') match = range.match(EXACT_RE);
  if (policy === 'caret-semver') match = range.match(CARET_RE);
  if (policy === 'major-band') {
    match = range.match(BAND_RE);
    if (match) {
      const minimum = match.slice(1, 4).map(Number);
      const maximum = match.slice(4, 7).map(Number);
      if (
        maximum[0] !== minimum[0] + 1 ||
        maximum[1] !== 0 ||
        maximum[2] !== 0
      ) {
        return { valid: false };
      }
    }
  }
  if (!match) return { valid: false };
  return {
    valid: true,
    major: Number(match[1]),
    minimum: `${match[1]}.${match[2]}.${match[3]}`,
  };
}

function stringArray(config, field) {
  const value = config[field] ?? [];
  if (!Array.isArray(value) || value.some((item) => typeof item !== 'string')) {
    throw new Error(`"${field}" debe ser un array de strings`);
  }
  return value;
}

async function loadJson(path, label) {
  try {
    return JSON.parse(await readFile(path, 'utf8'));
  } catch (error) {
    throw new Error(`${label} no se pudo leer como JSON (${path}): ${error.message}`);
  }
}

export function verify(packageJson, config) {
  if (!packageJson || typeof packageJson !== 'object') {
    throw new Error('package.json debe ser un objeto');
  }
  if (!config || typeof config !== 'object' || Array.isArray(config)) {
    throw new Error('la configuración debe ser un objeto');
  }

  const defaultPolicy = config.defaultPolicy ?? 'exact';
  if (!POLICIES.has(defaultPolicy)) {
    throw new Error(`defaultPolicy desconocida: ${defaultPolicy}`);
  }
  const overrides = config.policies ?? {};
  if (
    typeof overrides !== 'object' ||
    Array.isArray(overrides) ||
    Object.values(overrides).some((policy) => !POLICIES.has(policy))
  ) {
    throw new Error('"policies" contiene una política desconocida');
  }

  const runtimeImports = stringArray(config, 'runtimeImports');
  const allow = new Set(stringArray(config, 'allow'));
  const deny = new Set(stringArray(config, 'deny'));
  const integrationTested = new Set(stringArray(config, 'integrationTested'));
  const direct = {
    ...(packageJson.dependencies ?? {}),
    ...(packageJson.optionalDependencies ?? {}),
  };
  const errors = [];
  const warnings = [];

  for (const [name, range] of Object.entries(direct)) {
    if (typeof range !== 'string') {
      errors.push(`${name}: el rango debe ser string`);
      continue;
    }
    if (deny.has(name)) errors.push(`${name}: dependencia denegada`);
    if (allow.size > 0 && !allow.has(name)) {
      errors.push(`${name}: no figura en allow`);
    }

    const policy = overrides[name] ?? defaultPolicy;
    const parsed = parseRange(range, policy);
    if (!parsed.valid) {
      errors.push(`${name}: "${range}" incumple ${policy}`);
      continue;
    }
    if (parsed.major === 0) {
      warnings.push(
        `${name}@${range}: 0.x puede incluir cambios incompatibles; requiere test de integración`,
      );
      if (!integrationTested.has(name)) {
        errors.push(`${name}: falta evidencia en integrationTested para 0.x`);
      }
    }
  }

  for (const specifier of runtimeImports) {
    const name = packageName(specifier);
    if (name === null) continue;
    if (!name || /^(?:https?:|git(?:\+|:)|file:|link:|workspace:|npm:)/.test(name)) {
      errors.push(`${specifier}: import runtime inválido`);
      continue;
    }
    if (!(name in direct)) {
      const location =
        name in (packageJson.devDependencies ?? {})
          ? 'solo está en devDependencies'
          : 'no está declarada';
      errors.push(`${name}: dependencia runtime no directa (${location})`);
    }
  }

  for (const name of integrationTested) {
    if (!(name in direct)) {
      errors.push(`${name}: integrationTested no corresponde a una dependencia directa`);
    }
  }

  return { directCount: Object.keys(direct).length, errors, warnings };
}

async function main() {
  const argv = process.argv.slice(2);
  if (argv.includes('--help') || argv.includes('-h')) {
    console.log(`verificar-dependencias-semver — gate local sin red

Uso:
  node verificar-dependencias-semver.mjs --package package.json --config dependencias-semver.json

La configuración admite: defaultPolicy, policies por paquete, runtimeImports,
allow, deny e integrationTested. Políticas: exact, caret-semver, major-band.
Este gate no consulta registries ni instala: C8 online se ejecuta aparte.`);
    return;
  }
  const option = (name, fallback) => {
    const index = argv.indexOf(name);
    return index >= 0 && argv[index + 1] ? argv[index + 1] : fallback;
  };
  const packagePath = resolve(option('--package', 'package.json'));
  const configPath = resolve(option('--config', 'dependencias-semver.json'));

  let packageJson;
  let config;
  try {
    [packageJson, config] = await Promise.all([
      loadJson(packagePath, 'package.json'),
      loadJson(configPath, 'configuración'),
    ]);
  } catch (error) {
    failInput(error.message);
    return;
  }

  let result;
  try {
    result = verify(packageJson, config);
  } catch (error) {
    failInput(error.message);
    return;
  }
  for (const warning of result.warnings) {
    console.warn(`[dependencias-semver] WARNING: ${warning}`);
  }
  if (result.errors.length > 0) {
    for (const error of result.errors) {
      console.error(`[dependencias-semver] FAIL: ${error}`);
    }
    console.error(
      `[dependencias-semver] FALLO: ${result.errors.length} problema(s); C8 no se ejecutó`,
    );
    process.exitCode = 1;
    return;
  }
  console.log(
    `[dependencias-semver] OK: ${result.directCount} dependencia(s) runtime; gate local sin red`,
  );
}

if (resolve(process.argv[1] ?? '') === fileURLToPath(import.meta.url)) {
  await main();
}
