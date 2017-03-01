import * as firebase from 'firebase'

// firebase config
const firebaseConfig = {
    apiKey: "AIzaSyBFZS-a-fdoNEhPBpi232WaNRtEKayWNWU",
    authDomain: "ucsd-flyers-development.firebaseapp.com",
    databaseURL: "https://ucsd-flyers-development.firebaseio.com",
    storageBucket: "ucsd-flyers-development.appspot.com",
    messagingSenderId: "166142450370"
}

// initialize our firebase app
firebase.initializeApp(firebaseConfig)

export { firebase };