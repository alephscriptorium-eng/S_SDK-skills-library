<script setup>
import { ref, computed } from 'vue';
import { withBase } from 'vitepress';
import { data as skills } from '../../../catalogo.data.js';

const q = ref('');
const categoria = ref('todas');
const soloEstables = ref(false);

const categorias = computed(() => {
  const set = new Set(skills.map((s) => s.categoria));
  return ['todas', ...[...set].sort()];
});

const filtrados = computed(() => {
  const term = q.value.trim().toLowerCase();
  return skills.filter((s) => {
    if (categoria.value !== 'todas' && s.categoria !== categoria.value) return false;
    if (soloEstables.value && s.estado !== 'estable') return false;
    if (!term) return true;
    const heno = [s.name, s.description, s.categoria, ...(s.tags || [])]
      .join(' ')
      .toLowerCase();
    return heno.includes(term);
  });
});

function limpiar() {
  q.value = '';
  categoria.value = 'todas';
  soloEstables.value = false;
}
</script>

<template>
  <div class="cat">
    <div class="cat-controls">
      <input
        class="cat-search"
        type="search"
        v-model="q"
        placeholder="Buscar skill, tag o descripción…"
        aria-label="Buscar en el catálogo"
      />
      <label class="cat-toggle">
        <input type="checkbox" v-model="soloEstables" />
        solo estables
      </label>
    </div>

    <div class="cat-cats" role="tablist" aria-label="Categorías">
      <button
        v-for="c in categorias"
        :key="c"
        class="cat-chip"
        :class="{ on: categoria === c }"
        role="tab"
        :aria-selected="categoria === c"
        @click="categoria = c"
      >
        {{ c }}
      </button>
    </div>

    <p class="cat-count">
      {{ filtrados.length }} / {{ skills.length }} skills
      <button v-if="q || categoria !== 'todas' || soloEstables" class="cat-reset" @click="limpiar">
        limpiar filtros
      </button>
    </p>

    <ul class="cat-grid">
      <li v-for="s in filtrados" :key="s.dir" class="cat-card">
        <div class="cat-card-head">
          <h3 class="cat-name">
            <a :href="withBase(`/skills/${s.dir}`)">{{ s.name }}</a>
          </h3>
          <span class="cat-badge">{{ s.categoria }}</span>
        </div>
        <p class="cat-desc">{{ s.description }}</p>
        <ul v-if="s.tags.length" class="cat-tags">
          <li
            v-for="t in s.tags"
            :key="t"
            class="cat-tag"
            @click="q = t"
            :title="`Filtrar por ${t}`"
          >
            #{{ t }}
          </li>
        </ul>
        <div class="cat-card-foot">
          <span class="cat-meta">{{ s.version ? 'v' + s.version : s.estado }}</span>
          <a class="cat-link" :href="withBase(`/skills/${s.dir}`)">ver detalle →</a>
        </div>
      </li>
    </ul>

    <p v-if="filtrados.length === 0" class="cat-empty">
      Sin coincidencias. Probá otro término o categoría.
    </p>
  </div>
</template>

<style scoped>
/* Piel zine: mono, B/N, bordes duros radius 0, hover negativo, tema-aware
   vía los tokens --vp-c-* que custom.css ya voltea en claro/oscuro. */
.cat {
  font-family: var(--vp-font-family-base);
  margin-top: 1.5rem;
}

.cat-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
}

.cat-search {
  flex: 1 1 18rem;
  padding: 0.55rem 0.7rem;
  border: 2px solid var(--vp-c-border);
  border-radius: 0;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-family: inherit;
  font-size: 0.95rem;
}

.cat-search::placeholder {
  color: var(--vp-c-text-3);
}

.cat-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  cursor: pointer;
}

.cat-cats {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 0.9rem 0 0.3rem;
}

.cat-chip {
  padding: 0.3rem 0.7rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 0;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-family: inherit;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  cursor: pointer;
  transition: none;
}

.cat-chip:hover,
.cat-chip.on {
  background: var(--vp-c-text-1);
  color: var(--vp-c-bg);
}

.cat-count {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin: 0.6rem 0 1rem;
}

.cat-reset {
  margin-left: 0.6rem;
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-family: inherit;
  font-size: 0.72rem;
  text-transform: uppercase;
  padding: 0.15rem 0.5rem;
  cursor: pointer;
}

.cat-reset:hover {
  background: var(--vp-c-text-1);
  color: var(--vp-c-bg);
}

.cat-grid {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(17rem, 1fr));
  gap: 1rem;
}

.cat-card {
  border: 2px solid var(--vp-c-border);
  border-radius: 0;
  background: var(--vp-c-bg);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.cat-card::before {
  content: '';
  display: block;
  height: 6px;
  margin: -1rem -1rem 0;
  background: var(--zine-stripe);
  opacity: 0.4;
}

.cat-card-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.5rem;
}

.cat-name {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  border: none;
  padding: 0;
}

.cat-name a {
  color: var(--vp-c-text-1);
  text-decoration: none;
  border-bottom: 2px solid var(--vp-c-text-1);
}

.cat-name a:hover {
  background: var(--vp-c-text-1);
  color: var(--vp-c-bg);
}

.cat-badge {
  flex: none;
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  border: 1px solid var(--vp-c-border);
  padding: 0.1rem 0.4rem;
  color: var(--vp-c-text-2);
}

.cat-desc {
  margin: 0;
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--vp-c-text-2);
  flex: 1 1 auto;
}

.cat-tags {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  padding: 0;
  margin: 0;
}

.cat-tag {
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
  cursor: pointer;
  border-bottom: 1px solid transparent;
}

.cat-tag:hover {
  color: var(--vp-c-text-1);
  border-bottom-color: var(--vp-c-text-1);
}

.cat-card-foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 0.5rem;
  font-size: 0.78rem;
}

.cat-meta {
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: var(--vp-c-text-3);
}

.cat-link {
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: var(--vp-c-text-1);
  text-decoration: none;
  border-bottom: 1px solid var(--vp-c-text-1);
}

.cat-link:hover {
  background: var(--vp-c-text-1);
  color: var(--vp-c-bg);
}

.cat-empty {
  border: 1px dashed var(--vp-c-border);
  padding: 1.2rem;
  text-align: center;
  color: var(--vp-c-text-3);
  font-size: 0.9rem;
}

@media (max-width: 480px) {
  .cat-grid {
    grid-template-columns: 1fr;
  }
}
</style>
