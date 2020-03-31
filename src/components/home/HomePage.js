import { hri } from "big-human-readable-ids";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { compose } from "recompose";
import propTypes from "../../constants/propTypes";
import routes from "../../constants/routes";
import withFirebase from "../firebase/withFirebase";
import withAuthentication from "../session/withAuthentication";
import InputOrLabel from "./InputOrLabel";
import Content from "../_common/Content";

const newSession = (firebase, id) => {
  const newGameSession = {
    id,
    date: new Date()
  };
  firebase.gameSession(id).set(newGameSession);
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

  return (
    <Content className="welcome">
      <div className="row">
        <div className="label">Nickname:</div>
        <div>
          <InputOrLabel
            flag={modifyingUser}
            id="username"
            value={localUsername}
            label="How should we call you?"
            onChange={ev => onChangeInput(ev)}
            onSave={() => onSaveUsername()}
            onModify={() => onClickChangeUsername()}
          />
        </div>
      </div>
      <div className="row">
        <div className="label">Join a game:</div>
        <div>
          <InputOrLabel
            flag={modifyingSession}
            id="sessionId"
            value={localGameSession}
            label="Session id"
            onChange={ev => onChangeInput(ev)}
            onSave={() => onSaveGameSession()}
            onModify={() => onClickChangeGameSession()}
          />
        </div>
        <div style={{ marginLeft: "10px" }}>
          <button type="button" onClick={() => newGameSession()}>
            Create new game
          </button>
        </div>
      </div>
    </Content>
  );
};

HomePage.propTypes = {
  authUser: propTypes.authUser.isRequired,
  updateAuthUser: PropTypes.func.isRequired,
  firebase: propTypes.firebase.isRequired
};

export default compose(withAuthentication, withFirebase)(HomePage);
