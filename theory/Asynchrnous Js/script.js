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
      getJSON(
        `https://countries-api-836d.onrender.com/countries/name/${countryName}`
      )
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
    });
};

btn.addEventListener("click", function () {
  whereAmI(-33.933, 18.474);
});
