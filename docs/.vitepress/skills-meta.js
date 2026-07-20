// Metadatos curados del catálogo (marco-agnóstico).
// El `name` + `description` los aporta el propio SKILL.md — NO se duplican
// aquí. Este sidecar solo añade lo que el frontmatter estándar no lleva:
// categoría, tags y estado. Crece al añadir skills; una entrada ausente
// cae en valores por defecto ('Sin clasificar' / 'estable').
export default {
  'swarm-orquestacion': {
    categoria: 'Orquestación',
    tags: ['swarm', 'roles', 'ciclo', 'CA', 'ceguera'],
    estado: 'estable',
    version: '0.4.0',
  },
  'site-web': {
    categoria: 'Publicación',
    tags: ['vitepress', 'pages', 'copy', 'zine'],
    estado: 'estable',
  },
  vigilancia: {
    categoria: 'Observabilidad',
    tags: ['read-only', 'watcher', 'CI', 'addenda'],
    estado: 'estable',
  },
  'plantilla-skill': {
    categoria: 'Plantilla',
    tags: ['stub', 'scaffold'],
    estado: 'plantilla',
  },
};
