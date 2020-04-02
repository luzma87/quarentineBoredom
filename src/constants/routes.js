const routes = {
  HOME: "/",

  GAME_SESSION: (gameSessionId = ":id") => `/gameSession/${gameSessionId}`,
  GAME: (gameSessionId = ":sessionId", gameId = ":id") =>
    `/gameSession/${gameSessionId}/${gameId}`,
  SCORE: (gameSessionId = ":sessionId", gameId = ":id") =>
    `/gameSession/${gameSessionId}/${gameId}/score`,

  D3: "/d3",
  D3_2: "/d3_2"
};

export default routes;
