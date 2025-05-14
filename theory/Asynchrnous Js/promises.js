//modern way of  doing AJAX calls ->fetch API

//old way
const request = new XMLHttpRequest();
const country = "Tunisia";
request.open(
  "GET",
  `https://countries-api-836d.onrender.com/countries/name/${country}`
);
request.send();
let data;
request.addEventListener("load", function () {
  [data] = JSON.parse(this.responseText); //destructoring
  console.log(data);
});

//new way
const request2 = fetch(
  `https://countries-api-836d.onrender.com/countries/name/${country}`
);
console.log(request2);
//returns a promise
//Promise:An object that is used as a placeholder for the future result of anasynchronous operation
//like a container for an asynchronously delivered value (future value)

//Advantages of using Promises
//1-no need to rely on events and callbacks to handle async results
//2-chain promises for a sequence of asynchrnous operations: escaping callback hell

//The promise life cycle
//1-PENDING --Async task --> 2-SETTLED (finished task)
//2-SETTLED can be FULFILLED (value is available) OR REJECTED (error)
//We are able to handle these different states in our code.

//1-BUILD PROMISE (eg by fetch API) --> 2-Comsume it when its ready
//sometimes we need to build our own promises

//1-comsuming promises

const getCountryData = function (country) {
  fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
    .then((response) => response.json())
    // these is a new promise -> use chaning)
    .then((data) => console.log(data[0]));
};
getCountryData(country);

//chain promises
const renderCountry = function (data, className) {
  const html = `
          <article class="country ${className}">
              <img class="country__img" src="${data.flag}" />
              <div class="country__data">
                  <h3 class="${data.name}">COUNTRY</h3>
                  <h4 class="country__region">${data.region}</h4>
                  <p class="country__row"><span>👫</span>${(
                    +data.population / 1_000_000
                  ).toFixed(1)}M people</p>
                  <p class="country__row"><span>🗣️</span>${
                    data.languages[0].name
                  }</p>
                  <p class="country__row"><span>💰</span>${
                    data.currencies[0].name
                  }</p>
              </div>
          </article>
        `;
  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};

const getCountryAndNeighbour = function (country) {
  fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
    .then((response) => response.json())
    .then((data) => {
      renderCountry(data[0]);
      const neighbor = data[0].borders?.[0];
      if (!neighbor) return;
      return fetch(
        `https://countries-api-836d.onrender.com/countries/alpha/${neighbor}`
      );
    })
    .then((response) => response.json())
    .then((data) => renderCountry(data, "neighbor"));
};

//Handle errors
//we can pass another callback to then if the promise is rejected is rejected
fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`).then(
  (response) => response.json(),
  (err) => alert(err)
);

//better way : at the end of the chain : .catch((err)=>{})
const getCountryAndNeighbour2 = function (country) {
  fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
    .then((response) => response.json())
    .then((data) => {
      renderCountry(data[0]);
      const neighbor = data[0].borders?.[0];
      if (!neighbor) return;
      return fetch(
        `https://countries-api-836d.onrender.com/countries/alpha/${neighbor}`
      );
    })
    .then((response) => response.json())
    .then((data) => renderCountry(data, "neighbor"))
    .catch((err) => alert(err.message));
};
//finally method : will always be executed
const getCountryAndNeighbour3 = function (country) {
  fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
    .then((response) => response.json())
    .then((data) => {
      renderCountry(data[0]);
      const neighbor = data[0].borders?.[0];
      if (!neighbor) return;
      return fetch(
        `https://countries-api-836d.onrender.com/countries/alpha/${neighbor}`
      );
    })
    .then((response) => response.json())
    .then((data) => renderCountry(data, "neighbor"))
    .catch((err) => alert(err.message))
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};
//catch returns a promise -> finally requires a promise

//!the Promise returned from fetch() never rejects when we get an error response. like 404
//we need to catch it manually

