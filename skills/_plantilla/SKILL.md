---
name: plantilla-skill
description: >-
  Plantilla vacía de skill marco-agnóstico. Usar al crear un skill nuevo:
  parametriza «el mundo»; no nombra mundos reales ni el marco.
---

# Plantilla de skill

Sustituí este cuerpo por el método. La cara pública:

1. Habla de **el mundo** como parámetro (ruta, config, calibración local).
2. No nombra mundos reales ni el marco.
3. Separa **protocolo** (aquí) de **datos** (carpeta `instancias/` del
   paquete o calibración local del consumidor).

## Cuándo aplicar

Cuando el agente deba seguir este método en cualquier mundo que lo active.

## Pasos

1. Leer la calibración local del mundo (si existe).
2. Ejecutar el método con esa calibración.
3. Dejar evidencia en el canal que el mundo declare.

## Recursos opcionales

- `reference/` — detalle de protocolo
- `examples/` — ejemplos sin datos de mundo real
- `scripts/` — utilidades parametrizadas
