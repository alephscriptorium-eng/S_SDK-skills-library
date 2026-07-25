# WP-29 · metodo-v07-lecciones — reporte

| dato | valor |
| ---- | ----- |
| agente | worker-lib (WP-29) |
| fecha | 2026-07-25 |
| rama | `wp/29-metodo-v07-lecciones` |
| commits | `ab2e263` (seis costuras) + commit del reporte |
| eje(s) CA | ceguera (regla 14) — cara pública de skill; documental |
| riesgo de revisión | `independiente` (contrarrevisión pre-✅ exigida por brief) |
| revisor distinto del worker | `⏳ pendiente de revisor distinto` |
| estado propuesto | listo para revisión |

## Qué se hizo

Se documentó el método v0.7 (SOLO docs; cero código) con seis piezas, cada una
en su fichero canónico. Todo parametrizado («el mundo», «el carril», «rol
saliente/entrante», «rol temporal»): sin nombres de mundos/juegos/personas ni
identificadores de sesión. Los tres casos del eje hostil-omite se citan
de-identificados. `comprobar-ceguera.sh` da PASS (0) y el probe de integración
del método sigue verde (no se rompió ningún contrato existente).

## Archivos tocados

- `skills/swarm-orquestacion/reference/lecciones-vnext.md` — modificado: §10
  Sucesión v2 «gorro» (handoff volátil · ronda Q&A · herencia de anomalías como
  anomalía · rol temporal con origen declarado · anclas activas vs `[cita
  inerte]`).
- `skills/vigilancia/reference/ESTACION.md` — modificado: **SOLO** nueva sección
  «Sucesión de estación (v2 «gorro»)» (33 inserciones, 0 borrados; sin tocar
  secciones watcher — dueño WP-28).
- `skills/swarm-orquestacion/reference/convivencia-multi-orquestador.md` —
  modificado: §10 Claim de carril antes de emular (claim en canal + idle real;
  doble-conductor = anomalía) + 2 filas de anti-patrones.
- `skills/swarm-orquestacion/reference/ciclo.md` — modificado: §10 Poda segura
  de worktrees (chequeo reparse → desenlazar junction → podar; alternativa
  `symlinkDirectories`) + 3 filas de anti-patrones + nota en checklist §7.
- `skills/swarm-orquestacion/reference/ejes-ca.md` — modificado: eje transversal
  «Hostil-omite» (tres casos de-identificados) + fila en tabla rápida.
- `skills/swarm-orquestacion/reference/roles/REVISION.md` — modificado:
  contrarrevisor impone la ausencia (Eje hostil-omite) + devolución automática.
- `skills/vigilancia/reference/ADDENDA-DOS-CARAS.md` — modificado: sección
  «Evidencia enmascarada» (patrón vetado enmascarado + conteo literal;
  retroactividad a cada mundo).
- `skills/swarm-orquestacion/SKILL.md` — modificado: reglas de oro 18–22 +
  sección «Método v0.7 (costuras)» (mismo patrón que v0.6; sin
  `reglas-metodo-v07.md`) + filas de recursos.
- `plan/REPORTES/WP-29-metodo-v07-lecciones.md` — creado: este reporte.

## Evidencia

> Salida literal.

Prueba de ceguera (requisito del WP):

```
$ bash skills/swarm-orquestacion/scripts/comprobar-ceguera.sh; echo "EXIT=$?"
ceguera: 0
raiz: /c/S_LAB/.worktrees/lib/wp-29-metodo-v07-lecciones/skills/swarm-orquestacion
EXIT=0
```

Probe de integración del método (regresión — no se rompió el contrato):

```
$ awk '/^```js integracion-metodo-probe$/{on=1;next} /^```$/{if(on) exit} on' \
    skills/swarm-orquestacion/reference/lecciones-vnext.md | node --input-type=module
seleccion normal/riesgo: PASS
identidad PASS/LOCK y cero efectos: PASS
salida dual valida/invalida: PASS
dedup contratos: PASS
semver verdes/invalidos/falsos-negativos: PASS
segundo cliente semver: PASS
Eje IV consumidor orquestador: PASS
Eje IV consumidor worker/ciclo: PASS
mutante orquestador-sin-salida-dual: RECHAZADO
mutante orquestador-sin-estacion-viva: RECHAZADO
mutante worker-sin-estacion-viva: RECHAZADO
mutante orquestador-sin-WORLD_ROOT: RECHAZADO
mutante orquestador-sin-CANONICAL_WORLD_ROOT: RECHAZADO
mutante orquestador-sin-READ_ONLY_ROOTS: RECHAZADO
mutante orquestador-sin-DOWNSTREAM_PATTERNS: RECHAZADO
mutante orquestador-boot-antes-de-detector: RECHAZADO
mutante ciclo-sin-pass-previo-al-boot: RECHAZADO
mutante orquestador-sin-LOCK: RECHAZADO
mutante orquestador-con-efectos-antes-del-bloqueo: RECHAZADO
mutante clausula-sin-boot-handoff: RECHAZADO
mutante orquestador-despues-de-mkdir: RECHAZADO
mutante worker-despues-de-mkdir: RECHAZADO
mutante ciclo-despues-de-efecto: RECHAZADO
integracion-metodo: PASS
pre-merge/post-merge: evidencia separada
```

