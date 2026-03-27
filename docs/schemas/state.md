# State Schema

<BilingualSection>
  <template #ko>
    모바일 로봇의 현재 State를 플릿 제어 시스템으로 보고하는 메시지 사양입니다.
    위치, 경로 진행, planned/intermediate path, 배터리, 에러, 안전 상태를 포함하며 아래 타입 정의는 공식 스키마의 핵심 구조 요약입니다.
  </template>
  <template #en>
    The message schema to communicate the state of the mobile robot to the fleet control.
    It includes position, order progress, planned/intermediate path, battery, error, and safety data; the type definition below is a summary of the official schema.
  </template>
</BilingualSection>

## 필드 정의

<BilingualSection>
  <template #ko>

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| headerId | integer | ✅ | 메시지의 headerId입니다. headerId는 주제별로 정의되며 전송된(반드시 수신된 것은 아님) 메시지마다 1씩 증가합니다. |
| timestamp | string | ✅ | ISO8601 형식의 타임스탬프(YYYY-MM-DDTHH:mm:ss.fffZ) |
| version | string | ✅ | 프로토콜 버전 [Major].[Minor].[Patch] |
| manufacturer | string | ✅ | 이동로봇 제조사 |
| serialNumber | string | ✅ | 모바일 로봇의 일련번호입니다. |
| maps | array | ❌ | 현재 모바일 로봇에 저장되어 있는 지도 객체의 배열입니다. |
| zoneSets | array | ❌ | 현재 모바일 로봇에 저장되어 있는 zoneSet 객체의 배열입니다. |
| orderId | string | ✅ | 현재 Order 또는 이전에 완료된 Order의 고유 식별입니다. orderId는 새 Order가 수신될 때까지 유지됩니다. 이전 orderId를 사용할 수 없는 경우 빈 문자열("")입니다. |
| orderUpdateId | integer | ✅ | Order update 식별. 모바일 로봇이 Order update를 수락했는지 구분합니다. 이전 orderUpdateId를 사용할 수 없는 경우 0입니다. |
| lastNodeId | string | ✅ | 마지막으로 도달한 노드의 노드 ID 또는 모바일 로봇이 현재 노드에 있는 경우 현재 노드(예: "node7")입니다. lastNodeId를 사용할 수 없는 경우 빈 문자열("")입니다. |
| lastNodeSequenceId | integer | ✅ | 마지막으로 도달한 노드의 순서 ID, 또는 모바일 로봇이 현재 노드에 있는 경우 현재 노드의 순서 ID입니다. lastNodeSequenceId를 사용할 수 없는 경우 0입니다. |
| nodeStates | array | ✅ | Order를 이행하기 위해 통과해야 하는 nodeState-Object의 배열입니다. 유휴 상태이면 목록이 비어 있습니다. |
| edgeStates | array | ✅ | Order를 이행하기 위해 통과해야 하는 edgeState-Object 배열, 유휴 상태인 경우 빈 목록. |
| plannedPath | object | ❌ |  |
| intermediatePath | object | ❌ |  |
| mobileRobotPosition | object | ❌ |  |
| velocity | object | ❌ | 이동로봇 좌표로 표현된 이동로봇의 속도 |
| loads | array | ❌ | 현재 모바일 로봇이 처리하는 하중입니다. 선택 사항: 모바일 로봇이 로드 상태를 확인할 수 없는 경우 어레이를 상태에서 제외하십시오. 모바일 로봇이 로드 상태를 확인할 수 있지만 배열이 비어 있는 경우 모바일 로봇은 언로드된 것으로 간주됩니다. |
| driving | boolean | ✅ | True: 모바일 로봇이 운전 및/또는 회전 중임을 나타냅니다. 모바일 로봇의 다른 움직임(예: 리프트 움직임)은 여기에 포함되지 않습니다. False: 모바일 로봇이 운전도 회전도 하지 않음을 나타냅니다. |
| paused | boolean | ❌ | 참: 모바일 로봇의 물리적 버튼을 누르거나 instantAction으로 인해 모바일 로봇이 현재 일시 중지된 상태입니다. 모바일 로봇이 Order를 재개할 수 있습니다. 거짓: 모바일 로봇이 현재 일시 중지된 상태가 아닙니다. |
| newBaseRequest | boolean | ❌ | 사실: 모바일 로봇이 기지 끝에 거의 도달했으며 새 기지가 전송되지 않으면 속도가 감소합니다. 새로운 기지를 보내기 위해 함대 통제를 위한 트리거 거짓: 기본 업데이트가 필요하지 않습니다. |
| zoneRequests | array | ❌ | 현재 모바일 로봇에서 활성화된 zoneRequest 객체의 배열입니다. 활성 영역 요청이 없으면 빈 배열입니다. |
| edgeRequests | array | ❌ | 현재 모바일 로봇에서 활성화된 edgeRequest 객체의 배열입니다. 활성 엣지 요청이 없으면 빈 배열입니다. |
| distanceSinceLastNode | number | ❌ | lineguided 차량에서 lastNodeId를 지나 주행한 거리를 나타내는 데 사용됩니다. 거리는 미터 단위입니다. |
| actionStates | array | ✅ | 현재 작업과 아직 완료되지 않은 작업의 배열입니다. 여기에는 아직 진행 중인 이전 노드의 작업이 포함될 수 있습니다. 작업이 완료되면 갱신된 State 메시지가 actionStatus가 완료됨으로 설정되고 해당하는 경우 해당 resultDescriptor와 함께 게시됩니다. actionStates는 새 Order가 수신될 때까지 유지됩니다. |
| instantActionStates | array | ✅ | 모바일 로봇이 수신한 모든 Instant Action 상태의 배열입니다. Instant Action을 받지 못한 경우 빈 배열입니다. Instant Action은 재시작하거나 `clearInstantActions`가 실행될 때까지 해당 상태를 유지합니다. |
| zoneActionStates | array | ❌ | 종료 상태이거나 현재 실행 중인 모든 Zone 작업의 배열입니다. 예정된 작업을 공유하는 것은 선택 사항입니다. Zone 작업 상태는 재시작 또는 `clearZoneActions`가 실행될 때까지 State 메시지에 유지됩니다. |
| powerSupply | object | ✅ |  |
| operatingMode | enum | ✅ | 모바일 로봇의 현재 작동 모드입니다. |
| errors | array | ✅ | 오류 객체의 배열. 모바일 로봇의 모든 활성 오류가 목록에 있어야 합니다. 빈 배열은 모바일 로봇에 활성 오류가 없음을 나타냅니다. |
| information | array | ❌ | 정보 객체의 배열. 빈 배열은 모바일 로봇에 정보가 없음을 나타냅니다. 이는 Visualization 또는 디버깅에만 사용해야 하며 차량 제어의 논리에는 사용해서는 안 됩니다. |
| safetyState | object | ✅ |  |

### map

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| mapId | string | ✅ | 모바일 로봇 작업 공간의 정의된 영역을 설명하는 지도의 ID입니다. |
| mapVersion | string | ✅ | 지도의 버전입니다. |
| mapDescriptor | string | ❌ | 사용자가 정의하고 사람이 읽을 수 있는 이름 또는 설명자 |
| mapStatus | enum | ✅ | 현재 모바일 로봇에서 지도 버전을 사용하고 있는지 여부를 나타내는 지도 상태에 대한 정보입니다. 활성화됨: 이 지도가 현재 모바일 로봇에서 활성화/사용되고 있음을 나타냅니다. 동일한 mapId를 가진 최대 하나의 지도는 상태를 활성화로 설정할 수 있습니다.<br>비활성화: 이 지도 버전이 현재 모바일 로봇에서 활성화되어 있지 않으므로 요청에 따라 활성화하거나 삭제할 수 있음을 나타냅니다. |

### zoneSet

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| zoneSetId | string | ✅ | 현재 지도에 대해 활성화된 구역 집합의 고유 식별자입니다.<br> 이 필드는 모바일 로봇에 해당 지도에 대해 정의된 구역이 없는 경우에만 비워 두어야 합니다. |
| mapId | string | ✅ | 해당 지도의 식별자입니다. |
| zoneSetStatus | enum | ✅ | ENABLED: 이 Zone Set이 현재 모바일 로봇에서 활성화/사용되고 있음을 나타냅니다. 각 맵에 대해 최대 하나의 Zone Set 상태가 ENABLED로 설정될 수 있습니다. DISABLED: 이 Zone Set이 현재 모바일 로봇에서 활성화되어 있지 않으므로 차량 제어에 의해 활성화되거나 삭제될 수 있음을 나타냅니다. |

### nodeState

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| nodeId | string | ✅ | 고유한 노드 식별 |
| sequenceId | integer | ✅ | 동일한 nodeId를 가진 여러 노드를 식별하기 위한 시퀀스 ID입니다. |
| nodeDescriptor | string | ❌ | 사용자가 정의하고 사람이 읽을 수 있는 이름 또는 설명자입니다. |
| released | boolean | ✅ | True: 노드가 베이스의 일부임을 나타냅니다. False: 노드가 수평선의 일부임을 나타냅니다. |
| nodePosition | object | ❌ | 노드 위치. 선택 사항: 차량 통제소에 이 정보가 있습니다. 예를 들어 디버깅 목적으로 추가로 보낼 수 있습니다. |

### nodePosition

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| x | number | ✅ |  |
| y | number | ✅ |  |
| theta | number | ❌ |  |
| mapId | string | ✅ |  |

### edgeState

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| edgeId | string | ✅ | 고유한 가장자리 식별 |
| sequenceId | integer | ✅ | 동일한 edgeId를 가진 여러 가장자리를 구별하기 위한 시퀀스 ID |
| edgeDescriptor | string | ❌ | 사용자가 정의하고 사람이 읽을 수 있는 이름 또는 설명자입니다. |
| released | boolean | ✅ | True는 가장자리가 밑면의 일부임을 나타냅니다. False는 가장자리가 수평선의 일부임을 나타냅니다. |
| trajectory | object | ❌ | 레이아웃 내에서 선험적으로 정의되었거나 Order의 일부로 이 edge에 대해 전송된 궤적을 보고합니다. |

### trajectory

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| degree | integer | ❌ | 곡선의 특정 지점에 영향을 미치는 제어점의 수를 정의합니다. 차수가 증가하면 미분성이 증가합니다. 정의되지 않은 경우 기본값은 1입니다. |
| knotVector | array | ❌ | 제어점이 NURBS 곡선에 영향을 미치는 위치와 방법을 결정하는 매개변수 값의 순서입니다. 매듭벡터의 크기는 제어점 수 + 차수 + 1입니다. |
| controlPoints | array | ✅ | 시작점과 끝점을 포함하는 NURBS의 제어점을 정의하는 JSON controlPoint 개체 목록입니다. |

### .controlPoints.items

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| x | number | ✅ |  |
| y | number | ✅ |  |
| weight | number | ❌ | 이 제어점이 곡선을 당기는 데 사용되는 가중치입니다. 정의되지 않은 경우 기본값은 1.0입니다. |

### plannedPath

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| trajectory | object | ✅ |  |
| traversedNodes | array | ❌ | 공유 계획 경로 내에서 탐색되는 현재 실행된 순서로 전달되는 nodeId 배열입니다. |

### intermediatePath

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| polyline | array | ✅ | 폴리라인 세그먼트의 끝점 배열입니다. |

