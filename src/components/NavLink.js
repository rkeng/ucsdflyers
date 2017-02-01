//Wrap react-router Link around react-bootstrap NavItem
import React from 'react';
import { NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';


//<NavLink to="" title="" eventKay=number>
class NavLink extends React.Component { 

    render(){
        return (
            <LinkContainer to={this.props.to}>
                <NavItem eventKey={this.props.eventKey} href='#'>{this.props.title}</NavItem> 
            </LinkContainer>
        );
    }
}


export { NavLink };