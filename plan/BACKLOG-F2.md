# BACKLOG F2 · L · WORLD_ROOT acabado (proyección generosa)

| dato | valor |
| ---- | ----- |
| Mundo | `C:\S_LAB\skills-library` · `@alephscript/skills-scriptorium` |
| Fuente | `INFORME-R4.md` §2 · H-01 sellado · sesión mesa |
| Estado | ⬜ propuesto · **custodio aprueba/descarta** · INÉDITO |
| Formato | lane · WP · BRIEF · CA tentativo · P0/P1/P2 |
| Historia obra | `plan/BACKLOG.md` (WP-01…34 aceptados / WP-33 🔶) |
| Edición | **F2-unificada** (Anfitrión): costura al plan único |

**Costura al plan único**: **L-F08** = la MISMA decisión de licencia que
U237/O08/G74 — un acta del custodio cubre los cuatro mundos · **L-D01**
(fix R-1) es el WP de método que O·O06 y Z·U222 consumen · **L-C06**
(LECTURA de hilo) ya está ejercida de facto en H-01: portar de la práctica,
no inventar · **L-A12/A13** (auditor §11) tienen su caso fundante completo
en esta sesión (piloto O + frontera de autoría) · **L-E01–E08** portan el
COMPACTO H-01 como método: la fuente es el consenso sellado, no diseño
nuevo.

Visión del acabado: el paquete es el **método completo** de Scriptorium —
mesa, swarm, vigilancia, rooms, holones, intake, site, cerco, adaptador
local-first (contrato), skillización de lo votado — consumible con pin
exacto, ceguera 0, dogfood en este WORLD_ROOT.

### Contrato de despacho F2

- La cara pública no contiene nombres, paths, variables, WPs ni asientos de
	esta mesa. La instancia vive en `instancias/` y queda fuera del tarball.
- Skill/contrato nuevo: Eje I + IV (consumidor real y segundo cliente).
- Frontera de confianza: `hostil-omite`; publicación: ceguera árbol+historial.
- Cada WP nombra `ALCANCE_DIFF`, semver esperado y gate de consumidor.
- El paquete es público: licencia, tarball, SBOM/provenance y C8 son parte
	del producto, no tareas de higiene opcional.

---

## Lane A · MESA (skill sincronía)

