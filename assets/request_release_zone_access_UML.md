This markdown file is the original UML diagram from which map_distribution_process.png was created. Changes in the diagram can be tracked via changes in this file.

```
@startuml
skinparam dpi 200
!pragma teoz true
skinparam defaultTextAlignment center
skinparam participantFontColor white
skinparam noteFontColor white
skinparam participantBorderColor None
skinparam ArrowThickness 2
participant "Fleet Control" #dodgerblue
participant "Mobile Robot" #dodgerblue
hide footbox

activate "Mobile Robot"
activate "Fleet Control"

group Zone request
"Mobile Robot" -> "Fleet Control": Status Update containing zoneRequest \n of requestType ACCESS and requestStatus REQUESTED.
"Fleet Control" -> "Fleet Control": Decide if zoneRequest\n can be granted
group optional - queued request
"Fleet Control" -> "Mobile Robot": Respond on the response topic containing\n requestId and grantType QUEUED.
"Mobile Robot" -> "Fleet Control": Continue to send status update containing corresponding zoneRequest \n with requestStatus REQUESTED.
end
group Grant access
"Fleet Control" -> "Mobile Robot": Respond on the response topic containing\n requestId and grantType GRANTED.
"Mobile Robot" -> "Fleet Control": Status Update containing corresponding zoneRequest \n with requestStatus GRANTED.
group optional - revoke access
"Fleet Control" -> "Mobile Robot": Message on response topic containing\n requestId and grantType REVOKED.
"Mobile Robot" -> "Fleet Control": Status Update containing corresponding zoneRequest \n with requestStatus REVOKED.
end
group optional - extend access (before expiration time)
"Fleet Control" -> "Mobile Robot": Respond on the response topic containing\n requestId and grantType GRANTED and new leaseExpiry.
end
group optional - expired access (after expiration time)
"Mobile Robot" -> "Fleet Control": Status Update containing corresponding zoneRequest \n with requestStatus EXPIRED.
"Mobile Robot" -> "Mobile Robot": Vehicle behaves according \n to releaseLossBehavior. 
end
group Leave zone
"Mobile Robot" -> "Mobile Robot": Vehicle decides, that it \n has left the zone.
"Mobile Robot" -> "Fleet Control": Status Update without the access request.
end
end
group optional - Reject access
"Fleet Control" -> "Mobile Robot": Respond on the response topic containing\n requestId and grantType REJECTED
"Mobile Robot" -> "Fleet Control": Status Update without the rejected request.
end
"Mobile Robot" -> "Fleet Control": Status Update with removed zoneRequest after no longer relevant.
end
deactivate "Fleet Control"
deactivate "Mobile Robot"
@enduml
```
