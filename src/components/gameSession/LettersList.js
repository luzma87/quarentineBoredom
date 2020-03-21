import PropTypes from 'prop-types';
import React from 'react';

const LettersList = ({ letters }) => (
    <div style={{ display: 'flex' }}>
        Letters: {letters.join(", ")}
    </div>
);

LettersList.defaultProps = {
    letters: []
}

LettersList.propTypes = {
    letters: PropTypes.arrayOf(PropTypes.string),
}

export default LettersList;
