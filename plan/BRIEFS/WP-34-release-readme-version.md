# Brief — WP-34 · Higiene de release: versión de README

WP: WP-34 · Rama: wp/34-release-readme-version
Worktree: C:\S_LAB\.worktrees\lib\wp-34-release-readme-version
Reporte: plan/REPORTES/WP-34-release-readme-version.md

## Lecturas
- plan/DECISIONES.md §DC-30 (INT-V-07) · evidencia: tarball 0.11.0
  con README interno citando 0.10.0
- README.md del paquete (raíz) · skills/swarm-orquestacion/scripts/
  verificar-changelog.mjs (gate de release existente)

## Tarea
1. Localizar TODAS las menciones de versión del paquete en README.md
   raíz (y cualquier doc empaquetado en `files`) y decidir el
   mecanismo anti-drift: (a) preferido — check en el gate de release
   (`verificar-changelog.mjs` o script hermano
   `verificar-release.mjs`): la versión de package.json debe
   aparecer en README (y ninguna versión anterior como «actual»);
   FALLO ruidoso si drift; (b) si el README puede derivarse
   (placeholder + generación), documentarlo como alternativa — no
   implementar ambos.
2. Corregir el drift ACTUAL del README (0.10.0 → 0.11.0) en el mismo
   lote.
3. Tests del check (fixture con drift → falla; sin drift → pasa).
4. Documentar el paso en la doctrina de release del skill (donde vive
   el checklist de `chore(release)`).

## CA
- Con README desfasado sintético, el gate FALLA ruidoso nombrando
  fichero y versiones; con README correcto, pasa.
- README real corregido a 0.11.0.
- El gate se integra al flujo existente (mismo comando o hermano
  documentado junto a verificar-changelog).
- Contrarrevisión independiente PASS antes de ✅.

## ALCANCE_DIFF
- skills/swarm-orquestacion/scripts/** (+tests) · su reference de
  release · README.md raíz (SOLO el fix de versión) · reporte.
  PROHIBIDO: estacion-viva (WP-31/32) · vigilancia (WP-33) ·
  CHANGELOG.md · package.json · plan/BACKLOG.md.
