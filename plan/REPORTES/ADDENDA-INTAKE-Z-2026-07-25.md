# ADDENDA-INTAKE-Z-2026-07-25 · Rn-LIB · feedback downstream

## §interna

### Autoridad y fuente

- Fecha de intake: `2026-07-25`.
- Fuente primaria archivada sin reinterpretar:
  `plan/REPORTES/NOTA-Z-A-APOLO-validacion-skills-scriptorium-0.10.0.md`.
- Fuente complementaria: feedback forense SOL→Dionisos aportado por el
  custodio, con evidencia de estación Z.
- Autoridad concedida: archivar y encolar para decisión. No hay GO de
  implementación, reproducción, bugfix, release, worker, rama o worktree.
- Estado operativo de obra: **IDLE**. Los cuatro IDs `INT-Z-*` son candidatos,
  no WPs despachables.

### Higiene de la nota recibida

- La revisión literal no encontró credenciales, secretos, `.env`, `.npmrc`,
  tokens, claves privadas, rutas de carpetas IDE privadas ni identificadores de
  transcript/sesión.
- Las rutas locales que permanecen son anclas de evidencia del repositorio y
  del consumidor; no contienen material de autenticación.
- Se preserva, sin corregir, una inconsistencia documental de procedencia: la
  nota está en `plan/REPORTES/`, pero su handoff y su comando de ceguera se
  autorreferencian bajo `plan/REPORTES/entregas/`. No se usa esa ruta como
  prueba de existencia.

### Clasificación de la evidencia recibida

- **Observado / PASS downstream:** `@alephscript/skills-scriptorium@0.10.0`
  fue adoptado y validado por el consumidor; la nota aporta hashes, run-ids,
  conteos y resultado de registry. No pide rollback.
- **Hecho confirmado downstream:** el paquete declaraba Node `>=22` y la raíz
  consumidora declaraba `>=18`; el consumidor elevó su contrato a `>=22.0.0`
  y revalidó. Esto acredita una contradicción contractual downstream, no por sí
  solo un defecto de implementación en esta librería.
- **Hipótesis pendiente:** el modo `ONCE=1` aparentó no refrescar
  `pulso.txt`. La observación no demuestra todavía qué entrypoint se ejecutó
  ni qué fichero promete cada contrato.
- **Anomalía pendiente:** `watcher.pid` no fue verificable de forma uniforme
  en la estación observada aunque seguían llegando ticks.
- **Wishlist / protocolo:** sucesión de vigía v2 y guard opt-in de identidad
  de autor en commits de gobierno.

### Deduplicación y conservación de evidencia

- La política `0.x`, warning por salto minor, integración obligatoria y
  políticas `exact`/`major-band` ya están cubiertas por **WP-24** y
  `skills/swarm-orquestacion/reference/politica-dependencias-semver.md`.
  La nota añade evidencia downstream; no abre candidato adicional.
- La separación gate local / C8 online y el gate forward sin GO downstream ya
  están integrados por **WP-25**. La petición de preflight de uplift de engine
  y de transcript C8 autónomo queda preservada como feedback de diseño en la
  nota, sin convertirla aquí en un quinto candidato.
- La identidad canónica de raíz de **WP-23 / WP-25 / DC-28** no valida autoría
  de commits. Se conserva ese solape de preflight, pero `INT-Z-04` no se da por
  cubierto.
- **DA-S17** ya fue resuelto por **WP-18 / DC-25**. El caso downstream proyectó
  `0 WPs`; queda solo como cross-reference y no se reabre.
- **WP-26** es futuro, sin GO y sin relación de alcance suficiente con estos
  cuatro casos; no se amplía.

### INT-Z-01 · contrato de pulso ONCE

- **Naturaleza:** bug probable / hipótesis; `<pendiente de decisión>`.
- **Alcance probable:** `estacion-viva`, contrato entre
  `scripts/watcher-sesion.sh`, `scripts/pulso-mundo.sh` y `pulso.txt`.
- **Evidencia:** sello observado `2026-07-23T18:44:49Z`; `skills_mat=6` en
  `pulso.txt` frente a `8` en ticks de sesión. El código actual documenta
  `ONCE=1` como un ciclo y `pulso-mundo.sh` como escritor de `pulso.txt`; no
  se reprodujo qué entrypoint produjo la anomalía.
- **Criterio para promover a WP:** el custodio fija primero si `ONCE=1` directo
  promete refrescar `pulso.txt`; después, una reproducción mínima y literal
  demuestra incumplimiento del contrato fijado.
- **Dependencia / solape:** afinidad temática con WP-23 (pulso idle), pero
  propietario probable distinto: `estacion-viva`. No reabrir WP-23 por defecto.
- **Pregunta al custodio futuro:** ¿el contrato de `ONCE=1` directo incluye
  escribir `pulso.txt`, o esa garantía pertenece solo a `pulso-mundo.sh`?

### INT-Z-02 · liveness cross-platform de watcher

- **Naturaleza:** anomalía cross-platform; `<pendiente de decisión>`.
- **Alcance probable:** contrato de liveness compartido entre
  `estacion-viva` y `vigilancia`.
