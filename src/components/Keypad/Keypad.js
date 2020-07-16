import React from "react";
import PropTypes from 'prop-types';
import './Keypad.css';
import Key from "../Key/Key";


const Keypad = ({numbers, operators, updateDisplay}) => {
    const numberKeys = numbers.map(number => <Key key={number} keyType="number-key" keyValue={number} keyAction={(number)=>updateDisplay(number)}/>)


    const operatorKeys = operators.map(operator => <Key key={operator} keyType="operator-key" keyValue={operator} keyAction={()=>true}/>)

    return (
        <div className="keypad-container">
            <div className="numbers-container">
                {numberKeys}
            </div>
            <div className="operators-container">
                {operatorKeys}
            </div>
            <div className="submit-container">
                <Key keyType="submit-key" keyValue={"="} keyAction={()=>true}/>
            </div>
        </div>
    )
}

export default Keypad;

Keypad.propTypes = {
    numbers: PropTypes.array.isRequired,
    operators: PropTypes.array.isRequired,
    updateDisplay: PropTypes.func.isRequired
}
