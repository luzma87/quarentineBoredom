import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { compose } from 'recompose';
import routes from '../../constants/routes';
import withAuthentication from '../session/withAuthentication';
import InputOrLabel from './InputOrLabel';

// sedative-dualist-ware-lonesomely-6035

const HomePage = ({ authUser, updateAuthUser }) => {
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

    const redirect = shouldRedirect
        ? (<Redirect to={routes.GAME_SESSION(localGameSession)} />)
        : null;
    return (<>
        <div>
            Welcome  &nbsp;
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
        </div>
        {redirect}
    </>)
};

HomePage.propTypes = {
    authUser: PropTypes.shape({}),
    updateAuthUser: PropTypes.func,
};

export default compose(
    withAuthentication,
)(HomePage);
