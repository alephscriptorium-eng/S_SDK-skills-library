# Bitácora del vigía — mundo M (fixture)

> Constitución y estado sintético: skill `vigilancia` → `reference/ESTACION.md`.
> Este fichero es el DIARIO cronológico sintético: deltas y calibración.
> No proviene de una sesión real.

Estación read-only. El vigía observa y piensa; revisores leen en hilos
aparte. No habla con el swarm; solo con el custodio. No escribe en el
árbol del mundo vigilado.

## Doctrina (resumen)

- Señal de worker muerto = **mtime del worktree**, no cadencia de commits.
- Vigía silencioso: un aviso ruidoso empuja al orquestador a relanzar.
- Addendas con dos caras (§interna / §WP) y prueba de ceguera en §WP.

## Herramientas

- `watcher.sh` (intervalo 45s) → `watch.log` + `anomalias.log`.
  Vigila worktrees registrados vs carpetas reales, locks, mtime.
  NO usa `git status`.

## Estado inicial (día 1)

- Ola 0 cerrada. Ola 1 en curso: un WP de contrato del núcleo.
- Worktree activo: `.worktrees/wp-m10-contrato`. Sin locks ni huérfanos.
- El incidente «orquestador pierde contacto → relanza → conflicto» no se
  ha visto en esta fixture; el vigía calibra para no fabricarlo.

## Diario (extracto sintético)

- 10:00 — estación montada, vigía en marcha. Sin anomalías.
- 10:20 — WP-M10 mtime subió monótono durante ráfaga final: patrón normal
  (no elevar).
- 10:40 — **WP-M10 cerrado**. Orquestador abre lote paralelo M11+M12.
  Vigilo mtime por worktree y locks al mergear.
- 11:00 — anomalía transitoria: watcher marcó huérfano ~1 min tras
  `worktree remove`. Ruido de cierre, no worker muerto. Lección: exigir
  ≥2 ciclos antes de logar huérfano no vacío.
- 12:00 — review de lo cerrado → addendas A-01 (contrato sin cablear),
  A-02 (dedup de paths), A-03 (transporte dual reimplementado).
- 14:00 — segundo consumidor (juego «bravo») valida el contrato en
  producción. A-01 cerrada empíricamente (Eje I + IV).
- 16:00 — handoff de cierre del frente transporte: CA 5/5 en fixture;
  evidencia live marcada pendiente por diseño si faltan env vars.

## Calibración fija de esta fixture

- Intervalo watcher: 45s.
- Persistencia huérfano: 2 ciclos.
- Vocabulario prohibido en §WP: el del PRACTICAS del consumidor
  (aquí: marco-agnóstico; grep de ceguera = 0 en esta carpeta).
