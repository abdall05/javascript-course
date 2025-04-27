const myString = "Ali";
const letter = plane[0];
"Ali"[0];
""[2]; //udefined
"".charAt(2); // => "" ; safer
myString.length;
"Ali".length;
//get first occurance
plane.indexOf("Ali");
//get last occurance
plane.lastIndexOf("Ali");

//slicing
const startIndex = 0;
const endIndex = myString.length;
const newString = myString.slice(0, endIndex); //[start,end[

//negative start index : starts from the end
myString.slice(-1); // last char
let firstName = "Ali";
firstName = "mohamed";
//strings are immutable ; we are just assinging a new reference to the variable
//both "Ali" and "mohamed" are still in heap.
// all methods will return a new string
/*
Automatic Boxing (Wrapper Objects):
When you try to call a method on a primitive value (like myString.slice()),
 JavaScript automatically wraps the primitive value in its corresponding wrapper object
for that type (in this case, the String object).
*/
typeof new String(); //Object ; used to warp primitive strings

//changing case
"ali".toUpperCase(); //ALI

//capitalize a name
firstName =
  firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();

//comparing emails
const email = "ali@example.com";
const loginEmail = "ali@exemple.com";
const lowerEmail = loginEmail.toLowerCase();
const trimmedEmail = lowerEmail.trim();
//or simply
const normalizedEmail = loginEmail.toLowerCase().trim();
//replacing
const priceDE = "300,99€";
const priceUS = priceDE.replace("€", "$"); // only replaces the first occurrence
priceDE.replaceAll("€", "$");
// can use regex (RegExp Object) with replace method to replace all
// you can still write the regex in a string but u need to double escape \ characters
priceDE.includes("€");
priceDE.startsWith("€");

const checkBaggage = function (items) {
  const forbiddenItems = ["gun", "knife"];
  const baggage = items.toLowerCase();
  for (const forbiddenItem of forbiddenItems) {
    if (baggage.includes(forbiddenItem)) return false;
  }
  return true;
};

//split
const [first, tmp] = "1+2=3".split("+"); // tmp= "2=3"
const [second, res] = tmp.split("=");
//seperator must be passed as arg or [myString] will be returned

// join [string1,string2 ...].join(separator)
["ali"].join(); // default ", "

const capitalizeName = function (name) {
  const capitalizeWord = function (word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  };
  return name.trim().split(" ").map(capitalizeWord).join(" ");
};
capitalizeName("aLi aBdAllaH");

//add padding
const message = "Alert";
//add padding until resulting length matches the input
message.padStart(20, "+").padEnd(30, "+");

const maskCreditCard = function (nunber) {
  const str = String(number); //or number+""
  const last = str.slice(-4);
  return last.padStart(str.length, "X");
};

//repeat
"WARNING! ".repeat(3);

//Practice
const underscoreToCamelCase = function (variableList) {
  const capitalizeWord = function (word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  };

  const str = variableList
    .map((variable) =>
      variable
        .toLowerCase()
        .split("_")
        .map((word) => capitalizeWord(word))
    )
    .join("");

  return str.replace(str.charAt(0), str.charAt(0).toLowerCase());
};

const flights = `_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30`;
const flightInfoList = flights.split("+");
const formattedFlightsInfo = flightInfoList.map((row) => {
  const flightData = row.split(";");
  const type = flightData[0].slice(1).split("_").join(" ");
  const digitIndexFrom = flightData[1]
    .split("")
    .findIndex((c) => !Number.isNaN(Number(c)) && c !== " ");
  const from = flightData[1].slice(0, digitIndexFrom).toUpperCase();
  const digitIndexTo = flightData[2]
    .split("")
    .findIndex((c) => !Number.isNaN(Number(c)) && c !== " ");
  const to = flightData[2].slice(0, digitIndexTo).toUpperCase();
  const time = flightData[3];
  return `${type} from ${from} to ${to} (${time})`;
});
for (const line of formattedFlightsInfo) console.log(line);
