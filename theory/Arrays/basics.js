let arr = [..."abcdef"]; //speard operator

//add
arr.push("g"); // end
arr.unshift("0"); //start

//remove
arr.pop(); //end
arr.shift(); //start
arr.splice(-1); //from to (-1 -> last element only)

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

//map,filter,reduce methods

//1-map:maps each array element to a new element ; returns a new array
[1, 2, 3].map((element) => 2 * element);

//2-filter:filters the array based on a condition
[1, 2, 3, 4, 5].filter((element) => element <= 3);

//3-reduce:reduces the entire array to a single value
[1, 2, 3, 4, 5].reduce((acc, element) => acc + element, 0); // 0 is the intial value

//map
const eurToUsd = 1.1;
const movementsUSD = movements.map((movement) => movement * eurToUsd);
const movementsDescriptions = movements.map((movement, index, array) => {
  const action = movement > 0 ? "deposited" : "withdrew";
  return `${index + 1}->You ${action} ${Math.abs(movement)}.`;
});

//filter
const deposits = movements.filter((mov) => mov > 0);
const withdrawals = movements.filter((mov) => mov < 0);

//reduce
const balance = movements.reduce((acc, mov) => acc + mov, 0); //acc:accumulator
movements.reduce((acc, mov, index, array) => acc + mov, 0);

//get max value with reduce
const max = movements.reduce((acc, mov) => Math.max(acc, mov), movements[0]);

const dogsAges = [15, 4, 5, 6, 7, 9];
const dogsAverageHumanAge = dogsAges
  .map((dogAge) => (dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4))
  .filter((humanAge) => humanAge >= 18)
  .reduce((acc, age, _, arr) => acc + age / arr.length, 0);

//find method

const firstWithdrawl = movements.find((mov) => mov < 0); // finds the first negative value

//findIndex
//delete an element with splice method : we need the index for that

//new findLast and findlastIndex methods

//some and every
//some : check if there's an element that satisfies a condition
//any element satisfying the condition
movements.some((mov) => mov > 0); // for equality just use includes

//every method : all must satisfy the condition
movements.every((mov) => mov !== 0); // all must be not 0

//flat and flatMap
//array with nested arrays -> unpacks the nested arrays -> new array
const myArr = [[1, 2, 3], [4, 5, 6], 7, 8];
arr.flat(); // default : 1 level of nesting -> depth = 1
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];
const overalBalance = accounts
  .map((acc) => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);

//map + flat is very common operation -> use flatMap instead : better for performace
const overalBalance2 = accounts
  .flatmap((acc) => acc.movements) //maps then flat (only 1 level depp)
  .reduce((acc, mov) => acc + mov, 0);

/*
This time, Julia and Kate are studying the activity levels of different dog breeds.

YOUR TASKS:
1. Store the the average weight of a "Husky" in a variable "huskyWeight"
2. Find the name of the only breed that likes both "running" and "fetch" ("dogBothActivities" variable)
3. Create an array "allActivities" of all the activities of all the dog breeds
4. Create an array "uniqueActivities" that contains only the unique activities (no activity repetitions). HINT: Use a technique with a special data structure that we studied a few sections ago.
5. Many dog breeds like to swim. What other activities do these dogs like? Store all the OTHER activities these breeds like to do, in a unique array called "swimmingAdjacent".
6. Do all the breeds have an average weight of 10kg or more? Log to the console whether "true" or "false".
7. Are there any breeds that are "active"? "Active" means that the dog has 3 or more activities. Log to the console whether "true" or "false".

BONUS: What's the average weight of the heaviest breed that likes to fetch? HINT: Use the "Math.max" method along with the ... operator.

TEST DATA:
*/
const breeds = [
  {
    breed: "German Shepherd",
    averageWeight: 32,
    activities: ["fetch", "swimming"],
  },
  {
    breed: "Dalmatian",
    averageWeight: 24,
    activities: ["running", "fetch", "agility"],
  },
  {
    breed: "Labrador",
    averageWeight: 28,
    activities: ["swimming", "fetch"],
  },
  {
    breed: "Beagle",
    averageWeight: 12,
    activities: ["digging", "fetch"],
  },
  {
    breed: "Husky",
    averageWeight: 26,
    activities: ["running", "agility", "swimming"],
  },
  {
    breed: "Bulldog",
    averageWeight: 36,
    activities: ["sleeping"],
  },
  {
    breed: "Poodle",
    averageWeight: 18,
    activities: ["agility", "fetch"],
  },
];

