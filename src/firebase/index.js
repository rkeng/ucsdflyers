import { firebase } from './FlyersFirebase';
import { browserHistory } from 'react-router'
import { IDtoObject } from '../commons';


const db = firebase.database();
let storage = firebase.storage();

export { db, storage }

export function set(node, data){
    return db.ref(node).set(data)
}

export function update(node, data){
    return db.ref(node).update(data)
}


export function remove(node){
    return db.ref(node).remove()
}

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

// import myPic from '../asset/xiqiang.jpg'


export function createFlyer(databaseRef, item, user, files) {
    // let dbRef = db.ref(databaseRef )
    // let storageFilePath = userID + '/' + databaseRef + '/' + itemID
    files.forEach((file, index) => {
        var imageToStorage = storage.ref(user.uid + '/' + file.name).put(file);
        imageToStorage.on('state_changed', function(snapshot) {
              // in-progress state changes
              // let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              // that.setState({uploadProgress: percentage + "%"})
        }, function(error) {
              // unsuccessful upload
        }, function() {
            // successful upload
            item.images[`index${index}`] = {imageUrl: ''}
            item.images[`index${index}`].imageUrl = imageToStorage.snapshot.downloadURL
            if(index === (files.length - 1) ){
                const { uid, hasOrg } = user
                var newFlyerID = createNew('events', item)
                var newFlyerIDobj = IDtoObject(newFlyerID) 
                update(`users/${uid}/FlyersCreated`, newFlyerIDobj)
                if(user.hasOrg){
                    update(`clubs/${hasOrg}/belongsTo/FlyersCreated`, newFlyerIDobj)
                }
            }
        }
    )})
}

export function createRecruitment(note, user){
    const { hasOrg, uid } = user
    let noteID = createNew('recruitmentNotes', note)
    let noteIDobj = IDtoObject(noteID)
    update(`users/${uid}/RecruitmentNotesCreated`, noteIDobj)
    return update(`clubs/${hasOrg}/belongsTo/RecruitmentNotesCreated`, noteIDobj)
}

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

export function LikeFlyer(flyer){
    return createNew('users/likedFlyer', flyer)
}

export function SaveRecruitment(rec){
    return createNew('users/savedRecruitment', rec)
}
export function FollowOrg(org){
    return createNew('users/followedOrg', org)
}

//org account creating
export function signinOrg(provider){
    firebase.auth().signInWithPopup(provider).then(function(result) { //result has a credential and user
      // This gives you a Google Access Token. You can use it to access the Google API.
      var user = result.user
      // console.log('sigin org result?', result)
      const userField = 'users/' + user.uid;
            fetchDataOn(userField).then(userField => {
                if(userField.val().FlyersLiked){
                    return browserHistory.push('/events')
                }
                if(!userField.val()){
                    const userFieldData = {
                        displayName: user.displayName,
                        uid: user.uid,
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