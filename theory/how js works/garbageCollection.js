//how memory is freed up
// CALL STACK vs HEAP
/*1- CALL STACK : variable environment is simply deleted
when Execution Context pops off stack
global variables will never be delete (only if you close 
    browser)
*/
/*
HEAP : garbage collection (ran by engine)
many algorithms can be used
modern engines use MARK-AND-SWEEP ALGORITHM
1-mark:mark all objects that are reachable from a root
as "alive"/others as "dead"; a root can be an EC,
active event listener or timer , closure

2-sweep:Delete un-marked(unreachable objects) and reclaim 
memory for future allocation
*/

/*RQ: an object in HEAP can reference (property) other Objects
in Heap
Global objects will stay in heap forever
*/

//memory leaks can happen if he forgets to manually deletes
//active envent listener or timer ...
