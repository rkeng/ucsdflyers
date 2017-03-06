import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'
/*
    A reducer is a function that takes the existing state and an action and then
    generate a new state;
    We switch on "action.type" so to perform different logics on differnt types of actions
    Almost always, you will need to return a new state in each action.type case. The return
    statement usually looks like below:
            return Object.assign({}, state, ...)
*/

function userStateReducer (state={}, action) {
    switch (action.type) {
        /* we shouldn't have the sign up funtion ever used
        case 'SIGN_UP_USER': {
            const email = action.state.email
            const password = action.state.password

            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(function () {
                console.log('Account Creation Succeeded')
                })
                .catch(function (error) {
                console.log('Account Creation Failed', error.message)
                })
            return Object.assign({}, state)
        }
        */
        case 'LOGIN_STUDENT': {
            return Object.assign({}, state, {
                isAutheticated: true,
                isOrg: false
            }, action.userData)
        }
        case 'LOGIN_ORG': {
            return Object.assign({}, state, {
                isAutheticated: true,
                isOrg: true
            }, action.userData)
        }
        case 'LOGOUT_USER': {
            return Object.assign({}, state, {
                isAutheticated: false
            }) 
        }
        case 'LOGIN_USER':{
            return Object.assign({}, state, {
                isAutheticated: true,
            }, action.userData)
        }
        default:
        return state
    }
}


const rootReducer = combineReducers({
  routing: routerReducer, // connect routing with application state
  user: userStateReducer
})

export { rootReducer }
