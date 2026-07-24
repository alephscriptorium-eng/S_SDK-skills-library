# Nota Z → Apolo / equipo Librería · validación downstream `@alephscript/skills-scriptorium@0.10.0`

| dato | valor |
| ---- | ----- |
| De | validación downstream (Z) |
| Para | Apolo / equipo Librería |
| Fecha | 2026-07-25 |
| Paquete | `@alephscript/skills-scriptorium@0.10.0` |
| Pedido | ACK / triage (no GO de implementación) |
| Estado | PASS downstream confirmado; feedback no pide rollback |

---

## Vista PO (sección pública)

**Qué pasó.** La librería publicó `0.10.0`; Z la adoptó, sincronizó skills y
cerró gates/CI en verde. El paquete es útil y queda validado en un consumidor
real.

**Qué falló (contrato, no runtime).** El paquete exige Node ≥22; Z anunciaba
Node ≥18 en la raíz. La adopción corrió bien en Node 22, pero el gate de
adopción detectó la contradicción contractual y Z elevó su raíz a ≥22.

**Qué pedimos.** Triage y ACK: priorizar preflight/documentación de “uplift de
engine” en el Gate Forward; reforzar evidencia C8 y pin exacto; investigar dos
puntos menores (pulso ONCE, identidad git placeholder). Antes de abrir WPs
nuevos, reutilizar ownership de WP-23 / WP-25 / WP-26 / DC-28 si aplica.

**Qué no pedimos.** Rollback de `0.10.0`. GO automático de implementación.

---

## A. Recap / PASS downstream confirmado

Evidencia confirmada (fuentes abajo):

| ancla | valor |
| ----- | ----- |
| Release LIB | commit/tag `f251066` (`v0.10.0`) |
| Docs LIB | run `30125503524` · success |
| Publish LIB | run `30125507369` · success |
| Registry canónico | versión exacta `0.10.0`; tarball/integrity verificados |
| Adopción Z | rango `>=0.10.0 <1.0.0`; lock exacto `0.10.0`; registry canónico; `npm ls` exacto |
| Commits Z | adopción `3bec18a`; corrección contrato Node + cierre `b348c59` |
| CI Z | `30128202345` · success · 27/27 |
| Docs Z | `30128202336` · success |
| Gates / tests | `0 offenders`; tests `9/9`; probes semver `32/32`; integración PASS; smoke registry GREEN |
| `skills:sync` | siete skills publicadas; procedencia `@0.10.0`; checksums de `vigilancia` / `swarm-orquestacion` / `estacion-viva` coinciden byte a byte |

**Fuentes (solo lectura):**

- LIB cierre: `C:\S_LAB\skills-library\plan\SPRINTS\REVISION-SEMVER-IDLE\PLAN.md` (§ Cierre operativo · 0.10.0)
- LIB handoff: `C:\S_LAB\skills-library\plan\SPRINTS\REVISION-SEMVER-IDLE\HANDOFF-SUSPENSION.md`
- Z gate FAIL (contrato Node): `C:\S_LAB\vigilancia\z\GATE-ADOPCION-LIB-0.10-Z-FAIL.md`
- Z gate PASS: `C:\S_LAB\vigilancia\z\GATE-ADOPCION-LIB-0.10-Z-PASS.md`
- Z aviso engines: `C:\S_LAB\z-sdk\plan\REPORTES\entregas\AVISO-ADOPCION-0.10-engines-node22.md`

---

## B. Hallazgo / bug confirmado de integración

**Confirmado.** El paquete declara Node `>=22`. Z declaraba raíz `>=18`. La
adopción funcionó en Node 22 (local/CI), pero el gate de adopción midió
contradicción contractual y no pudo declarar ambos baselines compatibles. Z
elevó raíz a `>=22.0.0` (manifest + lock) y revalidó → PASS en `b348c59`.

**Feedback accionable.** El Gate Forward debería declarar explícitamente
«uplift de engine downstream» y comprobar, antes de declarar adopción cerrada:

1. `package.json#engines` del consumidor (raíz) vs `engines` del paquete adoptado;
2. engines reflejados en el lock raíz;
3. Node efectivo de CI/Docs alineado con ese contrato.

Sin ese preflight, un PASS de runtime en Node 22 puede enmascarar un FAIL de
contrato para colaboradores en Node 18.

---

## C. Riesgos / política semver

**Confirmado en uso.** Downstream adoptó major-band `>=0.10.0 <1.0.0` (banda
`0.x` abierta hasta `1.0.0`).

**Política recomendada (ya alineada con doctrina LIB de warning + integración):**

- En `0.x`, un salto minor puede romper compatibilidad. Mantener warning
  obligatorio + integración obligatoria por cada salto minor.
- `npm update` no garantiza pin a `0.10.0` si aparece otra `0.x` dentro del
  rango. Exigir lock + `npm ls` exactos a la versión objetivo; abortar si no
  coinciden.

---

## D. Feedback metodológico

