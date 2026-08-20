# Daily JS Learning Program

This repository automates daily JavaScript activity by appending topic comments to `daily-log.txt`, creating commits, and pushing to GitHub.

## Core Scripts setup ok
- `setup-fresh.js`: Fresh setup for a new repository (new history).
- `setup-dev.js`: Setup while keeping existing history.
- `daily-automation.js`: Main automation runner.
- `setup-schedule.js`: Configure Windows Task Scheduler for daily runs.
- `setup-git-alias.js`: Configure `git today` alias.
- `run-task-now.js`: Run automation immediately.
- `check-status.js`: Check scheduled task and log status.
- `activity-plan.js`: Generate a 30-day issue/PR/review plan and optional daily reminder schedule.

## Quick Start
```bash
git clone https://github.com/qasimmirza96/Daily_improvement_code_JS.git
cd Daily_improvement_code_JS
node setup-fresh.js
```

## Daily Usage
```bash
# default commit count
node daily-automation.js

# custom count
node daily-automation.js 10

# git alias (after setup)
git today
git today 10
```

## 30-Day Activity Planner
```bash
# generate full plan
node activity-plan.js

# generate today task file
node activity-plan.js --today

# windows: schedule daily planner reminder
node activity-plan.js --schedule --time 08:30
```

## Notes
- Automation appends entries only to `daily-log.txt`.
- It does not generate new `day*.js` files.
- Ensure Git credentials and remote are configured before first push.
{
  "name": "Mirza",
  "age": 20
}
// Group an array of objects by a key
function groupBy(arr, key) {
  return arr.reduce((acc, item) => {
    const group = item[key];
    acc[group] = acc[group] || [];
    acc[group].push(item);
    return acc;
  }, {});
}

// Example usage
const orders = [
  { id: 1, status: "pending" },
  { id: 2, status: "shipped" },
  { id: 3, status: "pending" },
];

console.log(groupBy(orders, "status"));
// { pending: [...], shipped: [...] }
Here are the JavaScript concepts that matter most — especially for interviews or leveling up:

Core Language

Closures – functions retaining access to their outer scope's variables even after the outer function returns. Classic interview topic.
this binding – how it changes with regular functions, arrow functions, call/apply/bind, and method invocation.
Hoisting – var vs let/const, function declarations vs expressions, and the "temporal dead zone."
Scope & the scope chain – global, function, block scope (let/const introduced block scope).
Prototypal inheritance – __proto__, prototype, Object.create(), and how class syntax is sugar over this.

Async JavaScript

Event loop, call stack, microtask/macrotask queue – why setTimeout(fn, 0) runs after a Promise.then().
Promises – states (pending/fulfilled/rejected), chaining, Promise.all/allSettled/race/any.
async/await – syntactic sugar over promises; error handling with try/catch.
Callbacks – and why we moved away from callback hell.

Functions & Data

Higher-order functions – functions that take/return functions (map, filter, reduce).
Pure functions & immutability – no side effects, don't mutate inputs.
Currying & partial application.
Destructuring & spread/rest operators.
Array/object methods – map, filter, reduce, find, some/every, Object.entries/keys/values.

Types & Comparisons

Type coercion – == vs ===, truthy/falsy values.
Primitive vs reference types – value copy vs reference copy (objects/arrays mutate by reference).
null vs undefined.

Modern JS (ES6+)

Modules – import/export.
Template literals, optional chaining (?.), nullish coalescing (??).
Generators & iterators (function*, yield) – less common but shows up in advanced roles.

Memory & Performance

Garbage collection basics – reference counting, mark-and-sweep.
Debounce vs throttle – common in UI-heavy work.
Memory leaks – detached DOM nodes, forgotten timers/listeners.

Given you work across Angular and Node-ish tooling, closures, this, the event loop, and promises/async-await are the ones worth being rock-solid on — they trip people up most in code reviews and interviews alike.
1. Print "Hello World"
console.log("Hello, World!");
2. Variables
let name = "Meerab";
const age = 22;
let isStudent = true;

console.log(name);
console.log(age);
console.log(isStudent);
3. If-Else Statement
let marks = 75;

if (marks >= 50) {
    console.log("Pass");
} else {
    console.log("Fail");
}
4. For Loop
for (let i = 1; i <= 5; i++) {
    console.log(i);
}

Output:

1
2
3
4
5
5. While Loop
let i = 1;

