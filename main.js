const calculator = document.querySelector('.calculator')
const keys = document.querySelector('.calculator_keys')
const display = document.querySelector('.calculator_display')

keys.addEventListener('click', e => {

    if (e.target.matches('button')) {

        const key = e.target
        const action = key.dataset.action
        const keyContent = key.textContent
        const displayedNum = display.textContent

        // If user clicks a number //
        if (!action) {
            
            // If the displayed number is 0, the number pressed will replace it. Else, it will append the previous number.//
            if (displayedNum === '0' || previousKeyType === 'operator') {
                display.textContent = keyContent
            } else {
                display.textContent = displayedNum + keyContent
            }
            
        }

        // If an operator is pressed, a class of name is-depressed will be added. //
        if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
          ) {

            key.classList.add('is-depressed')
            keys.addEventListener('click', e => {
                if (e.target.matches('button')) {
                  const key = e.target
                  
                  // Remove .is-depressed class from all keys
                  Array.from(key.parentNode.children)
                    .forEach(k => k.classList.remove('is-depressed'))
                }
            })

            // Add custom attribute
            calculator.dataset.previousKeyType = 'operator'
        }

        // If decimal point is pressed //
        if (action === 'decimal') {
            
            display.textContent = displayedNum + '.'
        }
          
        if (action === 'clear') {
            //
        }
          
        if (action === 'calculate') {
            //
        }

    }  
})