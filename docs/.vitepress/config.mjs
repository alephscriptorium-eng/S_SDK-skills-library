import { defineConfig } from 'vitepress';

/**
 * Docs públicas skills-library (export I11 / DE-I1 / DE-I9).
 * Fuente de resolveDocsBase: variante library
 * (games-library docs/.vitepress/config.mjs; env renombrado
 * a SKILLS_DOCS_BASE). Guard MSYS (frágil #2).
 * base Pages (custom domain skills.s-sdk.escrivivir.co): `/`.
 *
 * Back-links (B11 / DC-24): fuente única en themeConfig.back +
 * backLinks → footer/nav; no bloques por página.
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

/** Fuente única de enlaces al back (DevOps). */
const BACK = {
  repo: 'https://github.com/alephscriptorium-eng/S_SDK-skills-library',
  registry: 'https://npm.scriptorium.escrivivir.co',
  actions:
    'https://github.com/alephscriptorium-eng/S_SDK-skills-library/actions',
  pages: 'https://skills.s-sdk.escrivivir.co',
  changelog:
    'https://github.com/alephscriptorium-eng/S_SDK-skills-library/blob/main/CHANGELOG.md',
  issues:
    'https://github.com/alephscriptorium-eng/S_SDK-skills-library/issues',
  skillsTree:
    'https://github.com/alephscriptorium-eng/S_SDK-skills-library/tree/main/skills'
};

const backLinks = [
  { text: 'Repositorio', link: BACK.repo },
  { text: 'Registry', link: BACK.registry },
  { text: 'CI / Actions', link: BACK.actions },
  { text: 'Pages', link: BACK.pages },
  { text: 'CHANGELOG', link: BACK.changelog },
  { text: 'Issues', link: BACK.issues }
];

export default defineConfig({
  title: 'Skills Library',
  description:
    'Catálogo de skills marco-agnósticos — método activable por mundo',
  lang: 'es',
  base: resolveDocsBase(),
  cleanUrls: true,
  ignoreDeadLinks: false,
  themeConfig: {
    back: BACK,
    backLinks,
    nav: [
      { text: 'Portada', link: '/' },
      { text: 'Catálogo', link: '/catalogo' },
      { text: 'Consumo', link: '/guide/consumo' },
      { text: 'Activar', link: '/guide/activar' },
      { text: 'Proyecto', link: '/proyecto' },
      { text: 'Repo', link: BACK.repo }
    ],
    sidebar: [
      {
        text: 'Skills Library',
        items: [
          { text: 'Portada', link: '/' },
          { text: 'Catálogo de skills', link: '/catalogo' },
          { text: 'Consumir el paquete', link: '/guide/consumo' },
          { text: 'Activar un skill', link: '/guide/activar' },
          { text: 'Proyecto (flujo DevOps)', link: '/proyecto' }
        ]
      }
    ],
    socialLinks: [{ icon: 'github', link: BACK.repo }],
    outline: { level: [2, 3] },
    search: { provider: 'local' },
    footer: {
      message: backLinks
        .map(
          (l) =>
            `<a href="${l.link}" target="_blank" rel="noreferrer">${l.text}</a>`
        )
        .join('<span aria-hidden="true"> · </span>'),
      copyright: 'Scriptorium · @alephscript/skills-scriptorium'
    }
  }
});
