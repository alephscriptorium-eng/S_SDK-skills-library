# Consumir el paquete desde un mundo

Procedimiento canónico, **agnóstico de IDE**, para que un mundo
consumidor adopte skills de `@alephscript/skills-scriptorium` sin copiar
el método. Cinco pasos: fijar versión, apuntar a `node_modules`,
adaptar por runner, deduplicar, verificar (C8).

Es **común a todos los skills** — por eso vive aquí una sola vez y no
repetido por skill. La [página de cada skill](/catalogo) enlaza a este
procedimiento con su línea de instalación concreta.

## 1. Dependencia con versión exacta fijada

Nunca `latest` ni rangos `^`/`~`. El contrato de cada skill evoluciona
por semver (ver `CHANGELOG.md`) y es el mundo consumidor quien decide
cuándo absorber un bump — una actualización implícita en un `npm
install` rutinario cambiaría el protocolo bajo los pies del orquestador.

```bash
npm install --save-exact @alephscript/skills-scriptorium@0.5.1 \
  --registry https://npm.scriptorium.escrivivir.co
```

`--save-exact` es obligatorio: sin él, npm guarda `"^0.5.1"` en
`package.json` y la fijación es ilusoria.

Alternativa equivalente — registry por scope en el `.npmrc` del repo
consumidor (evita repetir `--registry` en cada comando):

```ini
@alephscript:registry=https://npm.scriptorium.escrivivir.co
save-exact=true
```

```bash
npm install @alephscript/skills-scriptorium@0.5.1
```

Resultado esperado en el `package.json` consumidor:

```json
"dependencies": {
  "@alephscript/skills-scriptorium": "0.5.1"
}
```

::: warning No es consumo
`file:../repo-skills-library`, tgz locales o `npm pack` son mecanismos
de **desarrollo** del propio skill. Un mundo consumidor depende siempre
del registry con versión exacta.
:::

## 2. Fuente de verdad: `node_modules`

Tras el install, el método vive **únicamente** en:

```text
node_modules/@alephscript/skills-scriptorium/skills/<nombre>/
  SKILL.md          # frontmatter name + description
  reference/        # opcional
  examples/         # opcional
  scripts/          # opcional
```

Todo runner o IDE que acepte un path arbitrario de skills se apunta ahí
directamente. Ese directorio es de solo lectura a efectos del mundo: no
se edita, no se versiona, se regenera con `npm ci`.

## 3. Adaptadores por runner

La fuente de verdad **runner-agnóstica** es siempre
`node_modules/@alephscript/skills-scriptorium/skills/` (paso 2). Algunos
runners, además, exigen leer los skills desde un directorio **propio del
runner** — cuyo nombre lo define **ese runner**, no este paquete
(`.claude/skills/` es el namespace de Claude Code; otro runner usa el
suyo). El patrón general: **script de sincronización idempotente** desde
`node_modules` hacia el directorio del runner, en `postinstall`. La copia
sincronizada es un artefacto **derivado** — nunca se edita a mano, y **se
ignora en git** (ver abajo).

### Claude Code (`.claude/skills/` — namespace de Claude Code)

Ejemplo de `scripts/sync-skills.mjs` en el repo consumidor:

```js
// Sincroniza skills activados desde node_modules → .claude/skills.
// Idempotente: borra y recopia; la copia nunca se edita a mano.
import { cpSync, rmSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const SRC = 'node_modules/@alephscript/skills-scriptorium/skills';
const DST = '.claude/skills';
const ACTIVADOS = ['swarm-orquestacion', 'vigilancia']; // los que el mundo activa

mkdirSync(DST, { recursive: true });
for (const skill of ACTIVADOS) {
  rmSync(join(DST, skill), { recursive: true, force: true });
  cpSync(join(SRC, skill), join(DST, skill), { recursive: true });
}
console.log(`sync ok → ${DST} (${ACTIVADOS.join(', ')})`);
```

Enganche en el `package.json` consumidor:

```json
"scripts": {
  "sync-skills": "node scripts/sync-skills.mjs",
  "postinstall": "node scripts/sync-skills.mjs"
}
```

**Recomendado: gitignorar la copia** (`.claude/skills/` en el
`.gitignore` del consumidor). Es un artefacto derivado de un paquete
**fijado**: se regenera en `postinstall`, así que no hace falta
commitearla — y así el repo no arrastra la carpeta de **un** IDE (si
alguien lo abre con otro runner no ve cruft ajeno) ni duplica el método
(dedup). La reproducibilidad la garantiza la versión exacta, no la copia
commiteada. Ante cualquier divergencia, la copia se regenera, no se
corrige.

### Otros IDEs / runners

Mismo patrón con otro destino (p. ej. el directorio de prompts o de
"custom instructions" que el runner lea): script idempotente
`node_modules → <destino-del-runner>`, ejecutado en `postinstall`. Si el
runner acepta paths arbitrarios, se omite el adaptador y se usa el paso
2 tal cual.

## 4. Dedup en el consumidor: referencia versionada + calibración local

Regla: los prompts/protocolos del método **no se copian** al repo
consumidor (fuera del artefacto derivado del paso 3). Lo que el mundo
escribe en su árbol es exactamente dos cosas:

1. **La referencia versionada** — nombre del paquete + versión exacta +
   registry, resoluble por `npm view` (paso 5). «Autocontenido»
   significa «autocontenido vía referencia versionada», no «copiado
   aquí».
2. **La calibración local** — solo lo que difiere del método común en
   este mundo (convenciones propias, restricciones del repo, ajustes de
   alcance), visible sin abrir el paquete.

Si existía una copia previa del protocolo, se elimina con `git rm` y se
sustituye por un README de referencia versionada + calibración. Modelo
de referencia ejecutado: **emmanuel WP-I60**
(`plan/REPORTES/WP-I60-activacion-skill.md` en ese mundo) — cinco
prompts genéricos borrados, `plan/roles/README.md` reescrito como
referencia a `@alephscript/skills-scriptorium@0.2.0` + calibración
local.

## 5. Verificación (C8)

Criterio de cierre: la versión fijada **resuelve** contra el registry
desde el entorno del consumidor.

```bash
npm view @alephscript/skills-scriptorium@0.5.1 \
  --registry=https://npm.scriptorium.escrivivir.co version
# → 0.5.1
# exit 0 ← la referencia fijada existe y resuelve
```

Un `exit != 0` (versión inexistente, registry inaccesible) bloquea la
adopción: la referencia versionada del paso 4 sería papel mojado.

## Checklist de adopción

- [ ] `package.json` consumidor: versión **exacta** (sin `^`/`~`), registry por `--registry` o `.npmrc` de scope
- [ ] El runtime lee de `node_modules/...` o de una copia sincronizada por script — nunca de una copia manual
- [ ] Cero prompts/protocolos del método copiados al árbol del consumidor (dedup, modelo WP-I60)
- [ ] Calibración local documentada aparte, visible sin abrir el paquete
- [ ] `npm view @alephscript/skills-scriptorium@X.Y.Z version` → exit 0 (C8)
