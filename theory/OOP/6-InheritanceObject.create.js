//works in a different way than the previous approaches
//manually set the prototype of objects

const PersonProto = {
  calcAge() {
    return 2025 - this.birthYear;
  },
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};
const ali = Object.create(PersonProto);
//will create an empty object
//with __proto__ set to PersonProto
ali.name = "Ali";
ali.birthYear = 1999;
//least used way of implementing prototypal Inheritance
const mohamed = Object.create(PersonProto);
mohamed.init("Mohamed", 2010);

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};
StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};
const student = Object.create(StudentProto);
student.init("name", 1999, CS);
student.introduce();
