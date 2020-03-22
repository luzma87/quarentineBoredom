import PropTypes from "prop-types";
import React from "react";
import propTypes from "../../constants/propTypes";
import RemovablePlayer from "./RemovablePlayer";

const PlayersList = ({ players, editable, onDelete }) => (
  <div style={{ display: "flex", alignItems: "center", margin: "16px 0" }}>
    <div className="label">Players:</div>
    {players.map(player => (
      <RemovablePlayer
        key={`player_${player.id}`}
        player={player}
        editable={editable}
        onDelete={onDelete}
      />
    ))}
  </div>
);

PlayersList.defaultProps = {
  players: [],
  editable: false
};

PlayersList.propTypes = {
  players: PropTypes.arrayOf(propTypes.user),
  onDelete: PropTypes.func.isRequired,
  editable: PropTypes.bool
};

export default PlayersList;
