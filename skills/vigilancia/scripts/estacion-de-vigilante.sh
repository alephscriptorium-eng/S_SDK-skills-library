#!/usr/bin/env bash
# estacion-de-vigilante.sh — LAUNCHER de composición canónica (INT-V-02).
#
# ORQUESTA la secuencia completa de arranque de una estación de vigía:
#     preflight identidad (si el mundo es git) → claim → watcher
# INVOCA los componentes; NO los absorbe (DA-S20: componer, no fusionar).
# Cada pieza sigue siendo propiedad de su script:
#   · verificar-identidad-raiz.mjs  (preflight fail-closed, este skill)
#   · claim-vigia.sh                (claim durable, este skill)
#   · watcher.sh                    (pulso canónico, este skill)
#   · ../estacion-viva              (modo sesión/fundación — se INVOCA por
#                                    ruta relativa del espejo, NO se edita)
# Doctrina de cuándo usar el watcher canónico vs el watcher-sesion de
# estacion-viva: reference/ESTACION-DE-VIGILANTE.md.
#
# Env (identidad, obligatorios salvo indicación):
#   WORLD_ROOT CANONICAL_WORLD_ROOT READ_ONLY_ROOTS DOWNSTREAM_PATTERNS OUT_DIR
#   INTERVAL      segundos del watcher (default 45)
#   SIBLING_ROOT  (opcional) root hermano solo-lectura
#   ORIGEN        origen/rol del claim (default "vigia"); usar "vigia:<carril>"
#   LEASE         segundos de lease del claim (default 90)
#   SMOKE         1 → arranca watcher, espera el primer tick y desmonta
#                    (para tests reproducibles); sin SMOKE = estación viva.
#
# Exit: 0 arranque ok · 2 uso · 17 doble-conductor · 23 LOCK (pre-git o
#       identidad; fail-closed propagado)
set -uo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PREFLIGHT="$SCRIPT_DIR/verificar-identidad-raiz.mjs"
CLAIMER="$SCRIPT_DIR/claim-vigia.sh"
WATCHER="$SCRIPT_DIR/watcher.sh"
ESTACION_VIVA="$(cd "$SCRIPT_DIR/../.." && pwd)/estacion-viva"   # espejo relativo

WORLD_ROOT="${WORLD_ROOT:-}"
OUT_DIR="${OUT_DIR:-}"
INTERVAL="${INTERVAL:-45}"
ORIGEN="${ORIGEN:-vigia}"
LEASE="${LEASE:-90}"

if [ -z "$WORLD_ROOT" ] || [ -z "$OUT_DIR" ]; then
  echo "uso: WORLD_ROOT=<repo> CANONICAL_WORLD_ROOT=<repo> READ_ONLY_ROOTS='<json>' DOWNSTREAM_PATTERNS='<json>' OUT_DIR=<salida> [INTERVAL=45] [SIBLING_ROOT=<hermano>] [ORIGEN=vigia:<carril>] $0" >&2
  exit 2
fi

log() { echo "estacion-de-vigilante: $*"; }

# ¿El mundo es un repo git? (git toplevel resoluble)
is_git=0
if git -C "$WORLD_ROOT" rev-parse --show-toplevel >/dev/null 2>&1; then
  is_git=1
fi

# ---------------------------------------------------------------------------
# Fase 1 · Preflight de identidad (detector canónico; fail-closed).
#   El launcher NO reimplementa la identidad: invoca el mismo .mjs que el
#   watcher. Su exit 23 = LOCK es autoridad.
# ---------------------------------------------------------------------------
log "MODO detectado: $([ "$is_git" = 1 ] && echo git-completo || echo pre-git) (WORLD_ROOT=$WORLD_ROOT)"
identity_out="$(node "$PREFLIGHT" 2>&1)"; identity_status=$?
printf '%s\n' "$identity_out" | sed 's/^/  [identidad] /'

if [ "$identity_status" -ne 0 ]; then
  if [ "$is_git" = 0 ]; then
    # ------ MODO pre-git (INT-V-04 lado-identidad) ------
    log "LOCK-PRE-GIT exit=$identity_status (esperado en mundo pre-git; fail-closed INTACTO — el detector no afloja)."
    log "OFRECER-MODO-SESION -> $ESTACION_VIVA (boot de fundación/sesión de estacion-viva)."
    log "  El watcher CANÓNICO de vigilancia NO arranca sin identidad git acreditada."
    log "  Fundación de mundo pre-git = skill estacion-viva (BOOT.md fase 1 'repo o fixture'); ver reference/ESTACION-DE-VIGILANTE.md §pre-git."
    exit 23
  fi
  # ------ MODO git pero identidad no acreditada ------
  log "LOCK-IDENTIDAD exit=$identity_status (mundo git, pero identidad NO acreditada)."
  log "  accion: pedir al custodio un clone de trabajo canónico fuera de las raíces observadas; el vigía no lo crea ni lo elige."
  exit 23