### .polyline.items

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| x | number | ✅ | 프로젝트별 좌표계에 설명된 X 좌표입니다. |
| y | number | ✅ | 프로젝트별 좌표계에 설명된 Y 좌표입니다. |
| theta | number | ❌ | 프로젝트별 좌표계에서 모바일 로봇의 절대 방향입니다. |
| eta | string | ✅ | 예상 도착 시간/통과 시간. 타임스탬프(ISO 8601, UTC)로 형식화됩니다. YYYY-MM-DDTHH:mm:ss.fffZ (예: '2017-04-15T11:40:03.123Z'). |

### mobileRobotPosition

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| x | number | ✅ |  |
| y | number | ✅ |  |
| theta | number | ✅ |  |
| mapId | string | ✅ | 지도의 고유 식별입니다. |
| localized | boolean | ✅ | 사실: 모바일 로봇이 현지화되었습니다. x, y, theta는 신뢰할 수 있습니다. 거짓: 모바일 로봇이 현지화되지 않았습니다. x, y, theta는 신뢰할 수 없습니다. |
| localizationScore | number | ❌ | 위치 파악 품질을 설명하므로 SLAM 모바일 로봇 등에서 현재 위치 정보가 얼마나 정확한지 설명하는 데 사용할 수 있습니다. 0.0: 위치를 알 수 없음 1.0: 알려진 위치 현지화 점수를 추정할 수 없는 차량의 경우 선택 사항입니다. 로깅 및 Visualization 목적으로만 사용 |
| deviationRange | number | ❌ | 위치 편차 범위 값(미터)입니다. 그리드 기반 위치 파악과 같이 편차를 추정할 수 없는 차량의 경우 선택 사항입니다. 로깅 및 Visualization 목적으로만 사용됩니다. |

### velocity

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| vx | number | ❌ | 이동 로봇의 x 방향 속도 |
| vy | number | ❌ | 모바일 로봇의 y 방향 속도 |
| omega | number | ❌ | z축을 중심으로 한 모바일 로봇의 회전 속도입니다. |

### load

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| loadId | string | ❌ | 화물의 고유 식별 번호(예: 바코드 또는 RFID)입니다. 모바일 로봇이 하중을 식별할 수 있지만 아직 하중을 식별하지 못한 경우 빈 필드입니다. 선택사항, 모바일 로봇이 하중을 식별할 수 없는 경우. |
| loadType | string | ❌ | 부하 유형. |
| loadPosition | string | ❌ | 모바일 로봇이 하중을 운반하기 위한 여러 지점/위치를 가지고 있는 경우와 같이 모바일 로봇의 어떤 하중 처리/운반 장치가 사용되는지 나타냅니다. loadPosition이 하나만 있는 차량의 경우 선택 사항입니다. |
| boundingBoxReference | object | ❌ | 경계 상자 위치에 대한 참조 지점입니다. 참조 지점은 항상 경계 상자 바닥 표면의 중심(높이 = 0)이며 모바일 로봇 좌표계의 좌표로 설명됩니다. |
| loadDimensions | object | ❌ | 하중 경계 상자의 크기(미터)입니다. |
| weight | number | ❌ | kg 단위로 측정된 하중의 절대 중량입니다. |

### boundingBoxReference

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| x | number | ✅ |  |
| y | number | ✅ |  |
| z | number | ✅ |  |
| theta | number | ❌ | 하중 경계 상자의 방향입니다. 예인선, 기차 등에 중요합니다. |

### loadDimensions

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| length | number | ✅ | 하중 경계 상자의 절대 길이(모바일 로봇 좌표계의 X축을 따른)(미터)입니다. |
| width | number | ✅ | 로드 경계 상자의 절대 너비(모바일 로봇 좌표계의 y축을 따른)(미터)입니다. |
| height | number | ❌ | 미터 단위의 하중 경계 상자의 절대 높이입니다. 선택사항: 알려진 경우에만 값을 설정하십시오. |

### zoneRequest

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| requestId | string | ✅ | 모든 활성 요청 내에서 모바일 로봇 식별자별로 고유합니다. |
| requestType | enum | ✅ | 요청과 관련된 영역 유형을 지정하는 열거형입니다. 가능한 값은 ACCESS 또는 REPLANNING입니다. |
| zoneId | string | ✅ | 요청이 관련된 Zone을 참조하는 로컬(Zone Set 내) 고유 식별자입니다. |
| zoneSetId | string | ✅ | zoneId는 zoneSet에만 고유하므로 zoneSetId는 요청의 일부입니다. |
| requestStatus | enum | ✅ | 요청을 기술할 때 이는 REQUESTED로 설정됩니다. Fleet Control의 응답 또는 업데이트 후 GRANTED 또는 REVOKED로 설정됩니다. 임대 기간이 만료되면 EXPIRED가 됩니다. |
| trajectory | object | ❌ |  |

### edgeRequest

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| requestId | string | ✅ | 모든 활성 요청에서 모바일 로봇 식별자별로 고유합니다. |
| requestType | enum | ✅ | 요청과 관련된 에지 유형을 지정하는 열거형입니다. |
| edgeId | string | ✅ | 요청과 관련된 에지를 참조하는 전역 고유 식별자입니다. |
| sequenceId | integer | ✅ | Order 내 edge 시퀀스에 대한 추적 번호입니다. Order 내에서 참조된 edge를 고유하게 식별하는 데 필요합니다. |
| requestStatus | enum | ✅ | 요청을 기술할 때 이는 REQUESTED로 설정됩니다. Fleet Control의 응답 또는 업데이트 후 GRANTED 또는 REVOKED로 설정됩니다. 임대 시간이 만료되면 EXPIRED로 설정됩니다. |

### actionState

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| actionId | string | ✅ | 고유한 작업 ID |
| actionType | string | ❌ | 작업의 actionType입니다. 선택 사항: 정보 제공 또는 Visualization 목적으로만 사용됩니다. Order는 유형을 알고 있습니다. |
| actionDescriptor | string | ❌ | 사용자가 정의하고 사람이 읽을 수 있는 이름 또는 설명자입니다. |
| actionStatus | enum | ✅ | WAITING: 트리거를 기다리고 있습니다(모드 통과, 에지 진입). 초기화 중: 작업이 시작되었으며 준비 조치가 시작되었습니다. RUNNING: 작업이 실행 중입니다. RETRIABLE: 실패했지만 재시도할 수 있는 작업입니다. PAUSED: instantAction 또는 외부 트리거에 의해 일시 중지되었습니다. FINISHED: 작업이 완료되었습니다. 실패: 작업을 수행할 수 없습니다. |
| actionResult | string | ❌ | 결과에 대한 설명(예: RFID 판독 결과) 오류는 오류로 전송됩니다. |

### powerSupply

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| stateOfCharge | number | ✅ | 충전 상태(%): 모바일 로봇이 배터리 수준의 양호 또는 불량에 대한 값만 제공하는 경우 20%(불량) 및 80%(양호)로 표시됩니다. |
| batteryVoltage | number | ❌ | 배터리 전압 |
| batteryCurrent | number | ❌ | 배터리 전류(암페어(A)) |
| batteryHealth | number | ❌ | 건강 상태(%)입니다. |
| charging | boolean | ✅ | True: 충전이 진행 중입니다. 거짓: 모바일 로봇이 현재 충전 중이 아닙니다. |
| range | number | ❌ | 현재 충전 상태(미터)를 사용한 예상 도달 거리입니다. |

### error

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| errorType | string | ✅ | 오류 유형, 다음과 같은 사전 정의된 값을 포함하는 확장 가능한 열거형입니다. |
| errorReferences | array | ❌ |  |
| errorDescription | string | ❌ | 오류의 세부 정보와 가능한 원인을 제공하는 자세한 설명입니다. |
| errorDescriptionTranslations | array | ❌ | 오류 설명의 번역 배열입니다. |
| errorHint | string | ❌ | 보고된 오류에 접근하거나 해결하는 방법에 대한 힌트입니다. |
| errorHintTranslations | array | ❌ | 오류 힌트의 번역 배열입니다. |
| errorLevel | enum | ✅ | WARNING: 즉각적인 주의가 필요하지 않습니다. 모바일 로봇은 계속 활성 Order가 있으면 이행하고 Order update나 새 Order를 수락할 수 있습니다. URGENT: 즉각적인 주의가 필요합니다. 모바일 로봇은 계속 활동하고 활성 Order가 있으면 이행하며 Order update나 새 Order를 수락할 수 있습니다. CRITICAL: 즉각적인 주의가 필요합니다. 모바일 로봇은 활성 Order를 계속할 수 없지만 새 Order는 수락할 수 있습니다. FATAL: 사용자 개입이 필요합니다. 모바일 로봇이 활성 Order를 계속하거나 Order update·새 Order를 수락할 수 없습니다. |

### .errorReferences.items

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| referenceKey | string | ✅ | 사용된 참조 유형을 지정합니다(예: nodeId, edgeId, orderId, actionId 등). |
| referenceValue | string | ✅ | 참조 키에 속하는 값입니다. 예를 들어 오류가 발생한 노드의 ID입니다. |

### translation

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| translationKey | string | ✅ | ISO 639-1에 따라 번역 언어를 지정합니다. |
| translationValue | string | ✅ | 번역 키의 언어로 번역합니다. |

### info

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| infoType | string | ✅ | 정보의 유형/이름. |
| infoReferences | array | ❌ |  |
| infoDescriptor | string | ❌ | 사용자가 정의하고 사람이 읽을 수 있는 이름 또는 설명자입니다. |
| infoLevel | enum | ✅ | DEBUG: 디버깅에 사용됩니다. INFO: Visualization에 사용됩니다. |

### .infoReferences.items

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| referenceKey | string | ✅ | 참조 유형(예: headerId, orderId, actionId 등)을 참조합니다. |
| referenceValue | string | ✅ | 참조 키에 속하는 값을 참조합니다. |

