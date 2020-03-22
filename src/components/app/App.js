import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAlienMonster as fadAlienMonster,
  faTireRugged as fadTireRugged
} from "@fortawesome/pro-duotone-svg-icons";
import {
  faPenFancy,
  faSave,
  faTrashAlt
} from "@fortawesome/pro-regular-svg-icons";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import routes from "../../constants/routes";
import FirebaseContext from "../firebase/context";
import Firebase from "../firebase/firebase";
import GamePage from "../game/GamePage";
import GameSessionPage from "../gameSession/GameSessionPage";
import HomePage from "../home/HomePage";
import ScorePage from "../score/ScorePage";
import NotFound from "./NotFound";

library.add(faPenFancy, fadTireRugged, faSave, faTrashAlt, fadAlienMonster);

const App = () => (
  <FirebaseContext.Provider value={new Firebase()}>
    <BrowserRouter>
      <Switch>
        <Route exact path={routes.HOME} component={HomePage} />

        <Route exact path={routes.SCORE()} component={ScorePage} />
        <Route exact path={routes.GAME()} component={GamePage} />
        <Route exact path={routes.GAME_SESSION()} component={GameSessionPage} />

        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  </FirebaseContext.Provider>
);

export default App;
