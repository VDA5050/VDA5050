/**
 * Removes one level of 4 leading ASCII spaces from each line inside
 * <template #ko> / <template #en> blocks in docs/spec/*.md
 * so CommonMark does not treat prose as indented code blocks (<pre><code>).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const specRoot = path.join(repoRoot, "docs", "spec");

function walkMdFiles(dir, out = []) {
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, name.name);
    if (name.isDirectory()) walkMdFiles(p, out);
    else if (name.name.endsWith(".md")) out.push(p);
  }
  return out;
}

function stripOneIndentInTemplates(content) {
  return content.replace(
    /<template\s+#(ko|en)>\r?\n([\s\S]*?)\r?\n\s*<\/template>/g,
    (_full, slot, body) => {
      const stripped = body
        .split(/\r?\n/)
        .map((line) => (line.startsWith("    ") ? line.slice(4) : line))
        .join("\n");
      return `<template #${slot}>\n${stripped}\n  </template>`;
    },
  );
}

function main() {
  const files = walkMdFiles(specRoot);
  let changedCount = 0;
  for (const filePath of files) {
    const before = fs.readFileSync(filePath, "utf8");
    const after = stripOneIndentInTemplates(before);
    if (after !== before) {
      fs.writeFileSync(filePath, after, "utf8");
      changedCount++;
      console.log(path.relative(repoRoot, filePath));
    }
  }
  console.log(`Done. Updated ${changedCount} file(s).`);
}

main();
