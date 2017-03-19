import React from 'react'
import { connect } from 'react-redux'
import { OrgProfileInit } from './OrgProfileInit'
import { OrgProfile } from './OrgProfile'

class OrgProfileSelectPage extends React.Component{
    
    render(){
        const { hasOrg } = this.props.user
        var orgPageToRender = <OrgProfileInit/>
        // console.log('user has org:', hasOrg)
        // console.log('is hasOrg===true?', hasOrg===true)
        if(hasOrg){
            orgPageToRender = <OrgProfile/>
        }
        return <div> {orgPageToRender} </div>
    }
}

function mapStateToProps(state){
    return{
        user: state.user
    }
}

const OrgProfileSelect = connect(mapStateToProps)(OrgProfileSelectPage)
export { OrgProfileSelect } 