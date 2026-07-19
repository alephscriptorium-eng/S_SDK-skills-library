# A-03 — Transporte dual reimplementado en tres sitios

Estado: **parcial** (fixture). Al demoler el paquete de sesión, la tabla
wire y el dual-delivery quedaron sin destino único; cada consumidor
reescribió una copia.

## §interna

Eje II: demoler sin declarar dónde aterriza cada símbolo multiplica.
Una extracción que mira un solo runtime deja el otro borde duplicado.

## §WP

### Hallazgo

Tras demoler el paquete de sesión, la lógica de transporte
(desnudo|envuelto + dedup) existe en tres implementaciones divergentes.

### Propuesta

1. Declarar destino canónico de cada símbolo superviviente.
2. Enumerar todos los runtimes (browser y node).
3. Unificar imports; borrar copias.

### CA

- Grep de la tabla wire → una definición.
- Ambos runtimes importan del destino canónico.
