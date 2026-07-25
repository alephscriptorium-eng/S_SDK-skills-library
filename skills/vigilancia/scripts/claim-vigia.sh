#!/usr/bin/env bash
# claim-vigia.sh — claim DURABLE de estación de vigía (INT-V-10).
#
# Operacionaliza el §10 del contrato de convivencia («Claim en el canal de
# estación antes de emular») como un artefacto durable en OUT_DIR. El
# contrato de método es del skill `swarm-orquestacion`
# (reference/convivencia-multi-orquestador.md §10); aquí solo vive el
# MECANISMO durable, no el contrato. No fusiona skills.
#
# Escribe/lee $OUT_DIR/claim-vigia.json con CINCO campos obligatorios:
#   origen_rol · ts_iso · pid · version_skill · world_root
# más metadatos de lease (lease_seg, expira_iso).
#
# LEASE (contractual): un claim está VIVO si  now < ts + lease_seg.
# El PID es PISTA SECUNDARIA no contractual (misma disciplina que
# comprobar-vivo.sh de estacion-viva): en Git Bash el árbol de procesos
# puede no verificarse aunque el lease siga fresco → manda el lease.
#
# Subcomandos:
#   acquire  (default) — toma el claim si está libre o EXPIRADO; si hay
#                        claim VIVO de OTRO origen → aviso doble-conductor,
#                        exit 17, sin sobrescribir.
#   release            — libera el claim si es NUESTRO (o FORCE=1).
#   status             — imprime estado (vivo/expirado/libre) y sale 0.
#
# Env:
#   OUT_DIR       (obligatorio)  carpeta del claim
#   WORLD_ROOT    (acquire)      raíz vigilada, se graba en el claim
#   ORIGEN        origen/rol del claim (default "vigia"); usar "vigia:<carril>"
#   LEASE         segundos de lease (default 90)
#   VERSION_SKILL etiqueta de versión (default: package.json más cercano)
#   CLAIM_PID     PID a grabar (default $$; el launcher pasa el suyo)
#   FORCE         1 → release ignora la propiedad
#
# Exit: 0 ok · 2 uso · 3 release ajeno sin FORCE · 17 doble-conductor
set -uo pipefail

CMD="${1:-acquire}"
OUT_DIR="${OUT_DIR:-}"
CLAIM_PID="${CLAIM_PID:-$$}"
LEASE="${LEASE:-90}"
ORIGEN="${ORIGEN:-vigia}"

if [ -z "$OUT_DIR" ]; then
  echo "uso: OUT_DIR=<dir> [WORLD_ROOT=<repo>] [ORIGEN=vigia:<carril>] [LEASE=90] $0 {acquire|release|status}" >&2
  exit 2
fi

CLAIM="$OUT_DIR/claim-vigia.json"

