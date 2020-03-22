const routes = {
  HOME: '/',

  GAME_SESSION: (gameSessionId = ':id') => `/gameSession/${gameSessionId}`,
  GAME: (gameSessionId = ':sessionId', gameId = ':id') => `/gameSession/${gameSessionId}/${gameId}`,
  SCORE: (gameSessionId = ':sessionId', gameId = ':id') => `/gameSession/${gameSessionId}/${gameId}/score`,
};

export default routes;
