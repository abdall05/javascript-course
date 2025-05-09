//modern syntax but still using constructor Functions

//class expression //class declaration
//behind the scene they are still functions
//1-class expression
// const PersonCl = class {};

//2-class declaration
class PersonCl {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }
  //methods will be on the prototype of the objects
  calcAge() {
    return 2025 - this.birthYear;
  }
}

const ali = new PersonCl("Ali", 1999);

ali.__proto__ === PersonCl.prototype;
//we can add methods manually too
PersonCl.prototype.greet = function () {
  console.log(`Hey ${this.firstName}`);
};

//Classes are NOT hoisted even if declared
//Classes are first-class citizens (passed and returned)
//(function behind the scenes)
//Classes are executed in strict mode

//Getters and Setters
//Getters : add keyword get
//Setters : add keyword set

const account = {
  owner: "ali",
  movements: [200, 150, 120, 200],
  get latest() {
    return this.movements.at(-1);
  },
  set latest(mov) {
    this.movements.push(mov);
  },
};

//for setter we use the assignement operator
account.latest = 500; // set latest(500)

//getter:
console.log(account.latest);

class PersonCl2 {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }
  //methods will be on the prototype of the objects
  calcAge() {
    return 2025 - this.birthYear;
  }
  get age() {
    return this.calcAge();
  }

  //set a property that already exists
  //commomly use when we want to do validation while setting
  //recursion problem
  set fullName(name) {
    //if (name.){alert(...)}
    this._fullName = name;
    //without _ will be used by constructor
    //this.firstName = firstName; will call this setter
    //this.fullName = name; will call it again
    //to solve this add _ to the property name
    //this will create a new property (this.fullName wont be created)
    //we need a getter now for _fullName
  }
  get fullName() {
    return this._fullName;
  }
}

//Static Methods //attached to constructor not prototype
Array.from(document.querySelectorAll("h1"));
//the from method is in the Array namespace
[1, 2, 3].from(document.querySelectorAll("h1"));
//can't be called on objects (not in prototype)

const Person = function (name) {
  this.name = name;
};
Person.hey = function () {
  console.log("Hey!");
  console.log(this);
};
Person.hey(); //this: the constructor function Person

class PersonCl3 {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }
  //Instance methods
  calcAge() {
    return 2025 - this.birthYear;
  }
  get age() {
    return this.calcAge();
  }

  //Static methods
  static hey() {
    console.log("Hey!");
    console.log(this);
  }
}

PersonCl3.hey();

///////////////////////////////////////
// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/
class Car {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
    this.print();
  }
  print() {
    console.log(`'${this.make}' going at ${this.speed} km/h`);
  }
  accelerate() {
    this.speed += 10;
    this.print();
  }
  brake() {
    this.speed -= 5;
    this.print();
  }
  get speedUs() {
    return this.speed / 1.6;
  }
  set speedUs(speed) {
    this.speed = speed * 1.6;
  }
}

const car1 = new Car("Ford", 120);
for (let i = 0; i < 3; i++) {
  Math.trunc(Math.random() * 2) === 0 ? car1.accelerate() : car1.brake();
}
