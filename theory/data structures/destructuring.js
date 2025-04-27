// destructuring : ES6 feature
// used to "unpack" Arrays and objects into seperate variables

//1-Arrays
const arr = [1, 2, 3];
//istead of :
const a = arr[0];
const b = arr[1];
const c = arr[2];
//use destructuring
const [x, y, z] = arr;
const [first, , third] = arr; // second element will be skipped

// swap values
let var1 = 1;
let var2 = 2;
[var1, var2] = [var2, var1];

// we can make a function returns an array then use destructuring
const f = function () {
  return [1, 2];
};

[var1, var2] = f();

//nested array
const nested = [1, 2, [3, 4]];
const [i, , j] = nested;

//Nested destructuring
const [i1, , [i2, i3]] = nested; //destr inside destr

//default values
let [p, q, r] = [1, 2]; // r will be undefined
[p = 1, q = 1, r = 1] = [1, 2];
//usefull when we get data from API

//2-Objects
const myObj = {
  prop1: 1,
  prop2: 2,
  prop3: 3,
};
//write the exacte property names
const { prop1, prop2, prop3 } = myObj; // order doesnt matter
//or to assign other names
const { prop1: newProp1, prop2: newProp2, prop3: newProp3 } = myObj;

// can combine both

const myObj2 = {
  myProp1: 1,
  myProp2: 2,
  myProp3: 3,
};
//+ default values
const { myProp1 = 0, myProp2: newP2 = 0, myProp3 } = myObj2;

//mutating variables: () trick
let value1 = 1;
let value2 = 2;
const obj = { value1: 10, value2: 20 };
// {value1,value2}=obj //can't assing a variable to a block
//to solve this add ()
({ value1, value2 } = obj);
// no problem if we use let or const like previously...

//Nested objects
const restaurant = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

const { openingHours } = restaurant;
const {
  fri: { open, close },
} = openingHours;
const {
  fri: { open: openTime, close: closeTime },
} = openingHours;

// pass an obj to function as argument (many params)

const print1 = function (obj) {
  console.log(`your name is ${obj.firstName || "Uknowm"}
  your age is ${obj.age || "Uknowm"}`);
};
// if prop not there -> undefined (falsy value)

const print2 = function ({ firstName = "Uknown", age = "Uknown" }) {
  // obj destr + default values
  console.log(`your name is ${firstName}
  your age is ${age}`);
};
const person = {
  firstName: "Ali",
  age: 25,
};
print2(person);
//order doenst matter
