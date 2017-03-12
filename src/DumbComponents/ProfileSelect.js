import React from 'react'
import { connect } from 'react-redux'
import { ProfileStudent } from './ProfileStudent'
import { OrgProfile } from './OrgProfile'

class ProfileSelectPage extends React.Component{
    
    render(){
        const { isOrg } = this.props.user
        var Profile = <ProfileStudent/>
        // console.log('user has org:', hasOrg)
        // console.log('is hasOrg===true?', hasOrg===true)
        if(isOrg){
            Profile = <OrgProfile/>
        }
        return <div> {Profile} </div>
    }
}

function mapStateToProps(state){
    return{
        user: state.user
    }
}

const ProfileSelect = connect(mapStateToProps)(ProfileSelectPage)
export { ProfileSelect } 