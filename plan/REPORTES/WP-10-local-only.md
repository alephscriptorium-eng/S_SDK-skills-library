# WP-10 · local-only — reporte

| dato | valor |
| ---- | ----- |
| agente | orquestador (implementación directa) |
| fecha | 2026-07-20 |
| rama | `main` |
| commits | `6970df1` (obra) + cierre |
| eje(s) CA | ceguera (evitar cara pública accidental) |
| estado propuesto | mergeado ✅ |

## Qué se hizo

Endurecimiento de seguridad de WP-09 pedido por el custodio (DC-15): la
proyección a GitHub es **local-only por defecto**; solo se activa con
opt-in **explícito del usuario**. Triple defensa: (1) el `export` real de
`proyectar-backlog.mjs` rehúsa sin `--habilitar-github` /
`PROYECCION_GITHUB=1` (dry-run permitido); (2) el orquestador **confirma el
modo al inicio de sesión** (ritual + anti-patrón en `ORQUESTADOR.md`;
default local-only); (3) el vigía eleva proyección no declarada
(`ESTACION.md`). Método actualizado (`proyeccion-issues.md`) con el modo
por defecto destacado. Como WP-09 ya estaba ✅ (invariante: no se reabre),
esto es WP nuevo dentro de 0.3.2.

## Archivos tocados

- `skills/swarm-orquestacion/scripts/proyectar-backlog.mjs` · candado de modo (opt-in)
- `skills/swarm-orquestacion/reference/proyeccion-issues.md` · modo por defecto local-only
- `skills/swarm-orquestacion/reference/roles/ORQUESTADOR.md` · ritual de modo + anti-patrón
- `skills/vigilancia/reference/ESTACION.md` · doctrina proyección no declarada

## Evidencia

```
# 1) export real SIN opt-in → rehúsa
$ node proyectar-backlog.mjs export
proyección a GitHub DESHABILITADA por defecto (local-only, DC-15).   EXIT=4

# 2) opt-in pero sin patrón → cae en ceguera (orden correcto, sin API)
$ PROYECCION_GITHUB=1 node proyectar-backlog.mjs export
CEGUERA_PATTERN no definido … (DC-12).   EXIT=3

# 3) dry-run con patrón → preview permitido
$ CEGUERA_PATTERN='<marco>' node proyectar-backlog.mjs export --dry-run
ceguera OK (9 WP validados …)   EXIT=0

$ ceguera skill → 0 ; grep marco ficheros WP-10 → 0
```

## Auto-revisión

- [x] Local-only es el default; GitHub = opt-in explícito (DC-15).
- [x] Doble candado (modo → ceguera) antes de cualquier llamada a la API.
- [x] Roles alineados: orquestador confirma modo, worker no proyecta, vigía eleva.
- [x] Dry-run (preview) sigue disponible sin opt-in.
- [x] Ceguera 0.

## Dudas / bloqueos

- Ninguno.

---

## Revisión del orquestador

**Aceptado ✅** — el estado seguro (silencio/local) es el default; la
proyección pública exige petición explícita. Triple defensa probada.
