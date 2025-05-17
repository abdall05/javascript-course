//Module: Reusable piece of code that encapsulates implementation details
//usually a standalone file
//contains imports,exports,code
//can export simple values or even entire functions : public API
//this public API is consumed using import
//other modules we import are called dependencies of the importing modules
//advantages
//Compose software:small building blocks that we put together to build complex applications
//Isolate components:Modules can be developed in isolation without thinking about the entire codebase
//Abstract code:implement low-level code in modules and import theses abstractions into other modules
//organized code
//reuse code

//ES6 Modules
//Modules stored in files . EXACTLY one module per file
//ES6 Module vs script ?
//1-top-level variables
//in ES6 module : all top-level variable are scoped to module (private to module)
// you can make it public by exporting it.
//scripts: all top-level variables are Global:Global namespace pollution
//2-Default mode
//ES6 Module strict mode / script:sloppy mode

//3-top level this
//ES6 Module: undefined / window

//4-imports and exports
//ES6 module:yes / script :no
//can only happen at top-level (outside of any function or if)
//imports are hoisted

//5-html linking : <script type = "module">
//6-File downloading : ES6 modules always async

//how modules import other modules behind the scenes
//when parsing the script : Importing modules synchronously (the downloading is async)
//top-level imports:make imports known before execution
//linking imports (not by copying but by reference) : a live connection -> when the value changes in the exporting module -> it changes in the importing module
//live connection is unique to ES6 module system ;
//after linking : exection of exporting modules
//finally the importing Module is executed

//starting from ES2022
//await can be used at top-level (for modules only)
//outside of async function
const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
const data = await res.json();

//The Module Pattern : before ES6
//IIFE : commonly used to implement this pattern
//used to created encapsulated reusable code with private and public members
//+:organizing code ; avoiding polluting the global namespace

const MyModule = (function () {
  // Private variables and functions
  const privateVar = "I'm private";

  function privateFunction() {
    console.log("Accessing private function");
  }

  // Public API //works thanks to closures; publicMethod was created inside the scope of the IIFE
  //will have access to EV of te IIFE even after it had returned
  return {
    publicMethod: function () {
      console.log("Accessing public method");
      privateFunction(); // Accessing private inside public
    },
    getPrivateVar: function () {
      return privateVar;
    },
  };
})();
