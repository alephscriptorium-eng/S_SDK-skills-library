# Handoff de suspensión · LIB 0.10.0 · 2026-07-24

Estado: **suspendido y listo para bugfix**. La estación y su watcher siguen
vivos; no se desmontaron ni se retiró su calibración.

## Fuentes canónicas

- Estado, autoridad, C8 y gate forward:
  [`PLAN.md`](PLAN.md).
- Backlog y futuro WP-26: [`../../BACKLOG.md`](../../BACKLOG.md).
- Decisiones de raíz y release:
  [`../../DECISIONES.md`](../../DECISIONES.md) (`DC-27`/`DC-28`).
- Reglas de devolución y gate:
  [`../../PRACTICAS.md`](../../PRACTICAS.md).

Este handoff no sustituye esas fuentes ni copia el backlog.

## Punto de suspensión verificado

- `main` local y `origin/main`:
  `011338c8826ee3f24ae01b082bf382cb167c4699`.
- Release/tag: `v0.10.0` apunta a
  `f251066927e673005cec5dae631c4537f42e53fd`.
- Docs `30125503524`: `completed/success`.
- Publish `30125507369`: `completed/success`.
- GitHub Release `v0.10.0`: publicado.
- Registry: `@alephscript/skills-scriptorium@0.10.0` y `latest` resuelven
  `0.10.0`.
- C8 exacto: versión declarada, lock e instalación `0.10.0`; sync de
  `swarm-orquestacion`, `vigilancia` y `estacion-viva`; semver 32/32 e
  integración de método PASS.
- WP-22…WP-25: aceptados e integrados.
- WP-26: futuro, sin GO y fuera de `0.10.0`.
- Gate forward `z-sdk-backlog-u145`: pendiente de resultado `R12-Z`; LIB no
  opera el repo downstream.

## Estación conservada

- `WORLD_ROOT` y `CANONICAL_WORLD_ROOT`:
  `C:\S_LAB\skills-library`.
- Raíz downstream/read-only observada:
  `C:\S\scriptorium\codebase\skills-library`; patrón por segmentos
  `scriptorium/codebase/*`.
- Preflight de identidad sobre la raíz canónica: `identidad-raiz: PASS`.
- `OUT_DIR`: `C:\S_LAB\vigilancia\lib`.
- Watcher de sesión: PID `31668`; `watch.log` seguía recibiendo pulsos, con
  `skills_mat=6`, `residuo_filtrado=0` y `locks=''`.
- No matar el watcher ni borrar `OUT_DIR`, `watcher.pid`, handoffs o
  calibración mientras este estado siga suspendido para bugfix.

## Residuos conocidos, no bloqueantes

- `npm run docs:verificar-pesos` falla porque `docs/public` no contiene
  imágenes; solo contiene `CNAME`. No forma parte del workflow Docs ni de los
  gates de este sprint.
- Los jobs de Docs/Publish anotan deprecación de Node.js 20 para
  `actions/checkout@v4`, `actions/setup-node@v4`,
  `actions/upload-artifact@v4` y `actions/deploy-pages@v4`; GitHub los forzó
  a Node.js 24.
- `main` no tiene branch protection (`GET .../branches/main/protection` →
  HTTP 404 `Branch not protected`).
- Persiste el worktree local-only `C:\S_LAB\mundo-wp-19`, rama
  `wp/19-salida-dual-nota-frontera`, tip `a48ce150e26213d986f70c62c37617ad829f49ed`,
  con `plan/ESTACION.md` untracked. Es calibración local conocida; no mezclarla
  con un bugfix ni publicarla.

## Reanudación

1. Verificar que candidata y canónica siguen siendo
   `C:\S_LAB\skills-library` y que el detector de identidad devuelve PASS
   antes de cualquier efecto.
2. Confirmar `main == origin/main`, ausencia de locks/stash y estado de
   worktrees; conservar separado el residual WP-19.
3. Confirmar PID/`watcher.pid` y pulsos recientes en
   `C:\S_LAB\vigilancia\lib`. Si la sesión original terminó, relanzar según
   `skills/estacion-viva/reference/BOOT.md` y
   `skills/estacion-viva/reference/WATCHER.md`, con la misma calibración.
4. Siguiente acción: recibir y asentar el resultado `R12-Z` mediante el gate
   forward de `PLAN.md`; o, si aparece un defecto en LIB, abrir un bugfix
   nuevo con gate `Rn-LIB` sobre el tip vigente.
5. WP-26 requiere planificación, GO y gate propios. No iniciarlo como parte de
   esta reanudación.
