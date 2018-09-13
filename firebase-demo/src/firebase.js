import firebase from 'firebase';
// this our firebase config file with the data explicit to this specific database and where we connect firebase to our app.
const config = {
  apiKey: 'AIzaSyC1p8mITlJBI2Ufn0Tb9kTbM-8M9wW9FRs',
  authDomain: 'fir-demo-be77a.firebaseapp.com',
  databaseURL: 'https://fir-demo-be77a.firebaseio.com',
  projectId: 'fir-demo-be77a',
  storageBucket: 'fir-demo-be77a.appspot.com',
  messagingSenderId: '1057048366906'
};

firebase.initializeApp(config);

export default firebase;