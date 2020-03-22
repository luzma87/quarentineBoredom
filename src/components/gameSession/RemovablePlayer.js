import PropTypes from "prop-types";
import React from "react";
import propTypes from "../../constants/propTypes";
import ConditionalComponent from "../_common/ConditionalComponent";
import CustomIconButton from "../_common/CustomButton";

const RemovablePlayer = ({ player, editable, onDelete }) => (
  <div className={`tag ${editable ? "with-button" : ""}`}>
    <div>{player.username}</div>

    <ConditionalComponent visible={editable}>
      <CustomIconButton
        style={{ marginLeft: 8 }}
        icon="trash-alt"
        onClick={() => onDelete(player)}
      />
    </ConditionalComponent>
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
