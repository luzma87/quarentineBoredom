import React from "react";
import propTypes from "../../constants/propTypes";
import withFirebase from "../firebase/withFirebase";
import AuthUserContext from "./context";

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        authUser: null
      };
    }

    componentDidMount() {
      const { firebase } = this.props;
      this.listener = firebase.onAuthUserListener(
        authUser => {
          this.setState({ authUser });
        },
        () => {
          firebase.doSignInAnonymously();
        }
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    updateAuthUser(newAuthUser) {
      const { authUser } = this.state;
      const mergedUser = { ...authUser, ...newAuthUser };
      this.setState({ authUser: mergedUser });
    }

    render() {
      const { authUser } = this.state;
      if (authUser) {
        return (
          <AuthUserContext.Provider value={authUser}>
            <Component
              authUser={authUser}
              updateAuthUser={newAuthUser => this.updateAuthUser(newAuthUser)}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...this.props}
            />
          </AuthUserContext.Provider>
        );
      }
      return null;
    }
  }

  WithAuthentication.propTypes = {
    firebase: propTypes.firebase.isRequired
  };

  return withFirebase(WithAuthentication);
};
export default withAuthentication;
