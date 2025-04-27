/* High-level language : like js and python; they take care of
resource management -> Abstraction
 Low-level languages like c : manage resources manually
garbage collection is automated (cleaning resources)
*/

//interpreted or just-in-time compiled through Js engine

/*
Multi-paragdigm: 3 popular paradigms
1-procedural programming
2-object-oriented programming (OOP)
3-Functional programming

JS provides all the 3.
*/

/*
prototype-based object-oriented:
All datatypes are objects except primitive datatypes
We define a prototype(contains methods) then we build objects
from that prototype (blueprint)
JavaScript automatically looks up the prototype chain. (similar
    to inheritance)
*/

/* First-class functions:
functions are treated as variables (pass them as variabe or return)
*/

/*
dynamically-typed langauge:datatypes known at runtime;changes
typescript -> strongly typed language
*/
let x = 23;
x = "Ali";

/* Single-threaded
Concurrency model : how Js engine handles multiple tasks happening
at the same time.
JS runs in one single thread
uses Non-blocking event loop model
*/
