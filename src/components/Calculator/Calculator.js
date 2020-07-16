import React from "react";
import './Calculator.css';
import Display from "../Display/Display";
import Keypad from "../Keypad/Keypad";

const Calculator = () => {
    let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    return (
        <div className="calculator-container">
            <Display displayValue="0"/>
            <Keypad numbers={numbers}/>
        </div>
    );
};

export default Calculator;
