import { library } from '@fortawesome/fontawesome-svg-core';
import { faTireRugged as fadTireRugged } from '@fortawesome/pro-duotone-svg-icons';
import { faPenFancy, faSave } from '@fortawesome/pro-regular-svg-icons';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import routes from '../../constants/routes';
import FirebaseContext from '../firebase/context';
import Firebase from '../firebase/firebase';
import HomePage from '../home/HomePage';

library.add(
  faPenFancy,
  fadTireRugged,
  faSave,
);

function App() {
  return (
    <FirebaseContext.Provider value={new Firebase()}>
      <BrowserRouter>
        <Route exact path={routes.HOME} component={HomePage} />
      </BrowserRouter>
    </FirebaseContext.Provider>
  );
}

export default App;
