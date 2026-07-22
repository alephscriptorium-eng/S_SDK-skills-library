// Metadatos curados del catálogo (marco-agnóstico).
// El `name` + `description` los aporta el propio SKILL.md — NO se duplican
// aquí. Este sidecar solo añade lo que el frontmatter estándar no lleva:
// categoría, tags y estado. Crece al añadir skills; una entrada ausente
// cae en valores por defecto ('Sin clasificar' / 'estable').
export default {
  'swarm-orquestacion': {
    categoria: 'Orquestación',
    tags: ['swarm', 'roles', 'ciclo', 'CA', 'ceguera', 'convivencia'],
    estado: 'estable',
    version: '0.6.0',
  },
  'site-web': {
    categoria: 'Publicación',
    tags: ['vitepress', 'pages', 'copy', 'zine'],
    estado: 'estable',
  },
  vigilancia: {
    categoria: 'Observabilidad',
    tags: ['read-only', 'watcher', 'CI', 'addenda', 'multi-carril'],
    estado: 'estable',
  },
  'estacion-viva': {
    categoria: 'Estación',
    tags: ['boot', 'bitacora', 'watcher', 'GAME_MCP', 'peercard', 'PO/scrum'],
    estado: 'estable',
  },
  holarquia: {
    categoria: 'Método',
    tags: ['holones', 'leyes', 'junturas', 'DS-5', 'notaria'],
    estado: 'estable',
    version: '0.1.0',
  },
  'plantilla-skill': {
    categoria: 'Plantilla',
    tags: ['stub', 'scaffold'],
    estado: 'plantilla',
  },
};
