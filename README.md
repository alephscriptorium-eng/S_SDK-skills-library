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

## Activar un skill en un mundo

### 1. Registry

```bash
npm install @alephscript/skills-scriptorium --registry https://npm.scriptorium.escrivivir.co
```

Release notes: ver `CHANGELOG.md` (actual `0.2.0`).

Luego apuntá el runtime de skills del mundo al path instalado, p. ej.:

```text
node_modules/@alephscript/skills-scriptorium/skills/<nombre>/
```

### 2. Path local (desarrollo hermano)

```bash
npm install /ruta/absoluta/al/repo-skills-library
# o en package.json:
# "@alephscript/skills-scriptorium": "file:../repo-skills-library"
```

### 3. Simulación sin registry (`npm pack`)

```bash
cd /ruta/al/repo-skills-library
npm pack
# → alephscript-skills-scriptorium-0.2.0.tgz

TMP=$(mktemp -d)
cd "$TMP"
npm init -y
npm install /ruta/al/repo-skills-library/alephscript-skills-scriptorium-0.2.0.tgz
ls node_modules/@alephscript/skills-scriptorium/skills/
```

El ciclo pack → install en temporal es la simulación canónica mientras no
haya publish al registry.

## Docs locales

```bash
npm install
npm run docs:dev
npm run docs:build
```

## Instancias

Los datos de un mundo (sesiones, handoffs, canteras) **no** viven dentro
del skill. Van a `instancias/` de-identificados — ver `instancias/README.md`.
