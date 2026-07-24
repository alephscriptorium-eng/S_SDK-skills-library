# BRIEF · WP-26

```text
(rol) plan/roles/WORKER.md
  (fuente: skills/swarm-orquestacion/reference/roles/WORKER.md)

WP: WP-26 · rescatar skill runtime prueba-de-dos
Estado: FUTURO POSTERIOR a REVISION-SEMVER-IDLE; ⬜
Rama: <pendiente de planificación y gate propios>
Worktree: <pendiente>
Reporte: plan/REPORTES/WP-26-rescatar-skill-runtime-prueba-de-dos.md

Precondiciones:
- No pertenece a Ola 1 ni Ola 2 de REVISION-SEMVER-IDLE.
- R5-LIB del sprint actual no autoriza su despacho.
- Requiere planificación futura, GO, higiene e identidad de raíz canónica,
  más un gate Rn-LIB propio sobre el tip que entonces corresponda.
- No bloquea ni amplía el release 0.10.0.

Lecturas extra (además de PRACTICAS + WP en BACKLOG + VISION):
- skills/intake-prueba-de-dos/**
- skills/operador-rooms/**
- skills/swarm-orquestacion/reference/ejes-ca.md
- Ejes CA: I + III + IV + ceguera + regla 14

Fuente de port manual (solo gobierno; no trasladar a la cara pública):
- Repo local read-only: C:\S\scriptorium
- 4427caa4: base bajo playground/prueba-de-dos/**
- 107ae6d6: semántica posterior del runtime y generador
- b66436e2: tomar únicamente cambios pertinentes de
  playground/prueba-de-dos/scripts/generar.mjs; no portar el resto
- No usar C:\S\scriptorium\codebase\skills-library como fuente de obra:
  la auditoría confirmó que es un ancestro exacto sin cherry-pick seguro/útil.

Notas del orquestador:
- ALCANCE_DIFF =
  skills/prueba-de-dos/**
  plan/REPORTES/WP-26-rescatar-skill-runtime-prueba-de-dos.md
- Portar manualmente al destino final skills/prueba-de-dos/**. No
  cherry-pickear commits externos y no reabrir WP-21; usar el skill de intake
  ya aceptado como antecedente, no como sustituto de este runtime.
- La cara pública nunca cita hashes, rutas locales, nombres de repos fuente
  ni metadata de la instancia.
- Excluir de forma explícita: cualquier .env o .npmrc; handoffs/outputs H/M;
  playground/ciudad/**; credenciales, identidades, rutas y metadata privadas.
- Referenciar skills/operador-rooms para PEERCARD, ACL y salud. No duplicar
  esos contratos ni convertir fixtures externas en fuente canónica.
- Revalidar compatibilidad con Node 22 y declarar directamente toda
  dependencia runtime; no confiar en dependencias transitivas ni copiar un
  lockfile sin justificarlo.
- Probes automatizados mínimos:
  1. --sin-install produce el resultado previsto sin instalar;
  2. no-clobber conserva archivos existentes y falla/avisa de forma
     determinista;
  3. operador inválido se rechaza sin efectos parciales;
  4. merge de scripts es idempotente al ejecutarse dos veces.
- Añadir casos verdes, inválidos y falsos negativos, más prueba de que los
  excluidos no aparecen en árbol, tarball ni historial reachable.
- Ceguera 0 en árbol e historial reachable; una fuga intermedia exige squash
  antes de merge.
- RIESGO_REVISION: independiente
- MOTIVO_RIESGO: rescata runtime externo, ejecuta generación y toca una cara
  pública nueva con riesgos de procedencia, clobber y dependencias.
- CONTRAEVIDENCIA_REQUERIDA: demostrar que los cuatro probes fallan ante sus
  casos adversariales; que Node 22 resuelve dependencias directas; que no se
  duplican PEERCARD/ACL/salud; y que ningún excluido o dato de procedencia
  local alcanza la cara pública ni su historial.
- REVISOR_DISTINTO_WORKER: sí

No empezar hasta que el custodio autorice la planificación futura y el
orquestador reemplace todos los <pendiente>, obtenga el gate propio y marque
el estado en curso en un commit de gobierno separado.
```
