# ADDENDA-A-i25 · Huérfano `.worktrees/wp-m10-contrato`

Ciclo de verificación Eje IV · segundo consumidor · skill `vigilancia` +
fixture `ejemplo-M`. Clasificación según `reference/ESTACION.md`.

## §interna

Pulso del watcher (`INTERVAL=2`) sobre WORLD_ROOT sintético «mundo M»:
carpeta `.worktrees/wp-m10-contrato` presente en disco **sin** registro en
`git worktree list`, con contenido (`nota.txt`) y **sin** `.git` propio,
señal `!!HUERFANO` en **≥2 ciclos** consecutivos. Calibración de la
fixture (`bitacora.md`): exigir ≥2 ciclos antes de elevar huérfano no
vacío — aquí se cumple. Clase ESTACION **(d)** (residuo de FS / remove
fallido benigno) más que **(c)** (worker perdido: requeriría `.git` +
mtime vivo + WP relanzado). Mediación: entregar solo §WP al orquestador
del mundo M.

## §WP

### Hallazgo

Carpeta `.worktrees/wp-m10-contrato` sin entrada en `git worktree list`,
con ficheros y sin sub-repo `.git`, marcada `!!HUERFANO` en al menos dos
ciclos del watcher.

### Propuesta

1. En quietud: inspeccionar el contenido; si no hay trabajo útil,
   eliminar el residuo de carpeta.
2. Confirmar que `git worktree list` y `ls .worktrees/` coinciden.
3. Mantener en el pulso la regla: no elevar huérfano no vacío hasta ≥2
   ciclos (calibración de la instancia).

### CA

- Tras limpieza: `git worktree list` y `ls .worktrees/` coinciden.
- El watcher no registra `!!HUERFANO` para `wp-m10-contrato` en 2 ciclos.

## Prueba de ceguera

Vocabulario prohibido = el del PRACTICAS delta 5 del consumidor (nombres
del marco que publica el skill + capas que el mundo no debe ver).

```text
# Solo cara §WP (entre '## §WP' y '## Prueba de ceguera')
# Patrón: el acordado por el custodio / PRACTICAS del consumidor
rg -n -e '<patron-marco-prohibido>' ensayos/i25-ciclo-M/addenda-A-i25-huerfano.md
→ 0 matches en §WP
```

(Conteo literal del patrón real: ver acta del WP en REPORTES del
consumidor que encargó este ensayo.)
