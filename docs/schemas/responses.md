# Responses Schema

<BilingualSection>
  <template #ko>
    플릿 제어 시스템이 모바일 로봇의 요청에 대해 발행하는 `Responses` 메시지 스키마입니다.
  </template>
  <template #en>
    Schema for `Responses` messages sent by fleet control to mobile robot requests.
  </template>
</BilingualSection>

## 필드 정의

<BilingualSection>
  <template #ko>

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| headerId | integer | ✅ | 메시지의 Header ID입니다. headerId는 토픽별로 정의되며, 메시지를 보낼 때마다(수신 여부와 무관) 1씩 증가합니다. |
| timestamp | string | ✅ | 타임스탬프(ISO 8601, UTC): YYYY-MM-DDTHH:mm:ss.fffZ (예: '2017-04-15T11:40:03.123Z'). |
| version | string | ✅ | 프로토콜 버전 [Major].[Minor].[Patch] |
| manufacturer | string | ✅ | 모바일 로봇의 제조사입니다. |
| serialNumber | string | ✅ | 모바일 로봇의 시리얼 번호입니다. |
| responses | array | ✅ | zone 응답 객체 배열입니다. |

### responses

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| requestId | string | ✅ | 활성 요청 전체에서 모바일 로봇 단위로 고유한 식별자입니다. |
| grantType | enum | ✅ | Enum {'GRANTED','QUEUED','REVOKED','REJECTED'}. 'GRANTED': fleet control가 요청을 승인합니다. 'REVOKED': fleet control가 이전에 승인한 요청을 취소합니다. 'REJECTED': fleet control가 요청을 거절합니다. 'QUEUED': fleet control가 모바일 로봇의 요청을 접수했음을 확인하지만 아직 권한은 부여하지 않습니다. 요청은 큐에 추가됩니다. |
| leaseExpiry | string | ❌ | 타임스탬프(ISO 8601, UTC): YYYY-MM-DDTHH:mm:ss.fffZ (예: '2017-04-15T11:40:03.123Z'). |

  </template>
  <template #en>

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| headerId | integer | ✅ | Header ID of the message. The headerId is defined per topic and incremented by 1 with each sent (but not necessarily received) message. |
| timestamp | string | ✅ | Timestamp (ISO 8601, UTC); YYYY-MM-DDTHH:mm:ss.fffZ (e.g., '2017-04-15T11:40:03.123Z'). |
| version | string | ✅ | Version of the protocol [Major].[Minor].[Patch] |
| manufacturer | string | ✅ | Manufacturer of the mobile robot. |
| serialNumber | string | ✅ | Serial number of the mobile robot. |
| responses | array | ✅ | Array of zone response objects. |

### responses

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| requestId | string | ✅ | Unique per mobile robot identifier within all active requests. |
| grantType | enum | ✅ | Enum {'GRANTED','QUEUED','REVOKED','REJECTED'}. 'GRANTED': fleet control grants request. 'REVOKED': fleet control revokes previously granted request. 'REJECTED': fleet control rejects a request. 'QUEUED': Acknowledge the mobile robot's request to the fleet control, but no permission is given yet. Request was added to some sort of a queue. |
| leaseExpiry | string | ❌ | Timestamp (ISO 8601, UTC); YYYY-MM-DDTHH:mm:ss.fffZ (e.g., '2017-04-15T11:40:03.123Z'). |

  </template>
</BilingualSection>

## 스키마 원문

<BilingualSection>
  <template #ko>

