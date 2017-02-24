import { firebase } from './FlyersFirebase'
import firebaseui from 'firebaseui';


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

// Initialize the FirebaseUI Widget using Firebase.
const firebaseUI = new firebaseui.auth.AuthUI(firebase.auth());

export { firebaseUI, uiConfig }

//use ui it like follow: #(id of div)
// The start method will wait until the DOM is loaded.
//ui.start('#firebaseui-auth-container', uiConfig);