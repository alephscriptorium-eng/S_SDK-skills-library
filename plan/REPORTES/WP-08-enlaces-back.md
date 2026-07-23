# WP-08 · enlaces-back — reporte

| dato | valor |
| ---- | ----- |
| agente | orquestador (implementación directa) |
| fecha | 2026-07-20 |
| rama | `main` |
| commits | `d205e78` (obra) + cierre |
| eje(s) CA | IV (2º cliente: el portal) + ceguera |
| estado propuesto | mergeado ✅ |

## Qué se hizo

`site-web` gana el patrón **enlaces al back (DevOps)**: cada superficie
enlaza a su parte tec (repo/registry/CI) y una página dedicada agrega los
enlaces de infra no repartidos. Regla B11 en `metodo-mecanismo.md` +
sección en `protocolo-ghpages.md`, con **placeholders** (el skill no
hardcodea URLs). El **mundo-fuente** lo materializa (eje IV): página
`docs/proyecto.md` con repo, registry, CI/Actions, Pages, CHANGELOG y
contribuir; enlazada en nav/sidebar y feature de portada. Cubre el flujo
devops (código → registry → CI → Pages) para que el navegante FOSS llegue
al back de lo que ve.

## Archivos tocados

- `skills/site-web/reference/metodo-mecanismo.md` · modificado — regla B11
- `skills/site-web/reference/protocolo-ghpages.md` · modificado — sección enlaces al back
- `docs/proyecto.md` · creado — página Proyecto (mundo-fuente)
- `docs/.vitepress/config.mjs` · modificado — nav + sidebar «Proyecto»
- `docs/index.md` · modificado — feature «Proyecto»

## Evidencia

```
$ npm run docs:build && node .../verificar-sitio.mjs --dist docs/.vitepress/dist --base /
[verificar-sitio] dist=... base=/ html=10
  enlaces internos rotos: 0
  anclas rotas:           0
  externos revisados:     10 (warning: 0)     # ← repo, registry, Actions, Pages, CHANGELOG, issues resuelven
OK.

$ grep marco estricto en ficheros WP-08 → 0
$ grep S_SDK en skills (tarball) → 0 ; en docs/proyecto.md (no-tarball, URL repo) → 4
```

## Auto-revisión

- [x] Skill genérico con placeholders; URLs reales solo en docs del mundo.
- [x] Eje IV: el portal (2º cliente) estrena el patrón; enlaces vivos.
- [x] `verificar-sitio` verde con los 10 externos nuevos.
- [x] Ceguera 0 en skills (tarball); repo URL solo en docs no-tarball (aceptado).

## Hallazgos fuera de alcance

- Enlace «ver fuente» por página de guía (consumo/activar) además de las
  de skill: candidato menor.

## Dudas / bloqueos

- Ninguno.

---

## Revisión del orquestador

**Aceptado ✅** — patrón + página Proyecto, flujo devops del front al back;
gate verde con externos vivos. Evidencia arriba.
