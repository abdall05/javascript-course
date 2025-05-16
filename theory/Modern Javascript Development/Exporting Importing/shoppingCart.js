//Exporting Module
console.log('Exporting Module');

const shippingCost = 10; //only scoped to this module if not exported
export const cart = [];

//in ES6 : 2 types of exports : Named Exports and default exports
//1-Named Exports : can be used multiple times
export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};

const totalPrice = 200;
const totalQuantity = 10;
const tax = 10;

export { totalPrice, totalQuantity as tq, tax };
//name can be changed in the importing module
//can be done here to (exporting module)

//2-default exports
//only if we want to export one thing per module
//no name is envolved
export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
}

//when imported -> give it any name
