//JS only has 1 thread of execution
//CALLBACK QUEUE : contains ready-to-be-executed callback functions(coming from events)
//If callstack is empty : event loop takes callbacks from the callback queue
//and puts them in the callstack
//->the EVENT LOOP is the essential piece that makes async behaviour possible in JS
//->why we have a non-blocking concurrency model in JS
//how with one thread of execution : async code is executed without blocking?

//all async tasks : timers;AJAX ... will run in the web API environment of the browser
//not in the thread of execution

el = document.querySelector("img");
el.src = "dog.jpg"; //img will start loading in the background
el.addEventListener("load", () => {
  el.classList.add("fadeIn");
});
//loading img doesnt happen in the callstack
//happens in the WEB APIS env

//registering the callback in the same place where the img is loading
//when img finishes loading -> load event -> put callback in the callback queue

//callback queue also contains callbacks coming from DOM events

//Event Loop :
//1-checks callstack empty (except Global execution context)
//2-if no code is being executed -> event loop tick (from callback queue)

//Exception:
//callbacks related to promises (fetch) doesnt go to callback queue / also called macrotasks queue
//microtasks queue : has priority over the callbackQueue
//microtasks queue can starve the callbackQueue

console.log("Test start");
setTimeout(() => {
  console.log("0 sec timer");
}, 0);
Promise.resolve("Resolved promise 1").then((res) => console.log(res)); // creates a successful promise
console.log("Test end");

//Promise callback is executed before the setTimeout callback
//because the promise callback is in the microtask queue and setTimeout is in the callback queue

console.log("Test start");
setTimeout(() => {
  console.log("0 sec timer");
}, 0);
Promise.resolve("Resolved promise 1").then((res) => {
  for (let i = 0; i < 1000000000; i++) {} //blocking code
  console.log(res);
}); // creates a successful promise
console.log("Test end");
