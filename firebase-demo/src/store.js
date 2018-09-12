
// import { createStore, compose } from 'redux';
// import rootReducer from './reducer';
// import { firebase as fbConfig } from './firebase';
// import { reactReduxFirebase } from 'react-redux-firebase';
// import firebase from 'firebase';

// export default function configureStore(initialState) {
//   const rrfConfig = {
//     userProfile: 'users'
//   };

//   firebase.initializeApp(fbConfig);

//   const createStoreWithFirebase = compose(
//     reactReduxFirebase(firebase, rrfConfig),
//   )(createStore);

//   const store = createStoreWithFirebase(rootReducer, initialState);
//   return store;
// }