import PropTypes from "prop-types";

const propTypes = {
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  user: PropTypes.shape({
    username: PropTypes.string,
    id: PropTypes.string
  }),
  authUser: PropTypes.shape({}),
  firebase: PropTypes.shape({}),
  history: PropTypes.shape({}),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default propTypes;
