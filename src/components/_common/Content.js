/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from "prop-types";
import React from "react";
import propTypes from "../../constants/propTypes";

const Content = ({ children, className, ...rest }) => (
  <div className={`content ${className}`} {...rest}>
    {children}
  </div>
);

Content.defaultProps = {
  className: ""
};

Content.propTypes = {
  children: propTypes.children.isRequired,
  className: PropTypes.string
};

export default Content;
