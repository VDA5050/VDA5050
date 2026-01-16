This markdown file is the UML diagram of the logic which is represented in request_state_transition.png. Changes in the diagram can be tracked via changes in this file.

```
@startuml

skinparam linetype ortho

[*] --> REQUESTED : Request initiated by the mobile robot

REQUESTED --> GRANTED  : Granted by fleet control
REQUESTED --> QUEUED   : Queued by fleet control
REQUESTED --> REJECTED : Rejected by fleet control

QUEUED --> GRANTED : Granted by fleet control
QUEUED --> REJECTED : Rejected by fleet control

GRANTED --> EXPIRED : Lease expired
GRANTED --> REVOKED : Grant revoked by fleet control

GRANTED --> [*] : Released by mobile robot, Request no longer relevant
EXPIRED --> [*] : Request no longer relevant
REVOKED --> [*] : Request no longer relevant
REJECTED --> [*] : Request no longer relevant

@enduml
```
