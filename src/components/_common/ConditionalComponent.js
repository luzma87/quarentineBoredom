import PropTypes from "prop-types";
import propTypes from "../../constants/propTypes";

const ConditionalComponent = ({ visible, children }) => {
  if (!visible) return null;
  return children;
};

ConditionalComponent.propTypes = {
  visible: PropTypes.bool.isRequired,
  children: propTypes.children
};

export default ConditionalComponent;
