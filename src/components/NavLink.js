//Wrap react-router Link around react-bootstrap NavItem
import React from 'react';
import { NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';


//<NavLink to="" title=""/>
class NavLink extends React.Component { 

    render(){
        return (
            <LinkContainer to={this.props.to}>
                <NavItem>{this.props.title}</NavItem> 
            </LinkContainer>
        );
    }
}


export { NavLink };