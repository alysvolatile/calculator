class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  };

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  };

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  };

  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.operate()
    };
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  };
  operate() {
    let result;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    if (this.operation === "+") {
      result = prev + current;
    } else if (this.operation === "-") {
      result = prev - current;
    } else if (this.operation === "x") {
      result = prev * current;
    } else if ((this.operation === "÷") && (this.currentOperand === "0")) {
      alert("NO WAY. Try again!");
      return;
    } else if (this.operation === "÷") {
      result = prev / current;
    } else {
      return;
    }
    this.currentOperand = result.toFixed(2);
    this.operation = undefined;
    this.previousOperand = '';
  }

  checkDivByZero() {
    let result;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(result) || !isFinite(result)) return;
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = 
      this.currentOperand;
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = 
        `${this.previousOperand} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = '';
    }
  };
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  })
});

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  })
});

equalsButton.addEventListener('click', button => {
  calculator.operate();
  calculator.updateDisplay();
})

allClearButton.addEventListener('click', button => {
  calculator.clear();
  calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
  calculator.delete();
  calculator.updateDisplay();
})

// keyboard support
document.addEventListener('keydown', (event) => {
  let name = event.key;
  console.log(name);
  if (name === "+"){
    calculator.chooseOperation("+");
    calculator.updateDisplay();
  } else if (name === "-"){
    calculator.chooseOperation("-");
    calculator.updateDisplay();
  } else if (name === "/"){
    calculator.chooseOperation("÷");
    calculator.updateDisplay();
  } else if (name === "x"){
    calculator.chooseOperation("x");
    calculator.updateDisplay();
  } else if (name === "*"){
    calculator.chooseOperation("x");
    calculator.updateDisplay();
  } else if (name === "="){
    calculator.operate();
    calculator.updateDisplay();
  } else if (name == "Enter"){
    calculator.operate();
    calculator.updateDisplay();
  } else if (name === "Backspace"){
    calculator.delete();
    calculator.updateDisplay();
  } else if (name === "Escape"){
    calculator.clear();
    calculator.updateDisplay();
  } else if ((isNaN(name)) && (name !== ".")){
    return;
  } else {
  calculator.appendNumber(`${name}`);
  calculator.updateDisplay()
}}, false);
