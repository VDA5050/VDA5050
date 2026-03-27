![logo](https://raw.githubusercontent.com/VDA5050/VDA5050/main/assets/logo.png)

<BilingualSection>
  <template #ko>
<div>

## 모바일 로봇과 플릿 제어 간 통신을 위한 인터페이스

### VDA 5050

### 버전 3.0.0

</div>
  </template>
  <template #en>
<div>

## Interface for the Communication between Mobile Robots and a Fleet Control

### VDA 5050

### Version 3.0.0

</div>
  </template>
</BilingualSection>

![Fleet control system and mobile robots](https://raw.githubusercontent.com/VDA5050/VDA5050/main/assets/csagv.png)

# Disclaimer

<BilingualSection>
  <template #ko>
<div>

다음 설명은 모바일 로봇과 플릿 관리 시스템 간 통신을 가능하게 하는 인터페이스 구현을 위한 안내를 제공하기 위한 것입니다. 모든 사용자에게 자유롭게 제공되며 구속력이 없습니다. 이 지침을 적용하기로 선택한 당사자는 각 사례에서 올바르고 적절한 사용을 보장할 책임이 있습니다.

사용자는 지침이 적용되는 시점의 당시 기술 수준을 고려해야 합니다. 이러한 제안의 사용은 어떤 당사자도 자신의 행위에 대한 책임으로부터 면제되지 않습니다. 본 진술은 포괄적이라고 주장하지 않으며, 기존 법률에 대한 권위 있는 해석을 구성하지 않습니다. 관련 정책, 법령 또는 규정을 검토하고 준수할 필요를 대체하지 않습니다.

또한 각 제품의 구체적 특성과 다양한 잠재적 적용 분야를 고려해야 합니다. 모든 사용자는 자기 책임 하에 행동합니다. 이러한 제안의 개발 또는 적용에 관여한 VDA·VDMA 또는 개인에 대한 책임은 배제됩니다.

이러한 제안의 적용에서 부정확성이나 오해의 소지가 있는 위험을 발견한 경우, 필요한 수정이 이루어질 수 있도록 즉시 VDA에 알려 주시기 바랍니다.

**발행**
Verband der Automobilindustrie e. V. (VDA)
Behrenstraße 35, 10117 Berlin,
Germany
www.vda.de

**저작권**
Association of the Automotive Industry (VDA)
출처를 명시한 경우에만 복제 및 기타 모든 형태의 복제가 허용됩니다.

버전 3.0.0

</div>
  </template>
  <template #en>
<div>

The following explanations are intended to provide guidance for implementing an interface that enables communication between mobile robots and a fleet management system. They are intended to be freely accessible to all users and are non-binding. Any party choosing to apply these guidelines is responsible for ensuring their correct and appropriate use in each specific case.

Users must consider the applicable state of the art at the time the guidelines are applied. The use of these proposals does not relieve any party of responsibility for its own actions. These statements do not claim to be exhaustive, nor do they constitute an authoritative interpretation of existing laws. They do not replace the need to review and comply with relevant policies, legislation, or regulations.

In addition, the specific characteristics of the respective products and their various potential applications must be considered. All users act at their own risk. Any liability on the part of the VDA and VDMA or any individuals involved in the development or application of these proposals is excluded.

If you identify any inaccuracies in the application of these proposals or potential risks of misinterpretation, please notify the VDA immediately so that any necessary corrections can be made.

**Publisher**
Verband der Automobilindustrie e. V. (VDA)
Behrenstraße 35, 10117 Berlin,
Germany
www.vda.de

**Copyright**
Association of the Automotive Industry (VDA)
Reproduction and any other form of reproduction is only permitted with specification of the source.

Version 3.0.0

</div>
  </template>
</BilingualSection>


## Table of contents

<BilingualSection>
  <template #ko>
<div>

[0 머리말](/spec/0-foreword#0-foreword)<br>
[1 서론](/spec/1-introduction#1-introduction)<br>
[2 적용 범위](/spec/2-scope#2-scope)<br>
[3 용어 정의](/spec/3/3.1-1#3-definitions)<br>
  [3.1 모바일 로봇](/spec/3/3.1-1#31-mobile-robot)<br>
  [3.2 이동(Moving)](/spec/3/3.2-2#32-moving)<br>
  [3.3 주행(Driving)](/spec/3/3.3-3#33-driving)<br>
  [3.4 자동 주행](/spec/3/3.4-4#34-automatic-driving)<br>
  [3.5 수동 주행](/spec/3/3.5-5#35-manual-driving)<br>
  [3.6 라인 유도 모바일 로봇](/spec/3/3.6-6#36-line-guided-mobile-robot)<br>
  [3.7 자율 항법 모바일 로봇](/spec/3/3.7-7#37-freely-navigating-mobile-robot)<br>
[4 전송 프로토콜](/spec/4/4.0#4-transport-protocol)<br>
  [4.1 연결 처리, 보안 및 QoS](/spec/4/4.1#41-connection-handling-security-and-qos)<br>
  [4.2 Topic 수준](/spec/4/4.2#42-topic-levels)<br>
  [4.3 통신용 Topic](/spec/4/4.3#43-topics-for-communication)<br>
[5 통신의 절차 및 내용](/spec/5/5.1#5-process-and-content-of-communication)<br>
  [5.1 일반](/spec/5/5.1#51-general)<br>
  [5.2 구현 단계](/spec/5/5.2#52-implementation-phase)<br>
  [5.3 플릿 제어의 기능](/spec/5/5.3#53-functions-of-the-fleet-control)<br>
  [5.4 모바일 로봇의 기능](/spec/5/5.4#54-functions-of-the-mobile-robots)<br>
[6 프로토콜 사양](/spec/6/6.1#6-protocol-specification)<br>
  [6.1 Order](/spec/6/6.1#61-order)<br>
    [6.1.1 개념과 논리](/spec/6/6.1#611-concept-and-logic)<br>
    [6.1.2 Order 및 Order 업데이트](/spec/6/6.1#612-orders-and-order-update)<br>
    [6.1.3 Order 취소](/spec/6/6.1#613-order-cancellation)<br>
    [6.1.4 Order 거부](/spec/6/6.1#614-order-rejection)<br>
    [6.1.5 Corridor](/spec/6/6.1#615-corridors)<br>
  [6.2 Actions](/spec/6/6.2#62-actions)<br>
    [6.2.1 Instant Actions](/spec/6/6.2#621-instant-actions)<br>
    [6.2.2 Action 차단 유형 및 순서](/spec/6/6.2#622-action-blocking-types-and-sequence)<br>
    [6.2.3 사전 정의된 action](/spec/6/6.2#623-predefined-actions)<br>
  [6.3 Maps](/spec/6/6.3#63-maps)<br>
    [6.3.1 Map 배포](/spec/6/6.3#631-map-distribution)<br>
    [6.3.2 모바일 로봇 State의 map](/spec/6/6.3#632-maps-in-the-mobile-robot-state)<br>
    [6.3.3 Map 다운로드](/spec/6/6.3#633-map-download)<br>
    [6.3.4 다운로드한 map 활성화](/spec/6/6.3#634-enable-downloaded-maps)<br>
    [6.3.5 모바일 로봇에서 map 삭제](/spec/6/6.3#635-delete-maps-on-the-mobile-robot)<br>
  [6.4 Zones](/spec/6/6.4#64-zones)<br>
    [6.4.1 Zone 유형](/spec/6/6.4#641-zone-types)<br>
    [6.4.2 Zone Set 전달](/spec/6/6.4#642-zone-set-transfer)<br>
    [6.4.3 대화형 zone을 위한 통신](/spec/6/6.4#643-communication-for-interactive-zones)<br>
    [6.4.4 Zone 간 상호작용](/spec/6/6.4#644-interactions-between-zones)<br>
    [6.4.5 Zone 내 오류 처리](/spec/6/6.4#645-error-handling-within-zones)<br>
  [6.5 Connection](/spec/6/6.5#65-connection)<br>
  [6.6 State](/spec/6/6.6#66-state)<br>
    [6.6.1 개념과 논리](/spec/6/6.6#661-concept-and-logic)<br>
    [6.6.2 노드 및 edge 통과](/spec/6/6.6#662-traversal-of-nodes-and-edges)<br>
    [6.6.3 기본 요청](/spec/6/6.6#663-base-request)<br>
    [6.6.4 정보](/spec/6/6.6#664-information)<br>
    [6.6.5 오류](/spec/6/6.6#665-errors)<br>
    [6.6.6 동작 모드](/spec/6/6.6#666-operating-mode)<br>
    [6.6.7 모바일 로봇에서 Order 해제](/spec/6/6.6#667-clearing-the-order-on-the-mobile-robot)<br>
    [6.6.8 모바일 로봇의 유휴 상태](/spec/6/6.6#668-idle-state-of-the-mobile-robot)<br>
    [6.6.9 Action State](/spec/6/6.6#669-action-states)<br>
    [6.6.10 Corridor 사용 요청](/spec/6/6.6#6610-request-use-of-corridors)<br>
  [6.7 Visualization](/spec/6/6.7#67-visualization)<br>
  [6.8 자율 항법 모바일 로봇을 위한 계획 경로 공유](/spec/6/6.8#68-sharing-of-planned-paths-for-freely-navigating-mobile-robots)<br>
  [6.9 요청/응답 메커니즘](/spec/6/6.9#69-requestresponse-mechanism)<br>
  [6.10 Factsheet](/spec/6/6.10#610-factsheet)<br>
[7 메시지 사양](/spec/7/7.1#7-message-specification)<br>
  [7.1 표의 기호와 서식의 의미](/spec/7/7.1#71-symbols-of-the-tables-and-meaning-of-formatting)<br>
    [7.1.1 선택 필드](/spec/7/7.1#711-optional-fields)<br>
    [7.1.2 허용 문자 및 필드 길이](/spec/7/7.1#712-permitted-characters-and-field-lengths)<br>
    [7.1.3 필드, Topic, 열거형 표기](/spec/7/7.1#713-notation-of-fields-topics-and-enumerations)<br>
    [7.1.4 JSON 데이터 형식](/spec/7/7.1#714-json-data-types)<br>
  [7.2 프로토콜 헤더](/spec/7/7.2#72-protocol-header)<br>
  [7.3 Order 메시지 구현](/spec/7/7.3#73-implementation-of-the-order-message)<br>
    [7.3.1 Action 매개변수 형식](/spec/7/7.3#731-format-of-action-parameters)<br>
  [7.4 instantAction 메시지 구현](/spec/7/7.4#74-implementation-of-the-instantaction-message)<br>
  [7.5 Responses 메시지 구현](/spec/7/7.5#75-implementation-of-the-response-message)<br>
  [7.6 Zone Set 메시지 구현](/spec/7/7.6#76-implementation-of-the-zoneset-message)<br>
  [7.7 Connection 메시지 구현](/spec/7/7.7#77-implementation-of-the-connection-message)<br>
  [7.8 State 메시지 구현](/spec/7/7.8#78-implementation-of-the-state-message)<br>
  [7.9 Visualization 메시지 구현](/spec/7/7.9#79-implementation-of-the-visualization-message)<br>
  [7.10 Factsheet 메시지 구현](/spec/7/7.10#710-implementation-of-the-factsheet-message)<br>

</div>
  </template>
  <template #en>
<div>

[0 Foreword](/spec/0-foreword#0-foreword)<br>
[1 Introduction](/spec/1-introduction#1-introduction)<br>
[2 Scope](/spec/2-scope#2-scope)<br>
[3 Definitions](/spec/3/3.1-1#3-definitions)<br>
  [3.1 Mobile Robot](/spec/3/3.1-1#31-mobile-robot)<br>
  [3.2 Moving](/spec/3/3.2-2#32-moving)<br>
  [3.3 Driving](/spec/3/3.3-3#33-driving)<br>
  [3.4 Automatic driving](/spec/3/3.4-4#34-automatic-driving)<br>
  [3.5 Manual driving](/spec/3/3.5-5#35-manual-driving)<br>
  [3.6 Line-guided mobile robot](/spec/3/3.6-6#36-line-guided-mobile-robot)<br>
  [3.7 Freely navigating mobile robot](/spec/3/3.7-7#37-freely-navigating-mobile-robot)<br>
[4 Transport protocol](/spec/4/4.0#4-transport-protocol)<br>
  [4.1 Connection handling, security and QoS](/spec/4/4.1#41-connection-handling-security-and-qos)<br>
  [4.2 Topic levels](/spec/4/4.2#42-topic-levels)<br>
  [4.3 Topics for communication](/spec/4/4.3#43-topics-for-communication)<br>
[5 Process and content of communication](/spec/5/5.1#5-process-and-content-of-communication)<br>
  [5.1 General](/spec/5/5.1#51-general)<br>
  [5.2 Implementation Phase](/spec/5/5.2#52-implementation-phase)<br>
  [5.3 Functions of the fleet control](/spec/5/5.3#53-functions-of-the-fleet-control)<br>
  [5.4 Functions of the mobile robots](/spec/5/5.4#54-functions-of-the-mobile-robots)<br>
[6 Protocol specification](/spec/6/6.1#6-protocol-specification)<br>
  [6.1 Order](/spec/6/6.1#61-order)<br>
    [6.1.1 Concept and logic](/spec/6/6.1#611-concept-and-logic)<br>
    [6.1.2 Orders and order updates](/spec/6/6.1#612-orders-and-order-update)<br>
    [6.1.3 Order cancellation](/spec/6/6.1#613-order-cancellation)<br>
    [6.1.4 Order rejection](/spec/6/6.1#614-order-rejection)<br>
    [6.1.5 Corridors](/spec/6/6.1#615-corridors)<br>
  [6.2 Actions](/spec/6/6.2#62-actions)<br>
    [6.2.1 Instant actions](/spec/6/6.2#621-instant-actions)<br>
    [6.2.2 Action blocking types and sequence](/spec/6/6.2#622-action-blocking-types-and-sequence)<br>
    [6.2.3 Predefined actions](/spec/6/6.2#623-predefined-actions)<br>
  [6.3 Maps](/spec/6/6.3#63-maps)<br>
    [6.3.1 Map distribution](/spec/6/6.3#631-map-distribution)<br>
    [6.3.2 Maps in mobile robot state](/spec/6/6.3#632-maps-in-the-mobile-robot-state)<br>
    [6.3.3 Map download](/spec/6/6.3#633-map-download)<br>
    [6.3.4 Enable downloaded maps](/spec/6/6.3#634-enable-downloaded-maps)<br>
    [6.3.5 Delete maps on the mobile robot](/spec/6/6.3#635-delete-maps-on-the-mobile-robot)<br>
  [6.4 Zones](/spec/6/6.4#64-zones)<br>
    [6.4.1 Zone types](/spec/6/6.4#641-zone-types)<br>
    [6.4.2 Zone Set transfer](/spec/6/6.4#642-zone-set-transfer)<br>
    [6.4.3 Communication for interactive zones](/spec/6/6.4#643-communication-for-interactive-zones)<br>
    [6.4.4 Interaction between zones](/spec/6/6.4#644-interactions-between-zones)<br>
    [6.4.5 Error handling within zones](/spec/6/6.4#645-error-handling-within-zones)<br>
  [6.5 Connection](/spec/6/6.5#65-connection)<br>
  [6.6 State](/spec/6/6.6#66-state)<br>
    [6.6.1 Concept and logic](/spec/6/6.6#661-concept-and-logic)<br>
    [6.6.2 Traversal of nodes and edges](/spec/6/6.6#662-traversal-of-nodes-and-edges)<br>
    [6.6.3 Base request](/spec/6/6.6#663-base-request)<br>
    [6.6.4 Information](/spec/6/6.6#664-information)<br>
    [6.6.5 Errors](/spec/6/6.6#665-errors)<br>
    [6.6.6 Operating Mode](/spec/6/6.6#666-operating-mode)<br>
    [6.6.7 Clearing the order on the mobile robot](/spec/6/6.6#667-clearing-the-order-on-the-mobile-robot)<br>
    [6.6.8 Idle state of the mobile robot](/spec/6/6.6#668-idle-state-of-the-mobile-robot)<br>
    [6.6.9 Action states](/spec/6/6.6#669-action-states)<br>
    [6.6.10 Request use of Corridors](/spec/6/6.6#6610-request-use-of-corridors)<br>
  [6.7 Visualization](/spec/6/6.7#67-visualization)<br>
  [6.8 Sharing of planned paths for freely navigating mobile robots](/spec/6/6.8#68-sharing-of-planned-paths-for-freely-navigating-mobile-robots)<br>
  [6.9 Request/response mechanism](/spec/6/6.9#69-requestresponse-mechanism)<br>
  [6.10 Factsheet](/spec/6/6.10#610-factsheet)<br>
[7 Message specification](/spec/7/7.1#7-message-specification)<br>
  [7.1 Symbols of the tables and meaning of formatting](/spec/7/7.1#71-symbols-of-the-tables-and-meaning-of-formatting)<br>
    [7.1.1 Optional fields](/spec/7/7.1#711-optional-fields)<br>
    [7.1.2 Permitted characters and field lengths](/spec/7/7.1#712-permitted-characters-and-field-lengths)<br>
    [7.1.3 Notation of fields, topics and enumerations](/spec/7/7.1#713-notation-of-fields-topics-and-enumerations)<br>
    [7.1.4 JSON data types](/spec/7/7.1#714-json-data-types)<br>
  [7.2 Protocol header](/spec/7/7.2#72-protocol-header)<br>
  [7.3 Implementation of the order message](/spec/7/7.3#73-implementation-of-the-order-message)<br>
    [7.3.1 Format of action parameters](/spec/7/7.3#731-format-of-action-parameters)<br>
  [7.4 Implementation of the instantAction message](/spec/7/7.4#74-implementation-of-the-instantaction-message)<br>
  [7.5 Implementation of the response message](/spec/7/7.5#75-implementation-of-the-response-message)<br>
  [7.6 Implementation of the zoneSet message](/spec/7/7.6#76-implementation-of-the-zoneset-message)<br>
  [7.7 Implementation of the connection message](/spec/7/7.7#77-implementation-of-the-connection-message)<br>
  [7.8 Implementation of the state message](/spec/7/7.8#78-implementation-of-the-state-message)<br>
  [7.9 Implementation of the visualization message](/spec/7/7.9#79-implementation-of-the-visualization-message)<br>
  [7.10 Implementation of the factsheet message](/spec/7/7.10#710-implementation-of-the-factsheet-message)<br>

</div>
  </template>
</BilingualSection>
