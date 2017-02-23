import { firebase } from './FlyersFirebase';

const db = firebase.database();


/* fetch data from database
Example: get all the flyers
    fetch('events').then(function(events){ ... })
*/
export function fetch(node){
    return db.ref(node).once('value')
}

//sign out user
export function signOutUser(){
    firebase.auth().signOut()
        .then(() => {console.log('Signed Out')})
        .catch((error) => {console.error('Sign Out Error', error)});
}


export function onAuthStateChange(handler){
    firebase.auth().onAuthStateChanged(function(user){
        handler(user);
    }) 
}
