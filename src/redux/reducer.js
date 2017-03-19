import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'
import { createFlyer, createRecruitment, LikeFlyer, SaveRecruitment, FollowOrg } from '../firebase'
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
        case 'LOGOUT_USER': {
            return {}
        }
        case 'LOGIN_USER':{
            return Object.assign({}, state, {
                isAuthenticated: true,
            }, action.userData)
        }
        case 'USER_DATA_UPDATE': {
            return Object.assign({}, state, action.userData)
        }
        default:
        return state
    }
}

function dataStateReducer(state={}, action){
    switch(action.type){
        case 'GET_ORGS':{
            return Object.assign({}, state, { orgs: action.data })
        }
        case 'GET_EVENTS':{
            return Object.assign({}, state, { events: action.data })
        }
        case 'GET_RECRUITMENTS':{
            return Object.assign({}, state, { recruitments: action.data })
        }
        case 'CREATE_FLYER':{
            const { flyer, user, imagesFiles } = action.data
            createFlyer("events", flyer, user, imagesFiles)
            return state
        }
        case 'CREATE_RECRUITMENT':{
            const { note, user } = action.data
            createRecruitment(note, user)
            return state
        }
        case 'LIKE_FLYER':{
            LikeFlyer(action.flyer)
            return state
        }
        case 'SAVE_RECRUITMENT':{
            SaveRecruitment(action.recruitment)
            return state
        }
        case 'FOLLOW_ORG':{
            FollowOrg(action.org)
            return state
        }
        default:
        return state
    }
}


const rootReducer = combineReducers({
  routing: routerReducer, // connect routing with application state
  user: userStateReducer,
  data: dataStateReducer
})

export { rootReducer }
