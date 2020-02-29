function add (a, b) {return a + b;}
function subtract (a, b) {return a - b;}
function multiply (a, b) {return a * b;}
function divide (a, b) {return a / b === Infinity || a / b === -Infinity ? 'err: divide by zero' : a / b;}

function operate (operator, num1, num2) {
    switch (operator) {
        case add :
            return add(num1, num2);
        case subtract :
            return subtract(num1, num2);
        case multiply :
            return multiply(num1, num2);
        case divide :
            return divide(num1, num2);
    }
}

const addition = document.querySelector('.add');
const subtraction = document.querySelector('.subtract');
const multiplication = document.querySelector('.multiply');
const division = document.querySelector('.divide');
const equals = document.querySelector('.equals');
const numbers= document.querySelectorAll('.number');
const clear = document.querySelector('.clear');
const percent = document.querySelector('.percent');
const opposite = document.querySelector('.opposite');
const operators = document.querySelectorAll('.operator');
const displayedNum = document.querySelector('.display');
const displayedAnswer = document.querySelector('.display-answer');
let calc = {};
let operated;
let calculated;

displayNumbers();
determineOperator();
displayResult();

function displayNumbers() {
    if (!operated) {
        numbers.forEach(number => number.addEventListener('click', function() {
            calc.display = +(displayedNum.textContent += number.value);
            calc.num1 = calc.display;
        }));
    }
}


function setSecondNum() {
    if (!calculated) {
        displayedNum.textContent = displayNumbers();
        calc.num2 = calc.display;
        }
    }

function modify() {
        displayedAnswer.textContent = displayedNum.textContent;
        calc.answer = +displayedAnswer.textContent; // this allowed answer field to be operated on if only equals sign is clicked
        calc.display = calc.answer;
    }

function reset() {
    if (calculated) {
        displayedNum.textContent = '';
        calc.display = calc.answer; // this allowed me to string together calculations
        }   
    }

function determineOperator() {
    operators.forEach(operator => operator.addEventListener('click', function() {
        operated = true;
        calculated = false;
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
        if (operator === percent) {
            calc.operator = percentage;
            setSecondNum();
        }
    }));
}

function displayResult() {
    equals.addEventListener('click', function() {
        displayedAnswer.textContent = operate(calc.operator, calc.num2, calc.num1);
        calc.answer = +displayedAnswer.textContent;
        calc.num1 = calc.answer;
        calc.display = +displayedNum.textContent;
        calculated = true;
        operated = false;
        if (!calc.hasOwnProperty('num2')) {
            operated = false;
            modify();
        } 
        reset(); 
    });
}

clear.addEventListener('click', function() {
  displayedNum.textContent = '';
  displayedAnswer.textContent = '';
  calc = {};
  calculated = false;
});

percent.addEventListener('click', function() {
    displayedAnswer.textContent = +(calc.display * .01);
    calc.display = +displayedAnswer.textContent;
});

opposite.addEventListener('click', function() {
    displayedAnswer.textContent = +(calc.display * -1);
    calc.display = +displayedAnswer.textContent;
});

