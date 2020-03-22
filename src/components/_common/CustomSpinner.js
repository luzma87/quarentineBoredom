import PropTypes from 'prop-types';
import React from 'react';
import CustomIcon from './CustomIcon';

const CustomSpinner = ({ shown }) => (
  shown
    ? <CustomIcon icon={['fad', 'tire-rugged']} spin />
    : null
);

CustomSpinner.defaultProps = {
  shown: false,
};

CustomSpinner.propTypes = {
  shown: PropTypes.bool,
};

export default CustomSpinner;
