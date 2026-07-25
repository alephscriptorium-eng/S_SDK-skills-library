#!/usr/bin/env bash
# probar-estacion-de-vigilante.sh — test reproducible de la composición
# «estación de vigilante»: launcher en 3 modos + claim durable con lease.
# Portable Git Bash (win) + POSIX. exit 0 si todo pasa.
#
# Mundos sintéticos temporales (git init real vs directorio pre-git). Sin
# datos de mundo real.
set -uo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LAUNCHER="$SCRIPT_DIR/estacion-de-vigilante.sh"
CLAIMER="$SCRIPT_DIR/claim-vigia.sh"

fails=0
ok()   { echo "  PASS $*"; }
bad()  { echo "  FAIL $*"; fails=$((fails+1)); }
assert_grep() { # $1 patrón · $2 texto · $3 etiqueta
  if printf '%s' "$2" | grep -qE "$1"; then ok "$3"; else bad "$3 (esperaba /$1/)"; fi
}
assert_ngrep() {
  if printf '%s' "$2" | grep -qE "$1"; then bad "$3 (NO debía aparecer /$1/)"; else ok "$3"; fi
}

TMP="$(mktemp -d 2>/dev/null || echo "${TMPDIR:-/tmp}/estvig.$$")"
mkdir -p "$TMP"
cleanup() { rm -rf "$TMP" 2>/dev/null || true; }
trap cleanup EXIT

echo "== raiz temporal: $TMP =="

mk_git_world() { # $1 nombre → imprime ruta del repo
  local w="$TMP/$1"
  mkdir -p "$w"
  git -C "$w" init -q
  git -C "$w" -c user.email=t@t -c user.name=t commit -q --allow-empty -m init 2>/dev/null || true
  printf '%s' "$w"
}

# =========================================================================
echo "== MODO 1 · mundo git completo (identidad→claim→watcher) =="
W1="$(mk_git_world w1)"
O1="$TMP/out1"
out1="$(cd "$SCRIPT_DIR" && \
  WORLD_ROOT="$W1" CANONICAL_WORLD_ROOT="$W1" \
  READ_ONLY_ROOTS='[]' DOWNSTREAM_PATTERNS='[]' \
  OUT_DIR="$O1" INTERVAL=1 ORIGEN='vigia:carril-obra' SMOKE=1 \
  bash "$LAUNCHER" 2>&1)"; rc1=$?
printf '%s\n' "$out1" | sed 's/^/    /'
assert_grep 'MODO detectado: git-completo' "$out1" "modo git detectado"
assert_grep 'identidad=PASS'               "$out1" "preflight PASS"
assert_grep 'claim=adquirido'              "$out1" "claim adquirido"
assert_grep 'watcher=lanzado'              "$out1" "watcher lanzado"
assert_grep 'SMOKE ok'                      "$out1" "primer tick presente"
[ "$rc1" -eq 0 ] && ok "exit 0" || bad "exit $rc1 (esperaba 0)"
[ -s "$O1/watch.log" ] && ok "watch.log con contenido" || bad "watch.log vacío/ausente"
[ ! -f "$O1/claim-vigia.json" ] && ok "claim liberado al cerrar" || bad "claim no liberado"

# =========================================================================
echo "== INSTANCIACIÓN · la plantilla ESTACION.md.tpl la consume el launcher =="
# Sin editar scripts: se rellena SOLO los paths del bloque «Ejemplo listo»
# de la plantilla y el launcher lo consume tal cual.
REPO_ROOT="$(cd "$SCRIPT_DIR/../../.." && pwd)"
TPL="$SCRIPT_DIR/../reference/plantillas/ESTACION.md.tpl"
WI="$(mk_git_world wi)"; OI="$TMP/out-inst"
ATLAS="$TMP/_atlas"; mkdir -p "$ATLAS"           # raíz read-only real (resoluble)
# Como haría una calibración real, expresar los paths en forma que el
# runtime resuelve (en Windows/Git Bash, mixta vía cygpath; en POSIX, tal cual).
if command -v cygpath >/dev/null 2>&1; then
  WI="$(cygpath -m "$WI")"; OI="$(cygpath -m "$OI")"; ATLAS="$(cygpath -m "$ATLAS")"
