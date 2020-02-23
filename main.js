function add (array) {
	const sum = array.reduce((a, b) => a + b, 0);
	return sum;
}

function subtract (array) {
	const difference = array.reduce((a, b) => a - b);
	return difference;
}

function multiply (array) {
	const product = array.reduce((a, b) => a * b);
	return product;
}

function divide (array) {
    const quotient = array.reduce((a, b) => a / b);
    return quotient === Infinity ? 'error: divide by zero' : quotient;
}


function operate (operator, num1, num2) {
    switch (operator) {
        case add :
            return add([num1, num2]);
        case subtract :
            return subtract([num1, num2]);
        case multiply :
            return multiply([num1, num2]);
        case divide :
            return divide([num1, num2]);
    }
}

let result = document.querySelector('.display');
const numbers= document.querySelectorAll('.number');
let userInput1;

numbers.forEach(number => number.addEventListener('click', function() {
    userInput1 = Number(result.textContent += number.textContent);
    return userInput1;
}));

let storedOperator;
const addition = document.querySelector('.add');
addition.addEventListener('click', function() {
    storedOperator = '';
    return storedOperator
})

const subtraction = document.querySelector('.subtract');
const multiplication = document.querySelector('.multiply');
const division = document.querySelector('.divide');
const equals = document.querySelector('.equals');



const operators = document.querySelectorAll('.operator');;
const operation = operators.forEach(operator => operator.addEventListener('click', function() {
    
}));