const huskyWeight = breeds.find(
  (breed) => breed.breed === "Husky"
).averageWeight;

const breedName = breeds.find(
  (breed) =>
    breed.activities.includes("running") && breed.activities.includes("fetch")
);

const allActivities = breeds.flatMap((breed) => breed.activities);
const uniqueActivities = [...new Set(allActivities)];

const swimmingAdjacent = [
  ...new Set(
    breeds
      .filter((breed) => breed.activities.includes("swimming"))
      .flatMap((breed) => breed.activities)
  ),
].filter((activity) => activity !== "swimming");

breeds.every((breed) => breed.averageWeight >= 10);

const breedsweights = breeds
  .filter((breed) => breed.activities.includes("fetch"))
  .map((breed) => breed.averageWeight);
const maxWeight = breedsweights.reduce(
  (acc, weight, _, array) => Math.max(acc, weight),
  breedsweights[0]
);

//sorting arrays
const numbers = [2, 3, 0, -1, 5];
numbers.sort(); // mutates the original array
//by default it does the string sorting -> converts to string the sorts
numbers.push(11);
numbers.sort(); // [-1, 0, 11, 2, 3, 5]

//pass a compare callback function (a,b)
// if comp returns < 0 ->  order will be a , b
// if comp returns > 0 -> b , a

numbers.sort(function (a, b) {
  return a - b; // if a > b  -> a-b >0  switch order (b,a) -> ascending order
});

numbers.sort(
  (a, b) => a - b // if a > b  -> a-b >0  switch order (b,a) -> ascending order
);
numbers.sort(function (a, b) {
  return b - a; // descending order
});

//array grouping : ES2024 feature

const groupedMovements = Object.groupBy(
  movements,
  (movement) => (movement > 0 ? "deposits" : "withdrawls") //cb should return the group name
);
//returns a new object with 2 properties (deposits and withdrawls)

const groupedByActivity = Object.groupBy(accounts, (account) => {
  const movementCount = account.movements.length;
  if (movementCount >= 8) return "very active";
  else if (movementCount >= 4) return "active";
  else if (movementCount >= 1) return "moderate";
  else return "inactive";
});

//common use case ; account.type(premium , free)
const groupedAccounts = Object.groupBy(accounts, (account) => account.type);

// we can use destructuring with parameters
Object.groupBy(accounts, ({ type }) => type); // extract type attribute from input object(account)

//more ways of creating and filling arrays
const SIZE = 10;
const x = new Array(SIZE);
//fill the array
x.fill(0); // also can specify start, end index

//Array.from iterable or object that has length property (arrayLike)
// + callback (mapping function : (curr,index)=>new value
//convert to array + do mapping

Array.from({ length: 100 }, (_, index) => {
  //here _ is indefined
  return index + 1;
});

const diceArray = Array.from(
  //from iterable or object that has length property (arrayLike)
  { length: 100 },
  (_, index) => Math.floor(Math.random() * 6) + 1
);
const zeroes = Array.from(new Array(100), (_, index) => 0);

//querySelectorAll() also return iterable

const movementUI = Array.from(
  document.querySelectorAll(".movement_value"),
  (el) => Number(el.textContent.replace("€", ""))
);

//also [...iterable] coverts to array but then we have to do the mapping

//non destructive alternatives (doesnt mute the array)
const myArray = [1, 3, 2, 5, 7, 10];

myArray.slice().reverse(); // new array

//toReversed
myArray.toReversed();

//toSorted

//toSpliced

//new copy + modifying an element
//arrayInstance.with(index, value)
myArray.with(0, 1000); // new copy + [0]=1000

//Practice

const totalDeposits = accounts
  .flatMap((account) => account.movements)
  .filter((movement) => movement > 0)
  .reduce((acc, deposit) => acc + deposit, 0);

let numDeposits1000 = accounts
  .flatMap((account) => account.movements)
  .filter((movement) => movement >= 1000).length;
numDeposits1000 = accounts
  .flatMap((account) => account.movements)
  .reduce((acc, mov) => (mov >= 1000 ? ++acc : acc), 0); //acc++ wrong

let depositsAndWithdrawals = accounts
  .flatMap((account) => account.movements) // ({movements})=>movements
  .reduce(
    (obj, mov) => {
      mov > 0 ? (obj.deposits += mov) : (obj.withdrawals += Math.abs(mov));
      return obj;
    },
    { deposits: 0, withdrawals: 0 }
  );
