# WP-07 · changelog — reporte

| dato | valor |
| ---- | ----- |
| agente | orquestador (implementación directa) |
| fecha | 2026-07-20 |
| rama | `main` |
| commits | `7bca458` (obra) + cierre |
| eje(s) CA | III (una fuente: el backlog) + ceguera |
| estado propuesto | mergeado ✅ |

## Qué se hizo

Se restringió el CHANGELOG a formato FOSS estándar (Keep a Changelog) con
contenido **derivado del backlog cerrado** — el agente copia los WP ✅, no
inventa texto (DC-6, aplicación de C9). `swarm-orquestacion` gana la
práctica en `reglas-metodo-v04.md` y `scripts/verificar-changelog.mjs`
(gate pre-publish). `vigilancia` cruza CHANGELOG ↔ backlog cerrado en su
pulso (`ESTACION.md`). **Inicialización (dogfood):** el `CHANGELOG.md` se
reescribió como release **0.3.1** (DC-7), consolidando olas 1–2 con
entradas copiadas de los WP ✅.

Publicación (bump efectivo de `package.json` + `npm publish` + C8 de
0.3.1) = paso ops/CI final; no se bumpea aquí para no anunciar una versión
que el registry aún no resuelve.

## Archivos tocados

- `skills/swarm-orquestacion/scripts/verificar-changelog.mjs` · creado — gate
- `skills/swarm-orquestacion/reference/reglas-metodo-v04.md` · modificado — práctica CHANGELOG
- `skills/swarm-orquestacion/SKILL.md` · modificado — recurso del gate
- `skills/vigilancia/reference/ESTACION.md` · modificado — doctrina CHANGELOG↔backlog
- `CHANGELOG.md` · modificado — formato estándar + release 0.3.1 (dogfood)

## Evidencia

```
$ node .../verificar-changelog.mjs --version 0.3.1
[verificar-changelog] version=0.3.1 · WP ✅ en backlog: 3
OK: sección 0.3.1 presente y todos los WP ✅ referenciados.   EXIT=0

# rojo 1 — versión sin sección
$ node .../verificar-changelog.mjs --version 9.9.9
✗ falta la sección del CHANGELOG para la versión 9.9.9   EXIT=1

# rojo 2 — WP ✅ ausente del changelog (backlog sintético)
$ node .../verificar-changelog.mjs --version 0.3.1 --backlog <tmp WP-99>
✗ WP cerrados ausentes del CHANGELOG: WP-99   EXIT=1

$ bash .../comprobar-ceguera.sh → ceguera: 0
$ grep marco estricto en ficheros WP-07 → 0
```

## Auto-revisión

- [x] Formato estándar (Keep a Changelog) + entradas copiadas del backlog, no inventadas.
- [x] Gate probado verde y rojo (2 ramas: sección faltante, WP ausente).
- [x] Vigía integrado (doctrina).
- [x] Ceguera 0; CHANGELOG (tarball) sin `S_SDK`.
- [x] Publish honesto: 0.3.1 preparado, bump+publish diferido a ops.

## Hallazgos fuera de alcance

- Enganchar `verificar-changelog` en CI (`publish.yml`) pre-publish: candidato.
- Categorización Added/Changed automática desde el backlog: hoy manual.

## Dudas / bloqueos

- Semver: WP-05/06 amplían contrato (normalmente minor→0.4.0); el custodio
  consolidó como 0.3.1 (DC-7). Registrado, respetado.

---

## Revisión del orquestador

**Aceptado ✅** — disciplina + gate (verde y rojo) + dogfood 0.3.1. Evidencia arriba.
