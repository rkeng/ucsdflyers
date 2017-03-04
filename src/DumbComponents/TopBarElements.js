import React from 'react'
import { browserHistory } from 'react-router'
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, Button } from 'react-bootstrap'
import { FaNewspaperO, FaGroup, FaStickyNoteO, FaChild, FaSignIn } from 'react-icons/lib/fa'
import { connect } from 'react-redux'
import { LogoutUserAction } from '../State/actions'
import { signOutUser } from '../models'
import Avatar from 'react-avatar'
import logoText from '../asset/logoText.png'
import person from '../asset/person.jpg'

function mapStateToProps(state){
    return {
        state: state
    }
}

var changeRoute = (e, props) => {
    e.preventDefault()
    const { dispatch } = props
    const newRoute = e.target.id
    if(newRoute === 'logout'){
        signOutUser()
        .then(() => {console.log('Signed Out')})
        .catch((error) => {console.error('Sign Out Error', error)});
        dispatch(LogoutUserAction())
        browserHistory.push('events')
    } else {
        browserHistory.push(newRoute)
    }
  }

export function TopBarItem(props){
    var name = props.name
    var icon = props.icon
    return (
        <NavItem className='navbar-btn' {...props} onClick={(e) => changeRoute(e, props)}>
            {icon} 
            {name}
        </NavItem>
    )
}
// var TopBarItem = connect()(TopBarItemNoState)
// export { TopBarItem }

export function TopBarIcon(props){
    return (
        <div>
            <Navbar.Header>
                <Navbar.Brand className='navbar-btn'>
                    <img width={200} height={140} src={logoText} alt=""/>
                </Navbar.Brand>
                <Navbar.Toggle className='navbar-btn'/>
            </Navbar.Header>
        </div>
    )
}

// var TopBarIcon = connect()(TopBarIconNoState)
// export { TopBarIcon }

export function TopBarLeftNoState(props){
    return (
        <div>
            <Nav>
                <TopBarItem id='events' name='EVENTS' icon={<FaNewspaperO />} />
                <TopBarItem id='org' name='ORGANIZATIONS' icon={<FaGroup />} />
                <TopBarItem id='recruitments' name='RECRUITMENTS' icon={<FaStickyNoteO />} />
                <TopBarItem id='about' name='ABOUT' icon={<FaChild />} />
                <TopBarItem id='about' name='ABOUT' icon={<FaChild />} />
                <Button onClick={() => {
                    console.log('state?', props.state)
                }}> show state</Button>
            </Nav>
        </div>
    )
}

var TopBarLeft = connect(mapStateToProps)(TopBarLeftNoState)
export { TopBarLeft }


export function TopBarRight(props){
    return(
        <div>
            <Nav pullRight>
                <NavDropdown id='user-avatar-dropdown' title={<Avatar googleId="103626686134397923291" round size={38}/>}>
                    <MenuItem>Action</MenuItem>
                    {}
                    <MenuItem id='login' onClick={(e) => changeRoute(e, props)}><FaSignIn /> LOGIN</MenuItem>
                </NavDropdown>
            </Nav>
        </div>
    )
}

var TopBarRight = connect()(TopBarRightNoState)
export { TopBarRight }
// <Avatar name="Wim Mostmans" round size={35} src={person}/>
