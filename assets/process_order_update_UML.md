This markdown file is the original UML diagram from which process_order_update.png was created. Changes in the diagram can be tracked via changes in this file.

```
@startuml
skinparam dpi 250
start
:Mobile robot receives order via MQTT;
#lightgreen:validate JSON;
if ((1) Is received order valid?) then (no)
    #orange:reject order
    throw error;
    stop
endif
->yes;
    if ((2) Is received order new?) then (yes)
        if ((3) Is mobile robot still executing\nan order or waiting for an update?) then (yes)
        #orange:reject order\nthrow error;
         stop
       endif
       ->no;
            if ((4) Is start of new order close\nenough to current position?) then (no)
                #orange:reject order\nthrow error;
                stop
            endif
            ->yes;
                #lightgreen:delete states of previous order;
                #lightgreen:- accept order\n- set orderId and orderUpdateId\n- populate states of new order (9);
          #lightgreen: execute order;
     else (no - received order is update of current order)
        if ((5) Is received order update deprecated?) then (yes)
            #orange:reject order\nthrow error;
            stop
        endif
        ->no;
            if ((6) Is order update currently on mobile robot?) then (yes - mobile robot already\n has received update)
                #lightgreen: discard message;
                stop
            endif
            ->no;
                if ((3) Is mobile robot still executing an\norder or waiting for an update?) then (yes)
                    if ((7) Is the received update a valid\ncontinuation of the currently\nrunning order?) then (no)
                      #orange:reject order\nthrow error;
                      stop
                    endif
                    ->yes;
                        #lightgreen:clear horizon, if mobile robot has one;
                        #lightgreen:- accept order update\n- set orderUpdateId\n- append new states to the ones\ncurrently running/planned (9);
                else (no)
                    if ((8) Is the received update a valid\ncontinuation of the previous\ncompleted order?) then (no)
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
