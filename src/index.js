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
import { Feedback } from './DumbComponents/Feedback'
import { NotFound } from './DumbComponents/NotFound'
import { Login } from './DumbComponents/Login'
import { About } from './DumbComponents/About'
import { NewOrganizations } from './DumbComponents/NewOrganizations'
import { CreateRecruitment } from './DumbComponents/CreateRecruitment'
import { CreateFlyer } from './DumbComponents/CreateFlyer'
import { MyFlyers } from './DumbComponents/MyFlyers'
import { OrgProfileSelect } from './DumbComponents/OrgProfileSelect'
import { listenToDataAsArray, listenToData, onAuthStateChanged, detachListener } from './models'
import { GetOrgsAction, GetEventsAction, GetRecruitmentsAction, UserDataUpdateAction } from './State/actions'
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
                <Route path='my-flyers' component={MyFlyers}/>                           {/*student only*/}
                <Route path='org-profile' component={OrgProfileSelect}/>                 {/*org only*/}
            </Route>
            <Route path='*' component={NotFound}/>
        </Router>
    </Provider>,
    document.getElementById('app')
);