//or
depositsAndWithdrawals = accounts
  .flatMap(({ movements }) => movements)
  .reduce(
    (obj, mov) => {
      obj[mov > 0 ? "deposits" : "withdrawals"] += Math.abs(mov);
      return obj;
    },
    { deposits: 0, withdrawals: 0 }
  );

const convertTitleCase = function (title) {
  const exceptions = ["a", "the", "but", "and", "or", "on", "in", "with"];
  const capitalize = function (word) {
    if (word.length === 0) return word;
    return word[0].toUpperCase() + word.slice(1);
  };
  return title
    .toLowerCase()
    .split(" ")
    .map((word, i) =>
      !exceptions.includes(word) || i === 0 ? capitalize(word) : word
    )
    .join(" ");
};

// Coding Challenge #5

/* 
Julia and Kate are still studying dogs. This time they are want to figure out if the dogs in their are eating too much or too little food.

- Formula for calculating recommended food portion: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
- Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
- Eating an okay amount means the dog's current food portion is within a range 10% above and below the recommended portion (see hint).

YOUR TASKS:
1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion (recFood) and add it to the object as a new property. Do NOT create a new array, simply loop over the array (We never did this before, so think about how you can do this without creating a new array).
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple users, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much (ownersTooMuch) and an array with all owners of dogs who eat too little (ownersTooLittle).
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is ANY dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether ALL of the dogs are eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Group the dogs into the following 3 groups: 'exact', 'too-much' and 'too-little', based on whether they are eating too much, too little or the exact amount of food, based on the recommended food portion.
9. Group the dogs by the number of owners they have
10. Sort the dogs array by recommended food portion in an ascending order. Make sure to NOT mutate the original array!

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.


GOOD LUCK 😀
*/

const dogs = [
  { weight: 22, curFood: 250, owners: ["Alice", "Bob"] },
  { weight: 8, curFood: 200, owners: ["Matilda"] },
  { weight: 13, curFood: 275, owners: ["Sarah", "John", "Leo"] },
  { weight: 18, curFood: 244, owners: ["Joe"] },
  { weight: 32, curFood: 340, owners: ["Michael"] },
];

dogs.forEach(function (dog) {
  dog.recFood = dog.weight ** 0.75 * 28;
});
console.log(dogs);
const findSarahDog = function (dogs) {
  const sarahDog = dogs.find((dog) => dog.owners.includes("Sarah"));
  console.log(
    `It's eating too ${
      sarahDog.curFood <= sarahDog.recFood ? "little" : "much"
    }.`
  );
  return sarahDog;
};
const saraDog = findSarahDog(dogs);

const dogsGrouping = Object.groupBy(dogs, (dog) => {
  if (dog.curFood > dog.recFood) return "dogsEatingTooMuch";
  else if (dog.curFood < dog.recFood) return "dogsEatingTooLittle";
});

const [ownersTooMuch, ownersTooLittle] = [
  [
    dogsGrouping.dogsEatingTooMuch.flatMap(({ owners }) => owners),

    dogsGrouping.dogsEatingTooLittle.flatMap(({ owners }) => owners),
  ],
];

// 4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"

console.log(`${ownersTooMuch.join(" and ")}'s dogs eat too much!`);
console.log(`${ownersTooLittle.join(" and ")}'s dogs eat too little!`);

//5. Log to the console whether there is ANY dog eating EXACTLY the amount of food that is recommended (just true or false)
console.log(dogs.some((dog) => dog.curFood === dog.recFood));

//6. Log to the console whether ALL of the dogs are eating an OKAY amount of food (just true or false)

const isFoodOkay = (dog) =>
  dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1;

console.log(dogs.every((dog) => isFoodOkay(dog)));

// 7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
okayDogs = dogs.filter((dog) => isFoodOkay(dog));

//8. Group the dogs into the following 3 groups: 'exact', 'too-much' and 'too-little', based on whether they are eating too much, too little or the exact amount of food, based on the recommended food portion.

({ exact, tooMuch, tooLittle } = Object.groupBy(dogs, (dog) => {
  if (dog.curFood === dog.recFood) return "exact";
  else if (dog.curFood > dog.recFood) return "tooMuch";
  else return "tooLittle";
}));

// 9. Group the dogs by the number of owners they have

const dogsGroupByNumberOwners = Object.groupBy(dogs, (dog) => {
  return dog.owners.length;
});

//10. Sort the dogs array by recommended food portion in an ascending order. Make sure to NOT mutate the original array!

const sortedDogs = dogs.toSorted((dog1, dog2) => dog1.recFood - dog2.recFood);
