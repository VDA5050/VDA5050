@startuml
!pragma teoz true
skinparam dpi 300
scale 0.65
skinparam defaultTextAlignment center
skinparam participantFontColor white
skinparam noteFontColor white
skinparam participantBorderColor None
skinparam ArrowThickness 2

participant "Fleet Control" #dodgerblue
participant "MQTT-Broker" #dodgerblue
participant "Mobile Robot" #dodgerblue
hide footbox




"MQTT-Broker" <- "Mobile Robot": /state    
&"Fleet Control" <- "MQTT-Broker":

rnote over "Fleet Control" #black
Routing and 
order creation
endrnote
"Fleet Control" -> "MQTT-Broker": /order\n(nodes and edges\n with actions)
& "MQTT-Broker" -> "Mobile Robot":<U+0020><U+0020><U+0020><U+0020><U+0020><U+0020><U+0020><U+0020><U+0020><U+0020><U+0020><U+0020><U+0020><U+0020><U+0020><U+0020><U+0020><U+0020><U+0020><U+0020><U+0020><U+0020><U+0020><U+0020><U+0020><U+0020><U+0020><U+0020>
"MQTT-Broker" <- "Mobile Robot": /state
&"Fleet Control" <- "MQTT-Broker":

"Fleet Control" -> "MQTT-Broker": /instantActions
& "MQTT-Broker" -> "Mobile Robot"


"Fleet Control" <- "MQTT-Broker": /state
& "MQTT-Broker" <- "Mobile Robot"

&rnote over "Mobile Robot" #black
Execution
endrnote

@enduml