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

const addition = document.querySelector('.add');
const subtraction = document.querySelector('.subtract');
const multiplication = document.querySelector('.multiply');
const division = document.querySelector('.divide');
const equals = document.querySelector('.equals');
const numbers= document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');

let displayedNum = document.querySelector('.display');
let calc = {};
let calculated;
let operated;

function displayNumbers() {
    if (!operated) {
        numbers.forEach(number => number.addEventListener('click', function() {
            calc.display = +(displayedNum.textContent += number.textContent)
        }));
    }
}

function setSecondNum() {
    if (operated) {
        displayedNum.textContent = displayNumbers();
        calc.num2 = calc.display;
    }
}

function determineOperator() {
    operators.forEach(operator => operator.addEventListener('click', function() {
        operated = true;
        
        calc.num1 = calc.display;
        if (operator === addition) {
            calc.operator = add;
            setSecondNum();
        }
        if (operator === subtraction) {
            calc.operator = subtract;
            setSecondNum();
        }
        if (operator === multiplication) {
            calc.operator = multiply;
            setSecondNum();
        }
        if (operator === division) {
            calc.operator = divide;
            setSecondNum();
        }
    }));
    
}

function displayResult() {
    equals.addEventListener('click', function() {
        displayedNum.textContent = operate(calc.operator, calc.num2, calc.num1);
        calculated = true;
        operated = false;
    });
}

displayNumbers();
determineOperator();
setSecondNum();
displayResult();