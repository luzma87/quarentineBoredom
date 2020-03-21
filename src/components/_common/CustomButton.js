import PropTypes from 'prop-types';
import React from 'react';
import CustomIcon from './CustomIcon';
import propTypes from '../../constants/propTypes';

const CustomIconButton = ({ icon, onClick }) => (
    <button
        type="button"
        onClick={onClick}
        style={{ background: 'hotpink' }}
    >
        <CustomIcon icon={icon} />
    </button>
);

CustomIconButton.propTypes = {
    icon: propTypes.icon.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default CustomIconButton;
