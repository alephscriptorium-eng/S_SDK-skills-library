# WP-12 · proyeccion-refinamientos — reporte

| dato | valor |
| ---- | ----- |
| agente | orquestador (implementación directa) |
| fecha | 2026-07-20 |
| rama | `main` |
| commits | `5579f93` (obra) + cierre |
| eje(s) CA | ceguera |
| estado propuesto | mergeado ✅ |

## Qué se hizo

Dos refinamientos del exportador (WP-09), unificados en una sola lógica —
«proyectá el conjunto elegido; cerrá lo que ya no esté en él»:

- **Auto-cierre (DC-19):** todo issue del `sync-map` cuyo WP no esté en el
  conjunto proyectado (retirado del backlog, o `✅` bajo alcance
  `abiertos`) se **cierra** con comentario y sale del map. Elimina el
  cierre manual de huérfanos (como el de #9/#10 el turno pasado).
- **Alcance configurable (DC-20):** `--alcance todos` (default,
  retrocompatible) o `abiertos` (solo `⬜`/`🔶`; los `✅` se cierran). Se
  elige **al activar** la proyección; el orquestador lo confirma en el
  ritual de inicio.

## Archivos tocados

- `skills/swarm-orquestacion/scripts/proyectar-backlog.mjs` · conjunto proyectado + auto-cierre + `--alcance`
- `skills/swarm-orquestacion/reference/proyeccion-issues.md` · método (alcance + auto-cierre)
- `skills/swarm-orquestacion/reference/roles/ORQUESTADOR.md` · ritual confirma alcance

## Evidencia

> Dry-run (sin API).

```
# alcance=todos (default): todo el backlog, 0 sobrantes
$ … export --dry-run
alcance=todos · 9 proyectado(s), 0 a cerrar

# alcance=abiertos: solo ⬜/🔶; los 8 ✅ pasan a cerrar-sobrante
$ … export --dry-run --alcance abiertos
alcance=abiertos · 1 proyectado(s), 8 a cerrar
  · crear WP-12 → open
  · cerrar-sobrante WP-01..WP-11 → closed

# huérfano (WP-99 en map, no en backlog) → cerrar-sobrante
$ … export --dry-run --map <tmp WP-01,WP-99>
  · cerrar-sobrante WP-99 → closed (#999)

$ ceguera → 0 ; grep marco ficheros WP-12 → 0
```

## Auto-revisión

- [x] Auto-cierre y alcance comparten el mismo camino de código (sobrante = no-en-conjunto).
- [x] Default `todos` retrocompatible; `abiertos` documentado (cierra los ✅).
- [x] Candados de WP-09/10 intactos (opt-in + ceguera antes de la API).
- [x] Dry-run cubre los tres casos; ceguera 0.

## Dudas / bloqueos

- Ninguno.

---

## Revisión del orquestador

**Aceptado ✅** — auto-cierre + alcance probados en dry-run (3 casos);
elimina el cierre manual de huérfanos. Evidencia arriba.
