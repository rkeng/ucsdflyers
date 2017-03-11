import React from 'react'
import { connect } from 'react-redux'

const Role = {
    GUEST: 0,
    STUDENT: 1,
    ORG: 2
}
const GUEST = Role.GUEST
const STUDENT = Role.STUDENT
const ORG = Role.ORG

function AuthWrapper(component, who){

    function AuthComponent(props){

        var toRender = <div> <component/> </div>
        const { isAutheticated, isOrg } = props.user
        if(!isAutheticated  //restrict Guest access
        || (isAutheticated && !isOrg && who === ORG) //restrict student access
        || (isAutheticated && isOrg && who === STUDENT)){ //Restrict org access
            toRender = <div> insufficient permission </div>
        } 

        return <div>{toRender}</div>
    }


    function mapStateToProps(state){
        return {
            user: state.user
        }
    }
    const NewComponent = connect(mapStateToProps)(AuthComponent)
    return NewComponent
}


export { AuthWrapper, GUEST, STUDENT, ORG }

/*
AuthWrapper(connect(mapStateToProps)(MyFlyerPage), 'students only', 'orgs')

List of flyers/Org/recruitments => students && general

MyFlyer (profile: liked fleyrs + followed orgs) => students

create-flyer, create-recruitemnt, OrgProfileSelect => orgs
*/