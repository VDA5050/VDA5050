#!/usr/bin/env node
/**
 * spec md에서 <template #en> 본문을 추출해
 * `### X.Y.Z ` 및 `### mobileRobotGeometry`(7.10) 기준으로 분할한 뒤,
 * 각 조각에 대해 (선행 ### 제목은 밖에 둠) BilingualSection으로 감싼 마크다운을 출력한다.
 *
 * 사용법:
 *   node scripts/assemble-spec-bilingual-h3.mjs <spec.md> <ko-parts.json> [out.md]
 *
 * ko-parts.json: 문자열 배열 JSON. 길이는 (en 분할 조각 수)와 같아야 한다.
 * 각 요소는 해당 조각의 **한국어 본문**(선행 ### 줄 없음, part0은 도입만).
 */
import fs from 'fs';
import { splitSpecEnBody } from './lib/spec-h3-split.mjs';

const specPath = process.argv[2];
const koPath = process.argv[3];
const outPath = process.argv[4];

if (!specPath || !koPath) {
  console.error('Usage: node scripts/assemble-spec-bilingual-h3.mjs <spec.md> <ko-parts.json> [out.md]');
  process.exit(1);
}

const full = fs.readFileSync(specPath, 'utf8');
const h2 = full.match(/^##[^\n]+/m);
if (!h2) throw new Error('No ## heading');
const enMatch = full.match(/<template #en>\s*<div>\s*([\s\S]*?)\s*<\/div>\s*<\/template>/);
if (!enMatch) throw new Error('No <template #en> block');
const enBody = enMatch[1].trim();
const chunks = splitSpecEnBody(enBody);
const koParts = JSON.parse(fs.readFileSync(koPath, 'utf8'));
if (koParts.length !== chunks.length) {
  console.error(`Mismatch: en chunks ${chunks.length}, ko parts ${koParts.length}`);
  process.exit(1);
}

function stripHeadingLine(md) {
  return md.replace(/^###[^\n]+\n?/, '').trim();
}

let out = `${h2[0]}\n\n`;

for (let i = 0; i < chunks.length; i++) {
  const chunk = chunks[i].trim();
  const ko = koParts[i].trim();
  const firstLine = chunk.match(/^###[^\n]+/);

  if (i === 0 && !firstLine) {
    out += `<BilingualSection>
  <template #ko>
<div>

${ko}

</div>
  </template>
  <template #en>
<div>

${chunk}

</div>
  </template>
</BilingualSection>

`;
    continue;
  }

  if (!firstLine) {
    throw new Error(`Chunk ${i}: expected ### heading`);
  }

  const heading = firstLine[0];
  const enInner = stripHeadingLine(chunk);
  out += `${heading}

<BilingualSection>
  <template #ko>
<div>

${ko}

</div>
  </template>
  <template #en>
<div>

${enInner}

</div>
  </template>
</BilingualSection>

`;
}

if (outPath) {
  fs.writeFileSync(outPath, out);
  console.log('Wrote', outPath, out.length, 'chars');
} else {
  process.stdout.write(out);
}
