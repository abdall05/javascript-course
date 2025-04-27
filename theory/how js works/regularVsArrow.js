const ali = {
  firstName: "ali",
  year: 1999,
  calcAge: function () {
    return 2025 - this.year; // better than ali.year
  },
  greet: () => console.log(`Hey ${this.firstName}`),
};

// ali.greet();
// this of greet -> global object -> window ; window.firstName is undefined

//if we use var to declare variables : created property on the global object
ali.greet();
var firstName = "ali"; //due to Hoisting value will be assigned before the function call -> window.firstName= "ali"
// avoid arrow functions (if this is used) + avoid var

const mohamed = {
  firstName: "ali",
  year: 1999,
  calcAge: function () {
    console.log(this); // = obj when called with the obj
    const f = function () {
      console.log(this);
    };
    f(); // this is undefined (regular function call)
  },
};
mohamed.calAge(); // this (scope of calcAge not f) = mohamed obj but this of f is undefined

// solution to this
// 1- assing the value of this to a variable
const newObj = {
  firstName: "ali",
  year: 1999,
  calcAge: function () {
    console.log(this); //obj when called with the obj
    const self = this; // === obj when called with the obj
    const f = function () {
      console.log(self); // ===obj (refenrece of this was copied before calling f)
      console.log(this); // undefined (regular function call)
    };
    f(); // this is undefined (regular function call)
  },
};
newObj.calcAge();
//this was the pre-ES6 solution ; a modern solution with ES6

// 2- arrow function (this will be inherited from the surrounding scope(function))
const modernObj = {
  firstName: "ali",
  year: 1999,
  calcAge: function () {
    console.log(this); //obj when called with the obj
    const f = () => {
      console.log(this); // inherts this from calcAge
    };
    f(); // obj
  },
};
modernObj.calcAge();

//arguemnts keyword:
//only with regular functions
const addExpr = function (a, b) {
  console.log(arguments); // used when we work with unknow number of arguments
};
addExpr(1, 1);
//not used with modern js (old way)
