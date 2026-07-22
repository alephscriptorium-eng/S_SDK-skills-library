# @alephscript/skills-scriptorium

Paquete de **skills** en formato estándar (un directorio por skill con
`SKILL.md` + recursos opcionales). Cada mundo **activa** el skill común
en vez de mantener una copia del método.

Dominio docs: [skills.s-sdk.escrivivir.co](https://skills.s-sdk.escrivivir.co).

## Layout

```text
skills/<nombre>/
  SKILL.md          # frontmatter name + description (obligatorio)
  README.md         # opcional — nota corta de activación
  reference/        # opcional
  examples/         # opcional
  scripts/          # opcional
instancias/         # datos de-identificados (no van al tarball npm)
docs/               # VitePress (no va al tarball npm)
```

Plantilla vacía: `skills/_plantilla/`. Skills reales llegan en entregas
posteriores del paquete.

## Consumo desde un mundo (procedimiento canónico)

Agnóstico de IDE. Versión extendida (script de sincronización, patrón
dedup completo): [docs/guide/consumo.md](docs/guide/consumo.md) ·
[skills.s-sdk.escrivivir.co/guide/consumo](https://skills.s-sdk.escrivivir.co/guide/consumo).
Release notes: `CHANGELOG.md` (actual `0.6.1`).

### Semver del paquete vs versión de método

Dos ejes distintos (DC-22); no se confunden:

| Eje | Dónde se ve | Qué versiona |
| --- | ----------- | ------------ |
| **Semver del paquete** | `package.json` / npm (`@alephscript/skills-scriptorium@X.Y.Z`) | Contrato publicable del tarball |
| **Versión de método** | Badge del catálogo por skill (p. ej. `swarm-orquestacion` **v0.6.0**) | Contrato de reglas del skill concreto |

Política del semver del paquete:

- **minor** (o major si aplica): añadir o modificar una **regla de método**
  amplía el contrato → al menos minor.
- **patch**: solo correcciones **sin** cambio de contrato.
- **major**: ruptura de layout del skill o del frontmatter
  (`name` + `description`).

Correspondencia actual: el paquete **0.6.1** corrige la piel fanzine de
`site-web` (issue #15) sobre el corte **0.6.0** que añadió el skill
**holarquia**. El badge de método de `swarm-orquestacion` es **v0.6.0**;
el de `holarquia` es **v0.1.0** (ejes distintos — el badge no «es» el
semver del paquete).

### 1. Dependencia con versión exacta fijada

Nunca `latest` ni rango `^`/`~`: el contrato del skill cambia por semver
y el mundo consumidor decide **cuándo** subir. `--save-exact` es
obligatorio (sin él, npm guarda `^X.Y.Z`).

```bash
npm install --save-exact @alephscript/skills-scriptorium@0.6.1 \
  --registry https://npm.scriptorium.escrivivir.co
```

O fijando el registry por scope en el `.npmrc` del consumidor:

```ini
@alephscript:registry=https://npm.scriptorium.escrivivir.co
save-exact=true
```

### 2. Fuente de verdad: `node_modules`

El método vive **solo** en el paquete instalado:

```text
node_modules/@alephscript/skills-scriptorium/skills/<nombre>/SKILL.md
```

Cualquier runner/IDE que sepa leer un path arbitrario de skills apunta
ahí directamente.

### 3. Adaptadores por runner

Runners que exigen un directorio propio (p. ej. Claude Code y su
`.claude/skills/` — **namespace del runner**, no de este paquete)
**sincronizan por script idempotente** desde `node_modules` — nunca se
edita la copia a mano; se regenera tras cada `npm install` y se
**gitignora** (artefacto derivado). La fuente runner-agnóstica es
`node_modules/.../skills/`. Patrón general para otros IDEs: mismo script,
otro destino. Ver [docs/guide/consumo.md](docs/guide/consumo.md).

### 4. Dedup: referencia versionada + calibración local

Los prompts/protocolos **no se copian** al repo consumidor. El repo
consumidor documenta (a) la referencia versionada
`@alephscript/skills-scriptorium@X.Y.Z` y (b) solo su **calibración
local** (lo que difiere del método común). Modelo de referencia:
emmanuel WP-I60.

### 5. Verificación (C8)

La referencia fijada debe **resolver** contra el registry:

```bash
npm view @alephscript/skills-scriptorium@0.3.4 \
  --registry=https://npm.scriptorium.escrivivir.co version
# → 0.3.4, exit 0  (<pendiente> hasta npm publish)
```

## Desarrollo local (no es consumo)

Solo para trabajar sobre el propio skill; un mundo consumidor jamás
depende por `file:`/tgz.

```bash
# path hermano
npm install /ruta/absoluta/al/repo-skills-library

# simulación sin registry (pack → install en temporal)
cd /ruta/al/repo-skills-library && npm pack
TMP=$(mktemp -d) && cd "$TMP" && npm init -y
npm install /ruta/al/repo-skills-library/alephscript-skills-scriptorium-0.3.4.tgz
ls node_modules/@alephscript/skills-scriptorium/skills/
```

## Docs locales

```bash
npm install
npm run docs:dev
npm run docs:build
```

## Instancias

Los datos de un mundo (sesiones, handoffs, canteras) **no** viven dentro
del skill. Van a `instancias/` de-identificados — ver `instancias/README.md`.
