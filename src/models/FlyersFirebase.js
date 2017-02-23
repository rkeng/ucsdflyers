import * as firebase from 'firebase'
import firebaseui from 'firebaseui';

// firebase config
const firebaseConfig = {
  apiKey: 'AIzaSyChSsnK4JgnlhG0Hrr-aL3xh1M-1rHaMUc',
  authDomain: 'ucsd-flyers.firebaseapp.com',
  databaseURL: 'https://ucsd-flyers.firebaseio.com',
  storageBucket: 'ucsd-flyers.appspot.com',
  messagingSenderId: '733909365468'
}

// FirebaseUI config.
const uiConfig = {
    signInSuccessUrl: '/',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,        
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    ],
    // Terms of service url.
    tosUrl: '/About'
};

// initialize our firebase app
firebase.initializeApp(firebaseConfig)

// Initialize the FirebaseUI Widget using Firebase.
const ui = new firebaseui.auth.AuthUI(firebase.auth());

export { firebase, ui, uiConfig };

//use ui it like follow: #(id of div)
// The start method will wait until the DOM is loaded.
//ui.start('#firebaseui-auth-container', uiConfig);