# A-01 — El contrato del núcleo está a medio cablear

Estado: **cerrada empíricamente** (envelope) tras WP-M24: el kit de
autoridad envuelve state/track/ledger con `makeEnvelope({ game })`.
Verificado con DOS juegos («alpha» y «bravo»): ambos publican con su
`game` por construcción del kit. Residuo diferible: el kind `intent`
sigue con `game` opcional en el helper desnudo; los wrappers de cada
juego lo inyectan hoy.

## §interna

El mundo se dio un contrato donde `makeEnvelope` es el único punto que
fuerza el campo `game`. Tras el WP que creó el helper, **cero
consumidores reales** lo usaban: cada dominio publicaba crudo. El kit
nuevo centralizó la publicación pero importó constantes sin el helper.
Patrón: promesa documentada antes de cablearse. El segundo juego
(«bravo») fue el sensor que cerró el veredicto (Eje IV).

## §WP

### Hallazgo

El kit de autoridad publica `STATE` / `TRACK` / `LEDGER` con el payload
que el dominio entrega, sin pasar por `makeEnvelope`. Solo `intent`
cumple el contrato vía wrapper local.

### Propuesta

1. Exigir `options.game` en el arranque del kit.
2. Envolver los tres kinds con `makeEnvelope({ game })`.
3. Añadir test de producción con un segundo juego independiente.

### CA

- Dos juegos publican con `game` propio en state/track/ledger.
- `makeEnvelope` lanza si falta `game`.
- Grep de publicación cruda de esos kinds en el kit = 0.
