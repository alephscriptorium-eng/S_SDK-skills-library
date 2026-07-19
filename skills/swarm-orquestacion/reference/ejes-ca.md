# Cinco ejes — CA obligatorios por tipo de WP

Lecciones de costura entre WPs y entre capas. El núcleo
(worktree+rama por WP) no se toca: estos ejes cierran los **bordes**.

Cada eje es **CA obligatorio** cuando el WP es de ese tipo. El orquestador
lo declara en el BRIEF; el worker lo evidencia; la revisión lo verifica.

---

## Eje I — Extracción con cableado

**Tipo de WP:** extracción de librería, kit, API o contrato nuevo.

**Fallo típico:** se acepta cuando compila y pasa tests unitarios, sin
consumidor real.

**CA obligatorio:**
- ≥1 consumidor de producción (o del pack del mundo) usa la API nueva.
- Un test o evidencia captura el **comportamiento** (payload / llamada
  real), no solo el `import`.

**Regla:** una librería no está hecha hasta que un consumidor real la usa.

---

## Eje II — Demolición con destino canónico

**Tipo de WP:** demolición o extracción que mueve lógica superviviente.

**Fallo típico:** se borra el paquete sin declarar dónde aterriza cada
símbolo; cada consumidor reescribe a mano.

**CA obligatorio:**
- El plan del WP declara el **destino único** de cada símbolo que sobrevive.
- Se enumeran **todos** los runtimes/consumidores afectados.
- `grep` (o equivalente) del símbolo absorbido → **una sola definición**.

**Regla:** demoler sin destino es multiplicar.

---

## Eje III — Gate de dedup en layout y auditoría

**Tipo de WP:** re-layout, auditoría de vías, consolidación de árbol.

**Fallo típico:** se busca código muerto y se mueve carpetas; el código
**vivo** duplicado pasa y se propaga.

**CA obligatorio:**
- Gate de **dedup por símbolo/patrón** de infraestructura o contrato.
- Falla si un one-liner o constante de contrato aparece definido en >1 sitio.

**Regla:** ordenar el árbol no es consolidar el código.

---

## Eje IV — El segundo consumidor como sensor

**Tipo de WP:** capa, contrato o convención compartida.

**Fallo típico:** un solo cliente sostiene la convención; el contrato no
está probado.

**CA obligatorio:**
- No se cierra sin un **segundo cliente independiente** que ejercite la
  capa.
- Ese segundo cliente se programa como **gate**, no como feature tardía.

**Regla:** un solo cliente prueba que compila; el segundo prueba que es
contrato.

---

## Eje V — Mediación transparente

**Tipo de WP:** relación con swarms o revisores ajenos al mundo.

**Fallo típico:** secreto total (nadie sabe que hay revisión externa) o
imposición de capa (el swarm ajeno ve el marco contenedor).

**CA obligatorio:**
- Se **ofrece** la addenda/propuesta; no se impone.
- El orquestador del mundo **puede** saber que existe revisión externa.
- **No** conoce el marco contenedor de esa revisión (asimetría de marco).
- La mediación la hace el custodio, abierta.

**Regla:** no escondas al vigía; esconde la capa.

---

## Tabla rápida (para PRACTICAS del mundo)

| Tipo de WP | Eje | CA mínimo |
| ---------- | --- | --------- |
| extracción / kit nuevo | I | ≥1 consumidor real verificado |
| demolición / extracción con lógica viva | II | destino canónico; grep = 1 def. |
| auditoría / layout | III | gate dedup de código vivo |
| contrato / capa compartida | IV | segundo cliente independiente |
| relación con swarms ajenos | V | mediación transparente |

Un WP puede activar **varios** ejes; el BRIEF los lista todos.
