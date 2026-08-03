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
| **L-H12** | P1 | **Lecciones del bloque 12 al método — el bloque en que el defecto dejó de estar en el código y pasó a estar en el INSTRUMENTO** (4 WPs, **9 contrarrevisiones adversariales**, cero PASS a la primera, hasta **6 vueltas** en uno; y **ni un solo bloqueante fue error de lógica**, por sexta ola consecutiva). **(1) LA REGLA SE ESCRIBE MIRANDO EL DEFECTO AJENO; EL PROPIO QUEDA DETRÁS DEL OJO.** Dos workers que no se conocen, la misma noche, la misma forma: uno formuló *«un guardián ancho tapa el cableado de cada fichero»* y **tres párrafos después midió un paquete por el canal donde ese guardián lo tapa**, declarándolo «cubierto, medido, no razonado» — era el sexto fichero vulnerable; el otro formuló *«no más frases absolutas sin enumerar la superficie»* y puso un test que **enumera dos formas sintácticas, no las salidas**. **Comprobación de aceptación que deja: verificar que la lección que el worker escribe está aplicada A SU PROPIA OBRA, no sólo al defecto que la produjo.** **(2) CORREGIR EL ENCUADRE DE UN CENSO NO ES CORREGIR SU INSTRUMENTO.** Un WP aceptó que su criterio estaba mal («quién llama a esta función» → «quién convierte una cadena en un puerto de escucha») y **rehízo el censo con el mismo `grep` anclado en `process.env.`**, que por construcción no ve una lectura por parámetro. **El residuo del instrumento viejo era exactamente el fichero que faltaba.** El censo creció **1 → 3 → 4 → 5** ficheros, una vuelta por ampliación: *el crecimiento ES el dato*. **(3) CONTRA UNA LISTA, CENSAR POR EL CONJUNTO DECLARADO.** Mientras el instrumento sea una lista —de nombres (U231), de formas sintácticas (U269), de maneras de leer el entorno (U266)— **el mutante que la evade existe siempre**. Las dos salidas que funcionaron: comparar contra **el conjunto que la fuente única declara** (33 claves → «exactamente 3 alias, ningún sexto fichero»), y **una ley sobre el RESULTADO, no sobre el código** (*«todo token de la entrada tiene que aparecer en algún campo»*), que **encontró tres huecos que nadie buscaba** y no hay que mantener sincronizada. **Y su límite, declarado por el propio autor: demuestra que no se pierde entrada, no que se lea bien.** **(4) UNA LISTA DE FORMAS ES INFINITA; UNA LISTA DE RAMAS ES FINITA Y AUDITABLE.** Cuatro devoluciones seguidas por añadir canarios; la quinta cerró dándole al lexer **la invariante**: *toda rama que consume entrada, o emite, o marca opaco, o lanza; ninguna consume y calla, salvo las que declaran con su nombre que lo que consumen no es dato*. El contrarrevisor **contó las ramas por su cuenta antes de leer la tabla** y coincidieron. **(5) EL GUARDIÁN QUE VIGILA NO ESTÁ VIGILADO, y es la forma más terca del programa.** Tres instrumentos seguidos del mismo autor —censo de mutación, recuento sintáctico, ley de conservación— **apagables por completo con la suite en verde**: el tercero se sustituía por `return []` y las 96 pruebas seguían pasando, porque su control positivo **simulaba** la pérdida en vez de **llamar** a la función. **A todo instrumento nuevo se le exige el mutante que lo apaga entero, y otro que neutralice el CONSUMO de su resultado.** **(6) UN GUARDIÁN ANCHO ENMASCARA EL CABLEADO DE CADA FICHERO** — un test puede quedar **verde al ablacionar su propio guardián** porque lo sostiene otro. Pasó **cuatro** veces con el mismo resolutor, **y la cuarta la creó el propio arreglo del worker**: al ensancharlo para cerrar un menor, **retro-enmascaró dos tests suyos** y dejó vivo un comentario que decía «éste es el caso que nadie más cubre». **Corolario operativo: las ablaciones se corren DESPUÉS del último cambio, no antes.** Y al desactivar hay que preguntar las dos cosas: no sólo si el rojo viene de otro, sino **si el VERDE lo sostiene otro**. **(7) UN ARNÉS DE ABLACIÓN QUE NO ENCAJA ES UN FALSO NEGATIVO MUDO.** Patrones multilínea contra un árbol en CRLF: la mutación no entra, la suite sale verde y **se dan tres ablaciones por imposibles**. Le pasó al worker y **el contrarrevisor lo reprodujo sin querer, mismo árbol y misma causa**. Igual en el mismo bloque: medir en el **mismo proceso** hace que la caché de módulos de ESM devuelva el código sin mutar y **todas las reversiones salgan limpias**. **Toda mutación se mide en proceso hijo y se verifica que entró antes de creerse el resultado.** **(8) UN LÍMITE NO DECLARADO NO ES UN LÍMITE: ES UN AGUJERO — y uno declarado puede tener inquilinos vivos.** Un WP declaró con honestidad y con cifra que su punto débil era el camino de código; **ese hueco declarado tenía diez inquilinos medibles**, tres de ellos reproducibles en tres órdenes de consola. Declararlo no lo cierra. **(9) UN ANALIZADOR QUE ENTIENDE A MEDIAS ES PEOR QUE UNO QUE NO ENTIENDE.** El que no entiende se retira y deja trabajar al vigilante anterior; **el que cree entender calla**. Cuatro apariciones de la misma clase —un `return null` que no lanza, un `catch` que se traga la duda, un `continue` que descarta sin marcar, una rama de regex que consume sin emitir— todas en la pieza que el diseño llamaba «la retirada, nunca a silencio». **(10) NO COMPRAR SILENCIO CON RUIDO AL REVÉS.** Al cerrar los agujeros, los falsos positivos **subieron** (61→83→88→93). La decisión se sostuvo con dato, no con postura: **cada hallazgo nuevo cae en una línea que el detector anterior TAMBIÉN señalaba** (23/23, 12/12, 11/11 medido con `comm`). *No es ruido nuevo: es ruido que la versión anterior estaba comprando con silencio, y en un guardián de credenciales ése es el intercambio equivocado.* **(11) DENTRO DE UN MUNDO, LOS WPs QUE TOCAN EL MISMO GATE-RATCHET VAN EN SERIE.** Error del orquestador: dos WPs en paralelo movieron el mismo suelo de cobertura; el primero firmó 563 y el segundo llegó con 562 — **el merge habría BAJADO el suelo, justo lo que el trinquete existe para impedir**, y además un ancla del segundo **caducó en vuelo**. *Modo de fallo de CARRERA, no de medición: dos WPs firmando el mismo dato sobre bases distintas.* Lado bueno: **el gate nuevo cazó una deriva real provocada por otro WP**, que es mejor prueba que cualquier mutación fabricada. **(12) PREFIJAR EL SCRATCHPAD POR WP _Y POR ROL_**: asignar el mismo prefijo al worker y a su contrarrevisor hizo que el segundo **borrara un fichero del primero a media medición**. **(13) UNA CIFRA HEREDADA DE OTRA SESIÓN SE RE-MIDE AL REGISTRARLA, O SE PROPAGA**: «37 commits» viajó días y eran **311** | las 13 con caso real y vector detrás · ninguna nacida de opinión |
| **L-H11** | P1 | **Lecciones de la ola 6 al método — la ola en que se descubrió que nadie miraba dónde importa** (5 WPs, 4 contrarrevisiones, **cero PASS a la primera**). **(1) Antes de declarar «no se puede medir», comprueba qué herramientas tienes autenticadas.** Un worker escribió cuatro veces que no podía observar el CI real; `gh` llevaba todo el tiempo autenticado en su propio worktree. Le costó **un WP fantasma** —iba a abrir una investigación sobre 7 workspaces de los que **6 eran artefacto de su banco de pruebas**— y un techo de coste inventado que estaba a un comando. Su prudencia de no atribuir era correcta; **la premisa era falsa**. **(2) Verificar en la condición cómoda no es verificar — y el orquestador es el primero que lo incumple.** Tras un fallo propio en la ola 4 fijé «gate del repo después de cada merge»; lo cumplí **corriéndolo en local** y cerré tres olas sin mirar CI ni una vez, con la herramienta delante. **Regla ampliada: el gate tras cada merge Y CI tras cada push.** **(3) Cambio de protocolo, hallado por un worker sobre el método: CI no ve el trabajo antes de aterrizar.** El flujo dispara en ramas de WP, pero los workers no empujan, así que en la práctica CI sólo corría la rama principal **después** del merge. Era la causa de segundo orden de dos WPs de esta ola. **Ahora el orquestador empuja la rama y espera a CI antes de mergear**; los workers siguen sin empujar. Rindió a la primera: 28 verdes y 1 rojo **que no era del WP**, sin tocar la rama principal. **(4) Una decisión correcta apoyada en una cifra sin medir sigue siendo una cifra sin medir.** Bajar un umbral inalcanzable a suelo medido era lo correcto; el número que lo sostenía —«colchón de 1 punto»— resultó ser **6 unidades sobre 5903**, y se vendía como el margen que absorbería el cambio de plataforma. **(5) Un umbral en PORCENTAJE sobre un denominador inestable no es un umbral.** Medido: **arreglar dos errores de tipos —una mejora, sin tocar un test— ponía CI en rojo**, porque los ficheros que no compilan no se instrumentan y no entran al denominador. Y el inverso: **romper un fichero mal cubierto SUBÍA el porcentaje**. Se cierra cambiando de eje —**unidades cubiertas absolutas**, inmunes al denominador— y haciendo que un fichero no instrumentable sea **ERROR**, no exclusión silenciosa. **(6) Un trinquete que sólo se mueve a la baja es una pendiente**: tiene que fallar **en las dos direcciones**, y la mejora sin registrar también es un fallo. **(7) Mide antes de tocar la palanca obvia, cuando puede convertir un rojo honesto en un verde mudo.** Dar a unos tests el dato que reclamaban los dejaba en verde **con cero aserciones ejecutadas**. Un worker se negó a usar esa palanca por sospecha; el siguiente **lo midió** y la sospecha quedó demostrada. **(8) Un rojo puede ser un accidente, no una vigilancia.** El único job rojo parecía una protección funcionando; al medirlo, el guardián **ya se apagaba solo** (todo envuelto en un `catch` que devolvía «no disponible») y el rojo era **un accidente del orden de importación**. Antes de celebrar un rojo, comprueba que lo produce la guarda y no la casualidad. **(9) Mira los bytes que entrega git, no los de tu disco.** Un sello calculado en local habría puesto **CI entero en rojo** por finales de línea: 864 bytes en disco frente a 824 en el objeto. Se caza midiendo sobre lo que **recibe el runner**, no sobre el árbol de trabajo. **(10) Declarar el exceso de alcance, no esconderlo.** Un worker necesitó dos ficheros fuera de su `ALCANCE_DIFF`; lo **midió** (sin ellos, cuatro servicios no arrancan), lo escribió en la cabecera del reporte y lo entregó así. Salirse declarando y con medida es conducta correcta; salirse callando es contrabando | las diez con caso real y vector · el BRIEF-plantilla cita (1), (7) y (9) · el protocolo de despacho recoge (3) |
| **L-H10** | P1 | **Lecciones de la ola 5 al método** (ola cerrada 4/4 con 5 contrarrevisiones, **cero PASS a la primera**, 8 rondas de corrección). **(1) Un verificador que nadie llama no es una protección: es una biblioteca.** Cuando un CA diga «X falla», tiene que ejercitar **el camino del producto**, no una demostración paralela desde el arnés. Caso: un WP entregó su verificador probado y **con cero llamadas de producción** — lo declaró él mismo, y el custodio detuvo el gate hasta cablearlo. Modo de fallo **nuevo**: no una frase más ancha que la evidencia, sino una **demostración más ancha que el producto**. **(2) Un gate se abre por lo que MIDIÓ, y su declaración dice lo que NO midió** — o acaba dando fe de lo que no vio. Aplicado al abrir `GD` con sus tres huecos escritos **junto a la definición del gate**, no en un reporte. **(3) Una cifra que sube no dice por qué sube: antes de atribuirla, mírala por fichero.** Un WP atribuyó su subida de cobertura al fichero que arreglaba, y ese fichero salía **bit a bit idéntico**. Falsa **no por exageración sino por contradicción con la evidencia**, escrita de buena fe desde una intuición correcta en general, y **sembrada en un artefacto compartido**. Corolario del propio worker: *el desglose ya estaba disponible — dos comandos y un diff. No faltó instrumento; faltó desconfiar*. **(4) Pasa el detector por los ofensores que ya conoces.** Si un guardián no caza lo que su autor **ya encontró a mano**, no caza nada. Caso: un detector no cazaba **dos de los cuatro mutadores del censo de su propio WP**, a unas líneas de distancia. Es la forma **accionable** de la regla 1-bis de `L-H09` («atacarlo una vez no basta si el ataque lo diseña quien escribió la defensa»): no es «ataca más», es «usa el oráculo que ya tienes». **(5) Una fixture que no distingue dos implementaciones no vigila nada.** Antes de dar por cubierta una promesa, pregúntate **con qué dato divergirían las dos versiones** — y mete ese dato. Caso: una fixture de orden era todo ASCII minúscula, donde los dos comparadores **coinciden**; distinguía «ordenado» de «invertido», no «por código» de «por locale». **(6) Nadie comprueba que la mutación muerda.** Hallazgo de un worker sobre su propio arnés de mutación: una fila salió «superviviente» y su mutación era **un no-op**. Un arnés de mutación necesita **verificar que el mutante rompe algo** antes de creer a su superviviente. **(7) La cobertura conjunta de dos detectores es una MEDIDA, no una frase** — corolario de (4) y (5). **(8) Declarar no es proteger**, y su hermana: **serializar no es curar**. Dos parches de esta ola —un flag de concurrencia y un «se reporta pero no aborta»— tapaban el síntoma; ambos se retiraron al cerrar la causa. **(9) Un umbral calibrado en reposo se desactiva bajo carga**, que es cuando hace falta: una guarda de «ventana mínima» tenía margen 1,8× en descarga y quedaba **por encima del umbral** con la máquina cargada. Calibra en la condición en que el guardián corre, no en la cómoda | las nueve con caso real y vector · el BRIEF-plantilla cita (1) y (3) · la plantilla de contrarrevisión cita (4) y (5) |
| **L-H09** | P1 | **Lecciones de la ola 4 al método** (todas con caso real y vector detrás; la ola cerró **5/5** con 5 contrarrevisiones adversariales, **2 PASS a la primera** y 8 rondas de corrección). **(1) Un guardián no se describe: se ataca — y quien lo escribe es quien tiene que atacarlo primero.** Formulada por el worker de U202-B2. **(1-bis) Y atacarlo una vez NO BASTA si el ataque lo diseña quien escribió la defensa**: sus dos baterías sólo cubrían las vías que él ya había imaginado, y el estrechamiento que se le escapó estaba **fuera de su propio alfabeto generado**. Hace falta un atacante **ajeno**. Caso: tres rondas, tres atacantes distintos (orquestador → el propio worker → orquestador), **cero líneas de código cambiadas en las tres**. **(2) El defecto vive en la juntura, no en la pieza.** U205 hizo **14 mutaciones ejemplares sobre su driver** y la contrarrevisión encontró **cuatro guardas vivas sin un solo test** justo en la frontera que ese mismo WP creaba entre sus dos mitades. Regla: **si un WP crea una frontera, la frontera necesita mutación propia**; y si dos escritores tocan el mismo artefacto, **decide dónde vive la regla antes de escribir código** (U205 lo hizo en la 2.ª vuelta y cerró tres bloqueantes de golpe). **(3) Inyectiva como cadena ≠ inyectiva como ruta.** Es (1) de L-H08 con un disfraz nuevo y caro: U205 eliminó una guarda porque «la derivación es inyectiva» — cierto sobre cadenas, **falso sobre el sistema de ficheros**, que no distingue la caja. Dos claves válidas → un fichero → **dato perdido en silencio con un conteo que dice dos**. Alcanzable **sin malicia** (construir en Linux, importar en Windows). Agravante que enseña: **la contrarrevisión anterior había certificado esa guarda como resistente, por escrito** — o sea que *una corrección puede retirar una protección ya validada*. Al eliminar una guarda, releer quién la certificó. **(4) Diez corridas iguales no prueban nada sin brazo de control.** El worker de V90 **se negó a la CA que yo le di** y montó tres brazos (sin arreglar bajo carga · arreglado bajo la misma carga · arreglado en reposo), porque en serie la suite sale idéntica sin arreglar nada. Es (5) de L-H08 llevada a su forma fuerte: **no basta con no calibrar contra el juego propio; hay que medir también el árbol sin arreglar**. **(5) Un instrumento que confía en su propia salida no mide nada.** Los tres bloqueantes del gate de V90 eran la misma pregunta —*¿de verdad medí lo que creo?*—: comparaba **conjuntos sin multiplicidad** (un rojo nuevo con nombre repetido pasaba: **el cardinal subió y el gate que vino a abolir el cardinal no se enteró**), declaraba determinismo **sin que se ejecutara un solo test**, y leía un informe **sin prueba de frescura**. Los tres se cierran igual: **que el gate produzca su propia medida** en vez de recogerla. **(6) Contar lo inalcanzable es la coartada.** U205 tenía un campo que **contaba** el material que su índice no podía alcanzar; retirarlo fue parte del arreglo. Un contador de lo roto no es una guarda: es permiso escrito. **(7) La abstención declarada vale más que el verde.** U205 dejó dos mutaciones **sin cazar en esta plataforma** porque su vector es imposible de plantar aquí, y sus tests hacen `t.skip` **con motivo visible** en vez de pasar en silencio. Y U234-B1 **midió** un fallo intermitente en vez de llamarlo flake, publicando el **resultado modal** («2 de ~14 pasadas lo traían») en vez de la pasada buena. **(8) Una cifra «medida por grep» caduca.** Dos casos en la misma ola (un bloque de gobierno con «48/48» cuando hoy es 0, y un backlog comparando universos distintos). O se re-mide al citarla, o **se cita el gate que la sostiene**. **(9) Del orquestador, pagada en carne propia**: verificar la suite del paquete y los vectores propios **no es verificar** — pasar el **gate del repo después de CADA merge**, no sólo al final. Introduje 2 infractores por no hacerlo | las nueve con ejemplo sintético · el BRIEF-plantilla cita (1),(2) y (4) · la plantilla de contrarrevisión cita (1-bis) y (3) |
| **L-H08** | P1 | **Lecciones de la ola 3 al método** (tres, todas nacidas de contrarrevisión adversarial y con caso real detrás): **(1) la regla que reconoce una notación en vez de un valor** — apareció en cuatro WPs distintos (censo por regex textual, corpus de sondas sin backticks, «CA verificable» como léxico cerrado, «sin segunda lista» por comillas); el patrón a enseñar es *ancla la operación o el valor, no su sintaxis*. **(2) invertir en que la divergencia no importe rinde más que en cerrarla** — formulada por el worker de V66 tras tres rondas persiguiendo a un navegador: cuando una comprobación y la realidad puedan divergir, la capa que hace inocua la divergencia (quitar la capacidad, estrechar la entrada) vale más que otra vuelta de análisis. **(3) el gate que vigila es tan atacable como lo vigilado** — G93 cerró la deriva y su gate tenía cuatro puertas; L-H06 detectó basura y su propio linter concedía por seis vías. Un gate nuevo necesita su propia contrarrevisión, no la del WP que protege **(4) el defecto más común no está en la obra, está en la frase que la describe** — formulada por el worker de U194 tras tres vueltas: *«los tres bloqueantes han sido lo mismo — afirmaciones de alcance más anchas que la evidencia — y en los tres casos la implementación era razonable»*. Confirmado en toda la ola: U197 («el carril está cerrado» cuando el carril no existía), U204 (probes que cubren una vía y afirman la propiedad entera), G93 («el censo recorre el árbol» con ocho directorios ciegos), V66 («la misma máquina de estados que un navegador»). Corolario: **la CA no es «funciona», es «funciona Y lo que el reporte afirma es exactamente lo que se probó»** — y eso solo lo caza alguien leyendo con hostilidad. **La formulación operativa, del mismo worker al cerrar**: *«los tests verifican lo implementado, no lo prometido; una revisión que solo ejecuta los tests del worker no lo caza nunca»* — de ahí que la contrarrevisión tenga que **releer el enunciado con la misma hostilidad que el código**, y que el reintento de vectores valga más que el re-run de la suite. Y su corolario amargo, observado dos veces: **la corrección hereda el vicio de lo corregido** — a U194 le pasó *dentro de la frase que arreglaba precisamente eso*. Contramedida barata que él mismo dejó escrita **en el ancla y no solo en el reporte**: «si vuelves a tocar el alcance, comprueba que la frase y el código dicen lo mismo». **(5) medir la mejora contra el juego con el que calibraste no es medirla** — L-H06 declaró 9/12 sobre los casos que la revisión le dio; en un juego independiente eran 7/12 | las cinco con ejemplo sintético en el skill · el BRIEF-plantilla las cita · fixture que muestre el modo de fallo de (1) |
| **L-H07** | **P0** | **`git stash` prohibido en swarm multi-worktree** — la pila de stash es del **repositorio**, no del worktree: dos workers de carriles distintos se cruzaron la obra en ~30 s (incidente real, 2026-07-31; recuperado íntegro, ramas no contaminadas). La regla y sus alternativas (`git show <base>:<ruta>`, copia en scratchpad, worktree desechable) entran en el skill `swarm-orquestacion`, que es donde los workers leen el método | la regla aparece en el skill publicado · el brief-plantilla la incluye · fixture que documente el modo de fallo |
| **L-H04** | P2 | Roles plan/ por referencia; cero copia divergente | check |
| **L-H05** | P2 | Re-plan protocolo tras F2 custodio (descartes) | — |
| **L-H06** ✅ | P1 | **ACEPTADO 2026-08-01** (merge `85f2f92`, 3 rondas · 3 contrarrevisiones). Verificado por el orquestador con **fixtures propias**: `<details><summary>` en una línea → exit 3 con su causa · `deps: las dos anteriores` → exit 1 por `deps-no-declaradas` · `FX-A01, FX-A03 (ambas de la ola 1)` → pasa · flag retirada → exit 2. Suite **104/104** propias y **123/123** con las previas. **Decisión de fondo**: `CA-ornamental` **avisa, no bloquea** — *la calidad de un criterio es juicio, y un gate que rechaza criterios correctos acaba desactivado*. Cerró **ocho envolturas** de invisibilidad con la regla de fence de CommonMark completa (el toggle ingenuo dejaba pasar una tabla oculta **y** velaba un backlog real), **seis vías de `exit 0`** —la peor: una flag desconocida hacía que el gate contestara **sobre otro fichero**, y en CI solo se lee el exit—, y los **falsos rechazos**, que eran el otro filo: de 4/12 criterios legítimos aceptados a 9/12, y luego la prosa en `deps`. **Retiro honesto**: su flag de conectores era código muerto (borrarla dejaba la suite verde) y en vez de hacerla intervenir la quitó y escribió la verdad. Su `casos.json`, verificado por **dos revisores independientes** contra la salida real, es lo que hizo baratas las tres auditorías | fixture inválida falla por CA ornamental o dependencia circular ✓ (ornamental como aviso, por decisión) |
| ~~**L-H06**~~ (histórico) | P1 | **Entregado y devuelto**: la contrarrevisión le coló basura por **6 vías de `exit 0`** y encontró además que **rechaza 8 de 12 CAs legítimos** — incluida la propia doctrina de ceguera del skill (`no queda ninguna referencia al símbolo antiguo en el árbol`) — porque la regla de «CA verificable» se vende como estructural pero opera como **léxico cerrado de ~80 palabras** con fragilidad morfológica (`ejecutar` sí, `ejecuciones` no; `grep` sí, `grepables` no) y se esquiva **con un dígito**. **Decisión del orquestador**: `CA-ornamental` deja de decidir el exit y pasa a **AVISO** (se sigue emitiendo con motivo y cita — su dogfood halló 28 CAs sin comprobación citada, y eso vale) porque *la calidad de un CA es juicio y un gate que rechaza CAs correctos acaba desactivado*. Bloqueantes que sí se cierran: **tercera vía de verde por vacío** (tabla indentada 4 espacios → exit 0, mientras en fence da 3) · `--umbral-valoracion perro` → `NaN` **desactiva la regla en silencio** · **flag desconocida o `--flag=valor` hace que el gate conteste sobre `plan/BACKLOG.md` en vez del fichero pedido** (en CI solo se lee el exit) · falta un **suelo** objetivo (`brief` sin deduplicar tokens). Resiste: `casos.json` exacto 16/16 verificado contra salida real, toda la familia de ciclos, exit 2 bien puesto, ninguna excepción tragada, fence y comentario HTML cerrados, cero cableado a mundo concreto, y **la ceguera medida con patrón ajeno = 0**. Linter de BACKLOG despachable (lane/WP/BRIEF/CA/P/deps/ejes). **Ola 3, despachado 2026-07-31** (`wp/lh06-linter-backlog`, worktree `wt/l-h06`) · **contrarrevisión obligatoria** (gate que concede): backlog vacío o sin filas debe caer ruidosamente, nunca verde por vacío | fixture inválida falla por CA ornamental o dependencia circular |

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

