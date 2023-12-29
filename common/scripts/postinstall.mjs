import fs from "node:fs";
import path from "path";
import { fileURLToPath } from "node:url";
// import { spawnSync } from "node:child_process";
import { readTypesFolders } from "./readFolder.mjs";

console.log("Copy all modules @types to the node_modules/@type/common folder\n");
const __filename = fileURLToPath(import.meta.url);
const libPath = path.resolve(path.dirname(__filename), "..");

const nodeModTypesLibPath = path.resolve(process.env.INIT_CWD, "node_modules/@types/common");

if (fs.existsSync(nodeModTypesLibPath)) {
  fs.rmSync(nodeModTypesLibPath);
}
fs.mkdirSync(nodeModTypesLibPath);

fs.copyFileSync(path.join(libPath, "@types/package.json"), path.join(nodeModTypesLibPath, "package.json"));

const sourceFolderPath = path.join(libPath, "src");
console.log(`Search @types in ${sourceFolderPath}`);
const listFiles = await readTypesFolders(sourceFolderPath);
console.log("listFiles", listFiles);
let concatContent = "";
const sep = "\n";

for (let i = 0, l = listFiles.length; i < l; i++) {
  const b = fs.readFileSync(listFiles[i], { encoding: "utf-8" });
  concatContent += sep + b;
}

const destFilePath = path.join(nodeModTypesLibPath, "index.d.ts");
fs.writeFileSync(destFilePath, concatContent, { encoding: "utf-8" });

console.log(`Create file ${destFilePath} with all module @types definitions`);
