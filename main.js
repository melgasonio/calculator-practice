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

            // If previous key is an operator, replace the display content with keyContent
            if (operatorKeys.includes(prevKey)) {
                display.textContent = keyContent;
            }
            
            // If previous key is a decimal point, append the number to the current display.
            if (prevKey === '.') {
                display.textContent += keyContent;
            }
        }

        // If key is an operator key
        if (operatorKeys.includes(keyContent)) {

            // If operator key precedes another operator key
            if (operatorKeys.includes(prevKey)) {
                // Remove the last element of operatorPressLog for the current key to replace. 
                // operation() will not be called and displayed number will not be changed
                operatorPressLog.splice(operatorPressCount);
            } else { // Else
                // Initialize running total's value as the return value of operation() with given parameters.
                let curRunningTotal = operation(prevRunningTotal, parseFloat(displayContent), prevOperator);

                // Since there is a change in running total, this will be added/pushed to runningTotalLog list.
                runningTotalLog.push(curRunningTotal);

                // Display current running total
                display.textContent = curRunningTotal;

                // Every operator key press that does not follow another operator key is considered to be unique. operatorPressCount needs to increase by 1 for every instance of this.
                operatorPressCount += 1;
            }

            // Push keyContent (operator key) to operatorPressLog
            operatorPressLog.push(keyContent);
        }


        // If key is a decimal point
        if (keyContent === '.') {
            // If a decimal point does not follow another decimal point
            if (prevKey !== '.') {
                // If decimal key follows a number key
                if (numKeys.includes(parseFloat(prevKey))) {
                    // If displayed number has no decimal point
                    if (!displayContent.includes('.')) {
                        // Append '.' to the displayed number
                        display.textContent += '.';
                    } else {
                        // Don't append anything to prevent 2 or more decimal points in a number
                    }
                // If decimal key does not follow a number key (could be operator, equal, AC keys) 
                } else {
                    display.textContent = '0.';
                }
            } else { 
                // Don't do anything.
            }
        }





        // If key is an equal sign




        // If key is AC



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

