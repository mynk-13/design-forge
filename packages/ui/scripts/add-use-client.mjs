import { existsSync, readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const files = ["dist/index.js", "dist/index.cjs"];

for (const file of files) {
  const filePath = resolve(file);
  if (existsSync(filePath)) {
    writeFileSync(filePath, '"use client";\n' + readFileSync(filePath));
  }
}
