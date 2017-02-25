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
import { Register } from './DumbComponents/Register'
import { Feedback } from './DumbComponents/Feedback'
import { NotFound } from './DumbComponents/NotFound'
import { Login } from './DumbComponents/Login'
import { About } from './DumbComponents/About'
import { NewOrganizations } from './DumbComponents/NewOrganizations'
import { CreateRecruitment } from './DumbComponents/CreateRecruitment'

// combine store and react-router history
const history = syncHistoryWithStore(browserHistory, store);



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
                <Route path='register-org' component={NewOrganizations}/>
                <Route path='org/create-recruitment' component={CreateRecruitment}/>
                <Route path='login' component={Login}/>
            </Route>
            <Route path='*' component={NotFound}/>
        </Router>
    </Provider>,
    document.getElementById('app')
)
