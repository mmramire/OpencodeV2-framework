"use strict";

const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const {
  applyEdits,
  modify,
  parse,
} = require("jsonc-parser");

const FORMAT_VERSION = 1;
const CONFIG_PATH = ".opencode/opencode.jsonc";
const MANIFEST_PATH = ".opencode/framework/manifest.json";
const CONFIG_TEMPLATE_PATH = path.join(
  __dirname,
  "..",
  "templates",
  "project",
  ".opencode",
  "opencode.jsonc",
);
const TEMPLATE_ROOT = path.join(__dirname, "..", "templates", "project", ".opencode");
const MANAGED_PATHS = new Set([
  ".opencode/framework/AGENTS.md",
  ".opencode/agents/adaptive-framework/reviewer.md",
  ".opencode/skills/adaptive-framework-workflow/SKILL.md",
]);
const JSONC_OPTIONS = {
  formattingOptions: { insertSpaces: true, tabSize: 2, eol: "\n" },
};

function hash(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function stable(value) {
  if (Array.isArray(value)) return value.map(stable);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.keys(value).sort().map((key) => [key, stable(value[key])]),
    );
  }
  return value;
}

function sameValue(left, right) {
  return JSON.stringify(stable(left)) === JSON.stringify(stable(right));
}

function templateFiles() {
  const files = [];
  function walk(directory) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const fullPath = path.join(directory, entry.name);
      if (entry.isSymbolicLink()) {
        throw new Error(`La plantilla contiene un enlace simbólico: ${fullPath}`);
      }
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile()) {
        const relative = path.relative(TEMPLATE_ROOT, fullPath).split(path.sep).join("/");
        if (relative !== "opencode.jsonc") {
          if (!MANAGED_PATHS.has(`.opencode/${relative}`)) {
            throw new Error(`El archivo de plantilla no está en la lista de archivos gestionados: ${relative}`);
          }
          files.push({
            path: `.opencode/${relative}`,
            content: fs.readFileSync(fullPath),
          });
        }
      }
    }
  }
  walk(TEMPLATE_ROOT);
  return files.sort((a, b) => a.path.localeCompare(b.path));
}

function parseJsonc(text, filePath) {
  const errors = [];
  const value = parse(text, errors, { allowTrailingComma: true, disallowComments: false });
  if (errors.length > 0) {
    const positions = errors.map((error) => `posición ${error.offset + 1}`).join(", ");
    throw new Error(`El archivo JSONC no es válido en ${filePath} (${positions})`);
  }
  if (!value || Array.isArray(value) || typeof value !== "object") {
    throw new Error(`La configuración de OpenCode debe contener un objeto JSON: ${filePath}`);
  }
  return value;
}

function editJsonc(text, edits) {
  return edits.reduce(
    (current, edit) => applyEdits(current, modify(current, edit.path, edit.value, edit.options || JSONC_OPTIONS)),
    text,
  );
}

function configContributions() {
  const config = parseJsonc(fs.readFileSync(CONFIG_TEMPLATE_PATH, "utf8"), CONFIG_TEMPLATE_PATH);
  return {
    schema: config.$schema,
    instructions: [...config.instructions],
    permissions: config.permissions.map((rule) => stable(rule)),
  };
}

function inspectTarget(target) {
  let realRoot;
  try {
    realRoot = fs.realpathSync(target);
  } catch (error) {
    throw new Error(`El directorio de destino no existe o no se puede resolver: ${target}`, { cause: error });
  }
  if (!fs.statSync(realRoot).isDirectory()) {
    throw new Error(`El destino no es un directorio: ${target}`);
  }
  return realRoot;
}

