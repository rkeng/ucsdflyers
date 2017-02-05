import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';

import { FlyersApp } from './components/FlyersApp';
import { EventList } from './components/EventList';
import { About  } from './components/About';
import { NotFound } from './components/NotFound'

const events = [
    {name:'Pokemon', date:'Feb 20, 2017', location:'PC', description:'Everyone handout to catch pokemons'},
    {name:'Hack Day', date:'Jan 31, 2017', location:'CSE building', description:'Hack into others computer'},
    {name:'Water Fun', date:'Feb 02, 2017', location:'Sun God', description:'Get wet and swag'}
]


ReactDOM.render(
    <Router history={browserHistory}>
        <Route path='/' component={FlyersApp}>
            <IndexRedirect to='/events'/>
            <Route path='events' component={() => <EventList events={events}/>}/>
            <Route path='about' component={About}/>
        </Route>
    </Router>,
    document.getElementById('app')
)
