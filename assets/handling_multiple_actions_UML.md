This markdown file is the original UML diagram from which handling_multiple_actions.png was created. Changes in the diagram can be tracked via changes in this file.

```
@startuml
skinparam dpi 400
skinparam defaultTextAlignment center
start
:Mobile robot arrives at node \nwith multiple actions;
#lightgreen:empty parallel execution set;

#lightgreen:iterate over action list;
repeat
    if (Action for \nparallel execution?) then (no)
        if (Action:\n blockingType?) then (HARD)
        #lightgreen: stop driving;
        else (SINGLE)
        endif
        if (Parallel\n execution list\n empty?) then(Yes)
        else(No)
        #lightgreen: execute actions from\n parallel execution list;
        endif
        #lightgreen: execute HARD action;
    else (yes)
        if (Action:\n blockingType?) then(SOFT)
        #lightgreen: stop driving;
        else(NONE)
        endif
        #lightgreen: add action to parallel\n execution list;
    endif
repeat while (More actions \non node?) is (Yes) not (No)
if (Parallel\n execution list\n empty?) then(Yes)

else(No)
#lightgreen: execute actions from\n parallel execution list;
endif
#lightgreen: continue order\n handling;
@enduml
```