---

## Archivo de ramas (2026-08-01)

Dos worktrees de julio, **ajenos a la sesión swarm**, archivados por orden del
custodio al comprimir el swarm: «los trataremos en el futuro». Los commits
**no se han perdido** — quedan alcanzables por etiqueta anotada, y las
etiquetas están **en el remoto**:

| etiqueta | tip | qué contiene |
| -------- | --- | ------------ |
| `archivo/wp-33-estacion-vigilante-claim` | `be17f70` | estación de vigilante (launcher, claim durable, plantilla) **+ el fix que cerró los agujeros del claim anti-doble-conductor** tras su devolución. Árbol limpio al archivar |
| `archivo/wp-19-salida-dual-nota-frontera` | `a48ce15` | salida dual + nota de frontera local (2 commits) |

Para recuperar: `git checkout -b <rama> archivo/<etiqueta>`.

**Nota sobre lo que NO se archivó, para que nadie lo lea como pérdida**: el
worktree de WP-19 tenía un `plan/ESTACION.md` **sin trackear a propósito** —
su propia doctrina (`DC-15`) dice que es calibración local, no dato público
del plan, y que no autoriza merge. Por diseño no debía versionarse, así que
no se conserva. Sus parámetros vivos eran `INTERVAL=45` y dos `<pendiente>`.