### safetyState

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| activeEmergencyStop | enum | ✅ | EmergencyStop 유형: MANUAL: 비상 정지는 모바일 로봇에서 수동으로 인식되어야 합니다. 원격: 시설 비상 정지가 원격으로 승인됩니다. NONE: 비상 정지가 활성화되지 않았습니다. |
| fieldViolation | boolean | ✅ | 보호 필드 위반. True: 필드가 위반되었습니다. False: 필드가 위반되지 않았습니다. |

  </template>
  <template #en>

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| headerId | integer | ✅ | headerId of the message. The headerId is defined per topic and incremented by 1 with each sent (but not necessarily received) message. |
| timestamp | string | ✅ | Timestamp in ISO8601 format (YYYY-MM-DDTHH:mm:ss.fffZ). |
| version | string | ✅ | Version of the protocol [Major].[Minor].[Patch] |
| manufacturer | string | ✅ | Manufacturer of the mobile robot |
| serialNumber | string | ✅ | Serial number of the mobile robot. |
| maps | array | ❌ | Array of map-objects that are currently stored on the mobile robot. |
| zoneSets | array | ❌ | Array of zoneSet objects that are currently stored on the mobile robot. |
| orderId | string | ✅ | Unique order identification of the current order or the previous finished order. The orderId is kept until a new order is received. Empty string ("") if no previous orderId is available.  |
| orderUpdateId | integer | ✅ | Order Update Identification to identify that an order update has been accepted by the mobile robot. 0 if no previous orderUpdateId is available. |
| lastNodeId | string | ✅ | Node ID of last reached node or, if mobile robot is currently on a node, current node (e.g., "node7"). Empty string ("") if no lastNodeId is available. |
| lastNodeSequenceId | integer | ✅ | sequenceId of the last reached node or, if the mobile robot is currently on a node, sequenceId of current node. 0 if no lastNodeSequenceId is available.  |
| nodeStates | array | ✅ | Array of nodeState-Objects, that need to be traversed for fulfilling the order. Empty list if idle. |
| edgeStates | array | ✅ | Array of edgeState-Objects, that need to be traversed for fulfilling the order, empty list if idle. |
| plannedPath | object | ❌ |  |
| intermediatePath | object | ❌ |  |
| mobileRobotPosition | object | ❌ |  |
| velocity | object | ❌ | The mobile robot's velocity in mobile robot coordinates |
| loads | array | ❌ | Loads, that are currently handled by the mobile robot. Optional: If mobile robot cannot determine load state, leave the array out of the state. If the mobile robot can determine the load state, but the array is empty, the mobile robot is considered unloaded. |
| driving | boolean | ✅ | True: indicates that the mobile robot is driving and/or rotating. Other movements of the mobile robot (e.g., lift movements) are not included here. False: indicates that the mobile robot is neither driving nor rotating  |
| paused | boolean | ❌ | True: mobile robot is currently in a paused state, either because of the push of a physical button on the mobile robot or because of an instantAction. The mobile robot can resume the order. False: The mobile robot is currently not in a paused state. |
| newBaseRequest | boolean | ❌ | True: mobile robot is almost at the end of the base and will reduce speed if no new base is transmitted. Trigger for fleet control to send new base False: no base update required. |
| zoneRequests | array | ❌ | Array of zoneRequest objects that are currently active on the mobile robot. Empty array if no zone requests are active. |
| edgeRequests | array | ❌ | Array of edgeRequest objects that are currently active on the mobile robot. Empty array if no edge requests are active. |
| distanceSinceLastNode | number | ❌ | Used by line guided vehicles to indicate the distance it has been driving past the lastNodeId. Distance is in meters. |
| actionStates | array | ✅ | Array of the current actions and the actions which are yet to be finished. This may include actions from previous nodes that are still in progress When an action is completed, an updated state message is published with actionStatus set to finished and if applicable with the corresponding resultDescriptor. The actionStates are kept until a new order is received. |
| instantActionStates | array | ✅ | Array of all instant action states that the mobile robot received. Empty array if the mobile robot has not received any instant actions. Instant actions are kept in the state until restart or action clearInstantActions is executed. |
| zoneActionStates | array | ❌ | Array of all zone actions that are in an end state or are currently running; sharing upcoming actions is optional. Zone action states are kept in the state message until restart or action clearZoneActions is executed. |
| powerSupply | object | ✅ |  |
| operatingMode | enum | ✅ | Current operating mode of the mobile robot. |
| errors | array | ✅ | Array of error-objects. All active errors of the mobile robot should be in the list. An empty array indicates that the mobile robot has no active errors. |
| information | array | ❌ | Array of info-objects. An empty array indicates, that the mobile robot has no information. This should only be used for visualization or debugging – it must not be used for logic in fleet control. |
| safetyState | object | ✅ |  |

### map

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| mapId | string | ✅ | ID of the map describing a defined area of the mobile robot's workspace. |
| mapVersion | string | ✅ | Version of the map. |
| mapDescriptor | string | ❌ | A user-defined, human-readable name or descriptor |
| mapStatus | enum | ✅ | Information on the status of the map indicating, if a map version is currently used on the mobile robot. ENABLED: Indicates this map is currently active / used on the mobile robot. At most one map with the same mapId can have its status set to ENABLED.<br>DISABLED: Indicates this map version is currently not enabled on the mobile robot and thus could be enabled or deleted by request. |

### zoneSet

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| zoneSetId | string | ✅ | Unique identifier of the zone set that is currently enabled for the map.<br> This field shall be left empty only if the mobile robot has no zones defined for the corresponding map. |
| mapId | string | ✅ | Identifier of the corresponding map. |
| zoneSetStatus | enum | ✅ | ENABLED: Indicates this zone set is currently active / used on the mobile robot. At most one zone set for each map can have its status set to ENABLED. DISABLED: Indicates this zone set is currently not enabled on the mobile robot and thus could be enabled or deleted by fleet control. |

### nodeState

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| nodeId | string | ✅ | Unique node identification |
| sequenceId | integer | ✅ | Sequence ID to discern multiple nodes with same nodeId. |
| nodeDescriptor | string | ❌ | A user-defined, human-readable name or descriptor. |
| released | boolean | ✅ | True: indicates that the node is part of the base. False: indicates that the node is part of the horizon. |
| nodePosition | object | ❌ | Node position. Optional: Fleet control has this information. Can be sent additionally, e.g., for debugging purposes.  |

### nodePosition

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| x | number | ✅ |  |
| y | number | ✅ |  |
| theta | number | ❌ |  |
| mapId | string | ✅ |  |

### edgeState

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| edgeId | string | ✅ | Unique edge identification |
| sequenceId | integer | ✅ | Sequence ID to differentiate between multiple edges with the same edgeId |
| edgeDescriptor | string | ❌ | A user-defined, human-readable name or descriptor. |
| released | boolean | ✅ | True indicates that the edge is part of the base. False indicates that the edge is part of the horizon. |
| trajectory | object | ❌ | Reports the trajectory that has been defined a priori within a layout or was sent for this edge as part of the order. |

### trajectory

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| degree | integer | ❌ | Defines the number of control points that influence any given point on the curve. Increasing the degree increases differentiability. If not defined, the default value is 1. |
| knotVector | array | ❌ | Sequence of parameter values that determine where and how the control points affect the NURBS curve. knotVector has size of number of control points + degree + 1. |
| controlPoints | array | ✅ | List of JSON controlPoint objects defining the control points of the NURBS, which includes the beginning and end point. |

### .controlPoints.items

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| x | number | ✅ |  |
| y | number | ✅ |  |
| weight | number | ❌ | The weight, with which this control point pulls on the curve. When not defined, the default will be 1.0. |

### plannedPath

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| trajectory | object | ✅ |  |
| traversedNodes | array | ❌ | Array of nodeIds as communicated in the currently executed order that are traversed within the shared planned path. |

### intermediatePath

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| polyline | array | ✅ | Array of end points of segments of a polyline. |

### .polyline.items

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| x | number | ✅ | X-coordinate described in the project-specific coordinate system. |
| y | number | ✅ | Y-coordinate described in the project-specific coordinate system. |
| theta | number | ❌ | Absolute orientation of the mobile robot in the project-specific coordinate system. |
| eta | string | ✅ | Estimated time of arrival/traversal. Formatted as a timestamp (ISO 8601, UTC); YYYY-MM-DDTHH:mm:ss.fffZ (e.g., '2017-04-15T11:40:03.123Z'). |

### mobileRobotPosition

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| x | number | ✅ |  |
| y | number | ✅ |  |
| theta | number | ✅ |  |
| mapId | string | ✅ | Unique identification of the map. |
| localized | boolean | ✅ | True: mobile robot is localized. x, y, and theta can be trusted. False: mobile robot is not localized. x, y, and theta cannot be trusted. |
| localizationScore | number | ❌ | Describes the quality of the localization and therefore, can be used, e.g., by SLAM mobile robot to describe how accurate the current position information is. 0.0: position unknown 1.0: position known Optional for vehicles that cannot estimate their localization score. Only for logging and visualization purposes |
| deviationRange | number | ❌ | Value for position deviation range in meters. Optional for vehicles that cannot estimate their deviation, e.g., grid-based localization. Only for logging and visualization purposes. |

### velocity

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| vx | number | ❌ | The mobile robot's velocity in its x direction |
| vy | number | ❌ | The mobile robot's velocity in its y direction |
| omega | number | ❌ | The mobile robot's turning speed around its z axis. |

### load

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| loadId | string | ❌ | Unique identification number of the load (e.g., barcode or RFID). Empty field, if the mobile robot can identify the load, but did not identify the load yet. Optional, if the mobile robot cannot identify the load. |
| loadType | string | ❌ | Type of load. |
| loadPosition | string | ❌ | Indicates, which load handling/carrying unit of the mobile robot is used, e.g., in case the mobile robot has multiple spots/positions to carry loads. Optional for vehicles with only one loadPosition. |
| boundingBoxReference | object | ❌ | Point of reference for the location of the bounding box. The point of reference is always the center of the bounding box bottom surface (at height = 0) and is described in coordinates of the mobile robot coordinate system. |
| loadDimensions | object | ❌ | Dimensions of the loads bounding box in meters. |
| weight | number | ❌ | Absolute weight of the load measured in kg. |

### boundingBoxReference

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| x | number | ✅ |  |
| y | number | ✅ |  |
| z | number | ✅ |  |
| theta | number | ❌ | Orientation of the loads bounding box. Important for tugger, trains, etc. |

