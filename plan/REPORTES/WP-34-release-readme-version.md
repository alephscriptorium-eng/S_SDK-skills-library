# WP-34 · Higiene de release: versión de README — reporte

| dato | valor |
| ---- | ----- |
| agente | worker-lib |
| fecha | 2026-07-25 |
| rama | `wp/34-release-readme-version` |
| commits | _(ver tip de rama)_ |
| eje(s) CA | gate/script (falla ruidoso + fixtures rojo/verde) |
| riesgo de revisión | `independiente` |
| revisor distinto del worker | `⏳ sin verificar` (CA exige contrarrevisión independiente PASS) |
| estado propuesto | listo para revisión |

## Qué se hizo

Se creó el gate hermano `verificar-release.mjs` (junto a
`verificar-changelog.mjs`) que verifica la **cara del tarball**: la versión
de `package.json` aparece en el README y **ninguna anterior figura como
actual**. Deriva `name`+versión de `package.json` (no hardcodea versiones);
detecta referencias de actualidad (`@<pkg>@X.Y.Z`, tarball
`<pkg>-X.Y.Z.tgz`, marcadores `(actual …)` y `paquete **…**`) y respeta las
versiones de solo-historia (`corte 0.9.0`). Se corrigió el drift real del
README raíz (0.10.0 → 0.11.0 en 5 sitios + ejemplo de tarball 0.3.4 →
0.11.0). Tests `node --test` con fixtures sintéticas (drift → falla; limpio
→ pasa). El paso quedó documentado en la doctrina de release
(`reglas-metodo-v04.md`, § anti-drift + checklist `chore(release)`).

## Archivos tocados

- `skills/swarm-orquestacion/scripts/verificar-release.mjs` — **creado**: gate anti-drift de versión del README.
- `skills/swarm-orquestacion/scripts/verificar-release.test.mjs` — **creado**: 4 tests (fixtures sintéticas rojo/verde + presencia + error de uso).
- `skills/swarm-orquestacion/reference/reglas-metodo-v04.md` — **modificado**: nueva § «Versión del README del paquete (anti-drift de release)» + checklist `chore(release)`.
- `README.md` (raíz) — **modificado**: SOLO fix de versión (0.10.0 → 0.11.0 ×5 sitios; ejemplo tarball 0.3.4 → 0.11.0). `0.9.0` histórico intacto.

## Evidencia

### CA1 — gate FALLA ruidoso con drift (README real pre-fix, package.json 0.11.0)

```
$ node skills/swarm-orquestacion/scripts/verificar-release.mjs --pkg package.json --readme README.md
[verificar-release] pkg=package.json · version=0.11.0 · readme=README.md
  ✗ README.md: la versión actual 0.11.0 (de package.json) NO aparece en el README (drift de release)
  ✗ README.md:64: referencia npm (@alephscript/skills-scriptorium@…) declara 0.10.0 pero la versión actual es 0.11.0
  ✗ README.md:114: referencia npm (@alephscript/skills-scriptorium@…) declara 0.10.0 pero la versión actual es 0.11.0
  ✗ README.md:131: tarball npm pack (alephscript-skills-scriptorium-….tgz) declara 0.3.4 pero la versión actual es 0.11.0
  ✗ README.md:30: marcador «(actual …)» declara 0.10.0 pero la versión actual es 0.11.0
  ✗ README.md:49: prosa «el paquete **…**» declara 0.10.0 pero la versión actual es 0.11.0

[verificar-release] FALLO: 6 desfase(s) de versión en la cara del tarball. El README (files) debe cerrar con package.json 0.11.0; ninguna versión anterior puede figurar como actual.
exit=1
```

(Salida capturada con la etiqueta ya corregida `@alephscript/…` sin `@@`.)

### CA2 + CA1(verde) — README real corregido → gate PASA

```
$ node skills/swarm-orquestacion/scripts/verificar-release.mjs --pkg package.json --readme README.md
[verificar-release] pkg=package.json · version=0.11.0 · readme=README.md
[verificar-release] OK: README.md cita la versión actual 0.11.0 y ninguna anterior figura como actual.
exit=0

$ grep -nE "0\.(3\.4|9\.0|10\.0)" README.md
52:**0.9.0**.        # única versión anterior restante = corte histórico (correcto)
```

### CA1 (fixtures sintéticas) — `node --test`

```
$ node --test skills/swarm-orquestacion/scripts/verificar-release.test.mjs \
       skills/swarm-orquestacion/scripts/proyectar-backlog.test.mjs
# tests 19
# pass 19
# fail 0
```

