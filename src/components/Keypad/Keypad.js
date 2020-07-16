import React from "react";
import PropTypes from 'prop-types';
import './Keypad.css';
import Key from "../Key/Key";

const numberKeys = (numbers) => (
    numbers.map(number => (
            <Key key={number} keyType="number-key" keyValue={number}/>
        )
    )
);

const operatorKeys = (operators) => (
    operators.map(operator => (
            <Key key={operator} keyType="operator-key" keyValue={operator}/>
        )
    )
);

const Keypad = ({numbers, operators}) => (
    <div className="keypad-container">
        <div className="numbers-container">
            {numberKeys(numbers)}
        </div>
        <div className="operators-container">
            {operatorKeys(operators)}
        </div>
        <div className="submit-container">
            <Key keyType="submit-key" keyValue={"="}/>
        </div>
    </div>
)

export default Keypad;

Keypad.propTypes = {
    numbers: PropTypes.array.isRequired,
    operators: PropTypes.array.isRequired
}
