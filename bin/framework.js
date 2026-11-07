#!/usr/bin/env node
"use strict";

const path = require("node:path");
const {
  applyOperations,
  describePlan,
  planInstall,
  planUninstall,
  planUpdate,
} = require("../src/installer");

const HELP = `Framework adaptativo para OpenCode

Uso:
  opencode-adaptive-framework <install|update|uninstall> --target <directorio-del-proyecto> [--apply]

Sin --apply, el comando solo muestra una previsualización de los cambios.
--apply autoriza expresamente la aplicación de las operaciones mostradas.
El CLI nunca modifica la configuración global de OpenCode.

Comandos:
  install     Incorpora el proyecto de destino al framework
  update      Actualiza los archivos instalados previamente por el framework
  uninstall   Elimina del destino los archivos del framework que no hayan cambiado
`;

function parseArguments(argv) {
  if (argv.includes("--help") || argv.includes("-h")) return { help: true };
  const command = argv[0];
  if (!["install", "update", "uninstall"].includes(command)) {
    throw new Error("Elige un comando: install, update o uninstall.");
  }
  let target;
  let apply = false;
  for (let index = 1; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--target") {
      if (target || !argv[index + 1] || argv[index + 1].startsWith("--")) {
        throw new Error("--target requiere exactamente un directorio.");
      }
      target = argv[index + 1];
      index += 1;
    } else if (argument === "--apply") {
      if (apply) throw new Error("--apply solo se puede indicar una vez.");
      apply = true;
    } else {
      throw new Error(`Opción desconocida: ${argument}`);
    }
  }
  if (!target) throw new Error("--target es obligatorio.");
  return { command, target: path.resolve(target), apply };
}

function run(argv) {
  const options = parseArguments(argv);
  if (options.help) {
    process.stdout.write(HELP);
    return 0;
  }
  const planner = {
    install: planInstall,
    update: planUpdate,
    uninstall: planUninstall,
  }[options.command];
  const plan = planner(options.target);
  process.stdout.write(`${describePlan(plan)}\n`);
  if (!options.apply) {
    process.stdout.write("\nSolo previsualización. Vuelve a ejecutar el comando con --apply para aplicar estos cambios.\n");
    return 0;
  }
  applyOperations(plan.root, plan.operations);
  process.stdout.write("\nOperación completada.\n");
  if (plan.preserved && plan.preserved.length) {
    process.stdout.write("Los siguientes elementos se han conservado y requieren atención:\n");
    for (const item of plan.preserved) process.stdout.write(`  ${item}\n`);
  }
  return 0;
}

if (require.main === module) {
  try {
    process.exitCode = run(process.argv.slice(2));
  } catch (error) {
    process.stderr.write(`Error: ${error.message}\n`);
    process.exitCode = 1;
  }
}

module.exports = { parseArguments, run };
