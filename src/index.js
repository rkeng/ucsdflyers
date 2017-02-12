import React from 'react';
import ReactDOM from 'react-dom';
import { FlyersApp } from './DumbComponents/FlyersApp';
import { store } from './State/store';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
import { syncHistoryWithStore } from'react-router-redux';
import { Provider } from 'react-redux';
import { OrgListContainer} from './SmartComponents/OrgListContainer';
import { FlyerListContainer } from './SmartComponents/FlyerListContainer';
import { Register } from './DumbComponents/Register';
import { Feedback } from './DumbComponents/Feedback'
import { NotFound } from './DumbComponents/NotFound';
import { Login } from './DumbComponents/Login';
import { About } from './DumbComponents/About';
import { NewStudents } from './DumbComponents/NewStudents';

//combine store and react-router history
const history = syncHistoryWithStore(browserHistory, store);

/*
const orgs = [];

var orgId = 0;
function ReadOrgData (){
    return database.ref('/clubs/' + orgId).once('value').then(function(snapshot) {
        console.log("snapsss",snapshot);
        var orgName = snapshot.val().name;
        var orgDes = snapshot.val().description;
        orgs.push({name: {orgName}, description: {orgDes}});
        orgId++;
        // ...
    });
}

ReadOrgData();
*/

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path='/' component={FlyersApp}>
                <IndexRedirect to='/events'/>
                <Route path='events' component={FlyerListContainer}/>
                <Route path='org' component={OrgListContainer}/>
                <Route path='about' component={About}/>
                <Route path='login' component={Login}/>
                <Route path='register' component={Register}/>
                <Route path='feedback' component={Feedback}/>
                <Route path='register-student' component={NewStudents}/>
            </Route>
            <Route path='*' component={NotFound}/>
        </Router>
    </Provider>,
    document.getElementById('app')
);