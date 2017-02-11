import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
import { syncHistoryWithStore } from'react-router-redux';
import { Provider } from 'react-redux';
import { FlyerList } from './DumbComponents/FlyerList';
import { FlyerListContainer } from './SmartComponents/FlyerListContainer';
import { Org } from './DumbComponents/Org';
import { Register } from './DumbComponents/Register';
import { Feedback } from './DumbComponents/Feedback'
import { NotFound } from './DumbComponents/NotFound';
import { Login } from './DumbComponents/Login';
import { About } from './DumbComponents/About';
import { FlyersApp } from './DumbComponents/FlyersApp';
import { store } from './State/store';

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



const events = [
    {name: 'p Day', date: 'Feb 20, 2017', location: 'PC', description: 'Everyone handout to catch pokemons'},
    {name: 'Hack Day', date: 'Jan 31, 2017', location: 'CSE building', description: 'Hack into others computer'},
    {name: 'Water Fun', date: 'Feb 02, 2017', location: 'Sun God', description: 'Get wet and swag'}
];


const orgs = [
    {name: 'Kappa Kappa Kappa', estdate: 'Jan 1, 2017', description:'Dummy club'},
    {name: 'United Taiwanese Association', estdate: 'Oct 10, 1911', description:'948794Kuang'},
    {name: 'ESL', estdate: 'Jan 9, 2017', description:'Enrich Student Life'}
]


ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path='/' component={FlyersApp}>
                <IndexRedirect to='/events'/>
                <Route path='events' component={FlyerListContainer}/>
                <Route path='org' component={()=> <Org orgs={orgs}/>}/>
                <Route path='about' component={About}/>
                <Route path='login' component={Login}/>
                <Route path='register' component={Register}/>
                <Route path='feedback' component={Feedback}/>
            </Route>
            <Route path='*' component={NotFound}/>
        </Router>
    </Provider>,
    document.getElementById('app')
);
