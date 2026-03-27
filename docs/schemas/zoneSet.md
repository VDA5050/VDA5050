# Zone Set Schema

<BilingualSection>
  <template #ko>
    특정 지도에 대한 Zone Set 정보 메시지 사양입니다.
    `zoneType`에 따라 속도 제한, 액션, 우선순위, 방향 제한 등 조건부 필드가 달라지므로 아래 타입 정의는 그 차이를 반영합니다.
  </template>
  <template #en>
    The Zone Set message defines zones for a dedicated map.
    Because the valid fields change with `zoneType`, the type definition below reflects the conditional structure of the schema.
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
| manufacturer | string | ✅ | 이동로봇 제조사. |
| serialNumber | string | ✅ | 모바일 로봇의 일련번호입니다. |
| zoneSet | object | ✅ |  |

### zoneSet

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| mapId | string | ✅ | Zone Set이 특정하는 맵의 전역적으로 고유한 식별자입니다. |
| zoneSetId | string | ✅ | Zone Set의 전역적으로 고유한 식별자입니다. |
| zoneSetDescriptor | string | ❌ | 사용자가 정의하고 사람이 읽을 수 있는 이름 또는 설명자입니다. |
| zones | array | ✅ | 영역 개체의 배열입니다. |

### zone

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| zoneId | string | ✅ | 로컬로(영역 세트 내에서) 고유 식별자입니다. |
| zoneType | enum | ✅ | Zone 카테고리. |
| zoneDescriptor | string | ❌ | 사용자가 정의한 사람이 읽을 수 있는 이름 또는 설명자입니다. |
| vertices | array | ✅ | 영역의 기하학적 모양을 정의하는 정점 배열(x-y 좌표)입니다. |

### vertex

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| x | number | ✅ | 프로젝트별 좌표계에 설명된 X 좌표입니다. |
| y | number | ✅ | 프로젝트별 좌표계에 설명된 Y 좌표입니다. |

  </template>
  <template #en>

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| headerId | integer | ✅ | headerId of the message. The headerId is defined per topic and incremented by 1 with each sent (but not necessarily received) message. |
| timestamp | string | ✅ | Timestamp in ISO8601 format (YYYY-MM-DDTHH:mm:ss.fffZ). |
| version | string | ✅ | Version of the protocol [Major].[Minor].[Patch] |
| manufacturer | string | ✅ | Manufacturer of the mobile robot. |
| serialNumber | string | ✅ | Serial number of the mobile robot. |
| zoneSet | object | ✅ |  |

### zoneSet

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| mapId | string | ✅ | Globally unique identifier of the map the zone set particularizes. |
| zoneSetId | string | ✅ | Globally unique identifier of the zone set. |
| zoneSetDescriptor | string | ❌ | A user-defined, human-readable name or descriptor. |
| zones | array | ✅ | Array of zone objects. |

### zone

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| zoneId | string | ✅ | Locally (within the zone set) unique identifier. |
| zoneType | enum | ✅ | Zone category. |
| zoneDescriptor | string | ❌ | User-defined human-readable name or descriptor. |
| vertices | array | ✅ | Array of vertices (in x-y-coordinates) defining the geometrical shape of the zone. |

### vertex

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| x | number | ✅ | X-coordinate described in the project specific coordinate system. |
| y | number | ✅ | Y-coordinate described in the project specific coordinate system. |

  </template>
</BilingualSection>

## 스키마 원문

<BilingualSection>
  <template #ko>

