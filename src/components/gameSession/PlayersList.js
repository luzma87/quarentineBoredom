import PropTypes from 'prop-types';
import React from 'react';
import CustomIconButton from '../_common/CustomButton';
import propTypes from '../../constants/propTypes';

const PlayersList = ({ players, editable, onDelete }) => (
  <div style={{ display: 'flex' }}>
    Players:
    {players.map((player) => (
      <div key={`pl_${player.id}`} style={{ padding: '0 4px' }}>
        {player.username}
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
};

PlayersList.propTypes = {
  players: PropTypes.arrayOf(propTypes.user),
  onDelete: PropTypes.func.isRequired,
  editable: PropTypes.bool,
};

export default PlayersList;
