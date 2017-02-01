import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { NavLink } from './NavLink';

const events = [
    {name:'Pokemon Day', date:'Feb 20, 2017', location:'PC', description:'Everyone handout to catch pokemons'},
    {name:'Hack Day', date:'Jan 31, 2017', location:'CSE building', description:'Hack into others computer'},
    {name:'Water Fun', date:'Feb 02, 2017', location:'Sun God', description:'Get wet and swag'}
]

class TopBar extends React.Component { 
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
                        <NavLink to='events' title='Events'/>
                        <NavLink to='org' title='Organizations'/>
                        <NavLink to='about' title='About Us'/>
                    </Nav>
                    <Nav pullRight>
                        <NavLink to='login' title='Login'/>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export { TopBar }