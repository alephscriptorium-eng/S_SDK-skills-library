# WP-17 · release-040 — reporte

| dato | valor |
| ---- | ----- |
| agente | gobierno+obra holón skills (micro-lote Ola 7) |
| fecha | 2026-07-21 |
| estado | ✅ |
| tip | `d3295eb` |

## Qué se hizo

Release **0.4.0** (minor DC-22: reglas de método 16–17) + regeneración del
portal Docs (hueco GO-5 / skills.s-sdk).

## Evidencia canal real

```text
$ npm view @alephscript/skills-scriptorium@0.4.0 --registry https://npm.scriptorium.escrivivir.co version
0.4.0

$ npm view @alephscript/skills-scriptorium --registry https://npm.scriptorium.escrivivir.co version
0.4.0
```

| pipeline | run-id | conclusion |
| -------- | ------ | ---------- |
| Publish package | [29865483731](https://github.com/alephscriptorium-eng/S_SDK-skills-library/actions/runs/29865483731) | success |
| Docs (workflow_dispatch) | [29865486164](https://github.com/alephscriptorium-eng/S_SDK-skills-library/actions/runs/29865486164) | success |

Portal: `https://skills.s-sdk.escrivivir.co/` (badge método swarm
v0.5.0 vía `docs/.vitepress/skills-meta.js`).

## CA

- [x] `npm view …@0.4.0` → `0.4.0`
- [x] Docs deploy success (run-id citado)
- [x] Ceguera skill = 0 (WP-16)
- [x] CHANGELOG [0.4.0] copia WP-16/WP-17 del BACKLOG
