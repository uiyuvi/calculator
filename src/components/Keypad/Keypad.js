import React from "react";
import PropTypes from 'prop-types';
import './Keypad.css';

const numberKeys = (numbers) => (
    numbers.map(number => (
            <div className="key-container number-key" key={number}>
                <p className="key-value">{number}</p>
            </div>
        )
    )
);

const operatorKeys = (operators) => (
    operators.map(operator => (
            <div className="key-container operator-key" key={operator}>
                <p className="key-value">{operator}</p>
            </div>
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
    </div>
)

export default Keypad;

Keypad.propTypes = {
    numbers: PropTypes.array.isRequired,
    operators: PropTypes.array.isRequired
}
