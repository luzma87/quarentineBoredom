import PropTypes from 'prop-types';
import React from 'react';
import propTypes from '../../constants/propTypes';
import InputWithButton from '../_common/InputWithButton';
import LabelWithButton from '../_common/LabelWithButton';

const InputOrLabel = ({ flag, id, value, onChange, label, onSave, onModify }) => (
    flag
        ? (<InputWithButton
            id={id}
            value={value}
            label={label}
            onChange={onChange}
            icon="save"
            onClick={onSave} />)
        : (<LabelWithButton
            label={value}
            icon="pen-fancy"
            onClick={onModify} />)
);

InputOrLabel.defaultProps = {
    value: "",
    label: "",
}

InputOrLabel.propTypes = {
    flag: PropTypes.bool.isRequired,
    icon: propTypes.icon.isRequired,
    onClick: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onModify: PropTypes.func.isRequired,
    label: PropTypes.string,
}

export default InputOrLabel;
