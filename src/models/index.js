import { firebase } from './FlyersFirebase';
import { browserHistory } from 'react-router'

const db = firebase.database();


/* fetch data from database
Example: get all the flyers
    fetchDataOn('events').then(function(events){ ... })
*/
export function fetchDataOn(node){
    return db.ref(node).once('value')
}

export function fetchDataAsArray(node){
    return new Promise((resolve, reject) => {
        db.ref(node).once('value')
        .then(snap => {
            var snapshot = snap.val();
            var keyList = Object.keys(snapshot)
            var dataArray = keyList.map(key => snapshot[key])
            resolve(dataArray);
        })
        .catch((err) => reject(err))
    })
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

export function uploadPhotos(databaseRef, storageFilePath, photos) {
  var files = photos;
  let storage = firebase.storage()
  // add image to db
  files.map((file, index) => {
      databaseRef.push({
          imageUrl: "",
      }).then(function(data) {

        // Upload the image to Firebase Storage.
        // file will be under <currentUser.uid> folder in Firebase Storage
        var filePath = storageFilePath + data.key + '_' + file.name;
          // console.log(data)
        var imageToStorage = storage.ref(filePath).put(file);
          imageToStorage.on('state_changed', function(snapshot) {
              // in-progress state changes
              // let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              // that.setState({uploadProgress: percentage + "%"})
          }, function(error) {
              // unsuccessful upload
          }, function() {
              // successful upload
              data.update({imageUrl: imageToStorage.snapshot.downloadURL})
          }
      )}).catch(function(error) {
        console.error('There was an error uploading a file to Firebase: ' + error);
      });
  })
}

export function createNew(node, item){
    const newRef = db.ref(node).push()
    item['id'] = newRef.key;
    newRef.set(item)
}

export function signinOrg(provider){
    firebase.auth().signInWithPopup(provider).then(function(result) { //result has a credential and user
      // This gives you a Google Access Token. You can use it to access the Google API.
      var user = result.user
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
                    isOrg: true
                }
                firebase.database().ref('users/' + user.uid).set(userFieldData);
                firebase.database().ref('organizations/' + user.uid).set(user.uid);
            }
            //manully redict since auto-redirect is not working
            browserHistory.push('/create-flyer')
        })
      })
}
