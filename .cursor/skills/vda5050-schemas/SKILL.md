---
name: vda5050-schemas
description: VDA5050 json_schemas를 문서화할 때 참고한다.
---

# VDA 5050 Docs 프로젝트 규칙

## 1. 프로젝트 개요

- **목적**: VDA 5050 표준 및 JSON 스키마를 한글/영문 병기하여 제공하는 VitePress 기반 문서 사이트
- **기술 스택**: VitePress, Vue 3, TypeScript
- **공식 기준 문서**: `docs/schemas/*.md`를 포함한 모든 스키마 문서는 반드시 `VDA5050_EN.md`와 `json_schemas/*.schema`를 기준으로 작성하며, 두 공식 자료와 모순되는 임의 요약이나 추정을 넣지 않음

## 2. 문서 작성 규칙 (Markdown)

- **다국어 처리**: 모든 섹션은 `<BilingualSection>` 컴포넌트를 사용하여 한/영 토글이 가능해야 함
  - 각 섹션의 토글은 독립적으로 작동함 (하나를 바꿔도 다른 섹션에 영향 없음)
- **스키마 페이지 필수 구조**: 각 `docs/schemas/*.md` 페이지는 반드시 아래 3개 섹션을 이 순서대로 포함함
  1. `제목 - 번역 토글 - 테이블 형태`
  2. `제목 - 번역 토글 - 스키마 원문`
  3. `제목 - JSON 예시`
- **섹션 제목 작성**: 섹션 제목은 `<BilingualSection>` 외부에 `##`/`###` 마크다운 제목으로 작성함
- **테이블 섹션 규칙**:
  - `.schema` 파일의 구조를 기준으로 최상위 필드와 중첩 객체(예: `responses`)를 표로 작성함
  - 예시 컬럼 형식: `필드 | 타입 | 필수 | 설명`
  - 설명은 요약/의역하지 않고 `.schema`의 `description` 내용을 그대로 사용함
  - `필드 정의` 섹션은 **반드시 마크다운 테이블**이어야 하며, TypeScript 타입 코드 블록으로 대체하지 않음
  - 한글 토글(`#ko`)의 설명은 한글 번역으로 제공하고, 영문 토글(`#en`)은 원문 설명을 유지함
  - 하위 객체/배열 아이템도 별도 소제목과 표로 분리하여 동일 규칙을 적용함
  - 예시(`responses`):

    ```markdown
    ## responses

    | 필드         | 타입    | 필수 | 설명                                                                                                                                    |
    | ------------ | ------- | ---- | --------------------------------------------------------------------------------------------------------------------------------------- |
    | headerId     | integer | ✅   | Header ID of the message. The headerId is defined per topic and incremented by 1 with each sent (but not necessarily received) message. |
    | timestamp    | string  | ✅   | Timestamp (ISO 8601, UTC); YYYY-MM-DDTHH:mm:ss.fffZ (e.g., '2017-04-15T11:40:03.123Z').                                                 |
    | version      | string  | ✅   | Version of the protocol [Major].[Minor].[Patch]                                                                                         |
    | manufacturer | string  | ✅   | Manufacturer of the mobile robot.                                                                                                       |
    | serialNumber | string  | ✅   | Serial number of the mobile robot.                                                                                                      |
    | responses    | array   | ✅   | Array of zone response objects.                                                                                                         |

    ### responses

    | 필드        | 타입   | 필수 | 설명                                                                                                                                                                                                                                                                                                                                                 |
    | ----------- | ------ | ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | requestId   | string | ✅   | Unique per mobile robot identifier within all active requests.                                                                                                                                                                                                                                                                                       |
    | grantType   | enum   | ✅   | Enum {'GRANTED','QUEUED','REVOKED','REJECTED'}. 'GRANTED': fleet control grants request. 'REVOKED': fleet control revokes previously granted request. 'REJECTED': fleet control rejects a request. 'QUEUED': Acknowledge the mobile robot's request to the fleet control, but no permission is given yet. Request was added to some sort of a queue. |
    | leaseExpiry | string | ❌   | Timestamp (ISO 8601, UTC); YYYY-MM-DDTHH:mm:ss.fffZ (e.g., '2017-04-15T11:40:03.123Z').                                                                                                                                                                                                                                                              |
    ```

- **스키마 원문 섹션 규칙**:
  - 대응되는 `json_schemas/*.schema` 원문 전체를 그대로 포함함
  - 축약/재정렬/재작성 금지
  - 번역 토글 동작 시 `description` 필드만 번역하고, 그 외 키/값/구조는 변경하지 않음
- **JSON 예시 섹션 규칙**:
  - 스키마에 부합하는 JSON 예시를 제공함
  - 섹션 구조는 `제목 - JSON 예시`를 따름

## 3. 코드 작성 규칙 (TypeScript & JSON)

- **전문 용어 유지**: 다음 전문 용어들은 한글 번역 시에도 번역하지 않고 원문 그대로 사용함:
  - `Order`, `State`, `Connection`, `Instant Actions`, `Factsheet`, `Visualization`, `Responses`, `Zone Set`
- **스키마 기반 우선**: 타입/설명/필수 여부 판단은 반드시 `json_schemas/*.schema`를 기준으로 함
- **설명 정확성**: 표의 설명 텍스트는 원문 `description`을 요약하지 않고 그대로 사용함
- **원문 보존**: 스키마 원문 블록에서는 `description` 번역 외 다른 필드를 번역하거나 변형하지 않음

## 4. UI/UX 컨벤션

- **토글 버튼**: 코드 블록 좌측 상단에 위치 (VitePress 기본 언어 표시와 겹침 방지)
- **심플함 유지**: 불필요한 패딩, 배경색, 테두리를 지양하고 VitePress 기본 테마와 조화롭게 구성

## 5. 파일 구조

- `docs/schemas/*.md`: 각 JSON 스키마별 상세 페이지
- `docs/.vitepress/theme/components/BilingualSection.vue`: 핵심 다국어 컴포넌트

## 6. 검수 체크리스트

- 각 스키마 페이지의 `필드 정의` 섹션이 테이블인지 확인 (`| 필드 | 타입 | 필수 | 설명 |`)
- `필드 정의` 섹션에 TypeScript 코드 블록(```typescript)이 남아 있지 않은지 확인
- `스키마 원문` 섹션은 원문 구조/키/값을 유지하고 `description`만 번역했는지 확인
