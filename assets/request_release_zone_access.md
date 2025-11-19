This markdown file is the original UML diagram from which map_distribution_process.png was created. Changes in the diagram can be tracked via changes in this file.

```
@startuml
skinparam dpi 400
!pragma teoz true
skinparam defaultTextAlignment center
skinparam participantFontColor white
skinparam noteFontColor white
skinparam participantBorderColor None
skinparam ArrowThickness 2
participant "Master Control" #dodgerblue
participant "Mobile Robot" #dodgerblue
hide footbox

activate "Mobile Robot"
activate "Master Control"

group Zone request
"Mobile Robot" -> "Master Control": Status Update containing zoneRequest \n of requestType ACCESS and requestStatus REQUESTED.
"Master Control" -> "Master Control": Decide if zoneRequest\n can be granted
group optional - queued request
"Master Control" -> "Mobile Robot": Respond on the response topic containing\n requestId and grantType QUEUED.
"Mobile Robot" -> "Master Control": Continue to send status update containing corresponding zoneRequest \n with requestStatus REQUESTED.
end
group Grant access
"Master Control" -> "Mobile Robot": Respond on the response topic containing\n requestId and grantType GRANTED.
"Mobile Robot" -> "Master Control": Status Update containing corresponding zoneRequest \n with requestStatus GRANTED.
group optional - revoke access
"Master Control" -> "Mobile Robot": Message on response topic containing\n requestId and grantType REVOKED.
"Mobile Robot" -> "Master Control": Status Update containing corresponding zoneRequest \n with requestStatus REVOKED.
end
group optional - extend access (before expiration time)
"Master Control" -> "Mobile Robot": Respond on the response topic containing\n requestId and grantType GRANTED and new leaseExpiry.
end
group optional - expired access (after expiration time)
"Mobile Robot" -> "Master Control": Status Update containing corresponding zoneRequest \n with requestStatus EXPIRED.
"Mobile Robot" -> "Mobile Robot": Vehicle behaves according \n to releaseLossBehavior. 
group extend expired access
"Master Control" -> "Mobile Robot": Respond on the response topic containing\n requestId and grantType GRANTED and new leaseExpiry.
"Mobile Robot" -> "Master Control": Status Update containing corresponding zoneRequest \n with requestStatus GRANTED.
"Mobile Robot" -> "Mobile Robot": Continue order execution. 
end
end
group Leave zone
"Mobile Robot" -> "Mobile Robot": Vehicle decides, that it \n has left the zone.
"Mobile Robot" -> "Master Control": Status Update without the access request.
end
end
group optional - Reject access
"Master Control" -> "Mobile Robot": Respond on the response topic containing\n requestId and grantType REJECTED
"Mobile Robot" -> "Master Control": Status Update without the rejected request.
end
deactivate "Mobile Robot"
deactivate "Master Control"
end

@enduml
```
