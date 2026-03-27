# 2 Scope

<BilingualSection>
  <template #ko>
<div>

본 문서는 플릿 제어 시스템과 모바일 로봇 간 표준화되고 벤더 중립적인 통신 인터페이스를 기술합니다. 목적은 플릿 제어 시스템의 조정 하에 여러 모바일 로봇이 동작하는 환경에서 상호운용성을 지원하는 공통 기준을 제공하는 것입니다. 본 사양의 사용은 선택 사항이며 구속력이 없으며, 적용은 해당 이해관계자의 재량에 따릅니다.

본 사양의 목표는 다음과 같습니다.

- 모바일 로봇을 플릿 제어 시스템에 연결할 때의 복잡도를 줄인다.
- 공유 물리 환경에서 서로 다른 제조사의 이질적 모바일 로봇 플릿의 조화된 운영을 가능하게 한다.
- 항법 원리, 물리적 치수, 하역·조작 능력, 자율 수준이 다른 모바일 로봇에 적용할 수 있는 일반적이고 도메인에 독립적인 인터페이스 정의 집합을 제공한다.

본 사양은 다음 주제를 다루지 않습니다.

- 안전 요구사항: 본 문서는 기능적·운영적·시스템 안전 요구사항을 정의하지 않으며 안전 표준으로 간주하거나 적용되어서는 안 됩니다.
- 교통 관리 논리: 경로 지정, 우선순위, 혼잡 처리, 교착 해결 등 교통 조정을 위한 전략·알고리즘·의사결정 과정은 포함되지 않습니다.
- 기타 통신 인터페이스: 플릿 제어 시스템과 모바일 로봇 간 통신과 무관한 인터페이스(주변 장비, 인프라 구성 요소, 외부 IT 시스템 등)는 제외됩니다.
- 프로젝트 조정 및 구현 절차: 프로젝트 관리 활동, 통합 방법론, 시운전 워크플로, 검증·인수 절차 및 유사한 조직적 프로세스는 다루지 않습니다.
- 운영 책임: 본 문서는 계획, 운영, 유지보수 또는 안전과 관련하여 운영자, 시스템 통합자, 차량 제조사, 플릿 제어 제공자 간 책임을 배분하지 않습니다.
- 사이버 보안 조치: 안전한 통신이나 데이터 보호를 위한 메커니즘, 기술 또는 프로세스는 규정하지 않습니다.

</div>
  </template>
  <template #en>
<div>

This document describes a standardized and vendor-neutral communication interface between a fleet control system and mobile robots. Its purpose is to provide a common reference that supports interoperability in environments where multiple mobile robots operate under the coordination of a fleet control system. The use of this specification is optional and non-binding, and its application is at the discretion of the respective stakeholders.

The objectives of this specification are:

- to reduce complexity when connecting mobile robots to a fleet control system.
- to enable the coordinated operation of heterogeneous mobile robot fleets from different manufacturers within a shared physical environment.
- to provide a generic and domain independent set of interface definitions applicable to mobile robots with varying navigation principles, physical dimensions, load handling or manipulation capabilities, and autonomy levels.

This specification does not address the following topics:

- Safety Requirements: This document does not define functional, operational, or system safety requirements and shall not be regarded or applied as a safety standard.
- Traffic Management Logic: Strategies, algorithms, or decision making processes for traffic coordination (e.g., routing, prioritization, congestion handling, or deadlock resolution) are not included.
- Other Communication Interfaces: Interfaces unrelated to the communication between a fleet control system and mobile robots are excluded, such as interfaces to peripheral equipment, infrastructure components, or external IT systems.
- Project Coordination and Implementation Procedures: Project management activities, integration methodologies, commissioning workflows, validation and acceptance procedures, and similar organizational processes are not covered.
- Operational Responsibilities: This document does not allocate responsibilities among operators, system integrators, vehicle manufacturers, or fleet control providers with respect to planning, operation, maintenance, or safety.
- Cybersecurity Measures: Mechanisms, technologies, or processes for secure communication or data protection are not specified.

</div>
  </template>
</BilingualSection>
