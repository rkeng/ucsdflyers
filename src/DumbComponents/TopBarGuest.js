import React from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import logo from './logo.png'
import { FaNewspaperO, FaGroup, FaStickyNoteO, FaChild, FaSignIn } from 'react-icons/lib/fa'
class TopBarGuestNoState extends React.Component {
  constructor (props) {
    super(props)
    this.changeRoute = this.changeRoute.bind(this)
  }

  changeRoute (e) {
    e.preventDefault()
    const newRoute = e.target.id
    browserHistory.push(newRoute)
  }

  render () {
    return (
        <Navbar inverse collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                        <img width={60} height={100} src={logo} alt=""/>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>

            <Navbar.Collapse>
                <Nav>
                    <NavItem onClick={this.changeRoute} id='events'><FaNewspaperO /> Flyers</NavItem>
                    <NavItem onClick={this.changeRoute} id='org'><FaGroup /> Organizations</NavItem>
                    <NavItem onClick={this.changeRoute} id='recruitments'><FaStickyNoteO /> Recruitment Notes</NavItem>
                    <NavItem onClick={this.changeRoute} id='about'><FaChild /> About Us</NavItem>
                </Nav>
                <Nav pullRight>
                    <NavItem onClick={this.changeRoute} id='login'><FaSignIn /> Login</NavItem>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
  }
}

function mapStateToProps(state){
    return {
        state: state
    }
}

const TopBarGuest = connect(mapStateToProps)(TopBarGuestNoState)

export { TopBarGuest }
