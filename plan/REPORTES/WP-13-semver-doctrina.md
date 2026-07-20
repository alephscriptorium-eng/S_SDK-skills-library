# WP-13 · semver-doctrina — reporte

| dato | valor |
| ---- | ----- |
| agente | swarm-worker WP-13 |
| fecha | 2026-07-20 |
| rama | `wp/13-semver-doctrina` |
| commits | `13a2916` (obra) · `d0b3222` (hash en reporte) |
| eje(s) CA | ceguera |
| estado propuesto | aceptado ✅ (mergeado) |

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

**Aceptado ✅** (2026-07-20, rol REVIEWER / `REVISION.md`).

Verificado:
- Diff `main...wp/13-semver-doctrina` solo en ALCANCE_DIFF (+ reporte).
- CA doctrina DC-22 en README + CHANGELOG; `package.json` → `0.4.0`;
  badge método en `docs/.vitepress/skills-meta.js` intacto (`0.4.0`, DC-18).
- Eje ceguera: `comprobar-ceguera.sh` → 0; `git diff` / `git log -p` del
  alcance → 0 hits (medida `grep -c`).
- `verificar-changelog.mjs --version 0.4.0` → OK.
- C8 `npm view @0.4.0`: ⏳ (declarado; publish ops fuera de sesión).

**Merge (orquestador):** integrado en `main` por ff-only → `a51508c`
(2026-07-20). WP-14/15 volcados en `[0.4.0]`. Ola 6 cerrada.

**Override custodio (ops, 2026-07-20):** corte publicable retargetado
**0.4.0 → 0.3.4** (no se publica 0.4.0). Sección CHANGELOG / `package.json`
/ README alineados a 0.3.4; política DC-22 intacta. Ver nota en DC-22.

Nits no bloqueantes: ancla skill README usa «v0.4» (raíz/badge «v0.4.0»);
tabla de commits del reporte omite `be02d47`.
