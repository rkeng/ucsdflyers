import { firebase } from './FlyersFirebase';
import { firebaseUI, uiConfig } from './firebaseUI';


const db = firebase.database();


/* fetch data from database
Example: get all the flyers
    fetchDataOn('events').then(function(events){ ... })
*/
export function fetchDataOn(node){
    return db.ref(node).once('value')
}


//sign out user
export function signOutUser(){
    return firebase.auth().signOut()
}


//onAuthStateChange:
//if you handler uses "this", you need to do binding
export function onAuthStateChanged(handler){
    firebase.auth().onAuthStateChanged(function(user){
        handler(user);
    }) 
}

//gives you the current user
export function getCurrentUser(){
    return new Promise((resolve, reject) => {
        onAuthStateChanged(function(user){
            if(user){
                resolve(user)
            } else {
                reject(new Error('User unAuthenticated'))
            }
        })
    })
}

export function startFirebaseUI(){
    return firebaseUI.start('#app', uiConfig)
}
