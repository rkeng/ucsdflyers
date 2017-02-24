import { firebase } from './models/FlyersFirebase'
import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'

function userStateReducer (state = {}, action) {
  switch (action.type) {
        // Sign up reducer
    case 'SIGN_UP_USER': {
      const email = action.state.email
      const password = action.state.password

            // old syntax
      firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(function () {
              console.log('Account Creation Succeeded')
            })
            .catch(function (error) {
              console.log('Account Creation Failed', error.message)
            })

      return Object.assign({}, state)
    }
    case 'LOGIN_USER': {
      const email = action.state.email
      const password = action.state.password

            // new syntax
      firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function (user) {
              console.log('Dose FB sign give me a user when signin succeed?', user)
              return Object.assign({}, state, {
                    // attach below field to state
                user: {
                  email: email,
                  password: password
                }
              })
            })
            .catch(function (error) {
              console.log('Login Fail', error.message)
              return state
            })
      break
    }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  routing: routerReducer, // connect routing with application state
  userStateReducer
})

export { rootReducer }

// import { combineReducers } from 'redux'
// import { firebaseStateReducer } from 'react-redux-firebase'
// import { routerReducer } from 'react-router-redux';

// function someReeducer(state={}, action){
//     switch(action.type){
//         case 'newUser':
//             return Object.assign({}, action.state);
//         default:
//             return state;
//     }
// }

// const rootReducer = combineReducers({
//   someReeducer: someReeducer,
//   routing: routerReducer,
//   firebase: firebaseStateReducer
// })

// export default rootReducer;
