# BACKLOG

Estados: ⬜ pendiente · 🔶 en curso · ✅ aceptado.
Solo el orquestador edita este fichero, en `main`.

## Ola 1 — Portal de skills

- ✅ **WP-01 · Portal de consumo + catálogo** — dar al portal la capa que
  faltaba para un mundo consumidor y para el descubrimiento de skills.
  Fusiona el consumo canónico y el catálogo en un portal coherente:
  hub (catálogo con filtrado) → página por skill (autogenerada) →
  procedimiento canónico único. Método: skills `site-web` (piel zine,
  ceguera) y `swarm-orquestacion` (este plan).
  **Rama:** `wp/01-portal` · **Eje(s):** IV (contrato de consumo; segundo
  cliente sensor) + III (dedup: datos y procedimiento derivados/únicos, no
  copiados) + ceguera transversal (cara pública).
  **CA:**
  - **Consumo canónico** en `README.md` (canal tarball) + `docs/guide/consumo.md`
    (portal): versión **exacta** fijada (`--save-exact`, nunca `latest`),
    `node_modules` como fuente, adaptador por runner (Claude Code +
    patrón general), dedup (referencia versionada + calibración local,
    modelo WP-I60), C8.
  - **Catálogo** `docs/catalogo.md` con filtrado (búsqueda + categoría +
    estado); datos derivados del frontmatter real de `skills/*/SKILL.md`
    (data loader), no lista copiada.
  - **Página por skill** `/skills/<dir>` autogenerada (ruta dinámica) con
    `install` de versión fijada y enlace al procedimiento canónico único
    (el consumo no se repite por skill).
  - Enlazado en nav + sidebar + portada; navegación cerrada
    catálogo ↔ skill ↔ consumo.
  - Piel zine respetada (tokens `--vp-c-*`/`--zine-*`, radius 0, hover
    negativo, mono, claro/oscuro), **cero CDN / fuentes remotas**, sin
    dependencias nuevas.
  - `npm run docs:build` verde (`ignoreDeadLinks: false`).
  - Ceguera: 0 tokens de marco en ficheros nuevos (árbol + `git log -p`).
  **Reporte:** `plan/REPORTES/WP-01-portal.md`.
  **Historia:** fusiona los antiguos WP-01 (docs-consumo) y WP-04
  (catálogo) por decisión DC-3.

## Ola 2 — higiene de método y verificación (planificados)

- ⬜ **WP-05 · Efimeralidad y fuente de verdad única** — cerrar el
  anti-patrón vivido: carpetas de IDE (`.claude`/`.cursor`/`.github`) y
  **memorias internas** de agentes acumulan info efímera que solo conoce
  ese agente, se pierde al cerrar sesión, y hace que los agentes tomen su
  memoria como fuente de verdad sin verificar contra el plan. Bloquea el
  trabajo multi-IDE/multi-equipo. Interpretar y trasladar profesionalmente
  (no copiar literal).
  **Skills:** `swarm-orquestacion` (+ regla) y `vigilancia` (+ check) ·
  **Rama:** `wp/05-efimeralidad` · **Eje(s):** ceguera + III (dedup de
  fuente de verdad: una sola, el plan).
  **CA:**
  - `swarm-orquestacion`: **regla 15 (Fuente de verdad única + efimeralidad)**
    en `reference/reglas-metodo-v04.md` y resumen en `SKILL.md`: el plan
    trazado (git) es la única fuente de verdad; memoria interna del agente
    y carpetas de IDE = scratch efímero, no compartible ni citable como
    verdad; verificar SIEMPRE contra el plan, no contra recuerdos.
  - Al **cierre de sesión/ola**: las carpetas de IDE no dejan markdowns de
    info (identificadores tipo «U148», estado, decisiones). Si el entorno
    necesita `config`/`tasks`/`mcp` funcional, se conserva ESO — sin texto
    de sesión. Añadir el ítem a la checklist de cierre de ola.
  - `vigilancia`: check que **eleva residuo de info** en carpetas de IDE
    ajenas (p. ej. `*.md` no-config bajo `.claude`/`.cursor`) y refuerza
    «persistir a disco trazado, no a memoria de chat» en `ESTACION.md`.
  - Semver: contrato de ambos skills ampliado → bump **minor** del paquete
    + entrada en `CHANGELOG.md`.
  - Ceguera 0 (árbol + `git log -p`) en la cara pública tocada.

- ⬜ **WP-06 · Gate de verificación de sitio (enlaces + verdad)** — cada
  deploy tuvo enlaces rotos porque `ignoreDeadLinks:false` **no** cubre
  hrefs en componentes `.vue` (catálogo/páginas por skill), ni externos,
  ni anclas. Falta además verificar que la info del sitio es cierta.
  **Skill:** `site-web` · **Rama:** `wp/06-verificar-sitio` · **Eje(s):**
  III (gate de dedup/verdad) + ceguera + IV (segundo cliente: el gate lo
  ejercita el propio portal del mundo-fuente).
  **CA:**
  - `site-web`: script `scripts/verificar-sitio.sh` (o `.mjs`) que tras
    `docs:build` rastrea `dist/` y verifica **todos** los `<a href>`:
    internos resuelven a fichero en `dist` (respetando `base` + `cleanUrls`),
    anclas `#id` existen en la página destino, externos `http(s)` devuelven
    estado sano (online; offline → listados para revisión). Exit ≠ 0 si hay
    roto interno/ancla.
  - **Verdad de contenido** (C8 reforzado): paso explícito que verifica que
    afirmaciones/versión/comandos del sitio casan con su fuente (p. ej.
    versión mostrada == `package.json`; comandos ejecutados en su canal).
  - Gate añadido a `reference/protocolo-ghpages.md` (checklist de
    publicación) y como filtro del pipeline (p. ej. «C10 · enlaces»).
  - Se **estrena** sobre el portal de este mundo-fuente (segundo cliente):
    el propio catálogo/páginas por skill pasan el gate.
  - Semver: contrato de `site-web` ampliado → bump **minor** del paquete +
    `CHANGELOG.md`.

## Ola 3 — candidatos (sin abrir)

- ⬜ **WP-02 · Puntero de consumo en `SKILL.md`** — según DA-2. Añadir al
  cuerpo de cada `SKILL.md` un puntero a `/guide/consumo`, si el custodio
  lo aprueba. **Eje:** ceguera. Bloqueado por DA-2.
- ⬜ **WP-03 · Recomendación por defecto para la copia sincronizada** —
  según DA-1. Ajustar `docs/guide/consumo.md` §3 con la opción por defecto
  (versionar vs ignorar) que decida el custodio. Bloqueado por DA-1.
