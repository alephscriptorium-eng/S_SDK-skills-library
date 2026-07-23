# WP-18 · parser-ids-mixtos-fallo-ruidoso — reporte

| dato | valor |
| ---- | ----- |
| agente | worker swarm WP-18 |
| fecha | 2026-07-23 |
| rama | `wp/18-parser-ids-mixtos-fallo-ruidoso` |
| commits | `ec86019` |
| eje(s) CA | III + ceguera |
| estado propuesto | mergeado ✅ |

## Qué se hizo

Se amplió `scripts/proyectar-backlog.mjs` para aceptar encabezados de WP en
formato mixto, incluyendo el ID dentro del bold con título en la misma
línea, el ID dentro del bold con prosa fuera, y variantes con el ID fuera
del bold.
Se añadió fallo ruidoso: si una línea con `WP-` no encaja en ninguno de los
formatos admitidos, el export aborta con el número de línea y la línea
literal. No se omiten WPs en silencio.
Se actualizó `reference/proyeccion-issues.md` para documentar el contrato
nuevo del parser y el fallo explícito.

## Archivos tocados

- `skills/swarm-orquestacion/scripts/proyectar-backlog.mjs` · modificado — parser mixto + error explícito
- `skills/swarm-orquestacion/reference/proyeccion-issues.md` · modificado — contrato de formato y fallo ruidoso
- `plan/REPORTES/WP-18-parser-ids-mixtos-fallo-ruidoso.md` · creado — este reporte

## Evidencia

> Salida literal.

```
$ node --check skills/swarm-orquestacion/scripts/proyectar-backlog.mjs
OK

$ CEGUERA_PATTERN='___NO_MATCH___' node skills/swarm-orquestacion/scripts/proyectar-backlog.mjs export --dry-run
[proyectar] ceguera OK (14 WP validados contra el patrón del mundo).
[proyectar] export (DRY-RUN) · alcance=todos · 14 proyectado(s), 0 a cerrar · repo=(cwd)
  · actualizar WP-01 → closed (#1)
  · actualizar WP-05 → closed (#2)
  · actualizar WP-06 → closed (#3)
  · actualizar WP-07 → closed (#4)
  · actualizar WP-08 → closed (#5)
  · actualizar WP-09 → closed (#6)
  · actualizar WP-10 → closed (#7)
  · actualizar WP-11 → closed (#8)
  · crear WP-12 → closed
  · crear WP-13 → closed
  · crear WP-14 → closed
  · crear WP-15 → closed
  · crear WP-16 → closed
  · crear WP-17 → closed
[proyectar] OK.

$ CEGUERA_PATTERN='___NO_MATCH___' node skills/swarm-orquestacion/scripts/proyectar-backlog.mjs export --dry-run --backlog C:\Users\aleph\AppData\Local\Temp\wp18-parser-fixture.md
Error: [proyectar] encabezado WP no interpretable en línea 3: - ⬜ **WP-XX** prosa imposible
    at parseHeader (...)
```

## Auto-revisión (PRACTICAS del mundo — con honestidad)

- [x] Diff solo dentro de `ALCANCE_DIFF`: solo `scripts/proyectar-backlog.mjs` y `reference/proyeccion-issues.md`.
- [x] Cero árboles/ficheros copiados de otros mundos sin procedencia: no hubo copias.
- [x] Sellos con fuente; rutas citadas existentes: las rutas citadas existen en el worktree.
- [x] Sin fluff ni promesa de futuro sin `<pendiente>`: no se prometió nada fuera de lo verificado.
- [x] Eje(s) aplicables evidenciado(s): parser de proyección + ceguera verificados.
- [x] Gates ejecutados de verdad: `node --check`, dry-run real y prueba roja de fallo.
- [x] Commits convencionales: `ec86019`.
- [x] Diff solo del alcance del WP: sin tocar `plan/BACKLOG.md` ni `plan/ESTACION.md`.

## Hallazgos fuera de alcance

- Ninguno.

## Dudas / bloqueos

- Ninguno.

---

## Revisión del orquestador

**Aceptado ✅** — WP-18 quedó integrado en `origin/main` @ `eb64459`; el
tip de obra fue `ec86019` y el parser ya falla ruidosamente ante formatos
mixtos no interpretable.
