import PropTypes from 'prop-types';
import React from 'react';
import CustomIconButton from '../_common/CustomButton';

const PlayersList = ({ players, editable, onDelete }) => (
    <div style={{ display: 'flex' }}>
        Players:
        {players.map(player => (
            <div key={player} style={{ padding: '0 4px' }}>
                {player}
                {editable
                    ? <CustomIconButton icon="trash-alt" onClick={() => onDelete(player)} />
                    : null}
            </div>
        ))}
    </div>
);

PlayersList.defaultProps = {
    players: [],
    editable: false,
}

PlayersList.propTypes = {
    players: PropTypes.arrayOf(PropTypes.string),
    onDelete: PropTypes.func.isRequired,
    editable: PropTypes.bool,
}

export default PlayersList;
