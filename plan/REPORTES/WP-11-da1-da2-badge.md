# WP-11 · da1-da2-badge — reporte

| dato | valor |
| ---- | ----- |
| agente | orquestador (implementación directa) |
| fecha | 2026-07-20 |
| rama | `main` |
| commits | `8653064` (obra) + cierre |
| eje(s) CA | ceguera + III (dedup) |
| estado propuesto | listo para revisión |

## Qué se hizo

Se cerraron las decisiones pendientes del portal/consumo (DC-16..DC-18),
dentro de 0.3.2:

- **DC-18 (badge):** el catálogo muestra el badge de método de
  `swarm-orquestacion` = **v0.4.0** (la versión de método, tras la regla
  15; distinta de la versión del paquete 0.3.2).
- **DC-16 (copia sincronizada):** el doc de consumo (`consumo.md` §3 +
  `README.md`) aclara que `.claude/skills/` es **namespace de Claude Code**
  —no de este paquete—, que la fuente runner-agnóstica es
  `node_modules/.../skills/`, y **recomienda gitignorar** la copia
  sincronizada (artefacto derivado de un paquete fijado: sin cruft de un
  IDE en el repo, sin duplicar el método). Origen: la observación del
  custodio («si abro con Copilot, ¿por qué veo Claude?»).
- **DC-17 (puntero):** el puntero de consumo queda solo en README + portal;
  el `SKILL.md` no lo lleva. Sin cambio de código.

## Archivos tocados

- `docs/.vitepress/skills-meta.js` · badge swarm → 0.4.0
- `docs/guide/consumo.md` · §3 aclarado + recomendación gitignore
- `README.md` · §3 aclarado (namespace del runner + gitignore)

## Evidencia

```
$ grep cat-meta dist/catalogo.html → estable / v0.4.0 / estable / plantilla
$ node verificar-sitio.mjs → OK (internos 0 rotos; externos = warning transitorio)
$ ceguera → 0
```

## Auto-revisión

- [x] Badge = versión de método (v0.4), no de paquete; verdad de contenido.
- [x] Doc aclara que el nombre de la carpeta es del runner, no nuestro.
- [x] Gitignore recomendado (dedup + sin cruft de IDE; alinea regla 15).
- [x] DA-2 cerrada sin duplicar puntero (DC-17).
- [x] verificar-sitio verde; ceguera 0.

## Dudas / bloqueos

- Ninguno.

---

## Revisión del orquestador

**Aceptado ✅** — DA-1/DA-2 cerradas, badge veraz. Evidencia arriba.
