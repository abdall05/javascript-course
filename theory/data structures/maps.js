// map to store key value pairs ;
// map vs object ? keys of objects are strings ; keys of maps : any

const restaurant = new Map();
//add new key-value pair
restaurant.set("name", "Ali Food"); //returns the map-> allows to chain
restaurant
  .set("categories", ["Italian", "Pizzeria", "Vegetarian", "Organic"])
  .set("open", 11)
  .set("close", 23)
  .set(true, "We are open")
  .set(false, "We are closed");
// get a value : if key not there -> undefined
const categories = restaurant.get("categories");

//trick we can define true and false as keys for the map
const condition = true; // after evaluation
restaurant.get(condition);

//check if contains key
restaurant.has("prices");

//delete
restaurant.delete(true);

// if we want to use an object as key (reference)
const arr = [1, 2];
restaurant.set(arr, 0);
restaurant.get(arr);
//this wont work:
restaurant.set([1, 2], 0);
restaurant.get([1, 2]); // two differenet objects on Heap
//can add DOM objects document.querySelector....

//faster way to add elments to Map -> pass an array of array(2)[key,value]
const question = new Map([
  ["question", "question Text"],
  [1, "option1"],
  [2, "option2"],
  [3, "option3"],
  ["correct", 3],
  [true, "Correct!"],
  [false, "Try again!"],
]);
// same format as Object.entries(obj)

// object -> maps

const obj = {
  firstName: "Ali",
  age: 25,
};

const myMap = new Map(Object.entries(obj));

//Iteration
for (const [key, value] of question) {
} // array destructuring

// map -> array ;
[...question]; // array of [key,value]
question.keys();
question.values();
question.entries();

//Other built-in Data structures in JS
//WeakMap and WeakSet

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
const gameEvents = new Map([
  [17, "⚽️ GOAL"],
  [36, "🔁 Substitution"],
  [47, "⚽️ GOAL"],
  [61, "🔁 Substitution"],
  [64, "🔶 Yellow card"],
  [69, "🔴 Red card"],
  [70, "🔁 Substitution"],
  [72, "🔁 Substitution"],
  [76, "⚽️ GOAL"],
  [80, "⚽️ GOAL"],
  [92, "🔶 Yellow card"],
]);

const events = [...new Set(gameEvents.values())];

gameEvents.delete(64);

console.log(
  `An event happened, on average, every ${Math.round(
    90 / gameEvents.size
  )} minutes`
);

for (const [minute, gameEvent] of gameEvents) {
  console.log(
    `[${minute <= 45 ? "FIRST" : "SECOND"} Half] ${minute}: ${gameEvent}`
  );
}
