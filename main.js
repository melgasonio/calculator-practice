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



        let operatorKeys = ['+', '-', '÷', '*']; // Define operatorKeys variable, which is a list of all operator symbols

        let prevKey = keyPressLog[keyPressCount]; // Define prevKey variable, which is the last element in keyPressLog list
        let prevOperator = operatorPressLog[operatorPressCount]; // Define prevOperator variable, which is the last element in operatorPressLog list
        let prevRunningTotal = parseInt(runningTotalLog[operatorPressCount]);

        /*
        // Experiment Only. Commented to not interfere with functionality.

        display.textContent = keyContent // Display key being pressed
        runningTotal = parseInt(keyContent) // Assign numerical value of keyContent to result variable

        console.log(runningTotal)

        */
        
        // If key is a number 
        if (numKeys.some(element => element === parseInt(keyContent))) {
            // If prevKeyType is 'number'
            if (numKeys.some(element => element === parseInt(prevKey))) {
                // If displayContent is '0'; key will replace current display content
                if (displayContent === '0') {
                    display.textContent = keyContent;
                }
                // Else; current key will append display content
                else {
                    display.textContent += keyContent;
                }
            }

            // If prevKeyType is 'operator', replace the display content with keyContent
            if (operatorKeys.some(element => element === prevKey)) {
                display.textContent = keyContent;
            }
            
        }

        // If key is an operator
        if (operatorKeys.some(element => element === keyContent)) {  
            let curRunningTotal = operation(prevRunningTotal, parseInt(displayContent), prevOperator);
            runningTotalLog.push(curRunningTotal);

            display.textContent = curRunningTotal;
            operatorPressCount += 1;
            operatorPressLog.push(keyContent);
        }


        // If key is a decimal point





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

