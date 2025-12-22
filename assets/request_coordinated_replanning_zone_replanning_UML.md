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
participant "Fleet Control" #dodgerblue
participant "Mobile Robot" #dodgerblue
hide footbox

activate "Mobile Robot"
activate "Fleet Control"

group zone entry request
"Mobile Robot" -> "Fleet Control": Status Update containing one or more zoneRequests \n of requestType REPLANNING and requestStatus REQUESTED.
"Fleet Control" -> "Fleet Control": Decide which planned paths are valid.
group grant one or multiple replanning requests
"Fleet Control" -> "Mobile Robot": Respond on the response topic containing\n requestId and grantType GRANTED for one or multiple requests.
"Mobile Robot" -> "Mobile Robot": Decide, which of the\n granted paths to use.
"Mobile Robot" -> "Fleet Control": Status Update containing one granted zoneRequest \n with requestStatus GRANTED. Remove other requests from status.
group replanning within zone
"Mobile Robot" -> "Mobile Robot": Vehicle can not \n continue path.
"Mobile Robot" -> "Fleet Control": Status Update containing one or more zoneRequests \n of requestType REPLANNING and requestStatus REQUESTED.
"Fleet Control" -> "Fleet Control": Decide which planned paths are valid.
group Grant one or multiple replanning requests
"Fleet Control" -> "Mobile Robot": Respond on the response topic containing\n requestId and grantType GRANTED for one or multiple requests.
"Mobile Robot" -> "Mobile Robot": Decide, which of the\n granted paths to use.
"Mobile Robot" -> "Fleet Control": Status Update containing one granted zoneRequest \n with requestStatus GRANTED. Remove other requests from status.
end
end
group leave zone
"Mobile Robot" -> "Mobile Robot": Vehicle decides, that it \n has left the zone.
"Mobile Robot" -> "Fleet Control": Status Update without the access request.
end
deactivate "Mobile Robot"
deactivate "Fleet Control"
end

@enduml
```
