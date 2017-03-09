import React from 'react'
import { connect } from 'react-redux'

/*
    An Array of all organization is available on "this.props.orgs"
    
    I need a few things from this component:
        1. I want the user to be able to select their org by name,
            below code looks promising, all we need is to use array's map method 
            to create a list of <options value={org.name} /> 
                <FormGroup controlId="formControlsSelect">
                  <ControlLabel>Select</ControlLabel>
                  <FormControl componentClass="select" placeholder="select">
                    <option value="select">select</option>
                    <option value="other">...</option>
                  </FormControl>
                </FormGroup>

        2. After user select their org, they need to press the conform button:
                the confirm button will show a modal, 
                modal body should contain a warning message: 
                    "You can perfrom this action <b>ONLY ONCE</b>, selecting an orgnaization that 
                    you are not a staff of may result in lawsuit. Are you sure you want to register as {ORG_NAME}"
                modal footer should contain 2 buttons:
                    1. <Button bsStyle='danger'>Yes</Button>
                    2. <Button >Cancel</Button>

            The Cancel button should simple close the modal, them user can select a new org
            Leave the "Yes" button operation to me, I will link the org to the user account

*/
class OrgProfileInitPage extends React.Component{
    
    render(){
        return <div> org init page </div>
    }
}

function mapStateToProps(state){
    return{
        orgs: state.data.orgs
    }
}

const OrgProfileInit = connect(mapStateToProps)(OrgProfileInitPage)
export { OrgProfileInit }