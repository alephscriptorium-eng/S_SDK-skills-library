# instancias/ejemplo-M/

Fixture **de-identificada** (mundo real → parámetro «M»). Primer corpus
que ejercita el skill `vigilancia` sin histórico real de ninguna sesión.

## Qué hay

| ruta | rol |
| ---- | --- |
| `bitacora.md` | diario sintético del vigía |
| `revisiones/` | registro consolidado sintético |
| `addendas/` | addendas dos caras scrubbed |
| `handoffs/` | handoff de cierre sintético |
| `logs/` | muestras mínimas de watch/anomalías |

## Qué no hay

- Nombres de mundos reales, holones, rutas absolutas de sesión.
- Bitácoras, addendas o handoffs literales de una sesión real.
- Doctrina del protocolo (eso vive en los skills).

## Uso

```text
WORLD_ROOT=<repo-arbitrario>
OUT_DIR=<esta-carpeta>/logs   # o calibración local
# leer bitacora.md + addendas/ como ejemplo de forma, no como verdad histórica
```

Prueba de ceguera (PRACTICAS delta 5 del consumidor):

```text
rg -n -e '<patron-marco-prohibido>' instancias/ejemplo-M/
→ 0 matches
```

El consumidor sustituye `<patron-marco-prohibido>` por el de su PRACTICAS
(nombres de mundos reales / marco). Esta fixture ya viene limpia.
