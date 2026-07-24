# BRIEF · WP-23

```text
(rol) plan/roles/WORKER.md
  (fuente: skills/swarm-orquestacion/reference/roles/WORKER.md)

WP: WP-23 · pulso idle y fixes retroactivos
Rama: wp/23-pulso-idle-fixes-retroactivos
Worktree: C:\S_LAB\skills-library-wp-23
Reporte: plan/REPORTES/WP-23-pulso-idle-fixes-retroactivos.md

Lecturas extra (además de PRACTICAS + WP en BACKLOG + VISION):
- plan/SPRINTS/REVISION-SEMVER-IDLE/PLAN.md
- skills/vigilancia/SKILL.md
- skills/vigilancia/reference/ESTACION.md
- skills/vigilancia/reference/ADDENDA-DOS-CARAS.md
- Ejes CA: III + ceguera + regla 14

Notas del orquestador:
- ALCANCE_DIFF =
  skills/vigilancia/**
  plan/REPORTES/WP-23-pulso-idle-fixes-retroactivos.md
- No tocar ningún archivo de swarm-orquestacion; WP-25 integra la referencia
  cruzada desde ese skill.
- Incorporar un pulso idle que recoja residuos técnicos observados en gates,
  candidatos de fix retroactivo y propuesta de olas.
- Definir el contrato de identidad de raíz del vigía con entradas explícitas
  `CANONICAL_WORLD_ROOT`, `READ_ONLY_ROOTS` y `DOWNSTREAM_PATTERNS`.
  `WORLD_ROOT` sigue identificando la candidata, pero no prueba por sí solo
  que sea el clone canónico.
- El detector resuelve ruta absoluta normalizada para Windows,
  `realpath`/junction/symlink y `git rev-parse --show-toplevel`; compara
  pertenencia por segmentos, nunca por prefijo textual.
- Aplicar fail-closed antes de cualquier `mkdir`, escritura, watcher,
  operación git mutable, plan, rama o worktree: candidata
  igual/descendiente de downstream, ambigua, no resoluble o distinta del
  canónico = LOCK.
- Ante LOCK, el vigía pide al custodio un clone de trabajo fuera de
  `READ_ONLY_ROOTS`; no lo crea ni elige. La calibración concreta de
  `DOWNSTREAM_PATTERNS` pertenece al consumidor y no se hardcodea en la cara
  FOSS.
- Probes automatizados: canónico válido; nombre con prefijo parecido pero
  segmento distinto; descendiente downstream; junction/symlink que resuelve
  allí; `git toplevel` distinto; raíz inexistente/ambigua. Verificar que
  ningún caso bloqueado crea directorios, archivos, watcher o estado git.
- El vigilante eleva al custodio mediante addenda; no edita BACKLOG, no abre
  WP, no implementa, no acepta.
- Ampliar el contrato de salida de `vigilancia`: todo informe al custodio
  entrega primero una vista PO/SCRUM en Markdown renderizable y después un
  handoff operativo técnico para el orquestador.
- La Parte 1 queda fuera de fenced code blocks para conservar word-wrap:
  lenguaje humano, breve, con «Qué cambió», «Qué sigue» y «Decisión del
  custodio»; evita jerga de backlog, limita referencias WP a las
  imprescindibles y presenta GO/check/PASS con estados inequívocos
  (✅/⏳/⛔). Solo incluye matriz compacta si hay bifurcación real o el
  custodio pide ampliar; se prefiere lista vertical.
- La Parte 2 es un único fenced code block íntegramente copiable, sin fluff y
  limitado a backlog, gates, alcances y secuencia.
- Reusar por referencia el patrón de
  `skills/estacion-viva/reference/SALIDA-DUAL.md`; no fusionar skills ni
  duplicar su contrato de boot. La salida propia del vigía sigue viviendo
  bajo `skills/vigilancia/**`.
- Separar gate final post-merge Rn-<carril> de cualquier contrarrevisión
  read-only pre-merge.
- Añadir checklist: dependencia cargada = directa declarada; propiedad
  positiva + falsos negativos; probes automatizados o marcados manuales;
  gate local determinista separado de C8 online.
- Incluir ejemplo o fixture de addenda idle con cara pública y prueba de
  ceguera, sin datos de ninguna instancia.
- Añadir probe documental con un PASS y un bloqueo: debe fallar si falta una
  parte, si Parte 1 está cercada, si omite cualquiera de sus tres secciones,
  si oculta GO/check/PASS, si introduce una matriz sin bifurcación real, si
  Parte 2 no está completamente cercada/copiable, contiene fluff o sale del
  vocabulario backlog/gates/alcances/secuencia, o si el orden no es
  Parte 1→Parte 2. Evidenciar brevedad, pocas referencias WP en Parte 1 y el
  mismo estado operativo en ambas partes.
- RIESGO_REVISION: independiente
- MOTIVO_RIESGO: cambia el protocolo de vigilancia y sus fronteras.
- CONTRAEVIDENCIA_REQUERIDA: demostrar que el pulso propone y eleva sin
  mutar BACKLOG ni confundir contrarrevisión con gate post-merge; demostrar
  además que se rechazan una salida de una sola parte, una Parte 1 dentro de
  caja y un handoff con fluff o no copiable; demostrar también que un alias
  de filesystem o un `git toplevel` ajeno no eluden el LOCK y que un nombre
  lexicalmente parecido no produce falso positivo.
- REVISOR_DISTINTO_WORKER: sí

Empieza: sitúate en rama/worktree, lee PRACTICAS entero, luego implementa.
```
