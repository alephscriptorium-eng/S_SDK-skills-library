# Ensayo I25 — ciclo de vigilancia (mundo M)

Simulación Eje IV: un **segundo consumidor** carga solo el skill
`vigilancia` + la fixture `instancias/ejemplo-M/` y reproduce un ciclo
completo (pulso + veredicto/addenda).

## Parámetros usados

| param | valor |
| ----- | ----- |
| `WORLD_ROOT` | repo git sintético «mundo M» (fuera de esta library; no es el marco) |
| `OUT_DIR` | esta carpeta (`ensayos/i25-ciclo-M/`) |
| `INTERVAL` | 2 s (ensayo; fixture documenta 45 s) |
| instancia | `instancias/ejemplo-M/` (solo lectura; no mutada) |
| skill | `skills/vigilancia/` |

## Artefactos del ciclo

| ruta | rol |
| ---- | --- |
| `watch.log` | pulso del watcher |
| `anomalias.log` | anomalías elevadas |
| `addenda-A-i25-huerfano.md` | addenda dos caras + prueba de ceguera |
| `veredicto.md` | cierre del ciclo (re-verificación de facto) |

## Qué no es

- No muta `instancias/ejemplo-M/` (corpus canónico intacto).
- No vigila el repo del marco que publica el skill.
- No es publicación al registry (fuera de este ensayo).
