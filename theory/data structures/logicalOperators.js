//bool operators
// can use any data type,return any datatype
// short circuiting

// Or
3 || "Ali"; // 3: returns first truthy element (left)
// val1 || val2 ...|| valn -> first truthy element

// used do define default values

const restaurant = {};
let numGuests = restaurant.numGuests || 0;

numGuests = restaurant.numGuests || 10;
//if restaurant.numGuests is 0 -> falsy -> 10 ; a problem
//we just wanted to check if the property exists or not

//for AND operator
// if first falsy value ; if both true returns second

//check if property exists /condition then do something

restaurant.orderPizza && restaurant.orderPizza("Mushroom");

// if the method doesnt exist it won't be executed

//Now solving this problem
restaurant.numGuests = 0;
numGuests = restaurant.numGuests || 10;

// The Nullish Coalescing Operator : ??
//works with Nullish values instead of falsy values
//Nullish values -> null and undefined

numGuests = restaurant.numGuests ?? 10;
//short circuited if left operand is Nullish else execute right

//Logical Assignment Operators (ES2021)
//instead of
restaurant.numGuests = restaurant.numGuests || 10; //default value

// Or assignment operator
restaurant.numGuests ||= 10;

// if property exists but has 0 -> bug ; 0 is false
// restaurant.numGuests will be set to 0

//solution
//Nullish asignmenet Operator
restaurant.numGuests ??= 10; // no bug even if restaurant.numGuests = 0
//like Or asignement operator but works with Nullish values instead

//And assignement operaotor
//do something if first is truthy
restaurant.owner = "Ali Abdallah";
restaurant.owner &&= "<ANONYMOUS>"; // only if first is truthy
//if restaurant.owner doent exist -> set to undefined
