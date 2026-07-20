# Proyecto

`@alephscript/skills-scriptorium` es FOSS y vive en abierto. Los enlaces
vivos al **back** (repo, registry, CI, Pages, CHANGELOG, issues) están en
el **footer y nav del tema** — fuente única de configuración, no repetida
por página. Cada skill del [catálogo](/catalogo) deriva además su enlace
«ver fuente» de esa misma base.

## Flujo DevOps

```text
código (repo)  →  paquete (registry, versión fijada)  →  CI (Actions)  →  portal (Pages)
```

- El **código** de cada skill vive en `skills/<nombre>/` del repositorio.
- El **paquete** se publica al registry propio con versión exacta — ver
  [Consumo](/guide/consumo).
- La **CI** (GitHub Actions) construye y despliega el portal a Pages.
- El **portal** (este sitio) introduce y enlaza de vuelta al back desde
  footer/nav.

## Instalar

```bash
npm install --save-exact @alephscript/skills-scriptorium@0.3.3 \
  --registry https://npm.scriptorium.escrivivir.co
```

Descubrí qué hay en el [catálogo](/catalogo) y cómo activarlo en
[Consumo](/guide/consumo).
