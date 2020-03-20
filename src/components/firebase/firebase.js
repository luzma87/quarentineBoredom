import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

class Firebase {
  constructor() {
    // console.log(config);
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.firestore();
  }

  // *** Auth API ***
  doSignInAnonymously() {
    return this.auth.signInAnonymously();
  }

  // *** Merge Auth and DB User API *** //
  onAuthUserListener(next, fallback) {
    return this.auth.onAuthStateChanged((authUser) => {
      const localUser = localStorage.getItem('user');
      if (authUser) {
        const mergedUser = {
          uid: authUser.uid,
          anonymous: authUser,
          username: localUser,
        }
        next(mergedUser);
      } else {
        fallback();
      }
    });
  }

  // *** user ***
  game(uid) {
    return this.db.collection('games').doc(uid);
  }

  games() {
    return this.db.collection('games');
  }
}

export default Firebase;
