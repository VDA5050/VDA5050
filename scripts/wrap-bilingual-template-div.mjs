/**
 * Wraps each <template #ko|en> body in <div>...</div> so Vue's HTML parser
 * does not mis-parse markdown lists next to </template> ("Element is missing end tag").
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

function wrapBodies(content) {
  return content.replace(
    /<template\s+#(ko|en)>\r?\n([\s\S]*?)\r?\n(\s*)<\/template>/g,
    (full, slot, body, indent) => {
      const trimmed = body.trim();
      if (trimmed.startsWith("<div")) return full;
      return `<template #${slot}>\n<div>\n\n${body}\n\n</div>\n${indent}</template>`;
    },
  );
}

function main() {
  const files = walkMdFiles(specRoot);
  let n = 0;
  for (const filePath of files) {
    const before = fs.readFileSync(filePath, "utf8");
    if (!before.includes("<template #")) continue;
    const after = wrapBodies(before);
    if (after !== before) {
      fs.writeFileSync(filePath, after, "utf8");
      n++;
      console.log(path.relative(repoRoot, filePath));
    }
  }
  console.log(`Done. Updated ${n} file(s).`);
}

main();
