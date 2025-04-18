//DOM Manipulation
"use strict";
//DOM:Document Object Model : Allows js to access html elements and styles to manipulate them
//automaticaly created by brwoser when the webpage is loaded.
//DOM is not a part of the JavaScript language!

//document: special object that is the entry point to the DOM
//DOM is part of the WEB APIs ; libraries imported by the browser that we can access with our js code
const htmlElement = document.querySelector(/* css selector */);
const elementText = htmlElement.textContent;
document.querySelector(/* css selector */).textContent = "New Text";

//with an input field we use .value instead
const inputValue = htmlElement.value;

//Handling click events

document
  .querySelector(/* button selector */)
  .addEventListener("click", /*Event Handler*/ function () {});

//Manipulating CSS Styles
document.querySelector(/* css selector */).style.backgroundColor = "#60b347"; // value should be a string
document.querySelector(".number").style.width = "30rem";