- **Evidencia:** `watcher.pid=4627` no era visible mediante la comprobación
  disponible mientras continuaban ticks frescos. No se demostró proceso
  muerto ni PID correcto/incorrecto.
- **Criterio para promover a WP:** documentar al menos un caso reproducible
  por plataforma donde PID y ticks divergen, y decidir qué señal acredita
  liveness.
- **Dependencia / solape:** BOOT/WATCHER actuales exigen `watcher.pid` vivo;
  WP-23 cubre identidad de raíz y pulso idle, no esta verificación
  cross-platform.
- **Pregunta al custodio futuro:** ¿qué señal debe ser canónica para liveness
  portable y qué plataformas entran en el contrato?

### INT-Z-03 · sucesión de vigía v2

- **Naturaleza:** wishlist / diseño de protocolo; `<pendiente de decisión>`.
- **Alcance probable:** `swarm-orquestacion` + `vigilancia`, continuidad de
  rol y calidad documental de handoffs.
- **Evidencia:** el método actual ya ancla «sucesión de vigía» en
  `skills/swarm-orquestacion/reference/lecciones-vnext.md`, pero no contiene
  el patrón completo «gorro»: handoff volátil, Q&A, anomalías heredadas
  conservadas como anomalías, rol temporal con origen preservado y distinción
  entre anclas activas reproducibles e históricas inertes. Caso documental
  aportado: `R13-Z` FAIL por residuo literal de plantilla en un sello
  (`base b348c59 + sello ' + short + '`).
- **Criterio para promover a WP:** el custodio acepta el patrón «gorro» como
  ampliación de contrato y delimita cuáles de sus piezas son obligatorias.
- **Dependencia / solape:** amplía la sucesión existente; no duplica WP-23 ni
  justifica reabrirlo.
- **Pregunta al custodio futuro:** ¿qué subconjunto del patrón «gorro» debe
  convertirse en contrato obligatorio y cómo se marca una ancla histórica
  para impedir que se ejecute como activa?

### INT-Z-04 · guard de identidad en commits de gobierno

- **Naturaleza:** wishlist / protocolo; `<pendiente de decisión>`.
- **Alcance probable:** preflight opt-in para commits de gobierno en
  `swarm-orquestacion`.
- **Evidencia:** commits downstream `3bec18a`, `b348c59` y `46c3e5c` fueron
  atribuidos a `Your Name <you@example.com>`. Se pide aviso, no bloqueo; sin
  cambiar `git config` y sin reescribir historia.
- **Criterio para promover a WP:** el custodio define qué identidades se
  consideran placeholder, en qué flujos de gobierno aplica y confirma la
  semántica exacta de warning opt-in.
- **Dependencia / solape:** WP-23/WP-25/DC-28 verifican identidad de raíz, no
  identidad de autor. La regla «vigía no comitea mundo» permanece intacta.
- **Pregunta al custodio futuro:** ¿qué conjunto mínimo de placeholders debe
  advertirse y en qué punto del flujo de gobierno se ejecuta el check opt-in?

## §WP

## Parte 1 · Vista PO/SCRUM

ESTADO: GO=⛔; CHECK_TRIAGE=⏳; PASS_ARCHIVO=✅

### Qué cambió

- Se archivó un PASS downstream y se encolaron cuatro candidatos estables
  `INT-Z-01`…`INT-Z-04`.
- Cada candidato conserva su naturaleza: hipótesis, anomalía o wishlist.

### Qué sigue

- Triage futuro del custodio; ningún candidato es WP ni habilita trabajo.
- El parser de IDs mixtos permanece cerrado y no se reabre.

### Decisión del custodio

- Decidir por separado si cada candidato se descarta, se mantiene en intake o
  se promueve a planificación con evidencia y GO propios.

## Parte 2 · Handoff operativo

```text
BACKLOG
- INT-Z-01: contrato pulso ONCE; <pendiente de decisión>.
- INT-Z-02: liveness watcher cross-platform; <pendiente de decisión>.
- INT-Z-03: sucesión de vigía v2; <pendiente de decisión>.
- INT-Z-04: guard identidad commits gobierno; <pendiente de decisión>.

GATES
ESTADO: GO=⛔; CHECK_TRIAGE=⏳; PASS_ARCHIVO=✅
- No asignar WP, rama, worktree ni worker antes de decisión explícita.
- Exigir reproducción antes de llamar bug a INT-Z-01.

ALCANCES
- Intake durable solo en plan/.
- Sin skills, procesos, consumidores, remotas de otros mundos ni release.
- DA-S17/WP-18 es solo referencia cerrada; no reabrir.

SECUENCIA
1. Leer la nota fuente y esta addenda.
2. Resolver una pregunta de custodio por candidato.
3. Si hay promoción, crear planificación y gate propios en otro commit.
4. Si no hay promoción, conservar naturaleza y evidencia sin ejecución.
```

## Prueba de ceguera

Cara comprobada: solo `§WP`.

```text
Patrón prohibido: \bSOL\b|Dionisos|R13-Z|z-sdk|scriptorium-cuadernos
Resultado: 0 coincidencias
```
