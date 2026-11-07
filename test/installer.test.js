"use strict";

const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const test = require("node:test");
const { spawnSync } = require("node:child_process");
const { parse } = require("jsonc-parser");
const {
  applyOperations,
  planInstall,
  planUninstall,
  planUpdate,
} = require("../src/installer");

const cliPath = path.join(__dirname, "..", "bin", "framework.js");
const managedFiles = [
  ".opencode/framework/AGENTS.md",
  ".opencode/agents/adaptive-framework/reviewer.md",
  ".opencode/skills/adaptive-framework-workflow/SKILL.md",
];

function temporaryProject() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "opencode-adaptive-framework-"));
}

function cleanup(directory) {
  fs.rmSync(directory, { recursive: true, force: true });
}

function install(directory) {
  const plan = planInstall(directory);
  applyOperations(plan.root, plan.operations);
}

test("la instalación previsualiza sin escribir y después incorpora el proyecto si se confirma", () => {
  const project = temporaryProject();
  try {
    const preview = planInstall(project);
    assert.ok(preview.operations.length > 0);
    assert.equal(fs.existsSync(path.join(project, ".opencode")), false);

    applyOperations(preview.root, preview.operations);
    for (const relative of [...managedFiles, ".opencode/opencode.jsonc", ".opencode/framework/manifest.json"]) {
      assert.equal(fs.existsSync(path.join(project, relative)), true, relative);
    }
    assert.equal(fs.existsSync(path.join(project, "AGENTS.md")), false);

    const reinstall = planInstall(project);
    assert.deepEqual(reinstall.operations, []);
    assert.match(reinstall.message, /actualizado/);
  } finally {
    cleanup(project);
  }
});

test("la instalación combina JSONC sin descartar ajustes ni comentarios existentes", () => {
  const project = temporaryProject();
  try {
    const configPath = path.join(project, ".opencode", "opencode.jsonc");
    fs.mkdirSync(path.dirname(configPath), { recursive: true });
    const initial = `{
  // Conservar este ajuste y comentario del proyecto.
  "model": "provider/model",
  "instructions": ["CONTRIBUTING.md"],
  "permissions": [{ "action": "read", "resource": "*", "effect": "allow" }]
}
`;
    fs.writeFileSync(configPath, initial);

    install(project);
    const updated = fs.readFileSync(configPath, "utf8");
    assert.match(updated, /Conservar este ajuste y comentario del proyecto/);
    assert.match(updated, /"model": "provider\/model"/);
    assert.match(updated, /"CONTRIBUTING\.md"/);
    assert.match(updated, /\.opencode\/framework\/AGENTS\.md/);
    assert.deepEqual(planUpdate(project).operations.map((operation) => operation.type).filter((type) => type !== "unchanged"), []);
  } finally {
    cleanup(project);
  }
});

test("la instalación rechaza una colisión con una ruta no gestionada antes de escribir", () => {
  const project = temporaryProject();
  try {
    const collision = path.join(project, managedFiles[0]);
    fs.mkdirSync(path.dirname(collision), { recursive: true });
    fs.writeFileSync(collision, "user-owned");

    assert.throws(() => planInstall(project), /Conflicto de instalación/);
    assert.equal(fs.existsSync(path.join(project, ".opencode/opencode.jsonc")), false);
  } finally {
    cleanup(project);
  }
});

test("los errores de configuración JSONC se muestran en castellano y no escriben archivos", () => {
  const project = temporaryProject();
  try {
    const configPath = path.join(project, ".opencode", "opencode.jsonc");
    fs.mkdirSync(path.dirname(configPath), { recursive: true });
    fs.writeFileSync(configPath, "{\n  \"model\": \n}\n");

    assert.throws(() => planInstall(project), /El archivo JSONC no es válido.*posición/);
    assert.equal(fs.existsSync(path.join(project, managedFiles[0])), false);
  } finally {
    cleanup(project);
  }
});