Los 4 tests de `verificar-release.test.mjs` (paquete ficticio `@acme/widget`):
README sin drift → exit 0 y NO marca `0.9.0` histórico; README con drift →
exit 1 nombrando `README.md` + `0.10.0` + `0.11.0` + cada marcador; drift solo
en un marcador (presencia OK) → falla por ese marcador sin falso «no aparece»;
`package.json` inexistente → exit 2.

### CA3 — integración con el flujo existente

Gate hermano de `verificar-changelog.mjs` en el mismo `scripts/`, con la misma
disciplina opt-in/parametrizable (flags `--pkg/--readme/--doc/--marcador`).
Documentado junto a la práctica de CHANGELOG en `reglas-metodo-v04.md` con
checklist `chore(release)` que encadena `verificar-changelog` (sección) +
`verificar-release` (README) antes de `npm pack`/`publish`.

## Evidencia de riesgo y contrarrevisión

- `CASOS_ADVERSARIALES`:
  - `[automatizado]` Falso positivo de versión histórica: fixture limpio con
    `corte **0.9.0**` presente → gate NO lo marca (`assert.doesNotMatch
    stderr /0.9.0/`), exit 0. Real: `0.9.0` en README raíz línea 52 intacto y
    no reportado.
  - `[automatizado]` Presencia sin marcadores: drift solo en `(actual …)` con
    `@pkg@0.11.0` presente → falla por el marcador, sin falso «NO aparece».
  - `[manual]` Línea 116 (`# → 0.10.0` comentario de salida de `npm view`) no
    la cubren los patrones; se corrigió en el mismo lote a `0.11.0` por
    coherencia (es eco del `@pkg@` de la línea 114, sí gateado).
- `DEPENDENCIAS_DIRECTAS_VERIFICADAS`: solo built-ins de Node (`node:fs`,
  `node:child_process`, `node:test`, `node:os`, `node:path`, `node:url`). Sin
  deps externas. Node v22.21.1.
- `INSTALACION_LIMPIA`: no aplica (sin `npm install`; script standalone
  ejecutado directo con `node`, evidencia arriba).
- `TEST_AUTOMATIZADO_VS_EVIDENCIA_MANUAL`:
  - Automatizado: `verificar-release.test.mjs` (4 probes repetibles vía
    `spawnSync` del CLI real en dir temporal aislado).
  - Manual: ejecución del gate contra el README real pre/post-fix (CA1/CA2).
- `VEREDICTO_REVISOR`: `⏳ pendiente de revisor distinto` (CA exige
  contrarrevisión independiente PASS antes de ✅; el worker no se autocertifica).

## Auto-revisión (PRACTICAS del mundo — con honestidad)

- [x] Diff solo dentro de `ALCANCE_DIFF`: `scripts/**` (+test), reference de
  release (`reglas-metodo-v04.md`), `README.md` raíz (solo versión), reporte.
- [x] Cero árboles/ficheros copiados de otros mundos sin procedencia: todo original.
- [x] Sellos con fuente; rutas citadas existentes: comandos y salidas literales.
- [x] Sin fluff ni promesa de futuro sin `<pendiente>`.
- [x] Eje(s) aplicables evidenciado(s): gate rojo/verde + fixtures.
- [x] Gates ejecutados de verdad: salida literal arriba.
- [x] Commits convencionales.
- [x] Diff solo del alcance del WP: verificado con `git status` (sin tocar
  CHANGELOG.md, package.json, plan/BACKLOG.md, estacion-viva, vigilancia).
- [x] Riesgo y contraevidencia del brief cubiertos: falso positivo histórico + presencia.
- [x] Pruebas automatizadas separadas de evidencia manual.

## Hallazgos fuera de alcance

- SKILL.md (tabla de inventario de scripts) y `skills/swarm-orquestacion/README.md`
  (§ Gate) NO listan `verificar-release.mjs` — se dejaron sin tocar por respeto
  estricto al ALCANCE_DIFF («su reference de release»). Candidato a follow-up:
  añadir la fila de inventario y el bloque de uso para descubribilidad.
- La prosa «el paquete 0.11.0 amplía … sobre el corte 0.9.0» describe qué
  añadió el corte; se hizo SOLO el fix de número (no reescritura de release
  notes, que sería scope de CHANGELOG — prohibido aquí).

## Dudas / bloqueos

Ninguno. `node --test <dir>` (forma con directorio) falla en este Node al
tratar el dir como módulo; se usó la forma con ficheros explícitos (misma que
resuelve el resto del suite).

---

## Revisión del orquestador

_(la rellena el orquestador: aceptado ✅ / devuelto con lista numerada)_
