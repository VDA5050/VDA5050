# Visualization Schema

<BilingualSection>
  <template #ko>
    시각화 목적으로 로봇의 위치, 경로, 속도를 전송하는 Visualization 메시지 사양입니다.
    `plannedPath`, `intermediatePath`, `mobileRobotPosition`, `velocity`는 선택 사항이지만, 헤더 필드와 `referenceStateHeaderId`는 필수입니다.
  </template>
  <template #en>
    The Visualization message communicates position, path, and velocity for visualization purposes.
    `plannedPath`, `intermediatePath`, `mobileRobotPosition`, and `velocity` are optional, but the header fields and `referenceStateHeaderId` are required.
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
| referenceStateHeaderId | integer | ✅ | 이 Visualization 메시지가 참조하는 State 메시지의 headerId입니다. |
| plannedPath | object | ❌ |  |
| intermediatePath | object | ❌ |  |
| mobileRobotPosition | object | ❌ |  |
| velocity | object | ❌ |  |

### plannedPath

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| trajectory | object | ✅ |  |
| traversedNodes | array | ❌ | 공유 계획 경로 내에서 탐색되는 현재 실행된 순서로 전달되는 nodeId 배열입니다. |

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
| localizationScore | number | ❌ | 위치 파악 품질을 설명하므로 SLAM 모바일 로봇 등에서 현재 위치 정보가 얼마나 정확한지 설명하는 데 사용할 수 있습니다. 0.0: 위치를 알 수 없음 1.0: 알려진 위치 현지화 점수를 추정할 수 없는 차량의 경우 선택 사항입니다. 로깅 및 시각화 목적으로만 사용 |
| deviationRange | number | ❌ | 위치 편차 범위 값(미터)입니다. 그리드 기반 위치 파악과 같이 편차를 추정할 수 없는 차량의 경우 선택 사항입니다. 로깅 및 시각화 목적으로만 사용됩니다. |

### velocity

| 필드 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| vx | number | ❌ | X 방향의 모바일 로봇 속도입니다. |
| vy | number | ❌ | 모바일 로봇의 Y 방향 속도입니다. |
| omega | number | ❌ | Z축을 중심으로 한 모바일 로봇의 회전 속도입니다. |

  </template>
  <template #en>

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| headerId | integer | ✅ | headerId of the message. The headerId is defined per topic and incremented by 1 with each sent (but not necessarily received) message. |
| timestamp | string | ✅ | Timestamp in ISO8601 format (YYYY-MM-DDTHH:mm:ss.fffZ). |
| version | string | ✅ | Version of the protocol [Major].[Minor].[Patch] |
| manufacturer | string | ✅ | Manufacturer of the mobile robot |
| serialNumber | string | ✅ | Serial number of the mobile robot. |
| referenceStateHeaderId | integer | ✅ | Header ID of the `state` message this visualization message refers to. |
| plannedPath | object | ❌ |  |
| intermediatePath | object | ❌ |  |
| mobileRobotPosition | object | ❌ |  |
| velocity | object | ❌ |  |

### plannedPath

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| trajectory | object | ✅ |  |
| traversedNodes | array | ❌ | Array of nodeIds as communicated in the currently executed order that are traversed within the shared planned path. |

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
| vx | number | ❌ | The mobile robot's velocity in its X-direction. |
| vy | number | ❌ | The mobile robot's velocity in its Y-direction. |
| omega | number | ❌ | The mobile robot's turning speed around its Z-axis. |

  </template>
</BilingualSection>

## 스키마 원문

<BilingualSection>
  <template #ko>

```json
{
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "title": "visualization",
    "description": "Mobile robot position and/or velocity for visualization purposes. Can be published at a higher rate if wanted. Since bandwidth may be expensive depening on the update rate for this topic, all fields are optional.",
    "subtopic": "/visualization",
    "type": "object",
    "required": [
        "headerId",
        "timestamp", 
        "version", 
        "manufacturer", 
        "serialNumber",
        "referenceStateHeaderId"
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
            "$ref": "#/definitions/velocity"
        },
    },
    "definitions": {
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
                            }
                        }
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
        "velocity": {
            "type": "object",
            "title": "velocity",
            "description": "The mobile robot's velocity in mobile robot's coordinates",
            "properties": {
                "vx": {
                    "type": "number",
                    "description": "The mobile robot's velocity in its X-direction."
                },
                "vy": {
                    "type": "number",
                    "description": "The mobile robot's velocity in its Y-direction."
                },
                "omega": {
                    "type": "number",
                    "description": "The mobile robot's turning speed around its Z-axis."
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
    "title": "visualization",
    "description": "Mobile robot position and/or velocity for visualization purposes. Can be published at a higher rate if wanted. Since bandwidth may be expensive depening on the update rate for this topic, all fields are optional.",
    "subtopic": "/visualization",
    "type": "object",
    "required": [
        "headerId",
        "timestamp", 
        "version", 
        "manufacturer", 
        "serialNumber",
        "referenceStateHeaderId"
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
            "$ref": "#/definitions/velocity"
        },
    },
    "definitions": {
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
                            }
                        }
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
        "velocity": {
            "type": "object",
            "title": "velocity",
            "description": "The mobile robot's velocity in mobile robot's coordinates",
            "properties": {
                "vx": {
                    "type": "number",
                    "description": "The mobile robot's velocity in its X-direction."
                },
                "vy": {
                    "type": "number",
                    "description": "The mobile robot's velocity in its Y-direction."
                },
                "omega": {
                    "type": "number",
                    "description": "The mobile robot's turning speed around its Z-axis."
                }
            }
        }
    }
}
```

  </template>
</BilingualSection>
