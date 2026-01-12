This markdown file is the original UML diagram from which process_cancel_order.png was created. Changes in the diagram can be tracked via changes in this file.

```
@startuml
skinparam dpi 400
skinparam defaultTextAlignment center
start
:Mobile Robot has order;
:Mobile Robot receives instantAction\n <B>cancelOrder</B>.;
#lightgreen: <B>cancelOrder</B> action is added to <B>actionStates</B>, \naction status is set to <B>RUNNING</B> \n\nwaiting actions are set to <B>FAILED</B>;
if (Can running\n actions be\n interrupted?) then (yes)
    #lightgreen: Interrupt actions, set\n their state to <B>FAILED</B>;
else (no)
    #lightgreen: Finish the actions and report\n their respective state (<B>RUNNING</B>,\n <B>FAILED</B>, <B>FINISHED</B>);
endif

if (Can Mobile Robot stop\n in between\n nodes?) then (no)
    #lightgreen: Mobile Robot drives to next node of its base \n where it should be able to receive a new order \n The nodeState for the node the Mobile Robot \nis driving to is kept, \nall other nodeStates and edgeStates \nare deleted.;
    #lightgreen: Mobile Robot arrives at the node where it stops,\n lastNodeId and lastNodeSequenceId\n are be updated accordingly.;
else (yes)
    #lightgreen: Mobile Robot stops.;
endif
#lightgreen: All nodeStates and edgeStates are deleted,\nactionStates are kept. \n <B>cancelOrder</B> action status is set to <B>FINISHED</B>.;
stop
@enduml
```
