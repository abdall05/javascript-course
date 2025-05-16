"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

const country = "Tunisia";

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
const renderError = function (msg) {
  countriesContainer.insertAdjacentText("beforeend", msg);
  countriesContainer.style.opacity = 1;
};
// const getCountryAndNeighbour = function (country) {
//   const request = new XMLHttpRequest();
//   request.open(
//     "GET",
//     `https://countries-api-836d.onrender.com/countries/name/${country}`
//   );
//   request.send();
//   let data;
//   request.addEventListener("load", function () {
//     [data] = JSON.parse(this.responseText); //destructoring
//     renderCountry(data);

//     //Get Neighbour country
//     const neighbor = data.borders?.[0];
//     if (!neighbor) return;
//     const request2 = new XMLHttpRequest();
//     request2.open(
//       "GET",
//       `https://countries-api-836d.onrender.com/countries/alpha/${neighbor}`
//     );
//     request2.send();
//     request2.addEventListener("load", function () {
//       data = JSON.parse(this.responseText); //destructoring
//       renderCountry(data, "neighbour");
//     });
//   });
// };
// getCountryAndNeighbour(country);
//if we chain more requests -> callback Hell ; bad practice; source of bugs

//new ES6 feature to escape call back Hell -> promises
// const request2 = fetch(
//   `https://countries-api-836d.onrender.com/countries/name/${country}`
// ); //returns a Promise
// console.log(request2);

// //

//using fetch API
// const getCountryData = function (country) {
//   fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
//     .then(function (response) {
//       return response.json(); // these is a new promise -> use chaning
//     })
//     .then((data) => console.log(data[0]));
// };
// getCountryData(country);

// const getCountryAndNeighbour = function (country) {
//   fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
//     .then((response) => response.json())
//     .then((data) => {
//       renderCountry(data[0]);
//       const neighbor = data[0].borders?.[0];
//       if (!neighbor) return;
//       return fetch(
//         `https://countries-api-836d.onrender.com/countries/alpha/${neighbor}`
//       );
//     })
//     .then((response) => response.json())
//     .then((data) => renderCountry(data, "neighbour"));
// };
// getCountryAndNeighbour("Tunisia");

// const getCountryAndNeighbour = function (country) {
//   fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
//     .then((response) => {
//       if (!response.ok) throw new Error(`Country not found ${response.status}`);
//       return response.json();
//     })
//     .then((data) => {
//       renderCountry(data[0]);
//       const neighbor = data[0].borders?.[0];
//       if (!neighbor) return;
//       return fetch(
//         `https://countries-api-836d.onrender.com/countries/alpha/${neighbor}`
//       );
//     })
//     .then((response) => {
//       if (!response.ok)
//         throw new Error(`Neighbour country not found ${response.status}`);
//       response.json();
//     })
//     .then((data) => renderCountry(data, "neighbor"))
//     .catch((err) => {
//       renderError(err.message);

//       console.log(err);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