const getCountryAndNeighbour4 = function (country) {
  fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
    .then((response) => {
      if (!response.ok) throw new Error(`Country not found ${response.status}`);
      return response.json();
    })
    .then((data) => {
      renderCountry(data[0]);
      const neighbor = data[0].borders?.[0];
      if (!neighbor) return;
      return fetch(
        `https://countries-api-836d.onrender.com/countries/alpha/${neighbor}`
      );
    })
    .then((response) => {
      if (!response.ok)
        throw new Error(`Neighbour country not found ${response.status}`);
      response.json();
    })
    .then((data) => renderCountry(data, "neighbor"))
    .catch((err) => alert(err.message))
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

const getJSON = function (url, errorMsg = "Something went wrong") {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}.
The AJAX call will be done to a URL with this format: https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=52.508&longitude=13.381. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/

const whereAmI = function (lat, lng) {
  fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
  )
    .then((response) => {
      if (!response.ok) {
        if (response.status == 403)
          throw new Error("Make only 3 requests per second!");
        throw new Error(
          "Cannot find the country with the provided lat and lng!"
        );
      }

      return response.json();
    })
    .then(({ city, countryName }) => {
      //Object destructuring
      console.log(`You are in ${city}, ${countryName}`);
    })
    .catch((err) => console.log(err));
};

//Building a promise
//primise takes a function as an argument(executor function)
//this function takes 2 arguments : resolve and reject
//resolve : function to be called when the async task is finished successfully
//reject : function to be called when the async task fails
//the executor function will excecute the async behavior
//should produce a future result value
const lotteryPromise = new Promise(function (resolve, reject) {
  //simulating async behavior
  console.log("Lotter draw is happening");
  setTimeout(() => {
    if (Math.random() >= 0.5) resolve("You Win");
    else reject(new Error("You Lost!"));
  }, 2000);
});
lotteryPromise
  .then((res) => console.log(res))
  .catch((err) => console.error(err));

//we usually build promises if we want to convert old callback based async behavior to promise based
//thats how fetch is implemented behind the scenes.

//we mostly consume promises.
// promisify setTimeout
//we will create a function that returns a promise for that

const wait = function (seconds) {
  return new Promise(function (resolve) {
    // we don't need the reject here
    setTimeout(resolve, seconds * 1000); // no results is needed
  });
};
wait(5).then(console.log("finished waiting for 5 seconds"));

//avoid callback hell

wait(1)
  .then(() => {
    //do 1
    return wait(1);
  })
  .then(() => {
    // do 2
    return wait(1);
  });

//create immediately a fulfilled or rejected Promise

Promise.resolve("fulfilled Promise ").then((value) => console.log(value));
Promise.reject(new Error("Rejected promise")).catch((err) => console.log(err));

//Promisify the Geolocation API

// building the promise
const getLocationPromise = function () {
  return new Promise(function (resolve, reject) {
    //executor function
    if (!navigator.geolocation)
      reject(new Error("Geolocation is not supported by your browser"));
    else {
      navigator.geolocation.getCurrentPosition((position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        resolve(coords);
      }, reject); //error will be passed as arg by navigator.geolocation.getCurrentPosition
    }
  });
};

//Consuming the promise
const getLocation = function () {
  getLocationPromise()
    .then((coords) => console.log(coords))
    .catch((err) => err);
};
console.log(getLocation());

const whereAmI2 = function () {
  getLocationPromise()
    .then(({ lat, lng }) =>
      fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
      )
    )
    .then((response) => {
      if (!response.ok) {
        if (response.status == 403)
          throw new Error("Make only 3 requests per second!");
        throw new Error(
          "Cannot find the country with the provided lat and lng!"
        );
      }

      return response.json();
    })
    .then(({ city, countryName }) => {
      //Object destructuring
      console.log(`You are in ${city}, ${countryName}`);
      return getJSON(
        `https://countries-api-836d.onrender.com/countries/name/${countryName}`
      );
    })
    .then((data) => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];
      if (!neighbour) throw new Error("Neighbour is undefined");
      return getJSON(
        `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`
      );
    })
    .then((data) => renderCountry(data, "neighbour"))
    .catch((err) => {
      renderError(err.message);

      console.log(err);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/
//promisifying img loading
const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement("img");
    img.src = imgPath;

    const onLoad = (event) => {
      img.removeEventListener("load", onLoad);
      img.removeEventListener("error", onError);
      document.querySelector(".images").insertAdjacentElement("beforeend", img);
      resolve(img);
    };
    const onError = (event) => {
      img.removeEventListener("load", onLoad);
      img.removeEventListener("error", onError);
      reject(new Error("Error while loading the image!"));
    };
    img.addEventListener("load", onLoad);
    img.addEventListener("error", onError);
  });
};
let currentImage;

