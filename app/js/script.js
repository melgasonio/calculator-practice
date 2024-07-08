const calculator = document.querySelector('.calculator');
const keys = document.querySelector('.calculator__keys');
const display = document.querySelector('.calculator__display');
const buttons = document.querySelectorAll('button');

let keyPressCount = 0;
let keyPressLog = ['0'];

let operatorPressCount = 0;
let operatorPressLog = ['+'];

let runningTotalLog = ['0'];

const numKeys = Array.from({ length: 10 }, (_, i) => i); // Initialize an array with numbers 0 to 9
const operatorKeys = ['+', '-', '÷', '*']; // Define operator keys

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target; // Key being pressed
        const keyContent = key.textContent; // Content of the key
        handleKeyPress(keyContent);
        fadeOutButton(keyContent);
    }
});

document.addEventListener('keydown', e => {
    const key = e.key;
    const keyContent = mapKeyToContent(key);
    if (isValidKey(key)) {
        handleKeyPress(keyContent);
        fadeOutButton(keyContent);
    }
});

// Function to handle number, decimal, operator, and special keys
function handleKeyPress(keyContent) {
    const displayContent = display.textContent; // Content of the display
    let prevKey = keyPressLog[keyPressCount]; // Last pressed key
    let prevOperator = operatorPressLog[operatorPressCount]; // Last operator
    let prevRunningTotal = parseFloat(runningTotalLog[operatorPressCount]);
    let curRunningTotal;

    // Handle number and decimal keys
    if (numKeys.includes(parseFloat(keyContent)) || keyContent === '.') {
        handleNumberAndDecimalKeys(keyContent, prevKey, displayContent);
    }

    // Handle operator keys
    if (operatorKeys.includes(keyContent)) {
        handleOperatorKeys(keyContent, prevKey, displayContent, prevOperator, prevRunningTotal);
    }

    // Handle special keys (C, CE, DEL, =)
    handleSpecialKeys(keyContent, prevKey, displayContent, prevOperator, prevRunningTotal);
}

// Function to handle number and decimal keys
function handleNumberAndDecimalKeys(keyContent, prevKey, displayContent) {
    // If key is a number
    if (numKeys.includes(parseFloat(keyContent))) {
        if (displayContent === '0' || operatorKeys.includes(prevKey) || prevKey === '=' || prevKey === 'CE') {
            display.textContent = keyContent;
        } else {
            if (displayContent.length < 16) {
                display.textContent += keyContent;
            }
        }
    }

    if (keyContent === '.') {
        if (!displayContent.includes('.')) {
            display.textContent += '.';
        } else if (['+', '-', '÷', '*', '=', 'CE', 'C'].includes(prevKey)) {
            display.textContent = '0.';
        }
    }
    updateKeyLogs(keyContent);
}

// Function to handle operator keys
function handleOperatorKeys(keyContent, prevKey, displayContent, prevOperator, prevRunningTotal) {
    if (operatorKeys.includes(prevKey)) {
        operatorPressLog.splice(operatorPressCount, 1, keyContent);
    } else {
        curRunningTotal = operation(prevRunningTotal, parseFloat(displayContent), prevOperator);
        runningTotalLog.push(curRunningTotal);
        display.textContent = curRunningTotal;
        operatorPressCount += 1;
        operatorPressLog.push(keyContent);
    }
    updateKeyLogs(keyContent);
}

// Function to handle special keys (C, CE, DEL, =)
function handleSpecialKeys(keyContent, prevKey, displayContent, prevOperator, prevRunningTotal) {
    if (keyContent === '=') {
        if (prevKey !== '=') {
            curRunningTotal = operation(prevRunningTotal, parseFloat(displayContent), prevOperator);
            if (curRunningTotal === Infinity) {
                display.textContent = 'Cannot divide by 0'
            } else {
                display.textContent = curRunningTotal;
            }
        }
        resetKeyLogs(keyContent);
    } else if (keyContent === 'C') {
        display.textContent = '0';
        resetCalculator();
    } else if (keyContent === 'CE') {
        display.textContent = '0';
    } else if (keyContent === 'DEL') {
        let afterDel = displayContent.slice(0, -1) || '0';
        if (['+', '-', '÷', '*', '=', 'CE', 'C'].includes(prevKey)) return;
        display.textContent = afterDel;
    }
    updateKeyLogs(keyContent);
}

// Function to perform arithmetic operations
function operation(firstNum, secondNum, operator) {
    switch (operator) {
        case '+': return firstNum + secondNum;
        case '-': return firstNum - secondNum;
        case '*': return firstNum * secondNum;
        case '÷': return firstNum / secondNum;
        default: return secondNum;
    }
}

// Helper functions to update and reset logs
function updateKeyLogs(keyContent) {
    keyPressCount += 1;
    keyPressLog.push(keyContent);
}

function resetKeyLogs(keyContent) {
    keyPressLog.push(keyContent);
    keyPressCount += 1;
}

function resetCalculator() {
    keyPressCount = 0;
    keyPressLog = ['0'];
    operatorPressCount = 0;
    operatorPressLog = ['+'];
    runningTotalLog = ['0'];
}

// Helper function to check if a key is valid
function isValidKey(key) {
    const validKeys = [...numKeys.map(String), '.', '+', '-', '*', '/', '=', 'Backspace', 'Delete', 'Escape', 'Enter'];
    return validKeys.includes(key);
}

// Helper function to map keyboard keys to calculator content
function mapKeyToContent(key) {
    if (key === 'Backspace') return 'DEL';
    if (key === 'Delete') return 'CE';
    if (key === 'Escape') return 'C';
    if (key === '/') return '÷';
    if (key === 'Enter') return '=';

    return key;
}

// Helper function that fades out a key (adds and removes .fade-out class) 
function fadeOutButton(keyContent) {
    buttons.forEach(button => {
        if (button.textContent === keyContent) {
            button.style.setProperty('--button-bg', '#4e4e64');
            
            setTimeout(() => {
                button.style.setProperty('--button-bg', '#3a3a45');
            }, 200);
        }
    });
}