This markdown file is the original UML diagram from which information_flow_VDA5050.png was created. Changes in the diagram can be tracked via changes in this file.

```
@startuml
!pragma teoz true
skinparam defaultTextAlignment center
skinparam participantFontColor white
skinparam noteFontColor white
skinparam participantBorderColor None
skinparam ArrowThickness 2
participant Operator #blue
participant "Master Control" #dodgerblue
participant "MQTT-Broker" #dodgerblue
participant AGV #dodgerblue
hide footbox



Operator -> "Master Control": Definition of Driving courses\n (e.g. CAD import)
Operator -> "Master Control": Driving course network \nconfiguration
Operator -> "Master Control": AGV configuration
"MQTT-Broker" <- AGV: AGV status (cyclic)  
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
"Master Control" -> "MQTT-Broker": immediate action
& "MQTT-Broker" -> AGV


"Master Control" <- "MQTT-Broker": AGV status (cyclic)
& "MQTT-Broker" <- AGV

&rnote over "AGV" #black
carrying out
endrnote

@enduml
```