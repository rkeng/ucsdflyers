import React from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { browserHistory } from 'react-router'
import { signOutUser } from '../models'
import { connect } from 'react-redux'
import logo from '../asset/logo.png'
import Avatar from 'react-avatar'
import { FaNewspaperO, FaGroup, FaStickyNoteO, FaChild, FaSignOut } from 'react-icons/lib/fa'
import { getCurrentUser, fetchDataOn } from '../models'

class TopBarStudentNoState extends React.Component {
  constructor (props) {
    super(props)
    this.changeRoute = this.changeRoute.bind(this)
  }

  changeRoute (e) {
    e.preventDefault()
    const newRoute = e.target.id
    if(newRoute === 'logout'){
        signOutUser()
        .then(() => {console.log('Signed Out')})
        .catch((error) => {console.error('Sign Out Error', error)});
        browserHistory.push('events')
    } else {
        browserHistory.push(newRoute)
    }
  }

  render () {
    var photoURL="";
    getCurrentUser()
    .then(function(user){
      fetchDataOn(user)
      .then(function(shot){
        photoURL = shot.val().photoURL;
      })
    })
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
                    <NavItem onClick={this.changeRoute} id='logout'>{photoURL}<FaSignOut /> Log out</NavItem>
                    <NavItem><Avatar round={true} size={30} src="https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg"/></NavItem>
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

const TopBarStudent = connect(mapStateToProps)(TopBarStudentNoState)

export { TopBarStudent }
