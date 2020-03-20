import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import withAuthentication from '../session/withAuthentication';
import CustomIcon from '../_common/CustomIcon';

const SETTING_USER = 'SETTING_USER';

const HomePage = ({ authUser }) => {
    console.log("HOME", authUser);

    const [username, setUsername] = useState("");
    const [status, setStatus] = useState("");
    useEffect(() => {
        if (!authUser.username) {
            setStatus(SETTING_USER);
        } else {
            setUsername(authUser.username);
        }
    }, [authUser]);

    const onChangeUsername = (ev) => {
        const value = ev.target.value;
        setUsername(value);
        localStorage.setItem('user', value);
    };

    const onClickSetUsername = () => {
        window.location.reload();
    }

    const onClickChangeUsername = () => {
        setStatus(SETTING_USER);
    }
    let userInput = authUser.username;
    if (status === SETTING_USER) {
        userInput = (
            <>
                <input
                    value={username}
                    type="text"
                    placeholder="username"
                    onChange={ev => onChangeUsername(ev)}
                />
                <button
                    type="button"
                    onClick={() => onClickSetUsername()}>
                    Continuar
                </button>
            </>
        );
    }
    return (<div>
        Welcome,
        {userInput}!
        <button
            type="button"
            onClick={() => onClickChangeUsername()}>
            <CustomIcon icon="pen-fancy" />
        </button>
    </div>)
};

HomePage.propTypes = {
    authUser: PropTypes.shape({}),
};

export default withAuthentication(HomePage);
