# BACKLOG

Estados: ⬜ pendiente · 🔶 en curso · ✅ aceptado.
Solo el orquestador edita este fichero, en `main`.

## Ola 1 — Portal de skills

- 🔶 **WP-01 · Portal de consumo + catálogo** — dar al portal la capa que
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

## Ola 2 — candidatos (sin abrir)

- ⬜ **WP-02 · Puntero de consumo en `SKILL.md`** — según DA-2. Añadir al
  cuerpo de cada `SKILL.md` un puntero a `/guide/consumo`, si el custodio
  lo aprueba. **Eje:** ceguera. Bloqueado por DA-2.
- ⬜ **WP-03 · Recomendación por defecto para la copia sincronizada** —
  según DA-1. Ajustar `docs/guide/consumo.md` §3 con la opción por defecto
  (versionar vs ignorar) que decida el custodio. Bloqueado por DA-1.
