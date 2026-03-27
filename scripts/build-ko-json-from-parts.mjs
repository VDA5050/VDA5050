#!/usr/bin/env node
/**
 * docs/spec/N/bilingual-ko/{prefix}-part-0.ko.md … part-(n-1).ko.md 를 읽어
 * {prefix}.ko.json 배열로 저장한다.
 *
 * 사용법:
 *   node scripts/build-ko-json-from-parts.mjs <dir> <prefix> <count>
 *
 * 예:
 *   node scripts/build-ko-json-from-parts.mjs docs/spec/6/bilingual-ko 6.1 6
 */
import fs from 'fs';
import path from 'path';

const dir = process.argv[2];
const prefix = process.argv[3];
const count = parseInt(process.argv[4], 10);

if (!dir || !prefix || !Number.isFinite(count)) {
  console.error('Usage: node scripts/build-ko-json-from-parts.mjs <dir> <prefix> <count>');
  process.exit(1);
}

const parts = [];
for (let i = 0; i < count; i++) {
  const p = path.join(dir, `${prefix}-part-${i}.ko.md`);
  parts.push(fs.readFileSync(p, 'utf8'));
}
const out = path.join(dir, `${prefix}.ko.json`);
fs.writeFileSync(out, JSON.stringify(parts, null, 2));
console.log('Wrote', out);
