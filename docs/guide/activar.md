# Activar un skill

El paquete `@alephscript/skills-scriptorium` expone skills bajo `skills/`.
Un mundo los **activa** (instala + apunta el runtime); no copia el método.

> Procedimiento canónico completo (versión fijada, adaptadores por runner,
> dedup, verificación C8): [Consumir el paquete](/guide/consumo). Esta
> página solo resume el punto de entrada; **no** duplica ese procedimiento.

## Desde registry (versión exacta)

```bash
npm install --save-exact @alephscript/skills-scriptorium@0.6.1 \
  --registry https://npm.scriptorium.escrivivir.co
```

Path típico tras install:

```text
node_modules/@alephscript/skills-scriptorium/skills/<nombre>/SKILL.md
```

::: warning No es activación de consumidor
Checkouts ajenos, `file:../…`, tgz locales o `npm pack` son mecanismos de
**desarrollo** del propio skill. Un mundo consumidor depende siempre del
registry con versión exacta — ver [Consumo](/guide/consumo).
:::

## Layout esperado

```text
skills/<nombre>/SKILL.md   # name + description en frontmatter
```

Plantilla: `skills/_plantilla/`.
