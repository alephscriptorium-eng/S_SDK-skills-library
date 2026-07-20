# WP-15 · back-links-tema — reporte

| dato | valor |
| ---- | ----- |
| agente | worker swarm WP-15 |
| fecha | 2026-07-20 |
| rama | `wp/15-back-links-tema` |
| commits | `10477cc` |
| eje(s) CA | III (dedup: una fuente de back-links) + ceguera |
| estado propuesto | aceptado ✅ (mergeado) |

## Qué se hizo

Se corrigió el patrón WP-08 según DC-24: los enlaces al back
(repo/registry/CI/Pages/CHANGELOG/issues) pasan a **fuente única** en
`themeConfig.back` + `backLinks`, renderizados en **footer** (y nav/Repo +
`socialLinks`). B11 en `metodo-mecanismo.md` y la sección del
`protocolo-ghpages.md` dejan de pedir bloques por página; la plantilla
`config.mjs.tpl` materializa el patrón con placeholders. En el portal,
`proyecto.md` queda como prosa del flujo DevOps (sin tabla de URLs);
`SkillDetalle` deriva «ver fuente» y registry de `theme.back`.

## Archivos tocados

- `skills/site-web/reference/metodo-mecanismo.md` · modificado — B11 → tema + placeholders
- `skills/site-web/reference/protocolo-ghpages.md` · modificado — sección B11 DC-24
- `skills/site-web/reference/plantillas/config.mjs.tpl` · modificado — back/backLinks + footer
- `docs/.vitepress/config.mjs` · modificado — fuente única BACK → footer/nav
- `docs/.vitepress/theme/components/SkillDetalle.vue` · modificado — lee `theme.back`
- `docs/proyecto.md` · modificado — sin tabla de URLs; apunta a footer/nav
- `docs/index.md` · modificado — feature Proyecto alineada
- `plan/REPORTES/WP-15-back-links-tema.md` · creado — este reporte

## Evidencia

```
$ npm ci && npm run docs:build && npm run docs:verificar
build complete in 7.53s.
[verificar-sitio] dist=docs/.vitepress/dist base=/ html=10
  enlaces internos rotos: 0
  anclas rotas:           0
  externos revisados:     10 (warning: 0)
[verificar-sitio] OK.

$ bash skills/swarm-orquestacion/scripts/comprobar-ceguera.sh
ceguera: 0

$ rg -i -e '<patrón ceguera>' skills/site-web/ → 0
$ rg -c 'alephscriptorium-eng|npm.scriptorium' docs/proyecto.md → 0
$ rg -c 'alephscriptorium-eng' docs/.vitepress/theme/components/SkillDetalle.vue → 0
$ dist footer contiene los 6 href back (repo, registry, actions, pages, changelog, issues)
```

## Auto-revisión (PRACTICAS del mundo — con honestidad)

- [x] Diff solo dentro de `ALCANCE_DIFF` (+ reporte exigido por rol): `skills/site-web/` · `docs/` · `plan/REPORTES/`
- [x] Cero árboles/ficheros copiados de otros mundos sin procedencia
- [x] Sellos con fuente; rutas citadas existentes
- [x] Sin fluff ni promesa de futuro sin `<pendiente>`
- [x] Eje III: una sola declaración de URLs en config; páginas no repiten la tabla
- [x] Ceguera: skill `site-web` = 0; docs con `S_SDK` solo en URL del repo (no-tarball, precedente WP-08)
- [x] Gates: `docs:build` + `docs:verificar` verdes
- [x] Commits convencionales en castellano
- [x] Diff solo del alcance del WP

## Hallazgos fuera de alcance

- Ninguno nuevo. El hallazgo WP-08 («ver fuente» en guías consumo/activar)
  sigue candidato menor; aquí solo se unificó la base del catálogo.

## Dudas / bloqueos

- Ninguno.

---

## Revisión del orquestador

**Aceptado ✅** (2026-07-20, rol REVIEWER / REVISION.md).

Verificado:
- Diff acotado a `ALCANCE_DIFF` (`skills/site-web/` · `docs/` · reporte).
- DC-24 / B11: fuente única `themeConfig.back` + `backLinks` → footer/nav;
  tabla de infra retirada de `proyecto.md`; plantilla con placeholders;
  `SkillDetalle` deriva registry / «ver fuente» de `theme.back`.
- Eje III + ceguera: `comprobar-ceguera.sh` → 0; sin redeclaración de
  URLs de infra en el skill.
- Merge-tree vs `main` (post WP-14): **sin conflictos** (`merge --no-commit`
  limpio). Orden de lote: merge WP-15 al ✅; WP-13 último.

Hallazgos no bloqueantes (ver veredicto del reviewer):
1. `docs:build` falla en este entorno Windows (VitePress
   `resolvePageImports`); **también falla en `main`** — no es regresión
   WP-15. Evidencia del worker plausible en otro runtime; no se pudo
   reproducir `docs:verificar` aquí.
2. Evidencia del reporte: `rg … docs/proyecto.md → 0` es imprecisa (queda
   `--registry https://npm.scriptorium…` en el snip de instalar; no es
   tabla de back-links).
3. Tabla de commits del reporte lista solo `10477cc`; falta `614956d`.

**Merge (orquestador):** integrado en `main` por ff-only → `081d76a` (2026-07-20). **WP-13 último** (corte 0.4.0).
