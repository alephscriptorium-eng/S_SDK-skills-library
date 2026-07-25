# WP-30 · guard-identidad — reporte

| dato | valor |
| ---- | ----- |
| agente | worker-lib (swarm skills-library) |
| fecha | 2026-07-25 |
| rama | `wp/30-guard-identidad` |
| commits | `ae271db` (impl+tests+doc) · commit del reporte (tip) |
| eje(s) CA | ninguno de los cinco (WP de utilidad/gate opt-in) |
| riesgo de revisión | `independiente` (CA exige contrarrevisión PASS) |
| revisor distinto del worker | `⏳ pendiente de revisor distinto` |
| estado propuesto | listo para revisión |

## Qué se hizo

Sin desviaciones respecto al brief. Se creó el guard opt-in
`skills/swarm-orquestacion/scripts/verificar-identidad.mjs`: resuelve la
identidad **efectiva** de git para un repo (config `user.name`/`user.email` +
vars `GIT_AUTHOR_*`/`GIT_COMMITTER_*`, con la misma precedencia que git) y, si
cualquiera de los cuatro tokens (autor/committer × nombre/email) casa con la
lista de placeholders (default `Your Name` / `you@example.com`, ampliable con
`--placeholder` o env `IDENTIDAD_PLACEHOLDERS`), emite un WARNING con remedios.
Identidad legítima → silencio; identidad sin configurar → WARNING distinto.
**Exit 0 SIEMPRE** (warn-only); cero efectos (solo `git config --get` /
`git rev-parse`; nunca escribe config ni historia). Tests `node --test` con
repos git sintéticos en tmp (limpiados con `after`). Preflight opt-in
documentado en `reference/roles/ORQUESTADOR.md` (sección corta: correrlo antes
de commits de gobierno y merges; distinto del detector de identidad de raíz).

## Archivos tocados

- `skills/swarm-orquestacion/scripts/verificar-identidad.mjs` — **creado**:
  guard warn-only de identidad efectiva de git.
- `skills/swarm-orquestacion/scripts/probar-identidad.mjs` — **creado**: suite
  `node --test` (14 casos) con repos sintéticos.
- `skills/swarm-orquestacion/reference/roles/ORQUESTADOR.md` — **modificado**:
  sección nueva «Preflight de identidad (opt-in)».
- `plan/REPORTES/WP-30-guard-identidad.md` — **creado**: este reporte.

## Evidencia

### CA-1 · placeholder → warning con diagnóstico; identidad legítima → sin ruido; exit 0 en ambos

Salida literal del script sobre repos sintéticos (config global/system aislada):

```
=== CASO PLACEHOLDER (stderr) ===   [user.name="Your Name" user.email="you@example.com"]
[verificar-identidad] WARNING: la identidad efectiva de git es un PLACEHOLDER.
  Repo: .../demo-identidad/repo
  Un commit o merge quedaría atribuido a una identidad ficticia:
      - autor nombre: "Your Name" (placeholder)
      - autor email: "you@example.com" (placeholder)
      - committer nombre: "Your Name" (placeholder)
      - committer email: "you@example.com" (placeholder)
  Identidad efectiva:
    autor:     Your Name <you@example.com>
    committer: Your Name <you@example.com>
  Remedios (elige uno; el guard no aplica ninguno por ti):
    1. Identidad por invocación (no persiste, ideal para un commit puntual):
         git -c user.name="Nombre Real" -c user.email="tu@correo.example" commit ...
    2. Aprovisionar el entorno de la sesión (afecta a todos los commits):
         export GIT_AUTHOR_NAME="Nombre Real"    GIT_AUTHOR_EMAIL="tu@correo.example"
         export GIT_COMMITTER_NAME="Nombre Real" GIT_COMMITTER_EMAIL="tu@correo.example"
    3. Config del repo (persiste en este repo):
         git config user.name "Nombre Real"  &&  git config user.email "tu@correo.example"
  (warn-only: exit 0; no se ha tocado ninguna config ni historia.)
[exit=0]

=== CASO REAL (silencio) ===   [user.name="Nombre Real" user.email="dev@equipo.example"]
[exit=0 · sin stdout ni stderr]

=== CASO REAL --verbose ===
[verificar-identidad] OK: identidad efectiva legítima (sin placeholders).
    autor:     Nombre Real <dev@equipo.example>
    committer: Nombre Real <dev@equipo.example>
[exit=0]
```

### CA-2 · cero efectos secundarios (ni config ni historia)