const getJSON = function (url, errorMsg = "Something went wrong") {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};
const getCountryAndNeighbour = function (country) {
  getJSON(`https://countries-api-836d.onrender.com/countries/name/${country}`)
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
      return getJSON(
        `https://countries-api-836d.onrender.com/countries/name/${countryName}`
      );
    })

    .then((data) => renderCountry(data[0]))
    .catch((err) => {
      renderError(err.message);

      console.log(err);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

//Promisifying geolocation API
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
    .then((data) => renderCountry(data[0]))
    .catch((err) => {
      renderError(err.message);

      console.log(err);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener("click", function () {
  whereAmI2();
});

// console.log("Test start");
// setTimeout(() => {
//   console.log("0 sec timer");
// }, 0); //not garanteed to be 0 sec : depends on the callstack and microtask queue
// Promise.resolve("Resolved promise 1").then((res) => {
//   for (let i = 0; i < 10000000000; i++) {} //blocking code
//   console.log(res);
// }); // creates a successful promise
// console.log("Test end");

// const lotteryPromise = new Promise(function (resolve, reject) {
//   //simulating async behavior
//   console.log("Lotter draw is happening");
//   setTimeout(() => {
//     if (Math.random() >= 0.5) resolve("You Win");
//     else reject(new Error("You Lost!"));
//   }, 2000);
// });
// lotteryPromise
//   .then((res) => console.log(res))
//   .catch((err) => console.error(err));

//Promisify setTimeout

const wait = function (seconds) {
  return new Promise(function (resolve) {
    // we don't need the reject here
    setTimeout(resolve, seconds * 1000); // no results is needed
  });
};
// wait(5).then(() => console.log("finished waiting for 5 seconds"));

// Promise.resolve("fulfilled Promise ").then((value) => console.log(value));
// Promise.reject(new Error("Rejected promise")).catch((err) => console.log(err));

// const getLocation = function () {
//   return new Promise(function (resolve, reject) {
//     //executor function
//     if (!navigator.geolocation)
//       reject(new Error("Geolocation is not supported by your browser"));
//     else {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const coords = {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           };
//           resolve(coords);
//         },
//         () => reject(new Error("Unable to retrieve your location"))
//       );
//     }
//   });
// };

// getLocation()
//   .then((coords) => console.log(coords))
//   .catch((err) => console.log(err));

// //building the promise
// const getLocationPromise = function () {
//   return new Promise(function (resolve, reject) {
//     //executor function
//     if (!navigator.geolocation)
//       reject(new Error("Geolocation is not supported by your browser"));
//     else {
//       navigator.geolocation.getCurrentPosition((position) => {
//         const coords = {
//           lat: position.coords.latitude,
//           lng: position.coords.longitude,
//         };
//         resolve(coords);
//       }, reject); //error will be passed as arg by navigator.geolocation.getCurrentPosition
//     }
//   });
// };

// //Consuming the promise
// const getLocation = function () {
//   getLocationPromise()
//     .then((coords) => console.log(coords))
//     .catch((err) => err);
// };
// console.log(getLocation());

///////////////////////////////////////
// Coding Challenge #2

//promisifying img loading
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
//     currentImage.style.display = "none";
//     return createImage("img/img-2.jpg");
//   })
//   .then((img) => {
//     currentImage = img;
//     return wait(2);
//   })
//   .then(() => (currentImage.style.display = "none"))
//   .catch((err) => console.log(err));

//Consuming Promises With Async/Await
const whereAmI3 = async function (country) {
  //will run in the background and returns a promise

  const promuseResult = await fetch(
    `https://countries-api-836d.onrender.com/countries/name/${country}`
  ); // waits until the results of the promise is fulfilled
  //doesnt block the main thread of execution (function is executed in the background)
  // console.log(promuseResult);

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
// whereAmI4();

//No error handling yet

//Error Handling With try...catch ; can be used with regular errors not only async/await

// try {
//   const x = 1;
//   x = 2;
// } catch (err) {
//   console.log(err.message);
// }

const whereAmI5 = async function () {
  console.log(1);
  try {
    const { lat, lng } = await getLocationPromise();
    console.log(4);
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
// whereAmI5();
// console.log(2);
// console.log(3);

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
// (function () {})();

// (async function () {
//   try {
//     const city = await whereAmI6();
//     console.log(city);
//   } catch (err) {
//     console.log(err);
//   }
// })();

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
      // Promise Combinator
      getJSON(`https://countries-api-836d.onrender.com/countries/name/${c1}`),
      getJSON(`https://countries-api-836d.onrender.com/countries/name/${c2}`),
      getJSON(`https://countries-api-836d.onrender.com/countries/name/${c3}`),
    ]);
    console.log(data.map((countryData) => countryData[0].capital));
  } catch (err) {
    console.log(err);
  }
};
// get3countries("Tunisia", "Algeria", "Palestine");
//if 1 promise rejects the whole promise rejects

//Promise.race() // similar to all but returns the first settled promise

// (async function (c1, c2, c3) {
//   {
//     try {
//       const data = await Promise.race([
//         getJSON(`https://countries-api-836d.onrender.com/countries/name/${c1}`),
//         getJSON(`https://countries-api-836d.onrender.com/countries/name/${c2}`),
//         getJSON(`https://countries-api-836d.onrender.com/countries/name/${c3}`),
//       ]);
//       console.log(data[0].capital);
//     } catch (err) {
//       console.log(err);
//     }
//   }
// })("Tunisia", "Algeria", "Palestine");

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

// loadNPause();

const loadAll = async function (imgArr) {
  //bad way:
  //imgArr.map(async (imgPath) => await createImage(imgPath)) //not gonna work
  //will return 3 promises not  the results (how return works with async function)
  //also map will call our callback without await
  const images = await Promise.all(
    imgArr.map((imgPath) => createImage(imgPath))
  );
  images.forEach((img) => img.classList.add("parallel"));
};

loadAll(["img/img-1.jpg", "img/img-2.jpg", "img/img-3.jpg"]);
