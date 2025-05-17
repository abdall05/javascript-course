// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
//can name it anything because its default exported

import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
//for copying nested Objects
const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],
  user: {
    loggedIn: true,
  },
};
const stateDeepClone = cloneDeep(state);
state.user.loggedIn = false;
console.log(stateDeepClone);

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
state.cart.find(prod => prod.quantity > 2);

console.log(ShoppingCart.cart); //live connection not just a copy
import 'core-js/stable';
