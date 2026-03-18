This markdown file is the original UML diagram from which process_cancel_order.png was created. Changes in the diagram can be tracked via changes in this file.

```
@startuml
skinparam dpi 400
skinparam defaultTextAlignment center
start
:Mobile robot has order.;
:Mobile robot receives instantAction\n <B>cancelOrder</B>;
#lightgreen: add <B>cancelOrder</B> to <B>actionStates</B>,\nset action status to <B>RUNNING</B>\n\nset <B>WAITING</B> node and edge actions to <B>FAILED</B>;

if (Can all\nrunning actions\nbe canceled?) then (no)
    #lightgreen: finish the actions and report\n their respective state\n(<B>FAILED</B>, <B>FINISHED</B>);
else (yes)
    #lightgreen: cancel actions and set\ntheir state to <B>FAILED</B>;
endif

if (Can mobile\nrobot stop in\nbetween nodes?) then (no)
    #lightgreen: continue driving to next node of its base\nwhere receiving a new order is possible\n\nkeep nodeStates and edgeStates until this node,\n delete all other nodeStates and edgeStates;
    #lightgreen: update lastNodeId and lastNodeSequenceId\nafter arriving at node;
else (yes)
    #lightgreen: stop;
endif

#lightgreen: clear the order,\nkeep actionStates\n\nset <B>cancelOrder</B> action status to <B>FINISHED</B>;
stop
@enduml
```
