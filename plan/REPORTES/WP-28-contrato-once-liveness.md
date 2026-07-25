# WP-28 · contrato-once-liveness — reporte

| dato | valor |
| ---- | ----- |
| agente | worker swarm WP-28 |
| fecha | 2026-07-25 |
| rama | `wp/28-contrato-once-liveness` |
| base | `origin/main` @ `cbebbcc` |
| eje(s) CA | contrato ONCE · liveness portable · fuente única · tests · ceguera |
| estado propuesto | listo para revisión |

## Qué se hizo

Contrato ONCE + liveness portable del watcher de estación (INT-Z-01 e
INT-Z-02 → DC-29), cerrando la evidencia del consumidor 2026-07-25:
`pulso.txt` con sello rancio mientras el watcher estaba vivo, `skills_mat
6 vs 8` (dos fuentes de conteo) y PID no verificable con ticks frescos.

1. **ONCE escribe SIEMPRE `pulso.txt`.** `watcher-sesion.sh` ahora deja en
   cada ciclo (y en `ONCE=1`) el snapshot canónico `pulso.txt` con `ts`
   UTC fresco, escrito de forma **atómica** (temporal + `mv`), además de la
   línea de tick en `watch.log`. `pulso-mundo.sh` pasa a ser un envoltorio
   fino sobre `ONCE=1` (ya no recuenta por su cuenta).
2. **Liveness por lease de timestamp.** Nuevo `comprobar-vivo.sh`: el
   último tick de `watch.log` con `edad < 2×INTERVAL` ⇒ **vivo**;
   `≥ 2×INTERVAL` ⇒ **muerto**; sin log / sin tick parseable ⇒ **dudoso**.
   El PID es **pista secundaria no contractual** (`kill -0`, nunca
   `tasklist`/`ps`): tick fresco con PID no verificable ⇒ vivo.
3. **Fuente única del conteo.** Nuevo `contar-skills-mat.sh`: única
   implementación del conteo de `SKILL.md` bajo `.claude/skills/`, usada
   por el ciclo (`skills_mat=` en `watch.log`) y por el snapshot
   (`skills_materializados:` en `pulso.txt`). ONCE y sesión ya no divergen.
4. **Test reproducible.** `probar-contrato-once-liveness.sh`: fixtures
   sintéticos (árboles + logs) y asserts por `grep`/`diff`; 10 aserciones.
5. **Reference:** contrato ONCE, lease y fuente única documentados en
   `estacion-viva/reference/WATCHER.md`; doctrina de lease (portable, PID
   no contractual) en la sección watcher de `vigilancia/reference/ESTACION.md`.

## Archivos tocados

- `skills/estacion-viva/scripts/watcher-sesion.sh` · modificado — ONCE escribe pulso.txt atómico; conteo por fuente única
- `skills/estacion-viva/scripts/pulso-mundo.sh` · modificado — envoltorio fino sobre ONCE (elimina el segundo conteo divergente)
- `skills/estacion-viva/scripts/contar-skills-mat.sh` · creado — fuente única del conteo `skills_mat`
- `skills/estacion-viva/scripts/comprobar-vivo.sh` · creado — liveness por lease (`vivo`/`muerto`/`dudoso`)
- `skills/estacion-viva/scripts/probar-contrato-once-liveness.sh` · creado — test ejecutable con fixtures sintéticos
- `skills/estacion-viva/reference/WATCHER.md` · modificado — contrato ONCE, fuente única, lease, scripts
- `skills/vigilancia/reference/ESTACION.md` · modificado — sección watcher: liveness por lease (portable, PID no contractual)
- `plan/REPORTES/WP-28-contrato-once-liveness.md` · creado — este reporte

## CA por CA (evidencia literal)

### CA1 · ONCE refresca `pulso.txt` (partiendo de sello previo rancio) — PASS

```
$ # pulso.txt ANTES: ts rancio 2020 + skills=8 (de otra fuente)
$ cat "$O/pulso.txt"
pulso: ok
world_root: /tmp/tmp.UPchWyCbD6/mundo
skills_materializados: 8
worktrees_dir: 0
ts: 2020-01-01T00:00:00Z

$ ONCE=1 WORLD_ROOT="$W" OUT_DIR="$O" bash skills/estacion-viva/scripts/watcher-sesion.sh

$ # pulso.txt DESPUES: ts fresco + skills=6 (fuente única)
$ cat "$O/pulso.txt"
pulso: ok
world_root: /tmp/tmp.UPchWyCbD6/mundo
skills_materializados: 6
worktrees_dir: 0
ts: 2026-07-25T10:18:15Z

$ cat "$O/watch.log"
[2026-07-25 12:18:14] sesion=1 skills_mat=6 residuo_filtrado=0 locks=''
```

### CA2 · El lease detecta vivo y muerto (y dudoso) con logs sintéticos — PASS

