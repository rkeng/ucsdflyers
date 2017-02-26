import React from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import styles from '../Navbar.css'

const navBar ={backgroundColor: '#135dad'}
const navBarText = {color: "#fce705"}

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
        <Navbar style={navBar}>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="/"><strong style={navBarText}>LOGO</strong></a>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>

            <Navbar.Collapse>
                <Nav >
                    <NavItem onClick={this.changeRoute} id='events'><strong style={navBarText}>Flyers</strong></NavItem>
                    <NavItem onClick={this.changeRoute} id='org'><strong style={navBarText}>Organizations</strong></NavItem>
                    <NavItem onClick={this.changeRoute} id='about'><strong style={navBarText}>About Us</strong></NavItem>
                </Nav>
                <Nav pullRight>
                    <NavItem onClick={this.changeRoute} id='login'><strong style={navBarText}>Login</strong></NavItem>
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
