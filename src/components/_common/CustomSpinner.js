import PropTypes from "prop-types";
import React from "react";
import CustomIcon from "./CustomIcon";

const CustomSpinner = ({ shown }) =>
  shown ? (
    <div className="full-screen">
      <CustomIcon icon={["fad", "bullseye-arrow"]} spin size="6x" />
    </div>
  ) : null;

CustomSpinner.defaultProps = {
  shown: false
};

CustomSpinner.propTypes = {
  shown: PropTypes.bool
};

export default CustomSpinner;
