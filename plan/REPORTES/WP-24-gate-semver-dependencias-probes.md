# WP-24 · gate semver, dependencias directas y probes — reporte

| dato | valor |
| ---- | ----- |
| agente | worker fresco independiente WP-24 |
| fecha | 2026-07-24 |
| rama | `wp/24-gate-semver-dependencias-probes` |
| base viva | `2464a6d` |
| merge-base (`main`/`HEAD`) | `2464a6d` |
| commits alcanzables | `af631a1`, `c349070`, `14a7f31`, `b5047a7`, `e6ff017`, `0242cb2`, `2e56fc7` + commit documental post-rebase |
| eje(s) CA | III + IV + ceguera + regla 14 |
| estado propuesto | devuelto-corregido |

## Qué se hizo

Se corrigieron los siete puntos de la devolución en `b5047a7`.
El parser valida prerelease numérico y compara majors con `BigInt`; los
built-ins `node:` se reconocen mediante Node.
El gate descubre imports recorriendo `runtimeRoots`, contrasta el inventario,
ejecuta tests integrados `0.x` y aplica patrones dedup.
Treinta y dos probes ejercitan verdes, inválidos y falsos negativos.
Un paquete-fixture con runner propio acredita el segundo cliente.
La referencia conserva separado el gate local de C8 online.
No se añadió ninguna dependencia: script y probes usan solo built-ins de
Node 22; `package.json` y lockfile no cambiaron.

## Devolución numerada corregida

1. `1.2.3-01` se rechaza; probe `prerelease numérico con cero inicial`.
2. `major-band` usa `BigInt`; el caso sobre `Number.MAX_SAFE_INTEGER` falla.
3. `node:test`, `node:test/reporters` y `node:sqlite` pasan como built-ins.
4. `runtimeRoots` se escanea; inventario omitido no desactiva el análisis e
   inventario incompleto/dependencia directa sin uso fallan.
5. `integrationTests` ejecuta un script que importa y verifica comportamiento
   de `alpha@0.x`; ausencia y exit 1 fallan.
6. `dedupPatterns` cuenta definiciones; el fixture duplicado falla con dos.
7. `cliente-independiente/` aporta manifiesto, configuración, fuente y runner
   propios que invocan el CLI fuera del runner matricial.

## Segunda devolución numerada corregida

1. Los built-ins solo pasan con prefijo `node:`. `node:test`,
   `node:test/reporters` y `node:sqlite` siguen verdes; `fs` bare falla tanto
   descubierto en `runtimeRoots` como declarado en `runtimeImports`.
2. El diff completo contiene nueve rutas, enumeradas y medidas abajo; se
   eliminó la referencia obsoleta a cinco.

## Archivos tocados

- Creado `skills/swarm-orquestacion/reference/politica-dependencias-semver.md`: contrato, configuración y frontera C8.
- Creado `skills/swarm-orquestacion/scripts/verificar-dependencias-semver.mjs`: gate local determinista.
- Modificado `skills/swarm-orquestacion/examples/fixture-semver/cases.json`: 32 casos declarativos.
- Creado `skills/swarm-orquestacion/examples/fixture-semver/probes.mjs`: runner efímero sin red.
- Creado `skills/swarm-orquestacion/examples/fixture-semver/cliente-independiente/package.json`: segundo manifiesto.
- Creado `skills/swarm-orquestacion/examples/fixture-semver/cliente-independiente/dependencias-semver.json`: política propia.
- Creado `skills/swarm-orquestacion/examples/fixture-semver/cliente-independiente/src/index.mjs`: fuente runtime propia.
- Creado `skills/swarm-orquestacion/examples/fixture-semver/cliente-independiente/probe.mjs`: runner independiente.
- Creado `plan/REPORTES/WP-24-gate-semver-dependencias-probes.md`: este reporte.

Total: **9 rutas**.

## Evidencia

