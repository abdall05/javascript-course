"use strict";

//default parameters

const bookings = [];

let createBooking = function (flightNum, numPassengers, price) {
  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};
createBooking("LH123"); // numPassengers and price are udefined

//solution
createBooking = function (
  flightNum,
  numPassengers = 1,
  price = numPassengers * 199
) {};

//default values can be any expresson
//can compute a parameter from a previous one price = numPassengers * 200
// to skip a parameter , pass undefined as argument
createBooking("LH123", undefined, 100);

//Passing Arguments:Value vs Reference
const flight = "LH234";
const ali = {
  name: "Ali Abdallah",
  passport: 24739479284,
};
const checkIn = function (flightNum, passenger) {
  flightNum = ""; // flight is a primitive datatype -> a copy is created
  passenger.name = `Mr. ${passenger.name}`; // an Object -> a copy of reference is created (still poits to the original object in heap)
};
checkIn(flight, ali); // like flightNum=flight and passenger = ali

console.log(flight, ali);

//Js only passes by value! creates a copy of the values stored in the variable: primitive->copy of value;Object->copy of reference

//First-Class vs Higher-Order Functions
//functions are values -> can be stored in variables
//functions are another type of Object
//can be passed as arguments to other functions ; returned from functions
//call methods on functions

//Higher-Order functions:
//A function that receives another function as an argument, that returns a new function, or both

const hello = function () {
  console.log("Hello");
};
document.querySelector("body").addEventListener("click", hello);
//addEventListener is a Higher-order function ; greet is a first-Order function(callback)
function count() {
  //higher order function
  let counter = 0;
  return function () {
    counter++;
  };
}
const counter = count();
counter();

//creating higher order functions

//1-Function Accepting Callback Functions
const oneWord = function (str) {
  return str.replaceAll(" ", "").toLowerCase();
};
const upperFirstWord = function (str) {
  const [first, ...others] = str.split(" ");
  return [first.toUpperCase(), ...others].join(" ");
};

//Higher-order function
const transformer = function (str, fn) {
  console.log(fn.name); // functions have properties and methods
  return fn(str);
};

transformer("ALi Abdallah", oneWord);
//JS uses callbacks all time
//callbacks allows to create "Abstraction"
//Higher-order function -> higher level of abstraction

//2-Functions Returning Functions
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet("Hey");
greeterHey("Ali");

const greet2 = (greeting) => (name) => {
  console.log(`${greeting} ${name}`);
};

//Call and Apply methods
const lufthansa = {
  airline: "Lufthansa",
  iatacode: "LH",
  bookings: [],
  book(flightNum, name) {
    //new object literal syntax
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iatacode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iatacode}${flightNum}`, name });
  },
};

const eurowings = {
  name: "EuroWings",
  iatacode: "EW",
  bookings: [],
  // book:lufthansa.book; we could have do that ; then simply call eurowings.book(...)
};

const book = lufthansa.book;
book(23, "Ali Abdallah"); // this will be undefined (regular function call)

// How to tell JS what "this" will point to ?

//1-call
book.call(eurowings, 23, "Ali Abdallah"); // calls this function by the object "eurowings"
//to avoid writing the same function many times

//2-apply
//similar to call ; the difference is the arguments : takes an array of arguments
const flightData = [23, "Ali Abdallah"];
book.apply(eurowings, flightData);
book.call(lufthansa, ...flightData); // spread operator

//3-bind method
//bind an object to a function ; returns a function ; when called ; calls the function using that object
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
bookEW(23, "Ali Abdallah");
bookLH(23, "Ali Abdallah");
//we can also bind arguments
const bookEW23 = book.bind(eurowings, 23); // common pattern called "partial application"
bookEW23("Ali Abdallah");

lufthansa.book2 = bookEW;
lufthansa.book2(23, "Ali Abdallah"); // even with this ; this will point to eurowings object (binding)

//binding with event listeners

lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  this.planes++;
};

document.querySelector(".buy").addEventListener("click", lufthansa.buyPlane);
//"this" will point to the DOM object (button) ; function is called with the object
//to solve this we can use bind : bind the function to our object

document
  .querySelector(".buy")
  .addEventListener("click", lufthansa.buyPlane.bind(lufthansa));

//partial application : preset parameters
//creating a specific function from a general one
const addTax = (rate, value) => value + value * rate;
const VAT = 0.23;
const addVAT = addTax.bind(null, VAT); // not bound with a specific object ->null

console.log(addVAT(100));

// like doing
const addTaxRate1 = function (rate) {
  // function expression
  return function (value) {
    return value + value * rate;
  };
};
const addTaxRate2 = (rate) => (value) => value + value * rate; // arrow functions

//Practice
const poll = {
  question: "What is your favourite programming language?",
  options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    const promptMessage = [
      this.question,
      ...this.options,
      "(Write option number)",
    ].join("\n");
    const answer = prompt(promptMessage);
    const isNumber = function (input) {
      return !Number.isNaN(Number(input.trim()));
    };
    if (
      answer === null ||
      answer.trim() === "" ||
      !isNumber(answer) ||
      0 > Number(answer) ||
      this.answers.length <= Number(answer)
    ) {
      alert("Not a valid answer!");
    } else {
      this.answers[Number(answer.trim())]++;
    }
  },
  displayResults(type = "array") {
    if (type === "array") {
      console.log(this.answers);
    } else if (type === "string") {
      console.log(`Poll results are ${this.answers.join(", ")}`);
    } else {
      console.log("undefined type!");
    }
  },
};

//how to use the diplayResults method on other objects ?
// an object need to have answers property

const data = [5, 2, 3];
poll.displayResults.call({ answers: data }, "string"); // we can live args empty (default value = "array")

//Immediately Invoked Function Expressions (IIFE)
//execute a function immediately without saving it
(function () {})(); // with wrapping function in parantheses wont work ; (function(){}) is a valid expression
(() => {})();
//functions create scopes ; -> all data defined inside the function scope is private
(function () {
  const private = 0;
})();
//cant be accessed from the global scope

//also  variables declared with const and let create their own scope inside a block

{
  const isPrivate = 1;
}
//can't be accessed from here

// so creating a scope like this for privacy/encapsulation is simpler than IIFE
