import * as firebase from 'firebase'

// firebase config
const firebaseConfig = {
  apiKey: 'AIzaSyChSsnK4JgnlhG0Hrr-aL3xh1M-1rHaMUc',
  authDomain: 'ucsd-flyers.firebaseapp.com',
  databaseURL: 'https://ucsd-flyers.firebaseio.com',
  storageBucket: 'ucsd-flyers.appspot.com',
  messagingSenderId: '733909365468'
}

// initialize our firebase app
firebase.initializeApp(firebaseConfig)

export { firebase };