import * as firebase from 'firebase'

// firebase config
const firebaseConfig = {
  // apiKey: 'AIzaSyChSsnK4JgnlhG0Hrr-aL3xh1M-1rHaMUc',
  // authDomain: 'ucsd-flyers.firebaseapp.com',
  // databaseURL: 'https://ucsd-flyers.firebaseio.com',
  // storageBucket: 'ucsd-flyers.appspot.com',
  // messagingSenderId: '733909365468'
    apiKey: "AIzaSyDV3y9nc_FwC6Axfn1z-cf0esZ1hs_-tho",
    authDomain: "cse110project-6ba37.firebaseapp.com",
    databaseURL: "https://cse110project-6ba37.firebaseio.com",
    storageBucket: "cse110project-6ba37.appspot.com",
    messagingSenderId: "414036021672"
}

// initialize our firebase app
firebase.initializeApp(firebaseConfig)

export { firebase };