/* 
Js engine:Program that executed Js code.
every browser has its own engine;
Google's V8 engine (well know engine) Power chrome and Node.js

every engine cotains call stack and heap
1- call stack : contains our code 
2-Heap: where objects are stored
*/

/* 
Compilation vs Interpretation:
Compilation : all source code is converted into machine code before
execution 
Interpretation : Interpreter runs throught the source code and 
executes it line by line
*/

/*
Js used to be a purely Interpreted language -> was slow
today,modern js engines uses a mix of compilation and interpretation
called "just-in-time compilation (JIT)"  compilation

entire code is converted into machine code at once, then executed
IMMEDIATELY (no portable file generated like Compilation)
*/

/* JIT Compilation steps
1-Parsing: source code -> AST (tree structure) ; also checks syntax

2-compilation : AST -> machine code

3-machine code Exection IMMEDIATELY (in call stack) + 
Optimization while running code (swaps old code with new code
    without stopping the execution)

*/

/*
JS runtime in the Browser : Js engine + WEB APIs
(DOM , Timers , Fetch API...) : Fnctionalities provided to the
engine, accessible on global "window object"
+CALLBACK QUEUE:contains all cb ready to be executed
*/
/*
JS runtime in Node.Js : Js engine 
+CALLBACK QUEUE:contains all cb ready to be executed ...
without WEP APIs (because they are provided by browser)
uses C++ BINDING and THREAD POOL instead
*/

function first() {
  function second() {
    var x = 1;
  }
}
console.log(x);
