# Order Schema

<BilingualSection>
  <template #ko>
    플릿 제어 시스템에서 모바일 로봇으로 전송되는 Order 메시지 사양입니다.
    아래 타입 정의는 주요 구조를 요약한 것이며, 최종 규범은 아래 공식 JSON 스키마 원문과 `VDA5050_EN.md`를 따릅니다.
  </template>
  <template #en>
    The message schema to communicate orders from fleet control to the mobile robot.
    The type definition below is a structural summary; the canonical source is the official JSON schema below and `VDA5050_EN.md`.
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
| orderId | string | ✅ | Order 식별. 동일 Order에 속하는 여러 Order 메시지를 구분하는 데 사용됩니다. |
| orderUpdateId | integer | ✅ | Order update 식별. orderId별로 고유하며 새 Order의 경우 0부터 시작합니다. Order update가 거부되면 이 필드가 해당 오류에 전달됩니다. |
| orderDescription | string | ❌ | Visualization 목적으로만 사람이 읽을 수 있는 추가 정보이며 논리적 프로세스에 사용되지 않습니다. |
| nodes | array | ✅ | Order를 이행하기 위해 통과할 노드 객체의 배열입니다. 유효한 Order에는 노드 1개면 충분합니다. 해당 경우 edge 목록을 비워 두세요. |
| edges | array | ✅ | 두 노드 사이의 방향 연결. Order를 이행하기 위해 통과할 edge 객체의 배열입니다. 유효한 Order에는 노드 1개면 충분합니다. 해당 경우 edge 목록을 비워 두세요. |

### node

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| nodeId | string | ✅ | 노드의 식별자입니다. 동일 Order 내 노드끼리는 고유하지 않을 수 있습니다. |
| sequenceId | integer | ✅ | Order 내 노드와 edge의 순서를 추적하고 Order update를 단순화하기 위한 번호입니다. 주요 목적은 하나의 orderId 안에서 두 번 이상 지나는 노드를 구별하는 것입니다. sequenceId는 노드와 edge가 공유하며 통과 순서를 정의합니다. |
| nodeDescriptor | string | ❌ | 노드에 대한 추가 정보입니다. |
| released | boolean | ✅ | True는 노드가 기본의 일부임을 나타냅니다. False는 노드가 수평선의 일부임을 나타냅니다. |
| nodePosition | object | ❌ | 전역 프로젝트별 세계 좌표계에서 지도의 위치를 ​​정의합니다. 각 층에는 자체 지도가 있습니다. 모든 맵은 동일한 프로젝트별 글로벌 원점을 사용해야 합니다. 노드 위치가 필요하지 않은 모바일 로봇 유형(예: 라인 유도 모바일 로봇)의 경우 선택 사항입니다. |
| actions | array | ✅ | 노드에서 실행될 작업 배열입니다. 작업이 필요하지 않은 경우 빈 배열입니다. |

### nodePosition

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| x | number | ✅ | 지도 좌표계를 기준으로 지도의 X 위치입니다. 정밀도는 특정 구현에 달려 있습니다. |
| y | number | ✅ | 지도 좌표계를 기준으로 지도의 Y 위치입니다. 정밀도는 특정 구현에 달려 있습니다. |
| theta | number | ❌ | 노드에서 모바일 로봇의 절대 방향입니다. 선택 사항: 모바일 로봇은 스스로 경로를 계획할 수 있습니다. 정의된 경우 모바일 로봇은 이 노드에서 세타 각도를 가정해야 합니다. 이전 가장자리가 회전을 허용하지 않는 경우 모바일 로봇은 노드에서 회전해야 합니다. 다음 가장자리에 다른 방향이 정의되어 있지만 회전이 허용되지 않는 경우 모바일 로봇은 가장자리에 들어가기 전에 노드에서 회전을 원하는 가장자리로 회전해야 합니다. |
| allowedDeviationXY | object | ❌ | 이동 로봇이 이동된 것으로 간주되기 위해 노드의 위치와 얼마나 정확하게 일치해야 하는지를 나타냅니다. a = b= 0.0인 경우: 편차가 허용되지 않습니다. 이는 모바일 로봇이 기술적으로 모바일 로봇에 대해 가능한 한 정확하게 모바일 로봇 제어 지점을 사용하여 노드 위치에 도달하거나 통과해야 함을 의미합니다. 이는 allowedDeviationXY가 모바일 로봇에 대해 기술적으로 실행 가능한 것보다 작은 경우에도 적용됩니다. 모바일 로봇이 이 속성을 지원하지만 차량 제어에 의해 이 노드에 대해 정의되지 않은 경우 모바일 로봇은 a 및 b 값을 0.0으로 가정합니다. 노드의 좌표는 타원의 중심을 정의합니다. |
| allowedDeviationTheta | number | ❌ | 세타 각도의 편차가 얼마나 큰지 나타냅니다. 허용 가능한 가장 낮은 각도는 theta - allowedDeviationTheta이고 허용 가능한 가장 높은 각도는 theta + allowedDeviationTheta입니다. |
| mapId | string | ✅ | 위치가 참조되는 지도의 고유 ID입니다. |

### allowedDeviationXY

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| a | number | ✅ | 타원 장반경의 길이(미터) |
| b | number | ✅ | 미터 단위의 타원 반단축 길이 |
| theta | number | ✅ | 라디안 단위의 회전 각도 |

### action

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| actionType | string | ✅ | 작업의 이름입니다. 작업의 기능을 식별합니다. |
| actionId | string | ✅ | 작업을 식별하고 이를 상태의 actionState에 매핑하는 고유 ID입니다. 제안: UUID를 사용하세요. |
| actionDescriptor | string | ❌ | 작업에 대한 추가 정보입니다. |
| blockingType | enum | ✅ | 이동 중 및/또는 다른 작업과 병행하여 작업을 실행할 수 있는지 여부를 규제합니다. 없음: 운전 및 기타 작업을 허용합니다. SINGLE: 운전은 허용되지만 다른 작업은 허용되지 않습니다. SOFT: 다른 작업은 허용하지만 운전은 허용하지 않습니다. HARD: 해당 시점에 허용되는 유일한 작업입니다. |
| actionParameters | array | ❌ | 표시된 작업에 대한 작업 매개변수(예: deviceId, loadId, 외부 트리거)입니다. |
| retriable | boolean | ❌ | True: 작업이 실패할 경우 RETRIABLE 상태로 들어갈 수 있습니다. False: 작업이 실패한 후 바로 FAILED 상태가 됩니다. 기본값: 거짓. |