```text
$ node --check skills/swarm-orquestacion/scripts/verificar-dependencias-semver.mjs
$ node --check skills/swarm-orquestacion/examples/fixture-semver/probes.mjs
exit 0

$ node skills/swarm-orquestacion/examples/fixture-semver/probes.mjs
PASS verde exact · exit=0
PASS prerelease numérico con cero inicial · exit=1
PASS verde caret · exit=0
PASS verde major-band · exit=0
PASS major-band sin pérdida de precisión · exit=1
PASS built-ins node prefix y subpath · exit=0
PASS built-in bare en fuentes rechazado · exit=1
PASS built-in bare en inventario rechazado · exit=1
PASS versión no resuelta queda para C8 · exit=0
PASS verde cero con integración · exit=0
PASS cero sin integración · exit=1
PASS cero con integración fallida · exit=1
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
PASS inventario omitido se descubre desde fuentes · exit=0
PASS inventario incompleto detectado · exit=1
PASS dependencia directa sin uso detectada · exit=1
PASS dedup definición duplicada · exit=1
PASS deny prevalece · exit=1
PASS fuera de allow · exit=1
PASS override por paquete · exit=0
probes semver: OK (32/32) · sin red

$ node skills/swarm-orquestacion/examples/fixture-semver/cliente-independiente/probe.mjs
[dependencias-semver] OK: 1 dependencia(s) runtime; 1 fuente(s); 0 integración(es); gate local sin red; C8 no se ejecutó
cliente independiente: OK · gate ejercitado sin red

$ bash skills/swarm-orquestacion/scripts/comprobar-ceguera.sh
ceguera: 0
raiz: /c/S_LAB/skills-library-wp-24/skills/swarm-orquestacion

$ git log -p -- <rutas WP-24> | rg -q -i -e "$PATTERN"
ceguera historial: 0

$ git diff --name-only 2464a6d...HEAD
plan/REPORTES/WP-24-gate-semver-dependencias-probes.md
skills/swarm-orquestacion/examples/fixture-semver/cases.json
skills/swarm-orquestacion/examples/fixture-semver/cliente-independiente/dependencias-semver.json
skills/swarm-orquestacion/examples/fixture-semver/cliente-independiente/package.json
skills/swarm-orquestacion/examples/fixture-semver/cliente-independiente/probe.mjs
skills/swarm-orquestacion/examples/fixture-semver/cliente-independiente/src/index.mjs
skills/swarm-orquestacion/examples/fixture-semver/probes.mjs
skills/swarm-orquestacion/reference/politica-dependencias-semver.md
skills/swarm-orquestacion/scripts/verificar-dependencias-semver.mjs

C8 online (npm view + instalación limpia + integración):
⏳ sin verificar — separado deliberadamente; no se ejecutó red por mandato.
```

Eje III: el gate dedup configurable devuelve fallo ante dos definiciones del
símbolo de contrato. Eje IV: el segundo paquete-fixture tiene manifiesto,
configuración, fuente y runner propios; ejecutó el CLI con PASS.

## Auto-revisión (PRACTICAS del mundo — con honestidad)

- [x] Diff solo dentro de `ALCANCE_DIFF`: las nueve rutas listadas están autorizadas.
- [x] Cero árboles/ficheros copiados de otros mundos sin procedencia: implementación y fixtures nuevos.
- [x] Sellos con fuente; rutas citadas existentes: evidencia literal de esta rama.
- [x] Sin fluff ni promesa de futuro sin `<pendiente>`: C8 figura `⏳ sin verificar`.
- [x] Eje(s) aplicables evidenciado(s): III, IV, ceguera de árbol y regla 14.
- [x] Gates ejecutados de verdad: sintaxis, 32/32 probes, segundo cliente y ceguera.
- [x] Commits convencionales: correcciones `b5047a7` y `0242cb2`; reportes separados.
- [x] Diff solo del alcance del WP: confirmado con `2464a6d...HEAD`; sin BACKLOG, roles, ciclo ni SKILL.

## Hallazgos fuera de alcance

Ninguno.

## Dudas / bloqueos

- C8 online queda `⏳ sin verificar` porque esta corrección prohíbe ejecutar
  red. No bloquea el gate local; sí queda pendiente para el corte autorizado.
- La devolución numerada quedó corregida; corresponde al revisor independiente
  u orquestador revalidarla.

---

## Revisión del orquestador

Contrarrevisión pre-integración inicial: **DEVUELTO**.

1. El reporte conservaba base y hashes anteriores al rebase.

Corrección: reporte post-rebase sobre base `2464a6d`.

Contrarrevisión independiente, fresca y read-only final:
**VEREDICTO_REVISOR: PASS**.

- Base, `main` y merge-base: `2464a6d`.
- Tip revisado: `9269c7f`.
- Alcance: nueve rutas autorizadas.
- Probes 32/32, segundo cliente, built-ins y Ejes III/IV: PASS.
- C8 online: `⏳ sin verificar`, separado y sin red.
- Ceguera árbol/historial, `diff --check` y estado: limpios.
- El cambio concurrente `2464a6d` no altera los CA de WP-24.

## Veredicto: Aceptado ✅

El orquestador acepta WP-24 para integración atómica tras el PASS
pre-integración. Orden: tercero de la Ola 1 en esta sesión.
