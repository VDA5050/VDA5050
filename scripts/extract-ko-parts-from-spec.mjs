#!/usr/bin/env node
/**
 * 단일 <BilingualSection> 블록을 가진 spec md에서 <template #ko> / #en>을 같은 규칙으로 분할해
 * assemble-spec-bilingual-h3.mjs 에 넣을 ko-parts.json 배열을 stdout에 출력한다.
 *
 * 사용법:
 *   node scripts/extract-ko-parts-from-spec.mjs <spec.md> > path/to/out.ko.json
 *
 * 7.1처럼 여러 BilingualSection이 이어진 파일은 지원하지 않는다(첫 번째 #ko/#en 쌍만 사용).
 */
import fs from 'fs';
import { splitSpecEnBody } from './lib/spec-h3-split.mjs';

const specPath = process.argv[2];
if (!specPath) {
  console.error('Usage: node scripts/extract-ko-parts-from-spec.mjs <spec.md>');
  process.exit(1);
}

const full = fs.readFileSync(specPath, 'utf8');
const koMatch = full.match(/<template #ko>\s*<div>\s*([\s\S]*?)\s*<\/div>\s*<\/template>/);
const enMatch = full.match(/<template #en>\s*<div>\s*([\s\S]*?)\s*<\/div>\s*<\/template>/);
if (!koMatch || !enMatch) {
  console.error('Expected one <template #ko> and one <template #en> block.');
  process.exit(1);
}

const koBody = koMatch[1].trim();
const enBody = enMatch[1].trim();
const chunksKo = splitSpecEnBody(koBody);
const chunksEn = splitSpecEnBody(enBody);

if (chunksKo.length !== chunksEn.length) {
  console.error(
    `Split mismatch: ko ${chunksKo.length} chunks, en ${chunksEn.length} chunks`,
  );
  process.exit(1);
}

const parts = chunksKo.map((chunk, i) => {
  const t = chunk.trim();
  if (i === 0) {
    if (/^###[^\n]/.test(t)) return t.replace(/^###[^\n]+\n?/, '').trim();
    return t;
  }
  return t.replace(/^###[^\n]+\n?/, '').trim();
});

process.stdout.write(JSON.stringify(parts, null, 2) + '\n');
