import { useEffect, useState } from 'react';

const useGameSession = (firebase, gameSessionId) => {
    const [isLoading, setLoading] = useState(false);
    const [gameSession, setGameSession] = useState(null);
    useEffect(() => {
        setLoading(true);
        const firebaseRef = (firebase.gameSession(gameSessionId)
            .onSnapshot((querySnapshot) => {
                setGameSession(querySnapshot.data());
                setLoading(false);
            }));
        return () => firebaseRef();
    }, [firebase, gameSessionId]);
    return {
        isLoading, gameSession,
    };
};

const gameSessionsHooks = {
    useGameSession,
};

export default gameSessionsHooks;