# Activar un skill

El paquete `@alephscript/skills-scriptorium` expone skills bajo `skills/`.
Un mundo los **activa** (instala + apunta el runtime); no copia el método.

## Desde registry

```bash
npm install @alephscript/skills-scriptorium --registry https://npm.scriptorium.escrivivir.co
```

Path típico tras install:

```text
node_modules/@alephscript/skills-scriptorium/skills/<nombre>/SKILL.md
```

## Path local

```bash
npm install /ruta/absoluta/al/repo-skills-library
```

## Simulación `npm pack`

Mientras no haya publish:

```bash
npm pack
npm install ./alephscript-skills-scriptorium-0.1.0.tgz
```

Ver README raíz del repo para el ciclo completo en directorio temporal.

## Layout esperado

```text
skills/<nombre>/SKILL.md   # name + description en frontmatter
```

Plantilla: `skills/_plantilla/`.
