import React from 'react'
import { connect } from 'react-redux'
import { ColCenter, IDtoObject } from '../Commen'
import { FormGroup, FormControl, Button, Modal } from 'react-bootstrap'
import { firebase } from '../models/FlyersFirebase'
import { browserHistory } from 'react-router'

class OrgProfileInitPage extends React.Component{

    constructor (props){
      super(props)
      this.state={
        showModal: false,
        value: "",
      }
      this.handleChange = this.handleChange.bind(this)
      this.popModal = this.popModal.bind(this)
      this.confirm = this.confirm.bind(this)
    }

    handleChange(event) {
      this.setState({
        value: event.target.value
      });
    }


    getOptions(){
      var options = this.props.orgs.map((org, index) => (
        <option value={org.name} key={index}>{org.name}</option>
      ))
      return(
          <FormGroup controlId="formControlsSelect">
            <FormControl 
                componentClass="select" 
                placeholder="select" 
                onChange={this.handleChange}
            >
              <option value="placeholder">"Pleace select an orgnaization"</option>
              {options}
            </FormControl>
          </FormGroup>
      )
    }

    popModal(event){
      this.setState({showModal:true})
    }
/*
    close(event){
      this.setState({ showModal: false });
    }
*/
    confirm(e){
        e.preventDefault()
        const orgName = this.state.value
        const theOrg = this.props.orgs.filter(orgs => orgs.name === orgName)[0]
        const { uid } = this.props.user
        const userIDObj = IDtoObject(uid)
        firebase.database().ref(`users/${uid}`).update({hasOrg: `${theOrg.id}`})
        firebase.database().ref(`clubs/${theOrg.id}/belongsTo`).update(userIDObj)
        .then(_ => {
            browserHistory.push('/create-flyer')
        })
    }

    render(){
        return(
            <ColCenter>
                {this.getOptions()}
                <div className='pull-right'>
                    <Button bsStyle='info' onClick={this.popModal}>Confirm</Button>
                </div>
                <Modal show={this.state.showModal} >
                    <Modal.Body>
                        You can perfrom this action <b>ONLY ONCE</b>, selecting an orgnaization that
                        you are not a staff of may result in lawsuit.
                        Are you sure you want to register as a member of <b>{this.state.value}</b> ?
                    </Modal.Body>

                    <Modal.Footer>
                        <Button bsStyle='danger' onClick={this.confirm}>Yes</Button>
                        <Button onClick={() => {this.setState({showModal: false})}} > Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </ColCenter>
        )
    }
}

OrgProfileInitPage.defaultProps = {
    orgs: []
}

function mapStateToProps(state){
    return{
        orgs: state.data.orgs,
        user: state.user
    }
}

const OrgProfileInit = connect(mapStateToProps)(OrgProfileInitPage)
export { OrgProfileInit}
