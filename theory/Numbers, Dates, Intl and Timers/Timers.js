//execute a function after a time
setTimeout(() => console.log("I will be executed after 10 Seconds"), 10_000);
//pass arguments to the function

const args = [1, 2, 3, 4, 5];
const timer = setTimeout(
  () => console.log("I will be executed after 10 Seconds"),
  10_000,
  ...args
);

//to cancel timer
if (args.includes(5)) clearTimeout(timer);

//execute a function every amount of time
//setInterval
setInterval(function () {
  const now = new Date();

  console.log(
    new Intl.DateTimeFormat(navigator.language, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(now)
  );
}, 1_000);

//Implementing a countdown timer
