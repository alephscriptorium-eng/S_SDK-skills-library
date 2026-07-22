# Mapa de proyección (ritual)

Procedimiento canónico para proyectar el backlog local a issues de un
tracker **sin** convertir el remoto en segunda fuente de verdad. El
markdown del plan sigue siendo el único maestro; los issues son
artefacto desechable y regenerable.

El método vive en el skill `swarm-orquestacion`
(`reference/proyeccion-issues.md` · reglas 15 y 17). Esta página es la
cara pública del **ritual** para quien consume el paquete.

## Qué es (y qué no es)

| Es | No es |
| --- | --- |
| Proyección local → remoto (`export`) | Sync bidireccional |
| Mapa `WP-id → nº issue` post-apply | Lista especulativa de números futuros |
| Inbox de comentarios para reconciliar a mano | Remoto que edita el BACKLOG |

```text
LOCAL (markdown + marcas)      REMOTO (issues)
  fuente de verdad     ──export──▶  proyección desechable
  orquestador escribe  ◀─import──  INBOX (cola de reconciliación)
```

## Ritual (orden fijo)

1. **Plan en git** — no se proyecta un backlog que no exista en el
   historial (regla 15).
2. **Preview** — `export --dry-run` con `CEGUERA_PATTERN` por entorno
   (nunca commiteado). Sin patrón → el exportor rehúsa.
3. **Opt-in** — proyección real solo si el usuario la pide
   (`PROYECCION_GITHUB=1` / flag homólogo). Default = local-only.
4. **Apply** — crear/actualizar issues; el adaptador devuelve IDs reales.
5. **Mapa post-apply** — escribir `.sync-map.json` con esos IDs y
   commitearlo **junto** al acta (regla 17). Mapa con números inventados
   = devolución.
6. **Import** — comentarios/estados remotos → `INBOX-GH.md`; el
   orquestador reconcilia a mano el markdown.

## Fichero mapa

Convención: `plan/.sync-map.json` (o el mapa del sprint bajo su carpeta).
Git-tracked. Forma típica:

```json
{
  "WP-XX": 12,
  "OLA-B1": 12,
  "repo": "owner/name"
}
```

- Claves estables = IDs del backlog (WP / ola / umbrella).
- Valores = números reales del tracker tras el apply.
- Si un WP sale del conjunto proyectado, el exportor puede cerrar el
  issue y retirar la clave (auto-cierre documentado en el skill).

## Ceguera

Los issues son cara pública. Antes de tocar la API, el export valida el
cuerpo contra `CEGUERA_PATTERN` (regex del mundo, **vía env**). Hit →
aborta sin crear nada. Un backlog no blindado no se proyecta.

## Comandos (paquete instalado)

Desde un mundo consumidor con el skill activado:

```bash
# preview (sin API):
CEGUERA_PATTERN='<patrón del mundo>' \
  node node_modules/@alephscript/skills-scriptorium/skills/swarm-orquestacion/scripts/proyectar-backlog.mjs \
  export --dry-run \
  --backlog plan/BACKLOG.md \
  --map plan/.sync-map.json

# proyección real (solo opt-in explícito):
CEGUERA_PATTERN='<patrón del mundo>' PROYECCION_GITHUB=1 \
  node node_modules/@alephscript/skills-scriptorium/skills/swarm-orquestacion/scripts/proyectar-backlog.mjs \
  export --backlog plan/BACKLOG.md --map plan/.sync-map.json
```

Rutas de backlog/mapa: las fija la calibración del mundo (pueden vivir
bajo `plan/SPRINTS/<sprint>/`).

## Checklist corto

- [ ] Backlog del sprint está en git antes del export
- [ ] `CEGUERA_PATTERN` en env; dry-run = 0 hits
- [ ] Opt-in declarado (si no → quedarse en local-only)
- [ ] Mapa commiteado **después** del apply, con IDs reales
- [ ] Inbox reconciliado a mano; el remoto no escribe el BACKLOG

## Relación con el portal

Esta guía completa [Proyecto](/proyecto) (flujo DevOps) y
[Consumo](/guide/consumo) (versión fijada). No sustituye el skill: si el
contrato de proyección cambia, cambia el skill y esta página se alinea
en el siguiente corte publicable.
