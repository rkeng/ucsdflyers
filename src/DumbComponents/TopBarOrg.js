import React from 'react'
import { Navbar } from 'react-bootstrap'
import { connect } from 'react-redux'
import { TopBarIcon, TopBarLeft, TopBarRight } from './TopBarElements'


class TopBarOrgNoState extends React.Component {

  render () {
    return (
        <Navbar collapseOnSelect fixedTop>
            <TopBarIcon/>
            <Navbar.Collapse>
                <TopBarLeft/>
                <TopBarRight/>
            </Navbar.Collapse>
        </Navbar>
    )
  }
}

const TopBarOrg = connect()(TopBarOrgNoState)

export { TopBarOrg }

  // changeRoute (e) {
  //   e.preventDefault()
  //   const { dispatch } = this.props
  //   const newRoute = e.target.id
  //   if(newRoute === 'logout'){
  //       signOutUser()
  //       .then(() => {console.log('Signed Out')})
  //       .catch((error) => {console.error('Sign Out Error', error)});
  //       dispatch(LogoutUserAction())
  //       browserHistory.push('events')
  //   } else {
  //       browserHistory.push(newRoute)
  //   }
  // }
        // <Navbar collapseOnSelect>
        //     <Navbar.Header>
        //         <Navbar.Brand>
        //             <img width={200} height={100} src={logoText} alt=""/>
        //         </Navbar.Brand>
        //         <Navbar.Toggle/>
        //     </Navbar.Header>

        //     <Navbar.Collapse>
        //         <Nav>
        //             <NavItem onClick={this.changeRoute} id='events'><FaNewspaperO /> EVENTS</NavItem>
        //             <NavItem onClick={this.changeRoute} id='org'><FaGroup /> ORGANIZATIONS</NavItem>
        //             <NavItem onClick={this.changeRoute} id='recruitments'><FaStickyNoteO /> RECRUITMENTS</NavItem>
        //             <NavItem onClick={this.changeRoute} id='about'><FaChild /> ABOUT</NavItem>
        //         </Nav>
        //         <Nav pullRight>
        //             <NavItem onClick={this.changeRoute} id='logout'><FaSignIn /> LOGOUT</NavItem>
        //         </Nav>
        //     </Navbar.Collapse>
        // </Navbar>

