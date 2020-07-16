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
const Keypad = ({numbers}) => (
    <div className="keypad-container">
        <div className="numbers-container">
            {numberKeys(numbers)}
        </div>
    </div>
)

export default Keypad;

Keypad.propTypes = {
    numbers: PropTypes.array.isRequired
}