Test `cero efectos: ni disco ni git config cambian` compara snapshot del árbol y
el contenido de `.git/config` antes/después de correr el guard sobre un repo
placeholder → iguales. El script solo invoca `git config --get` y
`git rev-parse` (lecturas). Grep de escritura confirma que no hay `config` de
escritura, `commit`, `rebase`, `filter`, ni `writeFileSync` sobre el repo.

### Suite completa (`node --test`)

```
$ node --version
v22.21.1
$ node --test probar-identidad.mjs
ok 1 - config placeholder -> WARNING con remedios y exit 0
ok 2 - identidad real -> silencio y exit 0
ok 3 - identidad real + --verbose -> línea OK (opt-in), sin WARNING
ok 4 - GIT_AUTHOR_* placeholder sobre config real -> WARNING (autor)
ok 5 - config placeholder pero GIT_COMMITTER real sin cubrir autor -> WARNING
ok 6 - env cubre autor y committer con identidad real -> silencio
ok 7 - --placeholder amplía la lista (email de bot de CI) -> WARNING
ok 8 - IDENTIDAD_PLACEHOLDERS (env, coma-separado) amplía la lista -> WARNING
ok 9 - coincidencia case-insensitive con recorte de espacios
ok 10 - identidad sin configurar -> WARNING (sin configurar) y exit 0
ok 11 - repo inexistente -> AVISO y exit 0 (nunca bloquea)
ok 12 - directorio que no es repo git -> AVISO y exit 0
ok 13 - cero efectos: ni disco ni git config cambian
ok 14 - --help imprime uso y exit 0
1..14
# tests 14
# pass 14
# fail 0
```

## Evidencia de riesgo y contrarrevisión

- `CASOS_ADVERSARIALES`:
  - `[automatizado]` env `GIT_AUTHOR_*`/`GIT_COMMITTER_*` que sobreescriben o
    dejan al descubierto la config (casos 4–6): la resolución sigue la
    precedencia de git y el WARNING señala el rol afectado. Resultado: PASS.
  - `[automatizado]` exit 0 aunque el repo no exista o no sea git (casos 11–12):
    AVISO + exit 0, jamás bloquea. Resultado: PASS.
  - `[automatizado]` cero efectos: snapshot de árbol y `.git/config`
    invariantes (caso 13). Resultado: PASS.
  - `[manual]` inspección: el script no contiene `git config <valor>`,
    `git commit`, `git rebase/filter`, ni escritura de ficheros del repo.
- `DEPENDENCIAS_DIRECTAS_VERIFICADAS`: solo built-ins de Node
  (`node:child_process`); cero deps externas. Requiere `git` en PATH (mismo
  supuesto que el resto de scripts del skill).
- `INSTALACION_LIMPIA`: no aplica (sin `node_modules`; script y tests corren con
  Node ≥18 y `git`, sin instalar nada). Ejecutado con Node v22.21.1.
- `TEST_AUTOMATIZADO_VS_EVIDENCIA_MANUAL`:
  - Automatizado: `node --test probar-identidad.mjs` → 14/14 pass (arriba).
  - Manual: invocaciones directas del script sobre repos sintéticos (bloque
    CA-1) e inspección del código para descartar escrituras.
- `VEREDICTO_REVISOR`: `⏳ pendiente de revisor distinto` (riesgo
  `independiente`; el worker no se autoacepta).

## Auto-revisión (PRACTICAS del mundo — con honestidad)

- [x] Diff solo dentro de `ALCANCE_DIFF`: `verificar-identidad.mjs` +
  `probar-identidad.mjs` + `reference/roles/ORQUESTADOR.md` + este reporte. No
  se tocó `proyectar-backlog.mjs`, `reference` fuera de `roles/`, ni
  `plan/BACKLOG.md`.
- [x] Cero árboles/ficheros copiados de otros mundos sin procedencia: código
  original; patrón de estilo tomado de los `verificar-*`/`probar-*` del propio
  skill.
- [x] Sellos con fuente; rutas citadas existentes: `../../scripts/…` resuelve
  desde `reference/roles/`.
- [x] Sin fluff ni promesa de futuro sin `<pendiente>`.
- [x] Eje(s) aplicables evidenciado(s): WP de gate opt-in; ninguno de los cinco
  ejes I–V aplica.
- [x] Gates ejecutados de verdad: `node --test` 14/14 pass (salida literal).
- [x] Commits convencionales: `feat(swarm): …` con `user.name=worker-lib`.
- [x] Diff solo del alcance del WP.
- [x] Riesgo y contraevidencia del brief cubiertos: warn-only + cero efectos
  verificados; contrarrevisión independiente pendiente de revisor distinto.
- [x] Marco-agnóstico: sin nombres de mundos/personas reales en script, test ni
  sección nueva de doc (grep limpio).
