//synchronous code : executed line by line
//long-running operations block code execution
//Asynchronous code is executed after a task that runs in the background finishes (example: timer with callback...)
//async code is non-blocking
//callback functions alone do NOT make code asynchronous

const img = document.querySelector(".dog");
img.src = "dog.jpg"; //async : loading img
img.addEventListener("load", function () {
  img.classList.add("fadeIn");
});
//addEventListener does NOT automatically make code asynchronous : button waiting for click event is not Async; waiting for img loading async

//AJAX
//Asynchronous Javascript And XML: allows to communicate with remote web servers in an asynchronous  way.
//with AJAX calls, we can request data from web servers dynamically
//Http request response (GET/POST...) from web API

//API : Application Programming Interface: Piece of Software that can be used by another piece of software,in order to allow applications to talk to each other

//There are many types of APIs in web development
//DOM API , Geolocation API , Own Class API (Public Interface)
//Web Api /"online" API:Application running on a server, that receives requests for data, and sends data back as response.
//We can build our own web APIs (requires back-end eg:node.js) or use 3rd-party APIs.
//data format : XML; no api uses XML anymone ; AJAX old name,still used today : JSON data format :JS Object converted to string

// public APIs : https://github.com/public-apis/public-apis
//first AJAX Call
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

//How the Web Works
//to access a resouce on the internet : URL : Protocol + Domain name + resource
//establish TCP/IP socket connection
//HTTP REQUEST
//HTTP RESPONSE

//------

//Callback Hell
//sequence of AJAX calls
const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

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
  const request = new XMLHttpRequest();
  request.open(
    "GET",
    `https://countries-api-836d.onrender.com/countries/name/${country}`
  );
  request.send();
  let data;
  request.addEventListener("load", function () {
    [data] = JSON.parse(this.responseText); //destructoring
    renderCountry(data);

    //Get Neighbour country
    const neighbor = data.borders?.[0];
    if (!neighbor) return;
    const request2 = new XMLHttpRequest();
    request2.open(
      "GET",
      `https://countries-api-836d.onrender.com/countries/alpha/${neighbor}`
    );
    request2.send();
    request2.addEventListener("load", function () {
      data = JSON.parse(this.responseText); //destructoring
      renderCountry(data, "neighbour");
    });
  });
};

getCountryAndNeighbour("Tunisia");
//if we chain more requests -> callback Hell ; bad practice; source of bugs

//new ES6 feature to escape call back Hell -> promises
const getCountryData = function (country) {
  fetch(
    `https://countries-api-836d.onrender.com/countries/name/${country}`
  ).then(function (response) {
    console.log(response);
  });
};