```json
{
    "$schema": "http://json-schema.org/draft/2020-12/schema",
    "title": "zoneSet",
    "description": "Zone set detailing a dedicated map.",
    "subtopic": "/zoneSet",
    "type": "object",
    "required": [
        "headerId",
        "timestamp", 
        "version", 
        "manufacturer", 
        "serialNumber",
        "zoneSet"
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
            "description": "Manufacturer of the mobile robot."
        },
        "serialNumber": {
            "type": "string",
            "description": "Serial number of the mobile robot."
        },
        "zoneSet":  {
			"$ref": "#/definitions/zoneSet"
		}
    },
    "definitions": {
        "zoneSet": {
            "type": "object",
                "required": [
                    "mapId", 
                    "zoneSetId", 
                    "zones"
                    ],
                "properties": {
                    "mapId": {
                        "type": "string",
                        "description": "Globally unique identifier of the map the zone set particularizes."
                    },
                    "zoneSetId": {
                        "type": "string",
                        "description": "Globally unique identifier of the zone set."
                    },
                    "zoneSetDescriptor": {
                        "type": "string",
                        "description": "A user-defined, human-readable name or descriptor."
                    },
                    "zones": {
                        "type": "array",
                        "description": "Array of zone objects.",
                        "items": {
                                "$ref": "#/definitions/zone"
                        }
                    }
            }
        },
        "zone": {
            "type": "object",
            "required": [
                "zoneId", 
                "zoneType", 
                "vertices"
                ],
            "properties": {
                "zoneId": {
                    "type": "string",
                    "description": "Locally (within the zone set) unique identifier."
                },
                "zoneType": {
                    "type": "string",
                    "description": "Zone category.",
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
                },
                "zoneDescriptor": {
                    "type": "string",
                    "description": "User-defined human-readable name or descriptor."
                },
                "vertices": {
                    "type": "array",
                    "description": "Array of vertices (in x-y-coordinates) defining the geometrical shape of the zone.",
                    "minItems": 3,
                    "items": {
                        "$ref": "#/definitions/vertex"
                    }
                }
            },
            "allOf": [
                {
                    "if": {
                        "properties": {
                            "zoneType": { "const": "SPEED_LIMIT" }
                        }
                    },
                    "then": {
                        "required": ["maximumSpeed"],
                        "properties": {
                            "maximumSpeed": {
                                "type": "number",
                                "description": "Required in SPEED_LIMIT zone."
                            }
                        }
                    }
                },
                { 
                    "if": {
                        "properties": {
                            "zoneType": { "const": "ACTION" }
                        }
                    },
                    "then": {
                        "required": [
                            "entryActions",
                            "duringActions",
                            "exitActions"
                        ],
                        "properties": {
                            "entryActions": {
                                "type": "array",
                                "description": "Array of actions to be executed when entering the zone.",
                                "items": {
                                    "$ref": "#/definitions/action"
                                }
                            },
                            "duringActions": {
                                "type": "array",
                                "description": "Actions to be executed while crossing the zone. Empty Array, if no Actions required.",
                                "items": {
                                    "$ref": "#/definitions/action"
                                }
                            },
                            "exitActions": {
                                "type": "array",
                                "description": "Actions to be triggered when leaving the zone. Empty Array, if no Actions required.",
                                "items": {
                                    "$ref": "#/definitions/action"
                                }
                            }
                        }
                    }
                },
                {
                    "if": {
                        "properties": {
                            "zoneType": { "const": "PRIORITY" }
                        }
                    },
                    "then": {
                        "required": ["priorityFactor"],
                        "properties": {
                            "priorityFactor ": {
                                "type": "number",
                                "description": "Relative factor, determining the zone's preference over an area with no zone. 0.0 means no preference, as if there was no zone, 1.0 is maximum preference.",
                                "minimum": 0.0,
                                "maximum": 1.0
                            }
                        }
                    }
                },
                {
                    "if": {
                        "properties": {
                            "zoneType": { "const": "PENALTY" }
                        }
                    },
                    "then": {
                        "required": ["penaltyFactor"],
                        "properties": {
                            "penaltyFactor": {
                                "type": "number",
                                "description": "Relative factor, determining the zone's penalty over an area with no zone. 0.0 means no penalty, as if there was no zone, 1.0 is the maximum penalty, causing the mobile robot to take this path only if no other path is possible.",
                                "minimum": 0.0,
                                "maximum": 1.0
                            }
                        }
                    }
                },
                { 
                    "if": {
                        "properties": {
                            "zoneType": { "const": "DIRECTED" }
                        }
                    },
                    "then": {
                        "required": [
                            "direction",
                            "limitation"
                        ],
                        "properties": {
                            "direction": {
                                "type": "number",
                                "description": "Preferred direction of travel within the zone in radians. The direction of travel is the speed vector in the project-specific coordinate system.",
                                "unit": "rad"
                            },
                            "limitation": {
                                "type": "string",
                                "description": "SOFT: Mobile robots may deviate from the defined direction of travel, but should avoid it, RESTRICTED: The mobile robot may deviate from the defined direction of travel, e.g., for obstacle avoidance, but shall never traverse opposite to the defined direction of travel, STRICT: The mobile robot shall not deviate from the defined direction of travel (within its precision).",
                                "enum": [
                                    "SOFT","RESTRICTED","STRICT"
                                ]
                            }
                        }
                    }
                },
                { 
                    "if": {
                        "properties": {
                            "zoneType": { "const": "BIDIRECTED" }
                        }
                    },
                    "then": {
                        "required": [
                            "direction",
                            "limitation"
                        ],
                        "properties": {
                            "direction": {
                                "type": "number",
                                "description": "Direction and its opposite direction (+ Pi) define the allowed directions of travel within the zone in radians. The direction of travel is the speed vector in the project-specific coordinate system."
                            },
                            "limitation": {
                                "type": "string",
                                "description": "SOFT: Mobile robots may deviate from the defined directions of travel, but should avoid it, RESTRICTED: The mobile robot should not traverse in any other direction than the directions of travel, except for obstacle avoidance.",
                                "enum": [
                                    "SOFT","RESTRICTED"
                                ]
                            }
                        }
                    }
                }
            ]
        },
        "vertex": {
            "type": "object",
            "required": [
                "x",
                "y"
            ],
            "properties": {
                "x": {
                    "type": "number",
                    "description": "X-coordinate described in the project specific coordinate system.",
                    "unit": "m"
                },
                "y": {
                    "type": "number",
                    "description": "Y-coordinate described in the project specific coordinate system.",
                    "unit": "m"
                }
            }
        }, 
        "action": {
            "type": "object",
            "description": "Describes an action that the mobile robot can perform.",
            "required": [
                "actionType",
                "blockingType"
            ],
            "properties": {
                "actionType": {
                    "type": "string",
                    "description": "Name of action as described in the first column of \"Actions and Parameters\". Identifies the function of the action."
                },
                "actionDescriptor": {
                    "type": "string",
                    "description": "Additional information on the action."
                },
                "blockingType": {
                    "type": "string",
                    "description": "Regulates if the action is allowed to be executed during movement and/or parallel to other actions.\nnone: action can happen in parallel with others, including movement.\nsoft: action can happen simultaneously with others, but not while moving.\nhard: no other actions can be performed while this action is running.",
                    "enum": [
                        "NONE",
                        "SOFT",
                        "SINGLE",
                        "HARD"
                    ]
                },
                "actionParameters": {
                    "type": "array",
                    "description": "Array of actionParameter-objects for the indicated action e. g. deviceId, loadId, external Triggers.",
                    "items": {
                        "$ref": "#/definitions/actionParameter"
                    }
                }
            }
        },
        "actionParameter": {
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
```

  </template>
  <template #en>