### loadDimensions

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| length | number | ✅ | Absolute length (along the mobile robot’s coordinate system's x-axis) of the load's bounding box in meters. |
| width | number | ✅ | Absolute width (along the mobile robot’s coordinate system's y-axis) of the load's bounding box in meters. |
| height | number | ❌ | Absolute height of the loads bounding box in meter. Optional: set value only if known. |

### zoneRequest

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| requestId | string | ✅ | Unique per mobile robot identifier within all active requests. |
| requestType | enum | ✅ | Enum specifying the type of zone the request relates to. Feasible values are ACCESS or REPLANNING. |
| zoneId | string | ✅ | Locally (within the zone set) unique identifier referencing the zone the request is related to. |
| zoneSetId | string | ✅ | Due to the zoneId only being unique to a zoneSet, the zoneSetId is part of the request. |
| requestStatus | enum | ✅ | When stating a request, this is set to REQUESTED. After response or update from fleet control set to GRANTED or REVOKED. If lease time expires, shall be to EXPIRED. |
| trajectory | object | ❌ |  |

### edgeRequest

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| requestId | string | ✅ | Unique per mobile robot identifier across all active requests. |
| requestType | enum | ✅ | Enum specifying the type of edge the request relates to. |
| edgeId | string | ✅ | Globally unique identifier referencing the edge the request is related to. |
| sequenceId | integer | ✅ | Tracking number for sequence of edge within order. Required to uniquely identify the referenced edge within the order. |
| requestStatus | enum | ✅ | When stating a request, this is set to REQUESTED. After response or update from fleet control set to GRANTED or REVOKED. If lease time expires set to EXPIRED. |

### actionState

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| actionId | string | ✅ | Unique actionId |
| actionType | string | ❌ | actionType of the action. Optional: Only for informational or visualization purposes. Order knows the type. |
| actionDescriptor | string | ❌ | A user-defined, human-readable name or descriptor. |
| actionStatus | enum | ✅ | WAITING: waiting for the trigger (passing the mode, entering the edge); INITIALIZING: Action was triggered, preparatory measures are initiated; RUNNING: The action is running; RETRIABLE: Actions that failed, but can be retried; PAUSED: paused by instantAction or external trigger; FINISHED: The action is finished; FAILED: action could not be performed. |
| actionResult | string | ❌ | Description of the result, e.g., the result of a RFID-read. Errors will be transmitted in errors. |

### powerSupply

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| stateOfCharge | number | ✅ | State of Charge in %: If mobile robot only provides values for good or bad battery levels, these will be indicated as 20% (bad) and 80% (good). |
| batteryVoltage | number | ❌ | Battery voltage |
| batteryCurrent | number | ❌ | Battery current in Ampere (A) |
| batteryHealth | number | ❌ | State of health in percent. |
| charging | boolean | ✅ | True: charging in progress. False: mobile robot is currently not charging. |
| range | number | ❌ | Estimated reach with current State of Charge in meter. |

### error

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| errorType | string | ✅ | Error type, extensible enumeration including the following predefined values. |
| errorReferences | array | ❌ |  |
| errorDescription | string | ❌ | Verbose description providing details and possible causes of the error. |
| errorDescriptionTranslations | array | ❌ | Array of translations of the error description. |
| errorHint | string | ❌ | Hint on how to approach or solve the reported error. |
| errorHintTranslations | array | ❌ | Array of translations of the error hint. |
| errorLevel | enum | ✅ | WARNING: No immediate attention required, mobile robot is able to continue active and accept new order. URGENT: Immediate attention required, mobile robot is able to continue active and accept new order. CRITICAL: Immediate attention required, mobile robot is unable to continue active order, but can accept new order. FATAL: User intervention is required, mobile robot is unable to continue active or accept new order. |

### .errorReferences.items

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| referenceKey | string | ✅ | Specifies the type of reference used (e.g. nodeId, edgeId, orderId, actionId, etc.). |
| referenceValue | string | ✅ | The value that belongs to the reference key. For example, the id of the node where the error occurred. |

### translation

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| translationKey | string | ✅ | Specifies the language of the translation according to ISO 639-1. |
| translationValue | string | ✅ | Translation in language of translation key. |

### info

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| infoType | string | ✅ | Type/name of information. |
| infoReferences | array | ❌ |  |
| infoDescriptor | string | ❌ | A user-defined, human-readable name or descriptor. |
| infoLevel | enum | ✅ | DEBUG: used for debugging. INFO: used for visualization. |

### .infoReferences.items

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| referenceKey | string | ✅ | References the type of reference (e.g., headerId, orderId, actionId, etc.). |
| referenceValue | string | ✅ | References the value, which belongs to the reference key. |

### safetyState

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| activeEmergencyStop | enum | ✅ | EmergencyStop-Types:  MANUAL: e-stop shall be acknowledged manually at the mobile robot. REMOTE: facility e-stop shall be acknowledged remotely. NONE: no e-stop activated. |
| fieldViolation | boolean | ✅ | Protective field violation. True: field is violated. False: field is not violated. |

  </template>
</BilingualSection>

## 스키마 원문

<BilingualSection>
  <template #ko>

```json
{
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "title": "state",
    "description": "State of the mobile robot.",
    "subtopic": "/state",
    "type": "object",
    "required": [
        "headerId",
        "timestamp",
        "version",
        "manufacturer",
        "serialNumber",
        "orderId",
        "orderUpdateId",
        "lastNodeId",
        "lastNodeSequenceId",
        "nodeStates",
        "edgeStates",
        "driving",
        "actionStates",
        "instantActionStates",
        "powerSupply",
        "operatingMode",
        "errors",
        "safetyState"
    ],
    "properties": {
        "headerId": {
            "type": "integer",
            "description": "headerId of the message. The headerId is defined per topic and incremented by 1 with each sent (but not necessarily received) message."
        },
        "timestamp": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp in ISO8601 format (YYYY-MM-DDTHH:mm:ss.fffZ).",
            "examples": [
                "1991-03-11T11:40:03.123Z"
            ]
        },
        "version": {
            "type": "string",
            "description": "Version of the protocol [Major].[Minor].[Patch]",
            "examples": [
                "1.3.2"
            ]
        },
        "manufacturer": {
            "type": "string",
            "description": "Manufacturer of the mobile robot"
        },
        "serialNumber": {
            "type": "string",
            "description": "Serial number of the mobile robot."
        },
        "maps":{
            "type": "array",
            "description": "Array of map-objects that are currently stored on the mobile robot.",
            "items": {
				"$ref": "#/definitions/map"
			}
        },
        "zoneSets":{
            "type": "array",
            "description": "Array of zoneSet objects that are currently stored on the mobile robot.",
            "items": {
				"$ref": "#/definitions/zoneSet"
			}
        },
        "orderId": {
            "type": "string",
            "description": "Unique order identification of the current order or the previous finished order. The orderId is kept until a new order is received. Empty string (\"\") if no previous orderId is available. "
        },
        "orderUpdateId": {
            "type": "integer",
            "description": "Order Update Identification to identify that an order update has been accepted by the mobile robot. 0 if no previous orderUpdateId is available."
        },
        "lastNodeId": {
            "type": "string",
            "description": "Node ID of last reached node or, if mobile robot is currently on a node, current node (e.g., \"node7\"). Empty string (\"\") if no lastNodeId is available."
        },
        "lastNodeSequenceId": {
            "type": "integer",
            "description": "sequenceId of the last reached node or, if the mobile robot is currently on a node, sequenceId of current node. 0 if no lastNodeSequenceId is available. "
        },
		"nodeStates": {
            "type": "array",
            "description": "Array of nodeState-Objects, that need to be traversed for fulfilling the order. Empty list if idle.",
            "items": {
                "$ref": "#/definitions/nodeState"
            }
        },
        "edgeStates": {
            "type": "array",
            "description": "Array of edgeState-Objects, that need to be traversed for fulfilling the order, empty list if idle.",
            "items": {
				"$ref": "#/definitions/edgeState"
			}
        },
        "plannedPath": {
            "$ref": "#/definitions/plannedPath"
        },
        "intermediatePath": {
            "$ref": "#/definitions/intermediatePath"
        },
        "mobileRobotPosition": {
            "$ref": "#/definitions/mobileRobotPosition"
        },
        "velocity": {
            "type": "object",
            "description": "The mobile robot's velocity in mobile robot coordinates",
            "properties": {
                "vx": {
                    "type": "number",
                    "description":"The mobile robot's velocity in its x direction",
                    "unit": "m/s"
                },
                "vy": {
                    "type": "number",
                    "description":"The mobile robot's velocity in its y direction",
                    "unit": "m/s"
                },
                "omega": {
                    "type": "number",
                    "description":"The mobile robot's turning speed around its z axis.",
                    "unit": "rad/s"
                }
            }
        },
        "loads": {
            "type": "array",
            "description": "Loads, that are currently handled by the mobile robot. Optional: If mobile robot cannot determine load state, leave the array out of the state. If the mobile robot can determine the load state, but the array is empty, the mobile robot is considered unloaded.",
            "items": {
                "$ref": "#/definitions/load"
            }
        },
        "driving": {
            "type": "boolean",
            "description": "True: indicates that the mobile robot is driving and/or rotating. Other movements of the mobile robot (e.g., lift movements) are not included here.\nFalse: indicates that the mobile robot is neither driving nor rotating "
        },
        "paused": {
            "type": "boolean",
            "description": "True: mobile robot is currently in a paused state, either because of the push of a physical button on the mobile robot or because of an instantAction. The mobile robot can resume the order.\nFalse: The mobile robot is currently not in a paused state."
        },
        "newBaseRequest": {
            "type": "boolean",
            "description": "True: mobile robot is almost at the end of the base and will reduce speed if no new base is transmitted. Trigger for fleet control to send new base\nFalse: no base update required."
        },
		"zoneRequests": {
            "description": "Array of zoneRequest objects that are currently active on the mobile robot. Empty array if no zone requests are active.",
            "type": "array",
            "items": {
				"$ref": "#/definitions/zoneRequest"
            }
        },
        "edgeRequests": {
            "description": "Array of edgeRequest objects that are currently active on the mobile robot. Empty array if no edge requests are active.",
            "type": "array",
            "items": {
				"$ref": "#/definitions/edgeRequest"
            }
        },
        "distanceSinceLastNode": {
            "type": "number",
            "description": "Used by line guided vehicles to indicate the distance it has been driving past the lastNodeId. Distance is in meters."
        },
        "actionStates": {
            "type": "array",
            "description": "Array of the current actions and the actions which are yet to be finished. This may include actions from previous nodes that are still in progress\nWhen an action is completed, an updated state message is published with actionStatus set to finished and if applicable with the corresponding resultDescriptor. The actionStates are kept until a new order is received.",
            "items": {
                "$ref": "#/definitions/actionState"
            }
        },
        "instantActionStates": {
            "type": "array",
            "description": "Array of all instant action states that the mobile robot received. Empty array if the mobile robot has not received any instant actions. Instant actions are kept in the state until restart or action clearInstantActions is executed.",
            "items": {
                "$ref": "#/definitions/actionState"
            }
        },
        "zoneActionStates": {
            "type": "array",
            "description": "Array of all zone actions that are in an end state or are currently running; sharing upcoming actions is optional. Zone action states are kept in the state message until restart or action clearZoneActions is executed.",
            "items": {
                "$ref": "#/definitions/actionState"
            }
        },
        "powerSupply": {
            "$ref": "#/definitions/powerSupply"
        },
        "operatingMode": {
            "type": "string",
            "description": "Current operating mode of the mobile robot.",
            "enum": [
                "STARTUP",
                "AUTOMATIC",
                "SEMIAUTOMATIC",
                "INTERVENED",
                "MANUAL",
                "SERVICE",
                "TEACH_IN"
            ]
        },
        "errors": {
            "type": "array",
            "description": "Array of error-objects. All active errors of the mobile robot should be in the list. An empty array indicates that the mobile robot has no active errors.",
            "items": {
				"$ref": "#/definitions/error"
            }
        },
        "information": {
            "type": "array",
            "description": "Array of info-objects. An empty array indicates, that the mobile robot has no information. This should only be used for visualization or debugging – it must not be used for logic in fleet control.",
            "items": {
				"$ref": "#/definitions/info"
            }
        },
        "safetyState": {
            "$ref": "#/definitions/safetyState"
        }
    },
    "definitions": {
		"map": {
			"type": "object",
			"title": "map",
			"required": [
				"mapId",
				"mapVersion",
				"mapStatus"
			],
			"properties": {
				"mapId": {
					"type": "string",
					"description": "ID of the map describing a defined area of the mobile robot's workspace."
				},
				"mapVersion": {
					"type": "string",
					"description": "Version of the map."
				},
				"mapDescriptor": {
					"type": "string",
					"description": "A user-defined, human-readable name or descriptor"
				},
				"mapStatus": {
					"type": "string",
					"description": "Information on the status of the map indicating, if a map version is currently used on the mobile robot. ENABLED: Indicates this map is currently active / used on the mobile robot. At most one map with the same mapId can have its status set to ENABLED.<br>DISABLED: Indicates this map version is currently not enabled on the mobile robot and thus could be enabled or deleted by request.",
					"enum": [
						"ENABLED",
						"DISABLED"
					]
				}
			}
		},
		"zoneSet": {
			"type": "object",
			"title": "zoneSet",
			"required": [
				"zoneSetId",
				"mapId",
				"zoneSetStatus"
			],
			"properties": {
				"zoneSetId": {
					"type": "string",
					"description": "Unique identifier of the zone set that is currently enabled for the map.<br> This field shall be left empty only if the mobile robot has no zones defined for the corresponding map."
				},
				"mapId": {
					"type": "string",
					"description": "Identifier of the corresponding map."
				},
				"zoneSetStatus": {
					"type": "string",
					"description": "ENABLED: Indicates this zone set is currently active / used on the mobile robot. At most one zone set for each map can have its status set to ENABLED. DISABLED: Indicates this zone set is currently not enabled on the mobile robot and thus could be enabled or deleted by fleet control.",
					"enum": [
						"ENABLED",
						"DISABLED"
					]
				}
			}
		},
		"nodeState": {
			"type": "object",
			"title": "nodeState",
			"required": [
				"nodeId",
				"sequenceId",
				"released"
			],
			"properties": {
				"nodeId": {
					"type": "string",
					"description": "Unique node identification"
				},
				"sequenceId": {
					"type": "integer",
					"description": "Sequence ID to discern multiple nodes with same nodeId."
				},
				"nodeDescriptor": {
					"type": "string",
					"description": "A user-defined, human-readable name or descriptor."
				},
				"released": {
					"type": "boolean",
					"description": "True: indicates that the node is part of the base. False: indicates that the node is part of the horizon."
				},
				"nodePosition": {
					"type": "object",
					"description": "Node position. Optional: Fleet control has this information. Can be sent additionally, e.g., for debugging purposes. ",
					"required": [
						"x",
						"y",
						"mapId"
					],
					"properties": {
						"x": {
							"type": "number"
						},
						"y": {
							"type": "number"
						},
						"theta": {
							"type": "number",
							"unit": "rad",
							"minimum": -3.14159265359,
							"maximum": 3.14159265359
						},
						"mapId": {
							"type": "string"
						}
					}
				}
			}
		},
		"edgeState": {
			"type": "object",
			"required": [
				"edgeId",
				"sequenceId",
				"released"
			],
			"properties": {
				"edgeId": {
					"type": "string",
					"description": "Unique edge identification"
				},
				"sequenceId": {
					"type": "integer",
					"description": "Sequence ID to differentiate between multiple edges with the same edgeId"
				},
				"edgeDescriptor": {
					"type": "string",
					"description": "A user-defined, human-readable name or descriptor."
				},
				"released": {
					"type": "boolean",
					"description": "True indicates that the edge is part of the base. False indicates that the edge is part of the horizon."
				},
				"trajectory": {
					"$ref": "#/definitions/trajectory",
					"description": "Reports the trajectory that has been defined a priori within a layout or was sent for this edge as part of the order."
				}
			}
		},
		"trajectory": {
            "type": "object",
            "description": "The trajectory is to be communicated as a NURBS and is defined in chapter 6.7 Implementation of the Order message. Trajectory segments reach from the point, where the mobile robot starts to enter the edge to the point where it reports that the next node was traversed.",
            "required": [
                "controlPoints"
            ],
            "properties": {
                "degree": {
                    "type": "integer",
                    "description": "Defines the number of control points that influence any given point on the curve. Increasing the degree increases differentiability. If not defined, the default value is 1.",
                    "minimum": 1
                },
                "knotVector": {
                    "type": "array",
                    "description": "Sequence of parameter values that determine where and how the control points affect the NURBS curve. knotVector has size of number of control points + degree + 1.",
                    "items": {
                        "type": "number",
                        "maximum": 1.0,
                        "minimum": 0.0
                    }
                },
                "controlPoints": {
                    "type": "array",
                    "description": "List of JSON controlPoint objects defining the control points of the NURBS, which includes the beginning and end point.",
                    "items": {
                        "type": "object",
                        "required": [
                            "x",
                            "y"
                        ],
                        "properties": {
                            "x": {
                                "type": "number"
                            },
                            "y": {
                                "type": "number"
                            },
                            "weight": {
                                "type": "number",
                                "description": "The weight, with which this control point pulls on the curve. When not defined, the default will be 1.0.",
                                "exclusiveMinimum": 0.0
                            }
                        }
                    }
                }
            }
        },
		"plannedPath": {
			"type": "object",
            "description": "Represents a path within the robot's currently active order as NURBS.",
            "required": [
                "trajectory"
            ],
            "properties": {
                "trajectory": {
                    "$ref": "#/definitions/trajectory"
                },
                "traversedNodes": {
                    "type": "array",
                    "description": "Array of nodeIds as communicated in the currently executed order that are traversed within the shared planned path.",
                    "items": {
                        "type": "string"
                    }
                }
            }
		},
		"intermediatePath": {
			"type": "object",
            "description": "Represents the estimated time of arrival at closer waypoints that the mobile robot is able to perceive with its sensors.",
            "required": [
                "polyline"
            ],
            "properties": {
                "polyline": {
                    "type": "array",
                    "description": "Array of end points of segments of a polyline.",
                    "items": {
                        "type": "object",
                        "description": "Endpoint of a segment within a defined polyline.",
                        "required": [
                            "x",
                            "y",
                            "eta"
                        ],
                        "properties": {
                            "x": {
                                "type": "number",
                                "description": "X-coordinate described in the project-specific coordinate system.",
                                "unit": "m"
                            },
                            "y": {
                                "type": "number",
                                "description": "Y-coordinate described in the project-specific coordinate system.",
                                "unit": "m"
                            },
                            "theta": {
                                "type": "number",
                                "description": "Absolute orientation of the mobile robot in the project-specific coordinate system.",
                                "unit": "rad",
                                "minimum": -3.14159265359,
                                "maximum": 3.14159265359
                            },
                            "eta": {
                                "type": "string",
                                "description": "Estimated time of arrival/traversal. Formatted as a timestamp (ISO 8601, UTC); YYYY-MM-DDTHH:mm:ss.fffZ (e.g., '2017-04-15T11:40:03.123Z')."
                            }
                        }
                    }
                }
            }
		},
		"mobileRobotPosition": {
			"type": "object",
            "description": "Defines the position on a map in world coordinates. Each floor has its own map.",
            "required": [
                "x",
                "y",
                "theta",
                "mapId",
                "localized"
            ],
            "properties": {
                "x": {
                    "type": "number",
                    "unit": "m"
                },
                "y": {
                    "type": "number",
                    "unit": "m"
                },
                "theta": {
                    "type": "number",
                    "unit": "rad",
                    "minimum": -3.14159265359,
                    "maximum": 3.14159265359
                },
                "mapId": {
                    "type": "string",
					"description": "Unique identification of the map."
                },
                "localized": {
                    "type": "boolean",
                    "description": "True: mobile robot is localized. x, y, and theta can be trusted. False: mobile robot is not localized. x, y, and theta cannot be trusted."
                },
                "localizationScore": {
                    "type": "number",
                    "description": "Describes the quality of the localization and therefore, can be used, e.g., by SLAM mobile robot to describe how accurate the current position information is.\n0.0: position unknown\n1.0: position known\nOptional for vehicles that cannot estimate their localization score.\nOnly for logging and visualization purposes",
                    "minimum": 0.0,
                    "maximum": 1.0
                },
                "deviationRange": {
                    "type": "number",
                    "description": "Value for position deviation range in meters. Optional for vehicles that cannot estimate their deviation, e.g., grid-based localization. Only for logging and visualization purposes.",
                    "unit": "m",
                    "minimum": 0.0
                }
            }
		},
		"load": {
			"type": "object",
			"required": [],
			"description": "Load object that describes the load if the mobile robot has information about it.",
			"title": "load",
			"properties": {
				"loadId": {
					"type": "string",
					"description": "Unique identification number of the load (e.g., barcode or RFID). Empty field, if the mobile robot can identify the load, but did not identify the load yet. Optional, if the mobile robot cannot identify the load."
				},
				"loadType": {
					"type": "string",
					"description":"Type of load."
				},
				"loadPosition": {
					"type": "string",
					"description": "Indicates, which load handling/carrying unit of the mobile robot is used, e.g., in case the mobile robot has multiple spots/positions to carry loads. Optional for vehicles with only one loadPosition.",
					"examples":[
						"front", "back", "positionC1"
					]
				},
				"boundingBoxReference": {
					"type": "object",
					"required": [
						"x",
						"y",
						"z"
					],
					"description": "Point of reference for the location of the bounding box. The point of reference is always the center of the bounding box bottom surface (at height = 0) and is described in coordinates of the mobile robot coordinate system.",
					"properties": {
						"x": {
							"type": "number"
						},
						"y": {
							"type": "number"
						},
						"z": {
							"type": "number"
						},
						"theta": {
							"type": "number",
							"description":"Orientation of the loads bounding box. Important for tugger, trains, etc."
						}
					}
				},
				"loadDimensions": {
					"type": "object",
					"required": [
						"length",
						"width"
					],
					"description": "Dimensions of the loads bounding box in meters.",
					"properties": {
						"length": {
							"type": "number",
							"description": "Absolute length (along the mobile robot’s coordinate system's x-axis) of the load's bounding box in meters.",
							"unit": "m",
							"minimum": 0.0
						},
						"width": {
							"type": "number",
							"description": "Absolute width (along the mobile robot’s coordinate system's y-axis) of the load's bounding box in meters.",
							"unit": "m",
							"minimum": 0.0
						},
						"height": {
							"type": "number",
							"description": "Absolute height of the loads bounding box in meter.\nOptional:\nset value only if known.",
							"unit": "m",
							"minimum": 0.0
						}
					}
				},
				"weight": {
					"type": "number",
					"description": "Absolute weight of the load measured in kg.",
					"unit": "kg",
					"minimum": 0.0
				}
			}
		},
		"zoneRequest": {
			"type": "object",
			"description": "Zone information sent by the mobile robot to fleet control.",
			"required": [
				"requestId",
				"requestType",
				"zoneId",
				"zoneSetId",
				"requestStatus"
			],
			"properties": {
				"requestId": {
					"type": "string",
					"description": "Unique per mobile robot identifier within all active requests."
				},
				"requestType": {
					"type": "string",
					"enum": ["ACCESS", "REPLANNING"],
					"description": "Enum specifying the type of zone the request relates to. Feasible values are ACCESS or REPLANNING."
				},
				"zoneId": {
					"type": "string",
					"description": "Locally (within the zone set) unique identifier referencing the zone the request is related to."
				},
				"zoneSetId": {
					"type": "string",
					"description": "Due to the zoneId only being unique to a zoneSet, the zoneSetId is part of the request."
				},
				"requestStatus": {
					"type": "string",
					"enum": ["REQUESTED", "GRANTED", "REVOKED", "EXPIRED"],
					"description": "When stating a request, this is set to REQUESTED. After response or update from fleet control set to GRANTED or REVOKED. If lease time expires, shall be to EXPIRED."
				},
				"trajectory": {
					"$ref": "#/definitions/trajectory"
				}
			}
		},
		"edgeRequest": {
			"type": "object",
			"description": "Edge request information sent by the mobile robot to fleet control.",
			"required": [
				"requestId",
				"requestType",
				"edgeId",
				"sequenceId",
				"requestStatus"
			],
			"properties": {
				"requestId": {
					"type": "string",
					"description": "Unique per mobile robot identifier across all active requests."
				},
				"requestType": {
					"type": "string",
					"enum": ["CORRIDOR"],
					"description": "Enum specifying the type of edge the request relates to."
				},
				"edgeId": {
					"type": "string",
					"description": "Globally unique identifier referencing the edge the request is related to."
				},
				"sequenceId": {
					"type": "integer",
					"description": "Tracking number for sequence of edge within order. Required to uniquely identify the referenced edge within the order."
				},
				"requestStatus": {
					"type": "string",
					"enum": ["REQUESTED", "GRANTED", "REVOKED", "EXPIRED"],
					"description": "When stating a request, this is set to REQUESTED. After response or update from fleet control set to GRANTED or REVOKED. If lease time expires set to EXPIRED."
				}
			}
		},
        "actionState": {
            "type": "object",
            "required": [
                "actionId",
                "actionStatus"
            ],
            "title": "actionState",
            "properties": {
                "actionId": {
                    "type": "string",
                    "description": "Unique actionId",
                    "examples": [
                        "blink_123jdaimoim234"
                    ]
                },
                "actionType": {
                    "type": "string",
                    "description": "actionType of the action. Optional: Only for informational or visualization purposes. Order knows the type."
                },
                "actionDescriptor": {
                    "type": "string",
                    "description": "A user-defined, human-readable name or descriptor."
                },
                "actionStatus": {
                    "type": "string",
                    "description": "WAITING: waiting for the trigger (passing the mode, entering the edge); INITIALIZING: Action was triggered, preparatory measures are initiated; RUNNING: The action is running; RETRIABLE: Actions that failed, but can be retried; PAUSED: paused by instantAction or external trigger; FINISHED: The action is finished; FAILED: action could not be performed.",
                    "enum": [
                        "WAITING",
                        "INITIALIZING",
                        "RUNNING",
                        "PAUSED",
                        "RETRIABLE",
                        "FINISHED",
                        "FAILED"
                    ]
                },
                "actionResult": {
                    "type": "string",
                    "description": "Description of the result, e.g., the result of a RFID-read. Errors will be transmitted in errors."
                }
            }
        },
		"powerSupply": {
			"type": "object",
            "required": [
                "stateOfCharge",
                "charging"
            ],
            "description": "Contains all battery-related information.",
            "properties": {
                "stateOfCharge": {
                    "type": "number",
                    "description": "State of Charge in %: If mobile robot only provides values for good or bad battery levels, these will be indicated as 20% (bad) and 80% (good).",
                    "minimum":0,
                    "maximum":100
                },
                "batteryVoltage": {
                    "type": "number",
                    "description": "Battery voltage"
                },
                "batteryCurrent": {
                    "type": "number",
                    "description": "Battery current in Ampere (A)"
                },
                "batteryHealth": {
                    "type": "number",
                    "description": "State of health in percent.",
                    "minimum":0,
                    "maximum":100
                },
                "charging": {
                    "type": "boolean",
                    "description": "True: charging in progress. False: mobile robot is currently not charging."
                },
                "range": {
                    "type": "number",
                    "description": "Estimated reach with current State of Charge in meter.",
                    "minimum": 0
                }
            }
		},
		"error": {
			"type": "object",
			"required": [
				"errorType",
				"errorLevel"
			],
			"title": "Error",
			"properties": {
				"errorType": {
					"type": "string",
					"description": "Error type, extensible enumeration including the following predefined values."
				},
				"errorReferences": {
					"type": "array",
					"items": {
						"type": "object",
						"title": "errorReference",
						"description": "Array of references (e.g. nodeId, edgeId, orderId, actionId, etc.) to provide more information related to the error.",
						"properties": {
							"referenceKey": {
								"type": "string",
								"description":"Specifies the type of reference used (e.g. nodeId, edgeId, orderId, actionId, etc.)."
							},
							"referenceValue": {
								"type": "string",
								"description":"The value that belongs to the reference key. For example, the id of the node where the error occurred."
							}
						},
						"required": [
							"referenceKey",
							"referenceValue"
						]
					}
				},
				"errorDescription": {
					"type": "string",
					"description": "Verbose description providing details and possible causes of the error."
				},
				"errorDescriptionTranslations": {
					"type": "array",
					"description": "Array of translations of the error description.",
					"items": {
						"$ref": "#/definitions/translation"
					}
				},
				"errorHint": {
					"type": "string",
					"description": "Hint on how to approach or solve the reported error."
				},
				"errorHintTranslations": {
					"type": "array",
					"description": "Array of translations of the error hint.",
					"items": {
						"$ref": "#/definitions/translation"
					}
				},
				"errorLevel": {
					"type": "string",
					"description": "WARNING: No immediate attention required, mobile robot is able to continue active and accept new order. URGENT: Immediate attention required, mobile robot is able to continue active and accept new order. CRITICAL: Immediate attention required, mobile robot is unable to continue active order, but can accept new order. FATAL: User intervention is required, mobile robot is unable to continue active or accept new order.",
					"enum": [
						"WARNING",
						"URGENT",
						"CRITICAL",
						"FATAL"
					]
				}
			}
		},
        "translation": {
            "type": "object",
            "title": "translation",
            "description": "Translation of a text for a given language code.",
            "required": [
                "translationKey",
                "translationValue"
            ],
            "properties": {
                "translationKey": {
                    "type": "string",
                    "description": "Specifies the language of the translation according to ISO 639-1."
                },
                "translationValue": {
                    "type": "string",
                    "description": "Translation in language of translation key."
                }
            }
        },
		"info": {
			"type": "object",
			"required": [
				"infoType",
				"infoLevel"
			],
			"properties": {
				"infoType": {
					"type": "string",
					"description": "Type/name of information."
				},
				"infoReferences": {
					"type": "array",
					"items": {
						"type": "object",
						"required": [
							"referenceKey",
							"referenceValue"
						],
						"title": "infoReference",
						"description": "Array of references.",
						"properties": {
							"referenceKey": {
								"type": "string",
								"description":"References the type of reference (e.g., headerId, orderId, actionId, etc.)."
							},
							"referenceValue": {
								"type": "string",
								"description":"References the value, which belongs to the reference key."
							}
						}
					}
				},
				"infoDescriptor": {
					"type": "string",
					"description": "A user-defined, human-readable name or descriptor."
				},
				"infoLevel": {
					"type": "string",
					"description": "DEBUG: used for debugging. INFO: used for visualization.",
					"enum": [
						"INFO",
						"DEBUG"
					]
				}
			}
		},
		"safetyState": {
			"type": "object",
            "required": [
                "activeEmergencyStop",
                "fieldViolation"
            ],
            "description": "Contains all safety-related information.",
            "properties": {
                "activeEmergencyStop": {
                    "type": "string",
                    "description": "EmergencyStop-Types:  MANUAL: e-stop shall be acknowledged manually at the mobile robot. REMOTE: facility e-stop shall be acknowledged remotely. NONE: no e-stop activated.",
                    "enum": [
                        "MANUAL",
                        "REMOTE",
                        "NONE"
                    ]
                },
                "fieldViolation": {
                    "type": "boolean",
                    "description": "Protective field violation. True: field is violated. False: field is not violated."
                }
            }
		}
    }
}
```

  </template>
  <template #en>

```json
{
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "title": "state",
    "description": "State of the mobile robot.",
    "subtopic": "/state",
    "type": "object",
    "required": [
        "headerId",
        "timestamp",
        "version",
        "manufacturer",
        "serialNumber",
        "orderId",
        "orderUpdateId",
        "lastNodeId",
        "lastNodeSequenceId",
        "nodeStates",
        "edgeStates",
        "driving",
        "actionStates",
        "instantActionStates",
        "powerSupply",
        "operatingMode",
        "errors",
        "safetyState"
    ],
    "properties": {
        "headerId": {
            "type": "integer",
            "description": "headerId of the message. The headerId is defined per topic and incremented by 1 with each sent (but not necessarily received) message."
        },
        "timestamp": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp in ISO8601 format (YYYY-MM-DDTHH:mm:ss.fffZ).",
            "examples": [
                "1991-03-11T11:40:03.123Z"
            ]
        },
        "version": {
            "type": "string",
            "description": "Version of the protocol [Major].[Minor].[Patch]",
            "examples": [
                "1.3.2"
            ]
        },
        "manufacturer": {
            "type": "string",
            "description": "Manufacturer of the mobile robot"
        },
        "serialNumber": {
            "type": "string",
            "description": "Serial number of the mobile robot."
        },
        "maps":{
            "type": "array",
            "description": "Array of map-objects that are currently stored on the mobile robot.",
            "items": {
				"$ref": "#/definitions/map"
			}
        },
        "zoneSets":{
            "type": "array",
            "description": "Array of zoneSet objects that are currently stored on the mobile robot.",
            "items": {
				"$ref": "#/definitions/zoneSet"
			}
        },
        "orderId": {
            "type": "string",
            "description": "Unique order identification of the current order or the previous finished order. The orderId is kept until a new order is received. Empty string (\"\") if no previous orderId is available. "
        },
        "orderUpdateId": {
            "type": "integer",
            "description": "Order Update Identification to identify that an order update has been accepted by the mobile robot. 0 if no previous orderUpdateId is available."
        },
        "lastNodeId": {
            "type": "string",
            "description": "Node ID of last reached node or, if mobile robot is currently on a node, current node (e.g., \"node7\"). Empty string (\"\") if no lastNodeId is available."
        },
        "lastNodeSequenceId": {
            "type": "integer",
            "description": "sequenceId of the last reached node or, if the mobile robot is currently on a node, sequenceId of current node. 0 if no lastNodeSequenceId is available. "
        },
		"nodeStates": {
            "type": "array",
            "description": "Array of nodeState-Objects, that need to be traversed for fulfilling the order. Empty list if idle.",
            "items": {
                "$ref": "#/definitions/nodeState"
            }
        },
        "edgeStates": {
            "type": "array",
            "description": "Array of edgeState-Objects, that need to be traversed for fulfilling the order, empty list if idle.",
            "items": {
				"$ref": "#/definitions/edgeState"
			}
        },
        "plannedPath": {
            "$ref": "#/definitions/plannedPath"
        },
        "intermediatePath": {
            "$ref": "#/definitions/intermediatePath"
        },
        "mobileRobotPosition": {
            "$ref": "#/definitions/mobileRobotPosition"
        },
        "velocity": {
            "type": "object",
            "description": "The mobile robot's velocity in mobile robot coordinates",
            "properties": {
                "vx": {
                    "type": "number",
                    "description":"The mobile robot's velocity in its x direction",
                    "unit": "m/s"
                },
                "vy": {
                    "type": "number",
                    "description":"The mobile robot's velocity in its y direction",
                    "unit": "m/s"
                },
                "omega": {
                    "type": "number",
                    "description":"The mobile robot's turning speed around its z axis.",
                    "unit": "rad/s"
                }
            }
        },
        "loads": {
            "type": "array",
            "description": "Loads, that are currently handled by the mobile robot. Optional: If mobile robot cannot determine load state, leave the array out of the state. If the mobile robot can determine the load state, but the array is empty, the mobile robot is considered unloaded.",
            "items": {
                "$ref": "#/definitions/load"
            }
        },
        "driving": {
            "type": "boolean",
            "description": "True: indicates that the mobile robot is driving and/or rotating. Other movements of the mobile robot (e.g., lift movements) are not included here.\nFalse: indicates that the mobile robot is neither driving nor rotating "
        },
        "paused": {
            "type": "boolean",
            "description": "True: mobile robot is currently in a paused state, either because of the push of a physical button on the mobile robot or because of an instantAction. The mobile robot can resume the order.\nFalse: The mobile robot is currently not in a paused state."
        },
        "newBaseRequest": {
            "type": "boolean",
            "description": "True: mobile robot is almost at the end of the base and will reduce speed if no new base is transmitted. Trigger for fleet control to send new base\nFalse: no base update required."
        },
		"zoneRequests": {
            "description": "Array of zoneRequest objects that are currently active on the mobile robot. Empty array if no zone requests are active.",
            "type": "array",
            "items": {
				"$ref": "#/definitions/zoneRequest"
            }
        },
        "edgeRequests": {
            "description": "Array of edgeRequest objects that are currently active on the mobile robot. Empty array if no edge requests are active.",
            "type": "array",
            "items": {
				"$ref": "#/definitions/edgeRequest"
            }
        },
        "distanceSinceLastNode": {
            "type": "number",
            "description": "Used by line guided vehicles to indicate the distance it has been driving past the lastNodeId. Distance is in meters."
        },
        "actionStates": {
            "type": "array",
            "description": "Array of the current actions and the actions which are yet to be finished. This may include actions from previous nodes that are still in progress\nWhen an action is completed, an updated state message is published with actionStatus set to finished and if applicable with the corresponding resultDescriptor. The actionStates are kept until a new order is received.",
            "items": {
                "$ref": "#/definitions/actionState"
            }
        },
        "instantActionStates": {
            "type": "array",
            "description": "Array of all instant action states that the mobile robot received. Empty array if the mobile robot has not received any instant actions. Instant actions are kept in the state until restart or action clearInstantActions is executed.",
            "items": {
                "$ref": "#/definitions/actionState"
            }
        },
        "zoneActionStates": {
            "type": "array",
            "description": "Array of all zone actions that are in an end state or are currently running; sharing upcoming actions is optional. Zone action states are kept in the state message until restart or action clearZoneActions is executed.",
            "items": {
                "$ref": "#/definitions/actionState"
            }
        },
        "powerSupply": {
            "$ref": "#/definitions/powerSupply"
        },
        "operatingMode": {
            "type": "string",
            "description": "Current operating mode of the mobile robot.",
            "enum": [
                "STARTUP",
                "AUTOMATIC",
                "SEMIAUTOMATIC",
                "INTERVENED",
                "MANUAL",
                "SERVICE",
                "TEACH_IN"
            ]
        },
        "errors": {
            "type": "array",
            "description": "Array of error-objects. All active errors of the mobile robot should be in the list. An empty array indicates that the mobile robot has no active errors.",
            "items": {
				"$ref": "#/definitions/error"
            }
        },
        "information": {
            "type": "array",
            "description": "Array of info-objects. An empty array indicates, that the mobile robot has no information. This should only be used for visualization or debugging – it must not be used for logic in fleet control.",
            "items": {
				"$ref": "#/definitions/info"
            }
        },
        "safetyState": {
            "$ref": "#/definitions/safetyState"
        }
    },
    "definitions": {
		"map": {
			"type": "object",
			"title": "map",
			"required": [
				"mapId",
				"mapVersion",
				"mapStatus"
			],
			"properties": {
				"mapId": {
					"type": "string",
					"description": "ID of the map describing a defined area of the mobile robot's workspace."
				},
				"mapVersion": {
					"type": "string",
					"description": "Version of the map."
				},
				"mapDescriptor": {
					"type": "string",
					"description": "A user-defined, human-readable name or descriptor"
				},
				"mapStatus": {
					"type": "string",
					"description": "Information on the status of the map indicating, if a map version is currently used on the mobile robot. ENABLED: Indicates this map is currently active / used on the mobile robot. At most one map with the same mapId can have its status set to ENABLED.<br>DISABLED: Indicates this map version is currently not enabled on the mobile robot and thus could be enabled or deleted by request.",
					"enum": [
						"ENABLED",
						"DISABLED"
					]
				}
			}
		},
		"zoneSet": {
			"type": "object",
			"title": "zoneSet",
			"required": [
				"zoneSetId",
				"mapId",
				"zoneSetStatus"
			],
			"properties": {
				"zoneSetId": {
					"type": "string",
					"description": "Unique identifier of the zone set that is currently enabled for the map.<br> This field shall be left empty only if the mobile robot has no zones defined for the corresponding map."
				},
				"mapId": {
					"type": "string",
					"description": "Identifier of the corresponding map."
				},
				"zoneSetStatus": {
					"type": "string",
					"description": "ENABLED: Indicates this zone set is currently active / used on the mobile robot. At most one zone set for each map can have its status set to ENABLED. DISABLED: Indicates this zone set is currently not enabled on the mobile robot and thus could be enabled or deleted by fleet control.",
					"enum": [
						"ENABLED",
						"DISABLED"
					]
				}
			}
		},
		"nodeState": {
			"type": "object",
			"title": "nodeState",
			"required": [
				"nodeId",
				"sequenceId",
				"released"
			],
			"properties": {
				"nodeId": {
					"type": "string",
					"description": "Unique node identification"
				},
				"sequenceId": {
					"type": "integer",
					"description": "Sequence ID to discern multiple nodes with same nodeId."
				},
				"nodeDescriptor": {
					"type": "string",
					"description": "A user-defined, human-readable name or descriptor."
				},
				"released": {
					"type": "boolean",
					"description": "True: indicates that the node is part of the base. False: indicates that the node is part of the horizon."
				},
				"nodePosition": {
					"type": "object",
					"description": "Node position. Optional: Fleet control has this information. Can be sent additionally, e.g., for debugging purposes. ",
					"required": [
						"x",
						"y",
						"mapId"
					],
					"properties": {
						"x": {
							"type": "number"
						},
						"y": {
							"type": "number"
						},
						"theta": {
							"type": "number",
							"unit": "rad",
							"minimum": -3.14159265359,
							"maximum": 3.14159265359
						},
						"mapId": {
							"type": "string"
						}
					}
				}
			}
		},
		"edgeState": {
			"type": "object",
			"required": [
				"edgeId",
				"sequenceId",
				"released"
			],
			"properties": {
				"edgeId": {
					"type": "string",
					"description": "Unique edge identification"
				},
				"sequenceId": {
					"type": "integer",
					"description": "Sequence ID to differentiate between multiple edges with the same edgeId"
				},
				"edgeDescriptor": {
					"type": "string",
					"description": "A user-defined, human-readable name or descriptor."
				},
				"released": {
					"type": "boolean",
					"description": "True indicates that the edge is part of the base. False indicates that the edge is part of the horizon."
				},
				"trajectory": {
					"$ref": "#/definitions/trajectory",
					"description": "Reports the trajectory that has been defined a priori within a layout or was sent for this edge as part of the order."
				}
			}
		},
		"trajectory": {
            "type": "object",
            "description": "The trajectory is to be communicated as a NURBS and is defined in chapter 6.7 Implementation of the Order message. Trajectory segments reach from the point, where the mobile robot starts to enter the edge to the point where it reports that the next node was traversed.",
            "required": [
                "controlPoints"
            ],
            "properties": {
                "degree": {
                    "type": "integer",
                    "description": "Defines the number of control points that influence any given point on the curve. Increasing the degree increases differentiability. If not defined, the default value is 1.",
                    "minimum": 1
                },
                "knotVector": {
                    "type": "array",
                    "description": "Sequence of parameter values that determine where and how the control points affect the NURBS curve. knotVector has size of number of control points + degree + 1.",
                    "items": {
                        "type": "number",
                        "maximum": 1.0,
                        "minimum": 0.0
                    }
                },
                "controlPoints": {
                    "type": "array",
                    "description": "List of JSON controlPoint objects defining the control points of the NURBS, which includes the beginning and end point.",
                    "items": {
                        "type": "object",
                        "required": [
                            "x",
                            "y"
                        ],
                        "properties": {
                            "x": {
                                "type": "number"
                            },
                            "y": {
                                "type": "number"
                            },
                            "weight": {
                                "type": "number",
                                "description": "The weight, with which this control point pulls on the curve. When not defined, the default will be 1.0.",
                                "exclusiveMinimum": 0.0
                            }
                        }
                    }
                }
            }
        },
		"plannedPath": {
			"type": "object",
            "description": "Represents a path within the robot's currently active order as NURBS.",
            "required": [
                "trajectory"
            ],
            "properties": {
                "trajectory": {
                    "$ref": "#/definitions/trajectory"
                },
                "traversedNodes": {
                    "type": "array",
                    "description": "Array of nodeIds as communicated in the currently executed order that are traversed within the shared planned path.",
                    "items": {
                        "type": "string"
                    }
                }
            }
		},
		"intermediatePath": {
			"type": "object",
            "description": "Represents the estimated time of arrival at closer waypoints that the mobile robot is able to perceive with its sensors.",
            "required": [
                "polyline"
            ],
            "properties": {
                "polyline": {
                    "type": "array",
                    "description": "Array of end points of segments of a polyline.",
                    "items": {
                        "type": "object",
                        "description": "Endpoint of a segment within a defined polyline.",
                        "required": [
                            "x",
                            "y",
                            "eta"
                        ],
                        "properties": {
                            "x": {
                                "type": "number",
                                "description": "X-coordinate described in the project-specific coordinate system.",
                                "unit": "m"
                            },
                            "y": {
                                "type": "number",
                                "description": "Y-coordinate described in the project-specific coordinate system.",
                                "unit": "m"
                            },
                            "theta": {
                                "type": "number",
                                "description": "Absolute orientation of the mobile robot in the project-specific coordinate system.",
                                "unit": "rad",
                                "minimum": -3.14159265359,
                                "maximum": 3.14159265359
                            },
                            "eta": {
                                "type": "string",
                                "description": "Estimated time of arrival/traversal. Formatted as a timestamp (ISO 8601, UTC); YYYY-MM-DDTHH:mm:ss.fffZ (e.g., '2017-04-15T11:40:03.123Z')."
                            }
                        }
                    }
                }
            }
		},
		"mobileRobotPosition": {
			"type": "object",
            "description": "Defines the position on a map in world coordinates. Each floor has its own map.",
            "required": [
                "x",
                "y",
                "theta",
                "mapId",
                "localized"
            ],
            "properties": {
                "x": {
                    "type": "number",
                    "unit": "m"
                },
                "y": {
                    "type": "number",
                    "unit": "m"
                },
                "theta": {
                    "type": "number",
                    "unit": "rad",
                    "minimum": -3.14159265359,
                    "maximum": 3.14159265359
                },
                "mapId": {
                    "type": "string",
					"description": "Unique identification of the map."
                },
                "localized": {
                    "type": "boolean",
                    "description": "True: mobile robot is localized. x, y, and theta can be trusted. False: mobile robot is not localized. x, y, and theta cannot be trusted."
                },
                "localizationScore": {
                    "type": "number",
                    "description": "Describes the quality of the localization and therefore, can be used, e.g., by SLAM mobile robot to describe how accurate the current position information is.\n0.0: position unknown\n1.0: position known\nOptional for vehicles that cannot estimate their localization score.\nOnly for logging and visualization purposes",
                    "minimum": 0.0,
                    "maximum": 1.0
                },
                "deviationRange": {
                    "type": "number",
                    "description": "Value for position deviation range in meters. Optional for vehicles that cannot estimate their deviation, e.g., grid-based localization. Only for logging and visualization purposes.",
                    "unit": "m",
                    "minimum": 0.0
                }
            }
		},
		"load": {
			"type": "object",
			"required": [],
			"description": "Load object that describes the load if the mobile robot has information about it.",
			"title": "load",
			"properties": {
				"loadId": {
					"type": "string",
					"description": "Unique identification number of the load (e.g., barcode or RFID). Empty field, if the mobile robot can identify the load, but did not identify the load yet. Optional, if the mobile robot cannot identify the load."
				},
				"loadType": {
					"type": "string",
					"description":"Type of load."
				},
				"loadPosition": {
					"type": "string",
					"description": "Indicates, which load handling/carrying unit of the mobile robot is used, e.g., in case the mobile robot has multiple spots/positions to carry loads. Optional for vehicles with only one loadPosition.",
					"examples":[
						"front", "back", "positionC1"
					]
				},
				"boundingBoxReference": {
					"type": "object",
					"required": [
						"x",
						"y",
						"z"
					],
					"description": "Point of reference for the location of the bounding box. The point of reference is always the center of the bounding box bottom surface (at height = 0) and is described in coordinates of the mobile robot coordinate system.",
					"properties": {
						"x": {
							"type": "number"
						},
						"y": {
							"type": "number"
						},
						"z": {
							"type": "number"
						},
						"theta": {
							"type": "number",
							"description":"Orientation of the loads bounding box. Important for tugger, trains, etc."
						}
					}
				},
				"loadDimensions": {
					"type": "object",
					"required": [
						"length",
						"width"
					],
					"description": "Dimensions of the loads bounding box in meters.",
					"properties": {
						"length": {
							"type": "number",
							"description": "Absolute length (along the mobile robot’s coordinate system's x-axis) of the load's bounding box in meters.",
							"unit": "m",
							"minimum": 0.0
						},
						"width": {
							"type": "number",
							"description": "Absolute width (along the mobile robot’s coordinate system's y-axis) of the load's bounding box in meters.",
							"unit": "m",
							"minimum": 0.0
						},
						"height": {
							"type": "number",
							"description": "Absolute height of the loads bounding box in meter.\nOptional:\nset value only if known.",
							"unit": "m",
							"minimum": 0.0
						}
					}
				},
				"weight": {
					"type": "number",
					"description": "Absolute weight of the load measured in kg.",
					"unit": "kg",
					"minimum": 0.0
				}
			}
		},
		"zoneRequest": {
			"type": "object",
			"description": "Zone information sent by the mobile robot to fleet control.",
			"required": [
				"requestId",
				"requestType",
				"zoneId",
				"zoneSetId",
				"requestStatus"
			],
			"properties": {
				"requestId": {
					"type": "string",
					"description": "Unique per mobile robot identifier within all active requests."
				},
				"requestType": {
					"type": "string",
					"enum": ["ACCESS", "REPLANNING"],
					"description": "Enum specifying the type of zone the request relates to. Feasible values are ACCESS or REPLANNING."
				},
				"zoneId": {
					"type": "string",
					"description": "Locally (within the zone set) unique identifier referencing the zone the request is related to."
				},
				"zoneSetId": {
					"type": "string",
					"description": "Due to the zoneId only being unique to a zoneSet, the zoneSetId is part of the request."
				},
				"requestStatus": {
					"type": "string",
					"enum": ["REQUESTED", "GRANTED", "REVOKED", "EXPIRED"],
					"description": "When stating a request, this is set to REQUESTED. After response or update from fleet control set to GRANTED or REVOKED. If lease time expires, shall be to EXPIRED."
				},
				"trajectory": {
					"$ref": "#/definitions/trajectory"
				}
			}
		},
		"edgeRequest": {
			"type": "object",
			"description": "Edge request information sent by the mobile robot to fleet control.",
			"required": [
				"requestId",
				"requestType",
				"edgeId",
				"sequenceId",
				"requestStatus"
			],
			"properties": {
				"requestId": {
					"type": "string",
					"description": "Unique per mobile robot identifier across all active requests."
				},
				"requestType": {
					"type": "string",
					"enum": ["CORRIDOR"],
					"description": "Enum specifying the type of edge the request relates to."
				},
				"edgeId": {
					"type": "string",
					"description": "Globally unique identifier referencing the edge the request is related to."
				},
				"sequenceId": {
					"type": "integer",
					"description": "Tracking number for sequence of edge within order. Required to uniquely identify the referenced edge within the order."
				},
				"requestStatus": {
					"type": "string",
					"enum": ["REQUESTED", "GRANTED", "REVOKED", "EXPIRED"],
					"description": "When stating a request, this is set to REQUESTED. After response or update from fleet control set to GRANTED or REVOKED. If lease time expires set to EXPIRED."
				}
			}
		},
        "actionState": {
            "type": "object",
            "required": [
                "actionId",
                "actionStatus"
            ],
            "title": "actionState",
            "properties": {
                "actionId": {
                    "type": "string",
                    "description": "Unique actionId",
                    "examples": [
                        "blink_123jdaimoim234"
                    ]
                },
                "actionType": {
                    "type": "string",
                    "description": "actionType of the action. Optional: Only for informational or visualization purposes. Order knows the type."
                },
                "actionDescriptor": {
                    "type": "string",
                    "description": "A user-defined, human-readable name or descriptor."
                },
                "actionStatus": {
                    "type": "string",
                    "description": "WAITING: waiting for the trigger (passing the mode, entering the edge); INITIALIZING: Action was triggered, preparatory measures are initiated; RUNNING: The action is running; RETRIABLE: Actions that failed, but can be retried; PAUSED: paused by instantAction or external trigger; FINISHED: The action is finished; FAILED: action could not be performed.",
                    "enum": [
                        "WAITING",
                        "INITIALIZING",
                        "RUNNING",
                        "PAUSED",
                        "RETRIABLE",
                        "FINISHED",
                        "FAILED"
                    ]
                },
                "actionResult": {
                    "type": "string",
                    "description": "Description of the result, e.g., the result of a RFID-read. Errors will be transmitted in errors."
                }
            }
        },
		"powerSupply": {
			"type": "object",
            "required": [
                "stateOfCharge",
                "charging"
            ],
            "description": "Contains all battery-related information.",
            "properties": {
                "stateOfCharge": {
                    "type": "number",
                    "description": "State of Charge in %: If mobile robot only provides values for good or bad battery levels, these will be indicated as 20% (bad) and 80% (good).",
                    "minimum":0,
                    "maximum":100
                },
                "batteryVoltage": {
                    "type": "number",
                    "description": "Battery voltage"
                },
                "batteryCurrent": {
                    "type": "number",
                    "description": "Battery current in Ampere (A)"
                },
                "batteryHealth": {
                    "type": "number",
                    "description": "State of health in percent.",
                    "minimum":0,
                    "maximum":100
                },
                "charging": {
                    "type": "boolean",
                    "description": "True: charging in progress. False: mobile robot is currently not charging."
                },
                "range": {
                    "type": "number",
                    "description": "Estimated reach with current State of Charge in meter.",
                    "minimum": 0
                }
            }
		},
		"error": {
			"type": "object",
			"required": [
				"errorType",
				"errorLevel"
			],
			"title": "Error",
			"properties": {
				"errorType": {
					"type": "string",
					"description": "Error type, extensible enumeration including the following predefined values."
				},
				"errorReferences": {
					"type": "array",
					"items": {
						"type": "object",
						"title": "errorReference",
						"description": "Array of references (e.g. nodeId, edgeId, orderId, actionId, etc.) to provide more information related to the error.",
						"properties": {
							"referenceKey": {
								"type": "string",
								"description":"Specifies the type of reference used (e.g. nodeId, edgeId, orderId, actionId, etc.)."
							},
							"referenceValue": {
								"type": "string",
								"description":"The value that belongs to the reference key. For example, the id of the node where the error occurred."
							}
						},
						"required": [
							"referenceKey",
							"referenceValue"
						]
					}
				},
				"errorDescription": {
					"type": "string",
					"description": "Verbose description providing details and possible causes of the error."
				},
				"errorDescriptionTranslations": {
					"type": "array",
					"description": "Array of translations of the error description.",
					"items": {
						"$ref": "#/definitions/translation"
					}
				},
				"errorHint": {
					"type": "string",
					"description": "Hint on how to approach or solve the reported error."
				},
				"errorHintTranslations": {
					"type": "array",
					"description": "Array of translations of the error hint.",
					"items": {
						"$ref": "#/definitions/translation"
					}
				},
				"errorLevel": {
					"type": "string",
					"description": "WARNING: No immediate attention required, mobile robot is able to continue active and accept new order. URGENT: Immediate attention required, mobile robot is able to continue active and accept new order. CRITICAL: Immediate attention required, mobile robot is unable to continue active order, but can accept new order. FATAL: User intervention is required, mobile robot is unable to continue active or accept new order.",
					"enum": [
						"WARNING",
						"URGENT",
						"CRITICAL",
						"FATAL"
					]
				}
			}
		},
        "translation": {
            "type": "object",
            "title": "translation",
            "description": "Translation of a text for a given language code.",
            "required": [
                "translationKey",
                "translationValue"
            ],
            "properties": {
                "translationKey": {
                    "type": "string",
                    "description": "Specifies the language of the translation according to ISO 639-1."
                },
                "translationValue": {
                    "type": "string",
                    "description": "Translation in language of translation key."
                }
            }
        },
		"info": {
			"type": "object",
			"required": [
				"infoType",
				"infoLevel"
			],
			"properties": {
				"infoType": {
					"type": "string",
					"description": "Type/name of information."
				},
				"infoReferences": {
					"type": "array",
					"items": {
						"type": "object",
						"required": [
							"referenceKey",
							"referenceValue"
						],
						"title": "infoReference",
						"description": "Array of references.",
						"properties": {
							"referenceKey": {
								"type": "string",
								"description":"References the type of reference (e.g., headerId, orderId, actionId, etc.)."
							},
							"referenceValue": {
								"type": "string",
								"description":"References the value, which belongs to the reference key."
							}
						}
					}
				},
				"infoDescriptor": {
					"type": "string",
					"description": "A user-defined, human-readable name or descriptor."
				},
				"infoLevel": {
					"type": "string",
					"description": "DEBUG: used for debugging. INFO: used for visualization.",
					"enum": [
						"INFO",
						"DEBUG"
					]
				}
			}
		},
		"safetyState": {
			"type": "object",
            "required": [
                "activeEmergencyStop",
                "fieldViolation"
            ],
            "description": "Contains all safety-related information.",
            "properties": {
                "activeEmergencyStop": {
                    "type": "string",
                    "description": "EmergencyStop-Types:  MANUAL: e-stop shall be acknowledged manually at the mobile robot. REMOTE: facility e-stop shall be acknowledged remotely. NONE: no e-stop activated.",
                    "enum": [
                        "MANUAL",
                        "REMOTE",
                        "NONE"
                    ]
                },
                "fieldViolation": {
                    "type": "boolean",
                    "description": "Protective field violation. True: field is violated. False: field is not violated."
                }
            }
		}
    }
}
```

  </template>
</BilingualSection>