# Versión del skill: env → package.json más cercano hacia arriba → desconocida.
derive_version() {
  [ -n "${VERSION_SKILL:-}" ] && { printf '%s' "$VERSION_SKILL"; return; }
  local d v
  d="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
  while [ -n "$d" ] && [ "$d" != "/" ]; do
    if [ -f "$d/package.json" ]; then
      v="$(grep -oE '"version"[[:space:]]*:[[:space:]]*"[^"]+"' "$d/package.json" 2>/dev/null | head -1 | grep -oE '[0-9][^"]*')"
      [ -n "$v" ] && { printf 'vigilancia@%s' "$v"; return; }
    fi
    d="$(dirname "$d")"
  done
  printf 'vigilancia@desconocida'
}

# --- Conversión de tiempo, portable GNU (Git Bash/Linux) + BSD (macOS) ---
ts_to_epoch() {
  local ts="$1" e
  e="$(date -u -d "$ts" +%s 2>/dev/null)" && { printf '%s' "$e"; return 0; }
  e="$(date -u -j -f '%Y-%m-%dT%H:%M:%SZ' "$ts" +%s 2>/dev/null)" && { printf '%s' "$e"; return 0; }
  return 1
}
epoch_to_iso() {
  local e="$1" o
  o="$(date -u -d "@$e" +%Y-%m-%dT%H:%M:%SZ 2>/dev/null)" && { printf '%s' "$o"; return 0; }
  o="$(date -u -r "$e" +%Y-%m-%dT%H:%M:%SZ 2>/dev/null)" && { printf '%s' "$o"; return 0; }
  return 1
}
now_iso() { date -u +%Y-%m-%dT%H:%M:%SZ; }

# Lee un campo string del claim JSON (sin dependencias). $1=campo.
json_get() {
  [ -f "$CLAIM" ] || return 1
  grep -oE "\"$1\"[[:space:]]*:[[:space:]]*\"[^\"]*\"" "$CLAIM" 2>/dev/null \
    | head -1 | sed -E 's/.*:[[:space:]]*"([^"]*)".*/\1/'
}
json_get_num() {
  [ -f "$CLAIM" ] || return 1
  grep -oE "\"$1\"[[:space:]]*:[[:space:]]*[0-9]+" "$CLAIM" 2>/dev/null \
    | head -1 | grep -oE '[0-9]+$'
}

# Estado del claim actual. Deja el veredicto en C_ESTADO
# ("libre"|"expirado"|"vivo") y los campos en C_ORIGEN C_TS C_PID C_VER
# C_WORLD C_LEASE C_EDAD. Se invoca DIRECTAMENTE (no en subshell) para que
# los globales persistan.
C_ESTADO=""; C_ORIGEN=""; C_TS=""; C_PID=""; C_VER=""; C_WORLD=""; C_LEASE=""; C_EDAD=""
claim_estado() {
  C_ORIGEN=""; C_TS=""; C_PID=""; C_VER=""; C_WORLD=""; C_LEASE=""; C_EDAD=""
  if [ ! -f "$CLAIM" ]; then C_ESTADO="libre"; return; fi
  C_ORIGEN="$(json_get origen_rol || true)"
  C_TS="$(json_get ts_iso || true)"
  C_PID="$(json_get_num pid || true)"
  C_VER="$(json_get version_skill || true)"
  C_WORLD="$(json_get world_root || true)"
  C_LEASE="$(json_get_num lease_seg || true)"
  [ -z "$C_LEASE" ] && C_LEASE="$LEASE"
  local te now
  te="$(ts_to_epoch "$C_TS" 2>/dev/null || true)"
  if [ -z "$te" ]; then C_ESTADO="expirado"; return; fi   # ts ilegible = no fiable
  now="$(date -u +%s)"
  C_EDAD=$(( now - te ))
  if [ "$C_EDAD" -lt "$C_LEASE" ]; then C_ESTADO="vivo"; else C_ESTADO="expirado"; fi
}

pid_pista() {
  local p="$1"
  if [ -n "$p" ] && [ "$p" != "-" ] && kill -0 "$p" 2>/dev/null; then
    echo pid-activo
  else
    echo pid-no-verificable
  fi
}

escribir_claim() {
  mkdir -p "$OUT_DIR"
  local ts te exp ver tmp
  ts="$(now_iso)"
  te="$(ts_to_epoch "$ts")"
  exp="$(epoch_to_iso $(( te + LEASE )) 2>/dev/null || echo "$ts")"
  ver="$(derive_version)"
  tmp="$(mktemp "$OUT_DIR/.claim.XXXXXX" 2>/dev/null)" || tmp="$CLAIM.tmp"
  cat > "$tmp" <<JSON
{
  "origen_rol": "$ORIGEN",
  "ts_iso": "$ts",
  "pid": $CLAIM_PID,
  "version_skill": "$ver",
  "world_root": "${WORLD_ROOT:-}",
  "lease_seg": $LEASE,
  "expira_iso": "$exp"
}
JSON
  mv -f "$tmp" "$CLAIM"
}

case "$CMD" in
  acquire)
    claim_estado; estado="$C_ESTADO"
    if [ "$estado" = "vivo" ]; then
      # ¿Somos el mismo titular? → renovación idempotente.
      if [ "$C_ORIGEN" = "$ORIGEN" ] && [ "$C_PID" = "$CLAIM_PID" ]; then
        escribir_claim
        echo "claim-vigia: renovado origen='$ORIGEN' pid=$CLAIM_PID lease=${LEASE}s expira=$(json_get expira_iso)"
        exit 0
      fi
      echo "claim-vigia: DOBLE-CONDUCTOR — claim VIVO de otro conductor; NO se toma el carril." >&2
      echo "  claim vivo: origen='$C_ORIGEN' pid=$C_PID edad=${C_EDAD}s/${C_LEASE}s pista=$(pid_pista "$C_PID")" >&2
      echo "  world_root='$C_WORLD' version='$C_VER' claim='$CLAIM'" >&2
      echo "  accion (§10 convivencia): soltar un gorro, no improvisar; registrar anomalía. Reintentar tras expirar el lease o release del titular." >&2
      exit 17
    fi
    prev="libre"
    [ "$estado" = "expirado" ] && [ -f "$CLAIM" ] && prev="reclamado(lease-expirado: origen previo='$C_ORIGEN' edad=${C_EDAD}s)"
    escribir_claim
    echo "claim-vigia: adquirido origen='$ORIGEN' pid=$CLAIM_PID world_root='${WORLD_ROOT:-}' version='$(json_get version_skill)' lease=${LEASE}s expira=$(json_get expira_iso) [$prev]"
    exit 0
    ;;

  release)
    if [ ! -f "$CLAIM" ]; then
      echo "claim-vigia: nada que liberar (sin claim en $OUT_DIR)"
      exit 0
    fi
    claim_estado
    if [ "${FORCE:-0}" = "1" ] || [ "$C_PID" = "$CLAIM_PID" ]; then
      rm -f "$CLAIM"
      echo "claim-vigia: liberado origen='$C_ORIGEN' pid=$C_PID${FORCE:+ (FORCE)}"
      exit 0
    fi
    echo "claim-vigia: NO liberado — el claim es de otro conductor (origen='$C_ORIGEN' pid=$C_PID). Usa FORCE=1 solo con causa." >&2
    exit 3
    ;;

  status)
    claim_estado; estado="$C_ESTADO"
    if [ "$estado" = "libre" ]; then
      echo "claim-vigia: estado=libre claim='$CLAIM'"
    else
      echo "claim-vigia: estado=$estado origen='$C_ORIGEN' pid=$C_PID edad=${C_EDAD}s lease=${C_LEASE}s world_root='$C_WORLD' version='$C_VER' pista=$(pid_pista "$C_PID")"
    fi
    exit 0
    ;;

  *)
    echo "uso: $0 {acquire|release|status}" >&2
    exit 2
    ;;
esac
