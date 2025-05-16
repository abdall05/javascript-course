//Importing Module
import { addToCart, totalPrice as total, tq } from './shoppingCart.js'; //Named Exports

//or just import everything as an Object (default imports)
import * as ShoppingCart from './shoppingCart.js'; // creates a namespace
console.log('Importing Module');

import add from './shoppingCart.js'; //default import
addToCart('bread', 5);
ShoppingCart.addToCart('bread', 5);
add('Pizza', 2);

//can mix both in one line

import add2, { tax } from './shoppingCart.js';

add2('Egg', 10);

console.log(ShoppingCart.cart); //live connection not just a copy

//top-level await ES2022 (only for modules)
const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
const data = await res.json();
console.log(data);

//before we had to use IIFE:
(async function () {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const data = await res.json();
  console.log(data);
})();

//blocks the execution of the entire module
//not like inside functions

const getLastPost = async function () {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const data = await res.json();
  const { title, body } = data.at(-1);
  return { title, body };
};
const lastPost = await getLastPost();
console.log(lastPost);
