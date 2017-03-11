import { firebase } from './FlyersFirebase';
import { browserHistory } from 'react-router'

const db = firebase.database();
let storage = firebase.storage();


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

export function listenToData(node, resolve, reject){
    db.ref(node).on('value', 
        function(snap){
            var snapshot = snap.val()
            resolve(snapshot)
        }, 
        function(err){
            reject(err)
        })
}

export function detachListenerOn(node){
    db.ref(node).off()
}

export function listenToDataAsArray(node, resolve, reject){
        db.ref(node).on('value', function(snap){
            var snapshot = snap.val();
            var keyList = Object.keys(snapshot)
            var dataArray = keyList.map(key => snapshot[key])
            resolve(dataArray)
        }, function(error){
            reject(error)
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

export function transaction(node, newData){
    //don't use it
    /*
    return new Promise((resolve, reject) => {
      return db.ref(node).transaction((currentVal) => {
        console.log('what is my currentVal that I am transactioning?', currentVal)
        return resolve(currentVal)
      }, function(){}, true)
    })
    */
}

export function set(node, data){
    db.ref(node).set(data)
}

export function update(node, data){
    db.ref(node).update(data)
}


export function remove(node){
    var parentRef = db.ref(node).parent
    db.ref(node).remove()
}

//org account creating
export function signinOrg(provider){
    firebase.auth().signInWithPopup(provider).then(function(result) { //result has a credential and user
      // This gives you a Google Access Token. You can use it to access the Google API.
      var user = result.user
      // console.log('sigin org result?', result)
      const userField = 'users/' + user.uid;
      fetchDataOn(userField).then(userField => {
            if(!userField.val()){
                const userFieldData = {
                    displayName: user.displayName,
                    isOrg: true,
                    FlyersCreated: {
                      dummy: 'dummy data to keep the field'
                    },
                    RecruitmentNotesCreated: {
                      dummy: 'dummy data to keep the field'
                    }
                }
                firebase.database().ref('users/' + user.uid).set(userFieldData);
                firebase.database().ref('organizations/' + user.uid).set(user.uid);
            }
            //manully redict since auto-redirect is not working
            browserHistory.push('/org-profile')
        })
      })
}