function resolveSafePath(root, relativePath) {
  if (typeof relativePath !== "string" || relativePath.length === 0 || path.isAbsolute(relativePath)) {
    throw new Error(`La ruta gestionada no es válida: ${relativePath}`);
  }
  const normalized = relativePath.replace(/\\/g, "/");
  if (normalized.split("/").some((part) => part === ".." || part === "." || part === "")) {
    throw new Error(`La ruta gestionada no es válida: ${relativePath}`);
  }
  const absolute = path.resolve(root, ...normalized.split("/"));
  const fromRoot = path.relative(root, absolute);
  if (!fromRoot || fromRoot === ".." || fromRoot.startsWith(`..${path.sep}`) || path.isAbsolute(fromRoot)) {
    throw new Error(`La ruta gestionada sale del directorio de destino: ${relativePath}`);
  }

  let current = root;
  for (const part of fromRoot.split(path.sep)) {
    current = path.join(current, part);
    try {
      const stat = fs.lstatSync(current);
      if (stat.isSymbolicLink()) {
        throw new Error(`Se rechaza atravesar un enlace simbólico: ${current}`);
      }
      if (current !== absolute && !stat.isDirectory()) {
        throw new Error(`La ruta gestionada tiene un directorio padre que no es un directorio: ${current}`);
      }
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
  }
  return absolute;
}

function readManagedManifest(root) {
  const manifestPath = resolveSafePath(root, MANIFEST_PATH);
  if (!fs.existsSync(manifestPath)) return null;
  let manifest;
  let raw;
  try {
    raw = fs.readFileSync(manifestPath, "utf8");
    manifest = JSON.parse(raw);
  } catch (error) {
    throw new Error(`No se puede leer el manifiesto del framework en ${manifestPath}`, { cause: error });
  }
  if (
    manifest.formatVersion !== FORMAT_VERSION ||
    typeof manifest.frameworkVersion !== "string" ||
    !manifest.files ||
    typeof manifest.files !== "object" ||
    Array.isArray(manifest.files) ||
    !manifest.config ||
    manifest.config.path !== CONFIG_PATH ||
    !Array.isArray(manifest.config.instructionsAdded) ||
    !Array.isArray(manifest.config.permissionsAdded)
  ) {
    throw new Error(`El manifiesto del framework no es válido o no es compatible: ${manifestPath}`);
  }
  for (const filePath of Object.keys(manifest.files)) {
    if (!MANAGED_PATHS.has(filePath) || !/^[a-f0-9]{64}$/.test(manifest.files[filePath])) {
      throw new Error(`El manifiesto contiene un archivo gestionado no compatible o no válido: ${filePath}`);
    }
  }
  Object.defineProperty(manifest, "_raw", { value: raw, enumerable: false });
  return manifest;
}

function configState(root, manifest) {
  const absolute = resolveSafePath(root, CONFIG_PATH);
  const exists = fs.existsSync(absolute);
  const text = exists ? fs.readFileSync(absolute, "utf8") : "{}\n";
  const parsed = parseJsonc(text, absolute);
  if (parsed.instructions !== undefined && !Array.isArray(parsed.instructions)) {
    throw new Error(`El ajuste "instructions" debe ser una lista en ${absolute}`);
  }
  if (parsed.permissions !== undefined && !Array.isArray(parsed.permissions)) {
    throw new Error(`El ajuste "permissions" debe ser una lista en ${absolute}`);
  }
  const instructions = parsed.instructions || [];
  const permissions = parsed.permissions || [];
  const old = manifest && manifest.config;

  if (old) {
    if (old.schemaAdded && parsed.$schema !== old.schema) {
      throw new Error(`Se ha cambiado el valor de $schema gestionado por el framework en ${absolute}`);
    }
    for (const instruction of old.instructionsAdded) {
      if (!instructions.includes(instruction)) {
        throw new Error(`Se ha cambiado o eliminado una referencia a instrucciones gestionada por el framework: ${instruction}`);
      }
    }
    for (const rule of old.permissionsAdded) {
      if (!permissions.some((candidate) => sameValue(candidate, rule))) {
        throw new Error(`Se ha cambiado o eliminado una regla de permisos gestionada por el framework en ${absolute}`);
      }
    }
  }

  return { absolute, exists, text, parsed, instructions, permissions };
}

function addUnique(text, setting, current, desired, added) {
  let result = text;
  const values = [...current];
  for (const item of desired) {
    if (!values.some((value) => sameValue(value, item))) {
      result = editJsonc(result, [{ path: [setting, values.length], value: item, options: { ...JSONC_OPTIONS, isArrayInsertion: true } }]);
      values.push(item);
      added.push(item);
    }
  }
  return result;
}

function removeOwned(text, setting, values, owned) {
  let result = text;
  const remaining = [...values];
  for (const item of owned) {
    const index = remaining.findIndex((value) => sameValue(value, item));
    if (index < 0) continue;
    result = editJsonc(result, [{ path: [setting, index], value: undefined }]);
    remaining.splice(index, 1);
  }
  return result;
}

function configInstallPlan(root, previousManifest) {
  const desired = configContributions();
  const state = configState(root, previousManifest);
  let text = state.text;
  const oldConfig = previousManifest && previousManifest.config;
  let schema = state.parsed.$schema;
  let schemaAdded = Boolean(oldConfig && oldConfig.schemaAdded);
  const instructionsPropertyAdded = oldConfig
    ? Boolean(oldConfig.instructionsPropertyAdded)
    : state.parsed.instructions === undefined;
  const permissionsPropertyAdded = oldConfig
    ? Boolean(oldConfig.permissionsPropertyAdded)
    : state.parsed.permissions === undefined;

  if (oldConfig) {
    text = removeOwned(text, "instructions", state.instructions, oldConfig.instructionsAdded);
    text = removeOwned(text, "permissions", state.permissions, oldConfig.permissionsAdded);
    if (oldConfig.schemaAdded && oldConfig.schema !== desired.schema) {
      text = editJsonc(text, [{ path: ["$schema"], value: undefined }]);
      schema = undefined;
      schemaAdded = false;
    }
  }

  if (schema === undefined) {
    text = editJsonc(text, [{ path: ["$schema"], value: desired.schema }]);
    schema = desired.schema;
    schemaAdded = true;
  }

  const parsed = parseJsonc(text, state.absolute);
  const instructionsAdded = [];
  const permissionsAdded = [];
  text = addUnique(text, "instructions", parsed.instructions || [], desired.instructions, instructionsAdded);
  const afterInstructions = parseJsonc(text, state.absolute);
  text = addUnique(text, "permissions", afterInstructions.permissions || [], desired.permissions, permissionsAdded);

  return {
    path: CONFIG_PATH,
    content: Buffer.from(text),
    config: {
      path: CONFIG_PATH,
      schema,
      schemaAdded,
      instructionsPropertyAdded,
      permissionsPropertyAdded,
      instructionsAdded,
      permissionsAdded,
      createdByFramework: previousManifest
        ? Boolean(oldConfig.createdByFramework)
        : !state.exists,
      lastWrittenHash: hash(text),
    },
    existed: state.exists,
    originalHash: state.exists ? hash(state.text) : null,
    changed: text !== state.text,
  };
}

function packageVersion() {
  return require("../package.json").version;
}

function planInstall(target) {
  const root = inspectTarget(target);
  const manifest = readManagedManifest(root);
  if (manifest) {
    const updatePlan = planUpdate(root);
    if (updatePlan.operations.every((operation) => operation.type === "unchanged")) {
      return { root, operations: [], manifest, message: "El framework ya está instalado y actualizado." };
    }
    throw new Error("El framework ya está instalado; usa el comando update para actualizarlo.");
  }

  const templates = templateFiles();
  const operations = [];
  const files = {};
  for (const template of templates) {
    const destination = resolveSafePath(root, template.path);
    if (fs.existsSync(destination)) {
      throw new Error(`Conflicto de instalación: el destino ya existe y no está gestionado por el framework: ${template.path}`);
    }
    operations.push({ type: "create", path: template.path, content: template.content });
    files[template.path] = hash(template.content);
  }

  const configOperation = configInstallPlan(root, null);
  operations.push({
    type: configOperation.changed ? (configOperation.existed ? "update-config" : "create-config") : "unchanged",
    path: CONFIG_PATH,
    content: configOperation.content,
  });
  const nextManifest = {
    formatVersion: FORMAT_VERSION,
    frameworkVersion: packageVersion(),
    files,
    config: configOperation.config,
  };
  operations.push({
    type: "create-manifest",
    path: MANIFEST_PATH,
    content: Buffer.from(`${JSON.stringify(nextManifest, null, 2)}\n`),
  });
  return { root, operations, manifest: nextManifest };
}

function planUpdate(target) {
  const root = typeof target === "string" ? inspectTarget(target) : target;
  const manifest = readManagedManifest(root);
  if (!manifest) throw new Error("El framework no está instalado; usa el comando install para instalarlo.");

  const templates = templateFiles();
  const nextFiles = {};
  const operations = [];
  const templatePaths = new Set(templates.map((template) => template.path));
  for (const template of templates) {
    const absolute = resolveSafePath(root, template.path);
    const nextHash = hash(template.content);
    nextFiles[template.path] = nextHash;
    if (!Object.hasOwn(manifest.files, template.path)) {
      if (fs.existsSync(absolute)) {
        throw new Error(`Conflicto al actualizar: ya existe un archivo nuevo del framework que no está gestionado: ${template.path}`);
      }
      operations.push({ type: "create", path: template.path, content: template.content });
      continue;
    }
    if (!fs.existsSync(absolute) || !fs.lstatSync(absolute).isFile()) {
      throw new Error(`Falta un archivo gestionado por el framework o no es un archivo normal: ${template.path}`);
    }
    const currentHash = hash(fs.readFileSync(absolute));
    if (currentHash !== manifest.files[template.path]) {
      throw new Error(`Se ha modificado un archivo gestionado por el framework; se conserva y se cancela la actualización: ${template.path}`);
    }
    operations.push(currentHash === nextHash
      ? { type: "unchanged", path: template.path }
      : { type: "update", path: template.path, content: template.content });
  }
  for (const [filePath, expectedHash] of Object.entries(manifest.files)) {
    if (templatePaths.has(filePath)) continue;
    const absolute = resolveSafePath(root, filePath);
    if (!fs.existsSync(absolute) || !fs.lstatSync(absolute).isFile()) {
      throw new Error(`Falta un archivo retirado del framework o no es un archivo normal: ${filePath}`);
    }
    if (hash(fs.readFileSync(absolute)) !== expectedHash) {
      throw new Error(`Se ha modificado un archivo retirado del framework; se conserva y se cancela la actualización: ${filePath}`);
    }
    operations.push({ type: "delete", path: filePath });
  }

  const configOperation = configInstallPlan(root, manifest);
  operations.push({
    type: configOperation.changed ? (configOperation.existed ? "update-config" : "create-config") : "unchanged",
    path: CONFIG_PATH,
    content: configOperation.content,
  });
  const nextManifest = {
    formatVersion: FORMAT_VERSION,
    frameworkVersion: packageVersion(),
    files: nextFiles,
    config: configOperation.config,
  };
  const manifestContent = Buffer.from(`${JSON.stringify(nextManifest, null, 2)}\n`);
  operations.push({
    type: manifestContent.toString("utf8") === manifest._raw ? "unchanged" : "update-manifest",
    path: MANIFEST_PATH,
    content: manifestContent,
  });
  return { root, operations, manifest: nextManifest };
}

function planUninstall(target) {
  const root = inspectTarget(target);
  const manifest = readManagedManifest(root);
  if (!manifest) throw new Error("El framework no está instalado.");

  const operations = [];
  const preserved = [];
  for (const [filePath, expectedHash] of Object.entries(manifest.files)) {
    const absolute = resolveSafePath(root, filePath);
    if (!fs.existsSync(absolute)) continue;
    if (!fs.lstatSync(absolute).isFile()) {
      preserved.push(filePath);
      continue;
    }
    if (hash(fs.readFileSync(absolute)) !== expectedHash) {
      preserved.push(filePath);
      continue;
    }
    operations.push({ type: "delete", path: filePath });
  }

  const configStateValue = configState(root, null);
  let configText = configStateValue.text;
  const config = manifest.config;
  const configParsed = parseJsonc(configText, configStateValue.absolute);
  if (config.schemaAdded && configParsed.$schema === config.schema) {
    configText = editJsonc(configText, [{ path: ["$schema"], value: undefined }]);
  } else if (config.schemaAdded) {
    preserved.push(`${CONFIG_PATH} (se ha cambiado $schema)`);
  }
  const parsedAfterSchema = parseJsonc(configText, configStateValue.absolute);
  const instructions = parsedAfterSchema.instructions || [];
  const permissions = parsedAfterSchema.permissions || [];
  const removableInstructions = config.instructionsAdded.filter((value) => instructions.includes(value));
  const removablePermissions = config.permissionsAdded.filter((value) =>
    permissions.some((candidate) => sameValue(candidate, value)),
  );
  const modifiedPermissionRules = config.permissionsAdded.filter((owned) =>
    !permissions.some((candidate) => sameValue(candidate, owned)) &&
    permissions.some((candidate) => candidate.action === owned.action && candidate.resource === owned.resource),
  );
  if (modifiedPermissionRules.length) {
    preserved.push(`${CONFIG_PATH} (las entradas del framework se han cambiado o ya no están)`);
  }
  configText = removeOwned(configText, "instructions", instructions, removableInstructions);
  const parsedAfterInstructions = parseJsonc(configText, configStateValue.absolute);
  configText = removeOwned(configText, "permissions", parsedAfterInstructions.permissions || [], removablePermissions);
  const parsedAfterPermissions = parseJsonc(configText, configStateValue.absolute);
  if (config.instructionsPropertyAdded && Array.isArray(parsedAfterPermissions.instructions) && parsedAfterPermissions.instructions.length === 0) {
    configText = editJsonc(configText, [{ path: ["instructions"], value: undefined }]);
  }
  const parsedBeforePermissionCleanup = parseJsonc(configText, configStateValue.absolute);
  if (config.permissionsPropertyAdded && Array.isArray(parsedBeforePermissionCleanup.permissions) && parsedBeforePermissionCleanup.permissions.length === 0) {
    configText = editJsonc(configText, [{ path: ["permissions"], value: undefined }]);
  }
  const finalConfig = parseJsonc(configText, configStateValue.absolute);
  const semanticallyEmpty = Object.keys(finalConfig).length === 0;
  const currentConfigHash = configStateValue.exists ? hash(configStateValue.text) : null;
  const canDeleteConfig = config.createdByFramework &&
    semanticallyEmpty &&
    currentConfigHash === config.lastWrittenHash;
  if (canDeleteConfig) {
    operations.push({ type: "delete", path: CONFIG_PATH });
  } else if (configStateValue.exists && configText !== configStateValue.text) {
    operations.push({ type: "update-config", path: CONFIG_PATH, content: Buffer.from(configText) });
  }

  if (preserved.length > 0) {
    const remaining = {};
    for (const filePath of preserved) {
      if (manifest.files[filePath]) remaining[filePath] = manifest.files[filePath];
    }
    const configHasResidual = preserved.some((item) => item.startsWith(`${CONFIG_PATH} `));
    if (Object.keys(remaining).length > 0 || configHasResidual) {
      const nextManifest = {
        formatVersion: manifest.formatVersion,
        frameworkVersion: manifest.frameworkVersion,
        files: remaining,
        config: {
          ...config,
          instructionsAdded: [],
          permissionsAdded: configHasResidual ? config.permissionsAdded : [],
          schemaAdded: configHasResidual && configParsed.$schema !== config.schema,
        },
      };
      operations.push({
        type: "update-manifest",
        path: MANIFEST_PATH,
        content: Buffer.from(`${JSON.stringify(nextManifest, null, 2)}\n`),
      });
    } else {
      operations.push({ type: "delete", path: MANIFEST_PATH });
    }
  } else {
    operations.push({ type: "delete", path: MANIFEST_PATH });
  }
  return { root, operations, preserved };
}

function ensureSafeParents(root, relativePath) {
  const absolute = resolveSafePath(root, relativePath);
  const parent = path.dirname(absolute);
  const relativeParent = path.relative(root, parent);
  let current = root;
  if (relativeParent) {
    for (const part of relativeParent.split(path.sep)) {
      current = path.join(current, part);
      if (fs.existsSync(current) && fs.lstatSync(current).isSymbolicLink()) {
        throw new Error(`Se rechaza escribir a través de un enlace simbólico: ${current}`);
      }
    }
  }
  return absolute;
}

function applyOperations(root, operations) {
  const actionable = operations.filter((operation) => operation.type !== "unchanged");
  if (actionable.length === 0) return;
  for (const operation of actionable) {
    const absolute = ensureSafeParents(root, operation.path);
    const exists = fs.existsSync(absolute);
    if (exists && !fs.lstatSync(absolute).isFile()) {
      throw new Error(`El destino gestionado no es un archivo normal: ${operation.path}`);
    }
    if (["create", "create-config", "create-manifest"].includes(operation.type) && exists) {
      throw new Error(`El destino gestionado apareció después de la validación previa: ${operation.path}`);
    }
    if (["update", "update-config", "update-manifest"].includes(operation.type) && !exists) {
      throw new Error(`El destino gestionado desapareció después de la validación previa: ${operation.path}`);
    }
  }
  const backups = [];
  const createdDirectories = new Set();
  const cleanupErrors = [];
  try {
    for (const operation of actionable) {
      const absolute = ensureSafeParents(root, operation.path);
      let directory = path.dirname(absolute);
      const missing = [];
      while (directory !== root && !fs.existsSync(directory)) {
        missing.push(directory);
        directory = path.dirname(directory);
      }
      for (const item of missing.reverse()) {
        fs.mkdirSync(item);
        createdDirectories.add(item);
      }
      const exists = fs.existsSync(absolute);
      backups.push({
        absolute,
        existed: exists,
        content: exists && fs.lstatSync(absolute).isFile() ? fs.readFileSync(absolute) : null,
      });
      if (operation.type === "delete") {
        if (exists) fs.unlinkSync(absolute);
      } else {
        const temporary = path.join(
          path.dirname(absolute),
          `.${path.basename(absolute)}.${process.pid}.${crypto.randomBytes(6).toString("hex")}.tmp`,
        );
        try {
          fs.writeFileSync(temporary, operation.content, { flag: "wx" });
          fs.renameSync(temporary, absolute);
        } catch (error) {
          try {
            if (fs.existsSync(temporary)) fs.unlinkSync(temporary);
          } catch (cleanupError) {
            cleanupErrors.push(`${temporary}: ${cleanupError.message}`);
          }
          throw error;
        }
      }
    }
  } catch (error) {
    const rollbackErrors = [...cleanupErrors];
    for (const backup of backups.reverse()) {
      try {
        if (backup.existed) fs.writeFileSync(backup.absolute, backup.content);
        else if (fs.existsSync(backup.absolute)) fs.unlinkSync(backup.absolute);
      } catch (rollbackError) {
        rollbackErrors.push(`${backup.absolute}: ${rollbackError.message}`);
      }
    }
    for (const directory of [...createdDirectories].sort((a, b) => b.length - a.length)) {
      try {
        fs.rmdirSync(directory);
      } catch (cleanupError) {
        if (cleanupError.code !== "ENOENT") rollbackErrors.push(`${directory}: ${cleanupError.message}`);
      }
    }
    if (rollbackErrors.length) {
      throw new Error(`La operación ha fallado: ${error.message}. También ha fallado la reversión: ${rollbackErrors.join("; ")}`, { cause: error });
    }
    throw new Error(`La operación ha fallado y se han revertido los cambios: ${error.message}`, { cause: error });
  }
}

function describePlan(plan) {
  const lines = [`Destino: ${plan.root}`];
  const operationLabels = {
    create: "crear",
    "create-config": "crear configuración",
    "create-manifest": "crear manifiesto",
    delete: "eliminar",
    "update-config": "actualizar configuración",
    "update-manifest": "actualizar manifiesto",
    update: "actualizar",
  };
  if (plan.message) lines.push(plan.message);
  for (const operation of plan.operations) {
    if (operation.type === "unchanged") continue;
    lines.push(`${(operationLabels[operation.type] || operation.type).padEnd(24)} ${operation.path}`);
  }
  if (plan.preserved && plan.preserved.length) {
    lines.push("Elementos conservados (modificados o propiedad del usuario):");
    for (const item of plan.preserved) lines.push(`  ${item}`);
  }
  if (plan.operations.every((operation) => operation.type === "unchanged")) lines.push("No se requieren cambios.");
  return lines.join("\n");
}

module.exports = {
  applyOperations,
  describePlan,
  planInstall,
  planUninstall,
  planUpdate,
};
