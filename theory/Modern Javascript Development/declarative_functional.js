//two fundamentally diffenret ways of writing code (paradigms)
//1-Imperetaive:
//"HOW to do things":steps by step
//double array
arr = [1, 2, 3, 4, 5];
let doubled = [];
for (let i = 0; i < arr.length; i++) {
  doubled.push(arr[i] * 2);
}

//2-Declarative
//WHAT to do : the step-by-steps instructions get abstracted away
doubled = arr.map((num) => num * 2);

//2- sub-paradigm called "functional" programming
//combining multiple pure functions,avoiding side effects
//(modification/mutation) of any data outside of the function
//pure function:without side effects / impure function
//Immutability:State(data) is never modified->state is copied and the copy is mutated and returned//less bugs
//2 has become the mordern way of writing JS code

//Implement immutability:
//make objects immutible
const imm = Object.freeze({ name: "Ali" });
//not a deep feeze ; only freezes the first level
//example array of objects ; arr[0].name =""
//libraries that implement deep freeze
