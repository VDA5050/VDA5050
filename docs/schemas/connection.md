# Connection Schema

<BilingualSection>
  <template #ko>
    모바일 로봇과 브로커 간의 Connection State를 나타내는 메시지 사양입니다. 
    MQTT의 Last Will 기능을 사용하여 Connection이 예상치 못하게 끊겼을 때 "CONNECTION_BROKEN" State를 알리는 데 사용됩니다.
  </template>
  <template #en>
    The last will message of the mobile robot. It indicates the connection status between the mobile robot and the broker.
    Uses MQTT's Last Will feature to notify "CONNECTION_BROKEN" when the connection is unexpectedly lost.
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
| manufacturer | string | ✅ | 이동로봇 제조사. |
| serialNumber | string | ✅ | 모바일 로봇의 일련번호입니다. |
| connectionState | enum | ✅ | ONLINE: 모바일 로봇과 브로커 간의 연결이 활성화되어 있습니다. 오프라인: 모바일 로봇과 브로커 간의 연결이 조정된 방식으로 오프라인 상태가 되었습니다. HIBERNATING: 모바일 로봇과 브로커 간의 연결이 활성화되어 있지만 모바일 로봇이 메시지를 표시하지 않습니다. 이 모드는 절전 또는 통신 감소를 위한 것입니다. 모바일 로봇은 지시가 있을 때 온라인으로 재개될 수 있습니다. CONNECTION_BROKEN: 모바일 로봇과 브로커 간의 연결이 예기치 않게 종료되었습니다. |

  </template>
  <template #en>

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| headerId | integer | ✅ | Header ID of the message. The headerId is defined per topic and incremented by 1 with each sent (but not necessarily received) message. |
| timestamp | string | ✅ | Timestamp in ISO8601 format (YYYY-MM-DDTHH:mm:ss.fffZ). |
| version | string | ✅ | Version of the protocol [Major].[Minor].[Patch] |
| manufacturer | string | ✅ | Manufacturer of the mobile robot. |
| serialNumber | string | ✅ | Serial number of the mobile robot. |
| connectionState | enum | ✅ | ONLINE: connection between mobile robot and broker is active. OFFLINE: connection between mobile robot and broker has gone offline in a coordinated way. HIBERNATING: connection between mobile robot and broker is active, but mobile robot does not state messages. This mode is intended for power-saving or communication reduction. The mobile robot can resume to ONLINE when instructed. CONNECTION_BROKEN: The connection between mobile robot and broker has unexpectedly ended. |

  </template>
</BilingualSection>

## 스키마 원문

<BilingualSection>
  <template #ko>

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "connection",
  "description": "The last will message of the mobile robot. Has to be sent with retain flag. Once the mobile robot comes online, it has to send this message on its connect topic, with the connectionState enum set to \"ONLINE\". The last will message is to be configured with the connection state set to \"CONNECTIONBROKEN\".\nThus, if the mobile robot disconnects from the broker, fleet control gets notified via the topic \"connection\". If the mobile robot is disconnecting in an orderly fashion (e.g. shutting down, sleeping), the mobile robot is to publish a message on this topic with the connectionState set to \"DISCONNECTED\".",
  "subtopic": "/connection",
  "type": "object",
  "required": [
    "headerId",
    "timestamp",
    "version",
    "manufacturer",
    "serialNumber",
    "connectionState"
  ],
  "properties": {
    "headerId": {
      "type": "integer",
      "description": "Header ID of the message. The headerId is defined per topic and incremented by 1 with each sent (but not necessarily received) message."
    },
    "timestamp": {
      "type": "string",
      "format": "date-time",
      "description": "Timestamp in ISO8601 format (YYYY-MM-DDTHH:mm:ss.fffZ).",
      "examples": ["1991-03-11T11:40:03.123Z"]
    },
    "version": {
      "type": "string",
      "description": "Version of the protocol [Major].[Minor].[Patch]",
      "examples": ["1.3.2"]
    },
    "manufacturer": {
      "type": "string",
      "description": "Manufacturer of the mobile robot."
    },
    "serialNumber": {
      "type": "string",
      "description": "Serial number of the mobile robot."
    },
    "connectionState": {
      "type": "string",
      "enum": ["ONLINE", "OFFLINE", "HIBERNATING", "CONNECTION_BROKEN"],
      "description": "ONLINE: connection between mobile robot and broker is active. OFFLINE: connection between mobile robot and broker has gone offline in a coordinated way. HIBERNATING: connection between mobile robot and broker is active, but mobile robot does not state messages. This mode is intended for power-saving or communication reduction. The mobile robot can resume to ONLINE when instructed. CONNECTION_BROKEN: The connection between mobile robot and broker has unexpectedly ended."
    }
  }
}
```

  </template>
  <template #en>

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "connection",
  "description": "The last will message of the mobile robot. Has to be sent with retain flag. Once the mobile robot comes online, it has to send this message on its connect topic, with the connectionState enum set to \"ONLINE\". The last will message is to be configured with the connection state set to \"CONNECTIONBROKEN\".\nThus, if the mobile robot disconnects from the broker, fleet control gets notified via the topic \"connection\". If the mobile robot is disconnecting in an orderly fashion (e.g. shutting down, sleeping), the mobile robot is to publish a message on this topic with the connectionState set to \"DISCONNECTED\".",
  "subtopic": "/connection",
  "type": "object",
  "required": [
    "headerId",
    "timestamp",
    "version",
    "manufacturer",
    "serialNumber",
    "connectionState"
  ],
  "properties": {
    "headerId": {
      "type": "integer",
      "description": "Header ID of the message. The headerId is defined per topic and incremented by 1 with each sent (but not necessarily received) message."
    },
    "timestamp": {
      "type": "string",
      "format": "date-time",
      "description": "Timestamp in ISO8601 format (YYYY-MM-DDTHH:mm:ss.fffZ).",
      "examples": ["1991-03-11T11:40:03.123Z"]
    },
    "version": {
      "type": "string",
      "description": "Version of the protocol [Major].[Minor].[Patch]",
      "examples": ["1.3.2"]
    },
    "manufacturer": {
      "type": "string",
      "description": "Manufacturer of the mobile robot."
    },
    "serialNumber": {
      "type": "string",
      "description": "Serial number of the mobile robot."
    },
    "connectionState": {
      "type": "string",
      "enum": ["ONLINE", "OFFLINE", "HIBERNATING", "CONNECTION_BROKEN"],
      "description": "ONLINE: connection between mobile robot and broker is active. OFFLINE: connection between mobile robot and broker has gone offline in a coordinated way. HIBERNATING: connection between mobile robot and broker is active, but mobile robot does not state messages. This mode is intended for power-saving or communication reduction. The mobile robot can resume to ONLINE when instructed. CONNECTION_BROKEN: The connection between mobile robot and broker has unexpectedly ended."
    }
  }
}
```

  </template>
</BilingualSection>
