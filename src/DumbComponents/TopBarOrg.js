import React from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { browserHistory } from 'react-router'
import { firebase } from '../FlyersFirebase'

class TopBarOrg extends React.Component {
  constructor (props) {
    super(props)
    this.changeRoute = this.changeRoute.bind(this)
  }

  changeRoute (e) {
    e.preventDefault()
    const newRoute = e.target.id
    if(newRoute === 'logout'){
        firebase.auth().signOut()
        .then(() => {console.log('Signed Out')})
        .catch((error) => {console.error('Sign Out Error', error)});
    } else {
        browserHistory.push(newRoute)
    }
  }

  render () {
    return (
        <Navbar inverse collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="/">LOGO</a>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>

            <Navbar.Collapse>
                <Nav>
                    <NavItem onClick={this.changeRoute} id='events'>Flyers</NavItem>
                    <NavItem onClick={this.changeRoute} id='about'>About Us</NavItem>
                </Nav>
                <Nav pullRight>
                    <NavItem onClick={this.changeRoute} id='logout'>Logout</NavItem>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
  }
}

export { TopBarOrg }
