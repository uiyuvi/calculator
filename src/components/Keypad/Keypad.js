import React from "react";
import PropTypes from 'prop-types';
import './Keypad.css';
import Key from "../Key/Key";


const Keypad = ({numbers, operators, updateDisplay, setOperator, calculate}) => {
    const numberKeys = numbers.map(number => <Key key={number} keyType="number-key" keyValue={number}
                                                  keyAction={() => updateDisplay(number)}/>)


    const operatorKeys = operators.map(operator => <Key key={operator} keyType="operator-key" keyValue={operator}
                                                        keyAction={() => setOperator(operator)}/>)

    return (
        <div className="keypad-container">
            <div className="numbers-container">
                {numberKeys}
            </div>
            <div className="operators-container">
                {operatorKeys}
            </div>
            <div className="submit-container">
                <Key keyType="submit-key" keyValue={"="} keyAction={() => calculate()}/>
            </div>
        </div>
    )
}

export default Keypad;

Keypad.propTypes = {
    numbers: PropTypes.array.isRequired,
    operators: PropTypes.array.isRequired,
    updateDisplay: PropTypes.func.isRequired,
    setOperator: PropTypes.func.isRequired,
    calculate: PropTypes.func.isRequired
}
