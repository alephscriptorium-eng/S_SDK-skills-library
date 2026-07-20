# Proyección del backlog a issues (sin sync bidireccional)

Método para proyectar el scrum de markdown a un tracker de issues
externo. **No es sync**: es **proyección**. El markdown local es la
**fuente de verdad única** (regla 15); los issues son un artefacto
desechable, regenerable, sin autoridad.

Herramienta: `scripts/proyectar-backlog.mjs` (Node ≥18 + `gh` CLI
autenticado para el adaptador GitHub). Marco-agnóstico.

## Principio

```
LOCAL (markdown + marcas)      REMOTO (issues)
  fuente de verdad     ──export──▶  proyección desechable
  el orquestador escribe  ◀─import──  INBOX (cola de reconciliación)
```

Nunca dos maestros. El remoto **jamás** escribe el BACKLOG: lo que llega
de la web (comentarios, cierres a mano) entra por `plan/INBOX-GH.md`, que
el orquestador lee y reconcilia **a mano** en el markdown. La divergencia
no es un conflicto de merge — es una cola de decisiones, que es el modelo
de siempre (solo el orquestador escribe BACKLOG).

## Export (local → remoto)

Determinista e idempotente:

- Cada WP lleva su **ID estable** (`WP-XX`), parseado del BACKLOG.
- `plan/.sync-map.json` (`WP-XX → nº issue`) — git-tracked — permite
  crear/actualizar. Marcador oculto `<!-- proyeccion:WP-XX -->` en el
  body para resiliencia si se pierde el mapa.
- **Mapeo (DC-14):** `✅` → issue **closed**; `⬜`/`🔶` → **open**. Sin
  labels.
- Re-correr no duplica; regenerable desde cero (si borras los issues, el
  export los reconstruye).

```bash
CEGUERA_PATTERN='<patrón del mundo>' \
  node scripts/proyectar-backlog.mjs export [--dry-run] [--repo owner/name]
```

## Gate de ceguera (DC-12) — obligatorio

Los issues son **cara pública**. Antes de tocar la API, el export valida
el contenido a proyectar contra `CEGUERA_PATTERN` (regex de los tokens de
marco del mundo, **por env** — nunca almacenado en el skill, para no
auto-contaminarse). **Sin patrón → se rehúsa** (fail-safe, exit 3). Con
hit → aborta sin crear nada (exit 1). Un backlog no-blindado no se
proyecta a un tracker público.

## Import (remoto → local)

`import` trae el estado y comentarios de los issues mapeados y escribe
`plan/INBOX-GH.md` (git-tracked). **No** escribe el BACKLOG. El
orquestador reconcilia y vacía el inbox.

```bash
node scripts/proyectar-backlog.mjs import [--dry-run]
```

Cuerpo de cada issue proyectado lleva la nota: *«proyección generada —
comentad, no editéis; los comentarios entran por inbox»*.

## Modos

| modo | qué es |
| ---- | ------ |
| a) solo local | no ejecutar el exportador; coste cero |
| b) sesión | `import` al abrir (drenar inbox), `export` al cerrar |
| c) continuo | `export` en hook post-commit — **patrón**, no incluido en 0.3.2 |

## Adaptador (remote-agnóstico)

El adaptador GitHub usa `gh issue create/edit/close/reopen`. Otro remoto
(GitLab, ninguno) = otro adaptador; el parser del backlog y el modelo
proyección/inbox no cambian.

## No git-bug (DC-11)

git-bug resuelve issues-en-git, pero su modelo no es el markdown con
marcas — se perdería el backlog-como-texto, que es el corazón del método.
Por eso: exportador propio, fino sobre `gh api`.
