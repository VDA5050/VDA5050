# Instant Actions Schema

<BilingualSection>
  <template #ko>
    모바일 로봇이 수신 즉시 실행해야 하는 Instant Actions 메시지 사양입니다.
    이 메시지는 현재 진행 중인 Order를 중단하거나, 일시 정지, 취소 등의 긴급한 제어에 사용됩니다.
  </template>
  <template #en>
    JSON Schema for publishing instantActions that the mobile robot is to execute as soon as they arrive.
    Used for urgent control such as stopping, pausing, or canceling the current order.
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
| actions | array | ✅ |  |

### .actions.items

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| actionType | string | ✅ | 작업의 이름입니다. 작업의 기능을 식별합니다. |
| actionId | string | ✅ | 작업을 식별하고 이를 상태의 actionState에 매핑하는 고유 ID입니다. 제안: UUID를 사용하세요. |
| actionDescriptor | string | ❌ | 작업에 대한 추가 정보입니다. |
| blockingType | enum | ✅ | Instant Action의 차단 유형은 항상 NONE입니다. 작업은 이동을 포함하여 다른 작업과 동시에 발생할 수 있습니다. |
| actionParameters | array | ❌ | 표시된 작업에 대한 작업 매개변수(예: deviceId, loadId, 외부 트리거)입니다. |

### .actionParameters.items

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| key | string | ✅ | 작업 매개변수의 키입니다. |
| value | array \| boolean \| number \| integer \| string \| object | ✅ | 작업 매개변수의 값 |

  </template>
  <template #en>

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| headerId | integer | ✅ | headerId of the message. The headerId is defined per topic and incremented by 1 with each sent (but not necessarily received) message. |
| timestamp | string | ✅ | Timestamp in ISO8601 format (YYYY-MM-DDTHH:mm:ss.fffZ). |
| version | string | ✅ | Version of the protocol [Major].[Minor].[Patch] |
| manufacturer | string | ✅ | Manufacturer of the mobile robot |
| serialNumber | string | ✅ | Serial number of the mobile robot. |
| actions | array | ✅ |  |

### .actions.items

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| actionType | string | ✅ | Name of action. Identifies the function of the action. |
| actionId | string | ✅ | Unique ID to identify the action and map them to the actionState in the state. Suggestion: Use UUID. |
| actionDescriptor | string | ❌ | Additional information on the action. |
| blockingType | enum | ✅ | The blocking type of an instant action is always NONE: action can happen in parallel with others, including movement. |
| actionParameters | array | ❌ | Action parameters for the indicated action, e.g., deviceId, loadId, external Triggers. |

### .actionParameters.items

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| key | string | ✅ | The key of the action parameter. |
| value | array \| boolean \| number \| integer \| string \| object | ✅ | The value of the action parameter |

  </template>
</BilingualSection>

## 스키마 원문

<BilingualSection>
  <template #ko>

```json
{
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "title": "instantActions",
    "description": "JSON Schema for publishing instantActions that the mobile robot is to execute as soon as they arrive.",
    "required": [
        "headerId",
        "timestamp",
        "version",
        "manufacturer",
        "serialNumber",
        "actions"
    ],
    "subtopic": "/instantActions",
    "type": "object",
    "properties": {
        "headerId": {
            "title": "headerId",
            "type": "integer",
            "description": "headerId of the message. The headerId is defined per topic and incremented by 1 with each sent (but not necessarily received) message."
        },
        "timestamp": {
            "title": "timestamp",
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
            "description": "Serial number of the mobile robot."
        },
        "actions": {
            "type": "array",
            "items": {
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
                        "description": "Name of action. Identifies the function of the action."
                    },
                    "actionId": {
                        "type": "string",
                        "description": "Unique ID to identify the action and map them to the actionState in the state. Suggestion: Use UUID."
                    },
                    "actionDescriptor": {
                        "type": "string",
                        "description": "Additional information on the action."
                    },
                    "blockingType": {
                        "type": "string",
                        "description": "The blocking type of an instant action is always NONE: action can happen in parallel with others, including movement.",
                        "enum": [
                            "NONE"
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
    "title": "instantActions",
    "description": "JSON Schema for publishing instantActions that the mobile robot is to execute as soon as they arrive.",
    "required": [
        "headerId",
        "timestamp",
        "version",
        "manufacturer",
        "serialNumber",
        "actions"
    ],
    "subtopic": "/instantActions",
    "type": "object",
    "properties": {
        "headerId": {
            "title": "headerId",
            "type": "integer",
            "description": "headerId of the message. The headerId is defined per topic and incremented by 1 with each sent (but not necessarily received) message."
        },
        "timestamp": {
            "title": "timestamp",
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
            "description": "Serial number of the mobile robot."
        },
        "actions": {
            "type": "array",
            "items": {
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
                        "description": "Name of action. Identifies the function of the action."
                    },
                    "actionId": {
                        "type": "string",
                        "description": "Unique ID to identify the action and map them to the actionState in the state. Suggestion: Use UUID."
                    },
                    "actionDescriptor": {
                        "type": "string",
                        "description": "Additional information on the action."
                    },
                    "blockingType": {
                        "type": "string",
                        "description": "The blocking type of an instant action is always NONE: action can happen in parallel with others, including movement.",
                        "enum": [
                            "NONE"
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
                    }
                }
            }
        }
    }
}
```

  </template>
</BilingualSection>
