/* eslint-disable react/jsx-props-no-spreading */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import propTypes from '../../constants/propTypes';

const getIcon = (icon) => {
  if (Array.isArray(icon)) return icon;
  return ['far', icon];
}

const CustomIcon = ({
  icon, ...rest
}) => {
  return (
    <FontAwesomeIcon icon={getIcon(icon)} {...rest} />
  );
};

CustomIcon.propTypes = {
  icon: propTypes.icon.isRequired,
};

export default CustomIcon;
