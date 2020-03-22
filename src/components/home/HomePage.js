import { hri } from "big-human-readable-ids";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { compose } from "recompose";
import propTypes from "../../constants/propTypes";
import routes from "../../constants/routes";
import withAuthentication from "../session/withAuthentication";
import InputOrLabel from "./InputOrLabel";
import withFirebase from "../firebase/withFirebase";

const newSession = (firebase, newId) => {
  const newGameSession = {
    id: newId,
    date: new Date()
  };
  firebase.gameSession(newId).set(newGameSession);
};

const HomePage = ({ firebase, authUser, updateAuthUser }) => {
  const [localUsername, setLocalUsername] = useState("");
  const [localGameSession, setLocalGameSession] = useState("");
  const [modifyingUser, setModifyingUser] = useState(false);
  const [modifyingSession, setModifyingSession] = useState(false);
  const [shouldRedirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!authUser.username) {
      setModifyingUser(true);
    } else {
      setLocalUsername(authUser.username);
    }
    if (!authUser.gameSession) {
      setModifyingSession(true);
    } else {
      setLocalGameSession(authUser.gameSession);
    }
    if (authUser.username && authUser.gameSession) {
      setRedirect(true);
    }
  }, [authUser]);

  if (shouldRedirect) {
    return <Redirect to={routes.GAME_SESSION(localGameSession)} />;
  }

  const onChangeInput = ev => {
    const value = ev.target.value.trim();
    switch (ev.target.id) {
      case "username":
        setLocalUsername(value);
        break;
      case "sessionId":
        setLocalGameSession(value);
        break;
      default:
    }
  };

  const onSaveUsername = () => {
    localStorage.setItem("user", localUsername);
    updateAuthUser({ username: localUsername });
    setModifyingUser(false);
  };

  const onSaveGameSession = () => {
    localStorage.setItem("gameSession", localGameSession);
    updateAuthUser({ gameSession: localGameSession });
    setModifyingSession(false);
  };

  const onClickChangeUsername = () => {
    setModifyingUser(true);
  };

  const onClickChangeGameSession = () => {
    setModifyingSession(true);
  };

  const newGameSession = () => {
    const newId = hri.random();
    setLocalGameSession(newId);
    newSession(firebase, newId);
  };

  const redirect = shouldRedirect ? (
    <Redirect to={routes.GAME_SESSION(localGameSession)} />
  ) : null;
  return (
    <>
      <div>
        Welcome &nbsp;
        <InputOrLabel
          flag={modifyingUser}
          id="username"
          value={localUsername}
          label="username"
          onChange={ev => onChangeInput(ev)}
          onSave={() => onSaveUsername()}
          onModify={() => onClickChangeUsername()}
        />
      </div>
      <div>
        Join &nbsp;
        <InputOrLabel
          flag={modifyingSession}
          id="sessionId"
          value={localGameSession}
          label="session id"
          onChange={ev => onChangeInput(ev)}
          onSave={() => onSaveGameSession()}
          onModify={() => onClickChangeGameSession()}
        />
        <button type="button" onClick={() => newGameSession()}>
          Create new session
        </button>
      </div>
      {redirect}
    </>
  );
};

HomePage.propTypes = {
  authUser: propTypes.authUser.isRequired,
  updateAuthUser: PropTypes.func.isRequired,
  firebase: propTypes.firebase.isRequired
};

export default compose(withAuthentication, withFirebase)(HomePage);
