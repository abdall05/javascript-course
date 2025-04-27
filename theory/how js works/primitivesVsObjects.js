//memory management
//how and where variables are created in JS
//memory is automatically managed by JS
//every value we create goes through a memory cycle

//1-allocate memory
let temp = 23; // engine automaticaly allocates a piece of memory to store the value

//2-use memory
temp += 5; // read,write,update value in the allocated piece of memory

//3-release memory : when no more needed ; value is deleted from memory

// where in engine : depends on the type of data

//1-Primitives : CALL STACK (execution context) (generaly) some exception if string is long -> HEAP  // 2-objects : HEAP
//RQ : functions are Objects

//3-References to objects : also stored in CALL STACK

const location = {
  city: "Gabes",
  country: "Tunisia",
};
const newLocation = location;
/* {
  city: "Gabes",
  country: "Tunisia",
}; object will be created in HEAP but location and newLocation will both reference that object (both in CALL STACK)

*/
//mutating newLocation affects location

//Shallow vs Deep copy

const person1 = {
  fisrtName: "ali",
  year: 1999,
};

const person2 = person1; // copy of the referenece
console.log(person1 === person2); // true

person1.year = 2000; // this is possible despite being declared as cosnt
// we are mutating the object stored in HEAP not the refernce ; still the same

person1 = {}; // not allowed ( new reference )

//how to deep copy

const objectToCopy = {
  firstName: "Ali",
  age: 25,
  family: ["mohamed", "rafik"],
};

//1-Shallow copy
const copiedObject = { ...objectToCopy };
copiedObject.family[0] = "Med";
console.log(objectToCopy, copiedObject);
//only works if all datatypes are primitives

// ...{pro1:val1,prop2:val2} -> prop1:val1,prop2:val2
// -> {... {pro1:val1,prop2:val2}} -> {pro1:val1,prop2:val2}
//creates a new object

// still a problem because family is also an Object (Array)
//-> reference will be copied not the actual object
//2-deep copy (clone)
//available in modern browsers
const clonedObject = structuredClone(objectToCopy);
clonedObject.family.push("Hajer");
console.log(objectToCopy, clonedObject);
