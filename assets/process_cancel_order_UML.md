This markdown file is the original UML diagram from which process_cancel_order.png was created. Changes in the diagram can be tracked via changes in this file.

```
@startuml
scale 0.65
skinparam defaultTextAlignment center
start
:AGV has order;
#lightgreen:AGV receives instantAction\n <B>cancelOrder</B>.\n Action is added to <B>actionStates</B>.\n Waiting actions are set to <B>failed</B>;
if (Can running\n actions be\n interrupted?) then (yes)
    #lightgreen: Interrupt actions, set\n their state to <B>failed</B>;
else (no)
    #lightgreen: Finish the actions and report\n their respective state (<B>RUNNING</B>,\n <B>FAILED</B>, <B>FINISHED</B>);
endif
    if (Can vehicle stop\n in between\n nodes?) then (no)
        #lightgreen: AGV drives to next node where it should \n be able to receive a new order \n <B>cancelOrder</B> action state is set to <B>RUNNING</B> \n The nodeState for the node the AGV is driving to is kept. All other nodeStates and edgeStates are deleted.;
        #orange: AGV arrives at the node where it stops.\n The last nodeState is deleted. \n actionStates are kept. \n <B>cancelOrder</B> action state is set\n to <B>FINISHED</B>.;
        stop
    else (yes)
        #orange: AGV stops gracefully\n and deletes nodeStates and\n edgeStates. \n actionStates are kept. \n <B>cancelOrder</B> action state is set \n to <B>FINISHED</B>;
    stop
@enduml
```