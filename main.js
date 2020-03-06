function add (a, b) {return a + b;}
function subtract (a, b) {return a - b;}
function multiply (a, b) {return a * b;}
function divide (a, b) {
    if ( a / b === Infinity || a / b === -Infinity || a === 0 && b === 0) return errorMessage;
    return a / b;
}

const errorMessage = 'No, thank you.';

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

displayedAnswer.textContent = 'Welcome';

let calc = {};
let operated;
let calculated;
let operatorVar;

function displayNumbers() {

    if (!operated) {
        numbers.forEach(number => number.addEventListener('click', () => {
            calc.display = +(displayedNum.textContent += number.value);
            calc.num1 = calc.display;
            
        }));
        decimal.addEventListener('click', () => {
            calc.display = displayedNum.textContent += decimal.textContent;
            decimal.disabled = true;
        });
    }  
    
}

// sets an operator to the calc{} object and calls calculate if equals hasn't been clicked
function determineOperator() {

    operators.forEach(operator => operator.addEventListener('click', () => {
        
        equals.disabled = false;

        if (!calculated) calculate();
    
        operated = true;
        calculated = false;
        
        operatorVar = operator;

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

    displayedNum.textContent = '';
    calc.num2 = calc.display;

    if (calc.display.toString().length > 8) {displayedAnswer.textContent = (+displayedAnswer.textContent).toPrecision(6) + ` ${operatorVar.textContent} `;} 
        
    else {displayedAnswer.textContent = calc.display + ` ${operatorVar.textContent} `;}
        
    decimal.disabled = false;
    
}

equals.addEventListener('click', () => {

    calculate();
    equals.disabled = true;
    

});

function calculate() {

    calculated = true;
    operated = false;
    
    if (!calc.operator && !calc.num2) displayedAnswer.textContent = calc.display;

    displayedAnswer.textContent = operate(calc.operator, calc.num2, calc.num1);

    calc.answer = +displayedAnswer.textContent;
    calc.num1 = calc.answer;
    
    if (!calc.hasOwnProperty('num2')) modify();
    calc.display = calc.answer
    displayedNum.textContent = '';

    truncateTextDisplay();
    

}

//--- EVENT LISTENERS FOR ACCESSORY BUTTONS -- //

clear.addEventListener('click', () => {

  displayedNum.textContent = '';
  displayedAnswer.textContent = 0;
  calc = {};
  calculated = false;
  decimal.disabled = false;
  equals.disabled = false;

});

percent.addEventListener('click', () => {

    if (!calc.display) {return 0;}

    else if (operated) {

    //allow intermediate percentage calculation, for e.g., 100 + 20% = 120, shows 20 before equals is pressed and then displays 120
        displayedAnswer.textContent = operate(multiply, calc.num2, calc.num1 * .01); 
        calc.display = +displayedAnswer.textContent;
        calc.num1 = calc.display;
    } 

    else if (calculated) {

        calculatePercentage();
        calc.answer = +(displayedNum.textContent);
        calc.display = calc.answer;
    }

     else displayedNum.textContent *= .01 

    truncateTextDisplay();

});

opposite.addEventListener('click', () => {

    if (!calc.display) {return 0;}

    else if (operated) {

        displayedAnswer.textContent = operate(multiply, 1, calc.num1 * -1); 
        calc.display = +displayedAnswer.textContent;
        calc.num1 = calc.display;

    } 

    else if (calculated) {

        calculateOpposite();
        calc.answer = +(displayedNum.textContent);
        calc.display = calc.answer;

    }

    else displayedNum.textContent *= -1;

     truncateTextDisplay();

});

// this allowed answer field to be operated on if only equals sign is clicked
function modify() {

    displayedAnswer.textContent = displayedNum.textContent;
    calc.answer = +displayedAnswer.textContent; 
    calc.display = calc.answer;
    displayedAnswer.textContent = calc.display;
    
}

function calculatePercentage() {

    displayedAnswer.textContent = (calc.num1 * .01);
    displayedNum.textContent = +(calc.display * .01);
    truncateTextDisplay();

}

function calculateOpposite() {
    
    displayedAnswer.textContent = (calc.num1 * -1);
    displayedNum.textContent = +(calc.display * -1);
    truncateTextDisplay();
}

function truncateTextDisplay() {

    if (displayedAnswer.textContent.length > 8 && displayedAnswer.textContent !== errorMessage) {
        displayedAnswer.textContent = (+displayedAnswer.textContent).toPrecision(6);}

}

displayNumbers();
determineOperator();
