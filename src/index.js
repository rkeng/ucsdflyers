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
import { FlyersApp } from './components/FlyersApp'
import { store } from './redux/store'
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import { OrgListContainer} from './components/OrgListContainer'
import { FlyerListContainer } from './components/FlyerListContainer'
import { RecruitmentListContainer } from './components/RecruitmentListContainer';
import { Feedback } from './components/Feedback'
import { NotFound } from './components/NotFound'
import { Login } from './components/Login'
import { About } from './components/About'
import { NewOrganizations } from './components/NewOrganizations'
import { CreateRecruitment } from './components/CreateRecruitment'
import { CreateFlyer } from './components/CreateFlyer'
import { OrgProfileSelect } from './components/OrgProfileSelect'
import { ProfileSelect } from './components/ProfileSelect'
import { listenToDataAsArray, listenToData, fetchDataOn, onAuthStateChanged } from './firebase'
import { GetOrgsAction, GetEventsAction, GetRecruitmentsAction, LoginUserAction, UserDataUpdateAction } from './redux/actions'
import { activeDate } from './commons'
// combine store and react-router history
const history = syncHistoryWithStore(browserHistory, store);

listenToDataAsArray('events', function(events){
        events.filter(e => activeDate(e.date))
        store.dispatch(GetEventsAction(events))
})

listenToDataAsArray('clubs', function(clubs){
        // console.log('fetched clubs data')
        store.dispatch(GetOrgsAction(clubs))
})

listenToDataAsArray('recruitmentNotes', function(recruitments){
        recruitments.filter(e => activeDate(e.date))
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
