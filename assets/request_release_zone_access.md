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
group optional - pending request
"Master Control" -> "Mobile Robot": Respond on the response topic containing\n requestId and grantType PENDING.
"Mobile Robot" -> "Master Control": Continue to send status update containing corresponding zoneRequest \n with requestStatus REQUESTED.
end
group Grant access
"Master Control" -> "Mobile Robot": Respond on the response topic containing\n requestId and grantType GRANT
"Mobile Robot" -> "Master Control": Status Update containing corresponding zoneRequest \n with requestStatus ACCEPTED.
group optional - revoke access
"Master Control" -> "Mobile Robot": Message on response topic containing\n requestId and grantType REVOKE.
"Mobile Robot" -> "Master Control": Status Update containing corresponding zoneRequest \n with requestStatus REVOKED.
end
group optional - expired access (after expiration time)
"Mobile Robot" -> "Master Control": Status Update containing corresponding zoneRequest \n with requestStatus EXPIRED.
end
group Leave zone
"Mobile Robot" -> "Mobile Robot": Vehicle checks, if exit conditions\n of the zone are met.
"Mobile Robot" -> "Master Control": Status Update without the access request.
end
end
group optional - Reject access
"Master Control" -> "Mobile Robot": Respond on the response topic containing\n requestId and grantType REJECT
"Mobile Robot" -> "Master Control": Status Update without the rejected request.
end
deactivate "Mobile Robot"
deactivate "Master Control"
end

@enduml
```
