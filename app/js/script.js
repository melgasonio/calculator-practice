const calculator = document.querySelector('.calculator');
const keys = document.querySelector('.calculator__keys');
const display = document.querySelector('.calculator__display');

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
            keyContent === '.' ||
            keyContent === 'CE' ||
            keyContent === 'DEL'
        ) {
            // If key is a number
            if (numKeys.includes(parseFloat(keyContent))) {
                // If previous key is a number
                // If the displayed number is 0, replace 0 with the key
                // It is not conventional to start numbers with 0
                // If the previous key is an operator, clear buttons or equal, also replace the displayed number with the key. This is because these buttons prompt a next operation or an end of operations
                // If the displayed number does not fall under the conditions above, add the key as the rightmost digit of the displayed number  
                if (
                    displayContent === '0'||
                    operatorKeys.includes(prevKey) || 
                    prevKey === '=' ||
                    prevKey === 'CE'
                ) {
                    display.textContent = keyContent;
                }
                else {
                    display.textContent += keyContent;
                }
            }


            // If key is an operator
            if (operatorKeys.includes(keyContent)) {
                // If previous key is an operator key
                // The last operation key before this will be removed from the list of pressed operation keys
                // The new operation key will replace that, ensuring that the operation key is the most updated operator that the user wants
                if (operatorKeys.includes(prevKey)) {
                    operatorPressLog.splice(operatorPressCount);
                
                // If the previous key is not an operator, meaning there are no two consecutive operator keys in the list of keys pressed
                // Call operation function
                // The previous running total, which is by default equal to 0, and is the last element in the list of running total log, will be under an arithmetic operation as defined by operation function
                // The number before an operator key is pressed (displayContent) will then be added to, subtracted from, multiplied to or divide previous running total
                // The result of operation function will be assigned to current running total variable
                // Current running total variable will be saved and added to the list, for the following operations
                // The resut will be displayed
                // Operator press count will increase by 1 
                //This counter will be used as the index for previous operator and previous running total variables
                } else { // Else
                    curRunningTotal = operation(prevRunningTotal, parseFloat(displayContent), prevOperator);
                    runningTotalLog.push(curRunningTotal);

                    display.textContent = curRunningTotal;

                    operatorPressCount += 1;
                }

                // Add operator key to operatorPressLog list for next call of operation function
                operatorPressLog.push(keyContent);

            }


            // If key is a decimal
            if (keyContent === '.') {
                // If previous key is a decimal point or displayed number has a decimal point already, don't do anything
                // If previous number, add the decimal point to the right most digit
                // 0. will display for non-number previous buttons
                if (prevKey !== '.') {
                    if (numKeys.includes(parseFloat(prevKey)) || prevKey === 'DEL') {
                        if (!displayContent.includes('.')) {
                            display.textContent += '.';
                        }
                    }
                    if (
                        operatorKeys.includes(prevKey) ||
                        prevKey === '=' ||
                        prevKey === 'CE' ||
                        prevKey === 'C'
                    ) {
                        display.textContent = '0.';
                    }
                }
            }

            // If key is CE
            // Only clear the current display without affecting anything else
            if (keyContent === 'CE') {
                display.textContent = '0';
            }

            // If key is DEL
            // Remove only the right most digit or decimal
            // 
            if (keyContent === 'DEL') {
                let afterDel = displayContent.slice(0,-1);
                if (afterDel === '') {
                    afterDel = '0';
                }

                display.textContent = afterDel;
                console.log(afterDel);

            }

            // Increase key presses count by 1
            keyPressCount += 1;
            keyPressLog.push(keyContent);            

        } else { 
            // For CE, the calculator will be reset and operations will be halted
            // Set default values and states of all variables and lists
            // For equal sign, the operations will not be halted but the default values will be set
            if (keyContent === '=') {
                if (prevKey !== '=') {

                    curRunningTotal = operation(prevRunningTotal, parseFloat(displayContent), prevOperator)
                    display.textContent = curRunningTotal

                    keyPressLog.push(keyContent);
                    keyPressCount += 1;
                }
            }

            if (keyContent === 'C') {
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

