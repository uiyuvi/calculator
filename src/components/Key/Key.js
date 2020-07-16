import React from "react";
import PropTypes from "prop-types";
import './Key.css';

const Key = ({keyValue, keyType, keyAction}) => (
    <div className={`key-container ${keyType}`} onClick={()=>keyAction(keyValue)}>
        <p className="key-value">{keyValue}</p>
    </div>
)

export default Key;

Key.propTypes = {
    keyType: PropTypes.string.isRequired,
    keyValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    keyAction: PropTypes.func.isRequired
}