```json
{
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "title": "responses",
    "description": "플릿 제어 시스템에서 모바일 로봇 요청에 대해 보내는 Responses 메시지.",
    "subtopic": "/responses",
    "type": "object",
    "required": [
        "headerId",
        "timestamp", 
        "version", 
        "manufacturer", 
        "serialNumber", 
        "responses"
    ],
    "properties": {
        "headerId": {
            "type": "integer",
            "format": "uint32",
            "description": "메시지의 헤더 ID. headerId는 토픽별로 정의되며, 메시지를 송신할 때마다(수신 여부와 무관) 1씩 증가합니다."
        },
        "timestamp": {
            "type": "string",
            "format": "date-time",
            "description": "타임스탬프(ISO 8601, UTC); YYYY-MM-DDTHH:mm:ss.fffZ (예: '2017-04-15T11:40:03.123Z')."
        },
        "version": {
            "type": "string",
            "description": "프로토콜 버전 [Major].[Minor].[Patch]",
            "examples": [
                "1.3.2"
            ]
        },
        "manufacturer": {
            "type": "string",
            "description": "모바일 로봇의 제조사."
        },
        "serialNumber": {
            "type": "string",
            "description": "모바일 로봇의 시리얼 번호."
        },
        "responses": {
            "type": "array",
            "description": "zone 응답 객체 배열.",
            "items": {
                "type": "object",
                "required": [
                    "requestId", 
                    "grantType"
                    ],
                "properties": {
                    "requestId": {
                        "type": "string",
                        "description": "활성 요청 전체에서 모바일 로봇 단위로 고유한 식별자."
                    },
                    "grantType": {
                        "type": "string",
                        "enum": ["GRANTED", "QUEUED", "REVOKED", "REJECTED"],
                        "description": "열거형 {'GRANTED','QUEUED','REVOKED','REJECTED'}. 'GRANTED': 플릿 제어가 요청을 승인함. 'REVOKED': 플릿 제어가 이전 승인 요청을 취소함. 'REJECTED': 플릿 제어가 요청을 거절함. 'QUEUED': 모바일 로봇 요청을 플릿 제어가 접수했음을 확인하나 아직 권한은 부여되지 않음. 요청이 큐에 추가됨."
                    },
                    "leaseExpiry": {
                        "type": "string",
                        "description": "타임스탬프(ISO 8601, UTC); YYYY-MM-DDTHH:mm:ss.fffZ (예: '2017-04-15T11:40:03.123Z')."
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
    "title": "responses",
    "description": "Responses from fleet control to mobile robot's requests.",
    "subtopic": "/responses",
    "type": "object",
    "required": [
        "headerId",
        "timestamp", 
        "version", 
        "manufacturer", 
        "serialNumber", 
        "responses"
    ],
    "properties": {
        "headerId": {
            "type": "integer",
            "format": "uint32",
            "description": "Header ID of the message. The headerId is defined per topic and incremented by 1 with each sent (but not necessarily received) message."
        },
        "timestamp": {
            "type": "string",
            "format": "date-time",
            "description": "Timestamp (ISO 8601, UTC); YYYY-MM-DDTHH:mm:ss.fffZ (e.g., '2017-04-15T11:40:03.123Z')."
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
            "description": "Manufacturer of the mobile robot."
        },
        "serialNumber": {
            "type": "string",
            "description": "Serial number of the mobile robot."
        },
        "responses": {
            "type": "array",
            "description": "Array of zone response objects.",
            "items": {
                "type": "object",
                "required": [
                    "requestId", 
                    "grantType"
                    ],
                "properties": {
                    "requestId": {
                        "type": "string",
                        "description": "Unique per mobile robot identifier within all active requests."
                    },
                    "grantType": {
                        "type": "string",
                        "enum": ["GRANTED", "QUEUED", "REVOKED", "REJECTED"],
                        "description": "Enum {'GRANTED','QUEUED','REVOKED','REJECTED'}. 'GRANTED': fleet control grants request. 'REVOKED': fleet control revokes previously granted request. 'REJECTED': fleet control rejects a request. 'QUEUED': Acknowledge the mobile robot's request to the fleet control, but no permission is given yet. Request was added to some sort of a queue."
                    },
                    "leaseExpiry": {
                        "type": "string",
                        "description": "Timestamp (ISO 8601, UTC); YYYY-MM-DDTHH:mm:ss.fffZ (e.g., '2017-04-15T11:40:03.123Z')."
                    }
                }
            }
        }
    }
}
```

  </template>
</BilingualSection>

## JSON 예시

```json
{
  "headerId": 42,
  "timestamp": "2024-01-15T09:30:12.123Z",
  "version": "1.3.2",
  "manufacturer": "RobotMaker",
  "serialNumber": "AMR-0001",
  "responses": [
    {
      "requestId": "req-001",
      "grantType": "GRANTED",
      "leaseExpiry": "2024-01-15T09:45:12.123Z"
    }
  ]
}
```
