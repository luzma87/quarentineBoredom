import PropTypes from 'prop-types';

const propTypes = {
    icon: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
    ])
}

export default propTypes;