### .actionParameters.items

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| key | string | ✅ | 작업 매개변수의 키입니다. |
| value | array \| boolean \| number \| integer \| string \| object | ✅ | 작업 매개변수의 값 |

### edge

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| edgeId | string | ✅ | 가장자리의 식별자입니다. 동일한 차수의 가장자리에서는 고유하지 않을 수 있습니다. |
| sequenceId | integer | ✅ | Order 내 노드와 edge의 순서를 추적하고 Order update를 단순화하기 위한 번호입니다. sequenceId는 노드와 edge가 공유하며 통과 순서를 정의합니다. |
| edgeDescriptor | string | ❌ | 가장자리에 대한 추가 정보입니다. |
| released | boolean | ✅ | True는 가장자리가 밑면의 일부임을 나타냅니다. False는 가장자리가 수평선의 일부임을 나타냅니다. |
| maximumSpeed | number | ❌ | 가장자리에 허용되는 최대 속도(m/s)입니다. 속도는 이동 로봇의 가장 빠른 측정으로 정의됩니다. |
| maximumMobileRobotHeight | number | ❌ | 하중을 포함하여 가장자리에서 모바일 로봇의 허용되는 최대 높이(미터)입니다. |
| minimumLoadHandlingDeviceHeight | number | ❌ | 가장자리에 있는 화물 취급 장치의 허용된 최소 높이(미터) |
| orientation | number | ❌ | 가장자리에 있는 모바일 로봇의 방향입니다. OrientationType 값은 전역 프로젝트별 지도 좌표계를 기준으로 해석해야 하는지 또는 가장자리에 접선으로 해석해야 하는지 정의합니다. 모서리에 대한 접선으로 해석된 경우 0.0 = 앞으로, PI = 뒤로. 예: 방향 Pi/2 rad는 90도 회전으로 이어집니다. 모바일 로봇이 다른 방향으로 시작하는 경우 회전 허용이 True로 설정된 경우 가장자리의 모바일 로봇을 원하는 방향으로 회전시킵니다. RotationAllowed가 False인 경우 가장자리에 들어가기 전에 회전합니다. 이것이 불가능할 경우 Order를 거부하십시오. 궤적이 정의되지 않은 경우 가장자리의 두 연결 노드 사이의 직접 경로에 회전을 적용합니다. 모서리에 대한 궤적이 정의된 경우 궤적에 방향을 적용합니다. |
| orientationType | string | ❌ | Enum {GLOBAL, TANGENTIAL}: GLOBAL: 전역 프로젝트별 지도 좌표계를 기준으로 합니다. TANGENTIAL: 가장자리에 접선입니다. 정의되지 않은 경우 기본값은 TANGENTIAL입니다. |
| direction | string | ❌ | 초기에 정의할 라인 가이드 또는 와이어 가이드 모바일 로봇의 교차점에서 방향을 설정합니다(이동 로봇-개별). |
| reachOrientationBeforeEntering | boolean | ❌ | True: 가장자리에 들어가기 전에 원하는 가장자리 방향에 도달해야 합니다. 거짓: 모바일 로봇이 가장자리에서 원하는 방향으로 회전할 수 있습니다. 기본값: 거짓. |
| maxRotationSpeed | number | ❌ | 최대 회전 속도(rad/s). 선택사항: 설정되지 않은 경우 제한이 없습니다. |
| trajectory | object | ❌ | NURBS로서의 이 가장자리에 대한 궤적 JSON 개체입니다. 모바일 로봇이 시작 노드와 끝 노드 사이를 이동해야 하는 곡선을 정의합니다. 선택 사항: 이동 로봇이 궤적을 처리할 수 없거나 이동 로봇이 자체 궤적을 계획하는 경우 생략할 수 있습니다. |
| length | number | ❌ | 시작 노드에서 끝 노드까지의 경로 거리(미터)입니다. 선택 사항: 이 값은 라인 유도 모바일 로봇이 정지 위치에 도달하기 전에 속도를 줄이는 데 사용됩니다. |
| corridor | object | ❌ |  |
| actions | array | ✅ | 자세한 정보가 포함된 작업 개체 배열입니다. |

### trajectory

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| degree | integer | ❌ | 궤적을 정의하는 NURBS 곡선의 각도입니다. 정의되지 않은 경우 기본값은 1입니다. |
| knotVector | array | ❌ | 제어점이 NURBS 곡선에 영향을 미치는 위치와 방식을 결정하는 매개변수 값의 순서입니다. |
| controlPoints | array | ✅ | 시작점과 끝점을 포함하는 NURBS의 제어점을 정의하는 JSON controlPoint 개체 목록입니다. |

### .controlPoints.items

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| x | number | ✅ | 월드 좌표계에 설명된 X 좌표입니다. |
| y | number | ✅ | 세계 좌표계에 설명된 Y 좌표입니다. |
| weight | number | ❌ | 이 제어점이 곡선을 당기는 데 사용되는 가중치입니다. 정의되지 않은 경우 기본값은 1.0입니다. |

