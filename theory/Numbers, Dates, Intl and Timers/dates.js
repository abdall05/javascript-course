//create date

//1
const now = new Date();

//2:  time string as parameter : parsed to date
new Date("December 24,2015");

//3: year ,month day .....
new Date(1999, 8, 24);

//or even pass ms
new Date(24 * 60 * 60 * 1000);

const future = new Date(2025, 9, 24);
const year = future.getFullYear();
const month = future.getMonth();
const day = future.getDate();
future.toISOString(); // standard format
future.getTime(); //ms since midnight, January 1, 1970 UTC.
//timestamp
//current timestamp
Date.now();
//setter
future.setFullYear(2040); //corrects date if wrong

//Operations with dates

const calcDaysPassed = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

const days = calcDaysPassed(new Date(), new Date(1999, 8, 24));
const years = days / 365;

//for precise calculations : moment.js library

//Js new Internationaliztion API : format numbers ; strings according to different languages
const formatMovementDate = function (date) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const movementDate = new Date(date);
  const daysPassed = calcDaysPassed(new Date(), movementDate);
  if (daysPassed === 0) return "Today";
  else if (daysPassed === 1) return "Yesterday";
  else if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    const day = `${movementDate.getDate()}`.padStart(2, 0);
    const month = `${movementDate.getMonth() + 1}`.padStart(2, 0);
    const year = movementDate.getFullYear();
    const displayDate = `${day}/${month}/${year}`;
    return displayDate;
  }
};
//instead of doing it manually
const formatterEnUS = new Intl.DateTimeFormat("en-US"); // creaetes a formatter for this country. (local)
formatterEnUS.format(now);
new Intl.DateTimeFormat("ar-SY").format(now);

// add options object
const options = {
  hour: "numeric",
  minute: "numeric",
  day: "numeric",
  month: "long",
  year: "numeric",
  weekday: "long",
};
new Intl.DateTimeFormat("ar-SY", options).format(now);

// get local from browser
const locale = navigator.language;
console.log(locale);
new Intl.DateTimeFormat(locale, options).format(now);

//Internationalizing numbers (Intl)
const price = 33000.99;
new Intl.NumberFormat(locale).format(price); //'33 000,99'
// define options

const numberOptions = {
  style: "unit",
  unit: "mile-per-hour",
  currency: "EUR", // not defined in locale
};
new Intl.NumberFormat(navigator.language).format(price); //'33 000,99'
