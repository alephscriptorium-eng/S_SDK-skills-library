# BACKLOG (fixture SINTÉTICA) — tercera cara VÁLIDA: `deps` en prosa

En una herramienta en castellano, unir dos dependencias con «y» es lo que
escribe quien la usa. El contrato declara la holgura (§1) y el linter la acepta:
separadores naturales, conectores en prosa (`y`, `e`, `and`), punto final,
paréntesis y enlaces markdown. La prosa sin dígitos se ignora; un token **con**
dígitos que no sea un ID legible sí se caza (`dep-no-interpretable`).

## Lane A · ALFA

| WP | P | BRIEF | CA | deps | ejes |
| -- | - | ----- | -- | ---- | ---- |
| **FX-A01** | P0 | extraer el kit de plantillas a un paquete propio | el probe del consumidor sintetico resuelve la plantilla con exit 0 | Ninguna. | I |
| **FX-A02** | P1 | cablear el kit en el adaptador de entrada | grep del simbolo devuelve 1 definicion en el adaptador | ninguna (WP raiz del carril) | II |
| **FX-A03** | P1 | publicar la cara publica del kit de plantillas | el script de ceguera imprime `ceguera: 0` en arbol e historial | FX-A01 y FX-A02 | ceguera |
| **FX-A04** | P2 | segundo cliente independiente del contrato | la suite del segundo cliente pasa en verde sin tocar al primero | [FX-A01](#fx-a01); FX-A03. | IV |
