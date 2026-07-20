// Rutas dinámicas: una página /skills/<dir> por cada skill del paquete,
// generada del frontmatter real. Al añadir un skill nuevo, su página
// aparece sin tocar este fichero.
import { readSkills, pkgVersion } from '../.vitepress/skills-data.js';

export default {
  paths() {
    const pkg = pkgVersion();
    return readSkills().map((s) => ({
      params: {
        skill: s.dir,
        name: s.name,
        categoria: s.categoria,
        estado: s.estado,
        version: s.version,
        pkg,
        desc: s.description,
        tags: s.tags.join(','),
      },
    }));
  },
};
