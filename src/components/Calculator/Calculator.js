import React, {useState} from "react";
import './Calculator.css';
import Display from "../Display/Display";
import Keypad from "../Keypad/Keypad";

const Calculator = () => {
    let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let operators = ['+', '-', '*', '/'];
    let [displayValue, setDisplayValue] = useState(numbers[0]);

    const updateDisplay = value => {
        setDisplayValue(value)
    };

    return (
        <div className="calculator-container">
            <Display displayValue={displayValue}/>
            <Keypad numbers={numbers} operators={operators} updateDisplay={(value)=>updateDisplay(value)}/>
        </div>
    );
};

export default Calculator;
