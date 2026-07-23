---
layout: home
hero:
  name: Skills Library
  text: Método activable
  tagline: |-
    Skills marco-agnósticos en formato estándar. Cada mundo activa el
    método común; los datos viven aparte (instancias/).
  actions:
    - theme: brand
      text: Catálogo
      link: /catalogo
    - theme: alt
      text: Consumo
      link: /guide/consumo
    - theme: alt
      text: Activar
      link: /guide/activar
features:
  - title: Catálogo
    details: Vista overview con filtrado por categoría, tag y búsqueda; los skills se derivan del frontmatter real.
    link: /catalogo
    linkText: Ver catálogo
  - title: Formato skill
    details: Un dir por skill con SKILL.md (frontmatter name + description) y recursos opcionales.
  - title: Protocolo ≠ datos
    details: El skill lleva el método; instancias/ guarda fixtures de-identificadas.
  - title: Proyecto
    details: Flujo DevOps (código → registry → CI → Pages). Enlaces vivos al back en footer/nav del tema.
    link: /proyecto
    linkText: Ver proyecto
---

## Local

```bash
npm install
npm run docs:dev
npm run docs:build
npm run docs:verificar
```

Dominio: `skills.s-sdk.escrivivir.co` · paquete `@alephscript/skills-scriptorium@0.8.0`.