### corridor

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| leftWidth | number | ✅ | 모바일 로봇의 궤적과 관련된 왼쪽 복도의 너비를 미터 단위로 정의합니다. |
| rightWidth | number | ✅ | 모바일 로봇의 궤적과 관련된 오른쪽 복도의 너비를 미터 단위로 정의합니다. |
| corridorReferencePoint | enum | ❌ | 경계가 운동 중심 또는 이동 로봇의 윤곽에 유효한지 정의합니다. |
| releaseRequired | boolean | ❌ | 로봇이 차량 제어로부터 승인을 요청해야 하는지 여부를 나타내는 선택적 플래그입니다. 정의되지 않은 경우 릴리스가 필요하지 않습니다. |
| releaseLossBehavior | enum | ❌ | 복도 해제가 만료되거나 플릿 제어에 의해 취소된 경우 로봇이 어떻게 작동할지 정의합니다. 기본값: 중지 |

  </template>
  <template #en>

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| headerId | integer | ✅ | headerId of the message. The headerId is defined per topic and incremented by 1 with each sent (but not necessarily received) message. |
| timestamp | string | ✅ | Timestamp in ISO8601 format (YYYY-MM-DDTHH:mm:ss.fffZ). |
| version | string | ✅ | Version of the protocol [Major].[Minor].[Patch] |
| manufacturer | string | ✅ | Manufacturer of the mobile robot |
| serialNumber | string | ✅ | Serial number of the mobile robot. |
| orderId | string | ✅ | Order Identification. This is to be used to identify multiple order messages that belong to the same order. |
| orderUpdateId | integer | ✅ | Order update identification. It is unique per orderId, starting at 0 for a new order. If an order update is rejected, this field shall be passed in the rejection message. |
| orderDescription | string | ❌ | Additional human-readable information only for visualization purposes; this shall not be used for any logical processes. |
| nodes | array | ✅ | Array of nodes objects to be traversed for fulfilling the order. One node is enough for a valid order. Leave edge list empty for that case. |
| edges | array | ✅ | Directional connection between two nodes. Array of edge objects to be traversed for fulfilling the order. One node is enough for a valid order. Leave edge list empty for that case. |

### node

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| nodeId | string | ✅ | Identifier of the node. May not be unique among the nodes of the same order. |
| sequenceId | integer | ✅ | Number to track the sequence of nodes and edges in an order and to simplify order updates. The main purpose is to distinguish between a node which is passed more than once within one orderId. The sequenceId is shared between nodes and edges and defines the sequence of traversal. |
| nodeDescriptor | string | ❌ | Additional information on the node. |
| released | boolean | ✅ | True indicates that the node is part of the base. False indicates that the node is part of the horizon. |
| nodePosition | object | ❌ | Defines the position on a map in a global project-specific world coordinate system. Each floor has its own map. All maps must use the same project specific global origin. Optional for mobile robot-types that do not require the node position (e.g., line-guided mobile robots). |
| actions | array | ✅ | Array of actions to be executed on a node. Empty array, if no actions required. |

### nodePosition

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| x | number | ✅ | X-position on the map in reference to the map coordinate system. Precision is up to the specific implementation. |
| y | number | ✅ | Y-position on the map in reference to the map coordinate system. Precision is up to the specific implementation. |
| theta | number | ❌ | Absolute orientation of the mobile robot on the node. Optional: mobile robot can plan the path by itself. If defined, the mobile robot has to assume the theta angle on this node. If previous edge disallows rotation, the mobile robot must rotate on the node. If following edge has a differing orientation defined but disallows rotation, the mobile robot is to rotate on the node to the edges desired rotation before entering the edge. |
| allowedDeviationXY | object | ❌ | Indicates how precisely a mobile robot shall match the position of a node for it to be considered traversed. If a = b= 0.0: no deviation is allowed, which means the mobile robot shall reach or pass the node position with the mobile robot control point as precisely as is technically possible for the mobile robot. This applies also if allowedDeviationXY is smaller than what is technically viable for the mobile robot. If the mobile robot supports this attribute, but it is not defined for this node by fleet control the mobile robot shall assume the value of a and b as 0.0. The coordinates of the node defines the center of the ellipse. |
| allowedDeviationTheta | number | ❌ | Indicates how big the deviation of theta angle can be. The lowest acceptable angle is theta - allowedDeviationTheta and the highest acceptable angle is theta + allowedDeviationTheta. |
| mapId | string | ✅ | Unique identification of the map in which the position is referenced. |

### allowedDeviationXY

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| a | number | ✅ | Length of the ellipse semi-major axis in meters |
| b | number | ✅ | Length of the ellipse semi-minor axis in meters |
| theta | number | ✅ | Rotation angle in radians |

### action

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| actionType | string | ✅ | Name of the action. Identifies the function of the action. |
| actionId | string | ✅ | Unique ID to identify the action and map them to the actionState in the state. Suggestion: Use UUIDs. |
| actionDescriptor | string | ❌ | Additional information on the action. |
| blockingType | enum | ✅ | Regulates if the action is allowed to be executed during movement and/or parallel to other actions. NONE: allows driving and other actions; SINGLE: allows driving but no other actions; SOFT: allows other actions but not driving; HARD: is the only allowed action at that time. |
| actionParameters | array | ❌ | Action parameters for the indicated action, e.g., deviceId, loadId, external Triggers. |
| retriable | boolean | ❌ | True: action can enter RETRIABLE state if it fails. False: action enters FAILED state directly after it fails. Default: false. |

### .actionParameters.items

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| key | string | ✅ | The key of the action parameter. |
| value | array \| boolean \| number \| integer \| string \| object | ✅ | The value of the action parameter |

