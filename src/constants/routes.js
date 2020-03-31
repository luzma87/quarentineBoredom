const routes = {
  HOME: "/",

  GAME_SESSION: (gameSessionId = ":id") => `/gameSession/${gameSessionId}`,
  GAME: (gameSessionId = ":sessionId", gameId = ":id") =>
    `/gameSession/${gameSessionId}/${gameId}`,
  SCORE: (gameSessionId = ":sessionId", gameId = ":id") =>
    `/gameSession/${gameSessionId}/${gameId}/score`,

  D3: "/d3"
};

export default routes;
