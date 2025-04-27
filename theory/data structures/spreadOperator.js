// spread operator

//1-array literal
const arr = [3, 4, 5];
const newArr = [1, 2, ...arr]; // expands the array
// [3,4,5] -> 3,4,5

//2-pass arguments into functions
console.log(...newArr);
//similar to destructuring
//difference ; spread operator doesnt create new variables
//only use it in places where we write values separated by commas

//use cases

// shallow copy of an array
const arrayCopy = [...arr];

// join 2 arrays or more

const joinedArrays = [...arr, ...newArr];

//Speard oprator works on "Iterables" (not objects)
//Iterables: arrays, Strings, maps, sets...
const firstName = "Ali";
const firstNameLetters = [...firstName];

//use it with functions to pass arguments
const arguments = [1, 2, 3];

const f = function (a, b, c) {
  console.log(a, b, c);
};

f(...arguments);

//Since ES18: spreading operator works on objects (NOT iterables)

const obj1 = {
  prop1: 1,
  prop2: 2,
};
const obj2 = { ...obj1, prop3: 3 };

//shallow copy with objects

const objCopy = { ...obj2 };