Blindness scan sobre el diff (todos los ficheros tocados, no solo el skill que
cubre `comprobar-ceguera.sh`):

```
$ git diff --unified=0 | grep '^+' | grep -iE 'zeus|scriptorium|aleph|dionisos|apolo|(^|[^a-z])sol([^a-z]|$)|ciudad|arrakis|dramaturgo|novelist|novela|hol[oó]n|holarqu|juntura'
NO FORBIDDEN TOKENS FOUND
```

## CA por CA

- **CA1 — cada pieza en su fichero correcto, parametrizada, sin nombres de
  mundos/juegos ni identificadores de sesión; ceguera PASS.** ✅
  - (1) sucesión v2 «gorro»: `lecciones-vnext.md` §10 + `ESTACION.md`
    §sucesión.
  - (2) claim de carril pre-emulación: `convivencia-multi-orquestador.md` §10.
  - (3) poda segura de worktrees con junctions: `ciclo.md` §10 (ciclo/higiene).
  - (4) eje hostil-omite: `ejes-ca.md` + `roles/REVISION.md`.
  - (5) evidencia enmascarada: `ADDENDA-DOS-CARAS.md`.
  - (6) v0.7 declarado: `SKILL.md`.
  - Ceguera: `ceguera: 0` (EXIT 0). Blindness scan del diff: 0 tokens.
- **CA2 — v0.7 declarado con su resumen en SKILL.md.** ✅ Sección «Método v0.7
  (costuras)» con las cinco costuras + reglas de oro 18–22; mismo patrón
  editorial que v0.6 (no se crea `reglas-metodo-v07.md`).
- **CA3 — contrarrevisión independiente PASS antes de ✅.** ⏳ pendiente del
  revisor distinto (riesgo `independiente`); el worker no se auto-acepta.

## Evidencia de riesgo y contrarrevisión

- `CASOS_ADVERSARIALES`:
  - `[automatizado]` ceguera del skill público — `comprobar-ceguera.sh` → `ceguera: 0`, EXIT 0.
  - `[automatizado]` regresión de contrato del método — probe de integración → `integracion-metodo: PASS` (14 mutantes RECHAZADOS).
  - `[manual]` blindness scan del diff completo contra la lista de tokens vetados → 0 coincidencias.
  - `[manual]` alcance: `git status` = 8 ficheros de skill + reporte; `ESTACION.md` solo aditivo (§sucesión), sin secciones watcher.
- `DEPENDENCIAS_DIRECTAS_VERIFICADAS`: no aplica (docs; probe usa built-ins `node:fs`/`node:child_process`).
- `INSTALACION_LIMPIA`: no aplica (sin cambios de paquete; sin `node_modules`).
- `TEST_AUTOMATIZADO_VS_EVIDENCIA_MANUAL`:
  - Automatizado: `comprobar-ceguera.sh`, probe de integración del método.
  - Manual: blindness scan del diff, revisión de alcance por fichero.
- `VEREDICTO_REVISOR`: `⏳ pendiente de revisor distinto`.

## Auto-revisión (PRACTICAS del mundo — con honestidad)

- [x] Diff solo dentro de `ALCANCE_DIFF`: SKILL.md + reference/** del swarm +
  `ADDENDA-DOS-CARAS.md` + `ESTACION.md` (SOLO §sucesión). Sin `scripts/**`,
  sin `estacion-viva`, sin `plan/BACKLOG.md`.
- [x] Cero árboles/ficheros copiados de otros mundos sin procedencia.
- [x] Sellos con fuente; rutas citadas existentes (referencias cruzadas a
  ficheros del mismo repo).
- [x] Sin fluff ni promesa de futuro sin marca.
- [x] Eje aplicable evidenciado: ceguera (cara pública de skill) PASS.
- [x] Gates ejecutados de verdad: ceguera + probe integración (salida literal).
- [x] Commits convencionales: `docs(...)`.
- [x] Diff solo del alcance del WP.
- [x] Riesgo y contraevidencia del brief cubiertos (regla de oro «ceguera del
  skill»: todo parametrizado, tres casos de-identificados).
- [x] Pruebas automatizadas (ceguera, probe) separadas de evidencia manual
  (scan del diff, revisión de alcance).

## Hallazgos fuera de alcance

- `README.md` de `swarm-orquestacion` sigue declarando «Versión de método:
  v0.6» y «cinco ejes»; `README.md` está **fuera** del `ALCANCE_DIFF` (solo
  `SKILL.md` + `reference/**`). Candidato a WP menor de sync editorial
  README↔SKILL. No se tocó aquí.
- Decisión editorial: «hostil-omite» se documenta como **eje transversal de
  contrarrevisión** (junto a «Ceguera»), no como «Eje VI» numerado, para no
  invalidar «cinco ejes» en el README fuera de alcance ni forzar renumeración.
  Sigue el precedente del eje transversal Ceguera.

## Dudas / bloqueos

Ninguno.

---

## Revisión del orquestador

_(la rellena el orquestador: aceptado ✅ / devuelto con lista numerada)_