```
$ # tick fresco (edad 0 < 2×45)
comprobar-vivo: estado=vivo ultimo_tick='2026-07-25 12:15:29' edad=0s umbral=90s pid=- pid_pista=sin-pidfile
$ # tick de hace 450s (≥ 90)
comprobar-vivo: estado=muerto ultimo_tick='2026-07-25 12:07:25' edad=451s umbral=90s pid=- pid_pista=sin-pidfile motivo=sin-tick-reciente
$ # sin watch.log
comprobar-vivo: estado=dudoso ultimo_tick='-' edad=- umbral=90s pid=- pid_pista=sin-pidfile motivo=sin-watch.log
$ # tick fresco + PID inexistente ⇒ VIVO (pid no contractual)
comprobar-vivo: estado=vivo ultimo_tick='2026-07-25 12:15:30' edad=0s umbral=90s pid=4000000001 pid_pista=pid-no-verificable
```

### CA3 · `skills_mat` idéntico entre ONCE y sesión sobre el mismo árbol — PASS

```
PASS CA3 skills_mat único = 3 (watch.log=3 snapshot=3 directo=3 sesion2=3; ruido excluido)
```

(watch.log `skills_mat=`, pulso.txt `skills_materializados:`, conteo
directo `contar-skills-mat.sh` y un segundo ciclo de sesión coinciden; un
`SKILL.md` fuera de `.claude/skills/` NO cuenta.)

### CA4 · Win (Git Bash) + POSIX, sin `tasklist`/`ps` como fuente — PASS

- Entorno de ejecución: `MINGW64_NT-10.0-26200`, `bash 5.2.37`.
- Ningún script usa `tasklist`/`ps`. La pista de PID usa `kill -0`.
- `comprobar-vivo.sh` convierte el sello con GNU `date -d` (Git Bash /
  Linux) y respaldo BSD `date -j` (macOS).

```
$ grep -REn 'tasklist|\bps\b' skills/estacion-viva/scripts skills/vigilancia/scripts
skills/estacion-viva/scripts/comprobar-vivo.sh:15:# ... No usa tasklist/ps como fuente. La
```

(única coincidencia = el comentario que declara la regla; ninguna
invocación real de `tasklist`/`ps`.)

### Test completo — PASS (10 aserciones)

```
$ bash skills/estacion-viva/scripts/probar-contrato-once-liveness.sh
PASS CA1 ONCE refrescó pulso.txt (ts fresco: 2026-07-25T10:15:28Z, +0s)
PASS CA1 ONCE dejó línea de tick en watch.log
PASS CA3 skills_mat único = 3 (watch.log=3 snapshot=3 directo=3 sesion2=3; ruido excluido)
PASS CA2 lease VIVO (tick fresco). ...
PASS CA2 lease MUERTO (tick rancio). ...
PASS CA2 lease DUDOSO (sin watch.log). ...
PASS CA2 lease DUDOSO (log sin tick parseable). ...
PASS CA2/PID tick fresco con PID no verificable ⇒ VIVO (pid no contractual). ...
PASS INTEGR ONCE→pulso reciente ⇒ lease VIVO. ...
PASS FUENTE pulso-mundo.sh == 3 (misma fuente que sesión)
---
probar-contrato-once-liveness: PASS (todos los CA)
```

### Integración `reproduce-boot.sh` (no regresión) — PASS

```
$ OUT_DIR=$O GAME_MCP=mcp://fixture-tick-cero bash skills/estacion-viva/scripts/reproduce-boot.sh
boot exit=0
# pulso.txt con ts fresco, skills_materializados=1 (fixture); lease=vivo
```

## Auto-revisión (PRÁCTICAS del mundo — con honestidad)

- [x] Diff dentro de `ALCANCE_DIFF`: solo `skills/estacion-viva/**`,
  `skills/vigilancia/reference/ESTACION.md` (sección watcher/liveness) y
  el reporte. No se tocó `vigilancia/scripts/**` (no hizo falta), ni
  secciones de sucesión (WP-29), ni `swarm-orquestacion`, ni `site-web`,
  ni `plan/BACKLOG.md`.
- [x] Método-agnóstico: prueba de ceguera sobre el diff limpia (sin
  `zeus/scriptorium/aleph/dionisos/apolo/sol/ciudad/arrakis/dramaturgo`);
  rutas parametrizadas, «el mundo».
- [x] Shell portable: LF en index (`git ls-files --eol` → `i/lf`), sin
  `tasklist`/`ps`; `kill -0`, GNU `date -d` + respaldo BSD.
- [x] Gates ejecutados de verdad: test 10/10 PASS, ONCE before/after,
  lease en 4 estados, integración boot.
- [x] Cero árboles copiados de otros mundos: no hubo copias.
- [x] Snapshot atómico (temporal + `mv`) para no exponer `pulso.txt` a
  medio escribir.

## Desviaciones

- `comprobar-vivo.sh` y `contar-skills-mat.sh` viven en `estacion-viva`
  (no en `vigilancia`) porque el pidfile y el snapshot `pulso.txt` son de
  ese skill; el `watcher.sh` de vigilancia no escribe pidfile. La doctrina
  de lease queda documentada en `vigilancia/reference/ESTACION.md` con
  método inline (grep+date) para que un vigía con solo ese skill la
  aplique sin duplicar el script.
- No se modificó ningún script de `vigilancia`: su `watcher.sh` ya emite el
  sello `[F T]` en cada ciclo, así que el lease aplica sin cambios.

## Dudas / bloqueos

- Ninguno.