fi
blk="$(awk '/### Ejemplo listo/{f=1} f&&/^```bash/{c=1;next} c&&/^```/{exit} c{print}' "$TPL")"
if [ -z "$blk" ]; then bad "no se pudo extraer el bloque de la plantilla"; else
  blk="$(printf '%s\n' "$blk" \
    | sed "s#/c/mundo/repo#$WI#g; s#/c/mundo/_atlas#$ATLAS#g; s#/c/mundo/.vigia#$OI#g")"
  outi="$(cd "$REPO_ROOT" && SMOKE=1 INTERVAL=1 bash -c "$blk" 2>&1)"; rci=$?
  printf '%s\n' "$outi" | sed 's/^/    /'
  assert_grep 'identidad=PASS' "$outi" "plantilla instanciada → preflight PASS"
  assert_grep 'watcher=lanzado' "$outi" "plantilla instanciada → watcher lanzado"
  [ "$rci" -eq 0 ] && ok "instanciación exit 0" || bad "instanciación exit $rci"
fi

# =========================================================================
echo "== MODO 2 · mundo pre-git (LOCK 23 + modo sesión ofrecido) =="
W2="$TMP/w2-pregit"; mkdir -p "$W2"     # SIN git init
O2="$TMP/out2"
out2="$(cd "$SCRIPT_DIR" && \
  WORLD_ROOT="$W2" CANONICAL_WORLD_ROOT="$W2" \
  READ_ONLY_ROOTS='[]' DOWNSTREAM_PATTERNS='[]' \
  OUT_DIR="$O2" INTERVAL=1 SMOKE=1 \
  bash "$LAUNCHER" 2>&1)"; rc2=$?
printf '%s\n' "$out2" | sed 's/^/    /'
assert_grep 'MODO detectado: pre-git'        "$out2" "modo pre-git detectado"
assert_grep 'LOCK-PRE-GIT exit=23'           "$out2" "LOCK 23 reportado (fail-closed)"
assert_grep 'fail-closed INTACTO'            "$out2" "fail-closed declarado intacto"
assert_grep 'OFRECER-MODO-SESION'            "$out2" "modo sesión ofrecido explícito"
assert_grep 'estacion-viva'                  "$out2" "puntero a estacion-viva"
[ "$rc2" -eq 23 ] && ok "exit 23" || bad "exit $rc2 (esperaba 23)"
[ ! -f "$O2/watch.log" ] && ok "sin watch.log (watcher no arrancó)" || bad "watcher arrancó en pre-git"

# =========================================================================
echo "== MODO 3 · claim ya tomado (doble-conductor, sin 2º watcher) =="
W3="$(mk_git_world w3)"
O3="$TMP/out3"; mkdir -p "$O3"
# Sembrar un claim VIVO de OTRO conductor (ts reciente, lease 90s).
now_iso="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
cat > "$O3/claim-vigia.json" <<JSON
{
  "origen_rol": "vigia:otro-conductor",
  "ts_iso": "$now_iso",
  "pid": 999999,
  "version_skill": "vigilancia@sintetico",
  "world_root": "$W3",
  "lease_seg": 90,
  "expira_iso": "$now_iso"
}
JSON
out3="$(cd "$SCRIPT_DIR" && \
  WORLD_ROOT="$W3" CANONICAL_WORLD_ROOT="$W3" \
  READ_ONLY_ROOTS='[]' DOWNSTREAM_PATTERNS='[]' \
  OUT_DIR="$O3" INTERVAL=1 ORIGEN='vigia:carril-obra' SMOKE=1 \
  bash "$LAUNCHER" 2>&1)"; rc3=$?
