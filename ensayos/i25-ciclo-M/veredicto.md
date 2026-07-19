# Veredicto — ciclo I25 (mundo M)

## Entradas

- Skill: `skills/vigilancia/` (`SKILL.md`, `reference/ESTACION.md`,
  `reference/ADDENDA-DOS-CARAS.md`, `scripts/watcher.sh`)
- Instancia: `instancias/ejemplo-M/` (bitácora, addendas, logs sample,
  handoffs) — **solo lectura**
- WORLD_ROOT: repo sintético «mundo M» (git init + seed; carpeta huérfana
  plantada para ejercitar el pulso)
- OUT_DIR: `ensayos/i25-ciclo-M/`

## Pulso (de facto)

```text
[2026-07-19 19:49:45] wt_reg=1 wt_dir=1 mtime[ wp-m10-contrato:2s ] ajenos[ ] locks=''
[2026-07-19 19:49:45] !!HUERFANO carpeta .worktrees/wp-m10-contrato sin registro en git worktree list
[2026-07-19 19:49:48] wt_reg=1 wt_dir=1 mtime[ wp-m10-contrato:6s ] ajenos[ ] locks=''
[2026-07-19 19:49:48] !!HUERFANO carpeta .worktrees/wp-m10-contrato sin registro en git worktree list
index.lock: ausente
```

CI del mundo M: N/A (repo sintético local sin remote; el protocolo pide
`gh run list` cuando exista canal).

## Addenda

`addenda-A-i25-huerfano.md` — dos caras + prueba de ceguera. Clasificación
**(d)** (residuo FS). CA de limpieza declarado; no ejecutado en este
ensayo (el WORLD_ROOT es desechable).

## Cierre Eje IV

Un agente con **solo** skill `vigilancia` + `instancias/ejemplo-M`
reprodujo: carga de instancia → watcher parametrizado → pulso con
anomalía → addenda dos caras → veredicto persistido en OUT_DIR. El
contrato skill↔instancia opera sin datos del marco en las salidas del
ciclo.
