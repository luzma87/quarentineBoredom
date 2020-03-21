import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { compose } from 'recompose';
import routes from '../../constants/routes';
import gameSessionsHooks from '../../hooks/gameSessionsHooks';
import withFirebase from '../firebase/withFirebase';
import withAuthentication from '../session/withAuthentication';
import CustomIconButton from '../_common/CustomButton';
import CustomSpinner from '../_common/CustomSpinner';
import ColumnsList from './ColumnsList';
import LettersList from './LettersList';
import PlayersList from './PlayersList';

const addPlayerToGameSession = (firebase, gameSession, username) => {
    const currentPlayers = gameSession.players || [];
    const mergedPlayers = [...currentPlayers, username];
    const mergedGameSession = { ...gameSession, players: mergedPlayers };
    if (currentPlayers.length === 0) {
        mergedGameSession.host = username;
    }
    firebase.gameSession(gameSession.id).set(mergedGameSession);
};

const removePlayer = (firebase, gameSession, username) => {
    const currentPlayers = gameSession.players || [];
    const newPlayers = currentPlayers.filter(p => p !== username);
    const mergedGameSession = { ...gameSession, players: newPlayers };
    firebase.gameSession(gameSession.id).set(mergedGameSession);
}

const removeColumn = (firebase, gameSession, column) => {
    const currentColumns = gameSession.columns || [];
    const newColumns = currentColumns.filter(c => c !== column);
    const mergedGameSession = { ...gameSession, columns: newColumns };
    firebase.gameSession(gameSession.id).set(mergedGameSession);
}

const addColumn = (firebase, gameSession, column) => {
    const currentColumns = gameSession.columns || [];
    const newColumns = (currentColumns.includes(column)) ? currentColumns : [...currentColumns, column];
    const mergedGameSession = { ...gameSession, columns: newColumns };
    firebase.gameSession(gameSession.id).set(mergedGameSession);
}

const saveLetter = (firebase, gameSession, letter) => {
    const currentLetters = gameSession.letters || [];
    const newLetters = [...currentLetters, letter];
    const mergedGameSession = { ...gameSession, letters: newLetters, currentLetter: letter };
    firebase.gameSession(gameSession.id).set(mergedGameSession);
}

const GameSessionPage = ({ firebase, authUser }) => {
    const [shouldRedirect, setRedirect] = useState(false);

    const { isLoading, gameSession } = gameSessionsHooks.useGameSession(firebase, authUser.gameSession);

    useEffect(() => {
        if (!authUser.username || !authUser.gameSession) {
            setRedirect(true);
        }
    }, [authUser]);

    if (shouldRedirect) return <Redirect to={routes.HOME} />

    if (!gameSession) {
        return (
            <div>
                Game session
                <CustomSpinner shown={isLoading} />
            </div>)
    }

    const players = gameSession.players || [];
    const columns = gameSession.columns || [];
    const letters = gameSession.letters || [];
    const username = authUser.username;

    const isPlayerInGameSession = players.includes(username);

    if (!isPlayerInGameSession) {
        addPlayerToGameSession(firebase, gameSession, username);
    }

    const isHost = gameSession.host === username;

    const onSaveLetter = (letter) => {
        saveLetter(firebase, gameSession, letter)
    }

    return (
        <div>
            Loaded Game session
            <PlayersList
                players={players}
                editable={isHost}
                onDelete={(player) => removePlayer(firebase, gameSession, player)} />
            <ColumnsList
                columns={columns}
                editable={isHost}
                onAdd={(column) => addColumn(firebase, gameSession, column)}
                onDelete={(column) => removeColumn(firebase, gameSession, column)} />
            <LettersList
                editable={isHost}
                letters={letters}
                onSave={(letter) => onSaveLetter(letter)} />

            <table border="1" style={{ margin: '16px 0' }}>
                <thead>
                    <tr>
                        <th></th>
                        {columns.map((column) => (
                            <th key={`c_${column}`}>{column}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {players.map((player) => (
                        <tr key={`p_${player}`}>
                            <td>{player}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <CustomIconButton
                icon={["fad", "alien-monster"]}
                label="Start"
                onClick={() => { }} />
        </div>)
};

GameSessionPage.propTypes = {
    authUser: PropTypes.shape({}),
    firebase: PropTypes.any,
};

export default compose(
    withAuthentication,
    withFirebase,
)(GameSessionPage);
