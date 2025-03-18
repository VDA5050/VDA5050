This markdown file is the original UML diagram from which process_order_update.png was created. Changes in the diagram can be tracked via changes in this file.

```
@startuml
skinparam dpi 250
start
#lightgreen:Order arrives via MQTT;
#lightgreen:Validate JSON;
if ((1) is received order valid?) then (no)
    #orange:reject order
    throw error;
    stop
endif
->yes;
    if ((2) is received order new?) then (yes)
        if ((3) is vehicle still executing\nan order or waiting for an update?) then (yes)
        #orange:reject order\nthrow error;
         stop
       endif
       ->no;
            if ((4) is start of new order close\nenough to current position?) then (no)
                #orange:reject order\nthrow error;
                stop
            endif
            ->yes;
                #lightgreen:delete states of previous order;
                #lightgreen:- accept order\n- set orderId and orderUpdateId\n- populate states of new order (9);
          #lightgreen: execute order;
     else (no - received order is update of current order)
        if ((5) is received order update deprecated?) then (yes)
            #orange:reject order\nthrow error;
            stop
        endif
        ->no;
            if ((6) is order update currently on vehicle?) then (yes - vehicle already\n has received update)
                #lightgreen: discard message;
                stop
            endif
            ->no;
                if ((3) is vehicle still executing an\norder or waiting for an update?) then (yes)
                    if ((7) is the received update a valid\ncontinuation of the currently\nrunning order?) then (no)
                      #orange:reject order\nthrow error;
                      stop
                    endif
                    ->yes;
                        #lightgreen:clear horizon, if vehicle has one;
                        #lightgreen:- accept order update\n- set orderUpdateId\n- append states to the ones\ncurrently running/planned (9);
                else (no)
                    if ((8) is the received update a valid\ncontinuation of the previous\ncompleted order?) then (no)
                        #orange:reject order\nthrow error;
                        stop;
                    endif
                    ->yes;
                    #lightgreen:- accept order update\n- set orderUpdateId\n- populate newly added states (9);
                endif
                #lightgreen:execute order;
    endif
stop
@enduml
```
