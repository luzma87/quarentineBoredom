import PropTypes from 'prop-types';
import React from 'react';
import withFirebase from '../firebase/withFirebase';
import AuthUserContext from './context';

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        authUser: null,
      };
    }

    componentDidMount() {
      const { firebase } = this.props;
      this.listener = firebase.onAuthUserListener(
        (authUser) => {
          this.setState({ authUser });
        },
        () => {
          this.setState({ authUser: null });
        },
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
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <Component
              authUser={authUser}
              updateAuthUser={(newAuthUser) => this.updateAuthUser(newAuthUser)}
              {...this.props} />
          </AuthUserContext.Provider>
        );
      }
      return null;
    }
  }

  WithAuthentication.propTypes = {
    firebase: PropTypes.any.isRequired,
  };

  return withFirebase(WithAuthentication);
};
export default withAuthentication;
