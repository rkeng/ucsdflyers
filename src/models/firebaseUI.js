import { firebase } from './FlyersFirebase'
import firebaseui from 'firebaseui'
import { LoginUserAction } from '../State/actions' 
import { store } from '../State/store'


// FirebaseUI config.
const uiConfig = {
    signInSuccessUrl: '/',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,        
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
          signInSuccess: function(currentUser, credential, redirectUrl) {
            store.dispatch(LoginUserAction())
            // Do something.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            return true;
          }
        },
    // Terms of service url.
    tosUrl: '/About'
};

// Initialize the FirebaseUI Widget using Firebase.
const firebaseUI = new firebaseui.auth.AuthUI(firebase.auth());

export { firebaseUI, uiConfig }

//use ui it like follow: #(id of div)
// The start method will wait until the DOM is loaded.
//ui.start('#firebaseui-auth-container', uiConfig);