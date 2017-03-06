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

// linked to ImageDropzone
export function uploadImages(databaseRef, itemID, userID, files) {
  // let dbRef = db.ref(databaseRef )
  let dbRef = db.ref(databaseRef + '/' + itemID + '/images')
  let storageFilePath = userID + '/' + databaseRef + '/' + itemID
  let storage = firebase.storage()

  var images = {}

  console.log(dbRef)
  console.log(storage.ref(storageFilePath))
  // add image to db
  files.map((file, index) => {
      dbRef.push({}).then(function(data) {

        // Upload the image to Firebase Storage.
        // var keyString = data.key
        // console.log(data)
        var filePath = storageFilePath + data.key + '/' + file.name;
          // console.log(data)
        // let keyString = data.key
        var imageToStorage = storage.ref(filePath).put(file);
        imageToStorage.on('state_changed', function(snapshot) {
              // in-progress state changes
              // let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              // that.setState({uploadProgress: percentage + "%"})
        }, function(error) {
              // unsuccessful upload
        }, function() {
            // successful upload
            // console.log("keyString: " + keyString)

            images[data.key] = imageToStorage.snapshot.downloadURL
            // data.update(images)
            console.log(images)
      }
      )}).catch(function(error) {
        console.error('There was an error uploading a file to Firebase: ' + error);
      });

      return true;
  })

}

// returns id of the new database item
export function createNew(node, item){
    const newRef = db.ref(node).push()
    item['id'] = newRef.key;
    newRef.set(item)
    return newRef.key
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
