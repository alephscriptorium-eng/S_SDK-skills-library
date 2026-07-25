# Reporte — WP-27 · Parser de proyección multi-serie

Rama: `wp/27-parser-multi-serie` (base `origin/main` @ `cbebbcc`)
Autoriza: DC-29 (GO custodio) · contrato: DA-S17/DC-25 → WP nuevo (no reabre WP-18).

## Qué se hizo

1. **Series de ID configurables (DC-29).** El parser de
   `proyectar-backlog.mjs` acepta las series del mundo por
   `--series 'REGEX|REGEX|…'` o env `PROYECCION_SERIES` (alternación de
   regex de ID separada por `|`). Sin declaración → serie por defecto
   `WP-[A-Za-z0-9]+` (retrocompatible: `WP-XX`, `WP-Unnn`, `WP-I60`).
2. **Fallo ruidoso ante mixtos no declarados.** Si el backlog tiene ítems
   con forma de ID de una serie **no declarada**, o si de N ítems se
   parsean **0 WPs**, el parser lanza y el CLI sale con **exit 5** e imprime
   las series detectadas + las declaradas + líneas de ejemplo. Nunca omite
   WPs en silencio ni proyecta vacío.
3. **CERO normalización (DA-S17).** El ID se conserva literal (clave del
   `sync-map` y del marcador `<!-- proyeccion:ID -->`). `BB-02` no pasa a
   `BB-2`; `GF-0.10.0-Z` no se trunca. La lógica de sync-map/marcadores no
   se tocó.
4. **Tests `node --test`** junto al script
   (`proyectar-backlog.test.mjs`), fixtures **sintéticas** y
   método-agnósticas (series AA/BB/CC/N0/WP-U/GF; sin nombres de mundo).
5. **reference/proyeccion-issues.md** actualizado: nueva sección «Series de
   ID configurables (DC-29)» + puntero al test; se generalizó `WP-XX` → `ID`.
6. **Guard `isMain`**: el módulo exporta `parseBacklog`/`seriesList` sin
   ejecutar el CLI al importarse (necesario para los tests).

Detalle de diseño (contrarrevisión propia): el parser primero intenta las
series **declaradas** (regex completa, soporta IDs con dots/dashes como
`GF-0.10.0-Z`); solo si ninguna casa clasifica el token con un detector
genérico (`prefijo-…dígito…`) para distinguir **serie declarada rota**
(→ error WP-18 «no interpretable», por línea) de **serie no declarada**
(→ error WP-27 agregado). El detector exige un dígito para no marcar
palabras compuestas.

## CA por CA — evidencia literal

### CA1 · BACKLOG multi-serie sintético → N WPs correctos (antes 0)
`node --test` test 1 y CLI dry-run sobre fixture `IB/PD/LIB`:
```
[proyectar] ceguera OK (3 WP validados contra el patrón del mundo).
[proyectar] export (DRY-RUN) · alcance=todos · 3 proyectado(s), 23 a cerrar · repo=(cwd)
  · crear IB-1 → open
  · crear PD-2 → open
  · crear LIB-3 → closed
```
Evidencia sobre BACKLOG **real** del repo: con `--series
'WP-[A-Za-z0-9]+|GF-[0-9.]+-[A-Z]'` parsea **28** WPs (incluye
`GF-0.10.0-Z`, que el parser viejo dejaba caer en silencio):
```
[proyectar] ceguera OK (28 WP validados contra el patrón del mundo).
[proyectar] export (DRY-RUN) · alcance=todos · 28 proyectado(s), 0 a cerrar · repo=(cwd)
```

### CA2 · Mixto no declarado → fallo ruidoso con diagnóstico
CLI sobre fixture multi-serie con serie **por defecto** (no declara IB/PD/LIB):
```
[proyectar] IDs de serie(s) NO declarada(s) en el backlog: IB, PD, LIB.
  series declaradas: WP-[A-Za-z0-9]+
  3 ítem(s) afectado(s); ejemplos:
    línea 2: - ⬜ **IB-1 · Uno de la serie IB**
    ...
  declara las series con --series 'REGEX|REGEX' o PROYECCION_SERIES. NO se proyecta (evita omitir WPs en silencio).
exit=5
```
Tests 3, 4, 10 cubren mixto no declarado, «0 WPs de N ítems» y ID complejo
no declarado. Todos `assert.throws`.

### CA3 · Sin normalización; sync-map y marcadores intactos para WP-XX
Test 5 (`N0-5` literal), test 1 (`BB-02` **no** → `BB-2`), test 9
(`GF-0.10.0-Z` literal, sin truncar). La lógica de `sync-map`/marcador
(`w.id`) no se modificó; retrocompat verificada con test 6 y con el BACKLOG
real (28 WPs). `git diff` no toca el bloque de sync-map.

### CA4 · Contrarrevisión independiente PASS antes de ✅
**PENDIENTE** — es el eje de revisión externa del orquestador/revisión; no
lo ejecuta el worker. Auto-contrarrevisión realizada (reordenación
declarado-primero + detector con dígito) y documentada arriba.

