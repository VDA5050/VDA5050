---
title: VDA 5050 3.0.0
description: 공식 VDA 5050 3.0.0 문서 상태 및 변경 요약 (GitHub Discussion #596 기준)
---

# VDA 5050 3.0.0

아래 내용은 VDA가 **2026년 3월 19일**에 공개한 VDA 5050 버전 3.0.0 문서 상태를 정리한 것입니다. 원문·토론은 공식 저장소를 참고하세요.

- **원문 토론 (GitHub Discussions):** [VDA 5050 3.0.0 #596](https://github.com/VDA5050/VDA5050/discussions/596)

## 동영상 요약

[VDA 5050 v3.0 Explained (15 min): Key Changes for Mobile Robots & Fleet Control](https://youtu.be/SLUcnva1lRs) — 모바일 로봇·플릿 제어 관점의 주요 변경 사항 개요 영상입니다.

<AISummaryCollapse id="updates-video-summary">

VDA 5050 버전 3.0.0은 기존의 무인 운반차(AGV)를 넘어 **자율 주행 로봇(AMR)을 포함한 모든 유형의 모바일 로봇을 수용**할 수 있는 표준으로 진화했습니다. 주요 업데이트 내용은 다음과 같습니다.

## 1. 자유 주행(Free Navigation) 및 '존(Zone)' 개념 도입

버전 3.0의 가장 핵심적인 변화는 로봇이 스스로 경로를 계획하는 자유 주행을 공식적으로 지원한다는 점입니다.

- **경로 공유:** 로봇은 장기적인 **계획 경로(Planned Path)**와 도착 예정 시간(ETA)이 포함된 단기적인 **중간 경로(Intermediate Path)**를 플릿 제어 시스템과 공유해야 합니다.
- **윤곽선 기반 존 (Contour Zones):** 로봇의 전체 형상(Footprint)이 구역에 진입했는지가 기준이 됩니다.
  - **속도 제한(Reduced Speed):** 구역 내 속도 제한 적용.
  - **해제 존(Release Zone):** 교통 관리를 위해 승인을 받아야 진입 가능하며, 나갈 때도 보고해야 함.
  - **라인 가이드 존(Line-guided Zone):** 해당 구역 내에서는 정해진 경로만 따라감.
  - **액션 존(Action Zone):** 진입(Entry), 진행(During), 퇴장(Exit) 시 특정 액션 수행.
- **운동학적 중심 기반 존 (Kinematic Center-based Zones):** 로봇의 중심점을 기준으로 교통 흐름을 제어합니다.
  - **일방통행(Directed) / 양방향(Bi-directed):** 통행 방향 제어.
  - **우선순위(Incentivize) / 기피(De-incentivize):** 경로 계획 시 선호하거나 피해야 할 구역 설정.

## 2. 운영 모드 및 액션 상태의 확장

로봇의 상태를 더 정밀하게 정의하고 제어할 수 있도록 새로운 개념들이 추가되었습니다.

- **운영 모드(Operating Modes):**
  - **STARTUP:** 로봇이 가동 중이지만 아직 데이터가 신뢰할 수 없는 준비 단계.
  - **MANUAL:** 사람이 로봇을 직접 조작하는 상태.
  - **INTERVENED:** 사람이 로봇을 잠시 옮기더라도 로봇이 스스로 위치를 복구하여 미션을 계속 수행할 수 있는 모드.
- **액션 상태(Action States):** 실패한 액션을 다시 시도하거나 건너뛸 수 있는 **'RETRIABLE'** 상태가 추가되었습니다.
- **블로킹 타입(Blocking Types):** 액션 간의 병렬 실행 여부를 결정하는 `SINGLE`(주행은 가능하나 병렬 액션 불가) 등이 정교화되었습니다.

## 3. 에러 레벨(Error Levels) 세분화

상황에 따른 즉각적인 대응을 위해 에러 레벨이 4단계로 정의되었습니다.

- **Warning:** 주의가 필요하지만 미션 및 신규 주문 수행 가능.
- **Urgent:** 즉각적인 조치가 필요함(예: 센서 청소). 현재 주문과 신규 주문은 수행 가능.
- **Critical:** 즉각적인 조치가 필요하며 현재 주문을 계속할 수 없음. 단, 다른 목적지로 가는 신규 주문은 수용 가능.
- **Fatal:** 로봇 고장으로 인해 사람의 개입 없이는 어떤 주문도 수행 불가.

## 4. 새로운 사전 정의 액션 (Predefined Actions)

업계의 요구사항을 반영하여 유용한 액션들이 표준에 포함되었습니다.

- **에너지 관리:** 로봇을 절전 모드로 보내거나 깨우는 `startHibernation`, `stopHibernation` 및 완전 종료를 위한 `shutdown`.
- **트리거(Trigger):** 외부 장치를 기다리던 로봇에게 플릿 제어가 주문을 계속 진행하라고 명령하는 기능.

## 5. 기타 기술적 개선 사항

- **허용 오차(Allowed Deviation):** 경로 이탈 허용 범위를 **타원(Ellipse)** 형태로 표현하여 코너링 등을 더 정밀하게 제어합니다.
- **좌표계 명확화:** 서로 다른 제조사의 로봇들이 섞여 있는 환경에서도 혼선이 없도록 좌표계 정의를 구체화했습니다.
- **문서 및 시각화:** 사용자의 이해를 돕기 위해 용어를 표준화하고, 흐름도(UML) 및 도식(Figures)을 전면적으로 개편했습니다.

</AISummaryCollapse>

---

<BilingualSection>
  <template #ko>
<div>

다음은 VDA가 2026년 3월 19일 공개한 VDA 5050 Version 3.0 문서 상태입니다.

</div>
  </template>
  <template #en>
<div>

This is the state of the Document of VDA 5050 Version 3.0 as released by the VDA on March 19th, 2026.

</div>
  </template>
</BilingualSection>

## Major Changes

<BilingualSection>
  <template #ko>
<div>

- 자율 항법 모바일 로봇 지원(계획 경로 공유, Zone 개념)
- operating mode 재작업 및 확장
- blocking type 재작업 및 확장
- action state 재작업 및 확장
- 다양한 개념 전반에 대한 개정 및 명확화
- 그림(illustration) 개정 및 추가
- 문서 전체 구조 전면 재구성

</div>
  </template>
  <template #en>
<div>

- Support of freely navigating mobile robots (planned path sharing, zone concept)
- Rework and extension of operating modes
- Rework and extension of blocking types
- Rework and extension of action states
- General revision and clarification of various concepts
- Revision and addition of illustrations
- Complete restructuring of the document

</div>
  </template>
</BilingualSection>

## Detailed changes

<BilingualSection>
  <template #ko>
<div>

- 모바일 로봇은 planned path 및 intermediate path 형태로 계획 이동 정보를 공유할 수 있습니다.
- 차량 동작과 내비게이션에 영향을 주기 위해 contour 기반 Zone과 kinematic center 기반 Zone 개념이 도입되었습니다.
- 오류를 더 명확히 구분하기 위해 새로운 error level `CRITICAL`, `URGENT`가 도입되었습니다.
- State message에 `batteryCurrent` 선택 필드가 추가되었습니다.
- 확장된 `allowedDeviationXY`를 타원으로 표현하도록 변경되었고, 코너 컷팅 시 허용 편차 사용이 명확화되었습니다.
- `timestamp`는 1/100 s 대신 더 일반적인 1/1000 s 단위로 변경되었습니다.
- NURBS 정의가 산업 표준에 맞게 업데이트되었습니다.
- Terminology and Definitions를 모은 장(chapter)이 추가되었습니다.
- `cancelOrder`에 선택 변수로 `orderId`가 추가되었습니다.
- Figure 1,2,3,4,7,11,14,15가 현재 용어/스타일에 맞게 명확화 목적으로 재작업되었습니다.
- Factsheet에 충전 정보용 `battery` 객체가 추가되었습니다.
- 로봇이 broker에 연결되어 있으나 완전히 기동되기 전, Order 수신 준비 상태를 나타내는 `STARTUP` operating mode가 도입되었습니다.
- `nodeStates`/`edgeStates`가 비어 있고 `actionStates`가 모두 `FAILED` 또는 `FINISHED`일 때의 idle state 정의가 추가되었습니다.
- 자동 주행은 허용하되 병렬 action은 허용하지 않는 Blocking Type `SINGLE`이 추가되었습니다.
- Blocking Type 사용에 대한 Figure 17이 재작업 및 명확화되었습니다.
- 필드 `positionInitialized`가 `localized`로 변경되었고, `localized`가 신뢰 가능한 로봇 위치를 의미함을 명확히 했습니다.
- 상대값 `localizationScore` 사용 방식이 명확화되었습니다.
- `pauseAllowed`, `cancelAllowed` 파라미터가 추가되었습니다.
- instant action `updateCertificate`가 추가되었습니다.
- 모바일 로봇의 "Clearing the order" 개념이 명확화되었습니다.
- `MANUAL` operating mode가 기대 동작을 더 정확히 설명하도록 재작업되었습니다.
- Order를 clear하지 않고도 자율 항법 모바일 로봇을 중단(interrupt)할 수 있도록 `INTERVENED` operating mode가 추가되었습니다.
- operatingMode별 기대 동작을 설명하는 표가 추가되었습니다.
- 유효한 `lastNodeId`가 없을 때 `lastNodeSequenceId` 정의가 수정되었습니다.
- `waitForTrigger`가 재작업되었고 trigger instantAction이 추가되었습니다.
- ActionStates가 대응 action별로 `actionStates`, `instantActionStates`, `zoneActionStates`로 분리되었으며, 새 배열은 new Order 대신 대응 instantAction으로 정리되도록 변경되었습니다.
- 외부 트리거 또는 MC 입력으로 재시도/스킵 가능한 action을 위해 새로운 action state `RETRIABLE`이 추가되었습니다.
- 가능한 action state 전이 예시를 보여주는 전이 매트릭스가 추가되었습니다.
- 파라미터 `rotationAllowed`가 `reachOrientationBeforeEntering`로 이름 변경 및 의미 반전(inverted behavior)되었습니다.
- 모든 모바일 로봇이 `startPause`, `stopPause`, `cancelOrder` action을 지원하도록 필수화되었습니다.
- 파라미터 `eStop`이 `activeEmergenceStop`으로 이름 변경되었고 enum `AUTOACK`가 제거되었습니다.
- `errorDescription`, `errorHint` 번역 배열이 추가되었습니다.
- errors가 재작업되어 `errorTypes`가 확장 가능한 enum으로 변경되었고, 이름 및 정의가 더 정밀해졌습니다.
- description(긴 설명)과 descriptor(짧은 이름/간략 설명)의 구분이 추가되었습니다.
- 문서의 범위와 한계가 명확화되었습니다.
- 에너지 절감 모드용 instant action `StartHibernation`/`stopHibernation` 및 generic shutdown이 추가되었습니다.
- 가능한 경우 미리 정의된 값을 사용하되 필요 시 확장 가능하도록 extensible enum 개념이 도입되었습니다.
- 명확성을 위해 파라미터 이름이 대대적으로 재작업(브레이킹)되었고 약어가 제거되었습니다. 전체 변경 표는 PR([Rework: renaming of parameter for clarity. No abbreviations. #465](https://github.com/VDA5050/VDA5050/pull/465))를 참고하세요.
- 자율 항법 모바일 로봇의 주기 증가 가능성으로 인해 `Visualization` topic은 단순 시각화 목적을 넘어 교통 제어에 유용한 planned/intermediate path 고빈도 전달 용도로도 사용되도록 설명이 보강되었습니다. 또한 변경 설명을 위해 참조된 State message header 참조가 추가되었습니다.
- Order의 edge 파라미터 `maximumHeight` → `maximumMobileRobotHeight`, `minimumHeight` → `minimumLoadHandlingDeviceHeight`로 이름이 변경되어 의도가 명확해졌습니다.
- extensible enum과 충돌하므로 protocol limits의 Factsheet 파라미터 `maximumEnumLength`가 제거되었습니다.
- 새 Order의 첫 번째 Order message는 항상 `orderUpdateId` 0을 사용하도록 정의되었습니다.
- 취소된 Order는 다시 업데이트하면 안 된다는 점이 명확화되었습니다.
- 연결 실패 등으로 동일 메시지를 재전송한 것인지, 혹은 동일 `orderUpdateId`에 다른 내용을 보낸 것인지를 구분하는 검사가 추가되었고, 후자의 경우 사전 정의된 오류를 발생시키도록 변경되었습니다.
- State message의 `batteryState` 객체가 `powerSupply`로 재작업되었고 `batteryCharge`는 `stateOfCharge`로 이름 변경되었습니다.
- Order message edge 객체에서 `startNode`, `endNode`가 제거되었습니다.
- Zone에서 polygon을 사용함에 따라 Factsheet 내 관련 명명도 일반적인 네이밍 규칙에 맞게 재작업되었습니다.
- predefined action `pick`에서 `stationType`, `loadType`이 선택(optional)으로 변경되었습니다.

</div>
  </template>
  <template #en>
<div>

- Mobile robots can share their planned movement as planned and intermediate path.
- Zones are introduced to influence the vehicles behavior and navigation through contour based and kinematic center based zones.
- New error levels 'CRITICAL' and 'URGENT' were introduced for clearer differentiation between errors.
- Added batteryCurrent as an optional field to the state message.
- Extended allowedDeviationXY is now represented as an ellipse and clarified the use of allowed deviation for corner cutting.
- Changed timestamp to the more commonly used 1/1000 s instead of 1/100 s.
- Updating the definition of NURBS according to industry standard.
- Added chapter to collect Terminology and Definitions.
- cancelOrder: Added orderId to cancelOrder as an optional variable.
- Rework of figures 1,2,3,4,7,11,14,15 for clarification and to fit current wording and style.
- "battery" object for charging information added to fact sheet.
- Operating mode STARTUP introduced, to represent state where robot is already connected to broker but not fully started up yet and ready to receive orders.
- Definition of an idle state for vehicles with empty nodeStates and edgeStates and all actions in actionStates either 'FAILED' or 'FINISHED'.
- Addition of Blocking Type SINGLE for actions that can not be executed in parallel but automatic driving is still allowed.
- Rework and Clarification of Figure 17 on the use of Blocking Types.
- Changed field 'positionInitialized' to 'localized', clarified 'localized' means the robots position can be trusted.
- Clarification on use of relative value localizationScore.
- Added the pauseAllowed and cancelAllowed parameter.
- Added instant action 'updateCertificate'.
- Clarification of 'Clearing the order' on the mobile robot.
- Rework of operation mode 'MANUAL' to more accurately describe the expected behavior.
- Added 'INTERVENED' operating mode to include interrupting freely navigating mobile robots without clearing the order.
- Added table for expected behavior when within an operatingMode.
- Fix definition of lastNodeSequenceId if no valid lastNodeId is available.
- Rework of waitForTrigger and added trigger instantAction.
- Split of ActionStates into actionStates, instantActionStates and zoneActionStates to contain the corresponding actions, the newly added arrays are cleaned through a corresponding instantAction instead of a new order.
- Added new 'RETRIABLE' action state for actions that a vehicle can retry or skip through input by external trigger or MC.
- Added action state transition matrix to show examples for all possible action state transitions.
- Rework and renaming of the parameter rotationAllowed to reachOrientationBeforeEntering, inverted behavior.
- Mandatory for every mobile robot to support actions startPause, stopPause and cancelOrder.
- Renaming of parameter eStop to activeEmergenceStop, removing enum AUTOACK.
- Array for translation of errorDescription and errorHint added.
- Rework of errors, changing errorTypes to extensible enum, renaming and more precise definitions.
- Distinction between description (longer description) and descriptor (compact name or short description).
- Clarifying the scope and limitations of the document.
- Added instant actions for energy saving mode StartHibernation/stopHibernation and a generic shutdown.
- Introduction of extensible enums, with a predefined set of values that shall be used whenever possible. Otherwise, new ones may be added.
- Rework of parameter names (breaking) for more clarity, removed abbreviations. Table with all changes in PR ([Rework: renaming of parameter for clarity. No abbreviations. #465](https://github.com/VDA5050/VDA5050/pull/465))
- Due to a possible higher frequency of freely navigating mobile robots, the visualization topic is no longer only for visualization purposes, since a higher frequency of the planned and intermediate path might be useful to traffic control. To explain changes a reference to the header of the referred state this message is based on was added.
- Renaming of parameters of edges within an order maximumHeight → maximumMobileRobotHeight and minimumHeight → minimumLoadHandlingDeviceHeight to clarify intended use.
- Removed factsheet parameter in protocol limits maximumEnumLength, since this breaks extensible enums.
- Defining the first order message of a new order always has orderUpdateId 0.
- Clarification, that a cancelled order shall not be updated again.
- Introducing new check, if orderUpdateId was used to resend same message, e.g., due to connection failure, or same orderUpdateId with different content, which is not allowed and leads to predefined error.
- Rework of batteryState object in state message to powerSupply, renamed batteryCharge to stateOfCharge.
- Removed startNode and endNode from order message edge object.
- Since polygons are now used for zones, we reworked the use within the factsheet to common naming conventions.
- Made stationType and loadType optional for pick predefined action.

</div>
  </template>
</BilingualSection>

_This discussion was created from the release [VDA 5050 3.0.0](https://github.com/VDA5050/VDA5050/releases/tag/3.0.0)._
