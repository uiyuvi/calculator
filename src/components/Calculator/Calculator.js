import React, {useState} from "react";
import './Calculator.css';
import Display from "../Display/Display";
import Keypad from "../Keypad/Keypad";

const Calculator = () => {
    let numbers = ['9', '8', '7', '6', '5', '4', '3', '2', '1', '.', '0','ce'];
    let operators = ['+', '-', '*', '/'];
    let [displayValue, setDisplayValue] = useState('0');

    const updateDisplay = value => {
        if(displayValue === '0'){
            setDisplayValue(value)
            return;
        }

        if(value === "." && displayValue.includes(".")){
            return;
        }

        if(value === "ce"){
            let removeLastCharFromDisplayValue = displayValue.substr(0, displayValue.length - 1);
            setDisplayValue(removeLastCharFromDisplayValue)
            return;
        }

        setDisplayValue(displayValue+value);
    };

    return (
        <div className="calculator-container">
            <Display displayValue={displayValue}/>
            <Keypad numbers={numbers} operators={operators} updateDisplay={(value)=>updateDisplay(value)}/>
        </div>
    );
};

export default Calculator;
