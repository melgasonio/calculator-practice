const calculator = document.querySelector('.calculator');
const keys = document.querySelector('.calculator_keys');
const display = document.querySelector('.calculator_display');

let keyPressCount = 0;
let keyPressLog = ['0'];

let operatorPressCount = 0;
let operatorPressLog = ['+'];

let runningTotalLog = ['0'];

let numKeys = []; // Initialize an empty list of number keys
for (let i = 0; i <= 9; i++) {
    numKeys.push(i); // Iterate over a loop that goes through numbers 1 to 9 and push each iterated number to numKeys list
}

keys.addEventListener('click', e => {

    if (e.target.matches('button')) {
        const key = e.target; // Key being pressed
        const keyContent = key.textContent; // Content of the key
        const displayContent = display.textContent; // Content of the display



        const operatorKeys = ['+', '-', '÷', '*']; // Define operatorKeys variable, which is a list of all operator symbols

        let prevKey = keyPressLog[keyPressCount]; // Define prevKey variable, which is the last element in keyPressLog list
        let prevOperator = operatorPressLog[operatorPressCount]; // Define prevOperator variable, which is the last element in operatorPressLog list
        let prevRunningTotal = parseFloat(runningTotalLog[operatorPressCount]);
        let curRunningTotal;


        // If key is a number, operator or decimal
        if (
            numKeys.includes(parseFloat(keyContent)) ||
            operatorKeys.includes(keyContent) ||
            keyContent === '.'
        ) {
            // If key is a number
            if (numKeys.includes(parseFloat(keyContent))) {
                // If prevKeyType is 'number'
                if (numKeys.includes(parseFloat(prevKey))) {
                    // If displayContent is '0'; key will replace current display content
                    if (displayContent === '0') {
                        display.textContent = keyContent;
                    }
                    // Else; current key will append display content
                    else {
                        display.textContent += keyContent;
                    }
                }

                // If previous key is an operator, equal sign or AC, replace the display content with keyContent
                if (
                    operatorKeys.includes(prevKey) || 
                    prevKey === '=' ||
                    prevKey === 'AC'
                ) {
                    display.textContent = keyContent;
                }
                
                // If previous key is a decimal point, append the number to the current display.
                if (prevKey === '.') {
                    display.textContent += keyContent;
                }

            }


            // If key is an operator
            if (operatorKeys.includes(keyContent)) {
                // If previous key is an operator key
                if (operatorKeys.includes(prevKey)) {
                    operatorPressLog.splice(operatorPressCount);
                } else { // Else
                    curRunningTotal = operation(prevRunningTotal, parseFloat(displayContent), prevOperator);
                    runningTotalLog.push(curRunningTotal);

                    display.textContent = curRunningTotal;

                    operatorPressCount += 1;
                }

                operatorPressLog.push(keyContent);

            }


            // If key is a decimal
            if (keyContent === '.') {
                // If previous key is a decimal point
                if (prevKey !== '.') {
                    // If decimal key follows a number key
                    if (numKeys.includes(parseFloat(prevKey))) {
                        // If displayed number has no decimal point
                        if (!displayContent.includes('.')) {
                            // Append '.' to the displayed number
                            display.textContent += '.';
                        } 
                    // If decimal key does not follow a number key (could be operator, equal, AC keys) 
                    } else {
                        display.textContent = '0.';
                    }
                }
            }

            keyPressCount += 1;
            keyPressLog.push(keyContent);            

        } else { 
            // If key is an equal sign
            if (keyContent === '=') {
            // If prev key is not an equal sign
                if (prevKey !== '=') {
                    // If previous key is a dcimal
                    if (prevKey === '.') {
                        // If displayed number has no existing decimal point
                        if (!displayContent.includes('.')) {
                            curRunningTotal = operation(prevRunningTotal, parseInt(displayContent), prevOperator)
                        }
                    }

                    curRunningTotal = operation(prevRunningTotal, parseFloat(displayContent), prevOperator)
                    display.textContent = curRunningTotal
                }
            }

            // If key is AC
            if (keyContent === 'AC') {
                display.textContent = '0';
                keyPressCount = 0;
                keyPressLog = ['0'];
            }

            runningTotalLog = ['0'];

            operatorPressCount = 0;
            operatorPressLog = ['+'];

        }

        // If curRunningTotal is infinity (division by 0) 
        if (curRunningTotal === Infinity) {
            display.textContent = 'Cannot divide by 0';
        }

        keyPressCount += 1;
        keyPressLog.push(keyContent);
    }
})

// Define operation function with three params (int, int, str)
function operation(firstNum, secondNum, operator) {

    if (operator === '+') {
        return firstNum + secondNum;
    }
    if (operator === '-') {
        return firstNum - secondNum;
    }
    if (operator === '*') {
        return firstNum * secondNum;
    }
    if (operator === '÷') {
        return firstNum / secondNum;
    }
}

