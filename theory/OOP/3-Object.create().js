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
