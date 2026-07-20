import { defineConfig } from 'vitepress';

/**
 * Docs públicas skills-library (export I11 / DE-I1 / DE-I9).
 * Fuente de resolveDocsBase: variante library
 * (games-library docs/.vitepress/config.mjs; env renombrado
 * a SKILLS_DOCS_BASE). Guard MSYS (frágil #2).
 * base Pages (custom domain skills.s-sdk.escrivivir.co): `/`.
 */
function resolveDocsBase() {
  const raw = process.env.SKILLS_DOCS_BASE?.trim();
  if (raw) {
    // MSYS path conversion → `C:/Program Files/Git/...` — no es un base válido
    if (/^[A-Za-z]:[\\/]/.test(raw)) return '/';
    const cleaned = raw.replace(/^\/+|\/+$/g, '');
    return cleaned ? `/${cleaned}/` : '/';
  }
  return '/';
}

export default defineConfig({
  title: 'Skills Library',
  description:
    'Catálogo de skills marco-agnósticos — método activable por mundo',
  lang: 'es',
  base: resolveDocsBase(),
  cleanUrls: true,
  ignoreDeadLinks: false,
  themeConfig: {
    nav: [
      { text: 'Portada', link: '/' },
      { text: 'Catálogo', link: '/catalogo' },
      { text: 'Consumo', link: '/guide/consumo' },
      { text: 'Activar', link: '/guide/activar' }
    ],
    sidebar: [
      {
        text: 'Skills Library',
        items: [
          { text: 'Portada', link: '/' },
          { text: 'Catálogo de skills', link: '/catalogo' },
          { text: 'Consumir el paquete', link: '/guide/consumo' },
          { text: 'Activar un skill', link: '/guide/activar' }
        ]
      }
    ],
    outline: { level: [2, 3] },
    search: { provider: 'local' },
    footer: {
      message: 'skills.s-sdk.escrivivir.co',
      copyright: 'Scriptorium · @alephscript/skills-scriptorium'
    }
  }
});
