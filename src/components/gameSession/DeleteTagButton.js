import PropTypes from "prop-types";
import React from "react";
import CustomIcon from "../_common/CustomIcon";

const DeleteTagButton = ({ onClick }) => {
  return (
    <button type="button" className="delete-tag" onClick={onClick}>
      <CustomIcon
        icon="backspace"
        style={{
          marginLeft: 6
        }}
      />
    </button>
  );
};

DeleteTagButton.propTypes = { onClick: PropTypes.func.isRequired };

export default DeleteTagButton;
