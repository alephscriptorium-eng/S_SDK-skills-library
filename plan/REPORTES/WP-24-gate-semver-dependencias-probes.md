# WP-24 · gate semver, dependencias directas y probes — reporte

| dato | valor |
| ---- | ----- |
| agente | worker fresco independiente WP-24 |
| fecha | 2026-07-24 |
| rama | `wp/24-gate-semver-dependencias-probes` |
| commits | `5e8a6be` + commit documental de este reporte |
| eje(s) CA | III + IV + ceguera + regla 14 |
| estado propuesto | listo para contrarrevisión independiente |

## Qué se hizo

Se añadió un gate local sin red para políticas `exact`, `caret-semver` y
`major-band`, con allow/deny e inventario auditable de imports runtime.
El gate rechaza dependencias transitivas o solo-dev y exige evidencia de
integración para mínimos `0.x`, además del warning explícito.
La referencia separa el resultado local de C8 online.
Veintidós probes ejercitan verdes, inválidos y falsos negativos, incluida una
versión no resuelta que el gate local deja expresamente para C8.
No se añadió ninguna dependencia: script y probes usan solo built-ins de
Node 22; `package.json` y lockfile no cambiaron.

## Archivos tocados

- Creado `skills/swarm-orquestacion/reference/politica-dependencias-semver.md`: contrato, configuración y frontera C8.
- Creado `skills/swarm-orquestacion/scripts/verificar-dependencias-semver.mjs`: gate local determinista.
- Creado `skills/swarm-orquestacion/examples/fixture-semver/cases.json`: 21 casos declarativos.
- Creado `skills/swarm-orquestacion/examples/fixture-semver/probes.mjs`: runner efímero sin red.
- Creado `plan/REPORTES/WP-24-gate-semver-dependencias-probes.md`: este reporte.

## Evidencia

```text
$ node --check skills/swarm-orquestacion/scripts/verificar-dependencias-semver.mjs
$ node --check skills/swarm-orquestacion/examples/fixture-semver/probes.mjs
exit 0

$ node skills/swarm-orquestacion/examples/fixture-semver/probes.mjs
PASS verde exact · exit=0
PASS verde caret · exit=0
PASS verde major-band · exit=0
PASS versión no resuelta queda para C8 · exit=0
PASS verde cero con integración · exit=0
PASS cero sin integración · exit=1
PASS tag rechazado · exit=1
PASS wildcard rechazado · exit=1
PASS url rechazada · exit=1
PASS git rechazado · exit=1
PASS alias rechazado · exit=1
PASS ruta rechazada · exit=1
PASS rango abierto rechazado · exit=1
PASS techo de banda falso negativo · exit=1
PASS abreviatura exact falsa negativa · exit=1
PASS union caret falsa negativa · exit=1
PASS ceros iniciales falsos negativos · exit=1
PASS runtime solo dev · exit=1
PASS runtime transitiva ausente · exit=1
PASS deny prevalece · exit=1
PASS fuera de allow · exit=1
PASS override por paquete · exit=0
probes semver: OK (22/22) · sin red

$ bash skills/swarm-orquestacion/scripts/comprobar-ceguera.sh
ceguera: 0
raiz: /c/S_LAB/skills-library-wp-24/skills/swarm-orquestacion

$ git log -p -- <rutas WP-24> | rg -q -i -e "$PATTERN"
ceguera historial: 0

$ git diff --name-only 71e446a..5e8a6be
skills/swarm-orquestacion/examples/fixture-semver/cases.json
skills/swarm-orquestacion/examples/fixture-semver/probes.mjs
skills/swarm-orquestacion/reference/politica-dependencias-semver.md
skills/swarm-orquestacion/scripts/verificar-dependencias-semver.mjs

C8 online (npm view + instalación limpia + integración):
⏳ sin verificar — separado deliberadamente; no se ejecutó red por mandato.
```

Eje III: los probes de techo incorrecto, abreviatura, unión de rangos, ceros
iniciales y dependencia transitiva fallan si el parser deja pasar falsos
negativos. Eje IV: manifiestos independientes ejercitan las tres políticas y
una combinación con override por paquete como clientes del mismo gate.

## Auto-revisión (PRACTICAS del mundo — con honestidad)

- [x] Diff solo dentro de `ALCANCE_DIFF`: las cinco rutas están autorizadas.
- [x] Cero árboles/ficheros copiados de otros mundos sin procedencia: implementación y fixtures nuevos.
- [x] Sellos con fuente; rutas citadas existentes: evidencia literal de esta rama.
- [x] Sin fluff ni promesa de futuro sin `<pendiente>`: C8 figura `⏳ sin verificar`.
- [x] Eje(s) aplicables evidenciado(s): III, IV, ceguera de árbol y regla 14.
- [x] Gates ejecutados de verdad: sintaxis, 22/22 probes y ceguera.
- [x] Commits convencionales: `feat(semver): ...`; reporte documental separado.
- [x] Diff solo del alcance del WP: confirmado contra `71e446a`.

## Hallazgos fuera de alcance

Ninguno.

## Dudas / bloqueos

- La contrarrevisión independiente read-only requerida por el BRIEF queda
  pendiente del orquestador; este worker no puede autoemitirla ni lanzar otro
  agente.
- C8 online queda `⏳ sin verificar` porque este WP prohíbe ejecutar red.

---

## Revisión del orquestador

_(la rellena el orquestador: aceptado ✅ / devuelto con lista numerada)_
