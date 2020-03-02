function add (a, b) {return a + b;}
function subtract (a, b) {return a - b;}
function multiply (a, b) {return a * b;}
function divide (a, b) {
    if (a / b === Infinity || a / b === -Infinity || a === 0 && b === 0) {
        return 'Not a number';
    } else {
        return a / b;
    }
}

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
const decimal = document.querySelector('.decimal');

displayedAnswer.textContent = 0;

let calc = {};
let operated;
let calculated;
let operatorVar;

// -- PRIMARY DISPLAY POPULATOR -- //

function displayNumbers() {
    if (!operated) {
        numbers.forEach(number => number.addEventListener('click', () => {
            calc.display = +(displayedNum.textContent += number.value);
            calc.num1 = calc.display;
        }));
        decimal.addEventListener('click', (e) => {
            calc.display = displayedNum.textContent += decimal.textContent;
            decimal.disabled = true;
        });
    } 
}

function determineOperator() {

    operators.forEach(operator => operator.addEventListener('click', () => {
        
        if (operator !== equals) operatorVar = operator;
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
    }));
}

function setSecondNum() {
    if (operated) {

        displayedNum.textContent = displayNumbers();
        calc.num2 = calc.display;
        displayedAnswer.textContent = calc.display + ` ${operatorVar.textContent} `;
    }
    if (!calc.display) { // what to do if operator clicked before a number

        displayedAnswer.textContent = 0;
        calc.answer = 0;
        calc.num2 = calc.answer;
    }
    decimal.disabled = false;
}

function displayResult() {

    equals.addEventListener('click', () => {
        calculated = true;
        operated = false;
        if (!calc.operator && !calc.num2) displayedAnswer.textContent = calc.display;
        if (displayedAnswer.textContent.includes('NaN')) displayedAnswer.textContent = 'Not a number';

        displayedAnswer.textContent = operate(calc.operator, calc.num2, calc.num1);
        calc.answer = +displayedAnswer.textContent;
        calc.num1 = calc.answer;
        calc.display = +displayedNum.textContent;

        if (!calc.hasOwnProperty('num2')) {modify();}
        reset(); 
    });
}

// -- HELPER FUNCTIONS -- //

function modify() {
    displayedAnswer.textContent = displayedNum.textContent;
    calc.answer = +displayedAnswer.textContent; // this allowed answer field to be operated on if only equals sign is clicked
    calc.display = calc.answer;
    displayedAnswer.textContent = calc.display;
}

function reset() {
    if (calculated) {
    displayedNum.textContent = '';
    calc.display = calc.answer; // this allowed me to string together calculations
    decimal.disabled = false;
    }   
}

//--- EVENT LISTENERS FOR ACCESSORY BUTTONS -- //

clear.addEventListener('click', () => {
  displayedNum.textContent = '';
  displayedAnswer.textContent = 0;
  calc = {};
  calculated = false;
  decimal.disabled = false;
});

percent.addEventListener('click', () => {
    
    if (!calc.num2 && !calculated) {
        displayedAnswer.textContent = (calc.num1 * .01);
        displayedNum.textContent = +(calc.display * .01);
        calc.answer = +(displayedNum.textContent);
        calc.display = calc.answer;
    } else if (operated) {
        displayedAnswer.textContent = operate(multiply, calc.num2, calc.num1 * .01);
        calc.display = +displayedAnswer.textContent;
        calc.num1 = calc.display;
    } 
    else if (calculated) {
        displayedAnswer.textContent = (calc.num1 * .01);
        displayedNum.textContent = +(calc.display * .01);
        calc.answer = +(displayedNum.textContent);
        calc.display = calc.answer;
    }

});

opposite.addEventListener('click', () => {
    if (!calc.num2 && !calculated) {
        displayedAnswer.textContent = +(calc.display * -1);
        displayedNum.textContent = +(calc.display * -1);
        calc.answer = +(displayedNum.textContent);
        calc.display = calc.answer;
    }
    else if (operated) {
        displayedAnswer.textContent = operate(multiply, 1, calc.num1 * -1);
        calc.display = +displayedAnswer.textContent;
        calc.num1 = calc.display;
    } 
    else if (calculated) {
        displayedAnswer.textContent = (calc.num1 * -1);
        displayedNum.textContent = +(calc.display * -1);
        calc.answer = +(displayedNum.textContent);
        calc.display = calc.answer;
    }
    
});

displayNumbers();
determineOperator();
displayResult();