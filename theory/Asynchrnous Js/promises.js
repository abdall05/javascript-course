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