printf '%s\n' "$out3" | sed 's/^/    /'
assert_grep 'identidad=PASS'    "$out3" "preflight PASS (mundo git)"
assert_grep 'DOBLE-CONDUCTOR'   "$out3" "aviso doble-conductor"
assert_ngrep 'watcher=lanzado'  "$out3" "NO se lanzó segundo watcher"
[ "$rc3" -eq 17 ] && ok "exit 17" || bad "exit $rc3 (esperaba 17)"
[ ! -f "$O3/watcher.pid" ] && ok "sin watcher.pid (no arrancó)" || bad "watcher.pid creado"
# El claim ajeno NO se tocó:
assert_grep '"origen_rol": "vigia:otro-conductor"' "$(cat "$O3/claim-vigia.json")" "claim ajeno intacto"

# =========================================================================
echo "== CLAIM · 5 campos obligatorios =="
O4="$TMP/out4"
outc="$(OUT_DIR="$O4" WORLD_ROOT="$W3" ORIGEN='vigia:carril-obra' LEASE=90 \
  bash "$CLAIMER" acquire 2>&1)"; rcc=$?
printf '%s\n' "$outc" | sed 's/^/    /'
[ "$rcc" -eq 0 ] && ok "acquire exit 0" || bad "acquire exit $rcc"
J="$(cat "$O4/claim-vigia.json")"
for campo in origen_rol ts_iso pid version_skill world_root; do
  assert_grep "\"$campo\"" "$J" "campo $campo presente"
done
assert_grep 'JSON válido' "$(node -e 'JSON.parse(require("fs").readFileSync(process.argv[1],"utf8"));console.log("JSON válido")' "$O4/claim-vigia.json" 2>&1)" "claim-vigia.json parsea como JSON"

# =========================================================================
echo "== CLAIM · lease expira (claim viejo reclamado) =="
O5="$TMP/out5"; mkdir -p "$O5"
cat > "$O5/claim-vigia.json" <<JSON
{
  "origen_rol": "vigia:viejo",
  "ts_iso": "2000-01-01T00:00:00Z",
  "pid": 4242,
  "version_skill": "vigilancia@viejo",
  "world_root": "$W3",
  "lease_seg": 90,
  "expira_iso": "2000-01-01T00:01:30Z"
}
JSON
st="$(OUT_DIR="$O5" bash "$CLAIMER" status 2>&1)"
assert_grep 'estado=expirado' "$st" "claim viejo = expirado"
outl="$(OUT_DIR="$O5" WORLD_ROOT="$W3" ORIGEN='vigia:carril-obra' LEASE=90 \
  bash "$CLAIMER" acquire 2>&1)"; rcl=$?
printf '%s\n' "$outl" | sed 's/^/    /'
[ "$rcl" -eq 0 ] && ok "acquire sobre lease expirado exit 0" || bad "acquire exit $rcl"
assert_grep 'lease-expirado' "$outl" "reclamo de lease expirado anunciado"
assert_grep '"origen_rol": "vigia:carril-obra"' "$(cat "$O5/claim-vigia.json")" "claim reescrito con nuevo origen"

# =========================================================================
echo "== CLAIM · release respeta propiedad =="
O6="$TMP/out6"
OUT_DIR="$O6" WORLD_ROOT="$W3" ORIGEN='vigia:d' CLAIM_PID=111 bash "$CLAIMER" acquire >/dev/null 2>&1
rel_ajeno="$(OUT_DIR="$O6" CLAIM_PID=222 bash "$CLAIMER" release 2>&1)"; rr=$?
assert_grep 'NO liberado' "$rel_ajeno" "release ajeno rechazado"
[ "$rr" -eq 3 ] && ok "release ajeno exit 3" || bad "release ajeno exit $rr"
OUT_DIR="$O6" CLAIM_PID=111 bash "$CLAIMER" release >/dev/null 2>&1
[ ! -f "$O6/claim-vigia.json" ] && ok "release propio libera" || bad "release propio no liberó"

# =========================================================================
echo
if [ "$fails" -eq 0 ]; then
  echo "TODO PASS (estacion-de-vigilante + claim-vigia)"
  exit 0
else
  echo "FALLOS: $fails"
  exit 1
fi
