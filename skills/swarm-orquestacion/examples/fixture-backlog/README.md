# fixture-backlog — las dos caras del BACKLOG despachable

Fixture **sintética** del linter `../../scripts/verificar-backlog.mjs`. Serie
inventada `FX-[A-Z]\d{2}`, lanes `ALFA` / `BETA`. Ningún dato de mundo real.

Contrato y doctrina: `../../reference/backlog-despachable.md`.
Veredicto esperado de cada fichero: `casos.json` (recuento **exacto** por
motivo + citas obligatorias del mensaje). La suite
`../../scripts/verificar-backlog.test.mjs` ejecuta esa tabla contra el linter.

## Cara que pasa

| fichero | por qué pasa |
| ------- | ------------ |
| `backlog-valido.md` | 4 WPs, 2 lanes, los siete campos, deps sin ciclos, CA con ancla y objeto |

## Cara que cae (cada una por SU motivo)

| fichero | motivo | exit |
| ------- | ------ | ---- |
| `backlog-ca-ornamental.md` | `CA-ornamental/valoracion` ×3, `sin-ancla`, `sin-objeto` | 1 |
| `backlog-ciclo-corto.md` | `dep-ciclo` (A → B → A) | 1 |
| `backlog-ciclo-largo.md` | `dep-ciclo` (A → B → C → A) | 1 |
| `backlog-campo-ausente.md` | `campo-ausente` (celda vacía, `—`, `?`) | 1 |
| `backlog-prioridad-invalida.md` | `prioridad-invalida` (`P3`, `alta`) | 1 |
| `backlog-serie-no-declarada.md` | `serie-no-declarada` (filas ajenas no se omiten) | 1 |
| `backlog-id-duplicado.md` | `id-duplicado` | 1 |
| `backlog-dep-inexistente.md` | `dep-inexistente` | 1 |
| `backlog-fila-fuera-de-tabla.md` | `fila-fuera-de-tabla-wp` (WP colado fuera del lint) | 1 |
| `backlog-columna-ausente.md` | `columna-requerida-ausente` (`deps`, `ejes`) | 1 |
| `backlog-sin-lane.md` | `columna-requerida-ausente` (`lane`) | 1 |

## Cara de la AUSENCIA (lo que calla, no lo malformado)

| fichero | motivo | exit |
| ------- | ------ | ---- |
| `backlog-vacio.md` | `backlog-vacio` (fichero de 0 bytes) | 3 |
| `backlog-sin-wps.md` | `sin-wps` (prosa; ninguna tabla con columna de WP) | 3 |
| `backlog-tabla-sin-filas.md` | `sin-wps` (cabecera y separador, sin filas) | 3 |
| `backlog-lista-sin-tabla.md` | `sin-wps` (formato de lista, no despachable) | 3 |

Ninguno de estos cuatro es «verde por vacío»: un backlog que lintea a cero
jamás es despachable.

## Reproducir a mano

```bash
node ../../scripts/verificar-backlog.mjs \
  --backlog backlog-ca-ornamental.md --series 'FX-[A-Z][0-9]{2}'
```
