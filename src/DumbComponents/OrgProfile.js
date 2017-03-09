import React from 'react'
import { connect } from 'react-redux'

class OrgProfilePage extends React.Component{
    render(){
        return (
            <div>
                OrgProfile
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