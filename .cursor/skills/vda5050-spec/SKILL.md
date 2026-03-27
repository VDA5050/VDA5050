---
name: vda5050-spec
description: VDA5050_EN.md → docs/spec 분할·한영 병기 번역. split/strip/wrap 스크립트, BilingualSection·Vue·CommonMark 주의사항을 따른다.
---

# VDA 5050 Spec 문서 (`docs/spec`) 작업 규칙

## 1. 목적

- **역할**: 공식 영문 `VDA5050_EN.md`를 단일 원문으로 두고, `scripts/split-vda5050-docs.mjs`로 `docs/spec`에 **구조만** 나눈 뒤, 페이지마다 `<BilingualSection>`으로 **한글(`#ko`) / 영문(`#en`)** 번역을 붙여 VitePress **VDA 5050 Spec**을 완성한다.
- **기술 스택**: VitePress, Vue 3, `docs/.vitepress/theme/components/BilingualSection.vue`
- **기준**: 본문·용어·순서는 `VDA5050_EN.md`를 따르고, 필요 시 `json_schemas`·`docs/schemas`와 교차 확인한다. 임의 요약·추정·재구성을 넣지 않는다.

## 2. 분할 스크립트 (`split-vda5050-docs.mjs`)

1. **입력**: 저장소 루트의 `VDA5050_EN.md`만 사용한다.
2. **실행** (저장소 루트):

   ```bash
   node scripts/split-vda5050-docs.mjs
   ```

3. **동작**:
   - `docs/spec`를 **삭제 후 재생성**한다. 그 안의 번역·`<BilingualSection>` 등 **수동 작업은 보존되지 않는다**. 원문 수정은 `VDA5050_EN.md`에 반영한 뒤 분할하거나, 분할 후 번역·마크업을 **다시 적용**한다.
   - `# 0 Foreword` 이전은 `docs/spec/index.md`, 이후는 장·절 정규식에 따라 `0-foreword.md`, `3/3.1-1.md` 등으로 분할한다.
   - 원문은 **슬라이스만** 하며 요약·재배열하지 않는다.
   - `](./assets/` → GitHub raw URL, 내부 `](#앵커)` → `/spec/...` 보정 등은 스크립트가 출력에만 적용한다.
4. **실패 시**: 필수 대제목·소제목 문자열이 스크립트 정규식과 맞지 않으면 분할이 실패한다. `VDA5050_EN.md`를 업스트림과 맞추거나 스크립트 정규식을 갱신한다.

### 2.1 유지보수용 스크립트 (요약)

| 목적 | 명령 | 설명 |
|------|------|------|
| 들여쓴 코드 블록(`<pre>`) 방지 | `npm run spec:strip-template-indent` | `<template #ko\|en>` 안 각 줄 선두 **ASCII 공백 4칸을 한 번** 제거. 이미 열 0이면 변경 없음. **멱등**. |
| Vue `Element is missing end tag` 방지 | `npm run spec:wrap-template-div` | 슬롯 본문을 **`<div>…</div>`**로 감쌈(목록이 `</template>` 직전에 올 때 등). 이미 `<div>`로 시작하면 건너뜀. **멱등**. |

권장 순서(대량 정리 시): **strip → wrap** (`split`으로 새로 뽑은 직후에는 번역·마크업 재적용 전에 원문만 손댈 때 유용).

**장문 절을 `###` 단위로 나눈 뒤 다시 합치기**: `docs/spec/N/bilingual-ko/{절번호}-part-0.ko.md` … `part-k.ko.md`(각 조각은 **한국어 본문만**, `###` 제목 줄 없음·part0은 도입 단락)를 두고 `node scripts/build-ko-json-from-parts.mjs …`로 `{절번호}.ko.json`을 만든 다음, `node scripts/assemble-spec-bilingual-h3.mjs <기존 spec.md> <ko.json> <출력 spec.md>`로 `<template #en>` 기준 분할과 동일한 순서로 `<BilingualSection>`을 끼워 넣는다. (예: `npm run spec:assemble-6-1`)

**기존 단일 `<BilingualSection>`에서 ko 조각 JSON 뽑기**: `node scripts/extract-ko-parts-from-spec.mjs <spec.md> > …/{절}.ko.json` — `<template #ko>` / `#en>`을 `scripts/lib/spec-h3-split.mjs`와 **동일한** 규칙(`### 7.3.1 …` 형식 + 7.10 전용 `### mobileRobotGeometry`)으로 나눠 assemble에 넣을 배열을 생성한다. `###`가 없는 짧은 절은 조각 1개다.

## 3. VDA 5050 Docs 공통 규칙 (Spec)

### 3.1 다국어·마크업 (`BilingualSection`)

