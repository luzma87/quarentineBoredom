import PropTypes from 'prop-types';
import React from 'react';
import propTypes from '../../constants/propTypes';
import CustomIconButton from './CustomButton';
import CustomInput from './CustomInput';

const InputWithButton = ({
  id, value, onChange, label, icon, onClick,
}) => (
  <>
    <CustomInput
      id={id}
      value={value}
      label={label}
      onChange={onChange}
    />
    <CustomIconButton icon={icon} onClick={onClick} />
  </>
);

InputWithButton.defaultProps = {
  value: '',
  label: '',
};

InputWithButton.propTypes = {
  icon: propTypes.icon.isRequired,
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
};

export default InputWithButton;
