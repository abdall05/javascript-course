//using ES6 Classes
class Person {
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

class Student extends Person {
  constructor(fullName, birthYear, course) {
    //has to be first
    super(fullName, birthYear);
    //otherwise ; won't be able to access this
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }
}

//if we dont need new properties no need to write the constructor
