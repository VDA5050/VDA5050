This markdown file is the original UML diagram from which information_flow_VDA5050.png was created. Changes in the diagram can be tracked via changes in this file.

```
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
participant AGV #dodgerblue
hide footbox




"MQTT-Broker" <- AGV: AGV state
&"Master Control" <- "MQTT-Broker":

rnote over "Master Control" #black
**Order Control**
endrnote
rnote over "Master Control" #black
Driving course
assignment
endrnote
"Master Control" -> "MQTT-Broker": Order\n(nodes and edges\n with actions)
& "MQTT-Broker" -> AGV
"MQTT-Broker" <- AGV: AGV state
&"Master Control" <- "MQTT-Broker":

"Master Control" -> "MQTT-Broker": instant action
& "MQTT-Broker" -> AGV


"Master Control" <- "MQTT-Broker": AGV state
& "MQTT-Broker" <- AGV

&rnote over "AGV" #black
carrying out
endrnote

@enduml
```