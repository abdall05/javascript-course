"use strict";
//we call the constructor function with the new operator
//convention : starts with a capital letter
//dont user arrow for this (doesnt have its own this keyword)
const Person = function (firstName, birthYear) {
  console.log(this); //iniatially its {}
  //Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;
  console.log(this);

  //bad practice : never create methods inside function constructor
  // this.calcAge = function () {
  //   return 2025 - this.birthYear;
  // };
  //why? each instance will have a copy of each method
  //use prototype and prototype inheritance
};
const ali = new Person("Ali", 1999);
//ali is an instance of Person
ali instanceof Person;
//what happens behind the scene
//1-new {} is created (empty object)
//2-function is called , this will point to this new object {}
//3-{} linked to a prototype ; __proto__ property : Person.prototype
//4-function automatically returns that object

//Prototypes
// Person.prototype is an object
//we define our methods inside it ;
//all instances will use those methods.

//Person.prototype is created when the function is defined, not when it's invoked.
//The prototype is linked to new objects at the time of instantiation via new.

Person.prototype.calcAge = function () {
  return 2025 - this.birthYear;
};
Person.prototype.isAlive = true;
ali.__proto__; // prototype object of ali
//same as the prototype property of constructor function
Person.prototype.isPrototypeOf(ali);

ali.hasOwnProperty("isAlive"); //false (property of its prototype)

ali.calcAge(); // not there ? check its prototype : Person.prototype
//the object inherited this method from its prototype
//or it delegated the calcAge functionality to its prototype
//forms a prototype chain

//person.prototype is also an object
//all object have a prototype
//person.prototype.__proto__ =Object.prototype
// {...} === new Object(...) ->
//the created Object will be linked to Object.prototype
//Object.prototpe.__proto__ = null

//prototype chain: Series of links between objects linked through prototypes
//calling
ali.hasOwnProperty("name");
// hasOwnProperty method of ali ? no
//method of Person.prototype? no
//method of Object.prototype? yes

Person.prototype.constructor; //the constructor function
Person.prototype.constructor.prototype; //prototype object

const arr = [1, 2, 3, 4, 5];
arr.__proto__ === Array.prototype;
//prototype property of constructor is the prototype of all objects created by that constructor

//add new method to Array.prototype
Array.prototype.unique = function () {
  return [...new Set(this)];
};
//in practice you shouldn't do it
//functions are also objects

console.dir((x) => x + 1);
// its prototype :  Function.prototype ->Object.prototype

//Person.prototype	Prototype object assigned to instances via new
//Person.__proto__	Prototype of the Person function object → Function.prototype
//Person is still a function

///////////////////////////////////////
// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(this.speed);
};
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(this.speed);
};

const bmw = new Car("BMW", 120);
const mercedes = new Car("Mercedes", 95);
