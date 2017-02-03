import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { NavLink } from './NavLink';
import { browserHistory } from 'react-router';

//dummy data
const events = [
    {name:'Pokemon Day', date:'Feb 20, 2017', location:'PC', description:'Everyone handout to catch pokemons'},
    {name:'Hack Day', date:'Jan 31, 2017', location:'CSE building', description:'Hack into others computer'},
    {name:'Water Fun', date:'Feb 02, 2017', location:'Sun God', description:'Get wet and swag'}
]


class TopBar extends React.Component { 
    constructor(props){
        super(props);
        this.changeRoute = this.changeRoute.bind(this);
    }

    changeRoute(e){
        e.preventDefault();
        const newRoute = e.target.id;
        browserHistory.push(newRoute);
    }

    render(){
        return (
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">Flyers</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>

                <Navbar.Collapse>
                    <Nav>
                        <NavItem onClick={this.changeRoute} id='events'>Events</NavItem> 
                        <NavItem onClick={this.changeRoute} id='org'>Organizations</NavItem> 
                        <NavItem onClick={this.changeRoute} id='about'>About Us</NavItem> 
                    </Nav>
                    <Nav pullRight>
                        <NavItem onClick={this.changeRoute} id='login'>Login</NavItem> 
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export { TopBar }