import React from 'react'
import ReactDOM from 'react-dom'
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import 'react-s-alert/dist/s-alert-css-effects/scale.css';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';
import 'react-s-alert/dist/s-alert-css-effects/flip.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';
import 'firebaseui/dist/firebaseui.css'
import { FlyersApp } from './DumbComponents/FlyersApp'
import { store } from './State/store'
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import { OrgListContainer} from './SmartComponents/OrgListContainer'
import { FlyerListContainer } from './SmartComponents/FlyerListContainer'
import { RecruitmentListContainer } from './SmartComponents/RecruitmentListContainer';
import { Feedback } from './DumbComponents/Feedback'
import { NotFound } from './DumbComponents/NotFound'
import { Login } from './DumbComponents/Login'
import { About } from './DumbComponents/About'
import { NewOrganizations } from './DumbComponents/NewOrganizations'
import { CreateRecruitment } from './DumbComponents/CreateRecruitment'
import { CreateFlyer } from './DumbComponents/CreateFlyer'
import { OrgProfileSelect } from './DumbComponents/OrgProfileSelect'
import { ProfileSelect } from './DumbComponents/ProfileSelect'
import { listenToDataAsArray, listenToData, fetchDataOn, onAuthStateChanged } from './models'
import { GetOrgsAction, GetEventsAction, GetRecruitmentsAction, LoginUserAction, UserDataUpdateAction } from './State/actions'
// combine store and react-router history
const history = syncHistoryWithStore(browserHistory, store);

listenToDataAsArray('events', function(events){
        store.dispatch(GetEventsAction(events))
})

listenToDataAsArray('clubs', function(clubs){
        // console.log('fetched clubs data')
        store.dispatch(GetOrgsAction(clubs))
})

listenToDataAsArray('recruitmentNotes', function(recruitments){
        // console.log('fetched recruitments data')
        store.dispatch(GetRecruitmentsAction(recruitments))
})

onAuthStateChanged(function(user){
    if(user){
        listenToData(`users/${user.uid}`, function(userData){
            store.dispatch(UserDataUpdateAction(userData))
        })

        fetchDataOn(`users/${user.uid}`)
        .then(snap => {
            var userData = snap.val()
            const userDataOnAuth = {
                displayName: user.displayName,
                email: user.email,
                emailVerified: user.emailVerified,
                isAnonymous: user.isAnonymous,
                photoURL: user.photoURL,
                providerData: user.providerData,
                uid: user.uid,
            }
            var userDataToState = Object.assign(userDataOnAuth, userData)
            store.dispatch(LoginUserAction(userDataToState))
        })
      }
})

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path='/' component={FlyersApp}>
                <IndexRedirect to='events'/>
                <Route path='events' component={FlyerListContainer}/>                    {/*all*/}
                <Route path='org' component={OrgListContainer}/>                         {/*all*/}
                <Route path='about' component={About}/>                                  {/*all*/}
                <Route path='feedback' component={Feedback}/>                            {/*all*/}
                <Route path='recruitments' component={RecruitmentListContainer}/>        {/*all*/}
                <Route path='create-recruitment' component={CreateRecruitment}/>         {/*org only*/}
                <Route path='create-flyer' component={CreateFlyer}/>                     {/*org only*/}
                <Route path='login' component={Login}/>                                  {/*all*/}
                <Route path='org-login' component={NewOrganizations}/>                   {/*all*/}
                <Route path='profile' component={ProfileSelect}/>                           {/*student only*/}
                <Route path='org-profile' component={OrgProfileSelect}/>                 {/*org only*/}
            </Route>
            <Route path='*' component={NotFound}/>
        </Router>
    </Provider>,
    document.getElementById('app')
);
