/* eslint-disable react/jsx-props-no-spreading */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import PropTypes from 'prop-types';

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
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]).isRequired,
};

export default CustomIcon;
