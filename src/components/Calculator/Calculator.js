import React, {useState} from "react";
import './Calculator.css';
import Display from "../Display/Display";
import Keypad from "../Keypad/Keypad";

const Calculator = () => {
    let numbers = ['9', '8', '7', '6', '5', '4', '3', '2', '1', '.', '0', 'ce'];
    let operators = ['+', '-', '*', '/'];
    let [displayValue, setDisplayValue] = useState('0');
    let [storedValue, setStoredValue] = useState('0');
    let [selectedOperator, setSelectedOperator] = useState('');

    const removeRecentValueFromDisplayValue = () => displayValue.substr(0, displayValue.length - 1);

    const updateDisplay = value => {
        if (value === "." && displayValue.includes(".")) {
            return;
        }

        if (value === "ce") {
            let processedDisplayValue = removeRecentValueFromDisplayValue();
            if (processedDisplayValue === "") {
                processedDisplayValue = "0";
            }
            setDisplayValue(processedDisplayValue)
            return;
        }

        if (displayValue === '0') {
            setDisplayValue(value)
            return;
        }

        setDisplayValue(displayValue + value);
    };

    const setOperator = operator => {
        setSelectedOperator(operator);
        setStoredValue(displayValue);
        setDisplayValue("0");
    };

    const calculate = () => {
        // parse strings for operations
        let displayValueNumber = parseFloat(displayValue);
        let storedValueNumber = parseFloat(storedValue);
        let calculatedValue = displayValueNumber
        if (selectedOperator === "+") {
            calculatedValue = storedValueNumber + displayValueNumber
        }

        if (selectedOperator === "-") {
            calculatedValue = storedValueNumber - displayValueNumber
        }

        if (selectedOperator === "*") {
            calculatedValue = storedValueNumber * displayValueNumber
        }

        if (selectedOperator === "/") {
            calculatedValue = storedValueNumber / displayValueNumber
        }

        if(calculatedValue.toString() === 'Infinity'){
            calculatedValue = 0;
        }

        setSelectedOperator("");
        setDisplayValue(calculatedValue.toString());
    };

    return (
        <div className="calculator-container">
            <Display displayValue={displayValue}/>
            <Keypad
                numbers={numbers}
                operators={operators}
                updateDisplay={(value) => updateDisplay(value)}
                setOperator={(value) => setOperator(value)}
                calculate={() => calculate()}
            />
        </div>
    );
};

export default Calculator;
