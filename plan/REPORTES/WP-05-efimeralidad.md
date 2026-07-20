# WP-05 · efimeralidad — reporte

| dato | valor |
| ---- | ----- |
| agente | orquestador (implementación directa) |
| fecha | 2026-07-20 |
| rama | `main` (commit directo; solo-secuencial, sin worktree) |
| commits | `990a24c` (obra) + este cierre |
| eje(s) CA | ceguera + III (fuente de verdad única) |
| estado propuesto | listo para revisión |

## Qué se hizo

Se codificó como contrato la lección vivida: el plan trazado en git es la
**única fuente de verdad**; la memoria interna del agente y las carpetas
de IDE son scratch efímero. `swarm-orquestacion` gana la **regla 15**
(`reference/reglas-metodo-v04.md`), resumida en `SKILL.md` (regla de oro
11) y en la checklist de cierre de ola (`ciclo.md`), con anti-patrón
nuevo. Se **permite** la config funcional del entorno (settings, tasks,
MCP); se **prohíbe** el texto de info de sesión (markdowns, identificadores
tipo «U148») y tomar la memoria como verdad sin verificar contra el plan
(DC-4). `vigilancia` gana un check: el vigía **eleva** markdowns de info
bajo carpetas de IDE como anomalía (`watcher.sh`), con doctrina en
`ESTACION.md`. Interpretado y trasladado, no copiado literal.

Publicación: `CHANGELOG` en **Unreleased → 0.4.0**; `package.json` NO se
bumpea aún para no anunciar una versión que el registry no resuelve (el
publish es ops/CI).

## Archivos tocados

- `skills/swarm-orquestacion/reference/reglas-metodo-v04.md` · creado — regla 15 + checklist extendida
- `skills/swarm-orquestacion/SKILL.md` · modificado — regla de oro 11 + puntero v0.4 + recursos
- `skills/swarm-orquestacion/reference/ciclo.md` · modificado — cierre de ola + anti-patrón
- `skills/vigilancia/scripts/watcher.sh` · modificado — detección de residuo de info en carpetas de IDE
- `skills/vigilancia/reference/ESTACION.md` · modificado — doctrina de residuo (regla 15)
- `skills/vigilancia/SKILL.md` · modificado — «cuándo aplicar» incluye residuo
- `CHANGELOG.md` · modificado — Unreleased → 0.4.0 (WP-05)

## Evidencia

```
$ bash skills/swarm-orquestacion/scripts/comprobar-ceguera.sh
ceguera: 0

$ grep -rniE "<tokens-de-marco>" <ficheros WP-05>
marco: 0        # ← 0 tokens de marco (.claude/.cursor son nombres de carpeta IDE, no marco)
```

## Auto-revisión (con honestidad)

- [x] Diff dentro de alcance (`skills/swarm-orquestacion/`, `skills/vigilancia/`, `CHANGELOG`).
- [x] Interpretado, no copiado literal del enunciado (regla 15 profesional + check de vigía).
- [x] Config funcional permitida; solo se ataca el texto de info (DC-4).
- [x] Dedup: v0.4 no restata las 14 reglas; referencia v0.3.
- [x] Ceguera 0; `.claude`/`.cursor` son nombres de carpeta, no marco.
- [x] Publish honesto: Unreleased, sin bumpear `package.json` (C8 de 0.4.0 = ⏳ hasta publish).
- [x] Commit convencional, español.

## Hallazgos fuera de alcance

- El check de `watcher.sh` heurístico (`*.md` bajo carpetas de IDE) puede
  dar falso positivo si un mundo guarda docs legítimos ahí; se asume que
  no (DC-4). Ajustable por lista de exclusión si algún mundo lo pide.

## Dudas / bloqueos

- Publish de 0.4.0: ops/CI, fuera de esta sesión (sin credenciales de registry).

---

## Revisión del orquestador

**Aceptado ✅** — contrato ampliado con regla 15 + check de vigía; ceguera
0; publish diferido de forma honesta (Unreleased). Evidencia arriba.