- 문단·표·목록 등 **의미 단위**마다 `<BilingualSection>`을 쓰고, 토글은 **슬롯별로 독립**이다.
- **장문 페이지(6.x·7.x 등)**: 파일 하나를 **한 덩어리 BilingualSection**으로 묶을 필요가 없다. `### 6.1.1 Concept and logic`, `### 6.1.2 Orders and order update`, `#### 6.1.4.1 …`처럼 **소제목(절)마다** `<BilingualSection>`을 나누고, 그 안에 `#ko` / `#en`을 넣는 방식이 번역·검수·diff에 유리하다. 페이지의 큰 제목(`## 6.1 Order`)만 마크다운 **제목으로 컴포넌트 밖**에 두고, 하위 절은 위 패턴으로 처리한다.
- 마크다운 **제목**(`#` … `######`)은 가능하면 컴포넌트 **밖**에 둔다.
- **CommonMark 들여쓴 코드 블록**: 슬롯 안 줄 맨앞 **공백 4칸 이상**이면(빈 줄 뒤 특히) 본문이 `<pre><code>`로 나온다. 본문은 **열 0**부터 쓴다. 목록 이어쓰기는 **4칸이 아니라 2칸** 등으로 맞춘다. 서술이 `<pre>`로 보이면 **들여쓰기**를 먼저 의심한다.
- **Vue 파서**: 마크다운 **목록**이 `</template>` 바로 앞에 오면 `Element is missing end tag`가 날 수 있다. 슬롯 전체를 **`<div>…</div>`**로 감싼다(`wrap` 스크립트 참고).
- **의도한 `<pre>`만**: 실제 코드·로그는 펜스 코드 블록(백틱) 등으로만; 일반 설명이 `<pre>`면 위 두 가지(들여쓰기·div)를 확인한다.

### 3.2 축약·재정렬·재작성 금지

- 영문·구조는 `VDA5050_EN.md` 분할 결과와 **같은 순서·깊이**를 유지한다.
- 표·코드·인용의 **데이터**는 유지하고, 번역은 설명 텍스트에만 적용한다.

### 3.3 전문 용어

- **영문 유지(한글 슬롯 포함)**: 규격 고유명·메시지 타입 — `Order`, `State`, `Connection`, `Instant Actions`, `Factsheet`, `Visualization`, `Responses`, `Zone Set`. MQTT 토픽 세그먼트·JSON 필드명·열거값은 **항상 원문**(`order`, `state`, `visualization`, `connection`, `orderId`, …).
- **쓰지 않음(규격 의미에서)**: Order → 「주문」「순서」로만 치환, State 메시지 → 「상태 메시지」만, Visualization → 「시각화 메시지/목적」만, Zone Set → 「구역 세트」, Responses(메시지) → 「응답」만으로 대체, 토픽 나열 → 「시각화.」「연결.」 등 한글 토픽명.
- **구분**: 일반 단어 *order*(순서)·*response*(응답)·*connection*(연결)과 **Order / Responses / Connection** 메시지를 문맥으로 구분한다. Order *update*는 「Order update」 또는 설명부에 한글 보조를 붙여도 되나 핵심 타입명은 영문 유지.
- **허용 예**: 「`State` 메시지」, 「`Visualization` 메시지」, 「Order를 이행」, 「Zone Set 배포」, 「Instant Action `cancelOrder`」, 「`responses` 토픽」.
- **스키마·표**: `docs/schemas`와 동일 용어·토픽 표기를 맞춘다(§ `vda5050-schemas` SKILL 3절).

### 3.4 정확성·교차 참고

- 수치·버전·URL·RFC 참조는 원문과 일치시킨다.
- 스키마·메시지 정의와 겹치는 절은 `json_schemas`·`docs/schemas`와 용어를 맞춘다.

## 4. 파일·사이트 구조

- **원문**: `VDA5050_EN.md`
- **출력**: `docs/spec/**/*.md`
- **사이드바**: `docs/.vitepress/config.mts`의 `VDA 5050 Spec` 항목과 경로를 맞춘다.

## 5. 검수 체크리스트

- [ ] `split` 후에는 번역·`<BilingualSection>`을 **복구·재적용**했는가?
- [ ] `npm run docs:build`가 통과하는가?
- [ ] 서술 문단이 `<pre><code>`면 **strip**(들여쓰기), 빌드가 `missing end tag`면 **wrap**(div)을 검토했는가?
- [ ] `split` 결과 영문이 `VDA5050_EN.md` 해당 구간과 대응하는가(스크립트 보정 제외)?
- [ ] `#en` 원문·`#ko` 번역·장절 순서·표 구조가 규칙에 맞는가?
- [ ] 전문 용어(§3.3)·토픽·필드명 표기가 스키마·프로젝트 규칙과 충돌하지 않는가?

## 6. 관련 스킬·규칙

- JSON 스키마 문서: `.cursor/skills/vda5050-schemas/SKILL.md`
- 저장소 전역: `.cursor/rules/doc.md`
