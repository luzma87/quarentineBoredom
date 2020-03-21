const routes = {
  HOME: '/',

  GAME_SESSION: (gameSessionId = ":id") => `/game/${gameSessionId}`
};

export default routes;
