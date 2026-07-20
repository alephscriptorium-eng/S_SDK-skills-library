# DECISIONES

Estados: las **abiertas** las resuelve el custodio, no el orquestador.

## Cerradas

- **DC-1 · Roles por referencia (mundo-fuente).** `plan/roles/` referencia
  `skills/swarm-orquestacion/reference/roles/` intra-repo; no copia.
  Cerrada al montar el plan (dogfood de dedup, modelo WP-I60).
- **DC-2 · `plan/` fuera del tarball.** `package.json.files` no incluye
  `plan/`; viaja solo `skills/ README LICENSE CHANGELOG`. El gobierno del
  mundo no contamina el paquete publicado.
- **DC-3 · IA del portal: consumo único + páginas por skill (regla 11).**
  El procedimiento de consumo es **agnóstico de skill** → vive una sola
  vez (`docs/guide/consumo.md` en el portal, `README.md` para el canal
  tarball); **no** se inlínea por skill. La «dedicación a cada skill» se
  da con **páginas autogeneradas** `/skills/<dir>` (ruta dinámica desde el
  frontmatter) que enlazan al procedimiento único. Esto fusiona los
  antiguos WP-01 (docs-consumo) y WP-04 (catálogo) en un solo WP-01
  (Portal). Motivo: evitar repetir el procedimiento N veces (anti-dedup)
  manteniendo descubrimiento y contrato por skill.

## Abiertas

- **DA-1 · ¿Versionar la copia sincronizada en consumidores?** El adaptador
  Claude Code (`docs/guide/consumo.md` §3) sincroniza `node_modules →
  .claude/skills/`. Queda a criterio de cada mundo consumidor versionar el
  artefacto derivado o ignorarlo en git. El mundo-fuente solo **documenta**
  el patrón; no impone. → custodio confirma si el doc debe recomendar una
  opción por defecto.
- **DA-2 · Puntero de consumo en cada `SKILL.md`.** Los `README.md` de
  skills ya apuntan a `/guide/consumo`. ¿Debe el propio `SKILL.md`
  (frontmatter + cuerpo) llevar también el puntero, o se mantiene el
  README como único punto de entrada por skill? → custodio decide.
- **DA-3 · Política exacta de efimeralidad (WP-05).** Qué se conserva en
  carpetas de IDE: ¿solo `config`/`tasks`/`mcp` funcional y cero markdowns
  de info, o se toleran notas si van a un `plan/` trazado? ¿Vigilancia
  **eleva** el residuo (anomalía) o solo el orquestador lo limpia en el
  cierre? → custodio decide antes de abrir WP-05.
- **DA-4 · Rigor del gate de enlaces (WP-06).** ¿El gate **falla** el
  build ante un externo 404, o solo ante roto interno/ancla (externos =
  warning)? ¿Corre en CI (`docs.yml`) tras build, o solo local pre-deploy?
  → custodio decide antes de abrir WP-06.
