'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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

const displayMouvements = function (account, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort
    ? account.movements.slice().sort((a, b) => a - b)
    : account.movements;
  movs.forEach(function (mouvement, index) {
    const type = mouvement > 0 ? 'deposit' : 'withdrawal';
    const mouvementHtmlElement = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      index + 1
    } ${type}</div>
      <div class="movements__date"></div>
      <div class="movements__value">${mouvement}€</div>
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
  labelBalance.innerText = `${balance}€`;
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
  labelSumIn.innerText = `${incomes}€`;
  const outcomes = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumOut.innerText = `${Math.abs(outcomes)}€`;
  const interest = calcInterest(account);
  labelSumInterest.innerText = `${interest}€`;
};
const updateLoggedinUI = function (account) {
  labelWelcome.textContent = `Welcome back, ${
    currentAccount.owner.split(' ')[0]
  }`;
  containerApp.style.opacity = '1';
  displayMouvements(account);
  calcDisplayBalance(account);
  calcDisplaySummary(account);
  cleanInputFields();
};
const updateLogoutUI = function () {
  labelWelcome.textContent = 'Log in to get started';
  containerApp.style.opacity = '0';
  cleanInputFields();
};

//eventHandler

//login
let currentAccount;
//default behavior when submitting a form =>page reloads or navigate to response
//need to turn that off for our App
btnLogin.addEventListener('click', function (e) {
  //prevent form from submitting3
  e.preventDefault();
  const user = inputLoginUsername.value;
  const pin = inputLoginPin.value;
  currentAccount = accounts.find(account => account.username === user);
  if (!currentAccount || String(currentAccount.pin) !== pin) {
    updateLoggedinUI(currentAccount);
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
    currentAccount.movements.push(-transferAmount);
    receiverAccount.movements.push(transferAmount);
    updateUI(currentAccount);
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
  if (
    loanAmount > 0 &&
    currentAccount.movements.some(mov => loanAmount * 0.1 <= mov)
  ) {
    currentAccount.movements.push(loanAmount);
    updateLoggedinUI(currentAccount);
  } else {
    console.log('Loan failed!');
  }
});

let sortState = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  sortState = !sortState;
  const sortBtnText = sortState ? '&uparrow; UNSORT' : '&downarrow; SORT';
  displayMouvements(currentAccount, sortState);
  btnSort.innerHTML = sortBtnText;
});
