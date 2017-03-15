import React from 'react'
import { browserHistory } from 'react-router'
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, Image } from 'react-bootstrap'
import { FaNewspaperO, FaGroup, FaStickyNoteO, FaChild, 
         FaSignIn, FaSignOut, FaHeartO, FaPaperPlaneO, FaPlus, FaTag } from 'react-icons/lib/fa'
import { connect } from 'react-redux'
import { LogoutUserAction } from '../State/actions'
import { signOutUser, detachListenerOn } from '../models'
import Avatar from 'react-avatar'
import logoHorizontal from '../asset/logoHorizontal.png'
import person from '../asset/person.jpg'
// import { firebase } from '../models/FlyersFirebase'
// import { createNew } from '../models'


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
                    <Image id='/' onClick={changeRoute} className='icon-img' 
                        style={{marginTop:'3px'}} width={180} height={120} src={logoHorizontal} alt=""/>
                </Navbar.Brand>
                <Navbar.Toggle/>
            </Navbar.Header>
    )
}

 function TopBarLeftNoState(props){
    var topbarItemsToRender = [
            <TopBarItem id='events' key={0} name='EVENTS' icon={<FaNewspaperO />} />,
            <TopBarItem id='org' key={1} name='ORGANIZATIONS' icon={<FaGroup />} />,
            <TopBarItem id='recruitments' key={2} name='RECRUITMENTS' icon={<FaStickyNoteO />} />,
            <TopBarItem id='about' key={3} name='ABOUT' icon={<FaChild />} />
        ]
    if(props.user.isOrg){
        topbarItemsToRender = [
            <TopBarItem id='events' key={0} name='EVENTS' icon={<FaNewspaperO />} />,
            <TopBarItem id='org' key={1} name='ORGANIZATIONS' icon={<FaGroup />} />,
            <TopBarItem id='recruitments' key={2} name='RECRUITMENTS' icon={<FaStickyNoteO />} />,
            <TopBarItem id='create-flyer' key={3} name='CREATE EVENT' icon={<FaPlus />} />,
            <TopBarItem id='create-recruitment' key={4} name='CREATE RECRUITMENT' icon={<FaTag />} />,
            <TopBarItem id='about' key={5} name='ABOUT' icon={<FaChild />} />
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
                    // firebase.database().ref('users').once('value').then(snap => {
                    //     var allInstance = snap.val();
                    //     var allKeys = Object.keys(allInstance)
                    //     allKeys.forEach(key=>{
                    //         if(!allInstance[`${key}`].id){
                    //             firebase.database().ref(`users/${key}`).remove()
                    //         }
                        
                    //     })
                    // })
                    // var ELSorg = {
                    //     belongsTo: 'N/A',
                    //     descrription: 'In ESL, we strive to make students life easier and better',
                    //     id: '',
                    //     name: 'Enriching Student Life',
                    //     website: 'https://ucsd-flyers.firebaseapp.com/about'
                    // }
                    // createNew('clubs', ELSorg)
                }}> show state</button>
*/


class AvatarSelectNoState extends React.Component {

    render(){
        let that = this
        const { isAuthenticated, displayName } = that.props.user
        var AvaSize = 25
        var Ava = <Avatar {...that.props} src={person} round size={AvaSize}/>
        if(isAuthenticated){
            const { providerId, uid } = that.props.user.providerData[0]
            switch(providerId){
                case'google.com':{
                    // console.log('user login with google ')
                    Ava = <Avatar {...that.props} name={displayName} round size={AvaSize} textSizeRatio={2.5} />
                    break;
                }
                case'facebook.com': {
                    // console.log('user login with facebook ')
                    Ava = <Avatar {...that.props} facebookId={uid} name={displayName} round size={AvaSize} textSizeRatio={2.5}/>
                    break;
                }
                case'twitter.com':{
                    // console.log('user login with twitter ')
                    Ava = <Avatar {...that.props} twitterId={uid} name={displayName} round size={AvaSize} textSizeRatio={2.5}/>
                    break;
                }
                default:
                Ava = <Avatar {...that.props} src={person} round />;
            }
        }
        return <i className='user-avatar-image'>{Ava}</i>
    }
}

function TopBarRightNoState(props){
    const { isAuthenticated, uid } = props.user
    var DropDownToRender = [
        <MenuItem key={0} id='feedback' onClick={(e) => changeRoute(e, props)}><FaPaperPlaneO/>Contact Us</MenuItem>,
        <MenuItem key={1} id='login' onClick={(e) => changeRoute(e, props, uid)}><FaSignIn />LOGIN</MenuItem>
    ]
    if (isAuthenticated) { //user logged in
        DropDownToRender = [
            <MenuItem key={0} id='profile' onClick={(e) => changeRoute(e, props)}><FaHeartO/>Profile</MenuItem>,
            <MenuItem key={1} id='feedback' onClick={(e) => changeRoute(e, props)}><FaPaperPlaneO/>Contact Us</MenuItem>,
            <MenuItem key={2} id='logout' onClick={(e) => changeRoute(e, props, uid)}><FaSignOut />LOGOUT</MenuItem>
        ]
    } 
    return(
            <Nav pullRight>
                <NavDropdown id='user-avatar-dropdown' title={<AvatarSelect/>} >
                    {DropDownToRender}
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
