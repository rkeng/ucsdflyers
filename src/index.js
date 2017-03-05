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
import { onAuthStateChanged } from './models'
import { LoginUserAction, LogoutUserAction } from './State/actions'

// combine store and react-router history
const history = syncHistoryWithStore(browserHistory, store);

onAuthStateChanged((user) => {
    if(user){
        console.log('user logged in')
        const userData = {
            displayName: user.displayName,
            email: user.email,
            emailVerified: user.emailVerified,
            isAnonymous: user.isAnonymous,
            photoURL: user.photoURL,
            providerData: user.providerData,
            uid: user.uid,          
            isOrg: true
        }
        store.dispatch(LoginUserAction(userData))
    } else {
        console.log('no user')
        store.dispatch(LogoutUserAction())
    }
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
                <Route path='login-org' component={NewOrganizations}/>
            </Route>
            <Route path='*' component={NotFound}/>
        </Router>
    </Provider>,
    document.getElementById('app')
);
