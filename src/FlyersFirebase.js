import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCZ1XQNGATdZvIsDp2lKxhqrkpxdy6xthE",
    authDomain: "fir-react-redux-auth-test.firebaseapp.com",
    databaseURL: "https://fir-react-redux-auth-test.firebaseio.com",
    storageBucket: "fir-react-redux-auth-test.appspot.com",
    messagingSenderId: "1027700903294"
};

firebase.initializeApp(firebaseConfig);

export { firebase };