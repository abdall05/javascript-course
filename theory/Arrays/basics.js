let arr = [..."abcdef"]; //speard operator

//slice
arr.slice(2); // [startIndex,endIndex[ (similar to strings) ; start can be negative
//shallow copy using slice
const arrCopy = arr.slice(); // cam be used to chain methods
[...arr];

//splice : MUTATES the original array ; deletes
//startDeleteInedx ; deleteCount(optional)
arr.splice(4); // returns an array of the removed elements
arr.splice(-1); //remove last elemt

arr = [..."abcdef"];
let arr1 = [...arr];
//reverse in place
arr.reverse(); //MUTATES

//concatenation
arr.concat(arr1); // return new array

//array -> string
arr.join("");

//new ES2022 method
//at method : safer way to access values in array
//old ways to get last element
arr[arr.length - 1];
arr.slice(-1)[0];
//simply
arr.at(-1); //also can be used for method chaining
//also works on string

//Looping

//1-for of loop
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
for (const movement of movements) {
  const action = movement > 0 ? "deposited" : "withdrew";
  console.log(`You ${action} ${Math.abs(movement)}.`);
}
//+ index
for (const [i, movement] of movements.entries()) {
  const action = movement > 0 ? "deposited" : "withdrew";
  console.log(`${i + 1}->You ${action} ${Math.abs(movement)}.`);
}
//continue and break work in for of loop

//forEach loop
movements.forEach(function (movement) {
  const action = movement > 0 ? "deposited" : "withdrew";
  console.log(`You ${action} ${Math.abs(movement)}.`);
});

// we can use index and the array  too ; parameters name doenst matter
//what matters is the order ; 1:item,2-index,3-items

movements.forEach(function (movement, index, array) {
  const action = movement > 0 ? "deposited" : "withdrew";
  console.log(`You ${action} ${Math.abs(movement)}.`);
});

//!!!! continue and break don't work in forEach loop

// +:forEach with Maps and Sets
//1-Maps
const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

//3-up to parameters (in order)
currencies.forEach(function (value, key, map) {});

//2-Sets
const currenciesUnique = new Set(currencies.keys());
currenciesUnique.forEach(function (value, _, set) {}); // _:naming convention through away variable
