/**
 * Author:    Wiktor Molak
 * Created:   10.04.2022
 * 
 * (c) Copyright by Wiktor Molak
 **/

import * as readline from 'readline-sync'
import { stdout } from 'process'
import { questionFloat } from 'readline-sync'

const OPERATIONS = [ 'Add', 'Subtract', 'Multiply', 'Divide', 'GCD', 'Power', 'Modulo' ]

let currentOperation
let currentNumber = NaN
let secondNumber = NaN
let history = []

const askForOperation = () => readline.keyInSelect(OPERATIONS, 'Select an operation', { cancel: false, guide: false })

const updateHeader = () => {
    console.clear()
    if(history.length > 0) {
        console.log(history.slice(-5).join('\n'))
        console.log('='.repeat(history.slice(-5).reduce((prev, cur) => cur.length > prev ? cur.length : prev, 0)))
    }
    stdout.write(currentOperation)
}

const updateCurrentOperation = (operation, pushToHistory=false) => {
    currentOperation = operation
    pushToHistory && history.push(currentOperation)
    updateHeader()
}

const GCD = (a, b) => b !== 0 ? GCD(b, a % b) : a

currentNumber = questionFloat('Please enter first number\r\n')

// Main program loop
while(true) {
    currentOperation = currentNumber.toString()

    updateHeader()

    const op = askForOperation()

    switch(op) {
        case 0:
            updateCurrentOperation(currentOperation + ' + ')

            secondNumber = readline.questionFloat() 
            currentNumber += secondNumber
            break
        case 1: 
            updateCurrentOperation(currentOperation + ' - ')
            
            secondNumber = readline.questionFloat() 
            currentNumber -= secondNumber
            break
        case 2:
            updateCurrentOperation(currentOperation + ' * ')
            
            secondNumber = readline.questionFloat() 
            currentNumber *= secondNumber
            break
        case 3:
            updateCurrentOperation(currentOperation + ' / ')
            
            secondNumber = readline.questionFloat() 
            currentNumber /= secondNumber
            break
        case 4:
            updateCurrentOperation('GCD: ' + currentOperation + ', ')
            
            secondNumber = readline.questionFloat() 
            currentNumber = GCD(currentNumber, secondNumber)
            break
        case 5:
            updateCurrentOperation(currentOperation + ' ^ ')
            
            secondNumber = readline.questionFloat() 
            currentNumber = Math.pow(currentNumber, secondNumber)
            break
        case 6:
            updateCurrentOperation(currentOperation + ' mod ')
            
            secondNumber = readline.questionFloat() 
            currentNumber %= secondNumber
            break
    }

    if(currentOperation != currentNumber) updateCurrentOperation(currentOperation + secondNumber + ' = ' + currentNumber, true)
}