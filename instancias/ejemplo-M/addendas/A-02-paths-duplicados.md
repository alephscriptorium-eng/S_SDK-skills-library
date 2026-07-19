# A-02 — One-liner de paths duplicado en N paquetes

Estado: **viva** (fixture). Tras un re-layout, el one-liner de resolución
de paths quedó en 5 sitios; la auditoría buscó código muerto, no
duplicación viva.

## §interna

Eje III: ordenar el árbol no consolidó el símbolo. Un patrón defectuoso
vivo se copia con cada feature hasta que un WP lo corta.

## §WP

### Hallazgo

La misma expresión de resolución de paths aparece definida en ≥5
paquetes tras el re-layout. La auditoría de vías muertas no la atrapó.

### Propuesta

1. Extraer a un helper canónico único.
2. Añadir gate de dedup por símbolo en WPs de layout/auditoría.

### CA

- Grep del one-liner → una sola definición.
- Gate de dedup falla en CI si reaparece.
