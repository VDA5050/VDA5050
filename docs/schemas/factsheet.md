# Factsheet Schema

<BilingualSection>
  <template #ko>
    모바일 로봇의 기술 사양서(Factsheet) 메시지 사양입니다.
    구조가 매우 큰 스키마이므로 아래 타입 정의는 핵심 필드 위주 요약이며, 세부 항목은 아래 공식 JSON 원문을 기준으로 해석해야 합니다.
  </template>
  <template #en>
    The factsheet provides basic information about a specific mobile robot type series.
    Because the schema is large, the type definition below focuses on the core structure and the official JSON schema below remains the authoritative reference for details.
  </template>
</BilingualSection>

## 필드 정의

<BilingualSection>
  <template #ko>

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| headerId | integer | ✅ | 메시지의 헤더 ID입니다. headerId는 주제별로 정의되며 전송된(반드시 수신된 것은 아님) 메시지마다 1씩 증가합니다. |
| timestamp | string | ✅ | ISO8601 형식의 타임스탬프(YYYY-MM-DDTHH:mm:ss.fffZ) |
| version | string | ✅ | 프로토콜 버전 [Major].[Minor].[Patch] |
| manufacturer | string | ✅ | 이동로봇 제조사 |
| serialNumber | string | ✅ | 이동로봇의 일련번호 |
| typeSpecification | object | ✅ | 이러한 매개변수는 일반적으로 모바일 로봇의 클래스와 기능을 지정합니다. |
| physicalParameters | object | ✅ | 이러한 매개변수는 모바일 로봇의 기본 물리적 특성을 지정합니다. |
| protocolLimits | object | ✅ | 이 JSON 개체는 모바일 로봇의 프로토콜 제한 사항을 설명합니다. 매개변수가 정의되지 않거나 0으로 설정되면 이 매개변수에 대한 명시적인 제한이 없습니다. |
| protocolFeatures | object | ✅ | VDA5050 프로토콜의 지원되는 기능 |
| mobileRobotGeometry | object | ✅ | 모바일 로봇 기하학의 상세한 정의 |
| loadSpecification | object | ✅ | 로드 기능의 추상 사양 |
| mobileRobotConfiguration | object | ❌ |  |

### typeSpecification

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| seriesName | string | ✅ | 제조업체가 지정한 자유 텍스트 일반화 시리즈 이름 |
| seriesDescription | string | ❌ | 모바일 로봇 유형 시리즈에 대한 사람이 읽을 수 있는 자유 텍스트 설명 |
| mobileRobotKinematics | string | ❌ | 이동 로봇 운동학 유형에 대한 간략한 설명입니다. 확장 가능한 열거형: DIFFERENTIAL, OMNIDIRECTIONAL, THREE_WHEEL |
| mobileRobotClass | string | ✅ | 모바일 로봇 클래스에 대한 간단한 설명입니다. 확장 가능한 열거형: FORKLIFT, CONVEYOR, TUGGER, CARRIER |
| maximumLoadMass | number | ✅ | 최대 적재 가능 질량 |
| localizationTypes | array | ✅ | 현지화 유형에 대한 간략한 설명입니다. |
| navigationTypes | array | ✅ | 모바일 로봇이 지원하는 경로 계획 유형 목록(우선순위 기준) |
| supportedZones | array | ❌ | 모바일 로봇이 지원하는 영역 유형 배열입니다. |

### physicalParameters

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| minimumSpeed | number | ✅ | 이동 로봇의 최소 제어 연속 속도 |
| maximumSpeed | number | ✅ | 모바일 로봇의 최대 속도 |
| minimumAngularSpeed | number | ❌ | 모바일 로봇의 최소 제어 연속 회전 속도 |
| maximumAngularSpeed | number | ❌ | 모바일 로봇의 최대 회전 속도 |
| maximumAcceleration | number | ✅ | 최대 부하로 최대 가속 |
| maximumDeceleration | number | ✅ | 최대 부하 시 최대 감속 |
| minimumHeight | number | ✅ | 이동로봇의 최소 높이 |
| maximumHeight | number | ✅ | 모바일 로봇의 최대 높이 |
| width | number | ✅ | 모바일 로봇의 너비 |
| length | number | ✅ | 이동 로봇의 길이 |

### protocolLimits

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| maximumStringLengths | object | ✅ | 문자열의 최대 길이 |
| maximumArrayLengths | object | ✅ | 배열의 최대 길이 |
| timing | object | ✅ | 타이밍 정보 |

### maximumStringLengths

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| maximumMessageLength | integer | ❌ | 최대 MQTT 메시지 길이 |
| maximumTopicSerialLength | integer | ❌ | MQTT 주제의 일련번호 부분의 최대 길이입니다. 영향을 받는 매개변수: order.serialNumber, instantActions.serialNumber, state.SerialNumber, visualization.serialNumber, connection.serialNumber |
| maximumTopicElementLength | integer | ❌ | MQTT 주제의 다른 모든 부분의 최대 길이입니다. 영향을 받는 매개변수: order.timestamp, order.version, order.manufacturer, instantActions.timestamp, instantActions.version, instantActions.manufacturer, state.timestamp, state.version, state.manufacturer, visualization.timestamp, visualization.version, visualization.manufacturer, connection.timestamp, connection.version, connection.manufacturer |
| maximumIdLength | integer | ❌ | ID 문자열의 최대 길이. 영향을 받는 매개변수: order.orderId, node.nodeId, nodePosition.mapId, action.actionId, edge.edgeId |
| idNumericalOnly | boolean | ❌ | 실제 ID 문자열이 숫자 값만 포함해야 하는 경우 |
| maximumLoadIdLength | integer | ❌ | loadId 문자열의 최대 길이 |

### maximumArrayLengths

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| order.nodes | integer | ❌ | 모바일 로봇이 처리할 수 있는 Order당 최대 노드 수 |
| order.edges | integer | ❌ | 모바일 로봇이 처리할 수 있는 Order당 최대 edge 수 |
| node.actions | integer | ❌ | 모바일 로봇이 처리할 수 있는 노드당 최대 작업 수 |
| edge.actions | integer | ❌ | 모바일 로봇이 처리할 수 있는 엣지당 최대 작업 수 |
| actions.actionsParameters | integer | ❌ | 모바일 로봇이 처리할 수 있는 작업당 최대 매개변수 수 |
| instantActions | integer | ❌ | 모바일 로봇이 처리할 수 있는 메시지당 최대 인스턴트 작업 수 |
| trajectory.knotVector | integer | ❌ | 모바일 로봇이 처리할 수 있는 궤적당 최대 매듭 수 |
| trajectory.controlPoints | integer | ❌ | 모바일 로봇이 처리할 수 있는 궤적당 최대 제어점 수 |
| zoneSet.zones | integer | ❌ | 모바일 로봇이 처리할 수 있는 zoneSet당 최대 영역 수 |
| state.nodeStates | integer | ❌ | 모바일 로봇이 보내는 최대 nodeState 수, 모바일 로봇 기반의 최대 노드 수 |
| state.edgeStates | integer | ❌ | 모바일 로봇이 전송한 최대 edgeState 수, 모바일 로봇 베이스의 최대 가장자리 수 |
| state.loads | integer | ❌ | 모바일 로봇이 보내는 최대 로드 객체 수 |
| state.actionStates | integer | ❌ | 모바일 로봇이 전송하는 최대 actionState 수 |
| state.instantActionStates | integer | ❌ | 모바일 로봇이 전송하는 최대 instantActionStates 수 |
| state.zoneActionStates | integer | ❌ | 모바일 로봇이 전송하는 최대 zoneActionStates 수 |
| state.errors | integer | ❌ | 하나의 State 메시지에서 모바일 로봇이 보낸 최대 오류 수 |
| state.information | integer | ❌ | 하나의 State 메시지에서 이동 로봇이 보내는 최대 정보 개체 수 |
| error.errorReferences | integer | ❌ | 각 오류에 대해 모바일 로봇이 보낸 최대 오류 참조 수 |
| information.infoReferences | integer | ❌ | 각 정보에 대해 모바일 로봇이 보내는 최대 정보 참조 수 |

### timing

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| minimumOrderInterval | number | ✅ | 모바일 로봇에 Order 메시지를 보내는 최소 간격 |
| minimumStateInterval | number | ✅ | State 메시지 전송을 위한 최소 간격 |
| defaultStateInterval | number | ❌ | State 메시지 전송을 위한 기본 간격이 정의되지 않은 경우 기본 문서의 기본값이 사용됩니다. |
| visualizationInterval | number | ❌ | `visualization` 토픽에 대한 메시지 전송의 기본 간격 |

### protocolFeatures

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| optionalParameters | array | ✅ | 지원 및/또는 필수 선택적 매개변수 목록입니다. 여기에 나열되지 않은 선택적 매개변수는 모바일 로봇에서 지원되지 않는 것으로 가정됩니다. |
| mobileRobotActions | array | ✅ | 이 모바일 로봇이 지원하는 매개변수가 포함된 모든 작업 목록입니다. 여기에는 VDA 5050에 지정된 표준 조치와 제조업체별 조치가 포함됩니다. |

### .optionalParameters.items

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| parameter | string | ✅ | 선택적 매개변수의 전체 이름(예: “order.nodes.nodePosition.allowedDeviationTheta”) |
| support | enum | ✅ | 선택적 매개변수에 대한 지원 유형으로 다음 값이 가능합니다. SUPPORTED: 선택적 매개변수가 지정된 대로 지원됩니다. REQUIRED: 적절한 모바일 로봇 작동을 위해서는 선택적 매개변수가 필요합니다. |
| description | string | ❌ | 무료 텍스트. 선택적 매개변수에 대한 설명입니다. 예를 들어, 이 모바일 로봇 유형에 선택적 매개변수 '방향'이 필요한 이유와 여기에 포함될 수 있는 값 등이 있습니다. 매개변수 'nodeMarker'에는 부호 없는 정수 숫자만 포함되어야 합니다. Nurbs-Support는 직선과 원 세그먼트로 제한됩니다. |

### .mobileRobotActions.items

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| actionType | string | ✅ | action.actionType에 해당하는 고유한 actionType |
| actionDescription | string | ❌ | 자유 텍스트: 작업 설명 |
| actionScopes | array | ✅ | 이 작업 유형을 사용하기 위해 허용되는 범위 목록입니다. INSTANT: instantAction으로 사용 가능, NODE: 노드에서 사용 가능, EDGE: 엣지에서 사용 가능, ZONE: 존 액션으로 사용 가능. |
| actionParameters | array | ❌ | 매개변수의 Kist입니다. 정의되지 않은 경우 작업에 매개변수가 없습니다. |
| actionResult | string | ❌ | 자유 텍스트: 결과 설명 |
| blockingTypes | array | ❌ | 정의된 작업에 대해 가능한 차단 유형의 배열입니다. |
| pauseAllowed | string | ✅ | True: startPause를 통해 작업을 일시 중지할 수 있습니다. 거짓: 작업을 일시 중지할 수 없습니다. |
| cancelAllowed | string | ✅ | True: cancelOrder를 통해 작업을 취소할 수 있습니다. False: 작업을 취소할 수 없습니다. |

