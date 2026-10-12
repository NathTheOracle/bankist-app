"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Nathaniel Idehai",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");
const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const displayMovements = function (movements) {
  containerMovements.innerHTML = "";
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const html = `
     <div class="movements">
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
          <div class="movements__date">3 days ago</div>
          <div class="movements__value">${mov}€</div>
        </div>
      </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};
// displayMovements(account1.movements);

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, val) => acc + val, 0);
  labelBalance.textContent = acc.balance;
};

const calcDisplaySummary = function (acc) {
  const income = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, val) => acc + val, 0);
  labelSumIn.textContent = income;

  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, val) => acc + val, 0);
  labelSumOut.textContent = out;

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * 1.2) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, val) => acc + val, 0);
  labelSumInterest.textContent = interest;
};

createUsernames(accounts);

//Event handler
let currentAccount;

btnLogin.addEventListener("click", function (e) {
  //prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value,
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Display ui and message
    labelWelcome.textContent = `welcome back, ${currentAccount.owner.split("")[0]}`;
    containerApp.style.opacity = 100;

    //Display movements
    displayMovements(currentAccount.movements);

    //Display balance
    calcDisplayBalance(currentAccount);

    //Display summary
    calcDisplaySummary(currentAccount);
  }
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    currentAccount.movements.push(amount);

    updateUI(currentAccount);
  }
  inputLoanAmount.value = "";
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.createUsernames &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username,
    );
    // console.log(index);

    //indexof(23)

    // account1.splice(index, 1);
  }
});

// const numbers = [1, 2, 3, 4, 5];
// const total = numbers.reduce((acc, val) => {
//   return acc + val;
// }, 0);
// console.log(total);

// const cart = [
//   {
//     item: "food",
//     price: 12000,
//   },
//   {
//     item: "car",
//     price: 1200,
//   },
//   {
//     item: "shoe",
//     price: 400,
//   },
//   {
//     item: "shirt",
//     price: 100,
//   },
// ];

// const totalCost = cart.reduce((acc, val) => {
//   return acc + val.price;
// }, 0);

// console.log(totalCost);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ["USD", "United States dollar"],
//   ["EUR", "Euro"],
//   ["GBP", "Pound sterling"],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const fruit = ["Apple", "Banana", "Orange"];
// fruit.forEach((fruit) => console.log(fruit));

// const gadget = ["laptop", "phone", " mouse"];
// gadget.forEach((gadget, index) => {
//   console.log(`gadget ${index + 1}: ${gadget}`);
// });

// // for (let i = 0; i <= fruit.length; i++) {
// //   if (fruit[i] === "banana") break;
// //   console.log(fruit[i]);
// // }

// gadget.forEach(function (cur, index, arr) {
//   console.log(cur, index, arr);
// });

// const nath = new Map();
// nath.set("name", "Nath");
// nath.set("occupation", "programmer");
// console.log(nath);
// nath.forEach((value, key) => {
//   console.log(`${key} : ${value}`);
// });

// const ola = new Set(["food", "drink", "snacks"]);
// ola.forEach((value, key) => {
//   console.log(key, value);
// });

// const school = {
//   university: "unilag",
//   secondary: "brainfield",
//   primary: "fitjoy",
// };
// // console.log(Object.entries(school));

// Object.entries(school).forEach(([value, key]) => {
//   console.log(`${key} : ${value}`);
// });

// const num = [1, 2, 3, 4, 5];
// const double = num.map((fig) => fig * 2);
// console.log(double);
// console.log(num);

// const car = [
//   {
//     make: "Toyota",
//     model: "Camry",
//   },

//   {
//     make: "lexus",
//     model: "Rx359",
//   },
// ];

// const make = car.map((car) => car.make);
// console.log(make);

// const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// const even = numbers.filter((num) => num % 2 === 0);
// console.log(numbers);
// console.log(even);

// const people = [
//   {
//     name: "Nath",
//     age: 16,
//   },
//   {
//     name: "Bolu",
//     age: 12,
//   },
//   {
//     name: "Kelvin",
//     age: 18,
//   },
//   {
//     name: "Jeffery",
//     age: 20,
//   },
// ];

// const adults = people.filter((people) => people.age >= 18);
// console.log(adults);
// console.log(people);

// const random = [0, "", "boy", undefined, null, 6, "girl"];
// const clean = random.filter(Boolean);
// console.log(clean);
