//beside ES6 Modules and Module Pattern -> other Module systems
//Not native Js :example: EMD modules and CommonJs Modules
//CommonJs Modules are used in Node.js
//only recently ES6 modules have been implemented in Node.js
//All modules in npm still use the CommonJs modules system
//npm was originally intended for Node (uses CommonJs)
//then npm become the standard repository for the whole JS world.

//like ES6 : 1 file is 1 module

//1-Export

// export.addToCart= function (product, quantity) {
//   cart.push({ product, quantity });
//   console.log(`${quantity} ${product} added to cart`);
// };
//export is an object in Node.js . not gonna work in browser

//2-Import
// const { addToCart } = require("./shoppingCart.js");
//require is a function in Node.js . not gonna work in browser