### .actionParameters.items

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| key | string | ✅ | 매개변수의 키-문자열 |
| valueDataType | enum | ✅ | Value의 데이터 유형, 가능한 데이터 유형은 BOOL, NUMBER, INTEGER, STRING, OBJECT, ARRAY입니다. |
| description | string | ❌ | 자유 텍스트: 매개변수 설명 |
| isOptional | boolean | ❌ | True: 선택적 매개변수 |

### mobileRobotGeometry

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| wheelDefinitions | array | ❌ | 바퀴 배열 및 형상이 포함된 바퀴 목록 |
| envelopes2d | array | ❌ |  |
| envelopes3d | array | ❌ | 3D 모바일 로봇 엔벨로프 곡선 목록(독일어: "Hüllkurven") |

### .wheelDefinitions.items

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| type | string | ✅ | 휠 유형. 확장 가능한 열거형: DRIVE, CASTER, FIXED, MECANUM |
| isActiveDriven | boolean | ✅ | True: 휠이 능동적으로 구동됩니다. |
| isActiveSteered | boolean | ✅ | True: 휠이 능동적으로 조향됩니다. |
| position | object | ✅ |  |
| diameter | number | ✅ | 휠의 공칭 직경 |
| width | number | ✅ | 휠의 공칭 폭 |
| centerDisplacement | number | ❌ | 휠 중심에서 회전점까지의 공칭 변위(캐스터 휠에 필요함). 매개변수가 정의되지 않은 경우 0으로 간주됩니다. |
| constraints | string | ❌ | 자유 텍스트: 제조업체가 제약 조건을 정의하는 데 사용할 수 있습니다. |

### position

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| x | number | ✅ | 모바일 로봇 좌표계의 X 위치 |
| y | number | ✅ | 모바일 로봇 좌표계의 Y 위치 |
| theta | number | ❌ | 이동 로봇 좌표계에서 바퀴 방향 고정 바퀴에 필요 |

### .envelopes2d.items

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| envelope2dId | string | ✅ | 엔벨로프 곡선 세트의 식별자입니다. |
| vertices | array | ✅ | 엔벨로프 곡선은 다각형으로 정의됩니다. 폐쇄된 것으로 간주됩니다. 단순한 다각형만 사용됩니다. |
| description | string | ❌ | 자유 텍스트: 엔벨로프 곡선 세트에 대한 설명 |

### .vertices.items

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| x | number | ✅ | 다각형 점의 X 위치 |
| y | number | ✅ | 다각형 점의 Y 위치 |

