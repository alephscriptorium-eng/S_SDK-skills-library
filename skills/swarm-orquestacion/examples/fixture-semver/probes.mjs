#!/usr/bin/env node

import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const gate = resolve(
  here,
  '..',
  '..',
  'scripts',
  'verificar-dependencias-semver.mjs',
);
const cases = JSON.parse(await readFile(join(here, 'cases.json'), 'utf8'));
const temp = await mkdtemp(join(tmpdir(), 'fixture-semver-'));
let failures = 0;

try {
  for (const [index, fixture] of cases.entries()) {
    const packagePath = join(temp, `package-${index}.json`);
    const configPath = join(temp, `config-${index}.json`);
    await Promise.all([
      writeFile(packagePath, JSON.stringify(fixture.package), 'utf8'),
      writeFile(configPath, JSON.stringify(fixture.config), 'utf8'),
    ]);

    const run = spawnSync(
      process.execPath,
      [gate, '--package', packagePath, '--config', configPath],
      { encoding: 'utf8', env: { ...process.env, NO_UPDATE_NOTIFIER: '1' } },
    );
    const output = `${run.stdout}${run.stderr}`;
    const missing = fixture.includes.filter((text) => !output.includes(text));
    const passed = run.status === fixture.exit && missing.length === 0;
    console.log(
      `${passed ? 'PASS' : 'FAIL'} ${fixture.name} · exit=${run.status}`,
    );
    if (!passed) {
      failures += 1;
      console.error(`  esperado exit=${fixture.exit}; faltan: ${missing.join(', ') || 'ninguno'}`);
      console.error(output.trim());
    }
  }
} finally {
  await rm(temp, { recursive: true, force: true });
}

if (failures > 0) {
  console.error(`probes semver: FAIL (${failures}/${cases.length})`);
  process.exit(1);
}
console.log(`probes semver: OK (${cases.length}/${cases.length}) · sin red`);
