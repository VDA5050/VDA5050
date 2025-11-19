@startuml
!pragma teoz true
skinparam dpi 300
scale 0.65
skinparam defaultTextAlignment center
skinparam participantFontColor white
skinparam noteFontColor white
skinparam participantBorderColor None
skinparam ArrowThickness 2

participant "Master Control" #dodgerblue
participant "MQTT-Broker" #dodgerblue
participant "Mobile Robot" #dodgerblue
hide footbox




"MQTT-Broker" <- "Mobile Robot": /state    
&"Master Control" <- "MQTT-Broker":

rnote over "Master Control" #black
Routing and 
order creation
endrnote
"Master Control" -> "MQTT-Broker": /order\n(nodes and edges\n with actions)
& "MQTT-Broker" -> "Mobile Robot":<U+0020><U+0020><U+0020><U+0020><U+0020><U+0020><U+0020><U+0020><U+0020><U+0020><U+0020><U+0020><U+0020><U+0020><U+0020><U+0020><U+0020><U+0020><U+0020><U+0020><U+0020><U+0020><U+0020><U+0020><U+0020><U+0020><U+0020><U+0020>
"MQTT-Broker" <- "Mobile Robot": /state
&"Master Control" <- "MQTT-Broker":

"Master Control" -> "MQTT-Broker": /instantActions
& "MQTT-Broker" -> "Mobile Robot"


"Master Control" <- "MQTT-Broker": /state
& "MQTT-Broker" <- "Mobile Robot"

&rnote over "Mobile Robot" #black
Execution
endrnote

@enduml