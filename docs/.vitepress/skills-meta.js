// Metadatos curados del catÃ¡logo (marco-agnÃ³stico).
// El `name` + `description` los aporta el propio SKILL.md â€” NO se duplican
// aquÃ­. Este sidecar solo aÃ±ade lo que el frontmatter estÃ¡ndar no lleva:
// categorÃ­a, tags y estado. Crece al aÃ±adir skills; una entrada ausente
// cae en valores por defecto ('Sin clasificar' / 'estable').
export default {
  'swarm-orquestacion': {
    categoria: 'OrquestaciÃ³n',
    tags: ['swarm', 'roles', 'ciclo', 'CA', 'ceguera', 'convivencia'],
    estado: 'estable',
    version: '0.6.0',
  },
  'site-web': {
    categoria: 'PublicaciÃ³n',
    tags: ['vitepress', 'pages', 'copy', 'zine'],
    estado: 'estable',
  },
  vigilancia: {
    categoria: 'Observabilidad',
    tags: ['read-only', 'watcher', 'CI', 'addenda', 'multi-carril'],
    estado: 'estable',
  },
  'plantilla-skill': {
    categoria: 'Plantilla',
    tags: ['stub', 'scaffold'],
    estado: 'plantilla',
  },
};
