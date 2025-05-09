const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};
Person.prototype.calcAge = function () {
  return 2025 - this.birthYear;
};
//1-Using constructor functions

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear); //borrow Person constructor
  this.course = course;
};

const ali = new Student("Ali", 1999, "CS");
//No ineritance here ; just borrowing the constructor
//calcAge is not inherited
//we want to make ali.__proto__ = Student.prototype
//and Student.Prototype.prototype = Person.prototype
//here Student.Prototype.prototype = Object.prototype

//Linking prototypes
Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;
//return empty object with __proto__ set to Person.prototype

//we need also to fix Student.prototype.constructor
//its person right now because of Object.create

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mohamed = new Student("Mohamed", 2010, "CS");
mohamed.calcAge();

///////////////////////////////////////
// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};
Car.prototype.accelerate = function () {
  this.speed += 10;
};
Car.prototype.brake = function () {
  this.speed -= 5;
};

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};
EV.prototype = Object.create(Car.prototype);
EV.prototype.constructor = EV;
EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};
EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge -= 1;
  console.log(
    `${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}%`
  );
};

const testla = new EV("Tesla", 120, 23);
testla.accelerate();
