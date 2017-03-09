import React from 'react'
import { connect } from 'react-redux'
import { OrgProfileInit } from './OrgProfileInit'
import { OrgProfile } from './OrgProfile'

class OrgProfileSelectPage extends React.Component{
    
    render(){
        return <OrgProfileInit />
    }
}

function mapStateToProps(state){
    return{
    }
}

const OrgProfileSelect = connect(mapStateToProps)(OrgProfileSelectPage)
export { OrgProfileSelect } 