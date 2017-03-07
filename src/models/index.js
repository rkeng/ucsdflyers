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

// linked to ImageDropzone
export function uploadImages(databaseRef, itemID, userID, files) {
  // let dbRef = db.ref(databaseRef )
  let dbRef = db.ref(databaseRef + '/' + itemID + '/images')
  let storageFilePath = userID + '/' + databaseRef + '/' + itemID
  let storage = firebase.storage()

  // add image to db
  files.map((file, index) => {
      dbRef.push({}).then(function(data) {

        // Upload the image to Firebase Storage.
        var filePath = storageFilePath + data.key + '/' + file.name;
        var imageToStorage = storage.ref(filePath).put(file);
        imageToStorage.on('state_changed', function(snapshot) {
              // in-progress state changes
              // let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              // that.setState({uploadProgress: percentage + "%"})
        }, function(error) {
              // unsuccessful upload
        }, function() {
            // successful upload

            // update in Firebase DB
            data.update({imageUrl: imageToStorage.snapshot.downloadURL})
      }
      )}).catch(function(error) {
        console.error('There was an error uploading a file to Firebase: ' + error);
      });

      return true;
  })

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

export function createNew(node, item){
    const newRef = db.ref(node).push()
    item['id'] = newRef.key;
    newRef.set(item)
    return newRef.key
}

export function transaction(node){

    return new Promise((resolve, reject) => {
      return db.ref(node).transaction((currentVal) => {
        console.log('what is my currentVal that I am transactioning?', currentVal)
        return resolve(currentVal)
      }, function(){}, true)
    })
}

export function update(node, data){
    db.ref(node).update(data)
}


export function remove(node){
    db.ref(node).remove()
}

export function signinOrg(provider){
    firebase.auth().signInWithPopup(provider).then(function(result) { //result has a credential and user
      // This gives you a Google Access Token. You can use it to access the Google API.
      var user = result.user
      console.log('sigin org result?', result)
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
            browserHistory.push('/org-profile')
        })
      })
}

export function stringtoDate(input){
    var parts = input.split('-');
    //please put attention to the month (parts[0]), Javascript counts months from 0:
    // January - 0, February - 1, etc
    var mydate = new Date(parts[0],parts[1]-1,parts[2   ]);
    return mydate
}


export function compareDates(a,b){
 var d1 = stringtoDate(a.date)
 var d2 = stringtoDate(b.date)
// console.log(d1 , d2)
 if (d1 < d2)
   return -1;
 if (d1 > d2)
   return 1;
 return 0;
}
export function compareClubs(a,b){
    var d1 = a.name
    var d2 = b.name
    if (d1 < d2)
      return -1;
    if (d1 > d2)
      return 1;
    return 0;
}
