import PropTypes from "prop-types";
import React from "react";
import CustomIcon from "./CustomIcon";
import propTypes from "../../constants/propTypes";

const CustomIconButton = ({ icon, label, onClick }) => {
  const marginLeft = label !== undefined ? 4 : 0;
  return (
    <button type="button" onClick={onClick}>
      {label}
      <CustomIcon
        icon={icon}
        style={{
          marginLeft
        }}
      />
    </button>
  );
};

CustomIconButton.defaultProps = {
  label: undefined
};

CustomIconButton.propTypes = {
  icon: propTypes.icon.isRequired,
  label: PropTypes.string,
  onClick: PropTypes.func.isRequired
};

export default CustomIconButton;
