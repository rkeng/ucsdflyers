import React from 'react';
import { Panel, Button, Modal } from 'react-bootstrap';
import { FaCalendar, FaGroup, FaEnvelope, FaStreetView } from 'react-icons/lib/fa';
import { Link } from 'react-router'
import { ColCenter, ObjectToArray } from '../Commen'
import { remove } from '../models'
import { connect } from 'react-redux'

class OneRecruitmentNote extends React.Component {

    constructor(props){
        super(props)
        this.state={
          showModel:false
        }
        this.onDelete = this.onDelete.bind(this)
    }
    
    orgUserDeleteFlyer(){
        const { isAuthenticated, isOrg, RecruitmentNotesCreated } = this.props.user
        const { id } = this.props.data
        return isAuthenticated && isOrg && RecruitmentNotesCreated.hasOwnProperty(id)
    }
    

    onDelete(){
        const { uid } = this.props.user
        const { id } = this.props.data
        if(this.orgUserDeleteFlyer()){
            remove(`users/${uid}/RecruitmentNotesCreated/${id}`)
            remove(`recruitmentNotes/${id}`)
        }
        this.setState({showModel:false})
    }
    

    render(){
      const { RecruitmentNotesCreated } = this.props.user
      const { seeking, clubName, dueDate, email, description, id } = this.props.data
      const recruitmentNotesArray = ObjectToArray(RecruitmentNotesCreated)
      var displayDelete = false
      if(recruitmentNotesArray.includes(id)){
        displayDelete = true
      }
      const deleteBtn = (
        <div>
            {clubName}
            <span className='pull-right'>
                <Button onClick={()=>this.setState({showModel:true})} bsStyle={'danger'}>
                    Delete
                </Button>
            </span>
        </div>
      )

      return (
            <Panel bsStyle='info' header={displayDelete ? deleteBtn : clubName}>
              <ColCenter>
                  <h5><FaStreetView/> {seeking}</h5>
                  <h5><FaCalendar/> Due date: {dueDate} <br/></h5>
                  <h5><FaGroup/> Organization: {clubName} <br/></h5>
                  <h5><FaEnvelope/> Email: {email} <br/></h5>
                  <p>{description}</p>

              </ColCenter>
              <div>
                  <Modal show={this.state.showModel}>
                      <Modal.Title>
                      <p style={{color:'darkRed', fontWeight:'bold'}} className="text-center"> Are you sure you want to delete this?</p>
                      </Modal.Title>
                      <Modal.Footer>
                          <Button bsStyle='success' onClick={()=>this.setState({showModel:false})}>Cancel</Button>
                          <Button bsStyle='danger' onClick={this.onDelete}>DELETE</Button>
                      </Modal.Footer>
                  </Modal>
              </div>
            </Panel>
        )
    }
}

OneRecruitmentNote.propTypes = {
    data: React.PropTypes.any.isRequired
};

function mapStateToProps(state){
    return{
        user: state.user
    }
}

const RecruitmentNote = connect(mapStateToProps)(OneRecruitmentNote)

export { RecruitmentNote };
