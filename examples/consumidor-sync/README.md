# Ejemplo · consumidor sin script local de sync (issue #16)

El espejo de skills lo hace el **bin del paquete**, no un
`scripts/sync-*.mjs` duplicado en el consumidor.

```json
"scripts": {
  "skills:sync": "alephscript-skills-sync --runtime claude"
}
```

Adapters: `--runtime claude` · `cursor` · `openai`. Tras instalar
`@alephscript/skills-scriptorium@0.8.0`, borrar cualquier script local
PORT duplicado.
