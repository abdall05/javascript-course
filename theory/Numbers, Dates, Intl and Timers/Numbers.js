//all numbers are represented internaly as floating point numbers   stored in 8 Bytes
23 = 23.0 // true
//weird numbers because of this binary representation
0.1 + 0.2 === 0.3 //false

//convert string to number
//1
Number('23')
//2
+'23'  // Type coercion because of + operator
//parsing
//1-int
Number.parseInt('30px') // -> advanced type coersion ; string should start with a number
Number.parseInt('123dsfsdofiosdjfoisdjfoisf',10) //123 base 10
//2-float
Number.parseFloat('2.5rem') // 2.5
//these parse functions are global ; can be called without the namespace Number

//check a number 
//convert to number than pass the result to Number.isNaN as argument

!Number.isNaN(10)// false 
Number.isNaN("20") //false //NaN is Number datatype
10 !== NaN // this won't work 
NaN ===NaN // false
23/0 //special number : Infinity
Number.isNaN(23/0) //false
//only use it check NaN
//best to check number (works for float) 
Number.isFinite(Infinity) //false

//to check integer 
Number.isInteger(23)

//Math namespace
Math.sqrt(25)
25**(1/2)
Math.max(...[1,2,3,4,5,6])
Math.PI
Math.random()
Math.trunc() // removes any fractional digits -> converts to integer

const randomInt = (min,max)=> Math.floor((max-min+1)*Math.random())+min


Math.round(23.9) //24
Math.trunc(23.9) //23

Math.floor(23.9) //23
Math.ceil(23.9) // 24

//rounding decimals
const nDigits = 2
(2.345).toFixed(nDigits) // 2.35 ->string ; js will do boxing number ->object to apply this method

//Remainder Operator:%

//Numeric Separators ES2021
const num = 123_460_000 // can be placed anywhere (exceptions); ignored by engine

//if its a string ; converting it to number will give wrong answers

//bigInt
//for Number ; only 53 bits to store integer -> 2^53 -1 numbers 
Number.MAX_SAFE_INTEGER

//ES2020 : bigInt

let x =BigInt(1342142142142141241412412421512)
// 
x = 1342142142142141241412412421512n

//can't mix regular numbers with bigint expect comparison (> <)
20n === 20 //false : difference datatypes
20n == 20 //true

//Math operations doenst work
11n/3n //integer division