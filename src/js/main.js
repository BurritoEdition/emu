// Start writing JavaScript here!
const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator__keys')
const display = calculator.querySelector('.calculator__display')
const operatorKeys = keys.querySelectorAll('[data-type="operator"]')



  // Add event listener on keydown
  document.addEventListener('keydown', (event) => {
    var name = event.key;
    var code = event.code;
    if (name === 'Control') {
      // Do nothing.
      return;
    }
    if (event.ctrlKey) {
      location.href = 'home.html';
    } else {
      // alert(`Key pressed ${name} \n Key code Value: ${code}`);
      null
    }
  }, false);
  // Add event listener on keyup
  document.addEventListener('keyup', (event) => {
    var name = event.key;
    if (name === 'Control') {
      location.href = 'home.html';
    }
  }, false);



  // if (numbersOnScreen = "80085") {
  //   console.log("oopssd...")
  // } else {
  //   console.log("wroung code dude :(");
  // }



keys.addEventListener('click', event => {
  if (!event.target.closest('button')) return

  const key = event.target
  const keyValue = key.textContent
  const displayValue = display.textContent
  const { type } = key.dataset
  const { previousKeyType } = calculator.dataset

  if (type === 'number') {
    if (
      displayValue === '0' ||
      previousKeyType === 'operator'
    ) {
      display.textContent = keyValue
    } else {
      display.textContent = displayValue + keyValue
    }
  }

  if (type === 'operator') {
    operatorKeys.forEach(el => { el.dataset.state = '' })
    key.dataset.state = 'selected'

    calculator.dataset.firstNumber = displayValue
    calculator.dataset.operator = key.dataset.key
  }

  if (type === 'equal') {
    // Perform a calculation
    const firstNumber = calculator.dataset.firstNumber
    const operator = calculator.dataset.operator
    const secondNumber = displayValue
    display.textContent = calculate(firstNumber, operator, secondNumber)
  }

  if (type === 'clear') {
    display.textContent = '0'
    delete calculator.dataset.firstNumber
    delete calculator.dataset.operator
  }

  calculator.dataset.previousKeyType = type
})

function calculate (firstNumber, operator, secondNumber) {
  firstNumber = parseInt(firstNumber)
  secondNumber = parseInt(secondNumber)

  if (operator === 'plus') return firstNumber + secondNumber
  if (operator === 'minus') return firstNumber - secondNumber
  if (operator === 'times') return firstNumber * secondNumber
  if (operator === 'divide') return firstNumber / secondNumber
}

// ========================
// TESTING
// ========================
function clearCalculator () {
  // Press the clear key
  const clearKey = document.querySelector('[data-type="clear"]')
  clearKey.click()

  // Clear operator states
  operatorKeys.forEach(key => { key.dataset.state = '' })
}

function testClearKey () {
  clearCalculator()
  console.assert(display.textContent === '0', 'Clear key. Display should be 0')
  console.assert(!calculator.dataset.firstNumber, 'Clear key. No first number remains')
  console.assert(!calculator.dataset.operator, 'Clear key. No operator remains')
}

function testKeySequence (test) {
  // Press keys
  test.keys.forEach(key => {
    document.querySelector(`[data-key="${key}"]`).click()
  })

  // Assertion
  // console.assert(display.textContent === test.value, test.message)



  console.assert(display.textContent === test.value)

  // Clear calculator
  clearCalculator()
  testClearKey()
}

// const megaValue = "80085"


//  if(display.textContent === megaValue){
//   console.log("wroung code dude :(");
//  }

const tests = [{
  keys: ['1'],
  value: '1',
  message: 'Click 1'
}, {
  keys: ['1', '5'],
  value: '15',
  message: 'Click 15'
}, {
  keys: ['1', '5', '9'],
  value: '159',
  message: 'Click 159'
},
{
  keys: ['3', 'minus', '7', '0', 'equal'],
  value: '-69',
  message: 'Calculation with minus'
}, {
  keys: ['1', '5', 'times', '9', 'equal'],
  value: '135',
  message: 'Calculation with times'
}, {
  keys: ['9', 'divide', '3', 'equal'],
  value: '3',
  message: 'Calculation with divide'
}, {
  keys: ['8','0', '0', '8', 'equal'],
  value: "69",
  message: "DID IT WORK????"
}]

tests.forEach(testKeySequence)
