import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
import { FlyersApp } from './components/FlyersApp';
import { EventList } from './components/EventList';
import { Org } from './components/Org';
import { About } from './components/About';
import { Register } from './components/Register';
import { Feedback } from './components/Feedback'
import { NotFound } from './components/NotFound';
import { Login } from './components/Login';
import { About } from './components/About';


// Get a reference to the database service
//var database = firebase.database();

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
    <Router history={browserHistory}>
        <Route path='/' component={FlyersApp}>
            <IndexRedirect to='/events'/>
            <Route path='events' component={() => <EventList events={events}/>}/>
            <Route path='org' component={()=> <Org orgs={orgs}/>}/>
            <Route path='about' component={About}/>
            <Route path='login' component={Login}/>
            <Route path='register' component={Register}/>
            <Route path='feedback' component={Feedback}/>
        </Route>
        <Route path='*' component={NotFound}/>
    </Router>,
    document.getElementById('app')
);