while (i <= 5) {
    console.log(i);
    i++;
}
6. Function
function add(a, b) {
    return a + b;
}

let result = add(10, 20);
console.log(result);

Output:

30
7. Arrow Function
const multiply = (a, b) => {
    return a * b;
};

console.log(multiply(5, 4));

Output:

20
8. Arrays
let fruits = ["Apple", "Banana", "Mango"];

console.log(fruits[0]);

fruits.push("Orange");

console.log(fruits);
9. Loop Through an Array
let numbers = [10, 20, 30, 40, 50];

numbers.forEach(function(number) {
    console.log(number);
});
10. Objects
let student = {
    name: "Meerab",
    age: 22,
    city: "Lahore"
};

console.log(student.name);
console.log(student.city);
11. User Input
let name = prompt("Enter your name:");

console.log("Welcome " + name);
12. Even or Odd
let number = 7;

if (number % 2 === 0) {
    console.log("Even");
} else {
    console.log("Odd");
}
13. Find the Largest Number
let a = 10;
let b = 25;
let c = 15;

let largest = a;

if (b > largest) {
    largest = b;
}

if (c > largest) {
    largest = c;
}

console.log("Largest number is:", largest);
14. Sum of Array
let numbers = [10, 20, 30, 40];
let sum = 0;

for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
}

console.log(sum);

Output:

100
15. Simple Calculator
function calculator(a, b, operator) {
    switch (operator) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "*":
            return a * b;
        case "/":
            return a / b;
        default:
            return "Invalid Operator";
    }
}

console.log(calculator(20, 10, "+"));
console.log(calculator(20, 10, "-"));
console.log(calculator(20, 10, "*"));
console.log(calculator(20, 10, "/"));
1. Variables

Variables store data.

let name = "Meerab";
let age = 22;
const country = "Pakistan";

console.log(name);
console.log(age);
console.log(country);
Difference
let city = "Lahore";
city = "Islamabad"; // Allowed

const pi = 3.14;
// pi = 3.15 ❌ Error
let → Value can change.
const → Value cannot change.
2. Data Types
let username = "Ali";      // String
let age = 20;              // Number
let isStudent = true;      // Boolean
let marks = null;          // Null
let address;               // Undefined
3. Operators
Arithmetic
let a = 10;
let b = 5;

console.log(a + b);
console.log(a - b);
console.log(a * b);
console.log(a / b);
console.log(a % b);
Comparison
console.log(10 > 5);     // true
console.log(10 < 5);     // false
console.log(10 == "10"); // true
console.log(10 === "10");// false

Use === because it checks both value and type.

4. If-Else
let age = 18;

if (age >= 18) {
    console.log("You can vote.");
} else {
    console.log("You cannot vote.");
}
5. Loops
For Loop
for (let i = 1; i <= 5; i++) {
    console.log(i);
}
Is Node.js installed?

Open the terminal in VS Code (`Ctrl + ``) and run:

node -v

If you see something like:

v22.18.0

then Node.js is installed.

If you get:

'node' is not recognized...

then install Node.js from its official website and restart VS Code.
console.log("Hello, World!");

let name = "Meerab";
let age = 22;

console.log(`My name is ${name}`);
console.log(`I am ${age} years old.`);
// Array utilities
const arrayUtils = {
  // Remove duplicates
  unique: (arr) => [...new Set(arr)],

  // Chunk array into smaller groups
  chunk: (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  },

  // Group by a key
  groupBy: (arr, key) =>
    arr.reduce((acc, item) => {
      const group = typeof key === 'function' ? key(item) : item[key];
      (acc[group] = acc[group] || []).push(item);
      return acc;
    }, {}),

  // Flatten nested arrays
  flatten: (arr) => arr.flat(Infinity),
};

// String utilities
const stringUtils = {
  // Capitalize first letter
  capitalize: (str) => str.charAt(0).toUpperCase() + str.slice(1),

  // Convert to slug (e.g. for URLs)
  slugify: (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-'),

  // Truncate with ellipsis
  truncate: (str, maxLength) =>
    str.length > maxLength ? str.slice(0, maxLength).trim() + '...' : str,

  // Reverse string
  reverse: (str) => str.split('').reverse().join(''),
};
let day = 2;

switch(day){
    case 1:
        console.log("Monday");
        break;

    case 2:
        console.log("Tuesday");
        break;

    default:
        console.log("Invalid");
}
