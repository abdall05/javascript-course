"Ali" // is a value 
let firstName = "Ali" // declare a variable and assign it a value
console.log(firstName)
// naming rules : 
//naming variables: usually camel case ; only letters,numbers,_,$;except keywords
//name is a reserved keyword;it works but may cause problems

//data types 
//every value is Object or Primitve 
// 1-primitive: 7
let age = 25 //Number : 64 bit
let country = "Tunisia" //String
let isAdult = true //Boolean
let salary //undefined; declared but not assigned a value ~ empty value
//value and type is undefined
let variable = null; //also means 'empty value' / typeof -> object (weird)
let sym1 = Symbol("id"); //symbol:unique and immutable:create hidden or non-colliding keys for objects
let a = 1234567890123456789012345678901234567890n; //bigInt (add n at the end)

typeof salary // === defined (value) which has the type of undefined
//dynamic typing language: data types are determined automatically
// !!! it's the value that has a datatype not the variable
// variables only store values that have a type

//comments: single line comment : "//" ; multi-line: /* */

// let vs const vs var 

// let and const => ES6 (block-scoped); var is the old way

const birthYear = 1999 ; // immutable ; cant be declared empty (let instead+)
//clean clode ; use const instead of let unless you are sure the variable will change

var i = 0 ; // can change variable ,   
// should be avoided : function-scoped

newVariable = 5 // this is also allowed ; it will create a global variable available everywhere
//even outside a function : avoid it source of Bugs

//operators : many types
//Arithmetic ,Assignment, Comparison,logical,Unary,Ternary,Bitwise...
typeof 1 ; // Unary
2>1 ? 1:0 ; // Ternary
age+=1; // Assignment

//Operator precedence : check documentation
// https://developer.mozilla.org/en-US/docs/Web/JavaScript

//Strings
const newString = "Ali" + 99 + "@email.com"; // type Coercion:Number=>String then concatenation

//better ways using TEMPLATE LITERALS 
// using backticks : ``
const myString = `I'am ${firstName}, a ${age}`
const multiLineString = "line 1\n\
line 2\n\
line3";
//or simply using backticks 
` This is a 
    Multi-line String
`
// if / else Statements (CONTROL STRUCTURE)
if ( true /*condtion */)
{
    //do
}
else if (false){

}
else{

}

//Type conversion and Coercion
//conversion when we manually convert type (explicitly)
//coercion when js automatically converts type (implicitly)

//1-type conversion
const stringYear="1999"
const intYear = Number(stringYear)
// if not valid number conversion -> value of the variable is NaN (is a number)
const num = Number("sadasf3413412"); // type=Number but value is NaN

//2-type coercion : Source of Bugs if you don't know it.
//when 1 operator that involves two differenet data types 
"Ali" + 99 ; // ~ "Ali" + String(99) 
99 + "1" ; // => "991" if one of the values is a string ; js does string concatenation 
'23' - '10'// 13


//Truthy and Falsy values
//Falsy: not exactly false but Js will convert them to false
falsyValues = [0,'',undefined,null,NaN] // Boolean({}) -> true
//type coercion into Boolean if condition or logical operator

const money = 0 
let message;  
if (message){

}
else{ // message is undefined -> else is executed
} // careful if message = 0 ; same effect as indefined 

//Equality Operators == and ===

//1- == : loose equality operator : Avoid it as much as possible
"11" == 11 ; // true (if not same type => type coercion)

//2-: Strict equaltiy operator
"11" === 11; //false 
// same with != and !==

//Prompt user in a webpage

const userInput = prompt("message"); // returns string||null

//Logical operators
true && true ; // and operator
true || false ; // or operator
!true; //not operator

//Switch statement
const day = 0; //0-6
switch(day){
    case 0 :
        // do
        break;
    case 1 :
        //do
        break;
    //...
    default:
        //do
        break;
}

//Statement vs Expression

3 + 4 // expression : produces a value

let x = 10 // statement : complete action or instruction.
//if Statement , switch , for loop statement ...

//the Conditional Ternary Operator
const myCondtion = true;
myCondtion ? 1 : 0 // expression
// you can even put statement there ; if statement is executed then the return value is undefined

// Javascript Releases ES5, ES6+ and ESNext (Future versions) (ES: ECMAScript:standard for Javascript)
// Backwards compatibility all the way to ES1
// Many bugs in the old Js ; -> avoid it by using modern Js
// How to use Modern Js today : development vs production
// During development:modern Js -> use the latest Google Chrome!
// During production: use tools like (Babel) to covert code back to ES5 (transpile and polyfill) to ensure browser compatibility for all users.



