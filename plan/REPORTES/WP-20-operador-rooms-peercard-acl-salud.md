# WP-20 · operador-rooms (peercard/ACL/salud) — reporte

| dato | valor |
| ---- | ----- |
| agente | worker swarm WP-20 |
| fecha | 2026-07-23 |
| rama | `wp/20-operador-rooms-peercard-acl-salud` |
| commits | `39a0601` |
| eje(s) CA | ceguera + 14 |
| estado propuesto | listo para revision |

## Que se hizo

Se materializo un skill nuevo en `skills/operador-rooms/` para operar
rooms sin depender de memoria de sesion. La cara publica define el
contrato de peercard, ACL y salud, y deja `<pendiente>` donde el mundo
no aporta contrato suficiente.
Se separo el metodo en referencias pequenas para identidad, autorizacion
y salud, con fallo cerrado y evidencia literal.
No se toco ningun archivo fuera de `skills/operador-rooms/` ni del
reporte permitido.

## Archivos tocados

- `skills/operador-rooms/SKILL.md` - contrato principal del skill y
  pasos de uso
- `skills/operador-rooms/reference/peercard.md` - contrato de identidad
- `skills/operador-rooms/reference/acl.md` - contrato de autorizacion
- `skills/operador-rooms/reference/salud.md` - contrato de estado
- `plan/REPORTES/WP-20-operador-rooms-peercard-acl-salud.md` - reporte
  de entrega

## Evidencia

> Salida literal.

```
$ if rg -n -i -e 'zeus|hol[oó]n|holarqu[ií]a|SCRIPT_SDK|S_SDK|juntura' "skills/operador-rooms"; then echo "ceguera: FAIL"; else echo "ceguera: 0"; fi
ceguera: 0

$ if git log -p -- skills/operador-rooms | rg -n -i -e 'zeus|hol[oó]n|holarqu[ií]a|SCRIPT_SDK|S_SDK|juntura'; then echo "git log -p ceguera: FAIL"; else echo "git log -p ceguera: 0"; fi
git log -p ceguera: 0

$ ReadLints
No linter errors found.

$ git rev-parse --short HEAD
39a0601
```

## Auto-revision (PRACTICAS del mundo — con honestidad)

- [x] Diff solo dentro de `ALCANCE_DIFF`: solo `skills/operador-rooms/`
  y el reporte permitido.
- [x] Cero arboles/ficheros copiados de otros mundos sin procedencia:
  no hubo copias; el skill se escribio desde el brief y las lecturas
  obligatorias.
- [x] Sellos con fuente; rutas citadas existentes: las rutas citadas
  existen en el worktree.
- [x] Sin fluff ni promesa de futuro sin `<pendiente>`: los huecos de
  contrato se marcaron como `<pendiente>`.
- [x] Eje(s) aplicables evidenciado(s): peercard / ACL / salud,
  ceguera y regla 14.
- [x] Gates ejecutados de verdad: ceguera del arbol nuevo, ceguera del
  historial reachable y lectura de linter.
- [x] Commits convencionales: `39a0601`.
- [x] Diff solo del alcance del WP: no se toco `plan/BACKLOG.md` ni
  `plan/ESTACION.md`.

## Hallazgos fuera de alcance

- Ninguno.

## Dudas / bloqueos

- Ninguno.

---

## Revision del orquestador

_(la rellena el orquestador: aceptado ✅ / devuelto con lista numerada)_