createImage("img/img-1.jpg")
  .then((img) => {
    currentImage = img;
    return wait(2);
  })
  .then(() => {
    // wait doesnt have a fulfill value ()
    currentImage.style.display = "none";
    return createImage("img/img-2.jpg");
  })
  .then((img) => {
    currentImage = img;
    return wait(2);
  })
  .then(() => (currentImage.style.display = "none"))
  .catch((err) => console.log(err));
// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, 1000 * seconds);
//   });
// };

//Consuming Promises With Async/Await
const whereAmI3 = async function (country) {
  //will run in the background and returns a promise

  const promuseResult = await fetch(
    `https://countries-api-836d.onrender.com/countries/name/${country}`
  ); // waits until the results of the promise is fulfilled
  //doesnt block the main thread of execution (function is executed in the background)
  console.log(promuseResult);

  //fetch(
  //   `https://countries-api-836d.onrender.com/countries/name/${country}`
  // ).then(res=>console.log(res));

  const data = await promuseResult.json();
  renderCountry(data[0]);
};
//no need to chain then and catch
//looks like synchronous code buts its asynchronous in reality
// whereAmI3("Tunisia");
// console.log("This statement will be executed first.");

const whereAmI4 = async function () {
  const { lat, lng } = await getLocationPromise();
  const countryNameResult = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
  );
  const { countryName } = await countryNameResult.json();
  const promuseResult = await fetch(
    `https://countries-api-836d.onrender.com/countries/name/${countryName}`
  );
  const data = await promuseResult.json();
  renderCountry(data[0]);
};
whereAmI4();

//No error handling yet

//Error Handling With try...catch ; can be used with regular errors not only async/await

try {
  const x = 1;
  x = 2;
} catch (err) {
  console.log(err.message);
}
const whereAmI5 = async function () {
  try {
    const { lat, lng } = await getLocationPromise();
    //no need to throw error here. if it fails ; error passed to reject will be thrown
    const countryNameResult = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
    );
    if (!countryNameResult.ok) throw new Error("Problem getting location data");
    // fetch is a special case ; we have to handle error http response (not rejected)
    const { countryName } = await countryNameResult.json();
    const countryResults = await fetch(
      `https://countries-api-836d.onrender.com/countries/name/${countryName}`
    );
    if (!countryResults.ok) throw new Error("Problem getting country data");
    const data = await countryResults.json();
    renderCountry(data[0]);
  } catch (err) {
    console.log(err);
  }
};
whereAmI5();

//Returning Values from Aync functions
const whereAmI6 = async function () {
  try {
    const { lat, lng } = await getLocationPromise();
    //no need to throw error here. if it fails ; error passed to reject will be thrown
    const countryNameResult = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
    );
    if (!countryNameResult.ok) throw new Error("Problem getting location data");
    // fetch is a special case ; we have to handle error http response (not rejected)
    const { city, countryName } = await countryNameResult.json();
    const countryResults = await fetch(
      `https://countries-api-836d.onrender.com/countries/name/${countryName}`
    );
    if (!countryResults.ok) throw new Error("Problem getting country data");
    const data = await countryResults.json();
    renderCountry(data[0]);
    return `You are in ${city}, ${countryName}`; // this will become the fulfilled value
  } catch (err) {
    console.log(err);
    throw err; // if error ; rejected promise with this value will be returned
  }
}; //if error -> rejected value
//if no return value -> fulfilled and value is undefined

// whereAmI6()
//   .then((city) => console.log(city))
//   .catch((err) => console.log(err));
//mixing old and newer why of consuming promises
//how to avoid that ? we can only use await inside async function
//use (IIFE)
(function () {})();

(async function () {
  try {
    const city = await whereAmI6();
    console.log(city);
  } catch (err) {
    console.log(err);
  }
})();

