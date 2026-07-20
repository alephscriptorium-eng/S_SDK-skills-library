# WP-13 · semver-doctrina — reporte

| dato | valor |
| ---- | ----- |
| agente | swarm-worker WP-13 |
| fecha | 2026-07-20 |
| rama | `wp/13-semver-doctrina` |
| commits | `13a291679630ffcdce0549973a3830c251ec1cd8` |
| eje(s) CA | ceguera |
| estado propuesto | listo para revisión |

## Qué se hizo

Se fijó la doctrina semver (DC-22) en cara pública del pack y se cortó
**0.4.0** (minor) reconciliando la expansión de contrato acumulada:

- README raíz: tabla semver-paquete vs versión-de-método; política
  minor/patch/major; correspondencia actual (paquete 0.4.0 ↔ badge
  método v0.4.0 sin contradecir DC-18).
- CHANGELOG: sección `[0.4.0]` con WP-13 (texto del backlog) + nota
  `<pendiente al merge final>` para ids WP-14/WP-15.
- `package.json` → `0.4.0`; refs de consumo en README actualizadas.
- Ancla corta en `skills/swarm-orquestacion/README.md` (método v0.4 ≠
  semver npm; remite al README raíz).

Sin merge a `main`. Sin tocar BACKLOG. Sin `docs/` ni scripts del gate
(WP-14/15).

## Archivos tocados

- `package.json` · bump 0.3.3 → 0.4.0
- `README.md` · doctrina DC-22 + refs @0.4.0
- `CHANGELOG.md` · sección [0.4.0] + doctrina en cabecera
- `skills/swarm-orquestacion/README.md` · ancla versión de método
- `plan/REPORTES/WP-13-semver-doctrina.md` · este reporte

## Evidencia

```
$ bash skills/swarm-orquestacion/scripts/comprobar-ceguera.sh
ceguera: 0
raiz: …/skills/swarm-orquestacion

$ node skills/swarm-orquestacion/scripts/verificar-changelog.mjs --version 0.4.0
[verificar-changelog] version=0.4.0 · WP ✅ en backlog: 10
[verificar-changelog] OK: sección 0.4.0 presente y todos los WP ✅ referenciados.

# ceguera en diff del WP (patrón del script comprobar-ceguera)
$ git diff -- README.md CHANGELOG.md package.json skills/swarm-orquestacion/README.md | grep -ciE '<patrón>'
0

# C8 registry
$ npm view @alephscript/skills-scriptorium@0.4.0 … version
⏳ sin verificar — publish ops/CI pendiente (igual que releases previos)
```

## Auto-revisión (PRACTICAS del mundo — con honestidad)

- [x] Diff solo dentro de `ALCANCE_DIFF`: pack + ancla skill README + reporte
- [x] Cero árboles/ficheros copiados de otros mundos sin procedencia
- [x] Sellos con fuente (DC-18/DC-22); rutas citadas existentes
- [x] Sin fluff; C8 y WP-14/15 marcados `<pendiente>`
- [x] Eje ceguera: árbol skill = 0; diff WP = 0
- [x] Gates: `comprobar-ceguera` + `verificar-changelog` OK
- [x] Commits convencionales en castellano
- [x] Diff solo del alcance del WP (no BACKLOG ✅, no merge)

## Hallazgos fuera de alcance

- `docs/` (consumo, index, proyecto, `verdad-checks.json`) siguen citando
  `@0.3.3`. Fuera de ALCANCE (WP-15 / merge final). Tras merge de 0.4.0
  hay que alinear refs del portal o fallará la verdad de contenido si se
  actualiza el manifiesto sin el HTML.
- `package.json` `repository.url` contiene `S_SDK-…` (preexistente; no
  introducido por este WP). Fuera del chequeo de `comprobar-ceguera.sh`
  (solo árbol del skill).

## Dudas / bloqueos

- Ninguno bloqueante. Cadencia: merge **último** del lote tras ✅ WP-14 y
  WP-15; al merge final volcar sus entradas en `[0.4.0]`.

---

## Revisión del orquestador

_(la rellena el orquestador: aceptado ✅ / devuelto con lista numerada)_
