//Activating strict mode
"use strict"; //At the beggining of the script (must be first code)
//forbids to do certain things + visual errors not silent
//certain errors like is not defined ,using future reserved words

//Functions
function logger(/* parameters*/) {
  //function declaration
  console.log("Hello!");
}
logger(/* arguments*/); // calling ; running ; invoking interchangeably

function valueProducer(/* parameters*/) {
  const result = 0;
  return result; //return statement
} // if no return value then returns undefined

const myFunction = function () {}; // Function Expression
myFunction();

//difference is that when we decalre the function ; we can call it before teh declaration

//Arror functions : Shorter form of function expression
const currentYear = 2025;
const calcAge = (birthYear) => currentYear - birthYear; // 1 liner function
const age = calcAge(1999);
// if more than 1 statement -> {} ; if more than 1 parameter -> (par1.par2...)
// !!! arrow functios do not get "this" keyword

//Array
//Array is an object
const numbers = [1, 2, 3]; //literal syntax
const years = new Array(1999, 2000, 2001);
console.log(years[0]); //1999
const arraySize = numbers.length; //length property ; accessing using the dot notation
years[0] = 1997; //mutating the array
//we can't mutate const primitive type ; but we can mutate const objects
//but we can't reassign a new object to const object
const arr1 = [1, 2, 3];
const arr2 = [0];
arr1 = arr2; // Error
//can hold different data types
//Array methods
// add elements
numbers.push(4); // returns new length of array
numbers.unshift(0); // insert at index 0
// remove elements
numbers.pop(); // removes last element + returns that element
numbers.shift(); // removes first elements + returns that element

//find element
numbers.indexOf(2);
numbers.includes(2); // ES6 method ; true or false -> uses strict equality

//Objects : key-value pairs

//object literal : a way to declare an object instead of using the "new" keyword
const person = {
  firstName: "Ali", // firstName , lastName ... are called properties
  lastName: "Abdallah",
  age: 25,
  job: "Programmer",
};
//dot vs bracket notation
person.firstName; // dot notation ; returns undefined when the property doesnt exist
person["firstName"]; //bracket notation (key is a string)/we can place an expression that returns a string
const nameKey = "Name";
person[`first${nameKey}`]; // if you need to compute the key use this; else use the dot notation
//add a property
person.location = "Germany";
person["hobby"] = "Chess";
//Object methods
const myObject = {
  firstProperty: 0,
  mySelf: this,
  firstMethod: function () {
    console.log("Hello world!");
  },
  secondMethod: function () {
    // use of this keyword to access properties and methods
    console.log(this.firstProperty);
  },
  //can even access properties using myObject.property but use this instead
};

// for loop
for (let i = 1; i <= 10; i++) {
  // don't use const here , can use var but use
  console.log(`Lifting weights repetition ${i}!`);
}

// loop through array
const myList = [1, 2, 3, 4];
for (let i = 0; i < myList.length; i++) {
  myList[i];
  if (i % 2 == 0) continue; // skips the current iteration
  break; // exists the loop
}
//backward loop
for (let i = myList.length - 1; i >= 0; i--) {}

//while loop
let rep = 1;
while (rep <= 10) {
  rep++;
}
