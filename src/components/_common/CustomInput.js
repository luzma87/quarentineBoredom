import PropTypes from 'prop-types';
import React from 'react';

const CustomInput = ({ id, value, onChange, label }) => (
    <input
        id={id}
        value={value}
        type="text"
        placeholder={label}
        onChange={ev => onChange(ev)}
        style={{ background: 'pink' }}
    />
);

CustomInput.defaultProps = {
    value: "",
    label: "",
}

CustomInput.propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
}

export default CustomInput;
