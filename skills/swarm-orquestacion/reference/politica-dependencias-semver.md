# Política de dependencias y gate semver

Contrato para declarar dependencias runtime directas y verificar sus rangos
sin convertir una consulta al registry en requisito del trabajo local.

## Dos gates, dos evidencias

1. **Gate local determinista:** lee dos JSON, valida dependencias directas,
   inventario de imports, allow/deny y sintaxis de rangos. No usa red, no
   resuelve versiones y no instala.
2. **C8 online:** comprueba después que el mínimo o la versión resuelta existe
   en el canal declarado y que una instalación limpia pasa el test de
   integración. Su evidencia se reporta separada; offline es
   `⏳ sin verificar`, nunca un PASS local.

El gate local usa solo built-ins de Node >=22. Por tanto, no añade una
dependencia runtime al paquete ni depende transitivamente de un parser semver.

## Configuración

```json
{
  "defaultPolicy": "exact",
  "policies": {
    "cliente-compatible": "caret-semver",
    "adaptador-estable": "major-band"
  },
  "runtimeImports": [
    "node:fs",
    "cliente-compatible/subpath",
    "adaptador-estable"
  ],
  "allow": ["cliente-compatible", "adaptador-estable"],
  "deny": [],
  "integrationTested": []
}
```

- `runtimeImports` es el inventario auditable de paquetes cargados por el
  runtime. Built-ins `node:*`, imports relativos y absolutos no requieren
  entrada en `dependencies`.
- Cada paquete externo del inventario debe estar en `dependencies` u
  `optionalDependencies`. Estar solo en `devDependencies`, en el lockfile o
  como transitiva falla.
- `allow`, cuando no está vacío, limita los nombres directos permitidos.
  `deny` prevalece siempre.
- `policies` permite excepciones por nombre; el resto usa `defaultPolicy`.

```bash
node skills/swarm-orquestacion/scripts/verificar-dependencias-semver.mjs \
  --package package.json --config dependencias-semver.json
```

## Políticas admitidas

- `exact`: `M.m.p` completo; admite sufijos SemVer de prerelease/build.
- `caret-semver`: exactamente `^M.m.p`.
- `major-band`: exactamente `>=M.m.p <(M+1).0.0`. Conserva un mínimo conocido
  y cierra el rango antes de la major siguiente.

Se rechazan rangos abiertos, `*`, tags (`latest`, `next`), Git/URL, aliases
`npm:`, workspaces y rutas `file:`/`link:`. No se aceptan abreviaturas ni
versiones con ceros iniciales.

Para cualquier mínimo `0.x`, el gate emite `WARNING`: los saltos minor pueden
ser incompatibles. Además exige que el nombre aparezca en
`integrationTested`; sin esa evidencia local el resultado es fallo.

## C8 online, separado

Con el gate local ya verde y un canal disponible:

```bash
npm view <paquete>@<mínimo-o-versión-resuelta> \
  --registry=<registry-declarado> version
npm ci --ignore-scripts
npm test
```

El test debe ejercitar la integración, no limitarse a importar. Una versión
inexistente o una instalación fallida refuta C8 aunque el rango sea
sintácticamente válido. Estos comandos implican red y no forman parte del
script local.

## Probes

`examples/fixture-semver/probes.mjs` crea paquetes efímeros y automatiza:

- verdes de las tres políticas;
- localizadores y rangos inválidos;
- allow/deny;
- dependencia runtime ausente o solo transitiva/dev;
- banda con techo incorrecto;
- warning y evidencia obligatorios para `0.x`;
- casos diseñados para detectar falsos negativos de parsers permisivos.

Los probes no consultan red y eliminan sus temporales al finalizar.
