//spread vs rest
//spread (RIGHT): Iterable -> values seperated by commas
// rest (LEFT) : values -> array (pack) x

//1-Arrays

const arr = [1, 2, 3];
const newArr = [...arr, 4, 5]; //spread

const [a, b, ...others] = arr; // REST
//starting from 3rd elemenet to the rest -> packed into array
// others = [3,4,5]
//collects the unused elements in the destructuring
// doesnt include skipped elements x, , y , ...rest ;
//2nd element is not included in rest
// rest element must be the last element

//2-Objects
const restaurant = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

const { openingHours } = restaurant; // destructuring

const { sat, ...weekDays } = openingHours;

//3-functions (uknown number of arguments)

const add = function (...numbers) {
  //REST pattern
  let sum = 0;
  numbers.forEach((num) => (sum += num));
  return sum;
};

add(1, 2, 3, 4, 5);
add(...arr); //spreading

//optional arguments

const myFunction = function (mainArg, ...optionalArgs) {};

// Practice

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

const {
  players: [players1, players2],
} = game;

const [gk, ...fieldPlayers] = players1;
const allPlayers = [...players1, ...players2];
const players1Final = [...players1, "Thiago", "Coutinho", "Perisic"];
const {
  odds: { team1, x: draw, team2 },
} = game;

const printGoals = function (...playerNames) {
  console.log(
    `goals were scored by`,
    ...playerNames,
    `\nGoals:${playerNames.length}`
  );
};
