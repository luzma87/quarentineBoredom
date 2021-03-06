import { useEffect, useState } from "react";

const useGameSession = (firebase, gameSessionId) => {
  const [isLoading, setLoading] = useState(false);
  const [gameSession, setGameSession] = useState(null);
  useEffect(() => {
    if (gameSessionId) {
      setLoading(true);
      const firebaseRef = firebase
        .gameSession(gameSessionId)
        .onSnapshot(querySnapshot => {
          setGameSession(querySnapshot.data());
          setLoading(false);
        });
      return () => firebaseRef();
    }
    return null;
  }, [firebase, gameSessionId]);
  return {
    isLoading,
    gameSession
  };
};

const gameSessionsHooks = {
  useGameSession
};

export default gameSessionsHooks;
