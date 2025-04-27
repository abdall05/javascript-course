/*special variable created for every execution context
-> every function
points to the owner of function
not static;depends on how the function is called ; assigned when the function is called

*/

//1- method using this -> points to the object that is calling the method
const ali = {
  name: "ali",
  year: 1999,
  calcAge: function () {
    return 2025 - this.year; // better than ali.year
  },
};

ali.calcAge(); // value of this here === ali

/*2-simple function call -> this = undefined (strict mode) else global object 
which is the window object for the case of a browser
*/

//3-arrow function : don't get their own this keyword; this of the parent function / scope
// (inhertied)
const calcAgeArrow = (birthyear) => {
  console.log(this); // window object ( this of the surrounding (parent) scope)
}; // for node : empty object {}

//4-Event listener:DOM element that the handler is attached to
// does NOT point  to the function itself , Not to its variable environment(function)

//global context -> window object (browser)
/*
JavaScript objects don’t create their own scope the way functions do.
So defining a function inside an object does not mean the object becomes the lexical scope.
*/
const obj = {
  year: 2000,
  calcAge: () => {
    console.log(this); // this won't be obj (not the outer scope)
  },
};

/*
An arrow function does not care if it's inside an object.
It only looks at where it was defined, not what object it's assigned to.
*/

//case 1 :
const mohamed = { year: 2010, calAge: ali.calcAge }; //method borrowing
mohamed.calAge(); // here this will point to mohamed not ali obj

//case 2:
const f = ali.calcAge;
f(); // this is undefined ; trying to access year property of undefined -> error
