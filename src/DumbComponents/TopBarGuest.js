import React from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { FaNewspaperO, FaGroup, FaStickyNoteO, FaChild, FaSignIn } from 'react-icons/lib/fa'
import logoText from '../asset/logoText.png'

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
        <Navbar collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                        <img width={200} height={100} src={logoText} alt=""/>
                </Navbar.Brand>
            </Navbar.Header>

            <Navbar.Collapse>
                <Nav>
                    <NavItem onClick={this.changeRoute} id='events'><FaNewspaperO /> EVENTS</NavItem>
                    <NavItem onClick={this.changeRoute} id='org'><FaGroup /> ORGANIZATIONS</NavItem>
                    <NavItem onClick={this.changeRoute} id='recruitments'><FaStickyNoteO /> RECRUITMENTS</NavItem>
                    <NavItem onClick={this.changeRoute} id='about'><FaChild /> ABOUT</NavItem>
                </Nav>
                <Nav pullRight>
                    <NavItem onClick={this.changeRoute} id='login'><FaSignIn /> LOGIN</NavItem>
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