### edge

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| edgeId | string | ✅ | Identifier of the edge. May not be unique among the edges of the same order. |
| sequenceId | integer | ✅ | Number to track the sequence of nodes and edges in an order and to simplify order updates. The sequenceId is shared between nodes and edges and defines the sequence of traversal. |
| edgeDescriptor | string | ❌ | Additional information on the edge. |
| released | boolean | ✅ | True indicates that the edge is part of the base. False indicates that the edge is part of the horizon. |
| maximumSpeed | number | ❌ | Permitted maximum speed on the edge in m/s. Speed is defined by the fastest measurement of the mobile robot. |
| maximumMobileRobotHeight | number | ❌ | Permitted maximum height of the mobile robot, including the load, on edge in meters. |
| minimumLoadHandlingDeviceHeight | number | ❌ | Permitted minimal height of the load handling device on the edge in meters |
| orientation | number | ❌ | Orientation of the mobile robot on the edge. The value orientationType defines if it has to be interpreted relative to the global project specific map coordinate system or tangential to the edge. In case of interpreted tangential to the edge 0.0 = forwards and PI = backwards. Example: orientation Pi/2 rad will lead to a rotation of 90 degrees. If mobile robot starts in different orientation, rotate the mobile robot on the edge to the desired orientation if rotationAllowed is set to True. If rotationAllowed is False, rotate before entering the edge. If that is not possible, reject the order. If no trajectory is defined, apply the rotation to the direct path between the two connecting nodes of the edge. If a trajectory is defined for the edge, apply the orientation to the trajectory. |
| orientationType | string | ❌ | Enum {GLOBAL, TANGENTIAL}: GLOBAL: relative to the global project specific map coordinate system; TANGENTIAL: tangential to the edge. If not defined, the default value is TANGENTIAL. |
| direction | string | ❌ | Sets direction at junctions for line-guided or wire-guided mobile robots, to be defined initially (mobile robot-individual). |
| reachOrientationBeforeEntering | boolean | ❌ | True: Desired edge orientation shall be reached before entering the edge. False: Mobile robot can rotate into the desired orientation on the edge. Default: False. |
| maxRotationSpeed | number | ❌ | Maximum rotation speed in rad/s. Optional: No limit, if not set. |
| trajectory | object | ❌ | Trajectory JSON-object for this edge as a NURBS. Defines the curve, on which the mobile robot should move between the start node and the end node. Optional: Can be omitted, if mobile robot cannot process trajectories or if mobile robot plans its own trajectory. |
| length | number | ❌ | Distance of the path from the start node to the end node in meters. Optional: This value is used by line-guided mobile robots to decrease their speed before reaching a stop position. |
| corridor | object | ❌ |  |
| actions | array | ✅ | Array of action objects with detailed information. |

### trajectory

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| degree | integer | ❌ | Degree of the NURBS curve defining the trajectory. If not defined, the default value is 1. |
| knotVector | array | ❌ | Sequence of parameter values that determines where and how the control points affect the NURBS curve. |
| controlPoints | array | ✅ | List of JSON controlPoint objects defining the control points of the NURBS, which includes the beginning and end point. |

### .controlPoints.items

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| x | number | ✅ | X coordinate described in the world coordinate system. |
| y | number | ✅ | Y coordinate described in the world coordinate system. |
| weight | number | ❌ | The weight, with which this control point pulls on the curve. When not defined, the default will be 1.0. |

### corridor

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| leftWidth | number | ✅ | Defines the width of the corridor in meters to the left related to the trajectory of the mobile robot. |
| rightWidth | number | ✅ | Defines the width of the corridor in meters to the right related to the trajectory of the mobile robot. |
| corridorReferencePoint | enum | ❌ | Defines whether the boundaries are valid for the kinematic center or the contour of the mobile robot. |
| releaseRequired | boolean | ❌ | Optional flag that indicates if the robot must request approval from the fleet control. If not defined, no release is required. |
| releaseLossBehavior | enum | ❌ | Defines how the robot shall behave in case its release of a corridor expires or gets revoked by the fleet control. Default: STOP |

  </template>
</BilingualSection>

## 스키마 원문

<BilingualSection>
  <template #ko>