test("la actualización se cancela y conserva los archivos gestionados modificados por el usuario", () => {
  const project = temporaryProject();
  try {
    install(project);
    const agentPath = path.join(project, managedFiles[1]);
    fs.appendFileSync(agentPath, "\nUser customization.\n");

    assert.throws(() => planUpdate(project), /Se ha modificado/);
    assert.match(fs.readFileSync(agentPath, "utf8"), /User customization/);
  } finally {
    cleanup(project);
  }
});

test("la actualización renueva la versión instalada y después es idempotente", () => {
  const project = temporaryProject();
  try {
    install(project);
    const manifestPath = path.join(project, ".opencode/framework/manifest.json");
    const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    manifest.frameworkVersion = "0.0.0";
    fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

    const update = planUpdate(project);
    assert.ok(update.operations.some((operation) => operation.type === "update-manifest"));
    applyOperations(update.root, update.operations);

    const updatedManifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
    assert.equal(updatedManifest.frameworkVersion, require("../package.json").version);
    assert.ok(planUpdate(project).operations.every((operation) => operation.type === "unchanged"));
  } finally {
    cleanup(project);
  }
});

test("la desinstalación elimina archivos gestionados intactos y conserva los modificados con un manifiesto", () => {
  const project = temporaryProject();
  try {
    install(project);
    const skillPath = path.join(project, managedFiles[2]);
    fs.appendFileSync(skillPath, "\nUser customization.\n");

    const plan = planUninstall(project);
    assert.ok(plan.preserved.includes(managedFiles[2]));
    applyOperations(plan.root, plan.operations);

    assert.equal(fs.existsSync(path.join(project, managedFiles[0])), false);
    assert.equal(fs.existsSync(path.join(project, managedFiles[1])), false);
    assert.match(fs.readFileSync(skillPath, "utf8"), /User customization/);
    assert.equal(fs.existsSync(path.join(project, ".opencode/framework/manifest.json")), true);
  } finally {
    cleanup(project);
  }
});

test("la desinstalación conserva la configuración de OpenCode preexistente y sus ajustes", () => {
  const project = temporaryProject();
  try {
    const configPath = path.join(project, ".opencode", "opencode.jsonc");
    fs.mkdirSync(path.dirname(configPath), { recursive: true });
    const initial = `{
  // Conservar los comentarios del usuario.
  "model": "provider/model",
  "instructions": ["CONTRIBUTING.md"],
  "permissions": [{ "action": "read", "resource": "*", "effect": "allow" }]
}
`;
    fs.writeFileSync(configPath, initial);
    install(project);

    const plan = planUninstall(project);
    applyOperations(plan.root, plan.operations);

    const result = fs.readFileSync(configPath, "utf8");
    assert.match(result, /Conservar los comentarios del usuario/);
    assert.match(result, /"model": "provider\/model"/);
    assert.match(result, /"CONTRIBUTING\.md"/);
    assert.doesNotMatch(result, /adaptive-framework\/framework\/AGENTS\.md/);
    assert.equal(fs.existsSync(path.join(project, ".opencode/framework/manifest.json")), false);
    const restoredConfig = parse(result);
    assert.equal(restoredConfig.permissions.length, 1);
  } finally {
    cleanup(project);
  }
});

test("la validación previa de operaciones impide atravesar un enlace simbólico", (t) => {
  const project = temporaryProject();
  const external = temporaryProject();
  try {
    const linkPath = path.join(project, ".opencode", "linked");
    fs.mkdirSync(path.dirname(linkPath), { recursive: true });
    try {
      fs.symlinkSync(external, linkPath, "junction");
    } catch (error) {
      if (["EPERM", "EACCES", "UNKNOWN"].includes(error.code)) {
        t.skip(`Symlink creation unavailable: ${error.code}`);
        return;
      }
      throw error;
    }
    const firstPath = path.join(project, ".opencode", "first.txt");
    assert.throws(() => applyOperations(project, [
      { type: "create", path: ".opencode/first.txt", content: Buffer.from("first") },
      { type: "create", path: ".opencode/linked/escape.txt", content: Buffer.from("escape") },
    ]), /enlace simbólico/);
    assert.equal(fs.existsSync(firstPath), false);
    assert.equal(fs.existsSync(path.join(external, "escape.txt")), false);
  } finally {
    cleanup(project);
    cleanup(external);
  }
});

