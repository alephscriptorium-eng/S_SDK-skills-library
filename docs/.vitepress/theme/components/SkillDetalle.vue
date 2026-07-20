<script setup>
import { computed } from 'vue';
import { useData, withBase } from 'vitepress';

const { params } = useData();
const p = computed(() => params.value || {});
const tags = computed(() =>
  p.value.tags ? String(p.value.tags).split(',').filter(Boolean) : []
);

const REPO =
  'https://github.com/alephscriptorium-eng/S_SDK-skills-library/tree/main/skills';
const REGISTRY = 'https://npm.scriptorium.escrivivir.co';

const install = computed(
  () =>
    `npm install --save-exact @alephscript/skills-scriptorium@${p.value.pkg} \\\n  --registry ${REGISTRY}`
);
const rutaFuente = computed(
  () => `node_modules/@alephscript/skills-scriptorium/skills/${p.value.skill}/`
);
</script>

<template>
  <div class="sk">
    <p class="sk-crumb">
      <a :href="withBase('/catalogo')">Catálogo</a> / {{ p.skill }}
    </p>

    <div class="sk-head">
      <h1 class="sk-name">{{ p.name }}</h1>
      <span class="sk-meta">{{ p.version ? 'v' + p.version : p.estado }}</span>
    </div>

    <div class="sk-badges">
      <span class="sk-badge">{{ p.categoria }}</span>
      <span v-for="t in tags" :key="t" class="sk-tag">#{{ t }}</span>
    </div>

    <p class="sk-desc">{{ p.desc }}</p>

    <h2 class="sk-h2">Activar este skill</h2>
    <p>
      Instalá el paquete con <strong>versión exacta fijada</strong> (nunca
      <code>latest</code>) desde el registry propio:
    </p>
    <pre class="sk-code"><code>{{ install }}</code></pre>
    <p>Fuente de verdad tras el install:</p>
    <pre class="sk-code"><code>{{ rutaFuente }}</code></pre>

    <p class="sk-next">
      El procedimiento completo, agnóstico de IDE (adaptador por runner,
      dedup, verificación C8) es común a todos los skills →
      <a :href="withBase('/guide/consumo')"><strong>Consumo canónico</strong></a>.
    </p>

    <div class="sk-links">
      <a class="sk-link" :href="`${REPO}/${p.skill}`" target="_blank" rel="noreferrer">ver fuente ↗</a>
      <a class="sk-link" :href="withBase('/guide/activar')">activar (resumen)</a>
    </div>
  </div>
</template>

<style scoped>
.sk {
  font-family: var(--vp-font-family-base);
}
.sk-crumb {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--vp-c-text-3);
}
.sk-crumb a {
  color: var(--vp-c-text-1);
  text-decoration: none;
  border-bottom: 1px solid var(--vp-c-text-1);
}
.sk-crumb a:hover {
  background: var(--vp-c-text-1);
  color: var(--vp-c-bg);
}
.sk-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.75rem;
  border-bottom: 2px solid var(--vp-c-border);
  padding-bottom: 0.4rem;
}
.sk-name {
  margin: 0;
  border: none;
  padding: 0;
  font-size: clamp(1.6rem, 5vw, 2.4rem);
  font-weight: 700;
  letter-spacing: -0.02em;
}
.sk-meta {
  flex: none;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
}
.sk-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 0.9rem 0;
}
.sk-badge {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  border: 1px solid var(--vp-c-border);
  padding: 0.12rem 0.45rem;
}
.sk-tag {
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
}
.sk-desc {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}
.sk-h2 {
  margin-top: 2rem;
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 1rem;
  font-size: 1.15rem;
}
.sk-code {
  border: 1px solid var(--vp-c-border);
  border-radius: 0;
  background: var(--vp-c-bg-soft);
  padding: 0.8rem;
  overflow-x: auto;
  font-family: var(--vp-font-family-mono);
  font-size: 0.85rem;
  white-space: pre;
}
.sk-next {
  border-left: 3px solid var(--vp-c-border);
  padding: 0.6rem 0 0.6rem 0.9rem;
  margin: 1.4rem 0;
}
.sk-next a,
.sk-desc a {
  color: var(--vp-c-text-1);
}
.sk-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 1.6rem;
}
.sk-link {
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
  text-decoration: none;
  border: 1px solid var(--vp-c-text-1);
  padding: 0.35rem 0.7rem;
}
.sk-link:hover {
  background: var(--vp-c-text-1);
  color: var(--vp-c-bg);
}
</style>
