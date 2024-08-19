This markdown file is the original UML diagram from which process_cancel_order.png was created. Changes in the diagram can be tracked via changes in this file.

```
@startuml
skinparam dpi 400
skinparam defaultTextAlignment center
start
:AGV has order;
#lightgreen:AGV receives instantAction\n <B>cancelOrder</B>.\n Action is added to <B>actionStates</B>.\n Waiting actions are set to <B>FAILED</B>;
if (Can running\n actions be\n interrupted?) then (yes)
    #lightgreen: Interrupt actions, set\n their state to <B>FAILED</B>;
else (no)
    #lightgreen: Finish the actions and report\n their respective state (<B>RUNNING</B>,\n <B>FAILED</B>, <B>FINISHED</B>);
endif

if (Can vehicle stop\n in between\n nodes?) then (no)
    #lightgreen: AGV drives to next node where it should \n be able to receive a new order \n <B>cancelOrder</B> action state is set to <B>RUNNING</B> \n The nodeState for the node the AGV \nis driving to is kept. \nAll other nodeStates and edgeStates \nare deleted.;
    #lightgreen: AGV arrives at the node where it stops.\n lastNodeId and lastNodeSequenceId\n must be updated accordingly.;
else (yes)
    #lightgreen: AGV stops.;
endif
#lightgreen: All nodeStates and edgeStates are deleted.\nactionStates are kept. \n <B>cancelOrder</B> action state is set to <B>FINISHED</B>.;
stop
@enduml
```