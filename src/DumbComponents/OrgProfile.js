import React from 'react'
import { connect } from 'react-redux'

class OrgProfilePage extends React.Component{
    render(){
        const { isAutheticated, isOrg } = this.props.user;
        var toRender = <div> insufficient permission </div>
        if(isAutheticated && isOrg){
            toRender = <div> Org Profile Page </div>
        }
        return (
            <div>
                {toRender}
            <button onClick={()=>{
            console.log('user?', this.props.user)
        }}> OrgProfile page </button>
            </div>
        )
    }
}


function mapStateToProps(state){
    return {
        user: state.user
    }
}
const OrgProfile = connect(mapStateToProps)(OrgProfilePage)
export { OrgProfile }