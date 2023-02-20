"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("input");
  const number = document.querySelectorAll(".numbers div");
  const operator = document.querySelectorAll(".operators div");
  const result = document.getElementById("result");
  const clear = document.getElementById("clear");
  let resultDisplayed = false;

  // adding click handlers to number buttons
  for (let i = 0; i < number.length; i++) {
    number[i].addEventListener("click", function (e) {
      const currentString = input.innerHTML;
      const lastChar = currentString[currentString.length - 1];
      if (resultDisplayed === false) {
        input.innerHTML += e.target.innerHTML;
      } else if (
        resultDisplayed === true &&
        (lastChar === "+" ||
          lastChar === "-" ||
          lastChar === "×" ||
          lastChar === "÷")
      ) {
        resultDisplayed = false;
        input.innerHTML += e.target.innerHTML;
      } else {
        resultDisplayed = false;
        input.innerHTML = e.target.innerHTML;
      }
    });
  }

  // adding click handlers to operator buttons
  for (let i = 0; i < operator.length; i++) {
    operator[i].addEventListener("click", function (e) {
      const currentString = input.innerHTML;
      const lastChar = currentString[currentString.length - 1];
      if (currentString.length === 0) {
        console.log("Enter a number first");
      } else if (
        lastChar === "+" ||
        lastChar === "-" ||
        lastChar === "×" ||
        lastChar === "÷"
      ) {
        input.innerHTML =
          currentString.substring(0, currentString.length - 1) +
          e.target.innerHTML;
      } else {
        input.innerHTML += e.target.innerHTML;
      }
    });
  }

  // on click of 'equal' button
  result.addEventListener("click", function () {
    const inputString = input.innerHTML;
    const numbers = inputString.split(/[\+\-\×\÷]/g).map(Number);
    const operators = inputString.replace(/[0-9]|./g, "").split("");
    let result = numbers[0];

    for (let i = 0; i < operators.length; i++) {
      const currentOperator = operators[i];
      const nextNumber = numbers[i + 1];
      if (currentOperator === "+") {
        result += nextNumber;
      } else if (currentOperator === "-") {
        result -= nextNumber;
      } else if (currentOperator === "×") {
        result *= nextNumber;
      } else if (currentOperator === "÷") {
        result /= nextNumber;
      }
    }

    input.innerHTML = result;
    resultDisplayed = true;
  });

  // on click of 'clear' button
  clear.addEventListener("click", function () {
    input.innerHTML = "";
  });
});
