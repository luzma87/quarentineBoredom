/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import propTypes from "../../constants/propTypes";
import withFirebase from "../firebase/withFirebase";
import AuthUserContext from "./context";

const fallback = firebase => {
  // history.push(routes.SIGN_IN)
  firebase.doSignInAnonymously();
  // console.log("fallback :p");
};

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      const { firebase, history } = this.props;
      this.listener = firebase.onAuthUserListener(
        authUser => {
          if (!condition(authUser)) {
            fallback(firebase, history);
          }
        },
        () => fallback(firebase, history)
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            condition(authUser) ? (
              <Component authUser={authUser} {...this.props} />
            ) : null
          }
        </AuthUserContext.Consumer>
      );
    }
  }

  WithAuthorization.propTypes = {
    firebase: propTypes.firebase.isRequired,
    history: propTypes.history.isRequired
  };

  return compose(withRouter, withFirebase)(WithAuthorization);
};

export default withAuthorization;
