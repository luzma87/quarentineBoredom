import { hri } from "big-human-readable-ids";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { compose } from "recompose";
import propTypes from "../../constants/propTypes";
import routes from "../../constants/routes";
import gameSessionsHooks from "../../hooks/gameSessionsHooks";
import withFirebase from "../firebase/withFirebase";
import withAuthentication from "../session/withAuthentication";
import ConditionalComponent from "../_common/ConditionalComponent";
import CustomIconButton from "../_common/CustomButton";
import CustomSpinner from "../_common/CustomSpinner";
import ColumnsList from "./ColumnsList";
import LettersList from "./LettersList";
import PlayersList from "./PlayersList";

const addPlayerToGameSession = (firebase, gameSession, username, id) => {
  const currentPlayers = gameSession.players || [];
  const mergedPlayers = [...currentPlayers, { username, id }];
  const mergedGameSession = { ...gameSession, players: mergedPlayers };
  if (currentPlayers.length === 0) {
    mergedGameSession.host = { id, username };
  }
  firebase.gameSession(gameSession.id).set(mergedGameSession);
};

const removePlayer = (firebase, gameSession, username) => {
  const currentPlayers = gameSession.players || [];
  const newPlayers = currentPlayers.filter(p => p.username !== username);
  const mergedGameSession = { ...gameSession, players: newPlayers };
  firebase.gameSession(gameSession.id).set(mergedGameSession);
};

const removeColumn = (firebase, gameSession, column) => {
  const currentColumns = gameSession.columns || [];
  const newColumns = currentColumns.filter(c => c !== column);
  const mergedGameSession = { ...gameSession, columns: newColumns };
  firebase.gameSession(gameSession.id).set(mergedGameSession);
};

const addColumn = (firebase, gameSession, column) => {
  const currentColumns = gameSession.columns || [];
  const newColumns = currentColumns.includes(column)
    ? currentColumns
    : [...currentColumns, column];
  const mergedGameSession = { ...gameSession, columns: newColumns };
  firebase.gameSession(gameSession.id).set(mergedGameSession);
};

const saveLetter = (firebase, gameSession, letter) => {
  const mergedGameSession = { ...gameSession, currentLetter: letter };
  firebase.gameSession(gameSession.id).set(mergedGameSession);
};

const GameSessionPage = ({ firebase, authUser, updateAuthUser }) => {
  const [shouldRedirect, setRedirect] = useState(false);
  const [backToSession, setBackToSession] = useState(false);

  const { isLoading, gameSession } = gameSessionsHooks.useGameSession(
    firebase,
    authUser.gameSession
  );

  useEffect(() => {
    if (!authUser.username || !authUser.gameSession) {
      setRedirect(true);
    }
  }, [authUser]);

  if (shouldRedirect) {
    return <Redirect to={routes.HOME} />;
  }

  if (!gameSession) {
    return <CustomSpinner shown={isLoading} />;
  }

  if (gameSession.currentGame && gameSession.currentGame.started) {
    const gameId = gameSession.currentGame.id;
    return <Redirect to={routes.GAME(gameSession.id, gameId)} />;
  }
  if (backToSession) {
    return <Redirect to={routes.HOME} />;
  }

  const players = gameSession.players || [];
  const columns = gameSession.columns || [];
  const letters = gameSession.letters || [];
  const { username } = authUser;
  const userId = authUser.uid;
  const host = gameSession.host || {};

  const isPlayerInGameSession =
    players.filter(p => p.username === username).length > 0;

  if (!isPlayerInGameSession) {
    addPlayerToGameSession(firebase, gameSession, username, userId);
  }

  const isHost = gameSession.host && gameSession.host.id === userId;

  const onSaveLetter = letter => {
    saveLetter(firebase, gameSession, letter);
  };

  const onStartNewSession = () => {
    localStorage.removeItem("gameSession");
    setBackToSession(true);
  };

  const onStartGame = () => {
    const gameId = hri.random();
    let letter = gameSession.currentLetter;
    const gameHistory = gameSession.gameHistory || [];
    let mergedGameSession = { ...gameSession, gameHistory };
    if (!letter) {
      const charset = "abcdefghijklmnopqrstuvwxyz";
      letter = charset[Math.floor(Math.random() * charset.length)];

      const currentLetters = gameSession.letters || [];
      const newLetters = [...currentLetters, letter];
      mergedGameSession = {
        ...mergedGameSession,
        letters: newLetters,
        currentLetter: letter
      };
    }
    const gamePlayers = players.reduce((acc, player) => {
      const accumulated = { ...acc };
      const columnsForPlayer = columns.reduce((acc2, column) => {
        const accumulated2 = { ...acc2 };
        accumulated2[column] = { value: "", score: 0 };
        return accumulated2;
      }, {});
      accumulated[player.id] = {
        ...player,
        ready: false,
        columns: columnsForPlayer
      };
      return accumulated;
    }, {});
    const game = {
      id: gameId,
      letter,
      players: gamePlayers,
      columns,
      started: true
    };
    mergedGameSession.currentGame = game;
    firebase.gameSession(gameSession.id).set(mergedGameSession);
    localStorage.game = gameId;
    updateAuthUser({ game: gameId });
  };

  return (
    <div style={{ padding: "5%", display: "flex", flexDirection: "column" }}>
      <div>Hi {authUser.username}</div>
      <div>
        {"Game session id "}
        <span className="label">{gameSession.id}</span>
        {`started by ${host.username}`}
      </div>
      <PlayersList
        players={players}
        editable={isHost}
        onDelete={player => removePlayer(firebase, gameSession, player)}
      />
      <ColumnsList
        columns={columns}
        editable={isHost}
        onAdd={column => addColumn(firebase, gameSession, column)}
        onDelete={column => removeColumn(firebase, gameSession, column)}
      />
      <LettersList
        editable={isHost}
        letters={letters}
        onSave={letter => onSaveLetter(letter)}
      />
      <div style={{ margin: "16px 0", display: "flex" }}>
        <div className="label">Current letter:</div>
        {gameSession.currentLetter}
      </div>
      <div style={{ margin: "16px 0" }}>
        <ConditionalComponent visible={isHost}>
          <CustomIconButton
            icon={["fad", "alien-monster"]}
            label="Start"
            onClick={() => onStartGame()}
            style={{ marginRight: 16 }}
          />
        </ConditionalComponent>
        <ConditionalComponent visible={isHost}>
          <CustomIconButton
            icon={["fad", "alien-monster"]}
            label="Start new session"
            onClick={() => onStartNewSession()}
          />
        </ConditionalComponent>
      </div>
    </div>
  );
};

GameSessionPage.propTypes = {
  authUser: propTypes.authUser.isRequired,
  updateAuthUser: PropTypes.func.isRequired,
  firebase: propTypes.firebase.isRequired
};

export default compose(withAuthentication, withFirebase)(GameSessionPage);
