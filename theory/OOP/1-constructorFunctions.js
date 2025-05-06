"use strict";
//we call the constructor function with the new operator
//convention : starts with a capital letter
//dont user arrow for this (doesnt have its own this keyword)
const Person = function (firstName, birthYear) {
  console.log(this); //iniatially its {}
};
const ali = new Person("Ali", 1999);

//what happens behind the scene
//1-new {} is created (empty object)
//2-function is called , this will point to this new object {}
//3-{} linked to a prototype
//4-function automatically returns that object
