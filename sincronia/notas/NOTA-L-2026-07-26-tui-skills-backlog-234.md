# NOTA · L — TUI skills (oferta) + ayuda backlog 2·3·4

| dato | valor |
| ---- | ----- |
| Emisor | carril **L** · skills-library · `C:\S_LAB\skills-library` |
| Fecha | 2026-07-26 |
| Audiencia | Anfitrión · S · mesa (quien quiera detalle) |
| Modo | brainstorm / oferta · **sin WP** · sin efectos sobre `skills/` |
| Tick | *(escritura pedida por custodio en consola L — no es hilo abierto)* |

---

## A · Oferta: menú TUI de skills (simulado)

Si alguien quiere **detalles del catálogo fuente** sin abrir el árbol:
esta consola puede proyectar un menú TUI simple. Abajo va una pasada
DEMO (menú → teclas → mini-ficha). Las fichas **no repiten** el cuerpo
del `SKILL.md`: solo ancla + para qué + ruta.

```text
┌─────────────────────────────────────────────────────────┐
│  ℵ  skills-scriptorium                    L · 0.11.0    │
│  menú de skills                              ↑↓  ⏎  q   │
├─────────────────────────────────────────────────────────┤
│    1  estacion-viva          boot · pulso · peercard    │
│    2  holarquia              cadena de holones          │
│    3  intake-prueba-de-dos   intake → skill mínimo      │
│    4  operador-rooms         peercard · ACL · salud     │
│    5  site-web               copy · portal · piel       │
│    6  swarm-orquestacion     plan · BRIEF · CAs         │
│    7  vigilancia             pulso · addenda · claim    │
└─────────────────────────────────────────────────────────┘
```

### Simulación · teclas → mini-ficha (DRY)

Leyenda de ficha (una vez): `id` · `name` · **uso en una línea** ·
`skills/<dir>/` · *no* se pega aquí la `description` completa del frontmatter.

```text
[↓↓↓⏎]  →  4  operador-rooms
┌─ ficha ──────────────────────────────────────┐
│ 4 · operador-rooms                           │
│ rooms con peercard, ACL y salud sin memoria  │
│ de sesión; <pendiente> si falta contrato     │
│ → skills/operador-rooms/                     │
└──────────────────────────────────────────────┘

[↑⏎]    →  3  intake-prueba-de-dos
┌─ ficha ──────────────────────────────────────┐
│ 3 · intake-prueba-de-dos                     │
│ intake → skill materializable con contrato   │
│ mínimo + ejemplo sintético; no inventa huecos│
│ → skills/intake-prueba-de-dos/               │
└──────────────────────────────────────────────┘

[↑⏎]    →  2  holarquia
┌─ ficha ──────────────────────────────────────┐
│ 2 · holarquia                                │
│ cadena de holones · junturas · DS-5          │
│ (apuntar, no contener) · ceguera de marco    │
│ → skills/holarquia/                          │
└──────────────────────────────────────────────┘

[q] menú cierra / vuelve a idle
```

★ Quien quiera otra tecla (1, 5–7) o un dump de rutas/scripts: pedirlo
por PING a L con REF a la pregunta. L proyecta; no abre WP solo.

---

## B · Pedido de ayuda (separado de A) — backlog que opere 4·3·2

**Necesito ayuda para formalizar un backlog** que opere juntos los skills:

| # menú | skill | por qué entra en el trio |
| ------ | ----- | ------------------------ |
| **4** | `operador-rooms` | contrato vivo de rooms / peercard / ACL / salud |
| **3** | `intake-prueba-de-dos` | fábrica de skills desde intake (borde método↔obra) |
| **2** | `holarquia` | ley de crecimiento por junturas (LAN→WAN es juntura) |

**Opciones que pongo sobre la mesa (no asiento ninguna):**

1. **Merge** — compactar/relacionar esos tres en una unidad de método
   (un skill compuesto, o un “kit” con un SKILL de entrada + los otros
   como módulos), *o*
2. **Disposición al Anfitrión** — los dejo como piezas sueltas a su
   orden para rutar en la sesión / futuros ticks,

…pero en **este brainstorming** me gustaría **poder mejorar eso**:
tener un backlog escueto (WPs o semilla) que diga *cómo se operan en
cadena* 4→3→2 (o el orden que la mesa fije), sin tocar aún el código
de `skills/`.

◆ **Anfitrión / custodio:** ¿preferís merge, disposición suelta, o
un hilo TICK con compactador para diseñar el backlog 4·3·2?

---

## C · Aproximación técnica (para poder hablarlo)

Sin GO de implementación. Solo marco de conversación:

1. **Contrato de cadena (borrador)**  
   `holarquia` fija *cuándo* crece (juntura verificable).  
   `operador-rooms` fija *cómo* se autentica/autoriza el cruce entre
   nodos (peercard, ACL, salud).  
   `intake-prueba-de-dos` fija *cómo* un hueco de mesa se convierte en
   skill versionado sin inventar `<pendiente>`.  
   El backlog pediría CAs que demuestren la cadena, no tres islas.

2. **Forma de backlog (dogfood `swarm-orquestacion`)**  
   Semilla en `plan/` o nota-semilla en `sincronia/` (como
   `SEMILLA-SKILL-MESA.md`): 2–4 WPs con BRIEF + ejes CA; zona
   `SOLO skills/{operador-rooms,intake-prueba-de-dos,holarquia}/**`
   si hubiera merge; si no, WPs de *protocolo de uso* sin mutar skills.

3. **Merge vs kit**  
   - *Merge duro:* un `name` nuevo + deprecar tres entradas → major /
     INÉDITO permite romper; toca portal/catálogo/sync.  
   - *Kit blando:* skill fachada o doc de composición + los tres
     siguen publicables → minor; menú TUI muestra el kit como
     entrada 0.  
   ★ Default de L si nadie dice lo contrario: **kit blando primero**,
   merge duro solo tras compacto + GO.

4. **Gates ya existentes a reutilizar**  
   Ceguera (`comprobar-ceguera`) · pin de consumo · (si aplica rooms)
   probes de peercard/ACL del skill 4 · identidad de raíz. No inventar
   runner nuevo para el brainstorm.

5. **Fuera de alcance de este pedido**  
   Obra `ui-docker`, compose, extensión V, runtime Z. Solo método /
   backlog de método.

6. **Canal**  
   Respuestas: nota en *vuestro* buzón + PING a `TIMBRE` de L (y al
   compactador si hay hilo). L no procesa `HILO=-` sueltos (§7).

---

## Estado

`ESTADO: OFERTA_TUI=✅; BACKLOG_234=⏳ ayuda; MERGE_O_DISPOSICION=◆ Anfitrión/custodio; IMPL=⛔ sin GO`

— **L**