```json
{
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "title": "Order Message",
    "description": "The message schema to communicate orders from fleet control to the mobile robot.",
    "subtopic": "/order",
    "type": "object",
    "required": [
        "headerId",
        "timestamp",
        "version",
        "manufacturer",
        "serialNumber",
        "orderId",
        "orderUpdateId",
        "nodes",
        "edges"
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
        "orderId": {
            "description": "Order Identification. This is to be used to identify multiple order messages that belong to the same order.",
            "type": "string"
        },
        "orderUpdateId": {
            "description": "Order update identification. It is unique per orderId, starting at 0 for a new order. If an order update is rejected, this field shall be passed in the rejection message.",
            "type": "integer",
            "minimum": 0
        },
        "orderDescription": {
            "description": "Additional human-readable information only for visualization purposes; this shall not be used for any logical processes.",
            "type": "string"
        },
        "nodes": {
            "description": "Array of nodes objects to be traversed for fulfilling the order. One node is enough for a valid order. Leave edge list empty for that case.",
            "type": "array",
            "items": {
                "$ref": "#/definitions/node"
            }
        },
        "edges": {
            "type": "array",
            "description": "Directional connection between two nodes. Array of edge objects to be traversed for fulfilling the order. One node is enough for a valid order. Leave edge list empty for that case.",
            "items": {
                "$ref": "#/definitions/edge"
            }
        }
    },
    "definitions": {
		"node": {
			"type": "object",
			"title": "node",
			"required": [
				"nodeId",
				"sequenceId",
				"released",
				"actions"
			],
			"properties": {
				"nodeId": {
					"type": "string",
					"description": "Identifier of the node. May not be unique among the nodes of the same order.",
					"examples": [
						"pumpenhaus_1",
						"MONTAGE"
					]
				},
				"sequenceId": {
					"type": "integer",
					"minimum": 0,
					"description": "Number to track the sequence of nodes and edges in an order and to simplify order updates. The main purpose is to distinguish between a node which is passed more than once within one orderId. The sequenceId is shared between nodes and edges and defines the sequence of traversal."
				},
				"nodeDescriptor": {
					"type": "string",
					"description": "Additional information on the node."
				},
				"released": {
					"type": "boolean",
					"description": "True indicates that the node is part of the base. False indicates that the node is part of the horizon."
				},
				"nodePosition": {
					"description": "Defines the position on a map in a global project-specific world coordinate system. Each floor has its own map. All maps must use the same project specific global origin. Optional for mobile robot-types that do not require the node position (e.g., line-guided mobile robots).",
					"type": "object",
					"required": [
						"x",
						"y",
						"mapId"
					],
					"properties": {
						"x": {
							"type": "number",
							"description": "X-position on the map in reference to the map coordinate system. Precision is up to the specific implementation.",
							"unit": "m"
						},
						"y": {
							"type": "number",
							"description":"Y-position on the map in reference to the map coordinate system. Precision is up to the specific implementation.",
							"unit": "m"
						},
						"theta": {
							"type": "number",
							"description": "Absolute orientation of the mobile robot on the node. Optional: mobile robot can plan the path by itself. If defined, the mobile robot has to assume the theta angle on this node. If previous edge disallows rotation, the mobile robot must rotate on the node. If following edge has a differing orientation defined but disallows rotation, the mobile robot is to rotate on the node to the edges desired rotation before entering the edge.",
							"unit": "m",
							"minimum": -3.14159265359,
							"maximum": 3.14159265359
						},
						"allowedDeviationXY":{
						  "type": "object",
						  "description": "Indicates how precisely a mobile robot shall match the position of a node for it to be considered traversed. If a = b= 0.0: no deviation is allowed, which means the mobile robot shall reach or pass the node position with the mobile robot control point as precisely as is technically possible for the mobile robot. This applies also if allowedDeviationXY is smaller than what is technically viable for the mobile robot. If the mobile robot supports this attribute, but it is not defined for this node by fleet control the mobile robot shall assume the value of a and b as 0.0. The coordinates of the node defines the center of the ellipse.",
						  "required": [
							"a",
							"b",
							"theta"
						  ],
						  "properties": {
							"a": {
							  "type": "number",
							  "description": "Length of the ellipse semi-major axis in meters",
							  "unit": "m",
							  "minimum": 0
							},
							"b": {
							  "type": "number",
							  "description": "Length of the ellipse semi-minor axis in meters",
							  "unit": "m",
							  "minimum": 0
							},
							"theta": {
							  "type": "number",
							  "description": "Rotation angle in radians",
							  "unit": "rad",
							  "minimum": -1.570796327,
							  "maximum": 1.570796327
							}
						  }
						},
						"allowedDeviationTheta": {
							"type": "number",
							"description": "Indicates how big the deviation of theta angle can be. The lowest acceptable angle is theta - allowedDeviationTheta and the highest acceptable angle is theta + allowedDeviationTheta.",
							"unit": "rad",
							"minimum": 0,
							"maximum": 3.141592654
							},
						"mapId": {
							"description": "Unique identification of the map in which the position is referenced.",
							"type": "string"
						}
					}
				},
				"actions": {
					"description": "Array of actions to be executed on a node. Empty array, if no actions required.",
					"type": "array",
					"items": {
						"$ref": "#/definitions/action"
					}
				}
			}
		},
		"edge": {
			"type": "object",
			"title": "edge",
			"required": [
				"edgeId",
				"sequenceId",
				"released",
				"actions"
			],
			"properties": {
				"edgeId": {
					"type": "string",
					"description": "Identifier of the edge. May not be unique among the edges of the same order."
				},
				"sequenceId": {
					"type": "integer",
					"minimum": 0,
					"description": "Number to track the sequence of nodes and edges in an order and to simplify order updates. The sequenceId is shared between nodes and edges and defines the sequence of traversal."
				},
				"edgeDescriptor": {
					"type": "string",
					"description": "Additional information on the edge."
				},
				"released": {
					"type": "boolean",
					"description": "True indicates that the edge is part of the base. False indicates that the edge is part of the horizon."
				},
				"maximumSpeed": {
					"type": "number",
					"description": "Permitted maximum speed on the edge in m/s. Speed is defined by the fastest measurement of the mobile robot.",
					"unit": "m/s"
				},
				"maximumMobileRobotHeight": {
					"type": "number",
					"description": "Permitted maximum height of the mobile robot, including the load, on edge in meters.",
					"unit": "m"
				},
				"minimumLoadHandlingDeviceHeight": {
					"type": "number",
					"description": "Permitted minimal height of the load handling device on the edge in meters",
					"unit": "m"
				},
				"orientation": {
					"type": "number",
					"description": "Orientation of the mobile robot on the edge. The value orientationType defines if it has to be interpreted relative to the global project specific map coordinate system or tangential to the edge. In case of interpreted tangential to the edge 0.0 = forwards and PI = backwards. Example: orientation Pi/2 rad will lead to a rotation of 90 degrees. If mobile robot starts in different orientation, rotate the mobile robot on the edge to the desired orientation if rotationAllowed is set to True. If rotationAllowed is False, rotate before entering the edge. If that is not possible, reject the order. If no trajectory is defined, apply the rotation to the direct path between the two connecting nodes of the edge. If a trajectory is defined for the edge, apply the orientation to the trajectory.",
					"unit": "rad",
					"minimum": -3.14159265359,
					"maximum": 3.14159265359
				},
				"orientationType":{
					"type": "string",
					"description": "Enum {GLOBAL, TANGENTIAL}: GLOBAL: relative to the global project specific map coordinate system; TANGENTIAL: tangential to the edge. If not defined, the default value is TANGENTIAL."
				},
				"direction": {
					"type": "string",
					"description": "Sets direction at junctions for line-guided or wire-guided mobile robots, to be defined initially (mobile robot-individual)."
				},
				"reachOrientationBeforeEntering": {
					"type": "boolean",
					"description": "True: Desired edge orientation shall be reached before entering the edge. False: Mobile robot can rotate into the desired orientation on the edge. Default: False."
				},
				"maxRotationSpeed": {
					"type": "number",
					"description": "Maximum rotation speed in rad/s. Optional: No limit, if not set.",
					"unit": "rad/s"
				},
				"trajectory": {
					"description": "Trajectory JSON-object for this edge as a NURBS. Defines the curve, on which the mobile robot should move between the start node and the end node. Optional: Can be omitted, if mobile robot cannot process trajectories or if mobile robot plans its own trajectory.",
					"$ref": "#/definitions/trajectory"
				},
				"length": {
					"type": "number",
					"description": "Distance of the path from the start node to the end node in meters. Optional: This value is used by line-guided mobile robots to decrease their speed before reaching a stop position.",
					"unit": "m"
				},
				"corridor": {
					"$ref": "#/definitions/corridor"
				},
				"actions": {
					"description": "Array of action objects with detailed information.",
					"type": "array",
					"items": {
						"$ref": "#/definitions/action"
					}
				}
			}
		},
		"trajectory": {
			"type": "object",
			"required": [
				"controlPoints"
			],
			"properties": {
				"degree": {
					"type": "integer",
					"description": "Degree of the NURBS curve defining the trajectory. If not defined, the default value is 1.",
					"minimum": 1
				},
				"knotVector": {
					"type": "array",
					"description": "Sequence of parameter values that determines where and how the control points affect the NURBS curve.",
					"items": {
						"type": "number",
						"minimum": 0.0,
						"maximum": 1.0
					}
				},
				"controlPoints": {
					"type": "array",
					"description": "List of JSON controlPoint objects defining the control points of the NURBS, which includes the beginning and end point.",
					"items": {
						"type": "object",
						"title": "controlPoint",
						"required": [
							"x",
							"y"
						],
						"properties": {
							"x": {
								"type": "number",
								"description": "X coordinate described in the world coordinate system.",
								"unit": "m"
							},
							"y": {
								"type": "number",
								"description": "Y coordinate described in the world coordinate system.",
								"unit": "m"
							},
							"weight": {
								"type": "number",
								"description": "The weight, with which this control point pulls on the curve. When not defined, the default will be 1.0.",
							}
						}
					}
				}
			}
		},
        "action": {
            "type": "object",
            "description": "Describes an action that the mobile robot can perform.",
            "required": [
                "actionId",
                "actionType",
                "blockingType"
            ],
            "properties": {
                "actionType": {
                    "type": "string",
                    "description": "Name of the action. Identifies the function of the action."
                },
                "actionId": {
                    "type": "string",
                    "description": "Unique ID to identify the action and map them to the actionState in the state. Suggestion: Use UUIDs."
                },
                "actionDescriptor": {
                    "type": "string",
                    "description": "Additional information on the action."
                },
                "blockingType": {
                    "type": "string",
                    "description": "Regulates if the action is allowed to be executed during movement and/or parallel to other actions. NONE: allows driving and other actions; SINGLE: allows driving but no other actions; SOFT: allows other actions but not driving; HARD: is the only allowed action at that time.",
                    "enum": [
                        "NONE",
                        "SOFT",
                        "SINGLE",
                        "HARD"
                    ]
                },
                "actionParameters": {
                    "type": "array",
                    "description": "Action parameters for the indicated action, e.g., deviceId, loadId, external Triggers.",
                    "items": {
                        "title": "actionParameter",
                        "type": "object",
                        "required": [
                            "key",
                            "value"
                        ],
                        "properties": {
                            "key": {
                                "type": "string",
                                "description": "The key of the action parameter.",
                                "examples": [
                                    "duration",
                                    "direction",
                                    "signal"
                                ]
                            },
                            "value": {
                                "type": [
                                    "array",
                                    "boolean",
                                    "number",
                                    "integer",
                                    "string", 
                                    "object"
                                ],
                                "description": "The value of the action parameter",
                                "examples": [
                                    103.2,
                                    "left",
                                    true,
                                    [
                                        "arrays",
                                        "are",
                                        "also",
                                        "valid"
                                    ],
                                    {
                                        "objects": "as",
                                        "well": true
                                    }
                                ]
                            }
                        }
                    }
                },
                "retriable": {
                    "type": "boolean",
                    "description": "True: action can enter RETRIABLE state if it fails. False: action enters FAILED state directly after it fails. Default: false."
                }
            }
        },
		"corridor": {
			"description": "Definition of boundaries in which a mobile robot can deviate from its trajectory, e. g. to avoid obstacles.",
			"type": "object",
			"required": [
				"leftWidth",
				"rightWidth"
			],
			"properties": {
				"leftWidth": {
					"type": "number",
					"description": "Defines the width of the corridor in meters to the left related to the trajectory of the mobile robot.",
					"unit": "m",
					"minimum": 0.0
				},
				"rightWidth": {
					"type": "number",
					"description":"Defines the width of the corridor in meters to the right related to the trajectory of the mobile robot.",
					"unit": "m",
					"minimum": 0.0
				},
				"corridorReferencePoint": {
					"type": "string",
					"description": "Defines whether the boundaries are valid for the kinematic center or the contour of the mobile robot.",
					"enum": [
						"KINEMATIC_CENTER",
						"CONTOUR"
					]
				},
				"releaseRequired": {
					"type": "boolean",
					"description": "Optional flag that indicates if the robot must request approval from the fleet control. If not defined, no release is required."
				},
				"releaseLossBehavior": {
					"type": "string",
					"description": "Defines how the robot shall behave in case its release of a corridor expires or gets revoked by the fleet control. Default: STOP",
					"enum": [
						"STOP", 
						"RETURN"
					]
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
    "title": "Order Message",
    "description": "The message schema to communicate orders from fleet control to the mobile robot.",
    "subtopic": "/order",
    "type": "object",
    "required": [
        "headerId",
        "timestamp",
        "version",
        "manufacturer",
        "serialNumber",
        "orderId",
        "orderUpdateId",
        "nodes",
        "edges"
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
        "orderId": {
            "description": "Order Identification. This is to be used to identify multiple order messages that belong to the same order.",
            "type": "string"
        },
        "orderUpdateId": {
            "description": "Order update identification. It is unique per orderId, starting at 0 for a new order. If an order update is rejected, this field shall be passed in the rejection message.",
            "type": "integer",
            "minimum": 0
        },
        "orderDescription": {
            "description": "Additional human-readable information only for visualization purposes; this shall not be used for any logical processes.",
            "type": "string"
        },
        "nodes": {
            "description": "Array of nodes objects to be traversed for fulfilling the order. One node is enough for a valid order. Leave edge list empty for that case.",
            "type": "array",
            "items": {
                "$ref": "#/definitions/node"
            }
        },
        "edges": {
            "type": "array",
            "description": "Directional connection between two nodes. Array of edge objects to be traversed for fulfilling the order. One node is enough for a valid order. Leave edge list empty for that case.",
            "items": {
                "$ref": "#/definitions/edge"
            }
        }
    },
    "definitions": {
		"node": {
			"type": "object",
			"title": "node",
			"required": [
				"nodeId",
				"sequenceId",
				"released",
				"actions"
			],
			"properties": {
				"nodeId": {
					"type": "string",
					"description": "Identifier of the node. May not be unique among the nodes of the same order.",
					"examples": [
						"pumpenhaus_1",
						"MONTAGE"
					]
				},
				"sequenceId": {
					"type": "integer",
					"minimum": 0,
					"description": "Number to track the sequence of nodes and edges in an order and to simplify order updates. The main purpose is to distinguish between a node which is passed more than once within one orderId. The sequenceId is shared between nodes and edges and defines the sequence of traversal."
				},
				"nodeDescriptor": {
					"type": "string",
					"description": "Additional information on the node."
				},
				"released": {
					"type": "boolean",
					"description": "True indicates that the node is part of the base. False indicates that the node is part of the horizon."
				},
				"nodePosition": {
					"description": "Defines the position on a map in a global project-specific world coordinate system. Each floor has its own map. All maps must use the same project specific global origin. Optional for mobile robot-types that do not require the node position (e.g., line-guided mobile robots).",
					"type": "object",
					"required": [
						"x",
						"y",
						"mapId"
					],
					"properties": {
						"x": {
							"type": "number",
							"description": "X-position on the map in reference to the map coordinate system. Precision is up to the specific implementation.",
							"unit": "m"
						},
						"y": {
							"type": "number",
							"description":"Y-position on the map in reference to the map coordinate system. Precision is up to the specific implementation.",
							"unit": "m"
						},
						"theta": {
							"type": "number",
							"description": "Absolute orientation of the mobile robot on the node. Optional: mobile robot can plan the path by itself. If defined, the mobile robot has to assume the theta angle on this node. If previous edge disallows rotation, the mobile robot must rotate on the node. If following edge has a differing orientation defined but disallows rotation, the mobile robot is to rotate on the node to the edges desired rotation before entering the edge.",
							"unit": "m",
							"minimum": -3.14159265359,
							"maximum": 3.14159265359
						},
						"allowedDeviationXY":{
						  "type": "object",
						  "description": "Indicates how precisely a mobile robot shall match the position of a node for it to be considered traversed. If a = b= 0.0: no deviation is allowed, which means the mobile robot shall reach or pass the node position with the mobile robot control point as precisely as is technically possible for the mobile robot. This applies also if allowedDeviationXY is smaller than what is technically viable for the mobile robot. If the mobile robot supports this attribute, but it is not defined for this node by fleet control the mobile robot shall assume the value of a and b as 0.0. The coordinates of the node defines the center of the ellipse.",
						  "required": [
							"a",
							"b",
							"theta"
						  ],
						  "properties": {
							"a": {
							  "type": "number",
							  "description": "Length of the ellipse semi-major axis in meters",
							  "unit": "m",
							  "minimum": 0
							},
							"b": {
							  "type": "number",
							  "description": "Length of the ellipse semi-minor axis in meters",
							  "unit": "m",
							  "minimum": 0
							},
							"theta": {
							  "type": "number",
							  "description": "Rotation angle in radians",
							  "unit": "rad",
							  "minimum": -1.570796327,
							  "maximum": 1.570796327
							}
						  }
						},
						"allowedDeviationTheta": {
							"type": "number",
							"description": "Indicates how big the deviation of theta angle can be. The lowest acceptable angle is theta - allowedDeviationTheta and the highest acceptable angle is theta + allowedDeviationTheta.",
							"unit": "rad",
							"minimum": 0,
							"maximum": 3.141592654
							},
						"mapId": {
							"description": "Unique identification of the map in which the position is referenced.",
							"type": "string"
						}
					}
				},
				"actions": {
					"description": "Array of actions to be executed on a node. Empty array, if no actions required.",
					"type": "array",
					"items": {
						"$ref": "#/definitions/action"
					}
				}
			}
		},
		"edge": {
			"type": "object",
			"title": "edge",
			"required": [
				"edgeId",
				"sequenceId",
				"released",
				"actions"
			],
			"properties": {
				"edgeId": {
					"type": "string",
					"description": "Identifier of the edge. May not be unique among the edges of the same order."
				},
				"sequenceId": {
					"type": "integer",
					"minimum": 0,
					"description": "Number to track the sequence of nodes and edges in an order and to simplify order updates. The sequenceId is shared between nodes and edges and defines the sequence of traversal."
				},
				"edgeDescriptor": {
					"type": "string",
					"description": "Additional information on the edge."
				},
				"released": {
					"type": "boolean",
					"description": "True indicates that the edge is part of the base. False indicates that the edge is part of the horizon."
				},
				"maximumSpeed": {
					"type": "number",
					"description": "Permitted maximum speed on the edge in m/s. Speed is defined by the fastest measurement of the mobile robot.",
					"unit": "m/s"
				},
				"maximumMobileRobotHeight": {
					"type": "number",
					"description": "Permitted maximum height of the mobile robot, including the load, on edge in meters.",
					"unit": "m"
				},
				"minimumLoadHandlingDeviceHeight": {
					"type": "number",
					"description": "Permitted minimal height of the load handling device on the edge in meters",
					"unit": "m"
				},
				"orientation": {
					"type": "number",
					"description": "Orientation of the mobile robot on the edge. The value orientationType defines if it has to be interpreted relative to the global project specific map coordinate system or tangential to the edge. In case of interpreted tangential to the edge 0.0 = forwards and PI = backwards. Example: orientation Pi/2 rad will lead to a rotation of 90 degrees. If mobile robot starts in different orientation, rotate the mobile robot on the edge to the desired orientation if rotationAllowed is set to True. If rotationAllowed is False, rotate before entering the edge. If that is not possible, reject the order. If no trajectory is defined, apply the rotation to the direct path between the two connecting nodes of the edge. If a trajectory is defined for the edge, apply the orientation to the trajectory.",
					"unit": "rad",
					"minimum": -3.14159265359,
					"maximum": 3.14159265359
				},
				"orientationType":{
					"type": "string",
					"description": "Enum {GLOBAL, TANGENTIAL}: GLOBAL: relative to the global project specific map coordinate system; TANGENTIAL: tangential to the edge. If not defined, the default value is TANGENTIAL."
				},
				"direction": {
					"type": "string",
					"description": "Sets direction at junctions for line-guided or wire-guided mobile robots, to be defined initially (mobile robot-individual)."
				},
				"reachOrientationBeforeEntering": {
					"type": "boolean",
					"description": "True: Desired edge orientation shall be reached before entering the edge. False: Mobile robot can rotate into the desired orientation on the edge. Default: False."
				},
				"maxRotationSpeed": {
					"type": "number",
					"description": "Maximum rotation speed in rad/s. Optional: No limit, if not set.",
					"unit": "rad/s"
				},
				"trajectory": {
					"description": "Trajectory JSON-object for this edge as a NURBS. Defines the curve, on which the mobile robot should move between the start node and the end node. Optional: Can be omitted, if mobile robot cannot process trajectories or if mobile robot plans its own trajectory.",
					"$ref": "#/definitions/trajectory"
				},
				"length": {
					"type": "number",
					"description": "Distance of the path from the start node to the end node in meters. Optional: This value is used by line-guided mobile robots to decrease their speed before reaching a stop position.",
					"unit": "m"
				},
				"corridor": {
					"$ref": "#/definitions/corridor"
				},
				"actions": {
					"description": "Array of action objects with detailed information.",
					"type": "array",
					"items": {
						"$ref": "#/definitions/action"
					}
				}
			}
		},
		"trajectory": {
			"type": "object",
			"required": [
				"controlPoints"
			],
			"properties": {
				"degree": {
					"type": "integer",
					"description": "Degree of the NURBS curve defining the trajectory. If not defined, the default value is 1.",
					"minimum": 1
				},
				"knotVector": {
					"type": "array",
					"description": "Sequence of parameter values that determines where and how the control points affect the NURBS curve.",
					"items": {
						"type": "number",
						"minimum": 0.0,
						"maximum": 1.0
					}
				},
				"controlPoints": {
					"type": "array",
					"description": "List of JSON controlPoint objects defining the control points of the NURBS, which includes the beginning and end point.",
					"items": {
						"type": "object",
						"title": "controlPoint",
						"required": [
							"x",
							"y"
						],
						"properties": {
							"x": {
								"type": "number",
								"description": "X coordinate described in the world coordinate system.",
								"unit": "m"
							},
							"y": {
								"type": "number",
								"description": "Y coordinate described in the world coordinate system.",
								"unit": "m"
							},
							"weight": {
								"type": "number",
								"description": "The weight, with which this control point pulls on the curve. When not defined, the default will be 1.0.",
							}
						}
					}
				}
			}
		},
        "action": {
            "type": "object",
            "description": "Describes an action that the mobile robot can perform.",
            "required": [
                "actionId",
                "actionType",
                "blockingType"
            ],
            "properties": {
                "actionType": {
                    "type": "string",
                    "description": "Name of the action. Identifies the function of the action."
                },
                "actionId": {
                    "type": "string",
                    "description": "Unique ID to identify the action and map them to the actionState in the state. Suggestion: Use UUIDs."
                },
                "actionDescriptor": {
                    "type": "string",
                    "description": "Additional information on the action."
                },
                "blockingType": {
                    "type": "string",
                    "description": "Regulates if the action is allowed to be executed during movement and/or parallel to other actions. NONE: allows driving and other actions; SINGLE: allows driving but no other actions; SOFT: allows other actions but not driving; HARD: is the only allowed action at that time.",
                    "enum": [
                        "NONE",
                        "SOFT",
                        "SINGLE",
                        "HARD"
                    ]
                },
                "actionParameters": {
                    "type": "array",
                    "description": "Action parameters for the indicated action, e.g., deviceId, loadId, external Triggers.",
                    "items": {
                        "title": "actionParameter",
                        "type": "object",
                        "required": [
                            "key",
                            "value"
                        ],
                        "properties": {
                            "key": {
                                "type": "string",
                                "description": "The key of the action parameter.",
                                "examples": [
                                    "duration",
                                    "direction",
                                    "signal"
                                ]
                            },
                            "value": {
                                "type": [
                                    "array",
                                    "boolean",
                                    "number",
                                    "integer",
                                    "string", 
                                    "object"
                                ],
                                "description": "The value of the action parameter",
                                "examples": [
                                    103.2,
                                    "left",
                                    true,
                                    [
                                        "arrays",
                                        "are",
                                        "also",
                                        "valid"
                                    ],
                                    {
                                        "objects": "as",
                                        "well": true
                                    }
                                ]
                            }
                        }
                    }
                },
                "retriable": {
                    "type": "boolean",
                    "description": "True: action can enter RETRIABLE state if it fails. False: action enters FAILED state directly after it fails. Default: false."
                }
            }
        },
		"corridor": {
			"description": "Definition of boundaries in which a mobile robot can deviate from its trajectory, e. g. to avoid obstacles.",
			"type": "object",
			"required": [
				"leftWidth",
				"rightWidth"
			],
			"properties": {
				"leftWidth": {
					"type": "number",
					"description": "Defines the width of the corridor in meters to the left related to the trajectory of the mobile robot.",
					"unit": "m",
					"minimum": 0.0
				},
				"rightWidth": {
					"type": "number",
					"description":"Defines the width of the corridor in meters to the right related to the trajectory of the mobile robot.",
					"unit": "m",
					"minimum": 0.0
				},
				"corridorReferencePoint": {
					"type": "string",
					"description": "Defines whether the boundaries are valid for the kinematic center or the contour of the mobile robot.",
					"enum": [
						"KINEMATIC_CENTER",
						"CONTOUR"
					]
				},
				"releaseRequired": {
					"type": "boolean",
					"description": "Optional flag that indicates if the robot must request approval from the fleet control. If not defined, no release is required."
				},
				"releaseLossBehavior": {
					"type": "string",
					"description": "Defines how the robot shall behave in case its release of a corridor expires or gets revoked by the fleet control. Default: STOP",
					"enum": [
						"STOP", 
						"RETURN"
					]
				}
			}
		}
    }
}
```

  </template>
</BilingualSection>
