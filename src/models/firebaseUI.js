import { firebase } from './FlyersFirebase'
import firebaseui from 'firebaseui'
import { getCurrentUser, fetchDataOn } from './index'


// FirebaseUI config.
const uiConfig = {
    callbacks: {
        signInSuccess: function(currentUser, credential, redirectUrl) {
            getCurrentUser().then(user => {
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
                                uid: user.uid          
                            }
                            firebase.database().ref('users/' + user.uid).set(userFieldData);
                            firebase.database().ref('students/' + user.uid).set(user.uid);
                        }
                    })
                })
            }
    },
    signInSuccessUrl: '/events',
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