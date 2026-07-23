# WP-09 · proyeccion — reporte

| dato | valor |
| ---- | ----- |
| agente | orquestador (implementación directa) |
| fecha | 2026-07-20 |
| rama | `main` |
| commits | `0597e51` (obra) + cierre |
| eje(s) CA | III (una fuente de verdad) + ceguera + IV (2º cliente) |
| estado propuesto | mergeado ✅ |

## Qué se hizo

`swarm-orquestacion` gana la proyección del backlog a un tracker de issues
**sin sync bidireccional** (propuesta del custodio, DC-10..DC-14): el
markdown local es la fuente de verdad única (regla 15); los issues son
proyección desechable. Script `scripts/proyectar-backlog.mjs` (export
idempotente local→GH con `plan/.sync-map.json` + marcador oculto, mapeo
`✅`→closed / `⬜🔶`→open sin labels; import GH→`plan/INBOX-GH.md` que **no**
escribe el BACKLOG; adaptador `gh` remote-agnóstico) + método en
`reference/proyeccion-issues.md`. **Gate de ceguera obligatorio** (DC-12):
`CEGUERA_PATTERN` por env, nunca almacenado en el skill; sin patrón rehúsa,
con hit aborta. Modos a/b; modo c (hook) documentado, no implementado.

Live projection = opt-in: el dry-run no toca la API ni crea issues; crear
issues reales es un acto outward que espera GO explícito del custodio.

## Archivos tocados

- `skills/swarm-orquestacion/scripts/proyectar-backlog.mjs` · creado — export/import
- `skills/swarm-orquestacion/reference/proyeccion-issues.md` · creado — método
- `skills/swarm-orquestacion/SKILL.md` · modificado — recurso

## Evidencia

> Salida literal (dry-run; sin tocar la API).

```
# 1) sin patrón → rehúsa (fail-safe DC-12)
$ node proyectar-backlog.mjs export --dry-run
CEGUERA_PATTERN no definido: se rehúsa exportar … (DC-12).   EXIT=3

# 2) patrón de marco (por fragmentos, no almacenado) → OK + plan
$ CEGUERA_PATTERN='<marco>' node proyectar-backlog.mjs export --dry-run
ceguera OK (8 WP validados …)
  · crear WP-01 → closed   · crear WP-05 → closed   … (✅→closed)
  · crear WP-09 → open     · crear WP-02 → open      (⬜/🔶→open)   EXIT=0

# 3) prueba roja: patrón presente en el backlog → aborta
$ CEGUERA_PATTERN='GitHub' node proyectar-backlog.mjs export --dry-run
CEGUERA FALLA: tokens de marco en WP-05, WP-08, WP-09. No se proyecta.   EXIT=1

$ bash comprobar-ceguera.sh → ceguera: 0 ; grep marco en ficheros WP-09 → 0
```

## Auto-revisión

- [x] Proyección, no sync (DC-10): import no escribe BACKLOG (→ INBOX).
- [x] Exportador propio, no git-bug (DC-11); adaptador `gh` aislado.
- [x] Gate de ceguera (DC-12) probado verde/rojo; patrón por env, no almacenado.
- [x] Mapeo open/closed sin labels (DC-14) verificado en el plan real.
- [x] `.sync-map.json`/`INBOX-GH.md` destinados a `plan/` (git-tracked; no residuo IDE, regla 15).
- [x] Idempotente (sync-map + marcador); dry-run no toca API.
- [x] Ceguera 0 en el skill.

## Hallazgos fuera de alcance

- Modo c (hook post-commit) y check de vigía (proyección no diverge) = follow-up (DC-13).
- Ceguera del `import` (contenido de issues públicos → INBOX git-tracked): borde menor; candidato.

## Dudas / bloqueos

- Live projection (crear los 8 issues) pendiente de GO del custodio (outward).

---

## Revisión del orquestador

**Aceptado ✅** — tool + método completos; dry-run probado sobre el backlog
real (parser + mapeo + gate verde/rojo); ceguera 0. Live projection = opt-in.
