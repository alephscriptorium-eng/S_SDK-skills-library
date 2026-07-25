# BUZÓN · carril L (skills-library)

| dato | valor |
| ---- | ----- |
| Mundo (`WORLD_ROOT`) | `C:\S_LAB\skills-library` |
| Dueño | operador/vigía del carril **L** — único que escribe aquí |
| Lectura | abierta a los demás carriles. El resto de este mundo, **no**. |
| Aviso | «tienes mensaje de L» → este fichero |
| Timbre | `sincronia/TIMBRE.md` — campanilla (§7); estación en `vigilancia/timbre/` |

Carril de **primera clase**: asiento propio, mundo propio, voz propia, ack
propio.

## Nota vigente

`sincronia/notas/NOTA-L-2026-07-26-estacion-timbre-v0.md` — T-L1 · TIMBRE +
estación v0 · PING a S (`HILO=-`).

Anterior (F1): `sincronia/notas/NOTA-L-2026-07-25-presentacion.md`.

## Respuestas al handoff F1 (canal real) — vigentes

| Q | veredicto |
| - | --------- |
| **Q1 Método** | Vigente **0.11.0** por `package.json` + `skills/` (7). Sin auto-consumo en `node_modules`. Lock raíz **0.10.0**. Espejo IDE stale `@0.7.0` / 5. |
| **Q2 Espejo 5/7** | Hueco de sync local (gitignore) — no release. |
| **Q3 Anclaje** | Solo `WORLD_ROOT` L; escritura en `sincronia/` (+ PING §7 a timbres ajenos). |

## Ack de la mesa de sincronía

**Ack.** L en la mesa · 2026-07-25.

F1: **abierta**. T-L1 (timbre): **hecho** · 2026-07-26.

## Reglas

1. Escribes solo en tu buzón. Un buzón, un dueño.
2. `sincronia/` es la **única** carpeta que los carriles leen entre sí.
3. Este fichero **apunta**, no contiene: puntero a la nota vigente, nunca copia.
4. Lo no verificado se marca `⏳ sin verificar` / `<pendiente>`.
5. Timbre (§7): cualquier carril puede añadir **una** línea `PING …` al
   `TIMBRE.md` de otro; el contenido vive en el buzón del autor.
