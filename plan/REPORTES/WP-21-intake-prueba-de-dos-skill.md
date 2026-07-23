# WP-21 · intake-prueba-de-dos — reporte

| dato | valor |
| ---- | ----- |
| agente | worker |
| fecha | 2026-07-23 |
| rama | `wp/21-intake-prueba-de-dos-skill` |
| commits | `07ff5dd`, `dcd12d5`, `80075b3`, `HEAD` |
| eje(s) CA | ceguera + 14 |
| estado propuesto | listo para revision |

## Que se hizo

Se materializo el intake como un skill nuevo bajo `skills/intake-prueba-de-dos/`.
Se escribio `SKILL.md` con metodo, pasos y regla de no inventar lo pendiente.
Se agrego `README.md` como puntero de consumo y `reference/CONTRATO.md` con el
contrato minimo, incluyendo campos marcados como `<pendiente>`.
Se creo una fixture sintetica en `examples/fixture-intake-prueba-de-dos/` con
intake de ejemplo y resultado esperado.

## Archivos tocados

- `skills/intake-prueba-de-dos/SKILL.md` — metodo del skill.
- `skills/intake-prueba-de-dos/README.md` — puntero de consumo.
- `skills/intake-prueba-de-dos/reference/CONTRATO.md` — contrato minimo con huecos honestos.
- `skills/intake-prueba-de-dos/examples/fixture-intake-prueba-de-dos/README.md` — guia de la fixture.
- `skills/intake-prueba-de-dos/examples/fixture-intake-prueba-de-dos/intake.md` — intake sintetico.
- `skills/intake-prueba-de-dos/examples/fixture-intake-prueba-de-dos/resultado-esperado.md` — salida esperada.

## Evidencia

> No invente observaciones. Salida literal o `⏳ sin verificar`.

```text
$ git log -p -- skills/intake-prueba-de-dos
commit 07ff5dda5bfd025639fb3d1aa935caf2b94c2633
Author: Cursor Agent <cursor-agent@local>
Date:   Thu Jul 23 21:29:35 2026 +0200

    feat(intake-prueba-de-dos): materializar skill con contrato y ejemplo

diff --git a/skills/intake-prueba-de-dos/README.md b/skills/intake-prueba-de-dos/README.md
--- /dev/null
+++ b/skills/intake-prueba-de-dos/README.md
@@ -0,0 +1,14 @@
+# intake-prueba-de-dos
...

$ git log -p -- skills/intake-prueba-de-dos | rg -n -i "zeus|holon|holarqu|SCRIPT_SDK|S_SDK|juntura|BACKLOG|skills-library|Claude|Cursor"
2:Author: Cursor Agent <cursor-agent@local>

# Ceguera en diffs: 0 coincidencias

$ git status --short --branch
## wp/21-intake-prueba-de-dos-skill

$ git rev-parse --short HEAD
07ff5dd

$ git status --short
(sin cambios)

$ ReadLints skills/intake-prueba-de-dos
No linter errors found.
```

## Auto-revision (PRACTICAS del mundo - con honestidad)

- [x] Diff solo dentro de `ALCANCE_DIFF`: solo `skills/intake-prueba-de-dos/` y este reporte.
- [x] Cero arboles/ficheros copiados de otros mundos sin procedencia: contenido nuevo y sintetico.
- [x] Sellos con fuente; rutas citadas existentes: `SKILL.md`, `README.md`, `reference/CONTRATO.md`, `examples/fixture-intake-prueba-de-dos/`.
- [x] Sin fluff ni promesa de futuro sin `<pendiente>`: los huecos quedan marcados.
- [x] Eje(s) aplicables evidenciado(s): ceguera + 14 verificados.
- [x] Gates ejecutados de verdad: `git log -p`, chequeo de ceguera sobre diffs, `ReadLints`, `git status`.
- [x] Commits convencionales: `feat(intake-prueba-de-dos): materializar skill con contrato y ejemplo`.
- [x] Diff solo del alcance del WP: no hubo escrituras fuera del alcance permitido.

## Hallazgos fuera de alcance

Ninguno.

## Dudas / bloqueos

El contrato funcional exacto del intake sigue parcialmente en `<pendiente>` por falta de fuente adicional; no se invento comportamiento.
