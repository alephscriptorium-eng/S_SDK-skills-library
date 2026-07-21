# WP-16 · reglas-16-17 — reporte

| dato | valor |
| ---- | ----- |
| agente | gobierno+obra holón skills (micro-lote Ola 7) |
| fecha | 2026-07-21 |
| estado | ✅ |

## Qué se hizo

Se cosieron al skill `swarm-orquestacion` dos reglas destiladas de
PRACTICAS de un mundo consumidor (δ10–δ11), generalizadas (sin nombres de
mundo ni de marco):

- **Regla 16** — cierre de ola cita run-id VERDE de CI (+ Release/homólogo)
  del tip de cada repo tocado.
- **Regla 17** — `.sync-map.json` (mapa de proyección) se commitea
  **post-apply**; mapa especulativo = devolución.

Contrato de método: **v0.5.0** (badge). Semver del paquete: minor → 0.4.0
(WP-17).

## Ficheros

- `skills/swarm-orquestacion/reference/reglas-metodo-v05.md` · creado
- `skills/swarm-orquestacion/SKILL.md` · reglas de oro 12–13 + puntero v0.5
- `skills/swarm-orquestacion/reference/ciclo.md` · checklist + anti-patrones
- `skills/swarm-orquestacion/reference/roles/ORQUESTADOR.md` · ítems 10–11
- `skills/swarm-orquestacion/reference/proyeccion-issues.md` · post-apply
- `docs/.vitepress/skills-meta.js` · badge `0.5.0`

## CA

- [x] Reglas 16–17 en `reglas-metodo-v05.md` (marco-agnóstico)
- [x] Resumen operativo en SKILL / ciclo / ORQUESTADOR / proyección
- [x] Badge catálogo v0.5.0
- [x] Ceguera árbol = 0 (`comprobar-ceguera.sh`)
- [x] Semver minor diferido a WP-17
