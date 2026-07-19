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
      text: Activar
      link: /guide/activar
    - theme: alt
      text: Paquete
      link: https://github.com/alephscriptorium-eng/S_SDK-skills-library
features:
  - title: Formato skill
    details: Un dir por skill con SKILL.md (frontmatter name + description) y recursos opcionales.
  - title: Activación
    details: Registry, path local o npm pack (simulación sin publish).
  - title: Protocolo ≠ datos
    details: El skill lleva el método; instancias/ guarda fixtures de-identificadas.
---

## Local

```bash
npm install
npm run docs:dev
npm run docs:build
```

Dominio: `skills.s-sdk.escrivivir.co`.
