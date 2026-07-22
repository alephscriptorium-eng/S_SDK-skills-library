<!-- Procedencia: plantilla skill site-web · Layout fanzine
     Fecha: 2026-07-22 · mundo=nexo-atlas
     Home con piel real (stamp/washi/callout). Sin shell DefaultTheme. -->
<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import { computed } from 'vue'

const { Layout: DefaultLayout } = DefaultTheme
const { frontmatter } = useData()

const isFanzineHome = computed(() => {
  const fm = frontmatter.value || {}
  return (
    fm.piel === 'fanzine' ||
    fm.layout === 'fanzine' ||
    (fm.layout === 'home' && fm.piel !== 'default')
  )
})
</script>

<template>
  <div v-if="isFanzineHome" class="zine-shell">
    <header class="header">
      <div class="stamp">{{ frontmatter.stamp || 'ZINE' }}</div>
      <h1>{{ frontmatter.title || 'Portal' }}</h1>
      <div v-if="frontmatter.sub" class="sub">{{ frontmatter.sub }}</div>
      <div v-if="frontmatter.sub2" class="sub2">{{ frontmatter.sub2 }}</div>
      <div v-if="frontmatter.issue" class="issue">{{ frontmatter.issue }}</div>
    </header>
    <div class="washi" aria-hidden="true"></div>
    <div v-if="frontmatter.callout" class="callout tilt-r">
      {{ frontmatter.callout }}
    </div>
    <main class="zine-main">
      <Content />
    </main>
    <footer v-if="frontmatter.footer" class="footer">
      {{ frontmatter.footer }}
    </footer>
  </div>
  <DefaultLayout v-else />
</template>