| WP | P | BRIEF | CA tentativo |
| -- | - | ----- | ------------ |
| **L-A01** ✅ | P0 | Skill de mesa, capa operativa — **integrado en `mesa-sincronia`** (fuente única del §0): `reference/BUZON-Y-NOTAS.md` (montaje §7 en 8 pasos) + plantillas BUZON/NOTA/**TIMBRE**.tpl + fixture materializada Faro/NOR/SUR (13 ficheros, un-dueño visible, compactar mostrado). Simulación de montaje EJECUTADA (carril sintético ESTE): 2 huecos hallados y **corregidos en el skill** (H1 forma del timbre anti-falseo de `base` · H2 DRAFT sin forma). Ceguera árbol+historial 0 con control positivo (re-verificada por orquestador: grep=0). Aceptado 2026-07-31 (rama `wp/l-a01-skill-mesa`) | fixture hub+2 mundos ✓ · un dueño ✓ · segundo consumidor = simulación entregada (agente fresco real → **L-G01** pendiente) · ceguera 0 ✓ |
| **L-A02** | P0 | Contrato TIMBRE + gate formato/append UTF-8 | probe vacío · encoding · append-only |
| **L-A03** | P0 | Watcher-timbre param `WATCH_FILE` + fix `grep -c`/log propio | suite casos Z/V/O; lease liveness |
| **L-A04** | P0 | TICK+HILO+COMPACTO (◆/★/⏳) + verificador de compacto | hilo sintético tick→ping→compacto |
| **L-A05** | P0 | Identidad+firma+TUI + aborto nombre cruzado | frases-contrato grepables |
| **L-A06** | P1 | Git-bitácora `sincronia/` local-only; rama `hilo/<id>` | push default ⛔ documentado |
| **L-A07** | P1 | Fixture mundo-mínimo hub+2 carriles (SEMILLA M07) | ceguera 0 · ejemplo completo |
| **L-A08** | P1 | Notaría: checklist fugas forma (propuesta≠decisión) | probe sobre compacto **sintético**, no corpus de esta mesa |
| **L-A09** | P2 | Índice regenerable desde buzones (describir) | sin pisar roster a mano |
| **L-A10** | P2 | Timbre→room (`operador-rooms`) horizonte | peercard en PING; FS=degradado |
| **L-A11** | P2 | Plantilla convocatoria emergencia / boot `sincronia/` | un comando skill |
| **L-A12** | P0 | Rol auditor sombra parametrizado (§11): permisos, ciclo, forma/fondo y traza | fixture curación→entrega→merge; auditor sin buzón; intento de escribir fuera de META falla |
| **L-A13** | P1 | Gate de autoría: auditor cura nota, dueño proyecta DRAFT/BACKLOG | fixture demuestra que el auditor no muta backlog ajeno |
| **L-A14** | P1 | Compactar-y-reemplazar con no-pérdida | ED1→ED2 sintético; historia en sello; hechos/candidatas/abiertos preservados |

## Lane B · KIT 4·3·2 (holarquia · intake · rooms)

| WP | P | BRIEF | CA tentativo |
| -- | - | ----- | ------------ |
| **L-B01** | P0 | Kit blando: fachada/composición de rooms→intake→crecimiento | menú/portal muestra kit; 3 skills siguen publicables; nombres internos no son API |
| **L-B02** | P0 | CAs de cadena: juntura→peercard/ACL→intake→skill | fixture sintética end-to-end |
| **L-B03** | P1 | `operador-rooms`: peercard opt-in + anónimo base (R2§2.a) | probes fail-closed permiso / fail-open topología |
| **L-B04** | P1 | `holarquia`: plantilla juntura LAN→WAN (sin obra ui-docker) | DS-5 · ceguera |
| **L-B05** | P1 | `intake-prueba-de-dos`: intake de mesa→BRIEF WP | ejemplo COMPACTO→WP |
| **L-B06** | P2 | Merge duro opcional (major) si custodio tumba kit blando | portal+sync+semver |

## Lane C · PROTOCOLO → skill + contratos de infraestructura

| WP | P | BRIEF | CA tentativo |
| -- | - | ----- | ------------ |
| **L-C01** ✅ | P0 | Portar PROTOCOLO §0–§11 parametrizado → **skill `mesa-sincronia`** (SKILL.md + `reference/PROTOCOLO.md` §0–§11 · 17 params + `RAICES_AUDITABLES` nuevo · fixture mesa sintética + ciclo nota→tick→informe · fila en skills-meta). Ceguera 0 en árbol e HISTORIAL (18 patrones, control positivo 28 hits contra el fuente; re-verificada por el orquestador con grep propio = 0). Desvíos razonados: nombre por dominio · §6 a tipos de voz · `F<n>:` genérico. Aceptado 2026-07-31 (rama `wp/l-c01-protocolo-skill`) | fixture calibración ✓ · ceguera árbol+historial = 0 ✓ |
| **L-C02** | P0 | Cerco v2: código histórico se porta; storage/peers actuales pueden ser externos; boot local-first | fixture con source deprecated denegada y peer actual permitido |
| **L-C03** | P0 | Gate genérico de material de identidad fuera de VCS **y** contexto/artefacto de build | falla si clave entra al contexto o imagen; cero vocabulario de carril |
| **L-C04** | P1 | Federación por tramos (superior no reescribe) | contrato skill + fixture |
| **L-C05** | P1 | Modelo nodo/relay (autoridad firma≠enruta) | doc+checks; sin implementar O |
| **L-C06** | P1 | LECTURA cruzada de hilo (cláusula §8) en skill mesa | plantilla TICK `LECTURA=` |
| **L-C07** | P2 | Pull-on-tick + validador humano como canal garantizado (watchers opcionales) | doctrina parametrizada; fixture sin nombres de rol reales |
| **L-C08** | P1 | Jerarquía de fuentes curada→evidencia→discrepancia | probe impide adoptar premisa de nota no citada |

## Lane D · VIGILANCIA / estación

| WP | P | BRIEF | CA tentativo |
| -- | - | ----- | ------------ |
| **L-D01** | P0 | Fix R-1: falso positivo espejo skills en anomalias | test con espejo 7; ceguera residuo≠skills |
| **L-D02** | P0 | Cerrar **WP-33** claim/estación vigilante si 🔶 | CA del brief WP-33 |
| **L-D03** | P1 | Identidad raíz fail-closed dogfood en WORLD_ROOT fuente | LOCK en downstream |
| **L-D04** | P1 | Bitácora «apunta no repite» + plantilla sprint | fixture OUT_DIR |
| **L-D05** | P1 | Dedup contratos / salida dual verificadores | suite existente verde + 1 caso mesa |
| **L-D06** | P2 | Multi-carril SIBLING_ROOT pulso prefijo | ejemplo 2 roots |
| **L-D07** | P2 | SLA silencio estación → ⚠️ no bloqueo | doc+probe |

## Lane E · VOLUMES como MÉTODO (no obra Z)

| WP | P | BRIEF | CA tentativo |
| -- | - | ----- | ------------ |
| **L-E01** | P0 | Referencia genérica de adaptador local-first: namespace lógico, mounts, drivers y boot offline | dos consumidores sintéticos; sin código/nombres de runtime |
| **L-E02** | P0 | Parámetro obligatorio de root lógico/mount explícito (nombre calibrable por consumidor) | omisión falla ruidosa; path no depende de cwd/repo |
| **L-E03** | P1 | Separación manifiesto sellable / estado regenerable / corpora con permisos | ceguera; segundo consumidor; coste de obra queda en instancia, no skill |
| **L-E04** | P1 | Patrón FOSS kit ligero + pack import-once + hashes coherentes | fixture canal limpio genérica; no URLs ni paquetes reales |
| **L-E05** | P1 | Shape sintético corpus+límites para CA local-first | ejemplo inventado en `examples/`; no nombres de juegos/familias reales |
| **L-E06** | P2 | Encolar C-6 P2P como WP horizonte (no ejecutar) | BRIEF segundo acto |
| **L-E07** | P2 | Notaría de compactos volumes (reutilizar L-A08) | — |
| **L-E08** | P1 | Matriz de estrategias por soporte (snapshot/stream/append-only/blob) | fixtures sintéticas; ninguna estrategia se presenta como driver implementado |

## Lane F · CONSUMO / release / dogfood fuente

| WP | P | BRIEF | CA tentativo |
| -- | - | ----- | ------------ |
| **L-F01** | P0 | Higiene: lock/package `0.11.0` + `skills:sync` espejo 7/7 en fuente | nm propio ausente OK; espejo=skills/; drift falla |
| **L-F02** | P0 | Gate release README+changelog+Node≥22+tarball allowlist | CI verde; `npm pack --dry-run`; plan/docs/instancias fuera |
| **L-F03** | P1 | Dogfood: preflight identidad antes de cualquier efecto L | script en PRACTICAS |
| **L-F04** | P1 | Contador skills / ONCE liveness sin sobreconteo | hereda WP-31 |
| **L-F05** | P1 | Portal catálogo refleja kit+mesa skills nuevos | docs:build+verificar |
| **L-F06** | P2 | TUI menú skills (probe opcional / docs) | si custodio quiere |
| **L-F07** | P2 | Publish registry + C8 pin exacto runbook | npm view exit 0 |
| **L-F08** | P0 | Decisión y alineación de licencia FOSS del paquete hoy `UNLICENSED` | custodio valida SPDX; LICENSE/package/tarball/docs coinciden |
| **L-F09** | P1 | Release reproducible + checksums + SBOM/provenance | dos builds comparan manifest lógico; artefacto descargado verificable |
| **L-F10** | P1 | Matriz de activación Claude/Cursor/runner genérico | cada runtime materializa 8 skills desde tarball limpio; sin copia divergente |

## Lane G · HOLÓN / grafo / estacion-viva

| WP | P | BRIEF | CA tentativo |
| -- | - | ----- | ------------ |
| **L-G01** | P1 | Segundo consumidor sintético del skill mesa con identidad opt-in | agente fresco monta fixture; ninguna edición en playground ajeno |
| **L-G02** | P1 | `estacion-viva` perfiles operador/participante + endpoint de juego parametrizado | boot tick-cero sintético |
| **L-G03** | P2 | Campana de dominio como transporte futuro del timbre | interfaz abstracta; implementación externa queda en instancia |
| **L-G04** | P2 | Salida dual PO/scrum en OUT_DIR mesa | fixture |

## Lane H · SWARM / plan / gobierno L

| WP | P | BRIEF | CA tentativo |
| -- | - | ----- | ------------ |
| **L-H01** | P0 | Export DRAFT→BACKLOG con marca `BLOQUEA:` y conteo de prioridades | parser acepta series configuradas; cero WPs = fallo ruidoso |
| **L-H02** | P1 | Convivencia multi-orquestador (referencia) actualizada post-mesa | ceguera |
| **L-H03** | P1 | Plantilla BRIEF+CA cinco ejes para WPs de skillización | ejemplo L-A01 |
| **L-H08** | P1 | **Lecciones de la ola 3 al método** (tres, todas nacidas de contrarrevisión adversarial y con caso real detrás): **(1) la regla que reconoce una notación en vez de un valor** — apareció en cuatro WPs distintos (censo por regex textual, corpus de sondas sin backticks, «CA verificable» como léxico cerrado, «sin segunda lista» por comillas); el patrón a enseñar es *ancla la operación o el valor, no su sintaxis*. **(2) invertir en que la divergencia no importe rinde más que en cerrarla** — formulada por el worker de V66 tras tres rondas persiguiendo a un navegador: cuando una comprobación y la realidad puedan divergir, la capa que hace inocua la divergencia (quitar la capacidad, estrechar la entrada) vale más que otra vuelta de análisis. **(3) el gate que vigila es tan atacable como lo vigilado** — G93 cerró la deriva y su gate tenía cuatro puertas; L-H06 detectó basura y su propio linter concedía por seis vías. Un gate nuevo necesita su propia contrarrevisión, no la del WP que protege **(4) el defecto más común no está en la obra, está en la frase que la describe** — formulada por el worker de U194 tras tres vueltas: *«los tres bloqueantes han sido lo mismo — afirmaciones de alcance más anchas que la evidencia — y en los tres casos la implementación era razonable»*. Confirmado en toda la ola: U197 («el carril está cerrado» cuando el carril no existía), U204 (probes que cubren una vía y afirman la propiedad entera), G93 («el censo recorre el árbol» con ocho directorios ciegos), V66 («la misma máquina de estados que un navegador»). Corolario: **la CA no es «funciona», es «funciona Y lo que el reporte afirma es exactamente lo que se probó»** — y eso solo lo caza alguien leyendo con hostilidad. **(5) medir la mejora contra el juego con el que calibraste no es medirla** — L-H06 declaró 9/12 sobre los casos que la revisión le dio; en un juego independiente eran 7/12 | las cinco con ejemplo sintético en el skill · el BRIEF-plantilla las cita · fixture que muestre el modo de fallo de (1) |
| **L-H07** | **P0** | **`git stash` prohibido en swarm multi-worktree** — la pila de stash es del **repositorio**, no del worktree: dos workers de carriles distintos se cruzaron la obra en ~30 s (incidente real, 2026-07-31; recuperado íntegro, ramas no contaminadas). La regla y sus alternativas (`git show <base>:<ruta>`, copia en scratchpad, worktree desechable) entran en el skill `swarm-orquestacion`, que es donde los workers leen el método | la regla aparece en el skill publicado · el brief-plantilla la incluye · fixture que documente el modo de fallo |
| **L-H04** | P2 | Roles plan/ por referencia; cero copia divergente | check |
| **L-H05** | P2 | Re-plan protocolo tras F2 custodio (descartes) | — |
| **L-H06** 🔶 **DEVUELTO→corrigiendo** | P1 | **Entregado y devuelto**: la contrarrevisión le coló basura por **6 vías de `exit 0`** y encontró además que **rechaza 8 de 12 CAs legítimos** — incluida la propia doctrina de ceguera del skill (`no queda ninguna referencia al símbolo antiguo en el árbol`) — porque la regla de «CA verificable» se vende como estructural pero opera como **léxico cerrado de ~80 palabras** con fragilidad morfológica (`ejecutar` sí, `ejecuciones` no; `grep` sí, `grepables` no) y se esquiva **con un dígito**. **Decisión del orquestador**: `CA-ornamental` deja de decidir el exit y pasa a **AVISO** (se sigue emitiendo con motivo y cita — su dogfood halló 28 CAs sin comprobación citada, y eso vale) porque *la calidad de un CA es juicio y un gate que rechaza CAs correctos acaba desactivado*. Bloqueantes que sí se cierran: **tercera vía de verde por vacío** (tabla indentada 4 espacios → exit 0, mientras en fence da 3) · `--umbral-valoracion perro` → `NaN` **desactiva la regla en silencio** · **flag desconocida o `--flag=valor` hace que el gate conteste sobre `plan/BACKLOG.md` en vez del fichero pedido** (en CI solo se lee el exit) · falta un **suelo** objetivo (`brief` sin deduplicar tokens). Resiste: `casos.json` exacto 16/16 verificado contra salida real, toda la familia de ciclos, exit 2 bien puesto, ninguna excepción tragada, fence y comentario HTML cerrados, cero cableado a mundo concreto, y **la ceguera medida con patrón ajeno = 0**. Linter de BACKLOG despachable (lane/WP/BRIEF/CA/P/deps/ejes). **Ola 3, despachado 2026-07-31** (`wp/lh06-linter-backlog`, worktree `wt/l-h06`) · **contrarrevisión obligatoria** (gate que concede): backlog vacío o sin filas debe caer ruidosamente, nunca verde por vacío | fixture inválida falla por CA ornamental o dependencia circular |

## Lane I · SITE-WEB / piel / verdad

| WP | P | BRIEF | CA tentativo |
| -- | - | ----- | ------------ |
| **L-I01** | P1 | Página skill mesa + kit en portal | build+ceguera |
| **L-I02** | P1 | Verificación sitio/piel/contraste post-nuevos skills | gates npm |
| **L-I03** | P2 | Guía «cómo nació la mesa» (datos en instancias/, no tarball) | ceguera cara pública |

## Lane J · HORIZONTE (generoso)

| WP | P | BRIEF | CA tentativo |
| -- | - | ----- | ------------ |
| **L-J01** | P2 | Skill «notario de compactos» genérico | — |
| **L-J02** | P2 | Hub git bare local mesa (multi-host) | parking SEMILLA |
| **L-J03** | P2 | Moderador ≠ compactador (>2 hilos) | — |
| **L-J04** | P2 | ACL por hilo en rooms | — |
| **L-J05** | P2 | Traductor COMPACTO→issues GH (opcional, local-only) | — |
| **L-J06** | P2 | Provenance de método cita sellos de consenso sin acoplar semver del paquete al ritmo de sesiones | doctrina + fixture; semver sigue contrato público |
| **L-J07** | P2 | Ensayo i25-ciclo-M → fixture mesa | — |

---

## Conteos

| prioridad | WPs |
| --------- | --- |
| **P0** | 19 |
| **P1** | 31 |
| **P2** | 23 |
| **Total** | **73** |

| lane | id | WPs |
| ---- | -- | --- |
| A MESA | L-A | 14 |
| B KIT 4·3·2 | L-B | 6 |
| C PROTOCOLO | L-C | 8 |
| D VIGILANCIA | L-D | 7 |
| E VOLUMES-método | L-E | 8 |
| F CONSUMO | L-F | 10 |
| G HOLÓN | L-G | 4 |
| H SWARM | L-H | 6 |
| I SITE | L-I | 3 |
| J HORIZONTE | L-J | 7 |

> Recuento verificado: la proyección original contenía **64** encabezados WP,
> aunque su tabla declaraba 59. La revisión añade 9; no se han inventado 14.

Disenso registrado (no bloquea encolar): L votó ◆5 ancestral; custodio validó
**env obligatorio** → L-E02.

— **L** · proyección F2 · pendiente check custodio
