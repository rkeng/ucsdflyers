import { firebase } from './FlyersFirebase'
import firebaseui from 'firebaseui'
import { fetchDataOn } from './index'
import { browserHistory } from 'react-router'
 
// FirebaseUI config.
const uiConfig = {
    callbacks: {
        signInSuccess: function(user, credential, redirectUrl) {

            /*
                Below function call: 
                when user login, check if they are first time user (just signed up).
                if yes, then create a datafield on db for them.
                if not, skip~
            */
                const userField = 'users/' + user.uid;
                fetchDataOn(userField).then(userField => {     
                    if(!userField.val()){    
                        const userFieldData = {
                            displayName: user.displayName,
                            email: user.email,
                            emailVerified: user.emailVerified,
                            isAnonymous: user.isAnonymous,
                            photoURL: user.photoURL,
                            providerData: user.providerData,
                            uid: user.uid,          
                            isOrg: false
                        }
                        firebase.database().ref('users/' + user.uid).set(userFieldData);
                        firebase.database().ref('students/' + user.uid).set(user.uid);
                    }
                    //manully redict since auto-redirect is not working
                    browserHistory.push('/events')
                })
            }
        /* use below for a custom loader!!!! we love it!

          uiShown: function() {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('loader').style.display = 'none';
          }
        */
    },
    signInSuccessUrl: '/events',
    signInFlow: 'redirect',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,        
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    ],
    // Terms of service url.
    tosUrl: '/events'
};

// Initialize the FirebaseUI Widget using Firebase.
const firebaseUI = new firebaseui.auth.AuthUI(firebase.auth());

export { firebaseUI, uiConfig }

//use ui it like follow: #(id of div)
// The start method will wait until the DOM is loaded.
//ui.start('#firebaseui-auth-container', uiConfig);