## Suite de tests (15/15 verde)
```
ok 1 - multi-serie declarado → parsea N WPs con IDs literales (antes 0)
ok 2 - estilo WP-Unnn con serie por defecto → parsea (WP-U172, WP-I60…)
ok 3 - mixto NO declarado → FALLA ruidoso con diagnóstico de series
ok 4 - todos los ítems de serie ajena a la default → FALLA (nunca 0 en silencio)
ok 5 - CERO normalización: ID literal preservado (N0-5, BB-02)
ok 6 - retrocompat: formas mixtas de encabezado con serie por defecto
ok 7 - serie declarada pero encabezado no interpretable → FALLA (WP-18)
ok 8 - ítem con estado pero SIN forma de ID → se ignora (no es WP)
ok 9 - serie con ID complejo (dots/dashes) declarada → parsea literal
ok 10 - mismo ID complejo SIN declarar → FALLA ruidoso (no se omite)
ok 11 - seriesList parte la alternación para diagnóstico
ok 12 - cuerpo del WP se acumula hasta el siguiente ítem/encabezado
ok 13 - CLI: serie NO declarada → exit 5 + stderr nombra la serie
ok 14 - CLI: backlog solo-prosa (0 líneas de ítem) → exit 5 + «NINGUNA línea de ítem»
ok 15 - CLI: fixture válida declarada → exit 0 + proyecta
1..15
# tests 15
# pass 15
# fail 0
```

## Ceguera (comprobar-ceguera.sh)
```
ceguera: 0
raiz: /c/S_LAB/.worktrees/lib/wp-27-parser-multi-serie/skills/swarm-orquestacion
```

## ALCANCE_DIFF (estricto, cumplido)
```
 skills/swarm-orquestacion/reference/proyeccion-issues.md   |  38 +++-
 skills/swarm-orquestacion/scripts/proyectar-backlog.mjs    | 148 +++++++--
 skills/swarm-orquestacion/scripts/proyectar-backlog.test.mjs (nuevo)
```
No se tocó `plan/BACKLOG.md`, `bin/`, `docs/` ni otros skills. Sin push, sin
merge. No se usó junction de `node_modules` (los tests solo usan built-ins
de Node — `node:test`, `node:assert`).

## Hallazgo relevante (para el orquestador)
El BACKLOG **real** del repo contiene en la línea 439 un ítem
`GF-0.10.0-Z` (gate de release Z). El parser **anterior** (solo `WP-`) lo
descartaba en **silencio** (28→27 WPs). El parser nuevo lo **exige
declarar**: con serie por defecto falla ruidoso (exit 5, «NO declarada:
GF»); declarando `GF-[0-9.]+-[A-Z]` se proyectan los 28. Es exactamente el
bug DA-S17/DC-25 reproducido y cerrado sobre datos reales. Decisión de qué
serie declarar por defecto en este mundo = del orquestador (no se tocó el
BACKLOG).

## Corrección (devolución de contrarrevisión)

### OBS-1 (BLOQUEANTE) — «parsea 0» ya no es posible en silencio
El guard antiguo `wps.length === 0 && itemLinesSeen > 0` dejaba pasar el
caso **sin ninguna línea de ítem** (ruta equivocada / BACKLOG truncado /
merge roto): `export --dry-run` sobre solo-prosa daba `0 proyectado(s)`,
exit 0 — y con un sync-map poblado habría cerrado TODOS los issues sin
aviso. **FIX:** `wps.length === 0` es fallo ruidoso **SIEMPRE** (exit 5),
con diagnóstico que distingue las dos causas. También se corrigió el
comentario de cabecera para afirmar lo que el código hace.

Evidencia literal (CLI real):
```
# solo-prosa (0 líneas de ítem):
[proyectar] 0 WPs: el backlog no tiene NINGUNA línea de ítem (- ⬜/🔶/✅). ¿ruta equivocada, fichero truncado o merge roto? No se proyecta en silencio.
exit=5
# ítems con estado pero SIN ID de serie declarada:
[proyectar] 0 WPs de 2 ítem(s): ninguno lleva ID de serie declarada. Revisa --series (series declaradas: WP-[A-Za-z0-9]+). No se proyecta en silencio.
exit=5
```

### OBS-2 (menor) — tests que muerden el contrato de exit codes
Se añadieron tests **a nivel CLI** (`spawnSync` del script real, dir temp
aislado con `--map` inexistente): (a) serie no declarada → exit 5 + nombra
la serie; (b) solo-prosa → exit 5 + «NINGUNA línea de ítem»; (c) fixture
válida → exit 0. **Verificación de mutación** (reproducida): mutando el
`catch` de `doExport` para tragarse el error y seguir con `wps=[]`, la suite
cae `pass 13 / fail 2` (tests 13 y 14 esperan exit 5 y obtienen 0):
```
not ok 13 - CLI: serie NO declarada → exit 5 + stderr nombra la serie
not ok 14 - CLI: backlog solo-prosa (0 líneas de ítem) → exit 5 + «NINGUNA línea de ítem»
# pass 13 # fail 2
```
Sin mutación, 15/15 verde.

## Pendientes honestos
- CA4 (contrarrevisión independiente): confirmada por el revisor salvo las
  dos OBS, ya corregidas; segunda pasada del revisor pendiente.
- El truncado de título en la forma **no-bold** `ID · título` (a la primera
  palabra) es comportamiento **preexistente** del parser (WP-18); no se
  alteró. Los WPs reales usan `**negrita**` (título completo). Fuera de
  alcance.
