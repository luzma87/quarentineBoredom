import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAlienMonster as fadAlienMonster,
  faBullseyeArrow as fadBullseyeArrow,
  faGhost as fadGhost,
  faTireRugged as fadTireRugged
} from "@fortawesome/pro-duotone-svg-icons";
import {
  faBackspace,
  faPenFancy,
  faSave,
  faTrashAlt
} from "@fortawesome/pro-regular-svg-icons";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import routes from "../../constants/routes";
import D3DemoPage from "../d3/D3DemoPage";
import FirebaseContext from "../firebase/context";
import Firebase from "../firebase/firebase";
import GamePage from "../game/GamePage";
import GameSessionPage from "../gameSession/GameSessionPage";
import HomePage from "../home/HomePage";
import ScorePage from "../score/ScorePage";
import NotFound from "./NotFound";
import D3Demo2Page from "../d3-2/D3Demo2Page";

library.add(
  faPenFancy,
  fadTireRugged,
  faSave,
  faTrashAlt,
  fadAlienMonster,
  fadBullseyeArrow,
  fadGhost,
  faBackspace
);

const App = () => (
  <FirebaseContext.Provider value={new Firebase()}>
    <BrowserRouter>
      <Switch>
        <Route exact path={routes.HOME} component={HomePage} />

        <Route exact path={routes.SCORE()} component={ScorePage} />
        <Route exact path={routes.GAME()} component={GamePage} />
        <Route exact path={routes.GAME_SESSION()} component={GameSessionPage} />

        <Route exact path={routes.D3} component={D3DemoPage} />
        <Route exact path={routes.D3_2} component={D3Demo2Page} />

        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  </FirebaseContext.Provider>
);

export default App;
