# Proyecto

`@alephscript/skills-scriptorium` es FOSS y vive en abierto. Desde aquí
llegás al **back** de todo lo que ves en el portal: código, paquete, CI y
publicación. Cada skill del [catálogo](/catalogo) enlaza además a su
fuente concreta en el repo.

## Infraestructura

| pieza | enlace |
| ----- | ------ |
| Repositorio | [github.com/alephscriptorium-eng/S_SDK-skills-library](https://github.com/alephscriptorium-eng/S_SDK-skills-library) |
| Paquete (registry propio) | [npm.scriptorium.escrivivir.co](https://npm.scriptorium.escrivivir.co) |
| CI / Actions | [Actions del repo](https://github.com/alephscriptorium-eng/S_SDK-skills-library/actions) |
| Pages (este sitio) | [skills.s-sdk.escrivivir.co](https://skills.s-sdk.escrivivir.co) |
| CHANGELOG | [CHANGELOG.md](https://github.com/alephscriptorium-eng/S_SDK-skills-library/blob/main/CHANGELOG.md) |
| Contribuir / issues | [Issues](https://github.com/alephscriptorium-eng/S_SDK-skills-library/issues) |

## Flujo DevOps

```text
código (repo)  →  paquete (registry, versión fijada)  →  CI (Actions)  →  portal (Pages)
```

- El **código** de cada skill vive en `skills/<nombre>/` del repositorio.
- El **paquete** se publica al registry propio con versión exacta — ver
  [Consumo](/guide/consumo).
- La **CI** (GitHub Actions) construye y despliega el portal a Pages.
- El **portal** (este sitio) introduce y enlaza de vuelta al back.

## Instalar

```bash
npm install --save-exact @alephscript/skills-scriptorium@0.3.3 \
  --registry https://npm.scriptorium.escrivivir.co
```

Descubrí qué hay en el [catálogo](/catalogo) y cómo activarlo en
[Consumo](/guide/consumo).
