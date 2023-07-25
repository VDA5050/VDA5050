<!---
@startuml
start
#lightgreen:Order arrives via MQTT;
#lightgreen:Validate JSON;
if ((1) is received order valid?) then (no)
    #red:reject order
    throw error;
    stop
endif
->yes;
    if ((2) is received order new?) then (yes)
        if ((3) is vehicle still executing\nan order or waiting for an update?) then (yes)
        #red:reject order\nthrow error;
         stop
       endif
       ->no;
            if ((4) is start of new order close\nenough to current position?) then (no)
                #red:reject order\nthrow error;
                stop
            endif
            ->yes;
                #lightgreen:delete states of previous order;
                #lightgreen:accept order\nset orderId and orderUpdateId\npopulate states of new order (9);
          #lightgreen: execute order;
     else (no - received order is update of current order)
        if ((5) is received order update deprecated?) then (yes)
            #red:reject order\nthrow error;
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
                      #red:reject order\nthrow error;
                      stop
                    endif
                    ->yes;
                        #lightgreen:clear horizon, if vehicle has one;
                        #lightgreen:- accept order update\n- set orderUpdateId\n- append states to the ones\ncurrently running/planned (9);
                else (no)
                    if ((8) is the received update a valid\ncontinuation of the previous\ncompleted actions?) then (no)
                        #red:reject order\nthrow error;
                        stop;
                    endif
                    ->yes;
                    #lightgreen:- accept order update\n- set orderUpdateId\n- populate newly added states (9);
                endif
                #lightgreen:execute order;
    endif
stop
@enduml
-->



1)	**is received order valid?**:
All formatting and JSON data types are correct?

2)	**is received order new or an update of the current order?**:
Is `orderId` of the received order different to  `orderId` of order the vehicle currently holds?

3)	**is vehicle still executing an order or waiting for an update?**:
Is `nodeStates` not empty or is `actionStates` containing states which are neither FAILED or FINISHED? Nodes and edges and the corresponding action states of the order horizon are also included inside the state. Vehicle might still have a horizon and therefore waiting for an update and executing an order.

4) **is start of new order close enough to current position?**:	Is the vehicle already standing on the node, or is in the nodes deviation range (see also chapter 6.6.1)?

5) **is received order update deprecated?**: Is `orderUpdateId` smaller than the one currently on the vehicle?

6)	**is received order update currently on vehicle?**: Is `orderUpdateId` equal to the one currently on the vehicle?

7)	**is the received update a valid continuation of the currently still running order?**:	Is the first node of the received order equal to the current decision point (last node of the current base)? The vehicle is still moving or executing actions related to the base released in previous order updates or still has a horizon and is therefore waiting for a continuation of the order. In this case, the order update is only accpeted if the first node of the new base is equal to the last node of the previous base.

8)	**is the received update a valid continuation of the previously completed order?**: Is `nodeId` and `sequenceId` of the first node of the received order update equal to `lastNodeId` and `lastNodeSequenceId`? The vehicle is not executing any actions anymore neither is it waiting for a continuation of the order (meaning that it has completed its base with all related actions and does not have a horizon). The order update is now accepted if it continues from the last travesered node, therefore the first node of the new base needs to match the vehicle's `lastNodeId` as well as `lastNodeSequenceId`.

9)	populate/ append states	refers to the action-/node-/edgeStates.
