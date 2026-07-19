# swarm-orquestacion — activación

Skill de protocolo de swarm (roles + ciclo + cinco ejes de CA).

## Activar en un mundo

1. Instalá el paquete (`npm i @alephscript/skills-scriptorium` desde el
   registry del consumidor, o `npm pack` + install por ruta).
2. Localizá el skill:
   `node_modules/@alephscript/skills-scriptorium/skills/swarm-orquestacion/`
   (o la ruta del checkout hermano).
3. Generá el `plan/` del mundo:

```bash
bash skills/swarm-orquestacion/scripts/montar-plan.sh /ruta/al/mundo
```

4. Pegá en el chat del orquestador el contenido de
   `plan/roles/ORQUESTADOR.md` (ya copiado por el script).
5. Para cada WP: BRIEF + `plan/roles/WORKER.md` en un chat nuevo.

## Ceguera (cara pública)

Antes de publicar o empacar, en la raíz del paquete:

```bash
bash skills/swarm-orquestacion/scripts/comprobar-ceguera.sh
```

Debe salir `ceguera: 0` sobre `skills/swarm-orquestacion/`.

## Qué no va aquí

Datos de sesión de un mundo concreto, histórico de vigilancia, handoffs.
Eso es **instancia** del consumidor (`instancias/` o calibración local), no
método.
