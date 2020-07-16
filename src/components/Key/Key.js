import React from "react";
import PropTypes from "prop-types";
import './Key.css';

const Key = ({keyValue, keyType}) => (
    <div className={`key-container ${keyType}`}>
        <p className="key-value">{keyValue}</p>
    </div>
)

export default Key;

Key.propTypes = {
    keyType: PropTypes.string.isRequired,
    keyValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
}
