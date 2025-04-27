//defining an Object using the object literal syntax
const weekdays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const openingHours = {
  [weekdays[3]]: {
    // computed property names(new ES feature)
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};
const restaurant = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],
  openingHours: openingHours, // old way
  orderPizza: function () {},
};

//Enhanced Object Literals
const enhancedRestaurant = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],
  openingHours, // enhanced syntax
  orderPizza() {}, //enhanced syntax
};

//we can now compute property names
//[expression]:value
let counter = 1;
let value = 1;
const myObject = {
  [`property${counter}`]: value,
};

//Optional Chaining "?."
// when getting data from an API ;
//we are not sure if a certain property exists
//like openingHours.mon can be undefined
// we may access openingHours.mon.open -> error
//this happens when we deal with optional properties
//instead if using if block if(openingHours.mon)
//ES2020 : OptionalChaining
// openingHours.mon.open -> undefined instead of error
let openTime = restaurant.openingHours.mon?.open;
//restaurant.openingHours.mon can be undefined
openTime = restaurant.openingHours?.mon?.open;
//even works if openingHours is undefined

// for computed property names we use [] not dot
for (const day of weekdays) {
  const openHour = restaurant.openingHours[day]?.open ?? "closed";
} // to avoid the bug of 0 -> falsy ; use Nullish instead

//Check if a method exists before calling it
restaurant.order?.();

restaurant.order?.() ?? console.log("Method does not exist");

//Arrays
const users = [];
const username = users[0]?.name; // -> undefined
username ?? console.log("No users!");

//Looping Objects
const properties = Object.keys(openingHours); //Array of keys
const values = Object.values(openingHours); // Array of values

// Object.entries (array of key values pairs [key,value]) (Iterable)
for (const [key, value] of Object.entries(openingHours)) {
} // + array destructuring

//we can also combine array destructuring + object destructuring

for (const [day, { open, close }] of Object.entries(openingHours)) {
} //

//Practice
const game = {
  team1: "Bayern Munich",
  team2: "Borrussia Dortmund",
  players: [
    [
      "Neuer",
      "Pavard",
      "Martinez",
      "Alaba",
      "Davies",
      "Kimmich",
      "Goretzka",
      "Coman",
      "Muller",
      "Gnarby",
      "Lewandowski",
    ],
    [
      "Burki",
      "Schulz",
      "Hummels",
      "Akanji",
      "Hakimi",
      "Weigl",
      "Witsel",
      "Hazard",
      "Brandt",
      "Sancho",
      "Gotze",
    ],
  ],
  score: "4:0",
  scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
  date: "Nov 9th, 2037",
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

const printGoals = function () {
  for (const [goalIndex, scorer] of game.scored.entries()) {
    console.log(`Goal ${goalIndex + 1}: ${scorer}`);
  }
};
printGoals();

let oddSum = 0;
const odds = Object.values(game.odds);
for (const odd of odds) {
  oddSum += odd;
}
const oddAverage = oddSum / odds.length;

const scorers = {};

for (const scorer of game.scored) scorers[scorer] = (scorers[scorer] || 0) + 1;

console.log(scorers);
