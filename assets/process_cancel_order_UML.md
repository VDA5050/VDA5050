This markdown file is the original UML diagram from which process_cancel_order.png was created. Changes in the diagram can be tracked via changes in this file.

```
@startuml
skinparam dpi 400
skinparam defaultTextAlignment center
start
:Mobile Robot has order;
:Mobile Robot receives instantAction\n <B>cancelOrder</B>.;
#lightgreen:action is added to <B>actionStates</B>,\n waiting actions are set to <B>FAILED</B>;
if (Can running\n actions be\n interrupted?) then (yes)
    #lightgreen: interrupt actions, set\n their state to <B>FAILED</B>;
else (no)
    #lightgreen: finish the actions and report\n their respective state (<B>RUNNING</B>,\n <B>FAILED</B>, <B>FINISHED</B>);
endif

if (Can mobile robot stop\n in between\n nodes?) then (no)
    #lightgreen: mobile Robot drives to next node where it should \n be able to receive a new order \n <B>cancelOrder</B> action state is set to <B>RUNNING</B> \n The nodeState for the node the Mobile Robot \nis driving to is kept, \nall other nodeStates and edgeStates \nare deleted.;
    #lightgreen: mobile Robot arrives at the node where it stops,\n lastNodeId and lastNodeSequenceId\n are be updated accordingly.;
else (yes)
    #lightgreen: mobile Robot stops.;
endif
#lightgreen: all nodeStates and edgeStates are deleted.\nactionStates are kept, \n <B>cancelOrder</B> action state is set to <B>FINISHED</B>.;
stop
@enduml
```