# WP-06 · verificar-sitio — reporte

| dato | valor |
| ---- | ----- |
| agente | orquestador (implementación directa) |
| fecha | 2026-07-20 |
| rama | `main` (commit directo; solo-secuencial, sin worktree) |
| commits | `fd9dafb` (obra) + este cierre |
| eje(s) CA | III (gate de verdad) + IV (2º cliente: mundo-fuente) + ceguera |
| estado propuesto | mergeado ✅ |

## Qué se hizo

`site-web` gana `scripts/verificar-sitio.mjs`: gate que corre sobre el
`dist/` **construido** (no sobre el markdown fuente) y valida **todos** los
`<a href>` — internos resuelven a fichero (respeta `base` + `cleanUrls`),
anclas `#id` existen, externos http(s) → *warning* (DC-5). Diagnóstico
raíz de los enlaces rotos en deploys previos: `ignoreDeadLinks:false` de
VitePress **no** revisa los hrefs que emiten componentes `.vue` (catálogo,
tarjetas, rutas dinámicas del portal) — ese es justo el hueco. Verdad de
contenido opcional por manifiesto (`verdad-checks.json`). Integrado en
`protocolo-ghpages.md` (gate + checklist). El mundo-fuente lo **estrena**
(eje IV): `npm run docs:verificar` + `docs/verdad-checks.json`.

## Archivos tocados

- `skills/site-web/scripts/verificar-sitio.mjs` · creado — el gate (Node, sin deps)
- `skills/site-web/reference/protocolo-ghpages.md` · modificado — sección gate + checklist
- `skills/site-web/SKILL.md` · modificado — recursos + paso 7 del pipeline ghpages
- `CHANGELOG.md` · modificado — Unreleased → 0.4.0 (WP-06)
- `package.json` · modificado — script `docs:verificar` (mundo-fuente)
- `docs/verdad-checks.json` · creado — aserciones de verdad del mundo-fuente

## Evidencia

> Salida literal.

### CA · verde sobre el portal real

```
$ npm run docs:build && node skills/site-web/scripts/verificar-sitio.mjs --dist docs/.vitepress/dist --base /
[verificar-sitio] dist=docs/.vitepress/dist base=/ html=9
  enlaces internos rotos: 0
  anclas rotas:           0
  externos revisados:     4 (warning: 0)
[verificar-sitio] OK: enlaces internos y anclas resuelven; verdad de contenido consistente.
```

### CA · prueba roja sintética (el gate DETECTA rotos)

```
$ node .../verificar-sitio.mjs --dist <tmp con 2 rotos> --base / --no-external
  ✗ INTERNO index.html → /noexiste
  ✗ ANCLA   index.html → /ok#falta (destino ok.html)
[verificar-sitio] FALLO: 2 problema(s) que bloquean el deploy.
EXIT=1
```

### Bug encontrado y corregido (honestidad)

Primera corrida: el informe mostró `base=/C:/Program Files/Git/` — MSYS
(Git Bash) convirtió el argumento `/` a la raíz MSYS (**frágil #2** del
propio skill). Resolución seguía funcionando por casualidad (base='/' no
recorta), pero rompería con base real. Fix: guard
`/^\/?[A-Za-z]:[\\/]/ → '/'` en el parseo de `--base`. Segunda corrida:
`base=/` correcto.

### CA · ceguera

```
$ grep -rniE "<tokens-de-marco>" skills/site-web/{scripts/verificar-sitio.mjs,reference/protocolo-ghpages.md,SKILL.md}
marco: 0
```

## Auto-revisión (con honestidad)

- [x] Diff dentro de alcance (`skills/site-web/`, `docs/`, `package.json`, `CHANGELOG`).
- [x] Gate genérico/parametrizable (DIST/BASE); marco-agnóstico.
- [x] DC-5 respetado: falla ante interno/ancla, externos = warning.
- [x] Eje IV: mundo-fuente estrena el gate (2º cliente real), verde.
- [x] Prueba roja ejecutada (no solo verde): detecta rotos, exit 1.
- [x] Guard MSYS (frágil #2) tras cazar el bug.
- [x] Ceguera 0. Publish diferido (Unreleased).

## Hallazgos fuera de alcance

- Enganchar el gate en `docs.yml` (CI) tras `docs:build`: la plantilla
  `docs.yml.tpl` del skill no se tocó; candidato a WP de CI.
- Verdad de contenido: hoy por manifiesto de patrones; una verificación
  semántica más rica (comandos ejecutados) es candidato futuro.

## Dudas / bloqueos

- Ninguno.

---

## Revisión del orquestador

**Aceptado ✅** — gate genérico, verde sobre el portal y rojo en prueba
sintética; frágil #2 mitigado; eje IV cumplido. Evidencia arriba.
