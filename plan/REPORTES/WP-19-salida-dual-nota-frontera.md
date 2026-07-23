# WP-19 · salida dual + nota frontera — reporte

| dato | valor |
| ---- | ----- |
| agente | worker corrección |
| fecha | 2026-07-23 |
| rama | `wp/19-salida-dual-nota-frontera` |
| commits | `d06aa97` |
| eje(s) CA | ceguera + 14 |
| estado propuesto | devuelto-corregido |

## Qué se hizo

Se corrigió el lote de documentación del skill `estacion-viva` y `vigilancia`
para referenciar la nota de frontera local `plan/ESTACION.md` sin convertirla
en dato trackeado. La salida dual sigue materializándose en `OUT_DIR` y la
nota local queda explícitamente fuera de publicación.

No se tocó `plan/ESTACION.md`; sigue como calibración local untracked.

## Archivos tocados

- `skills/estacion-viva/README.md` · aclara la convivencia entre la nota local y la salida dual.
- `skills/estacion-viva/SKILL.md` · añade la referencia a `plan/ESTACION.md` como nota local.
- `skills/estacion-viva/reference/SALIDA-DUAL.md` · documenta que la nota de frontera no sustituye el contrato.
- `skills/vigilancia/SKILL.md` · incorpora la nota local dentro de la calibración opcional.
- `skills/vigilancia/reference/ESTACION.md` · explicita el tratamiento local-only de `plan/ESTACION.md`.

## Evidencia

> No inventes observaciones. Salida literal o `⏳ sin verificar`.

```text
$ git status --short
?? plan/ESTACION.md
?? plan/REPORTES/WP-19-salida-dual-nota-frontera.md

$ git log --oneline main..HEAD
d06aa97 Corrige referencias a la nota de frontera local

$ bash skills/estacion-viva/scripts/comprobar-ceguera.sh
ceguera: 0
raiz: /c/S_LAB/mundo-wp-19/skills/estacion-viva

$ git log -p -- skills/estacion-viva skills/vigilancia | rg -n -i -e '<patrón de ceguera redacted>' >/dev/null && echo 'historial: FAIL' || echo 'historial: 0'
historial: 0
```

## Auto-revisión (PRACTICAS del mundo — con honestidad)

- [x] Diff solo dentro de `ALCANCE_DIFF`: sí, los cambios tocan solo `skills/**` del brief y este reporte.
- [x] Cero árboles/ficheros copiados de otros mundos sin procedencia: sí, solo referencias a rutas ya existentes.
- [x] Sellos con fuente; rutas citadas existentes: sí, `plan/ESTACION.md` quedó citado como local-only.
- [x] Sin fluff ni promesa de futuro sin `<pendiente>`: sí, `commits` ya refleja `d06aa97`.
- [x] Eje(s) aplicables evidenciado(s): sí, ceguera + 14 por tocar la cara pública del skill.
- [x] Gates ejecutados de verdad: `bash skills/estacion-viva/scripts/comprobar-ceguera.sh` + historial reachable.
- [x] Commits convencionales: `d06aa97` usa mensaje en castellano y formato convencional del repo.
- [x] Diff solo del alcance del WP: sí, no se tocó `plan/BACKLOG.md` ni `plan/ESTACION.md`.

## Hallazgos fuera de alcance

Ninguno.

## Dudas / bloqueos

Ninguno.

---

## Revisión del orquestador

_(la rellena el orquestador: aceptado ✅ / devuelto con lista numerada)_