| tema | observación | pedido |
| ---- | ----------- | ------ |
| Transcript C8 | Cierre LIB resume C8 exacto; no se localizó transcript autónomo completo (comando + patrón + alcance + salida literal) | Persistirlo como artefacto autónomo junto al cierre |
| Gate Forward | Documentado como pendiente de entrega; no concede GO downstream | Separar con claridad: READY técnico · entrega · GO de adopción · PASS downstream |
| Anclas de avisos | Buena práctica vista en Z: base / sello / remate; sin SHA autorreferente del tip del aviso | Campos operativos literales; cero residuos de plantilla (`<debe ser…>`) en entregas firmadas |
| Contrarrevisión | Valida en validadores / manifests / gates | Mantener revisor independiente antes de merge |
| Identidad git | Commits Z con placeholder `Your Name <you@example.com>` (registrado; sin rewrite) | Preflight de identidad git válida; no cambiar `git config` automáticamente ni reescribir historia |

---

## E. Candidato a bug · NO confirmado

**Hipótesis (requiere reproducción):** `pulso ONCE` aparentó no refrescar
`pulso.txt` (sello antiguo; diferencia observada `skills_mat=6` vs `8` en
`watch.log` de vigilancia Z).

**No afirmar como bug.** Aclarar antes:

- ¿ONCE escribe otro destino (`OUT_DIR` distinto / stdout)?
- ¿El watcher es el único propietario de `pulso.txt` y ONCE es no-op sobre ese fichero?

Marcar investigación como P2; no bloquear ACK de `0.10.0`.

---

## F. Resultado / petición a Apolo

1. **`0.10.0` queda validada downstream y útil.** Este feedback no pide rollback.
2. **Clasificación propuesta:**
   - **P0** — preflight/documentación «uplift de engine» en Gate Forward (`engines` + lock raíz).
   - **P1** — transcript C8 autónomo + exigencia de target exacto (lock/`npm ls`).
   - **P2** — investigación `pulso ONCE` / preflight identidad git.
3. **DRY.** Antes de crear WPs nuevos, revisar ownership y extender CA si coincide:
   - WP-23 (`skills/vigilancia/**` — pulso, salida dual, identidad de raíz)
   - WP-25 (integración método / preflight por referencia)
   - WP-26 (futuro; no mezclar con este feedback sin GO)
   - DC-28 (clone canónico y downstream read-only)
4. **Pedir ACK/triage**, no GO de implementación automático.

---

## Handoff operativo (copy/paste)

```text
NOTA Z→APOLO · skills-scriptorium@0.10.0 · 2026-07-25

VEREDICTO
- PASS downstream confirmado; útil; sin rollback.

EVIDENCIA CLAVE
- LIB: f251066 / Docs 30125503524 / Publish 30125507369 / registry 0.10.0
- Z: 3bec18a → b348c59 / CI 30128202345 (27/27) / Docs 30128202336
- Gates 0; tests 9/9; semver 32/32; integración PASS; smoke GREEN
- skills:sync @0.10.0; checksums vigilancia/swarm-orquestacion/estacion-viva OK

BUG CONFIRMADO
- engines paquete >=22 vs raíz Z >=18 → Z elevó a >=22.0.0
- Gate Forward: declarar uplift engine + check engines/lock antes de cierre

POLÍTICA
- 0.x major-band: warning + integración por minor
- exigir lock/npm ls exactos; abortar si ≠ versión objetivo

PEDIDO
- ACK/triage P0/P1/P2 (arriba)
- DRY vs WP-23, WP-25, WP-26, DC-28 antes de WPs nuevos
- NO GO implementación automático

CANDIDATO NO CONFIRMADO
- pulso ONCE vs pulso.txt (reproducir)

FUENTES
- C:\S_LAB\skills-library\plan\SPRINTS\REVISION-SEMVER-IDLE\PLAN.md
- C:\S_LAB\skills-library\plan\SPRINTS\REVISION-SEMVER-IDLE\HANDOFF-SUSPENSION.md
- C:\S_LAB\vigilancia\z\GATE-ADOPCION-LIB-0.10-Z-FAIL.md
- C:\S_LAB\vigilancia\z\GATE-ADOPCION-LIB-0.10-Z-PASS.md
- C:\S_LAB\z-sdk\plan\REPORTES\entregas\AVISO-ADOPCION-0.10-engines-node22.md
- esta nota: C:\S_LAB\skills-library\plan\REPORTES\entregas\NOTA-Z-A-APOLO-validacion-skills-scriptorium-0.10.0.md
```

---

## Prueba de ceguera (sobre este fichero)

> Ejecutada al redactar. Salida literal.

```text
$ FILE=plan/REPORTES/entregas/NOTA-Z-A-APOLO-validacion-skills-scriptorium-0.10.0.md
$ P1=ze; P1+=us; P2=ho; P2+=l; P2+=$'\u00f3'; P2+=n; P3=ho; P3+=larqu; P3+=$'\u00ed'; P3+=a; P4=SCRI; P4+=PT_; P4+=SDK; P5=S_; P5+=SDK; P6=jun; P6+=tura
$ rg -n -i -e "${P1}|${P2}|${P3}|${P4}|${P5}|${P6}" "$FILE" || echo "ceguera fichero: 0"
ceguera fichero: 0
```
