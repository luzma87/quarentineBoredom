import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { compose } from 'recompose';
import withFirebase from '../firebase/withFirebase';
import withAuthentication from '../session/withAuthentication';
import CustomIcon from '../_common/CustomIcon';
import routes from '../../constants/routes';

// sedative-dualist-ware-lonesomely-6035

const HomePage = ({ firebase, authUser, updateAuthUser }) => {
    console.log("HOME", authUser);

    const [localUsername, setLocalUsername] = useState("");
    const [localGameSession, setLocalGameSession] = useState("");
    const [modifyingUser, setModifyingUser] = useState(false);
    const [modifyingSession, setModifyingSession] = useState(false);
    const [shouldRedirect, setRedirect] = useState(false);

    useEffect(() => {
        let setValues = 0;
        if (!authUser.username) {
            setModifyingUser(true);
        } else {
            setLocalUsername(authUser.username);
            setValues += 1;
        }
        if (!authUser.gameSession) {
            setModifyingSession(true);
        } else {
            setLocalGameSession(authUser.gameSession);
            setValues += 1;
        }
        if (setValues === 2) {
            setRedirect(true);
        }
    }, [authUser]);

    const onChangeInput = (ev) => {
        const value = ev.target.value.trim();
        switch (ev.target.id) {
            case 'username':
                setLocalUsername(value);
                break;
            case 'sessionId':
                setLocalGameSession(value);
                break;
            default:
        }
    };

    const onSaveUsername = () => {
        localStorage.setItem('user', localUsername);
        updateAuthUser({ username: localUsername });
        setModifyingUser(false);
    }

    const onSaveGameSession = () => {
        localStorage.setItem('gameSession', localGameSession);
        updateAuthUser({ gameSession: localGameSession });
        setModifyingSession(false);
    }

    const onClickChangeUsername = () => {
        setModifyingUser(true);
    }

    const onClickChangeGameSession = () => {
        setModifyingSession(true);
    }

    let userInput = (
        <>
            {authUser.username}
            <button
                type="button"
                onClick={() => onClickChangeUsername()}>
                <CustomIcon icon="pen-fancy" />
            </button>
        </>
    );
    if (modifyingUser) {
        userInput = (
            <>
                <input
                    id="username"
                    value={localUsername}
                    type="text"
                    placeholder="username"
                    onChange={ev => onChangeInput(ev)}
                />
                <button
                    type="button"
                    onClick={() => onSaveUsername()}>
                    <CustomIcon icon="save" />
                </button>
            </>
        );
    }
    let sessionInput = (
        <>
            {authUser.gameSession}
            <button
                type="button"
                onClick={() => onClickChangeGameSession()}>
                <CustomIcon icon="pen-fancy" />
            </button>
        </>
    );
    if (modifyingSession) {
        sessionInput = (
            <>
                <input
                    id="sessionId"
                    value={localGameSession}
                    type="text"
                    placeholder="session id"
                    onChange={ev => onChangeInput(ev)}
                />
                <button
                    type="button"
                    onClick={() => onSaveGameSession()}>
                    <CustomIcon icon="save" />
                </button>
            </>
        )
    }
    let redirect = null;
    if (shouldRedirect) {
        redirect = <Redirect to={routes.GAME_SESSION(localGameSession)} />
    }
    return (<div>
        Welcome,
        {userInput}!
        {sessionInput}
        {redirect}
    </div>)
};

HomePage.propTypes = {
    authUser: PropTypes.shape({}),
    updateAuthUser: PropTypes.func,
    firebase: PropTypes.any,
};

export default compose(
    withAuthentication,
    withFirebase,
)(HomePage);
