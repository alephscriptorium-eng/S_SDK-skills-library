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

Procedimiento canónico (versión exacta + registry + C8): una sola fuente
en [Consumo](/guide/consumo). Descubrí qué hay en el [catálogo](/catalogo).

## Mapa de proyección

Si el mundo proyecta su backlog a issues, el ritual (proyección ≠ sync,
mapa post-apply, local-only por defecto) está en
[Mapa de proyección](/guide/mapa).
