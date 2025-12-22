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
participant "Map Server" #dodgerblue
hide footbox

group download map
"Fleet Control" -> "Mobile Robot": Trigger instant action "downloadMap"
activate "Mobile Robot"
"Mobile Robot" -> "Map Server": Request Download
activate "Map Server"
"Map Server" -> "Mobile Robot": Transfer of the file
deactivate "Map Server"
"Mobile Robot" -> "Mobile Robot": Check, if download\n was successful
"Mobile Robot" -> "Mobile Robot": Processing the map\n to make it ready for use
"Mobile Robot" -> "Fleet Control": Report instant action as FINISHED
"Mobile Robot" -> "Fleet Control": Send updated state\n with new map in maps array
deactivate "Mobile Robot"
end

group enable map
"Fleet Control" -> "Mobile Robot": Trigger instant action "enableMap"
activate "Mobile Robot"
"Mobile Robot" -> "Mobile Robot": Set map with requested mapId and\n mapVersion to ENABLED,\n set other maps with same mapId\n and different mapVersions to DISABLED
"Mobile Robot" -> "Fleet Control": Report instant action as FINISHED
"Mobile Robot" -> "Fleet Control": Send updated state
deactivate "Mobile Robot"
end

group delete map on mobile robot
"Fleet Control" -> "Mobile Robot": Trigger instant action "deleteMap"
activate "Mobile Robot"
"Mobile Robot" -> "Mobile Robot": Remove map with\n requested mapId and mapVersion\n from mobile robot memory
"Mobile Robot" -> "Fleet Control": Report instant action as FINISHED
"Mobile Robot" -> "Fleet Control": Send updated state with \nmap removed from maps array
deactivate "Mobile Robot"
end
@enduml
```
