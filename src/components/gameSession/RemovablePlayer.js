import PropTypes from "prop-types";
import React from "react";
import CustomIconButton from "../_common/CustomButton";
import propTypes from "../../constants/propTypes";

const RemovablePlayer = ({ player, editable, onDelete }) => (
  <div className={`tag ${editable ? "with-button" : ""}`}>
    <div>{player.username}</div>

    {editable ? (
      <CustomIconButton
        style={{ marginLeft: 8 }}
        icon="trash-alt"
        onClick={() => onDelete(player)}
      />
    ) : null}
  </div>
);

RemovablePlayer.defaultProps = {
  editable: false
};

RemovablePlayer.propTypes = {
  player: propTypes.user.isRequired,
  onDelete: PropTypes.func.isRequired,
  editable: PropTypes.bool
};

export default RemovablePlayer;
