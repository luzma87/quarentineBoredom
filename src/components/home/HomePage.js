import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import withAuthentication from '../session/withAuthentication';
import CustomIcon from '../_common/CustomIcon';

// sedative-dualist-ware-lonesomely-6035

const HomePage = ({ authUser, updateAuthUser }) => {
    console.log("HOME", authUser);

    const [username, setUsername] = useState("");
    const [gameSession, setGameSession] = useState("");
    const [modifyingUser, setModifyingUser] = useState(false);
    const [modifyingSession, setModifyingSession] = useState(false);

    useEffect(() => {
        if (!authUser.username) {
            setModifyingUser(true);
        } else {
            setUsername(authUser.username);
        }
        if (!authUser.gameSession) {
            setModifyingSession(true);
        } else {
            setGameSession(authUser.gameSession);
        }
    }, [authUser]);

    const onChangeInput = (ev) => {
        const value = ev.target.value;
        switch (ev.target.id) {
            case 'username':
                setUsername(value);
                break;
            case 'sessionId':
                setGameSession(value);
                break;
            default:
        }
    };

    const onSaveUsername = () => {
        localStorage.setItem('user', username);
        updateAuthUser({ username });
        setModifyingUser(false);
    }

    const onSaveGameSession = () => {
        localStorage.setItem('gameSession', gameSession);
        updateAuthUser({ gameSession });
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
                    value={username}
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
                    value={gameSession}
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
    return (<div>
        Welcome,
        {userInput}!
        {sessionInput}
    </div>)
};

HomePage.propTypes = {
    authUser: PropTypes.shape({}),
    updateAuthUser: PropTypes.func
};

export default withAuthentication(HomePage);