test("la transacción revierte las escrituras anteriores si falla una escritura posterior", () => {
  const project = temporaryProject();
  try {
    assert.throws(() => applyOperations(project, [
      { type: "create", path: ".opencode/first.txt", content: Buffer.from("first") },
      { type: "create", path: ".opencode/second.txt", content: undefined },
    ]), /La operación ha fallado y se han revertido los cambios/);
    assert.equal(fs.existsSync(path.join(project, ".opencode/first.txt")), false);
    assert.equal(fs.existsSync(path.join(project, ".opencode")), false);
  } finally {
    cleanup(project);
  }
});

test("el manifiesto contiene los hashes exactos de los archivos instalados del framework", () => {
  const project = temporaryProject();
  try {
    install(project);
    const manifest = JSON.parse(fs.readFileSync(path.join(project, ".opencode/framework/manifest.json"), "utf8"));
    for (const relative of managedFiles) {
      const expected = crypto.createHash("sha256").update(fs.readFileSync(path.join(project, relative))).digest("hex");
      assert.equal(manifest.files[relative], expected);
    }
    assert.ok(manifest.config.lastWrittenHash);
  } finally {
    cleanup(project);
  }
});

test("las plantillas instaladas exigen el español castellano en interacción y documentación", () => {
  const project = temporaryProject();
  try {
    install(project);
    const instructions = fs.readFileSync(path.join(project, managedFiles[0]), "utf8");
    const reviewer = fs.readFileSync(path.join(project, managedFiles[1]), "utf8");
    const skill = fs.readFileSync(path.join(project, managedFiles[2]), "utf8");

    assert.match(instructions, /español\s+castellano/);
    assert.match(instructions, /documentación/);
    assert.match(reviewer, /Revisa el alcance solicitado/);
    assert.match(skill, /Aplica un rigor proporcional/);
  } finally {
    cleanup(project);
  }
});

test("el CLI previsualiza por defecto y exige --apply para escribir", () => {
  const project = temporaryProject();
  try {
    const preview = spawnSync(process.execPath, [cliPath, "install", "--target", project], {
      encoding: "utf8",
    });
    assert.equal(preview.status, 0, preview.stderr);
    assert.match(preview.stdout, /Solo previsualización/);
    assert.match(preview.stdout, /crear configuración/);
    assert.doesNotMatch(preview.stdout, /create-config|Target:/);
    assert.equal(fs.existsSync(path.join(project, ".opencode")), false);

    const applied = spawnSync(process.execPath, [cliPath, "install", "--target", project, "--apply"], {
      encoding: "utf8",
    });
    assert.equal(applied.status, 0, applied.stderr);
    assert.match(applied.stdout, /Operación completada/);
    assert.equal(fs.existsSync(path.join(project, ".opencode/framework/manifest.json")), true);
  } finally {
    cleanup(project);
  }
});

test("el CLI rechaza la ausencia de destino y las opciones desconocidas", () => {
  const missingTarget = spawnSync(process.execPath, [cliPath, "install"], { encoding: "utf8" });
  assert.notEqual(missingTarget.status, 0);
  assert.match(missingTarget.stderr, /--target es obligatorio/);

  const unknownOption = spawnSync(process.execPath, [cliPath, "install", "--target", os.tmpdir(), "--force"], {
    encoding: "utf8",
  });
  assert.notEqual(unknownOption.status, 0);
  assert.match(unknownOption.stderr, /Opción desconocida/);
});
