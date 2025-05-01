'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Ali Abdallah',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2025-03-27T17:01:17.194Z',
    '2025-04-28T23:36:17.929Z',
    '2025-04-30T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Mohamed Abdallah',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayDate = function (locale) {
  const now = new Date();
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    // weekday: 'long',
  };

  labelDate.textContent = Intl.DateTimeFormat(locale, options).format(now);
};
const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const movementDate = new Date(date);
  const daysPassed = calcDaysPassed(new Date(), movementDate);
  if (daysPassed === 0) return 'Today';
  else if (daysPassed === 1) return 'Yesterday';
  else if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    return new Intl.DateTimeFormat(locale).format(movementDate);
  }
};

const cleanInputFields = function () {
  inputLoginUsername.value =
    inputLoginPin.value =
    inputTransferTo.value =
    inputTransferAmount.value =
    inputLoanAmount.value =
    inputCloseUsername.value =
    inputClosePin.value =
      '';
};

const formatCurrency = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMouvements = function (account, sort = false) {
  containerMovements.innerHTML = '';

  //array of object{mov, date}
  const combinedMovsDates = account.movements.map((mov, index) => ({
    movement: mov,
    date: account.movementsDates.at(index),
  }));
  if (sort) {
    combinedMovsDates.sort((a, b) => a.movement - b.movement);
  }
  combinedMovsDates.forEach(function (movDate, index) {
    const { movement, date } = movDate;
    const formattedMov = new Intl.NumberFormat(account.locale, {
      style: 'currency',
      currency: account.currency,
    }).format(movement);
    const type = movement > 0 ? 'deposit' : 'withdrawal';
    const displayDate = formatMovementDate(date, account.locale);
    const mouvementHtmlElement = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      index + 1
    } ${type}</div>
      <div class="movements__date">${displayDate}</div>
      <div class="movements__value">${formattedMov}</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', mouvementHtmlElement);
  });
};

const createUsernames = function (accounts) {
  accounts.forEach(function (account) {
    account.username = account.owner // new property
      .split(' ')
      .map(word => word[0].toLowerCase())
      .join('');
  });
};
createUsernames(accounts);

const calcDisplayBalance = function (account) {
  const balance = account.movements.reduce((acc, mov) => acc + mov, 0);
  account.balance = balance;
  labelBalance.innerText = formatCurrency(
    balance,
    account.locale,
    account.currency
  );
};
const calcInterest = function (account) {
  const interest = account.interestRate;
  return account.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * interest) / 100)
    .reduce((acc, int) => acc + int, 0);
};
const calcDisplaySummary = function (account) {
  const incomes = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.innerText = formatCurrency(
    incomes,
    account.locale,
    account.currency
  );
  const outcomes = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.innerText = formatCurrency(
    outcomes,
    account.locale,
    account.currency
  );

  const interest = calcInterest(account);
  labelSumInterest.innerText = formatCurrency(
    interest,
    account.locale,
    account.currency
  );
};
const displayTimer = function (timeInSeconds) {
  const min = String(Math.trunc(timeInSeconds / 60)).padStart(2, 0);
  const sec = String(timeInSeconds % 60).padStart(2, 0);
  labelTimer.textContent = `${min}:${sec}`;
};
const startLogoutTime = function () {
  let time = 10 * 60; // 10 mintues
  displayTimer(time);
  const myTimer = setInterval(function () {
    time--;
    displayTimer(time);

    if (time === 0) {
      clearInterval(myTimer);
      updateLogoutUI();
    }
  }, 1000);
  return myTimer;
};
const restartTimer = function () {
  if (timer) clearInterval(timer);
  timer = startLogoutTime();
};
const updateLoggedinUI = function (account) {
  displayDate(account.locale);
  labelWelcome.textContent = `Welcome back, ${
    currentAccount.owner.split(' ')[0]
  }`;
  containerApp.style.opacity = '1';
  displayMouvements(account);
  calcDisplayBalance(account);
  calcDisplaySummary(account);
  cleanInputFields();
  restartTimer();
};
const updateLogoutUI = function () {
  labelWelcome.textContent = 'Log in to get started';
  containerApp.style.opacity = '0';
  cleanInputFields();
};

//eventHandler

//login
let currentAccount, timer;
//default behavior when submitting a form =>page reloads or navigate to response
//need to turn that off for our App
btnLogin.addEventListener('click', function (e) {
  //prevent form from submitting3
  e.preventDefault();
  const user = inputLoginUsername.value;
  const pin = inputLoginPin.value;
  if (!(user && pin)) return;
  currentAccount = accounts.find(account => account.username === user);
  if (!currentAccount || String(currentAccount.pin) !== pin) {
    console.log('login failed!');
    return;
  }
  updateLoggedinUI(currentAccount);
});

//transfer money
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const currentBalance = currentAccount.balance;
  const receiver = inputTransferTo.value;
  const transferAmount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(
    account => account.username === receiver
  );
  if (receiverAccount.username === currentAccount.username) {
    console.log('Transfering to your own account is not allowed!');
    return;
  }
  if (transferAmount > 0) {
    if (transferAmount > currentBalance) {
      console.log('Insufficient balance!');
      return;
    }
    if (!receiverAccount) {
      console.log('user not found');
      return;
    }
    const now = new Date().toISOString();
    currentAccount.movements.push(-transferAmount);
    currentAccount.movementsDates.push(now);
    receiverAccount.movements.push(transferAmount);
    receiverAccount.movementsDates.push(now);

    updateLoggedinUI(currentAccount);
    console.log(
      `Transferred ${transferAmount}€ to ${receiverAccount.username}`
    );
  }
});

//close
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  const username = inputCloseUsername.value;
  const pin = inputClosePin.value;
  if (
    username === currentAccount.username &&
    pin === String(currentAccount.pin)
  ) {
    updateLogoutUI();
  }
  inputCloseUsername.value = inputClosePin.value = '';
});
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const loanAmount = Number(inputLoanAmount.value);
  setTimeout(function () {
    if (
      loanAmount > 0 &&
      currentAccount.movements.some(mov => loanAmount * 0.1 <= mov)
    ) {
      currentAccount.movements.push(loanAmount);
      currentAccount.movementsDates.push(new Date().toISOString());
      updateLoggedinUI(currentAccount);
    } else {
      console.log('Loan failed!');
    }
  }, 5_000);
});

let sortState = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  sortState = !sortState;
  const sortBtnText = sortState ? '&uparrow; UNSORT' : '&downarrow; SORT';
  displayMouvements(currentAccount, sortState);
  btnSort.innerHTML = sortBtnText;
});
