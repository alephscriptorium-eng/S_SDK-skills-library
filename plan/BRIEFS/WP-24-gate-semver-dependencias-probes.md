# BRIEF · WP-24

```text
(rol) plan/roles/WORKER.md
  (fuente: skills/swarm-orquestacion/reference/roles/WORKER.md)

WP: WP-24 · gate semver, dependencias directas y probes
Rama: wp/24-gate-semver-dependencias-probes
Worktree: C:\S_LAB\skills-library-wp-24
Reporte: plan/REPORTES/WP-24-gate-semver-dependencias-probes.md

Lecturas extra (además de PRACTICAS + WP en BACKLOG + VISION):
- plan/SPRINTS/REVISION-SEMVER-IDLE/PLAN.md
- skills/swarm-orquestacion/scripts/verificar-changelog.mjs
- skills/swarm-orquestacion/reference/proyeccion-issues.md
- Ejes CA: III + IV + ceguera + regla 14

Notas del orquestador:
- ALCANCE_DIFF =
  skills/swarm-orquestacion/reference/politica-dependencias-semver.md (nuevo)
  skills/swarm-orquestacion/scripts/verificar-dependencias-semver.mjs (nuevo)
  skills/swarm-orquestacion/examples/fixture-semver/** (nuevo)
  package.json y lockfile (solo si una dependencia runtime nueva es
  imprescindible)
  plan/REPORTES/WP-24-gate-semver-dependencias-probes.md
- No tocar SKILL.md, ciclo.md ni roles; WP-25 integra.
- Políticas configurables: exact, caret-semver y
  major-band = >=M.m.p <(M+1).0.0.
- Gate local determinista: validar sintaxis y allow/deny sin red. Rechazar
  rangos abiertos, *, tags, Git/URL, aliases y rutas locales.
- major-band conserva mínimo conocido y acota a una major. Para major 0,
  warning explícito y requisito de integración.
- C8 online separado: comprobar existencia de mínimo/versión resuelta e
  instalación limpia. Nunca presentar C8 como parte del gate local.
- Automatizar probes verdes y rojos, incluida detección de falsos negativos.
- Toda dependencia importada/cargada debe ser directa en package.json. Se
  prefiere Node built-in si basta; evidenciar cualquiera de las dos vías.
- No consultar ni modificar consumidores.
- Requiere contrarrevisión independiente read-only antes de aceptación.
- RIESGO_REVISION: independiente
- MOTIVO_RIESGO: gate/parser semver con riesgo de falsos negativos.
- CONTRAEVIDENCIA_REQUERIDA: localizadores inválidos, versiones inexistentes,
  dependencia transitiva ausente, rango 0.x y separación local/C8.
- REVISOR_DISTINTO_WORKER: sí

Empieza: sitúate en rama/worktree, lee PRACTICAS entero, luego implementa.
```
