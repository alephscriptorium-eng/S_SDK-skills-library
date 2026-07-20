# WP-14 · changelog-gobierno — reporte

| dato | valor |
| ---- | ----- |
| agente | swarm-worker WP-14 |
| fecha | 2026-07-20 |
| rama | `wp/14-changelog-gobierno` |
| commits | _(ver `git log` de la rama)_ |
| eje(s) CA | ceguera + IV (monorepo / N changelogs de paquete) |
| estado propuesto | aceptado ✅ (mergeado) |

## Qué se hizo

Se reencuadró `verificar-changelog` como gate **opt-in del CHANGELOG de
gobierno** (DC-23): un changelog por mundo, WP-id-keyed, derivado del
BACKLOG. Se distingue explícitamente del eje **CHANGELOG de paquete** (N,
changesets/semver), que este gate no verifica. El CLI exige `--role
gobierno` y acepta rutas parametrizables (`--changelog`, `--backlog`,
`--version`); `--role paquete` se rechaza. La práctica en
`reglas-metodo-v04.md` y el índice del skill documentan la adopción en
monorepos. Corrección colateral del matcher: solo cuenta entradas
`- ✅ **WP-…` (evita falso positivo por prosa «al ✅»).

No se tocó README/CHANGELOG/package.json del pack (WP-13) ni `site-web`/
`docs/` (WP-15).

## Archivos tocados

- `skills/swarm-orquestacion/scripts/verificar-changelog.mjs` · modificado — rol + mensajes gobierno + matcher
- `skills/swarm-orquestacion/reference/reglas-metodo-v04.md` · modificado — práctica dos ejes
- `skills/swarm-orquestacion/SKILL.md` · modificado — contrato del recurso
- `skills/swarm-orquestacion/README.md` · modificado — sección gate opt-in
- `plan/REPORTES/WP-14-changelog-gobierno.md` · creado — este reporte

## Evidencia

```
$ node .../verificar-changelog.mjs --version 0.3.3
falta --role (opt-in) · EXIT=2

$ node .../verificar-changelog.mjs --role paquete --version 0.3.3
rol=paquete rechazado · EXIT=2

$ node .../verificar-changelog.mjs --role gobierno --version 0.3.3
role=gobierno · WP ✅ en backlog: 9 · OK · EXIT=0

$ node .../verificar-changelog.mjs --role gobierno --version 9.9.9
✗ falta la sección … 9.9.9 · EXIT=1

$ node .../verificar-changelog.mjs --role gobierno --version 0.3.3 --backlog <tmp WP-99>
✗ WP cerrados ausentes … WP-99 · EXIT=1

# Eje IV — fixture monorepo (gobierno + packages/a|b CHANGELOG)
$ node ... --role gobierno --changelog <gov> --backlog <plan> --version 0.1.0
OK · EXIT=0   # ignora packages/*/CHANGELOG.md

$ bash .../comprobar-ceguera.sh → ceguera: 0
$ git diff -- skills/swarm-orquestacion/ | grep -qE 'S_SDK|Claude Code|Cursor Agent' → exit 1 (0 hits)
$ git log -p -- <ficheros tocados del skill> | grep -cE 'S_SDK|Claude Code|Cursor Agent' → 0
```

## Auto-revisión (PRACTICAS del mundo — con honestidad)

- [x] Diff solo dentro de `ALCANCE_DIFF` (+ reporte en `plan/REPORTES/`): sí
- [x] Cero árboles/ficheros copiados de otros mundos sin procedencia: sí
- [x] Sellos con fuente; rutas citadas existentes: sí (DC-23, práctica v0.4)
- [x] Sin fluff ni promesa de futuro sin `<pendiente>`: sí
- [x] Eje(s) aplicables evidenciado(s): ceguera 0; IV = fixture monorepo con N changelogs de paquete + parametrización de rutas/rol
- [x] Gates ejecutados de verdad: verificar-changelog (verde/rojo/opt-in) + ceguera
- [x] Commits convencionales: sí (castellano)
- [x] Diff solo del alcance del WP: sí

## Hallazgos fuera de alcance

- `skills/vigilancia/reference/ESTACION.md` aún habla de «el CHANGELOG.md»
  genérico; alinear wording a «CHANGELOG de gobierno» sería follow-up
  (fuera de `ALCANCE_DIFF`).
- Enganchar el gate con `--role gobierno` en CI (`publish.yml`): sigue
  candidato (ya lo era en WP-07).
- Quienes invoquen el script sin `--role` rompen hasta añadir el flag
  (roto intencional / opt-in DC-23).

## Dudas / bloqueos

_(ninguno)_

---

## Revisión del orquestador

**Aceptado ✅** (revisión WP-14 · 2026-07-20) — sin merge en este paso.

Verificado:
- Diff acotado a `skills/swarm-orquestacion/` + este reporte (pack/docs/site-web intactos).
- CA: práctica + gate distinguen gobierno vs paquete; opt-in `--role` + rutas; docs de adopción monorepo.
- DC-23: rol obligatorio, rechazo `paquete`, parametrización `--changelog/--backlog/--version`.
- Smoke: sin rol→2; paquete→2; gobierno 0.3.3→0; sección ausente→1; fixture monorepo→0; WP-99→1; matcher prosa «al ✅»→0.
- Ceguera 0; `grep` marco en diff/`git log -p` del skill → 0 hits.
- Eje IV: fixture con N CHANGELOG de paquete + rutas parametrizadas (evidencia en reporte + reproducción).

**Merge (orquestador):** integrado en `main` por ff-only → `9c1d4a1` (2026-07-20). **WP-13 último** (corte 0.4.0).
