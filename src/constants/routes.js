const routes = {
  HOME: '/',

  GAME_SESSION: (gameSessionId = ":id") => `/gameSession/${gameSessionId}`
};

export default routes;
