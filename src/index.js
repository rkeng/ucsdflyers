import React from 'react'
import ReactDOM from 'react-dom'
import 'react-notifications/lib/notifications.css' // css for notification
import 'firebaseui/dist/firebaseui.css'
import { FlyersApp } from './DumbComponents/FlyersApp'
import { store } from './State/store'
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import { OrgListContainer} from './SmartComponents/OrgListContainer'
import { FlyerListContainer } from './SmartComponents/FlyerListContainer'
import { RecruitmentListContainer } from './SmartComponents/RecruitmentListContainer';
import { Register } from './DumbComponents/Register'
import { Feedback } from './DumbComponents/Feedback'
import { NotFound } from './DumbComponents/NotFound'
import { Login } from './DumbComponents/Login'
import { About } from './DumbComponents/About'
import { NewOrganizations } from './DumbComponents/NewOrganizations'
import { CreateRecruitment } from './DumbComponents/CreateRecruitment'
import { CreateFlyer } from './DumbComponents/CreateFlyer'
import { MyFlyers } from './DumbComponents/MyFlyers'
import { OrgProfileSelect } from './DumbComponents/OrgProfileSelect'
import { fetchDataAsArray } from './models'
import { GetOrgsAction, GetEventsAction } from './State/actions'
import { OrgProfileInitPage } from './DumbComponents/OrgProfileInit'
// combine store and react-router history
const history = syncHistoryWithStore(browserHistory, store);

fetchDataAsArray('clubs')
.then(clubs => {
    store.dispatch(GetOrgsAction(clubs))
})

fetchDataAsArray('events')
.then(events => {
    store.dispatch(GetEventsAction(events))
})


ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path='/' component={FlyersApp}>
                <IndexRedirect to='events'/>
                <Route path='events' component={FlyerListContainer}/>
                <Route path='org' component={OrgListContainer}/>
                <Route path='about' component={About}/>
                <Route path='register' component={Register}/>
                <Route path='feedback' component={Feedback}/>
                <Route path='recruitments' component={RecruitmentListContainer}/>
                <Route path='create-recruitment' component={CreateRecruitment}/>
                <Route path='create-flyer' component={CreateFlyer}/>
                <Route path='login' component={Login}/>
                <Route path='org-login' component={NewOrganizations}/>
                <Route path='my-flyers' component={MyFlyers}/>
                <Route path='org-profile' component={OrgProfileSelect}/>
            </Route>
            <Route path='*' component={NotFound}/>
        </Router>
    </Provider>,
    document.getElementById('app')
);
