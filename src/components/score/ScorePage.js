import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { compose } from 'recompose';
import propTypes from '../../constants/propTypes';
import routes from '../../constants/routes';
import gameSessionsHooks from '../../hooks/gameSessionsHooks';
import withFirebase from '../firebase/withFirebase';
import withAuthentication from '../session/withAuthentication';
import CustomSpinner from '../_common/CustomSpinner';

const INC = "inc";
const DEC = "dec";

const ScorePage = ({ firebase, authUser }) => {
    const [shouldRedirect, setRedirect] = useState(false);
    const { isLoading, gameSession } = gameSessionsHooks.useGameSession(firebase, authUser.gameSession);
    const [currentGame, setCurrentGame] = useState(null);
    const [scoresCalculated, setScoresCalculated] = useState(false);

    useEffect(() => {
        if (!authUser.username || !authUser.gameSession) {
            setRedirect(true);
        }
        if (gameSession) {
            setCurrentGame(gameSession.currentGame);
        }
    }, [authUser, gameSession]);

    if (shouldRedirect) return <Redirect to={routes.HOME} />;
    if (!gameSession || !currentGame) return <CustomSpinner shown={isLoading} />;

    const { players } = currentGame;

    if (!scoresCalculated) {
        setScoresCalculated(true);
        const words = {};

        Object.entries(players).forEach(([id, player]) => {
            Object.entries(player.columns).forEach(([colName, colContents]) => {
                const word = colContents.value;
                if (word !== "") {
                    if (!words[word]) words[word] = 0;
                    words[word] += 1;
                }
            })
        });

        Object.entries(players).forEach(([id, player]) => {
            Object.entries(player.columns).forEach(([colName, colContents]) => {
                const word = colContents.value;
                if (word !== "") {
                    if (words[word] === 1) {
                        colContents.score = 3;
                    } else {
                        colContents.score = 1
                    }
                }
            })
        });
    }

    const increaseScore = (score) => {
        if (score === 0) return 1;
        return 3;
    }

    const decreaseScore = (score) => {
        if (score === 3) return 1;
        return 0;
    }

    const onChangeScore = (id, colName, score, type) => {
        let newScore;
        if (type === INC) {
            newScore = increaseScore(score);
        } else {
            newScore = decreaseScore(score);
        }
        const newCol = { ...currentGame.players[id].columns[colName], score: newScore };
        const newColumns = { ...currentGame.players[id].columns, [colName]: newCol };
        const newPlayer = { ...currentGame.players[id], columns: newColumns };
        const mergedPlayers = { ...currentGame.players, [id]: newPlayer };
        const mergedCurrentGame = { ...currentGame, players: mergedPlayers };

        setCurrentGame(mergedCurrentGame);
    }

    const onPlayAgain = () => {
        console.log(gameSession);
        const newGameSession = { ...gameSession };

        newGameSession.gameHistory.push(currentGame);

        console.log(newGameSession);
    }

    return (
        <>
            <div>Score</div>
            <table border="1">
                <thead>
                    <tr>
                        <th>Player</th>
                        {currentGame.columns.map(col => (
                            <th key={`col_${col}`}>{col}</th>
                        ))}
                        <th>TOTAL</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(players).map(([id, player]) => {
                        let total = 0;
                        return (
                            <tr key={id}>
                                <th>{player.username}</th>
                                {Object.entries(player.columns).map(([colName, colContents]) => {
                                    const { value, score } = colContents;
                                    total += score;
                                    return (
                                        <td key={`${id}_${colName}`}>
                                            <div>
                                                {value === "" ? "-" : value}
                                            </div>
                                            <div>
                                                {score}
                                                <button onClick={() => onChangeScore(id, colName, score, INC)}>
                                                    +
                                            </button>
                                                <button onClick={() => onChangeScore(id, colName, score, DEC)}>
                                                    -
                                            </button>
                                            </div>
                                        </td>
                                    )
                                })}
                                <td>{total}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <button onClick={() => onPlayAgain()}>
                Play again
            </button>
        </>
    )
}

ScorePage.propTypes = {
    authUser: propTypes.authUser,
    firebase: propTypes.firebase,
};

export default compose(
    withAuthentication,
    withFirebase
)(ScorePage);
