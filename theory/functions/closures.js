//closures happen automatically in certain situations

//case 1:

//variables in CallStack are destroyed after the EC in which they are defined finishes execution
//but There's an exception : closures
//the VE (variable Env of the EC) moves to the heap and NOT garbage collected (case of closures)
//JavaScript remembers (closes over) these variables.

const secureBooking = function () {
  let passengerCounter = 0;
  return function () {
    passengerCounter++;
    console.log(`${passengerCounter} passengers`);
  };
};
const booker = secureBooking(); // normally VE of secureBooking would have been destroyed after returning the value
//so when whe call booker() ;passengerCounter should have been unreachabe
// But here reachable by a "closure"
//the engine moved the VE to the heap so it can be reached

//any function always has access to the variable environment of the execution context in which function was created
// EVEN if the EC is gone
//case of booker ; it was created in the EC of secureBooking (return) ; passengerCounter in VE of secureBooking is reachable by
//booker even when secureBooking finished executing
//when booker is called , passengerCounter is not in scope -> JS looks in the closure to check if its there

//A closure gives a function access to all the variable of its parent function ,even after that parent function has returned
//the function keeps a reference to its outer scope
//the closure have priority over scope-chain
//THis is JS featyre that happens automatically;We can't even access closefd-over variable explicitly

//to have a look at closure
console.dir(booker); //scope array contains closure object ; aslo EV there

//function returning a function is not the only case where a closure is created

// case 2

let f;
const g = function () {
  const a = 23;
  f = function () {
    console.log(a);
  };
};
g();
f(); // a is reachable from f; the function was created in EC where a was declared -> a will be reachable from f

const h = function () {
  const b = 100;
  f = function () {
    console.log(b);
  };
};

h();
f();
console.dir(f); // now f only have access to b ; (assigned a new function - > no more access to a : that was another function)

//case 3 : a timer

const boardPassengers = function (n, wait) {
  const perGroup = n / 3;
  setTimeout(function () {
    console.log(`${n} passengers`);
    console.log(`${perGroup} passengers per group`);
  }, 1000 * wait);
  console.log(`Will start boarding in ${wait} seconds`);
};
boardPassengers(180, 3);

//this function will finish execution -> EC destoyed then the callback of settimout will be called
//Inner function still has access to perGroup,n;
/*
setTimeout does not create a new function scope!
It just calls the function after a delay.
The closure is between the inner function and boardPassengers.
*/

//practice

(function () {
  const header = document.querySelector("h1");
  header.style.color = "red";
  document.querySelector("body").addEventListener("click", function () {
    header.style.color = "blue";
  });
})();
