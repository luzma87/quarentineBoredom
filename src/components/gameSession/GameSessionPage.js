import { hri } from 'big-human-readable-ids';
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
import propTypes from '../../constants/propTypes';

const addPlayerToGameSession = (firebase, gameSession, username, id) => {
    const currentPlayers = gameSession.players || [];
    const mergedPlayers = [...currentPlayers, { username, id }];
    const mergedGameSession = { ...gameSession, players: mergedPlayers };
    if (currentPlayers.length === 0) {
        mergedGameSession.host = username;
    }
    firebase.gameSession(gameSession.id).set(mergedGameSession);
};

const removePlayer = (firebase, gameSession, username) => {
    const currentPlayers = gameSession.players || [];
    const newPlayers = currentPlayers.filter(p => p.username !== username);
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

const GameSessionPage = ({ firebase, authUser, updateAuthUser }) => {
    const [shouldRedirect, setRedirect] = useState(false);

    const { isLoading, gameSession } = gameSessionsHooks.useGameSession(firebase, authUser.gameSession);

    useEffect(() => {
        if (!authUser.username || !authUser.gameSession) {
            setRedirect(true);
        }
    }, [authUser]);

    if (shouldRedirect) return <Redirect to={routes.HOME} />;

    if (!gameSession) return <CustomSpinner shown={isLoading} />;

    if (gameSession.currentGame.started) {
        const gameId = gameSession.currentGame.id;
        return <Redirect to={routes.GAME(gameSession.id, gameId)} />;
    }

    const players = gameSession.players || [];
    const columns = gameSession.columns || [];
    const letters = gameSession.letters || [];
    const username = authUser.username;
    const userId = authUser.uid;

    const isPlayerInGameSession = players.filter(p => p.username === username).length > 0;

    if (!isPlayerInGameSession) {
        addPlayerToGameSession(firebase, gameSession, username, userId);
    }

    const isHost = gameSession.host === username;

    const onSaveLetter = (letter) => {
        saveLetter(firebase, gameSession, letter)
    }
    const onStartGame = () => {
        const gameId = hri.random();
        let letter = gameSession.currentLetter;
        const gameHistory = gameSession.gameHistory || [];
        let mergedGameSession = { ...gameSession, gameHistory };
        if (!letter) {
            const charset = 'abcdefghijklmnopqrstuvwxyz';
            letter = charset[Math.floor(Math.random() * charset.length)];

            const currentLetters = gameSession.letters || [];
            const newLetters = [...currentLetters, letter];
            mergedGameSession = { ...mergedGameSession, letters: newLetters, currentLetter: letter };

        }
        const gamePlayers = players.reduce((acc, player) => {
            const accumulated = { ...acc };
            const columnsForPlayer = columns.reduce((acc, column) => {
                const accumulated = { ...acc };
                accumulated[column] = { value: "", score: 0 };
                return accumulated;
            }, {});
            accumulated[player.id] = { ...player, ready: false, columns: columnsForPlayer };
            return accumulated;
        }, {});
        const game = {
            id: gameId,
            letter: letter,
            players: gamePlayers,
            columns,
            started: true,
        };
        mergedGameSession.currentGame = game;
        firebase.gameSession(gameSession.id).set(mergedGameSession);
        localStorage.game = gameId;
        updateAuthUser({ game: gameId });
    }

    return (
        <div>
            Hi {authUser.username}<br />
            Game session by {gameSession.host}
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

            {isHost
                ? <CustomIconButton
                    icon={["fad", "alien-monster"]}
                    label="Start"
                    onClick={() => onStartGame()} />
                : null}
        </div>)
};

GameSessionPage.propTypes = {
    authUser: propTypes.authUser,
    updateAuthUser: PropTypes.func,
    firebase: propTypes.firebase,
};

export default compose(
    withAuthentication,
    withFirebase,
)(GameSessionPage);
