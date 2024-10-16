document.addEventListener('DOMContentLoaded', function () {
    const display = document.querySelector('.display');
    const buttons = document.querySelectorAll('.button');
    let currentInput = '0';
    let previousInput = '';
    let operator = null;

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            
            const value = this.textContent;

            if (this.classList.contains('operator')) {
                handleOperator(value);
            } else if (this.classList.contains('equal')) {
                calculate();
            } else if (this.classList.contains('clear')) {
                clear();
            } else if (this.classList.contains('all-clear')) {
                allClear();
            } else if (this.classList.contains('plus-minus')) {
                changeSign();
            } else {
                handleNumber(value);
            }

            updateDisplay();
        });
    });

    function handleNumber(value) {
        if (currentInput === '0') {
            currentInput = value;
        } else {
            currentInput += value;
        }
    }

    function handleOperator(value) {
        if (operator !== null) {
            calculate();
        }
        previousInput = currentInput;
        currentInput = '0';
        operator = value;
    }

    function calculate() {
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        if (isNaN(prev) || isNaN(current)) return;

        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case 'x':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            default:
                return;
        }

        currentInput = result.toString();
        operator = null;
        previousInput = '';
    }

    function updateDisplay() {
        display.value = currentInput;
    }

    function clear() {
        currentInput = '0';
    }

    function allClear() {
        currentInput = '0';
        previousInput = '';
        operator = null;
    }

    function changeSign() {
        currentInput = currentInput * -1;
    }
});