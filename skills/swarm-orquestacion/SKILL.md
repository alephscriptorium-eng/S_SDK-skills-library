---
name: swarm-orquestacion
description: >-
  Protocolo de swarm marco-agnóstico: roles (orquestador, worker, revisión,
  corrección), ciclo prep→worker→revisión→merge, BRIEF, plantilla de reporte
  y cinco ejes de CA por tipo de WP. Activar al montar o operar el plan/ de
  cualquier mundo; parametriza rutas y BACKLOG del consumidor.
---

# Skill · swarm-orquestacion

Método para orquestar un swarm de agentes sobre **el mundo** (parámetro:
raíz del repo o carpeta del mundo, worktrees, `plan/BACKLOG.md` del
consumidor). No nombra mundos reales ni el marco.

## Cuándo aplicar

- Arrancar el `plan/` de un mundo nuevo solo con este skill.
- Operar un lote de WPs: asignar → implementar → revisar → merge.
- Exigir los **cinco ejes** como criterios de aceptación según el tipo de WP
  (ver `reference/ejes-ca.md`).

## Parámetros del mundo

| parámetro | significado | ejemplo local |
| --------- | ----------- | ------------- |
| `MUNDO_RAIZ` | raíz del repo o carpeta del mundo | ruta absoluta del consumidor |
| `PLAN_DIR` | directorio de plan | `$MUNDO_RAIZ/plan` |
| `ALCANCE_DIFF` | prefijo(s) donde el worker puede escribir | p. ej. `plan/` o carpeta del pack |
| `WORKTREE_BASE` | directorio padre de worktrees paralelos | hermano de `MUNDO_RAIZ` |
| `RAMA_WP` | patrón de rama | `wp/<id>-<slug>` |

La calibración concreta (rutas, gates, sellos) vive en el `plan/` del
mundo, no en este skill.

## Montaje rápido (mundo nuevo)

1. Copiá o generá el esqueleto con `scripts/montar-plan.sh` (ver README).
2. Rellená `VISION.md`, `PRACTICAS.md` (reglas del mundo) y el primer
   `BACKLOG.md`.
3. Los prompts de rol viven en `plan/roles/` (copias del skill o enlace a
   `reference/roles/`).
4. Arrancá el ciclo: orquestador → BRIEF → worker → reporte → revisión.

Detalle: `reference/ciclo.md` · roles: `reference/roles/` · ejes:
`reference/ejes-ca.md` · ejemplo: `examples/`.

## Ciclo (resumen)

```text
1. Orquestador: estado del BACKLOG, lote paralelo, 🔶 + BRIEF por WP
2. Worker: una rama (y worktree si hay paralelo); implementa; reporta
3. Orquestador (revisión): ✅ + merge, o devolución numerada
4. Si devolución: mismo worker, misma rama (corrección)
```

## Reglas de oro

1. Un WP = un chat worker = una rama = (si hay paralelo) un worktree.
2. Solo el orquestador escribe en BACKLOG; el custodio cierra decisiones
   abiertas.
3. El worker no edita BACKLOG ni replanifica olas.
4. Evidencia literal; lo no comprobado se marca `<pendiente>`.
5. Los cinco ejes son CA obligatorios **por tipo de WP** (no opcionales).
6. Cara pública del skill: prueba de ceguera del paquete (ver README).

## Recursos

| ruta | contenido |
| ---- | --------- |
| `reference/roles/` | ORQUESTADOR, WORKER, REVISION, CORRECCION, BRIEF, README |
| `reference/ejes-ca.md` | cinco ejes → CA por tipo |
| `reference/ciclo.md` | prep → merge y anti-patrones |
| `reference/plantilla-reporte.md` | plantilla de reporte de WP |
| `examples/mundo-nuevo-plan/` | esqueleto mínimo de `plan/` |
| `examples/simulacion-montaje.md` | simulación documentada (CA de montaje) |
| `scripts/montar-plan.sh` | genera `plan/` en un destino |
| `scripts/comprobar-ceguera.sh` | grep de ceguera sobre este skill |
