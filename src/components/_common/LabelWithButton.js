import PropTypes from 'prop-types';
import React from 'react';
import propTypes from '../../constants/propTypes';
import CustomIconButton from './CustomButton';

const LabelWithButton = ({ label, icon, onClick }) => (
  <>
    {label}
    <CustomIconButton icon={icon} onClick={onClick} />
  </>
);

LabelWithButton.defaultProps = {
  label: '',
};

LabelWithButton.propTypes = {
  icon: propTypes.icon.isRequired,
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string,
};

export default LabelWithButton;
