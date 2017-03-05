import React from 'react'
import { browserHistory } from 'react-router'
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, Button, Col } from 'react-bootstrap'
import { FaNewspaperO, FaGroup, FaStickyNoteO, FaChild, FaSignIn, FaSignOut } from 'react-icons/lib/fa'
import { connect } from 'react-redux'
import { LogoutUserAction } from '../State/actions'
import { signOutUser } from '../models'
import Avatar from 'react-avatar'
import logoText from '../asset/logoText.png'
import person from '../asset/person.jpg'
import { onAuthStateChanged } from '../models'



function changeRoute(e, props) {
    e.preventDefault()
    const { dispatch } = props
    const newRoute = e.target.id
    if(newRoute === 'logout'){
        signOutUser().then(_ => {
            dispatch(LogoutUserAction())
            browserHistory.push('events')
        })
    } else {
        browserHistory.push(newRoute)
    }
  }

function NavbarWrapper(props){
    var wrapper = <Navbar collapseOnSelect> {props.children} </Navbar>
    if(props.fixedTop){
        wrapper = <Navbar collapseOnSelect fixedTop> {props.children} </Navbar>
    } 
    return(
        <div>{wrapper}</div>
    )
}

function TopBarItem(props){
    var name = props.name
    var icon = props.icon
    return (
        <NavItem className='navbar-btn' {...props} onClick={(e) => changeRoute(e, props)}>
            {icon} 
            {name}
        </NavItem>
    )
}

function TopBarIcon(props){
    return (
        <div>
            <Navbar.Header>
                <Navbar.Brand className='navbar-btn'>
                    <img width={200} height={140} src={logoText} alt=""/>
                </Navbar.Brand>
                <Navbar.Toggle/>
            </Navbar.Header>
        </div>
    )
}

 function TopBarLeftNoState(props){
    return (
        <div>
            <Nav>
                <TopBarItem id='events' name='EVENTS' icon={<FaNewspaperO />} />
                <TopBarItem id='org' name='ORGANIZATIONS' icon={<FaGroup />} />
                <TopBarItem id='recruitments' name='RECRUITMENTS' icon={<FaStickyNoteO />} />
                <TopBarItem id='about' name='ABOUT' icon={<FaChild />} />
<Button onClick={() => {
    console.log('state?', props.state)
}}> show state</Button>
            </Nav>
        </div>
    )
}
/* use this print state; only for development purpose
*/


function AvatarSelectNoState(props){
    const { isAutheticated, photoURL, displayName } = props.user
    var AvaSize = 40
    var Ava = <Avatar {...props} round size={AvaSize}/>
    var retVal = onAuthStateChanged(function(user){
        if(user){
            console.log('onauth isUser executed')
            const { providerId, uid, displayName } = user.providerData[0]
            Ava = <Avatar {...props} name={displayName} round size={AvaSize}/>
            // switch(providerId){
            //     case'google.com':{
            //         console.log('user login with google ')
            //         Ava = <Avatar {...props} name={displayName} round size={AvaSize}/>
            //         break;
            //     }
            //     case'facebook.com': {
            //         console.log('user login with facebook ')
            //         Ava = <Avatar {...props} name={displayName} round size={AvaSize}/>
            //         break;
            //     }
            //     case'twitter.com':{
            //         console.log('user login with twitter ')
            //         Ava = <Avatar {...props} name={displayName} round size={AvaSize}/>
            //         break;
            //     }
            //     default:
            //     Ava = <Avatar {...props} name={displayName} round size={AvaSize}/>;
            // }
        } else {
            console.log('onauth isNOOOOOT executed')
            Ava =  <Avatar {...props} src={person} round size={AvaSize}/>
        }
        return <span>{Ava}</span>
    })
    return <span>{retVal}</span>
}

function TopBarRightNoState(props){
    const { isAutheticated } = props
    var id, name, icon
    if (isAutheticated) { //user logged in
        id='logout'
        name = 'LOGOUT'
        icon = <FaSignOut />        
    } else{  //user not logged in
        id='login'
        name = 'LOGIN'
        icon = <FaSignIn />
    }
    return(
        <div>
            <Nav pullRight>
                <NavDropdown id='user-avatar-dropdown' title={<AvatarSelect/>}>
                        <MenuItem>Action</MenuItem>
                        <MenuItem bsRole='toggle' id={id} onClick={(e) => changeRoute(e, props)}>{icon}{name}</MenuItem>
                </NavDropdown>
            </Nav>
        </div>
    )
}

function mapStateToProps(state){
    return {
        state: state,
        user: state.user,
        isAutheticated: state.user.isAutheticated
    }
}

var AvatarSelect = connect(mapStateToProps)(AvatarSelectNoState)
var TopBarLeft = connect(mapStateToProps)(TopBarLeftNoState)
var TopBarRight = connect(mapStateToProps)(TopBarRightNoState)
export { TopBarRight, TopBarLeft, TopBarLeftNoState, TopBarIcon, NavbarWrapper }
