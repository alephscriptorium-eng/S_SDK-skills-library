// Data loader del catálogo. Delega en el lector compartido, que parsea el
// frontmatter real de skills/*/SKILL.md (dedup: sin lista copiada a mano).
import { readSkills } from './.vitepress/skills-data.js';

export default {
  watch: ['../skills/*/SKILL.md'],
  load() {
    return readSkills();
  },
};
