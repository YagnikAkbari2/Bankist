'use strict';
// BANKIST APP

const account1 = {
  owner: 'Yagnik Akbari',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 0.6,
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2023-03-04T17:01:17.194Z',
    '2023-03-08T23:36:17.929Z',
    '2023-03-09T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT',
};

const account2 = {
  owner: 'Jacqueline Fernandez',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.75,
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
const account3 = {
  owner: 'Disha Patani',
  movements: [550, 340, -15, 970, 320, -1000, 10500, -3000, -150],
  interestRate: 0.5,
  pin: 3333,

  movementsDates: [
    '1993-07-06T22:43:18.205Z',
    '1998-09-02T01:17:53.149Z',
    '1999-06-18T07:03:47.153Z',
    '2000-06-09T20:00:55.598Z',
    '2002-01-20T12:53:06.533Z',
    '2003-01-30T23:36:49.383Z',
    '2014-07-05T09:41:20.336Z',
    '2016-07-30T01:20:11.022Z',
    '2028-08-31T17:56:29.068Z',
  ],
  currency: 'EUR',
  locale: 'en-UK',
};
const account4 = {
  owner: 'ShahRukh Khan',
  movements: [1500, 350, -300, 16700, -5500, -650, 7500, 750],
  interestRate: 3.0,
  pin: 4444,

  movementsDates: [
    '1991-12-09T07:02:09.117Z',
    '1992-02-12T06:12:50.392Z',
    '2007-02-13T03:13:55.573Z',
    '2007-11-05T06:02:24.154Z',
    '2021-11-05T05:10:32.709Z',
    '2022-10-01T21:53:11.250Z',
    '2032-05-14T17:17:36.359Z',
    '2036-12-17T21:05:11.835Z',
  ],
  currency: 'GBP',
  locale: 'de-DE',
};
const account5 = {
  owner: 'Ramesh Patel',
  movements: [
    6500, 5500, 450, 10800, 25000, 75000, 150000, 50000, 65000, 250000, 45000,
  ],
  interestRate: 0.75,
  pin: 5555,

  movementsDates: [
    '1989-07-05T21:00:27.073Z',
    '1991-01-08T17:01:03.490Z',
    '1995-02-16T04:08:56.919Z',
    '2000-03-25T02:24:42.704Z',
    '2001-01-15T01:54:27.952Z',
    '2009-06-28T19:47:23.909Z',
    '2010-04-08T05:34:26.071Z',
    '2011-12-06T11:36:18.363Z',
    '2016-07-29T11:19:19.764Z',
    '2018-05-07T00:53:58.518Z',
    '2035-05-25T10:52:57.958Z',
  ],
  currency: 'INR',
  locale: 'gu-IN',
};

const accounts = [account1, account2, account3, account4, account5];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

const startLogoutTime = function () {
  let time = 600;
  const tick = function () {
    let minute = String(Math.trunc(time / 60)).padStart(2, 0);
    let second = String(time % 60).padStart(2, 0);
    labelTimer.textContent = `${minute}:${second}`;
    if (time === 0) {
      clearInterval(timer);
      containerApp.style.opacity = 0;
      labelWelcome.textContent = `Log in to get started`;
    }
    time--;
  };
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

const formateMovementDates = function (date, locale) {
  const countDays = (day1, day2) =>
    Math.abs(day2 - day1) / (24 * 60 * 60 * 1000);

  const days = Math.round(countDays(date, Date.now()));
  if (days === 0) return 'Today';
  else if (days === 1) return 'Yesterday';
  else if (days < 8) return `${days} day ago`;
  return new Intl.DateTimeFormat(locale).format(date);
};

const formattedAmounts = function (acc, value) {
  return new Intl.NumberFormat(acc.locale, {
    style: 'currency',
    currency: acc.currency,
  }).format(Math.abs(value));
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort
    ? acc.movements?.slice().sort((a, b) => a - b)
    : acc.movements;
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formateMovementDates(date, acc.locale);
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedAmounts(acc, mov)}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${formattedAmounts(acc, acc.balance)}`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${formattedAmounts(acc, incomes)}`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${formattedAmounts(acc, out)}`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${formattedAmounts(acc, interest)}`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// global variables
let currentAccount, timer;

// Event handlers
btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // create dates
    const now = new Date();
    const options = {
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      month: 'numeric',
      year: 'numeric',
    };
    const locale = currentAccount.locale;
    labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(
      now
    );

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Start timeout
    if (timer) clearInterval(timer);
    timer = startLogoutTime();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Adding a date to movements
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());
    // Reset Timer
    clearInterval(timer);
    timer = startLogoutTime();

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    setTimeout(function () {
      currentAccount.movements.push(amount);

      // Adding a date to movements
      currentAccount.movementsDates.push(new Date().toISOString());

      // Reset Timer
      clearInterval(timer);
      timer = startLogoutTime();

      // Update UI
      updateUI(currentAccount);
    }, 3000);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

// Trash just to generate random date for movements
// const randomInt = () =>
//   Math.trunc(Math.random() * 1539872000000) + 586240000000;

// const dates = mov => {
//   const sortedTimeStamp = Array.from({ length: mov }, randomInt).sort(
//     (a, b) => a - b
//   );
//   return sortedTimeStamp.map(date => new Date(date).toISOString());
// };
// labelWelcome.addEventListener('click', function () {
//   console.log(dates(11));
// });