fi
log "identidad=PASS"

# ---------------------------------------------------------------------------
# Fase 2 · Claim durable (INT-V-10). Detecta doble-conductor ANTES del watcher.
# ---------------------------------------------------------------------------
export CLAIM_PID="$$"   # el claim es del launcher, para que el release case
claim_out="$(OUT_DIR="$OUT_DIR" WORLD_ROOT="$WORLD_ROOT" ORIGEN="$ORIGEN" LEASE="$LEASE" \
  bash "$CLAIMER" acquire 2>&1)"; claim_status=$?
printf '%s\n' "$claim_out" | sed 's/^/  [claim] /'

if [ "$claim_status" -eq 17 ]; then
  log "DOBLE-CONDUCTOR: claim vivo de otro conductor; NO se lanza un segundo watcher (§10 convivencia)."
  exit 17
elif [ "$claim_status" -ne 0 ]; then
  log "claim falló (exit $claim_status); no se arranca watcher."
  exit "$claim_status"
fi
CLAIM_OWNED=1
log "claim=adquirido origen='$ORIGEN'"

# Teardown (fuego único): parar el renovador, matar el watcher hijo y
# liberar el claim. Se registra en EXIT/INT/TERM; guardado contra doble
# ejecución (TERM dispara y luego EXIT vuelve a dispararse).
WPID=""; RENEW_PID=""; TEARDOWN_DONE=0
teardown() {
  [ "$TEARDOWN_DONE" = 1 ] && return
  TEARDOWN_DONE=1
  # Parar el renovador PRIMERO para que no re-adquiera tras el release.
  [ -n "$RENEW_PID" ] && kill "$RENEW_PID" 2>/dev/null || true
  [ -n "$WPID" ] && kill "$WPID" 2>/dev/null || true
  if [ "${CLAIM_OWNED:-0}" = 1 ]; then
    OUT_DIR="$OUT_DIR" CLAIM_PID="$$" ORIGEN="$ORIGEN" bash "$CLAIMER" release 2>&1 \
      | sed 's/^/  [claim] /' || true
  fi
}
trap teardown EXIT INT TERM

# ---------------------------------------------------------------------------
# Fase 3 · Watcher CANÓNICO de vigilancia (pulso worktrees/locks/CI).
#   Se elige el watcher canónico —NO el watcher-sesion de estacion-viva—
#   porque el rol es VIGÍA read-only del swarm, no boot de estación viva con
#   materialización de skills. Criterio en reference/ESTACION-DE-VIGILANTE.md.
#   El watcher RE-EJECUTA el preflight (defensa en profundidad).
# ---------------------------------------------------------------------------
export WORLD_ROOT OUT_DIR INTERVAL
bash "$WATCHER" &
WPID=$!
echo "$WPID" > "$OUT_DIR/watcher.pid"
log "watcher=lanzado (canónico vigilancia) pid=$WPID interval=${INTERVAL}s log=$OUT_DIR/watch.log"

# ---------------------------------------------------------------------------
# Heartbeat de renovación del claim (INT-V-10). El claim de un conductor VIVO
# nunca debe expirar: mientras el watcher viva, se refresca su ts con período
# < LEASE (idempotente: mismo origen+pid → renovación). Sin esto, un rival
# haría `acquire` al vencer el lease y arrancaría un segundo watcher.
# ---------------------------------------------------------------------------
RENEW_PERIOD=$(( LEASE / 3 )); [ "$RENEW_PERIOD" -lt 1 ] && RENEW_PERIOD=1
(
  while kill -0 "$WPID" 2>/dev/null; do
    sleep "$RENEW_PERIOD"
    kill -0 "$WPID" 2>/dev/null || break
    OUT_DIR="$OUT_DIR" WORLD_ROOT="$WORLD_ROOT" ORIGEN="$ORIGEN" LEASE="$LEASE" \
      CLAIM_PID="$$" bash "$CLAIMER" acquire >/dev/null 2>&1 || true
  done
) &
RENEW_PID=$!
log "heartbeat=activo pid=$RENEW_PID periodo=${RENEW_PERIOD}s (< lease ${LEASE}s)"

if [ "${SMOKE:-0}" = "1" ]; then
  # Espera acotada al primer tick, luego desmonta (trap libera claim + mata watcher).
  for _ in $(seq 1 50); do
    [ -s "$OUT_DIR/watch.log" ] && break
    sleep 0.2
  done
  if [ -s "$OUT_DIR/watch.log" ]; then
    log "SMOKE ok: primer tick presente en watch.log; desmontando."
    exit 0
  fi
  log "SMOKE: el watcher no produjo tick a tiempo." >&2
  exit 1
fi

# Estación viva: bloquear en el watcher hasta INT/TERM (trap libera el claim).
wait "$WPID"
