# VISION — mundo-fuente `skills-scriptorium`

Este `plan/` activa el protocolo `swarm-orquestacion` sobre **el propio
repo que lo produce**. Es el único mundo **auto-hospedado**: el método no
llega por activación de un paquete externo, vive nativo en
`skills/swarm-orquestacion/`.

## Idea

Librería de skills marco-agnósticos en formato estándar (un directorio
por skill: `SKILL.md` + recursos). Cada mundo consumidor **activa** el
skill; nadie copia el método.

## Entregable

- Paquete npm `@alephscript/skills-scriptorium` publicable al registry
  propio `https://npm.scriptorium.escrivivir.co` (versión actual `0.3.0`).
- Docs VitePress servidas en Pages (`skills.s-sdk.escrivivir.co`).
- Tarball limpio: `files:` = `skills/`, `README.md`, `LICENSE.md`,
  `CHANGELOG.md`. `instancias/`, `docs/` y `plan/` **no** viajan.

## Candados del mundo

1. **Formato skill estándar** — cada skill lleva `SKILL.md` con
   frontmatter `name` + `description`. Ruptura = major.
2. **Ceguera de marco (reglas 13–14)** — la cara pública (skills, README,
   docs, historial reachable) es marco-agnóstica. 0 tokens de marco en
   árbol **y** `git log -p`.
3. **Instancias fuera del método** — datos de mundos concretos viven en
   `instancias/` (de-identificados, fuera del tarball) o en la
   calibración local del consumidor.
4. **Consumo con versión fijada** — el contrato de consumo exige versión
   exacta (`--save-exact`), nunca `latest`; verificable por `npm view`
   (C8).

## Calibración local (mundo-fuente)

- **Roles por referencia, no copia.** `plan/roles/README.md` apunta a
  `skills/swarm-orquestacion/reference/roles/` intra-repo. Copiar los
  prompts aquí sería el anti-patrón de dedup que el propio skill predica
  (modelo emmanuel WP-I60). El mundo-fuente lo evita por construcción.
- **`ALCANCE_DIFF` por defecto** = el prefijo declarado en cada BRIEF
  (típico: `docs/`, `README.md`, o `skills/<nombre>/` de un skill
  concreto).
- **Rama principal** = `main`; ramas de WP = `wp/<id>-<slug>`.
