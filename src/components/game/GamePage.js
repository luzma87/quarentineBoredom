import React, { useEffect, useRef, useState } from "react";
import { Redirect } from "react-router-dom";
import { compose } from "recompose";
import propTypes from "../../constants/propTypes";
import routes from "../../constants/routes";
import gameSessionsHooks from "../../hooks/gameSessionsHooks";
import withFirebase from "../firebase/withFirebase";
import withAuthentication from "../session/withAuthentication";
import CustomSpinner from "../_common/CustomSpinner";

const GamePage = ({ firebase, authUser }) => {
  const [shouldRedirect, setRedirect] = useState(false);
  const [myStuff, setMyStuff] = useState(null);
  const inputRefs = useRef([]);
  const buttonRef = useRef();

  const { isLoading, gameSession } = gameSessionsHooks.useGameSession(
    firebase,
    authUser.gameSession
  );

  useEffect(() => {
    if (!authUser.username || !authUser.gameSession) {
      setRedirect(true);
    }
    if (gameSession && authUser) {
      setMyStuff(gameSession.currentGame.players[authUser.uid]);
      gameSession.currentGame.columns.forEach(() => {
        inputRefs.current.push(React.createRef());
      });
    }
  }, [authUser, gameSession]);

  if (shouldRedirect) return <Redirect to={routes.HOME} />;
  if (!gameSession || !myStuff) return <CustomSpinner shown={isLoading} />;

  const game = gameSession.currentGame;
  const playersArray = Object.values(game.players);
  const readyPlayers = playersArray.filter(p => p.ready).length;
  const totalPlayers = playersArray.length;
  const { firstReady } = game;

  if (readyPlayers === totalPlayers)
    return <Redirect to={routes.SCORE(gameSession.id, game.id)} />;

  const onChangeValue = ev => {
    const myNewCols = { ...myStuff.columns };
    myNewCols[ev.target.id].value = ev.target.value;
    const myNewStuff = { ...myStuff, columns: myNewCols };
    setMyStuff(myNewStuff);
  };

  const onKeyPress = (ev, curr) => {
    if (ev.charCode === 13) {
      if (curr <= game.columns.length - 2) {
        inputRefs.current[curr + 1].current.focus();
      } else {
        buttonRef.current.focus();
      }
    }
  };

  const onReady = () => {
    const myMergedStuff = { ...myStuff, ready: true };
    const mergedPlayers = { ...game.players, [authUser.uid]: myMergedStuff };
    const mergedCurrentGame = { ...game, players: mergedPlayers };
    if (readyPlayers === 0) {
      mergedCurrentGame.firstReady = authUser.uid;
    }
    const mergedGameSession = {
      ...gameSession,
      currentGame: mergedCurrentGame
    };

    firebase.gameSession(gameSession.id).set(mergedGameSession);
  };

  const onDone = () => {
    const playerEntries = Object.entries(game.players);
    const mergedPlayers = playerEntries.reduce((acc, [id, player]) => {
      const accumulated = { ...acc };
      accumulated[id] = { ...player, ready: true };
      return accumulated;
    }, {});
    const mergedCurrentGame = { ...game, players: mergedPlayers };
    const mergedGameSession = {
      ...gameSession,
      currentGame: mergedCurrentGame
    };

    firebase.gameSession(gameSession.id).set(mergedGameSession);
  };

  return (
    <div>
      <hr />
      <div>
        Hey
        {authUser.username}
      </div>
      <div>
        Current letter:
        {game.letter}
      </div>
      <div>
        {readyPlayers === 0 ? "No one's ready yet!" : null}
        {readyPlayers > 0 && readyPlayers < totalPlayers
          ? `${readyPlayers} players are ready!!`
          : null}
        {readyPlayers === totalPlayers ? "All done!" : null}
      </div>
      <div>
        <table border="1">
          <thead>
            <tr>
              {Object.keys(myStuff.columns).map(colName => (
                <th key={`header_${colName}`}>{colName}</th>
              ))}
              <th>Done?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {Object.entries(myStuff.columns).map(
                ([colName, colContents], i) => (
                  <td key={`contents_${colName}`}>
                    {myStuff.ready ? (
                      colContents.value
                    ) : (
                      <input
                        // eslint-disable-next-line jsx-a11y/no-autofocus
                        autoFocus={i === 0}
                        ref={inputRefs.current[i]}
                        id={colName}
                        onChange={ev => onChangeValue(ev)}
                        placeholder={colName}
                        value={colContents.value}
                        onKeyPress={ev => onKeyPress(ev, i)}
                      />
                    )}
                  </td>
                )
              )}
              <td>
                {myStuff.ready ? null : (
                  <button
                    ref={buttonRef}
                    type="button"
                    onClick={() => onReady()}
                  >
                    done!
                  </button>
                )}
                {myStuff.ready && firstReady === authUser.uid ? (
                  <button
                    ref={buttonRef}
                    type="button"
                    onClick={() => onDone()}
                  >
                    FINISH!
                  </button>
                ) : null}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

GamePage.propTypes = {
  authUser: propTypes.authUser.isRequired,
  firebase: propTypes.firebase.isRequired
};

export default compose(withAuthentication, withFirebase)(GamePage);
