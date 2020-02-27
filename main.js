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

let displayedNum = document.querySelector('.display');
displayedNum.textContent = 0;
let numDisplay;
let numDisplay2;
let calcData = {};
let calculated;
let operated;
let numberArray = [];
let numberArray2 = [];

const numbers= document.querySelectorAll('.number');
function displayNumbers() {

    if (!operated) {
        numbers.forEach(number => number.addEventListener('click', function() {
            numDisplay = +(displayedNum.textContent += number.textContent);
            displayedNum.textContent = numDisplay;
            numberArray.push(numDisplay);
            console.log('numberArray1: ' + numberArray)
            calcData.number1 = numberArray[numberArray.length - 2];
        }));
    
    } else if (operated) {
        
        numbers.forEach(number => number.addEventListener('click', function() {
            displayedNum.textContent = '';
            numDisplay2 = +(displayedNum.textContent += number.textContent);
            displayedNum.textContent = numDisplay2;
            numberArray2.push(numDisplay2);
            console.log('numberArray2: ' + numberArray2);
            calcData.number2 = numberArray2[numberArray2.length - 1];
            
        }));
    } 
}
displayNumbers();


const addition = document.querySelector('.add');
const subtraction = document.querySelector('.subtract');
const multiplication = document.querySelector('.multiply');
const division = document.querySelector('.divide');
const equals = document.querySelector('.equals');

function displayResult() {
    equals.addEventListener('click', function() {
        displayedNum.textContent = operate(calcData.operator, calcData.number1, calcData.number2);
        calculated = true;
        operated = false;
    });
}
displayResult();




const operators = document.querySelectorAll('.operator');;
const operation = operators.forEach(operator => operator.addEventListener('click', function() {
    operated = true;
    displayNumbers();
    if (operator === addition) {
        calcData.operator = add;
    }
    if (operator === subtraction) {
        calcData.operator = subtract;
    }
    if (operator === multiplication) {
        calcData.operator = multiply;
    }
    if (operator === division) {
        calcData.operator = divide;
    }
}));

// if (calcData.hasOwnProperty('operator')) {
//     console.log('hello');
// }