### .envelopes3d.items

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| envelope3dId | string | ✅ | 엔벨로프 곡선 세트의 식별자입니다. |
| format | string | ✅ | 데이터 형식(예: DXF) |
| data | object | ❌ | 3D 엔벨로프 곡선 데이터, '형식'에 지정된 형식 |
| url | string | ❌ | 3D 봉투 곡선 데이터를 다운로드하기 위한 프로토콜 및 URL 정의(예: ftp://xxx.yyy.com/ac4dgvhoif5tghji) |
| description | string | ❌ | 자유 텍스트: 엔벨로프 곡선 세트에 대한 설명 |

### loadSpecification

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| loadPositions | array | ❌ | 적재 위치/하물 취급 장치 목록. 이 목록에는 "state.loads[].loadPosition" 매개변수와 작업 선택 및 삭제의 작업 매개변수 "lhd"에 대한 유효한 값이 포함되어 있습니다. 이 목록이 존재하지 않거나 비어 있으면 모바일 로봇에 화물 처리 장치가 없는 것입니다. |
| loadSets | array | ❌ | 모바일 로봇이 처리할 수 있는 로드 세트 목록 |

### .loadSets.items

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| setName | string | ✅ | 로드 세트의 고유 이름(예: DEFAULT, SET1, ...) |
| loadType | string | ✅ | 부하 유형(예: EPAL, XLT1200, …) |
| loadPositions | array | ❌ | 로드 위치 목록 btw. 화물 취급 장치에 대해 이 로드 세트가 유효합니다. 이 매개변수가 존재하지 않거나 비어 있으면 이 로드 세트는 이 모바일 로봇의 모든 하중 처리 장치에 유효합니다. |
| boundingBoxReference | object | ❌ | State 메시지의 매개변수 load[]에 정의된 경계 상자 참조 |
| loadDimensions | object | ❌ |  |
| maximumWeight | number | ❌ | 적재 유형의 최대 중량 |
| minimumLoadhandlingHeight | number | ❌ | 이 하중 유형 및 중량을 취급하는 데 허용되는 최소 높이입니다. 경계 상자 참조에 대한 참조 |
| maximumLoadhandlingHeight | number | ❌ | 이 하중 유형 및 중량을 취급하는 데 허용되는 최대 높이입니다. 경계 상자 참조에 대한 참조 |
| minimumLoadhandlingDepth | number | ❌ | 이 하중 유형 및 –중량에 허용되는 최소 깊이입니다. 경계 상자 참조에 대한 참조 |
| maximumLoadhandlingDepth | number | ❌ | 이 하중 유형 및 무게에 허용되는 최대 깊이입니다. 경계 상자 참조에 대한 참조 |
| minimumLoadhandlingTilt | number | ❌ | 이 하중 유형 및 중량에 대해 허용되는 최소 기울기 |
| maximumLoadhandlingTilt | number | ❌ | 이 하중 유형 및 무게에 대해 허용되는 최대 기울기 |
| maximumSpeed | number | ❌ | 이 하중 유형 및 중량에 허용되는 최대 속도 |
| maximumAcceleration | number | ❌ | 이 하중 유형 및 중량에 대해 허용되는 최대 가속도 |
| maximumDeceleration | number | ❌ | 이 하중 유형 및 중량에 대해 허용되는 최대 감속 |
| pickTime | number | ❌ | 짐을 집는 데 걸리는 대략적인 시간 |
| dropTime | number | ❌ | 부하를 떨어뜨리는 대략적인 시간 |
| description | string | ❌ | 화물 처리 세트에 대한 자유 텍스트 설명 |

### boundingBoxReference

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| x | number | ✅ | 참조점의 X 좌표입니다. |
| y | number | ✅ | 참조점의 Y 좌표입니다. |
| z | number | ✅ | 참조점의 Z 좌표입니다. |
| theta | number | ❌ | 하중 경계 상자의 방향입니다. 예인선 등에 중요합니다. |

### loadDimensions

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| length | number | ✅ | 하중 경계 상자의 절대 길이(모바일 로봇 좌표계의 X축을 따른)(미터)입니다. |
| width | number | ✅ | 로드 경계 상자의 절대 너비(모바일 로봇 좌표계의 y축을 따른)(미터)입니다. |
| height | number | ❌ | 로드 경계 상자의 절대 높이입니다. 선택사항: 알려진 경우에만 값을 설정하세요. |

### mobileRobotConfiguration

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| versions | array | ❌ | 모바일 로봇에서 실행되는 다양한 하드웨어 및 소프트웨어 버전을 포함하는 배열입니다. |
| network | object | ❌ | 모바일 로봇의 네트워크 연결에 대한 정보입니다. 나열된 정보는 모바일 로봇이 작동하는 동안 업데이트되지 않습니다. |
| batteryCharging  | object | ❌ | 배터리 충전 매개변수에 대한 정보입니다. |

### .versions.items

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| key | string | ✅ | 버전의 키입니다. |
| value | string | ✅ | 버전의 값입니다. |

### network

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| dnsServers | array | ❌ | 모바일 로봇이 사용하는 DNS 서버 목록입니다. |
| ntpServers | array | ❌ | 모바일 로봇이 사용하는 NTP 서버 목록입니다. |
| localIpAddress | string | ❌ | MQTT 브로커와 통신하는 데 사용되는 모바일 로봇의 사전 할당된 IP 주소입니다. 이 IP 주소는 작업 중에 수정/변경되어서는 안 됩니다. |
| netmask | string | ❌ | 네트워크 서브넷 마스크. |
| defaultGateway | string | ❌ | 모바일 로봇이 사용하는 기본 게이트웨이입니다. |

### batteryCharging 

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| criticalLowChargingLevel | number | ❌ | 차량 제어가 모바일 로봇에게 충전소로 명령을 내리는 명령만 보내야 하는 임계 충전 수준(%)을 지정합니다. |
| minimumDesiredChargingLevel | number | ❌ | 원하는 최소 충전 수준을 백분율로 지정합니다. |
| maximumDesiredChargingLevel | number | ❌ | 원하는 최대 충전 수준을 백분율로 지정합니다. |
| minimumChargingTime | number | ❌ | 원하는 최소 충전 시간을 초 단위로 지정합니다. |

  </template>
  <template #en>

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| headerId | integer | ✅ | Header ID of the message. The headerId is defined per topic and incremented by 1 with each sent (but not necessarily received) message. |
| timestamp | string | ✅ | Timestamp in ISO8601 format (YYYY-MM-DDTHH:mm:ss.fffZ). |
| version | string | ✅ | Version of the protocol [Major].[Minor].[Patch] |
| manufacturer | string | ✅ | Manufacturer of the mobile robot |
| serialNumber | string | ✅ | Serial number of the mobile robot |
| typeSpecification | object | ✅ | These parameters generally specify the class and the capabilities of the mobile robot |
| physicalParameters | object | ✅ | These parameters specify the basic physical properties of the mobile robot |
| protocolLimits | object | ✅ | This JSON-object describes the protocol limitations of the mobile robot. If a parameter is not defined or set to zero then there is no explicit limit for this parameter. |
| protocolFeatures | object | ✅ | Supported features of VDA5050 protocol |
| mobileRobotGeometry | object | ✅ | Detailed definition of mobile robot geometry |
| loadSpecification | object | ✅ | Abstract specification of load capabilities |
| mobileRobotConfiguration | object | ❌ |  |

### typeSpecification

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| seriesName | string | ✅ | Free text generalized series name as specified by manufacturer |
| seriesDescription | string | ❌ | Free text human readable description of the mobile robot type series |
| mobileRobotKinematics | string | ❌ | Simplified description of mobile robots kinematics-type. Extensible enum: DIFFERENTIAL, OMNIDIRECTIONAL, THREE_WHEEL |
| mobileRobotClass | string | ✅ | Simplified description of mobile robot class. Extensible enum: FORKLIFT, CONVEYOR, TUGGER, CARRIER |
| maximumLoadMass | number | ✅ | Maximum loadable mass |
| localizationTypes | array | ✅ | Simplified description of localization type. |
| navigationTypes | array | ✅ | List of path planning types supported by the mobile robot, sorted by priority |
| supportedZones | array | ❌ | Array of zone types supported by the mobile robot. |

### physicalParameters

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| minimumSpeed | number | ✅ | Minimal controlled continuous speed of the mobile robot |
| maximumSpeed | number | ✅ | Maximum speed of the mobile robot |
| minimumAngularSpeed | number | ❌ | Minimal controlled continuous rotation speed of the mobile robot |
| maximumAngularSpeed | number | ❌ | Maximum rotation speed of the mobile robot |
| maximumAcceleration | number | ✅ | Maximum acceleration with maximum load |
| maximumDeceleration | number | ✅ | Maximum deceleration with maximum load |
| minimumHeight | number | ✅ | Minimum height of mobile robot |
| maximumHeight | number | ✅ | Maximum height of mobile robot |
| width | number | ✅ | Width of the mobile robot |
| length | number | ✅ | Length of the mobile robot |

### protocolLimits

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| maximumStringLengths | object | ✅ | Maximum lengths of strings |
| maximumArrayLengths | object | ✅ | Maximum lengths of arrays |
| timing | object | ✅ | Timing information |

### maximumStringLengths

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| maximumMessageLength | integer | ❌ | Maximum MQTT Message length |
| maximumTopicSerialLength | integer | ❌ | Maximum length of serial-number part in MQTT-topics. Affected Parameters: order.serialNumber, instantActions.serialNumber, state.SerialNumber, visualization.serialNumber, connection.serialNumber |
| maximumTopicElementLength | integer | ❌ | Maximum length of all other parts in MQTT-topics. Affected parameters: order.timestamp, order.version, order.manufacturer, instantActions.timestamp, instantActions.version, instantActions.manufacturer, state.timestamp, state.version, state.manufacturer, visualization.timestamp, visualization.version, visualization.manufacturer, connection.timestamp, connection.version, connection.manufacturer |
| maximumIdLength | integer | ❌ | Maximum length of ID-Strings. Affected parameters: order.orderId, node.nodeId, nodePosition.mapId, action.actionId, edge.edgeId |
| idNumericalOnly | boolean | ❌ | If true ID-strings need to contain numerical values only |
| maximumLoadIdLength | integer | ❌ | Maximum length of loadId Strings |

### maximumArrayLengths

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| order.nodes | integer | ❌ | Maximum number of nodes per order processable by the mobile robot |
| order.edges | integer | ❌ | Maximum number of edges per order processable by the mobile robot |
| node.actions | integer | ❌ | Maximum number of actions per node processable by the mobile robot |
| edge.actions | integer | ❌ | Maximum number of actions per edge processable by the mobile robot |
| actions.actionsParameters | integer | ❌ | Maximum number of parameters per action processable by the mobile robot |
| instantActions | integer | ❌ | Maximum number of instant actions per message processable by the mobile robot |
| trajectory.knotVector | integer | ❌ | Maximum number of knots per trajectory processable by the mobile robot |
| trajectory.controlPoints | integer | ❌ | Maximum number of control points per trajectory processable by the mobile robot |
| zoneSet.zones | integer | ❌ | Maximum number of zones per zoneSet processable by the mobile robot |
| state.nodeStates | integer | ❌ | Maximum number of nodeStates sent by the mobile robot, maximum number of nodes in base of mobile robot |
| state.edgeStates | integer | ❌ | Maximum number of edgeStates sent by the mobile robot, maximum number of edges in base of mobile robot |
| state.loads | integer | ❌ | Maximum number of load-objects sent by the mobile robot |
| state.actionStates | integer | ❌ | Maximum number of actionStates sent by the mobile robot |
| state.instantActionStates | integer | ❌ | Maximum number of instantActionStates sent by the mobile robot |
| state.zoneActionStates | integer | ❌ | Maximum number of zoneActionStates sent by the mobile robot |
| state.errors | integer | ❌ | Maximum number of errors sent by the mobile robot in one state-message |
| state.information | integer | ❌ | Maximum number of information objects sent by the mobile robot in one state-message |
| error.errorReferences | integer | ❌ | Maximum number of error references sent by the mobile robot for each error |
| information.infoReferences | integer | ❌ | Maximum number of info references sent by the mobile robot for each information |

### timing

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| minimumOrderInterval | number | ✅ | Minimum interval sending order messages to the mobile robot |
| minimumStateInterval | number | ✅ | Minimum interval for sending state-messages |
| defaultStateInterval | number | ❌ | Default interval for sending state-messages if not defined, the default value from the main document is used |
| visualizationInterval | number | ❌ | Default interval for sending messages on visualization topic |

### protocolFeatures

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| optionalParameters | array | ✅ | List of supported and/or required optional parameters. Optional parameters, that are not listed here, are assumed to be not supported by the mobile robot. |
| mobileRobotActions | array | ✅ | List of all actions with parameters supported by this mobile robot. This includes standard actions specified in VDA 5050 and manufacturer-specific actions |

### .optionalParameters.items

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| parameter | string | ✅ | Full name of optional parameter, e.g., “order.nodes.nodePosition.allowedDeviationTheta” |
| support | enum | ✅ | Type of support for the optional parameter, the following values are possible: SUPPORTED: optional parameter is supported like specified. REQUIRED: optional parameter is required for proper mobile robot operation. |
| description | string | ❌ | Free text. Description of optional parameter. E.g., reason, why the optional parameter ‚direction‘ is necessary for this mobile robot type and which values it can contain. The parameter ‘nodeMarker’ must contain unsigned interger-numbers only. Nurbs-Support is limited to straight lines and circle segments. |

### .mobileRobotActions.items

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| actionType | string | ✅ | Unique actionType corresponding to action.actionType |
| actionDescription | string | ❌ | Free text: description of the action |
| actionScopes | array | ✅ | List of allowed scopes for using this action-type. INSTANT: usable as instantAction, NODE: usable on nodes, EDGE: usable on edges, ZONE: usable as zone action. |
| actionParameters | array | ❌ | Kist of parameters. if not defined, the action has no parameters |
| actionResult | string | ❌ | Free text: description of the result |
| blockingTypes | array | ❌ | Array of possible blocking types for defined action. |
| pauseAllowed | string | ✅ | True: action can be paused via startPause. False: action cannot be paused. |
| cancelAllowed | string | ✅ | True: action can be cancelled via cancelOrder. False: action cannot be cancelled. |

### .actionParameters.items

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| key | string | ✅ | Key-String for Parameter |
| valueDataType | enum | ✅ | Data type of Value, possible data types are: BOOL, NUMBER, INTEGER, STRING, OBJECT, ARRAY |
| description | string | ❌ | Free text: description of the parameter |
| isOptional | boolean | ❌ | True: optional parameter |

### mobileRobotGeometry

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| wheelDefinitions | array | ❌ | List of wheels, containing wheel-arrangement and geometry |
| envelopes2d | array | ❌ |  |
| envelopes3d | array | ❌ | List of mobile robot envelope curves in 3D (german: „Hüllkurven“) |

### .wheelDefinitions.items

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| type | string | ✅ | Wheel type. Extensible enum: DRIVE, CASTER, FIXED, MECANUM |
| isActiveDriven | boolean | ✅ | True: wheel is actively driven |
| isActiveSteered | boolean | ✅ | True: wheel is actively steered |
| position | object | ✅ |  |
| diameter | number | ✅ | Nominal diameter of wheel |
| width | number | ✅ | Nominal width of wheel |
| centerDisplacement | number | ❌ | Nominal displacement of the wheel’s center to the rotation point (necessary for caster wheels). If the parameter is not defined, it is assumed to be 0 |
| constraints | string | ❌ | Free text: can be used by the manufacturer to define constraints |

### position

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| x | number | ✅ | X-position in mobile robot coordinate system |
| y | number | ✅ | Y-position in mobile robot coordinate system |
| theta | number | ❌ | Orientation of wheel in mobile robot coordinate system Necessary for fixed wheels |

### .envelopes2d.items

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| envelope2dId | string | ✅ | Identifier of the envelope curve set. |
| vertices | array | ✅ | The envelope curve in defined as a polygon. It shall be assumed as closed. Only simple polygons shall be used. |
| description | string | ❌ | Free text: description of envelope curve set |

### .vertices.items

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| x | number | ✅ | X-position of polygon-point |
| y | number | ✅ |  Y-position of polygon-point |

### .envelopes3d.items

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| envelope3dId | string | ✅ | Identifier of the envelope curve set. |
| format | string | ✅ | Format of data, e.g., DXF |
| data | object | ❌ | 3D-envelope curve data, format specified in ‚format‘ |
| url | string | ❌ | Protocol and url-definition for downloading the 3D-envelope curve data, e.g., ftp://xxx.yyy.com/ac4dgvhoif5tghji |
| description | string | ❌ | Free text: description of envelope curve set |

### loadSpecification

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| loadPositions | array | ❌ | List of load positions / load handling devices. This lists contains the valid values for the parameter “state.loads[].loadPosition” and for the action parameter “lhd” of the actions pick and drop. If this list doesn’t exist or is empty, the mobile robot has no load handling device. |
| loadSets | array | ❌ | List of load-sets that can be handled by the mobile robot |

### .loadSets.items

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| setName | string | ✅ | Unique name of the load set, e.g., DEFAULT, SET1, ... |
| loadType | string | ✅ | Type of load e.g., EPAL, XLT1200, …. |
| loadPositions | array | ❌ | List of load positions btw. load handling devices, this load-set is valid for. If this parameter does not exist or is empty, this load-set is valid for all load handling devices on this mobile robot. |
| boundingBoxReference | object | ❌ | Bounding box reference as defined in parameter loads[] in state-message |
| loadDimensions | object | ❌ |  |
| maximumWeight | number | ❌ | Maximum weight of loadtype |
| minimumLoadhandlingHeight | number | ❌ | Minimum allowed height for handling of this load-type and –weight. References to boundingBoxReference |
| maximumLoadhandlingHeight | number | ❌ | Maximum allowed height for handling of this load-type and –weight. references to boundingBoxReference |
| minimumLoadhandlingDepth | number | ❌ | Minimum allowed depth for this load-type and –weight. references to boundingBoxReference |
| maximumLoadhandlingDepth | number | ❌ | Maximum allowed depth for this load-type and –weight. references to boundingBoxReference |
| minimumLoadhandlingTilt | number | ❌ | Minimum allowed tilt for this load-type and –weight |
| maximumLoadhandlingTilt | number | ❌ | Maximum allowed tilt for this load-type and –weight |
| maximumSpeed | number | ❌ | Maximum allowed speed for this load-type and –weight |
| maximumAcceleration | number | ❌ | Maximum allowed acceleration for this load-type and –weight |
| maximumDeceleration | number | ❌ | Maximum allowed deceleration for this load-type and –weight |
| pickTime | number | ❌ | Approximate time for picking up the load |
| dropTime | number | ❌ | Approximate time for dropping the load |
| description | string | ❌ | Free text description of the load handling set |

### boundingBoxReference

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| x | number | ✅ | X-coordinate of the point of reference. |
| y | number | ✅ | Y-coordinate of the point of reference. |
| z | number | ✅ | Z-coordinate of the point of reference. |
| theta | number | ❌ | Orientation of the loads bounding box. Important for tugger trains, etc. |

### loadDimensions

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| length | number | ✅ | Absolute length (along the mobile robot’s coordinate system’s x-axis) of the load's bounding box in meters. |
| width | number | ✅ | Absolute width (along the mobile robot’s coordinate system’s y-axis) of the load's bounding box in meters. |
| height | number | ❌ | Absolute height of the load´s bounding box. Optional: Set value only if known. |

### mobileRobotConfiguration

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| versions | array | ❌ | Array containing various hardware and software versions running on the mobile robot. |
| network | object | ❌ | Information about the mobile robot's network connection. The listed information shall not be updated while the mobile robot is operating. |
| batteryCharging  | object | ❌ | Information about battery charging parameters. |

### .versions.items

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| key | string | ✅ | The key of the version. |
| value | string | ✅ | The value of the version. |

### network

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| dnsServers | array | ❌ | List of DNS servers used by the mobile robot. |
| ntpServers | array | ❌ | List of NTP servers used by the mobile robot. |
| localIpAddress | string | ❌ | A priori assigned IP address of the mobile robot used to communicate with the MQTT broker. Note that this IP address should not be modified/changed during operations. |
| netmask | string | ❌ | Network subnet mask. |
| defaultGateway | string | ❌ | Default gateway used by the mobile robot. |

### batteryCharging 

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| criticalLowChargingLevel | number | ❌ | Specifies the critical charging level in percent at or below which the fleet control should only send orders that command the mobile robot to a charging station. |
| minimumDesiredChargingLevel | number | ❌ | Specifies the minimum desired charging level in percent. |
| maximumDesiredChargingLevel | number | ❌ | Specifies the maximum desired charging level in percent. |
| minimumChargingTime | number | ❌ | Specifies the desired minimum charging time in seconds. |

  </template>
</BilingualSection>

## 스키마 원문

<BilingualSection>
  <template #ko>

```json
{
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "title": "Mobile Robot Factsheet",
    "description": "The factsheet provides basic information about a specific mobile robot type series. This information allows comparison of different mobile robot types and can be applied for the planning, dimensioning and simulation of a mobile robot system. The factsheet also includes information about mobile robot communication interfaces which are required for the integration of a mobile robot type series into a VD[M]A-5050-compliant fleet control.",
    "required": [
        "headerId",
        "timestamp",
        "version",
        "manufacturer",
        "serialNumber",
        "typeSpecification",
        "physicalParameters",
        "protocolLimits",
        "protocolFeatures",
        "mobileRobotGeometry",
        "loadSpecification"
    ],
    "subtopic": "/factsheet",
    "type": "object",
    "properties":{
        "headerId": {
            "type": "integer",
            "description": "Header ID of the message. The headerId is defined per topic and incremented by 1 with each sent (but not necessarily received) message.",
            "minimum": 0
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
            "title": "Version",
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
            "description": "Serial number of the mobile robot"
        },
        "typeSpecification": {
            "type": "object",
            "required": [
                "seriesName",
                "mobileRobotKinematic",
                "mobileRobotClass",
                "maximumLoadMass",
                "localizationTypes",
                "navigationTypes"
            ],
            "description": "These parameters generally specify the class and the capabilities of the mobile robot",
            "properties": {
                "seriesName": {
                    "type": "string",
                    "description": "Free text generalized series name as specified by manufacturer"
                },
                "seriesDescription": {
                    "type": "string",
                    "description": "Free text human readable description of the mobile robot type series"
                },
                "mobileRobotKinematics": {
                    "type": "string",
                    "description": "Simplified description of mobile robots kinematics-type. Extensible enum: DIFFERENTIAL, OMNIDIRECTIONAL, THREE_WHEEL"
                },
                "mobileRobotClass": {
                    "type": "string",
                    "description": "Simplified description of mobile robot class. Extensible enum: FORKLIFT, CONVEYOR, TUGGER, CARRIER"
                },
                "maximumLoadMass": {
                    "type": "number",
                    "description": "Maximum loadable mass",
                    "unit": "kg",
                    "minimum": 0
                },
                "localizationTypes": {
                    "type": "array",
                    "description": "Simplified description of localization type.",
                    "items": {
                        "type": "string",
                        "description": "Simplified description of localization type. Extensible enum: NATURAL, REFLECTOR, RFID, DMC, SPOT, GRID"
                    }
                },
                "navigationTypes": {
                    "type": "array",
                    "description": "List of path planning types supported by the mobile robot, sorted by priority",
                    "items": {
                        "type": "string",
						"description": "Planning type. Extensible enum: PHYSICAL_LINE_GUIDED, VIRTUAL_LINE_GUIDED, FREELY_NAVIGATING"
                    }
                },
                "supportedZones": {
                    "type": "array",
                    "description": "Array of zone types supported by the mobile robot.",
                    "items": {
                        "type": "string",
                        "enum": [
                            "BLOCKED", 
                            "LINE_GUIDED", 
                            "RELEASE", 
                            "COORDINATED_REPLANNING", 
                            "SPEED_LIMIT", 
                            "ACTION", 
                            "PRIORITY", 
                            "PENALTY", 
                            "DIRECTED", 
                            "BIDIRECTED"
                        ]
                    }
                }
            }
        },
        "physicalParameters": {
            "type": "object",
            "required": [
                "minimumSpeed",
                "maximumSpeed",
                "maximumAcceleration",
                "maximumDeceleration",
                "minimumHeight",
                "maximumHeight",
                "width",
                "length"
            ],
            "description": "These parameters specify the basic physical properties of the mobile robot",
            "properties": {
                "minimumSpeed": {
                    "type": "number",
                    "description": "Minimal controlled continuous speed of the mobile robot",
                    "unit": "m/s",
					"minimum": 0.0
                },
                "maximumSpeed": {
                    "type": "number",
                    "description": "Maximum speed of the mobile robot",
                    "unit": "m/s",
					"minimum": 0.0
                },
                "minimumAngularSpeed": {
                    "type": "number",
                    "description": "Minimal controlled continuous rotation speed of the mobile robot",
                    "unit": "rad/s",
					"minimum": 0.0
                },
                "maximumAngularSpeed": {
                    "type": "number",
                    "description": "Maximum rotation speed of the mobile robot",
                    "unit": "rad/s",
					"minimum": 0.0
                },
                "maximumAcceleration": {
                    "type": "number",
                    "description": "Maximum acceleration with maximum load",
                    "unit": "m/s^2",
					"minimum": 0.0
                },
                "maximumDeceleration": {
                    "type": "number",
                    "description": "Maximum deceleration with maximum load",
                    "unit": "m/s^2"
                },
                "minimumHeight": {
                    "type": "number",
                    "description": "Minimum height of mobile robot",
                    "unit": "m",
                },
                "maximumHeight": {
                    "type": "number",
                    "description": "Maximum height of mobile robot",
                    "unit": "m",
                },
                "width": {
                    "type": "number",
                    "description": "Width of the mobile robot",
                    "unit": "m",
                },
                "length": {
                    "type": "number",
                    "description": "Length of the mobile robot",
                    "unit": "m",
                }
            }
        },
        "protocolLimits": {
            "type": "object",
            "required": [
                "maximumStringLengths",
                "maximumArrayLengths",
                "timing"
            ],
            "description": "This JSON-object describes the protocol limitations of the mobile robot. If a parameter is not defined or set to zero then there is no explicit limit for this parameter.",
            "properties": {
                "maximumStringLengths": {
                    "type": "object",
                    "description": "Maximum lengths of strings",
                    "properties": {
                        "maximumMessageLength": {
                            "type": "integer",
                            "description": "Maximum MQTT Message length",
							"minimum": 0
                        },
                        "maximumTopicSerialLength": {
                            "type": "integer",
                            "description": "Maximum length of serial-number part in MQTT-topics. Affected Parameters: order.serialNumber, instantActions.serialNumber, state.SerialNumber, visualization.serialNumber, connection.serialNumber",
							"minimum": 0
                        },
                        "maximumTopicElementLength": {
                            "type": "integer",
                            "description": "Maximum length of all other parts in MQTT-topics. Affected parameters: order.timestamp, order.version, order.manufacturer, instantActions.timestamp, instantActions.version, instantActions.manufacturer, state.timestamp, state.version, state.manufacturer, visualization.timestamp, visualization.version, visualization.manufacturer, connection.timestamp, connection.version, connection.manufacturer",
							"minimum": 0
                        },
                        "maximumIdLength": {
                            "type": "integer",
                            "description": "Maximum length of ID-Strings. Affected parameters: order.orderId, node.nodeId, nodePosition.mapId, action.actionId, edge.edgeId",
							"minimum": 0
                        },
                        "idNumericalOnly": {
                            "type": "boolean",
                            "description": "If true ID-strings need to contain numerical values only"
                        },
                        "maximumLoadIdLength": {
                            "type": "integer",
                            "description": "Maximum length of loadId Strings",
							"minimum": 0
                        }
                    }
                },
                "maximumArrayLengths": {
                    "type": "object",
                    "description": "Maximum lengths of arrays",
                    "properties": {
                        "order.nodes": {
                            "type": "integer",
                            "description": "Maximum number of nodes per order processable by the mobile robot",
							"minimum": 0
                        },
                        "order.edges": {
                            "type": "integer",
                            "description": "Maximum number of edges per order processable by the mobile robot",
							"minimum": 0
                        },
                        "node.actions": {
                            "type": "integer",
                            "description": "Maximum number of actions per node processable by the mobile robot",
							"minimum": 0
                        },
                        "edge.actions": {
                            "type": "integer",
                            "description": "Maximum number of actions per edge processable by the mobile robot",
							"minimum": 0
                        },
                        "actions.actionsParameters": {
                            "type": "integer",
                            "description": "Maximum number of parameters per action processable by the mobile robot",
							"minimum": 0
                        },
                        "instantActions": {
                            "type": "integer",
                            "description": "Maximum number of instant actions per message processable by the mobile robot",
							"minimum": 0
                        },
                        "trajectory.knotVector": {
                            "type": "integer",
                            "description": "Maximum number of knots per trajectory processable by the mobile robot",
							"minimum": 0
                        },
                        "trajectory.controlPoints": {
                            "type": "integer",
                            "description": "Maximum number of control points per trajectory processable by the mobile robot",
							"minimum": 0
                        },
                        "zoneSet.zones": {
                            "type": "integer",
                            "description": "Maximum number of zones per zoneSet processable by the mobile robot",
							"minimum": 0
                        },
                        "state.nodeStates": {
                            "type": "integer",
                            "description": "Maximum number of nodeStates sent by the mobile robot, maximum number of nodes in base of mobile robot",
							"minimum": 0
                        },
                        "state.edgeStates": {
                            "type": "integer",
                            "description": "Maximum number of edgeStates sent by the mobile robot, maximum number of edges in base of mobile robot",
							"minimum": 0
                        },
                        "state.loads": {
                            "type": "integer",
                            "description": "Maximum number of load-objects sent by the mobile robot",
							"minimum": 0
                        },
                        "state.actionStates": {
                            "type": "integer",
                            "description": "Maximum number of actionStates sent by the mobile robot",
							"minimum": 0
                        },
                        "state.instantActionStates": {
                            "type": "integer",
                            "description": "Maximum number of instantActionStates sent by the mobile robot",
							"minimum": 0
                        },
                        "state.zoneActionStates": {
                            "type": "integer",
                            "description": "Maximum number of zoneActionStates sent by the mobile robot",
							"minimum": 0
                        },
                        "state.errors": {
                            "type": "integer",
                            "description": "Maximum number of errors sent by the mobile robot in one state-message",
							"minimum": 0
                        },
                        "state.information": {
                            "type": "integer",
                            "description": "Maximum number of information objects sent by the mobile robot in one state-message",
							"minimum": 0
                        },
                        "error.errorReferences": {
                            "type": "integer",
                            "description": "Maximum number of error references sent by the mobile robot for each error",
							"minimum": 0
                        },
                        "information.infoReferences": {
                            "type": "integer",
                            "description": "Maximum number of info references sent by the mobile robot for each information",
							"minimum": 0
                        }
                    }
                },
                "timing": {
                    "type": "object",
                    "required": [
                        "minimumOrderInterval",
                        "minimumStateInterval"
                    ],
                    "description": "Timing information",
                    "properties": {
                        "minimumOrderInterval": {
                            "type": "number",
                            "description": "Minimum interval sending order messages to the mobile robot",
                            "unit": "s",
							"minimum": 0.0
                        },
                        "minimumStateInterval": {
                            "type": "number",
                            "description": "Minimum interval for sending state-messages",
                            "unit": "s",
							"minimum": 0.0
                        },
                        "defaultStateInterval": {
                            "type": "number",
                            "description": "Default interval for sending state-messages if not defined, the default value from the main document is used",
                            "unit": "s",
							"minimum": 0.0
                        },
                        "visualizationInterval": {
                            "type": "number",
                            "description": "Default interval for sending messages on visualization topic",
                            "unit": "s",
							"minimum": 0.0
                        }
                    }
                }
            }
        },
        "protocolFeatures": {
            "type": "object",
            "required": [
                "optionalParameters",
                "mobileRobotActions"
            ],
            "description": "Supported features of VDA5050 protocol",
            "properties": {
                "optionalParameters": {
                    "type": "array",
                    "description": "List of supported and/or required optional parameters. Optional parameters, that are not listed here, are assumed to be not supported by the mobile robot.",
                    "items": {
                        "type": "object",
                        "required": [
                            "parameter",
                            "support"
                        ],
                        "properties": {
                            "parameter": {
                                "type": "string",
                                "description": "Full name of optional parameter, e.g., “order.nodes.nodePosition.allowedDeviationTheta”"
                            },
                            "support": {
                                "type": "string",
                                "description": "Type of support for the optional parameter, the following values are possible: SUPPORTED: optional parameter is supported like specified. REQUIRED: optional parameter is required for proper mobile robot operation.",
                                "enum": [
                                    "SUPPORTED",
                                    "REQUIRED"
                                ]
                            },
                            "description": {
                                "type": "string",
                                "description": "Free text. Description of optional parameter. E.g., reason, why the optional parameter ‚direction‘ is necessary for this mobile robot type and which values it can contain. The parameter ‘nodeMarker’ must contain unsigned interger-numbers only. Nurbs-Support is limited to straight lines and circle segments."
                            }
                        }
                    }
                },
                "mobileRobotActions": {
                    "type": "array",
                    "description": "List of all actions with parameters supported by this mobile robot. This includes standard actions specified in VDA 5050 and manufacturer-specific actions",
                    "items": {
                        "required": [
                            "actionType",
                            "actionScopes",
                            "pauseAllowed",
                            "cancelAllowed"
                        ],
                        "type": "object",
                        "properties": {
                            "actionType": {
                                "type": "string",
                                "description": "Unique actionType corresponding to action.actionType"
                            },
                            "actionDescription": {
                                "type": "string",
                                "description": "Free text: description of the action"
                            },
                            "actionScopes": {
                                "type": "array",
                                "description": "List of allowed scopes for using this action-type. INSTANT: usable as instantAction, NODE: usable on nodes, EDGE: usable on edges, ZONE: usable as zone action.",
                                "items": {
                                    "type": "string",
                                    "enum": [
                                        "INSTANT",
                                        "NODE",
                                        "EDGE",
                                        "ZONE"
                                    ]
                                }
                            },
                            "actionParameters": {
                                "type": "array",
                                "description": "Kist of parameters. if not defined, the action has no parameters",
                                "items": {
                                    "type": "object",
                                    "required": [
                                        "key",
                                        "valueDataType"
                                    ],
                                    "properties": {
                                        "key": {
                                            "type": "string",
                                            "description": "Key-String for Parameter"
                                        },
                                        "valueDataType": {
                                            "type": "string",
                                            "description": "Data type of Value, possible data types are: BOOL, NUMBER, INTEGER, STRING, OBJECT, ARRAY",
                                            "enum": [
                                                "BOOL",
                                                "NUMBER",
                                                "INTEGER",
                                                "STRING",
                                                "OBJECT",
                                                "ARRAY"
                                            ]
                                        },
                                        "description": {
                                            "type": "string",
                                            "description": "Free text: description of the parameter"
                                        },
                                        "isOptional": {
                                            "type": "boolean",
                                            "description": "True: optional parameter"
                                        }
                                    }
                                }
                            },
                            "actionResult": {
                                "type": "string",
                                "description": "Free text: description of the result"
                            },
                            "blockingTypes": {
                                "type": "array",
                                "description": "Array of possible blocking types for defined action.",
                                "items": {
                                   "type":"string",
                                   "enum": [
                                      "NONE",
                                      "SOFT",
                                      "SINGLE",
                                      "HARD"
                                   ]
                                }
                            },
                            "pauseAllowed": {
                                "type": "string",
                                "description": "True: action can be paused via startPause. False: action cannot be paused."
                            },
                            "cancelAllowed": {
                                "type": "string",
                                "description": "True: action can be cancelled via cancelOrder. False: action cannot be cancelled."
                            }
                        }
                    }
                }
            }
        },
        "mobileRobotGeometry": {
            "type": "object",
            "description": "Detailed definition of mobile robot geometry",
            "properties": {
                "wheelDefinitions": {
                    "type": "array",
                    "description": "List of wheels, containing wheel-arrangement and geometry",
                    "items": {
                        "type": "object",
                        "required": [
                            "type",
                            "isActiveDriven",
                            "isActiveSteered",
                            "position",
                            "diameter",
                            "width"
                        ],
                        "properties": {
                            "type": {
                                "type": "string",
                                "description": "Wheel type. Extensible enum: DRIVE, CASTER, FIXED, MECANUM"
                            },
                            "isActiveDriven": {
                                "type": "boolean",
                                "description": "True: wheel is actively driven"
                            },
                            "isActiveSteered": {
                                "type": "boolean",
                                "description": "True: wheel is actively steered"
                            },
                            "position": {
                                "type": "object",
                                "required": [
                                    "x",
                                    "y"
                                ],
                                "properties": {
                                    "x": {
                                        "type": "number",
                                        "description": "X-position in mobile robot coordinate system",
                                        "unit": "m"
                                    },
                                    "y": {
                                        "type": "number",
                                        "description": "Y-position in mobile robot coordinate system",
                                        "unit": "m"
                                    },
                                    "theta": {
                                        "type": "number",
                                        "description": "Orientation of wheel in mobile robot coordinate system Necessary for fixed wheels",
                                        "unit": "rad"
                                    }
                                }
                            },
                            "diameter": {
                                "type": "number",
                                "description": "Nominal diameter of wheel",
                                "unit": "m"
                            },
                            "width": {
                                "type": "number",
                                "description": "Nominal width of wheel",
                                "unit": "m"
                            },
                            "centerDisplacement": {
                                "type": "number",
                                "unit": "m",
                                "description": "Nominal displacement of the wheel’s center to the rotation point (necessary for caster wheels). If the parameter is not defined, it is assumed to be 0"
                            },
                            "constraints": {
                                "type": "string",
                                "description": "Free text: can be used by the manufacturer to define constraints"
                            }
                        }
                    }
                },
                "envelopes2d": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "required": [
                            "envelope2dId",
                            "vertices"
                        ],
                        "properties": {
                            "envelope2dId": {
                                "type": "string",
                                "description": "Identifier of the envelope curve set."
                            },
                            "vertices": {
                                "type": "array",
                                "description": "The envelope curve in defined as a polygon. It shall be assumed as closed. Only simple polygons shall be used.",
                                "items": {
                                    "type": "object",
                                    "required": [
                                        "x",
                                        "y"
                                    ],
                                    "properties": {
                                        "x": {
                                            "type": "number",
                                            "description": "X-position of polygon-point",
                                            "unit": "m"
                                        },
                                        "y": {
                                            "type": "number",
                                            "description": " Y-position of polygon-point",
                                            "unit": "m"
                                        }
                                    }
                                }
                            },
                            "description": {
                                "type": "string",
                                "description": "Free text: description of envelope curve set"
                            }
                        }
                    }
                },
                "envelopes3d": {
                    "type": "array",
                    "description": "List of mobile robot envelope curves in 3D (german: „Hüllkurven“)",
                    "items": {
                        "type": "object",
                        "required": [
                            "envelope3dId",
                            "format"
                        ],
                        "properties": {
                            "envelope3dId": {
                                "type": "string",
                                "description": "Identifier of the envelope curve set."
                            },
                            "format": {
                                "type": "string",
                                "description": "Format of data, e.g., DXF"
                            },
                            "data": {
                                "type": "object",
                                "description": "3D-envelope curve data, format specified in ‚format‘"
                            },
                            "url": {
                                "type": "string",
                                "description": "Protocol and url-definition for downloading the 3D-envelope curve data, e.g., ftp://xxx.yyy.com/ac4dgvhoif5tghji"
                            },
                            "description": {
                                "type": "string",
                                "description": "Free text: description of envelope curve set"
                            }
                        }
                    }
                }
            }
        },
        "loadSpecification": {
            "type": "object",
            "description": "Abstract specification of load capabilities",
            "properties": {
                "loadPositions": {
                    "type": "array",
                    "description": "List of load positions / load handling devices. This lists contains the valid values for the parameter “state.loads[].loadPosition” and for the action parameter “lhd” of the actions pick and drop. If this list doesn’t exist or is empty, the mobile robot has no load handling device.",
                    "items": {
                        "type": "string"
                    }
                },
                "loadSets": {
                    "type": "array",
                    "description": "List of load-sets that can be handled by the mobile robot",
                    "items": {
                        "type": "object",
                        "required": [
                            "setName",
                            "loadType"
                        ],
                        "properties": {
                            "setName": {
                                "type": "string",
                                "description": "Unique name of the load set, e.g., DEFAULT, SET1, ..."
                            },
                            "loadType": {
                                "type": "string",
                                "description": "Type of load e.g., EPAL, XLT1200, …."
                            },
                            "loadPositions": {
                                "type": "array",
                                "description": "List of load positions btw. load handling devices, this load-set is valid for. If this parameter does not exist or is empty, this load-set is valid for all load handling devices on this mobile robot.",
                                "items": {
                                    "type": "string"
                                }
                            },
                            "boundingBoxReference": {
                                "type": "object",
                                "required": [
                                    "x",
                                    "y",
                                    "z"
                                ],
                                "description": "Bounding box reference as defined in parameter loads[] in state-message",
                                "properties": {
                                    "x": {
                                        "type": "number",
                                        "description": "X-coordinate of the point of reference."
                                    },
                                    "y": {
                                        "type": "number",
                                        "description": "Y-coordinate of the point of reference."
                                    },
                                    "z": {
                                        "type": "number",
                                        "description": "Z-coordinate of the point of reference."
                                    },
                                    "theta": {
                                        "type": "number",
                                        "description": "Orientation of the loads bounding box. Important for tugger trains, etc."
                                    }
                                }
                            },
                            "loadDimensions": {
                                "type": "object",
                                "required": [
                                    "length",
                                    "width"
                                ],
                                "properties": {
                                    "length": {
                                        "type": "number",
                                        "description": "Absolute length (along the mobile robot’s coordinate system’s x-axis) of the load's bounding box in meters."
                                    },
                                    "width": {
                                        "type": "number",
                                        "description": "Absolute width (along the mobile robot’s coordinate system’s y-axis) of the load's bounding box in meters."
                                    },
                                    "height": {
                                        "type": "number",
                                        "description": "Absolute height of the load´s bounding box. Optional: Set value only if known."
                                    }
                                }
                            },
                            "maximumWeight": {
                                "type": "number",
                                "description": "Maximum weight of loadtype",
                                "unit": "kg",
								"minimum": 0.0
                            },
                            "minimumLoadhandlingHeight": {
                                "type": "number",
                                "unit": "m",
                                "description": "Minimum allowed height for handling of this load-type and –weight. References to boundingBoxReference",
								"minimum": 0.0
                            },
                            "maximumLoadhandlingHeight": {
                                "type": "number",
                                "unit": "m",
                                "description": "Maximum allowed height for handling of this load-type and –weight. references to boundingBoxReference",
								"minimum": 0.0
                            },
                            "minimumLoadhandlingDepth": {
                                "type": "number",
                                "unit": "m",
                                "description": "Minimum allowed depth for this load-type and –weight. references to boundingBoxReference"
                            },
                            "maximumLoadhandlingDepth": {
                                "type": "number",
                                "unit": "m",
                                "description": "Maximum allowed depth for this load-type and –weight. references to boundingBoxReference"
                            },
                            "minimumLoadhandlingTilt": {
                                "type": "number",
                                "unit": "rad",
                                "description": "Minimum allowed tilt for this load-type and –weight"
                            },
                            "maximumLoadhandlingTilt": {
                                "type": "number",
                                "unit": "rad",
                                "description": "Maximum allowed tilt for this load-type and –weight"
                            },
                            "maximumSpeed": {
                                "type": "number",
                                "unit": "m/s^2",
                                "description": "Maximum allowed speed for this load-type and –weight",
								"minimum": 0.0
                            },
                            "maximumAcceleration": {
                                "type": "number",
                                "unit": "m/s^2",
                                "description": "Maximum allowed acceleration for this load-type and –weight",
								"minimum": 0.0
                            },
                            "maximumDeceleration": {
                                "type": "number",
                                "unit": "m/s^2",
                                "description": "Maximum allowed deceleration for this load-type and –weight"
                            },
                            "pickTime": {
                                "type": "number",
                                "unit": "s",
                                "description": "Approximate time for picking up the load",
								"minimum": 0.0
                            },
                            "dropTime": {
                                "type": "number",
                                "unit": "s",
                                "description": "Approximate time for dropping the load",
								"minimum": 0.0
                            },
                            "description": {
                                "type": "string",
                                "description": "Free text description of the load handling set"
                            }
                        }
                    }
                }
            }
        },
         "mobileRobotConfiguration": {
            "type": "object",
            "properties": {
                "versions": {
                    "type": "array",
                    "description": "Array containing various hardware and software versions running on the mobile robot.",
                    "items": {
                        "title": "version",
                        "type": "object",
                        "required": [
                            "key",
                            "value"
                        ],
                        "properties": {
                            "key": {
                                "type": "string",
                                "description": "The key of the version.",
                                "examples": [
                                    "softwareVersion",
                                    "cameraVersion",
                                    "plcSoftChecksum"
                                ]
                            },
                            "value": {
                                "type": "string",
                                "description": "The value of the version.",
                                "examples": [
                                    "v1.03.2",
                                    "0620NL51805A0",
                                    "0x4297F30C"
                                ]
                            }
                        }
                    }
                },
                "network": {
                    "type": "object",
                    "description": "Information about the mobile robot's network connection. The listed information shall not be updated while the mobile robot is operating.",
                    "properties": {
                        "dnsServers": {
                            "type": "array",
                            "description": "List of DNS servers used by the mobile robot.",
                            "items": {
                                "type": "string"
                            }
                        },
                        "ntpServers": {
                            "type": "array",
                            "description": "List of NTP servers used by the mobile robot.",
                            "items": {
                                "type": "string"
                            }  
                        },
                        "localIpAddress": {
                            "type": "string",
                            "description": "A priori assigned IP address of the mobile robot used to communicate with the MQTT broker. Note that this IP address should not be modified/changed during operations."
                        },
                        "netmask": {
                            "type": "string",
                            "description": "Network subnet mask."
                        },
                        "defaultGateway": {
                            "type": "string",
                            "description": "Default gateway used by the mobile robot."
                        }
                    }
                },
                "batteryCharging ": {
                    "type": "object",
                    "description": "Information about battery charging parameters.",
                    "properties": {
                        "criticalLowChargingLevel": {
                            "type": "number",
                            "description": "Specifies the critical charging level in percent at or below which the fleet control should only send orders that command the mobile robot to a charging station.",
                            "minimum": 0.0,
                            "maximum": 100.0
                        },
                        "minimumDesiredChargingLevel": {
                            "type": "number",
                            "description": "Specifies the minimum desired charging level in percent.",
                            "minimum": 0.0,
                            "maximum": 100.0
                        },
                        "maximumDesiredChargingLevel": {
                            "type": "number",
                            "description": "Specifies the maximum desired charging level in percent.",
                            "minimum": 0.0,
                            "maximum": 100.0
                        },
                        "minimumChargingTime": {
                            "type": "number",
                            "description": "Specifies the desired minimum charging time in seconds.",
                            "unit": "s",
							"minimum": 0.0
                        }
                    }
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
    "title": "Mobile Robot Factsheet",
    "description": "The factsheet provides basic information about a specific mobile robot type series. This information allows comparison of different mobile robot types and can be applied for the planning, dimensioning and simulation of a mobile robot system. The factsheet also includes information about mobile robot communication interfaces which are required for the integration of a mobile robot type series into a VD[M]A-5050-compliant fleet control.",
    "required": [
        "headerId",
        "timestamp",
        "version",
        "manufacturer",
        "serialNumber",
        "typeSpecification",
        "physicalParameters",
        "protocolLimits",
        "protocolFeatures",
        "mobileRobotGeometry",
        "loadSpecification"
    ],
    "subtopic": "/factsheet",
    "type": "object",
    "properties":{
        "headerId": {
            "type": "integer",
            "description": "Header ID of the message. The headerId is defined per topic and incremented by 1 with each sent (but not necessarily received) message.",
            "minimum": 0
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
            "title": "Version",
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
            "description": "Serial number of the mobile robot"
        },
        "typeSpecification": {
            "type": "object",
            "required": [
                "seriesName",
                "mobileRobotKinematic",
                "mobileRobotClass",
                "maximumLoadMass",
                "localizationTypes",
                "navigationTypes"
            ],
            "description": "These parameters generally specify the class and the capabilities of the mobile robot",
            "properties": {
                "seriesName": {
                    "type": "string",
                    "description": "Free text generalized series name as specified by manufacturer"
                },
                "seriesDescription": {
                    "type": "string",
                    "description": "Free text human readable description of the mobile robot type series"
                },
                "mobileRobotKinematics": {
                    "type": "string",
                    "description": "Simplified description of mobile robots kinematics-type. Extensible enum: DIFFERENTIAL, OMNIDIRECTIONAL, THREE_WHEEL"
                },
                "mobileRobotClass": {
                    "type": "string",
                    "description": "Simplified description of mobile robot class. Extensible enum: FORKLIFT, CONVEYOR, TUGGER, CARRIER"
                },
                "maximumLoadMass": {
                    "type": "number",
                    "description": "Maximum loadable mass",
                    "unit": "kg",
                    "minimum": 0
                },
                "localizationTypes": {
                    "type": "array",
                    "description": "Simplified description of localization type.",
                    "items": {
                        "type": "string",
                        "description": "Simplified description of localization type. Extensible enum: NATURAL, REFLECTOR, RFID, DMC, SPOT, GRID"
                    }
                },
                "navigationTypes": {
                    "type": "array",
                    "description": "List of path planning types supported by the mobile robot, sorted by priority",
                    "items": {
                        "type": "string",
						"description": "Planning type. Extensible enum: PHYSICAL_LINE_GUIDED, VIRTUAL_LINE_GUIDED, FREELY_NAVIGATING"
                    }
                },
                "supportedZones": {
                    "type": "array",
                    "description": "Array of zone types supported by the mobile robot.",
                    "items": {
                        "type": "string",
                        "enum": [
                            "BLOCKED", 
                            "LINE_GUIDED", 
                            "RELEASE", 
                            "COORDINATED_REPLANNING", 
                            "SPEED_LIMIT", 
                            "ACTION", 
                            "PRIORITY", 
                            "PENALTY", 
                            "DIRECTED", 
                            "BIDIRECTED"
                        ]
                    }
                }
            }
        },
        "physicalParameters": {
            "type": "object",
            "required": [
                "minimumSpeed",
                "maximumSpeed",
                "maximumAcceleration",
                "maximumDeceleration",
                "minimumHeight",
                "maximumHeight",
                "width",
                "length"
            ],
            "description": "These parameters specify the basic physical properties of the mobile robot",
            "properties": {
                "minimumSpeed": {
                    "type": "number",
                    "description": "Minimal controlled continuous speed of the mobile robot",
                    "unit": "m/s",
					"minimum": 0.0
                },
                "maximumSpeed": {
                    "type": "number",
                    "description": "Maximum speed of the mobile robot",
                    "unit": "m/s",
					"minimum": 0.0
                },
                "minimumAngularSpeed": {
                    "type": "number",
                    "description": "Minimal controlled continuous rotation speed of the mobile robot",
                    "unit": "rad/s",
					"minimum": 0.0
                },
                "maximumAngularSpeed": {
                    "type": "number",
                    "description": "Maximum rotation speed of the mobile robot",
                    "unit": "rad/s",
					"minimum": 0.0
                },
                "maximumAcceleration": {
                    "type": "number",
                    "description": "Maximum acceleration with maximum load",
                    "unit": "m/s^2",
					"minimum": 0.0
                },
                "maximumDeceleration": {
                    "type": "number",
                    "description": "Maximum deceleration with maximum load",
                    "unit": "m/s^2"
                },
                "minimumHeight": {
                    "type": "number",
                    "description": "Minimum height of mobile robot",
                    "unit": "m",
                },
                "maximumHeight": {
                    "type": "number",
                    "description": "Maximum height of mobile robot",
                    "unit": "m",
                },
                "width": {
                    "type": "number",
                    "description": "Width of the mobile robot",
                    "unit": "m",
                },
                "length": {
                    "type": "number",
                    "description": "Length of the mobile robot",
                    "unit": "m",
                }
            }
        },
        "protocolLimits": {
            "type": "object",
            "required": [
                "maximumStringLengths",
                "maximumArrayLengths",
                "timing"
            ],
            "description": "This JSON-object describes the protocol limitations of the mobile robot. If a parameter is not defined or set to zero then there is no explicit limit for this parameter.",
            "properties": {
                "maximumStringLengths": {
                    "type": "object",
                    "description": "Maximum lengths of strings",
                    "properties": {
                        "maximumMessageLength": {
                            "type": "integer",
                            "description": "Maximum MQTT Message length",
							"minimum": 0
                        },
                        "maximumTopicSerialLength": {
                            "type": "integer",
                            "description": "Maximum length of serial-number part in MQTT-topics. Affected Parameters: order.serialNumber, instantActions.serialNumber, state.SerialNumber, visualization.serialNumber, connection.serialNumber",
							"minimum": 0
                        },
                        "maximumTopicElementLength": {
                            "type": "integer",
                            "description": "Maximum length of all other parts in MQTT-topics. Affected parameters: order.timestamp, order.version, order.manufacturer, instantActions.timestamp, instantActions.version, instantActions.manufacturer, state.timestamp, state.version, state.manufacturer, visualization.timestamp, visualization.version, visualization.manufacturer, connection.timestamp, connection.version, connection.manufacturer",
							"minimum": 0
                        },
                        "maximumIdLength": {
                            "type": "integer",
                            "description": "Maximum length of ID-Strings. Affected parameters: order.orderId, node.nodeId, nodePosition.mapId, action.actionId, edge.edgeId",
							"minimum": 0
                        },
                        "idNumericalOnly": {
                            "type": "boolean",
                            "description": "If true ID-strings need to contain numerical values only"
                        },
                        "maximumLoadIdLength": {
                            "type": "integer",
                            "description": "Maximum length of loadId Strings",
							"minimum": 0
                        }
                    }
                },
                "maximumArrayLengths": {
                    "type": "object",
                    "description": "Maximum lengths of arrays",
                    "properties": {
                        "order.nodes": {
                            "type": "integer",
                            "description": "Maximum number of nodes per order processable by the mobile robot",
							"minimum": 0
                        },
                        "order.edges": {
                            "type": "integer",
                            "description": "Maximum number of edges per order processable by the mobile robot",
							"minimum": 0
                        },
                        "node.actions": {
                            "type": "integer",
                            "description": "Maximum number of actions per node processable by the mobile robot",
							"minimum": 0
                        },
                        "edge.actions": {
                            "type": "integer",
                            "description": "Maximum number of actions per edge processable by the mobile robot",
							"minimum": 0
                        },
                        "actions.actionsParameters": {
                            "type": "integer",
                            "description": "Maximum number of parameters per action processable by the mobile robot",
							"minimum": 0
                        },
                        "instantActions": {
                            "type": "integer",
                            "description": "Maximum number of instant actions per message processable by the mobile robot",
							"minimum": 0
                        },
                        "trajectory.knotVector": {
                            "type": "integer",
                            "description": "Maximum number of knots per trajectory processable by the mobile robot",
							"minimum": 0
                        },
                        "trajectory.controlPoints": {
                            "type": "integer",
                            "description": "Maximum number of control points per trajectory processable by the mobile robot",
							"minimum": 0
                        },
                        "zoneSet.zones": {
                            "type": "integer",
                            "description": "Maximum number of zones per zoneSet processable by the mobile robot",
							"minimum": 0
                        },
                        "state.nodeStates": {
                            "type": "integer",
                            "description": "Maximum number of nodeStates sent by the mobile robot, maximum number of nodes in base of mobile robot",
							"minimum": 0
                        },
                        "state.edgeStates": {
                            "type": "integer",
                            "description": "Maximum number of edgeStates sent by the mobile robot, maximum number of edges in base of mobile robot",
							"minimum": 0
                        },
                        "state.loads": {
                            "type": "integer",
                            "description": "Maximum number of load-objects sent by the mobile robot",
							"minimum": 0
                        },
                        "state.actionStates": {
                            "type": "integer",
                            "description": "Maximum number of actionStates sent by the mobile robot",
							"minimum": 0
                        },
                        "state.instantActionStates": {
                            "type": "integer",
                            "description": "Maximum number of instantActionStates sent by the mobile robot",
							"minimum": 0
                        },
                        "state.zoneActionStates": {
                            "type": "integer",
                            "description": "Maximum number of zoneActionStates sent by the mobile robot",
							"minimum": 0
                        },
                        "state.errors": {
                            "type": "integer",
                            "description": "Maximum number of errors sent by the mobile robot in one state-message",
							"minimum": 0
                        },
                        "state.information": {
                            "type": "integer",
                            "description": "Maximum number of information objects sent by the mobile robot in one state-message",
							"minimum": 0
                        },
                        "error.errorReferences": {
                            "type": "integer",
                            "description": "Maximum number of error references sent by the mobile robot for each error",
							"minimum": 0
                        },
                        "information.infoReferences": {
                            "type": "integer",
                            "description": "Maximum number of info references sent by the mobile robot for each information",
							"minimum": 0
                        }
                    }
                },
                "timing": {
                    "type": "object",
                    "required": [
                        "minimumOrderInterval",
                        "minimumStateInterval"
                    ],
                    "description": "Timing information",
                    "properties": {
                        "minimumOrderInterval": {
                            "type": "number",
                            "description": "Minimum interval sending order messages to the mobile robot",
                            "unit": "s",
							"minimum": 0.0
                        },
                        "minimumStateInterval": {
                            "type": "number",
                            "description": "Minimum interval for sending state-messages",
                            "unit": "s",
							"minimum": 0.0
                        },
                        "defaultStateInterval": {
                            "type": "number",
                            "description": "Default interval for sending state-messages if not defined, the default value from the main document is used",
                            "unit": "s",
							"minimum": 0.0
                        },
                        "visualizationInterval": {
                            "type": "number",
                            "description": "Default interval for sending messages on visualization topic",
                            "unit": "s",
							"minimum": 0.0
                        }
                    }
                }
            }
        },
        "protocolFeatures": {
            "type": "object",
            "required": [
                "optionalParameters",
                "mobileRobotActions"
            ],
            "description": "Supported features of VDA5050 protocol",
            "properties": {
                "optionalParameters": {
                    "type": "array",
                    "description": "List of supported and/or required optional parameters. Optional parameters, that are not listed here, are assumed to be not supported by the mobile robot.",
                    "items": {
                        "type": "object",
                        "required": [
                            "parameter",
                            "support"
                        ],
                        "properties": {
                            "parameter": {
                                "type": "string",
                                "description": "Full name of optional parameter, e.g., “order.nodes.nodePosition.allowedDeviationTheta”"
                            },
                            "support": {
                                "type": "string",
                                "description": "Type of support for the optional parameter, the following values are possible: SUPPORTED: optional parameter is supported like specified. REQUIRED: optional parameter is required for proper mobile robot operation.",
                                "enum": [
                                    "SUPPORTED",
                                    "REQUIRED"
                                ]
                            },
                            "description": {
                                "type": "string",
                                "description": "Free text. Description of optional parameter. E.g., reason, why the optional parameter ‚direction‘ is necessary for this mobile robot type and which values it can contain. The parameter ‘nodeMarker’ must contain unsigned interger-numbers only. Nurbs-Support is limited to straight lines and circle segments."
                            }
                        }
                    }
                },
                "mobileRobotActions": {
                    "type": "array",
                    "description": "List of all actions with parameters supported by this mobile robot. This includes standard actions specified in VDA 5050 and manufacturer-specific actions",
                    "items": {
                        "required": [
                            "actionType",
                            "actionScopes",
                            "pauseAllowed",
                            "cancelAllowed"
                        ],
                        "type": "object",
                        "properties": {
                            "actionType": {
                                "type": "string",
                                "description": "Unique actionType corresponding to action.actionType"
                            },
                            "actionDescription": {
                                "type": "string",
                                "description": "Free text: description of the action"
                            },
                            "actionScopes": {
                                "type": "array",
                                "description": "List of allowed scopes for using this action-type. INSTANT: usable as instantAction, NODE: usable on nodes, EDGE: usable on edges, ZONE: usable as zone action.",
                                "items": {
                                    "type": "string",
                                    "enum": [
                                        "INSTANT",
                                        "NODE",
                                        "EDGE",
                                        "ZONE"
                                    ]
                                }
                            },
                            "actionParameters": {
                                "type": "array",
                                "description": "Kist of parameters. if not defined, the action has no parameters",
                                "items": {
                                    "type": "object",
                                    "required": [
                                        "key",
                                        "valueDataType"
                                    ],
                                    "properties": {
                                        "key": {
                                            "type": "string",
                                            "description": "Key-String for Parameter"
                                        },
                                        "valueDataType": {
                                            "type": "string",
                                            "description": "Data type of Value, possible data types are: BOOL, NUMBER, INTEGER, STRING, OBJECT, ARRAY",
                                            "enum": [
                                                "BOOL",
                                                "NUMBER",
                                                "INTEGER",
                                                "STRING",
                                                "OBJECT",
                                                "ARRAY"
                                            ]
                                        },
                                        "description": {
                                            "type": "string",
                                            "description": "Free text: description of the parameter"
                                        },
                                        "isOptional": {
                                            "type": "boolean",
                                            "description": "True: optional parameter"
                                        }
                                    }
                                }
                            },
                            "actionResult": {
                                "type": "string",
                                "description": "Free text: description of the result"
                            },
                            "blockingTypes": {
                                "type": "array",
                                "description": "Array of possible blocking types for defined action.",
                                "items": {
                                   "type":"string",
                                   "enum": [
                                      "NONE",
                                      "SOFT",
                                      "SINGLE",
                                      "HARD"
                                   ]
                                }
                            },
                            "pauseAllowed": {
                                "type": "string",
                                "description": "True: action can be paused via startPause. False: action cannot be paused."
                            },
                            "cancelAllowed": {
                                "type": "string",
                                "description": "True: action can be cancelled via cancelOrder. False: action cannot be cancelled."
                            }
                        }
                    }
                }
            }
        },
        "mobileRobotGeometry": {
            "type": "object",
            "description": "Detailed definition of mobile robot geometry",
            "properties": {
                "wheelDefinitions": {
                    "type": "array",
                    "description": "List of wheels, containing wheel-arrangement and geometry",
                    "items": {
                        "type": "object",
                        "required": [
                            "type",
                            "isActiveDriven",
                            "isActiveSteered",
                            "position",
                            "diameter",
                            "width"
                        ],
                        "properties": {
                            "type": {
                                "type": "string",
                                "description": "Wheel type. Extensible enum: DRIVE, CASTER, FIXED, MECANUM"
                            },
                            "isActiveDriven": {
                                "type": "boolean",
                                "description": "True: wheel is actively driven"
                            },
                            "isActiveSteered": {
                                "type": "boolean",
                                "description": "True: wheel is actively steered"
                            },
                            "position": {
                                "type": "object",
                                "required": [
                                    "x",
                                    "y"
                                ],
                                "properties": {
                                    "x": {
                                        "type": "number",
                                        "description": "X-position in mobile robot coordinate system",
                                        "unit": "m"
                                    },
                                    "y": {
                                        "type": "number",
                                        "description": "Y-position in mobile robot coordinate system",
                                        "unit": "m"
                                    },
                                    "theta": {
                                        "type": "number",
                                        "description": "Orientation of wheel in mobile robot coordinate system Necessary for fixed wheels",
                                        "unit": "rad"
                                    }
                                }
                            },
                            "diameter": {
                                "type": "number",
                                "description": "Nominal diameter of wheel",
                                "unit": "m"
                            },
                            "width": {
                                "type": "number",
                                "description": "Nominal width of wheel",
                                "unit": "m"
                            },
                            "centerDisplacement": {
                                "type": "number",
                                "unit": "m",
                                "description": "Nominal displacement of the wheel’s center to the rotation point (necessary for caster wheels). If the parameter is not defined, it is assumed to be 0"
                            },
                            "constraints": {
                                "type": "string",
                                "description": "Free text: can be used by the manufacturer to define constraints"
                            }
                        }
                    }
                },
                "envelopes2d": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "required": [
                            "envelope2dId",
                            "vertices"
                        ],
                        "properties": {
                            "envelope2dId": {
                                "type": "string",
                                "description": "Identifier of the envelope curve set."
                            },
                            "vertices": {
                                "type": "array",
                                "description": "The envelope curve in defined as a polygon. It shall be assumed as closed. Only simple polygons shall be used.",
                                "items": {
                                    "type": "object",
                                    "required": [
                                        "x",
                                        "y"
                                    ],
                                    "properties": {
                                        "x": {
                                            "type": "number",
                                            "description": "X-position of polygon-point",
                                            "unit": "m"
                                        },
                                        "y": {
                                            "type": "number",
                                            "description": " Y-position of polygon-point",
                                            "unit": "m"
                                        }
                                    }
                                }
                            },
                            "description": {
                                "type": "string",
                                "description": "Free text: description of envelope curve set"
                            }
                        }
                    }
                },
                "envelopes3d": {
                    "type": "array",
                    "description": "List of mobile robot envelope curves in 3D (german: „Hüllkurven“)",
                    "items": {
                        "type": "object",
                        "required": [
                            "envelope3dId",
                            "format"
                        ],
                        "properties": {
                            "envelope3dId": {
                                "type": "string",
                                "description": "Identifier of the envelope curve set."
                            },
                            "format": {
                                "type": "string",
                                "description": "Format of data, e.g., DXF"
                            },
                            "data": {
                                "type": "object",
                                "description": "3D-envelope curve data, format specified in ‚format‘"
                            },
                            "url": {
                                "type": "string",
                                "description": "Protocol and url-definition for downloading the 3D-envelope curve data, e.g., ftp://xxx.yyy.com/ac4dgvhoif5tghji"
                            },
                            "description": {
                                "type": "string",
                                "description": "Free text: description of envelope curve set"
                            }
                        }
                    }
                }
            }
        },
        "loadSpecification": {
            "type": "object",
            "description": "Abstract specification of load capabilities",
            "properties": {
                "loadPositions": {
                    "type": "array",
                    "description": "List of load positions / load handling devices. This lists contains the valid values for the parameter “state.loads[].loadPosition” and for the action parameter “lhd” of the actions pick and drop. If this list doesn’t exist or is empty, the mobile robot has no load handling device.",
                    "items": {
                        "type": "string"
                    }
                },
                "loadSets": {
                    "type": "array",
                    "description": "List of load-sets that can be handled by the mobile robot",
                    "items": {
                        "type": "object",
                        "required": [
                            "setName",
                            "loadType"
                        ],
                        "properties": {
                            "setName": {
                                "type": "string",
                                "description": "Unique name of the load set, e.g., DEFAULT, SET1, ..."
                            },
                            "loadType": {
                                "type": "string",
                                "description": "Type of load e.g., EPAL, XLT1200, …."
                            },
                            "loadPositions": {
                                "type": "array",
                                "description": "List of load positions btw. load handling devices, this load-set is valid for. If this parameter does not exist or is empty, this load-set is valid for all load handling devices on this mobile robot.",
                                "items": {
                                    "type": "string"
                                }
                            },
                            "boundingBoxReference": {
                                "type": "object",
                                "required": [
                                    "x",
                                    "y",
                                    "z"
                                ],
                                "description": "Bounding box reference as defined in parameter loads[] in state-message",
                                "properties": {
                                    "x": {
                                        "type": "number",
                                        "description": "X-coordinate of the point of reference."
                                    },
                                    "y": {
                                        "type": "number",
                                        "description": "Y-coordinate of the point of reference."
                                    },
                                    "z": {
                                        "type": "number",
                                        "description": "Z-coordinate of the point of reference."
                                    },
                                    "theta": {
                                        "type": "number",
                                        "description": "Orientation of the loads bounding box. Important for tugger trains, etc."
                                    }
                                }
                            },
                            "loadDimensions": {
                                "type": "object",
                                "required": [
                                    "length",
                                    "width"
                                ],
                                "properties": {
                                    "length": {
                                        "type": "number",
                                        "description": "Absolute length (along the mobile robot’s coordinate system’s x-axis) of the load's bounding box in meters."
                                    },
                                    "width": {
                                        "type": "number",
                                        "description": "Absolute width (along the mobile robot’s coordinate system’s y-axis) of the load's bounding box in meters."
                                    },
                                    "height": {
                                        "type": "number",
                                        "description": "Absolute height of the load´s bounding box. Optional: Set value only if known."
                                    }
                                }
                            },
                            "maximumWeight": {
                                "type": "number",
                                "description": "Maximum weight of loadtype",
                                "unit": "kg",
								"minimum": 0.0
                            },
                            "minimumLoadhandlingHeight": {
                                "type": "number",
                                "unit": "m",
                                "description": "Minimum allowed height for handling of this load-type and –weight. References to boundingBoxReference",
								"minimum": 0.0
                            },
                            "maximumLoadhandlingHeight": {
                                "type": "number",
                                "unit": "m",
                                "description": "Maximum allowed height for handling of this load-type and –weight. references to boundingBoxReference",
								"minimum": 0.0
                            },
                            "minimumLoadhandlingDepth": {
                                "type": "number",
                                "unit": "m",
                                "description": "Minimum allowed depth for this load-type and –weight. references to boundingBoxReference"
                            },
                            "maximumLoadhandlingDepth": {
                                "type": "number",
                                "unit": "m",
                                "description": "Maximum allowed depth for this load-type and –weight. references to boundingBoxReference"
                            },
                            "minimumLoadhandlingTilt": {
                                "type": "number",
                                "unit": "rad",
                                "description": "Minimum allowed tilt for this load-type and –weight"
                            },
                            "maximumLoadhandlingTilt": {
                                "type": "number",
                                "unit": "rad",
                                "description": "Maximum allowed tilt for this load-type and –weight"
                            },
                            "maximumSpeed": {
                                "type": "number",
                                "unit": "m/s^2",
                                "description": "Maximum allowed speed for this load-type and –weight",
								"minimum": 0.0
                            },
                            "maximumAcceleration": {
                                "type": "number",
                                "unit": "m/s^2",
                                "description": "Maximum allowed acceleration for this load-type and –weight",
								"minimum": 0.0
                            },
                            "maximumDeceleration": {
                                "type": "number",
                                "unit": "m/s^2",
                                "description": "Maximum allowed deceleration for this load-type and –weight"
                            },
                            "pickTime": {
                                "type": "number",
                                "unit": "s",
                                "description": "Approximate time for picking up the load",
								"minimum": 0.0
                            },
                            "dropTime": {
                                "type": "number",
                                "unit": "s",
                                "description": "Approximate time for dropping the load",
								"minimum": 0.0
                            },
                            "description": {
                                "type": "string",
                                "description": "Free text description of the load handling set"
                            }
                        }
                    }
                }
            }
        },
         "mobileRobotConfiguration": {
            "type": "object",
            "properties": {
                "versions": {
                    "type": "array",
                    "description": "Array containing various hardware and software versions running on the mobile robot.",
                    "items": {
                        "title": "version",
                        "type": "object",
                        "required": [
                            "key",
                            "value"
                        ],
                        "properties": {
                            "key": {
                                "type": "string",
                                "description": "The key of the version.",
                                "examples": [
                                    "softwareVersion",
                                    "cameraVersion",
                                    "plcSoftChecksum"
                                ]
                            },
                            "value": {
                                "type": "string",
                                "description": "The value of the version.",
                                "examples": [
                                    "v1.03.2",
                                    "0620NL51805A0",
                                    "0x4297F30C"
                                ]
                            }
                        }
                    }
                },
                "network": {
                    "type": "object",
                    "description": "Information about the mobile robot's network connection. The listed information shall not be updated while the mobile robot is operating.",
                    "properties": {
                        "dnsServers": {
                            "type": "array",
                            "description": "List of DNS servers used by the mobile robot.",
                            "items": {
                                "type": "string"
                            }
                        },
                        "ntpServers": {
                            "type": "array",
                            "description": "List of NTP servers used by the mobile robot.",
                            "items": {
                                "type": "string"
                            }  
                        },
                        "localIpAddress": {
                            "type": "string",
                            "description": "A priori assigned IP address of the mobile robot used to communicate with the MQTT broker. Note that this IP address should not be modified/changed during operations."
                        },
                        "netmask": {
                            "type": "string",
                            "description": "Network subnet mask."
                        },
                        "defaultGateway": {
                            "type": "string",
                            "description": "Default gateway used by the mobile robot."
                        }
                    }
                },
                "batteryCharging ": {
                    "type": "object",
                    "description": "Information about battery charging parameters.",
                    "properties": {
                        "criticalLowChargingLevel": {
                            "type": "number",
                            "description": "Specifies the critical charging level in percent at or below which the fleet control should only send orders that command the mobile robot to a charging station.",
                            "minimum": 0.0,
                            "maximum": 100.0
                        },
                        "minimumDesiredChargingLevel": {
                            "type": "number",
                            "description": "Specifies the minimum desired charging level in percent.",
                            "minimum": 0.0,
                            "maximum": 100.0
                        },
                        "maximumDesiredChargingLevel": {
                            "type": "number",
                            "description": "Specifies the maximum desired charging level in percent.",
                            "minimum": 0.0,
                            "maximum": 100.0
                        },
                        "minimumChargingTime": {
                            "type": "number",
                            "description": "Specifies the desired minimum charging time in seconds.",
                            "unit": "s",
							"minimum": 0.0
                        }
                    }
                }
            }
        }
    }
}
```

  </template>
</BilingualSection>
