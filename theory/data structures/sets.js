// new data structure introduce in ES6

const mySet = new Set("alphabet"); // can pass any iterable
console.log(orderSet);
const setSize = mySet.size;
const isItemInSet = mySet.has("z");
mySet.add("z");
mySet.delete("z");
//loop
for (const item of mySet) {
}

mySet.clear();

// use cases

//remove duplicates

const staff = ["Waiter", "Chef", "Waiter", "Manager", "Chef"];
const staffUnique = [...new Set(staff)]; // spread operator

//ES2025 : new operations

const italianFoods = new Set([
  "pasta",
  "gnocchi",
  "tomatoes",
  "olive oil",
  "garlic",
  "basil",
]);

const mexicanFoods = new Set([
  "tortillas",
  "beans",
  "rice",
  "tomatoes",
  "avocado",
  "garlic",
]);

//Intersection

const commonFood = italianFoods.intersection(mexicanFoods);

// Union

const allFood = italianFoods.union(mexicanFoods);
//or
new Set([...italianFoods, ...mexicanFoods]);

//differenece ; set 1 - intersection
const uniqueItalianFoods = italianFoods.difference(mexicanFoods);
const uniqueMexicanFoods = mexicanFoods.difference(italianFoods);

//Union - intersection -> symmetricDifference

const uniqueItalianAndMexicanFoods =
  italianFoods.symmetricDifference(mexicanFoods);

// check if set contains other set
//isSubsetOf
//isSuperSetOf
//isDisjointFrom : completelty different (no common)
