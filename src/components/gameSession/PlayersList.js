import PropTypes from 'prop-types';
import React from 'react';
import CustomIconButton from '../_common/CustomButton';

const PlayersList = ({ players, onDelete }) => (
    <div style={{ display: 'flex' }}>
        Players:
        {players.map(player => (
            <div key={player} style={{ padding: '0 4px' }}>
                {player}
                <CustomIconButton icon="trash-alt" onClick={() => onDelete(player)} />
            </div>
        ))}
    </div>
);

PlayersList.defaultProps = {
    players: []
}

PlayersList.propTypes = {
    players: PropTypes.arrayOf(PropTypes.string),
    onDelete: PropTypes.func.isRequired,
}

export default PlayersList;
