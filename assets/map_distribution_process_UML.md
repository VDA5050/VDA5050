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
participant AGV #dodgerblue
participant "Map Server" #dodgerblue
hide footbox

group download map
"Master Control" -> "AGV": Trigger instant action "downloadMap"
activate AGV
AGV -> "Map Server": Request Download
activate "Map Server"
"Map Server" -> AGV: Transfer of the file
deactivate "Map Server"
"AGV" -> "AGV": Check, if download\n was successful
"AGV" -> "AGV": Processing the map\n to make it ready for use
AGV -> "Master Control": Report instant action as FINISHED
"AGV" -> "Master Control": Send updated state\n with new map in maps array
deactivate AGV
end

group enable map
"Master Control" -> "AGV": Trigger instant action "enableMap"
activate AGV
"AGV" -> "AGV": Set map with requested mapId and\n mapVersion to ENABLED,\n set other maps with same mapId\n and different mapVersions to DISABLED
"AGV" -> "Master Control": Report instant action as FINISHED
"AGV" -> "Master Control": Send updated state
deactivate AGV
end

group delete map on vehicle
"Master Control" -> "AGV": Trigger instant action "deleteMap"
activate AGV
"AGV" -> "AGV": Remove map with\n requested mapId and mapVersion\n from vehicle memory
"AGV" -> "Master Control": Report instant action as FINISHED
"AGV" -> "Master Control": Send updated state with \nmap removed from maps array
deactivate AGV
end
@enduml
```
