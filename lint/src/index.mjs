// import { config } from "dotenv";

// config();

// console.log(process.env.DECLARED_VARIABLE);
// // console.log(process.env.UNDECLARED_VARIABLE);

const increment = (someArgument1) => {
  // eslint-disable-next-line operator-assignment, no-param-reassign
  someArgument1 = someArgument1 + 1;
  return someArgument1;
};

function increment1(someArgument) {
  // eslint-disable-next-line operator-assignment, no-param-reassign
  someArgument = someArgument + 1;

  return someArgument;
}

// // Call the function with an argument
const myNumber = 5;
const incrementedNumber = increment(myNumber);
console.log(incrementedNumber); // Output will be 6

const incrementedNumber1 = increment1(myNumber);
console.log(incrementedNumber1); // Output will be 6