//Running Promises in Parallel
const get3countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(
    //   `https://countries-api-836d.onrender.com/countries/name/${c1}`
    // );
    // const [data2] = await getJSON(
    //   `https://countries-api-836d.onrender.com/countries/name/${c1}`
    // );
    // const [data3] = await getJSON(
    //   `https://countries-api-836d.onrender.com/countries/name/${c1}`
    // );
    // console.log[(data1.countryName, data2.countryName, data2.countryName)];
    //we can run all in parallel (independant promises)
    const data = await Promise.all([
      getJSON(`https://countries-api-836d.onrender.com/countries/name/${c1}`),
      getJSON(`https://countries-api-836d.onrender.com/countries/name/${c2}`),
      getJSON(`https://countries-api-836d.onrender.com/countries/name/${c3}`),
    ]);
    console.log(data);
    console.log(data.map((countryData) => countryData[0].capital));
  } catch (err) {
    console.log(err);
  }
};
get3countries("Tunisia", "Algeria", "Palestine");
//if 1 promise rejects the whole promise rejects

//Other Promise Combinators

//Promise.race() // similar to all but returns the first settled promise

(async function (c1, c2, c3) {
  {
    try {
      const data = await Promise.race([
        getJSON(`https://countries-api-836d.onrender.com/countries/name/${c1}`),
        getJSON(`https://countries-api-836d.onrender.com/countries/name/${c2}`),
        getJSON(`https://countries-api-836d.onrender.com/countries/name/${c3}`),
      ]);
      console.log(data[0].capital);
    } catch (err) {
      console.log(err);
    }
  }
})("Tunisia", "Algeria", "Palestine");

//usefull to implement timeout function

const timeout = function (ms) {
  return new Promise(function (_, reject) {
    //resolve is not needed
    setTimeout(() => reject(new Error("Request took too long!")), ms);
  });
};
Promise.race([
  getJSON(`https://countries-api-836d.onrender.com/countries/name/Tunisia`),
  timeout(1000),
])
  .then((res) => console.log(res[0].capital))
  .catch((err) => console.log(err));

//Promise.allSettled retunrs all promises when settled (fulfilled or rejected)

//Promise.any (ES2021) returns the first fulfilled promise (ignore rejected)
//if all rejected -> rejected Promise

///////////////////////////////////////
// Coding Challenge #3

/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

PART 2
1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
2. Use .map to loop over the array, to load all the images with the 'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'paralell' class to all the images (it has some CSS styles).

TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

GOOD LUCK 😀
*/
// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement("img");
//     img.src = imgPath;

//     const onLoad = (event) => {
//       img.removeEventListener("load", onLoad);
//       img.removeEventListener("error", onError);
//       document.querySelector(".images").insertAdjacentElement("beforeend", img);
//       resolve(img);
//     };
//     const onError = (event) => {
//       img.removeEventListener("load", onLoad);
//       img.removeEventListener("error", onError);
//       reject(new Error("Error while loading the image!"));
//     };
//     img.addEventListener("load", onLoad);
//     img.addEventListener("error", onError);
//   });
// };
// let currentImage;

// createImage("img/img-1.jpg")
//   .then((img) => {
//     currentImage = img;
//     return wait(2);
//   })
//   .then(() => {
//     // wait doesnt have a fulfill value ()
//     currentImage.style.display = "none";
//     return createImage("img/img-2.jpg");
//   })
//   .then((img) => {
//     currentImage = img;
//     return wait(2);
//   })
//   .then(() => (currentImage.style.display = "none"))
//   .catch((err) => console.log(err));

const loadNPause = async function () {
  try {
    let img = await createImage("img/img-1.jpg");
    await wait(2);
    img.style.display = "none";
    img = await createImage("img/img-2.jpg");
    await wait(2);
    img.style.display = "none";
  } catch (err) {
    console.log(err);
  }
};

const loadAll = async function (imgArr) {
  const images = await Promise.all(
    imgArr.map((imgPath) => createImage(imgPath))
  );
  images.forEach((img) => img.classList.add(paralell));
};