```json
{
    "$schema": "http://json-schema.org/draft/2020-12/schema",
    "title": "zoneSet",
    "description": "Zone set detailing a dedicated map.",
    "subtopic": "/zoneSet",
    "type": "object",
    "required": [
        "headerId",
        "timestamp", 
        "version", 
        "manufacturer", 
        "serialNumber",
        "zoneSet"
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
            "description": "Manufacturer of the mobile robot."
        },
        "serialNumber": {
            "type": "string",
            "description": "Serial number of the mobile robot."
        },
        "zoneSet":  {
			"$ref": "#/definitions/zoneSet"
		}
    },
    "definitions": {
        "zoneSet": {
            "type": "object",
                "required": [
                    "mapId", 
                    "zoneSetId", 
                    "zones"
                    ],
                "properties": {
                    "mapId": {
                        "type": "string",
                        "description": "Globally unique identifier of the map the zone set particularizes."
                    },
                    "zoneSetId": {
                        "type": "string",
                        "description": "Globally unique identifier of the zone set."
                    },
                    "zoneSetDescriptor": {
                        "type": "string",
                        "description": "A user-defined, human-readable name or descriptor."
                    },
                    "zones": {
                        "type": "array",
                        "description": "Array of zone objects.",
                        "items": {
                                "$ref": "#/definitions/zone"
                        }
                    }
            }
        },
        "zone": {
            "type": "object",
            "required": [
                "zoneId", 
                "zoneType", 
                "vertices"
                ],
            "properties": {
                "zoneId": {
                    "type": "string",
                    "description": "Locally (within the zone set) unique identifier."
                },
                "zoneType": {
                    "type": "string",
                    "description": "Zone category.",
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
                },
                "zoneDescriptor": {
                    "type": "string",
                    "description": "User-defined human-readable name or descriptor."
                },
                "vertices": {
                    "type": "array",
                    "description": "Array of vertices (in x-y-coordinates) defining the geometrical shape of the zone.",
                    "minItems": 3,
                    "items": {
                        "$ref": "#/definitions/vertex"
                    }
                }
            },
            "allOf": [
                {
                    "if": {
                        "properties": {
                            "zoneType": { "const": "SPEED_LIMIT" }
                        }
                    },
                    "then": {
                        "required": ["maximumSpeed"],
                        "properties": {
                            "maximumSpeed": {
                                "type": "number",
                                "description": "Required in SPEED_LIMIT zone."
                            }
                        }
                    }
                },
                { 
                    "if": {
                        "properties": {
                            "zoneType": { "const": "ACTION" }
                        }
                    },
                    "then": {
                        "required": [
                            "entryActions",
                            "duringActions",
                            "exitActions"
                        ],
                        "properties": {
                            "entryActions": {
                                "type": "array",
                                "description": "Array of actions to be executed when entering the zone.",
                                "items": {
                                    "$ref": "#/definitions/action"
                                }
                            },
                            "duringActions": {
                                "type": "array",
                                "description": "Actions to be executed while crossing the zone. Empty Array, if no Actions required.",
                                "items": {
                                    "$ref": "#/definitions/action"
                                }
                            },
                            "exitActions": {
                                "type": "array",
                                "description": "Actions to be triggered when leaving the zone. Empty Array, if no Actions required.",
                                "items": {
                                    "$ref": "#/definitions/action"
                                }
                            }
                        }
                    }
                },
                {
                    "if": {
                        "properties": {
                            "zoneType": { "const": "PRIORITY" }
                        }
                    },
                    "then": {
                        "required": ["priorityFactor"],
                        "properties": {
                            "priorityFactor ": {
                                "type": "number",
                                "description": "Relative factor, determining the zone's preference over an area with no zone. 0.0 means no preference, as if there was no zone, 1.0 is maximum preference.",
                                "minimum": 0.0,
                                "maximum": 1.0
                            }
                        }
                    }
                },
                {
                    "if": {
                        "properties": {
                            "zoneType": { "const": "PENALTY" }
                        }
                    },
                    "then": {
                        "required": ["penaltyFactor"],
                        "properties": {
                            "penaltyFactor": {
                                "type": "number",
                                "description": "Relative factor, determining the zone's penalty over an area with no zone. 0.0 means no penalty, as if there was no zone, 1.0 is the maximum penalty, causing the mobile robot to take this path only if no other path is possible.",
                                "minimum": 0.0,
                                "maximum": 1.0
                            }
                        }
                    }
                },
                { 
                    "if": {
                        "properties": {
                            "zoneType": { "const": "DIRECTED" }
                        }
                    },
                    "then": {
                        "required": [
                            "direction",
                            "limitation"
                        ],
                        "properties": {
                            "direction": {
                                "type": "number",
                                "description": "Preferred direction of travel within the zone in radians. The direction of travel is the speed vector in the project-specific coordinate system.",
                                "unit": "rad"
                            },
                            "limitation": {
                                "type": "string",
                                "description": "SOFT: Mobile robots may deviate from the defined direction of travel, but should avoid it, RESTRICTED: The mobile robot may deviate from the defined direction of travel, e.g., for obstacle avoidance, but shall never traverse opposite to the defined direction of travel, STRICT: The mobile robot shall not deviate from the defined direction of travel (within its precision).",
                                "enum": [
                                    "SOFT","RESTRICTED","STRICT"
                                ]
                            }
                        }
                    }
                },
                { 
                    "if": {
                        "properties": {
                            "zoneType": { "const": "BIDIRECTED" }
                        }
                    },
                    "then": {
                        "required": [
                            "direction",
                            "limitation"
                        ],
                        "properties": {
                            "direction": {
                                "type": "number",
                                "description": "Direction and its opposite direction (+ Pi) define the allowed directions of travel within the zone in radians. The direction of travel is the speed vector in the project-specific coordinate system."
                            },
                            "limitation": {
                                "type": "string",
                                "description": "SOFT: Mobile robots may deviate from the defined directions of travel, but should avoid it, RESTRICTED: The mobile robot should not traverse in any other direction than the directions of travel, except for obstacle avoidance.",
                                "enum": [
                                    "SOFT","RESTRICTED"
                                ]
                            }
                        }
                    }
                }
            ]
        },
        "vertex": {
            "type": "object",
            "required": [
                "x",
                "y"
            ],
            "properties": {
                "x": {
                    "type": "number",
                    "description": "X-coordinate described in the project specific coordinate system.",
                    "unit": "m"
                },
                "y": {
                    "type": "number",
                    "description": "Y-coordinate described in the project specific coordinate system.",
                    "unit": "m"
                }
            }
        }, 
        "action": {
            "type": "object",
            "description": "Describes an action that the mobile robot can perform.",
            "required": [
                "actionType",
                "blockingType"
            ],
            "properties": {
                "actionType": {
                    "type": "string",
                    "description": "Name of action as described in the first column of \"Actions and Parameters\". Identifies the function of the action."
                },
                "actionDescriptor": {
                    "type": "string",
                    "description": "Additional information on the action."
                },
                "blockingType": {
                    "type": "string",
                    "description": "Regulates if the action is allowed to be executed during movement and/or parallel to other actions.\nnone: action can happen in parallel with others, including movement.\nsoft: action can happen simultaneously with others, but not while moving.\nhard: no other actions can be performed while this action is running.",
                    "enum": [
                        "NONE",
                        "SOFT",
                        "SINGLE",
                        "HARD"
                    ]
                },
                "actionParameters": {
                    "type": "array",
                    "description": "Array of actionParameter-objects for the indicated action e. g. deviceId, loadId, external Triggers.",
                    "items": {
                        "$ref": "#/definitions/actionParameter"
                    }
                }
            }
        },
        "actionParameter": {
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
```

  </template>
</BilingualSection>
