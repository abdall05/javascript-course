//Babel will do transpiling
//only transform synxtax from ES6 to ES5
//new features like find method wont be transformed
//we need polyfilling for that

// for that we use another library
import 'core-js/stable';

//polifilling async functions
import 'regenerator-runtime/runtime';
