import fs from "node:fs";
import path from "node:path";

export async function readTypesFolders(sourcePath) {
  const files = [];
  const folder = path.resolve(sourcePath);

  const folderfiles = fs.readdirSync(folder);
  for (const f of folderfiles) {
    const loopPath = path.join(folder, f);

    const stat = fs.statSync(loopPath);
    if (stat.isDirectory()) {
      files.push(...(await readTypesFolders(loopPath)));
    } else {
      if (loopPath.indexOf("@types") > -1) {
        files.push(loopPath);
      }
    }
  }
  return files;
}
