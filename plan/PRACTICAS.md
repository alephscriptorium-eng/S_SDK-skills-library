# PRACTICAS — reglas de devolución (mundo-fuente)

Criterio con el que el orquestador **devuelve** un WP. El worker relee su
diff contra este fichero y los ejes aplicables antes de reportar.

## Alcance

- El diff del worker vive **solo** dentro del `ALCANCE_DIFF` declarado en
  su BRIEF.
- Citar, no copiar árboles ajenos. Ningún sello sin fuente; ruta citada =
  ruta existente.
- Commits convencionales, en **castellano**, un repo por commit.

## Ejes de CA (obligatorios por tipo de WP)

Fuente: `skills/swarm-orquestacion/reference/ejes-ca.md` (referencia
intra-repo; el mundo-fuente no la copia).

| Tipo de WP | Eje | CA mínimo |
| ---------- | --- | --------- |
| extracción / kit nuevo | I | ≥1 consumidor real verificado |
| demolición / lógica viva | II | destino canónico; grep = 1 def. |
| auditoría / layout | III | gate dedup de código vivo |
| contrato / capa compartida | IV | segundo cliente independiente |
| activación de mundo con skill | IV + 13 | agente fresco (solo skill) |
| publish / cara pública skill | ceguera + 14 | árbol **y** `git log -p` = 0 |
| relación con swarms ajenos | V | mediación transparente |

Un WP puede activar **varios** ejes; el BRIEF los lista todos.

## Ceguera (CA transversal — este repo ES la cara pública)

Cualquier WP que toque `skills/`, `README.md` o `docs/` verifica ceguera
antes de merge:

- Árbol: `bash skills/swarm-orquestacion/scripts/comprobar-ceguera.sh` →
  `ceguera: 0`.
- Historial reachable (regla 14): `git log -p` sobre lo tocado, 0 hits de
  tokens de marco. Fuga intermedia = **squash antes del merge**.
- Medida canónica: exit de `grep -c` / `grep -q`; **nunca**
  `grep | head && echo OK`.

## Verificación de contrato de consumo (C8)

Todo WP que cambie el procedimiento de consumo o la versión del paquete
verifica que la referencia fijada **resuelve**:

```bash
npm view @alephscript/skills-scriptorium@X.Y.Z \
  --registry=https://npm.scriptorium.escrivivir.co version   # exit 0
```

## Docs

WP que toca `docs/` deja la build verde con `ignoreDeadLinks: false`:

```bash
npm run docs:build   # build complete
```

## Auto-revisión

Antes de reportar, el worker rellena el bloque de auto-revisión de la
plantilla (`skills/swarm-orquestacion/reference/plantilla-reporte.md`) con
honestidad; lo no comprobado es `<pendiente>` / `⏳ sin verificar`.
