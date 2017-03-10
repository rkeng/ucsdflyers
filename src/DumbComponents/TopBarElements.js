import React from 'react'
import { browserHistory } from 'react-router'
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, Image } from 'react-bootstrap'
import { FaNewspaperO, FaGroup, FaStickyNoteO, FaChild, FaSignIn, FaSignOut, FaHeartO } from 'react-icons/lib/fa'
import { connect } from 'react-redux'
import { LogoutUserAction } from '../State/actions'
import { signOutUser, detachListenerOn } from '../models'
import Avatar from 'react-avatar'
import logoText from '../asset/logoText.png'
import person from '../asset/person.jpg'



function changeRoute(e, props, uid) {
    e.preventDefault()
    const { dispatch } = props
    const newRoute = e.target.id
    if(newRoute === 'logout'){
        signOutUser().then(_ => {
            if(uid){
                detachListenerOn(`users/${uid}`)
            }
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
    if(props.dummy){
        wrapper = <Navbar></Navbar>
    }
    return(
        <span>{wrapper}</span>
    )
}

function TopBarItem(props){
    var name = props.name
    var icon = props.icon
    return (
        <NavItem {...props} className='topbar-items' onClick={(e) => changeRoute(e, props)}>
            {icon} 
            {name}
        </NavItem>
    )
}

function TopBarIcon(props){
    return (
            <Navbar.Header>
                <Navbar.Brand>
                    <Image className='icon-img' style={{marginTop:'3px'}} width={200} height={100} src={logoText} alt=""/>
                </Navbar.Brand>
                <Navbar.Toggle/>
            </Navbar.Header>
    )
}

 function TopBarLeftNoState(props){
    var topbarItemsToRender = [
            <TopBarItem id='events' name='EVENTS' icon={<FaNewspaperO />} />,
            <TopBarItem id='org' name='ORGANIZATIONS' icon={<FaGroup />} />,
            <TopBarItem id='recruitments' name='RECRUITMENTS' icon={<FaStickyNoteO />} />,
            <TopBarItem id='about' name='ABOUT' icon={<FaChild />} /> ,
        ]
    if(props.user.isOrg){
        topbarItemsToRender = [
            <TopBarItem id='events' name='EVENTS' icon={<FaNewspaperO />} />,
            <TopBarItem id='org' name='ORGANIZATIONS' icon={<FaGroup />} />,
            <TopBarItem id='recruitments' name='RECRUITMENTS' icon={<FaStickyNoteO />} />,
            <TopBarItem id='create-flyer' name='Create Flyer' icon={<FaNewspaperO />} />,
            <TopBarItem id='create-recruitment' name='Create Recruitment' icon={<FaGroup />} />,
            <TopBarItem id='about' name='ABOUT' icon={<FaChild />} /> 
        ]
    }
    return (
            <Nav>   
                {topbarItemsToRender}
            </Nav>
    )
}
/* use this print state; only for development purpose
                <button onClick={() => {
                    console.log('state?', props.state)
                }}> show state</button>
*/


class AvatarSelectNoState extends React.Component {
    constructor(props){
        super(props)
        var AvaSize = 25
        this.state={
            Ava:  <Avatar {...props} src={person} round size={AvaSize}/>
        }
    }

    render(){
        var that = this
        const { isAutheticated, displayName } = that.props.user
        var newAva
        var AvaSize = 25
        if(isAutheticated){
            const { providerId, uid } = that.props.user.providerData[0]
            switch(providerId){
                case'google.com':{
                    // console.log('user login with google ')
                    newAva = <Avatar {...that.props} name={displayName} round size={AvaSize} textSizeRatio={2.5} />
                    break;
                }
                case'facebook.com': {
                    // console.log('user login with facebook ')
                    newAva = <Avatar {...that.props} facebookId={uid} name={displayName} round size={AvaSize} textSizeRatio={2.5}/>
                    break;
                }
                case'twitter.com':{
                    // console.log('user login with twitter ')
                    newAva = <Avatar {...that.props} twitterId={uid} name={displayName} round size={AvaSize} textSizeRatio={2.5}/>
                    break;
                }
                default:
                newAva = <Avatar {...that.props} src={person} round />;
            }
            that.state={
                Ava:  newAva
            }
        }
        return <i className='user-avatar-image'>{this.state.Ava}</i>
    }
}

function TopBarRightNoState(props){
    const { isAutheticated, uid } = props.user
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
            <Nav pullRight>
                <NavDropdown id='user-avatar-dropdown' title={<AvatarSelect/>} >
                        <MenuItem id='my-flyers' onClick={(e) => changeRoute(e, props)}><FaHeartO/>My Flyers</MenuItem>
                        <MenuItem id={id} onClick={(e) => changeRoute(e, props, uid)}>{icon}{name}</MenuItem>
                </NavDropdown>
            </Nav>
    )
}

function mapStateToProps(state){
    return {
        state: state,
        user: state.user
    }
}

var AvatarSelect = connect(mapStateToProps)(AvatarSelectNoState)
var TopBarLeft = connect(mapStateToProps)(TopBarLeftNoState)
var TopBarRight = connect(mapStateToProps)(TopBarRightNoState)
export { TopBarRight, TopBarLeft, TopBarLeftNoState, TopBarIcon, NavbarWrapper }
