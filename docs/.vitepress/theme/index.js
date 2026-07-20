import DefaultTheme from 'vitepress/theme';
import SkillsCatalogo from './components/SkillsCatalogo.vue';
import SkillDetalle from './components/SkillDetalle.vue';
import './custom.css';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('SkillsCatalogo', SkillsCatalogo);
    app.component('SkillDetalle', SkillDetalle);
  },
};
