import React from 'react';
import { Panel, Button, Modal } from 'react-bootstrap';
import { FaCalendar, FaGroup, FaEnvelope, FaStreetView } from 'react-icons/lib/fa';
// import { Link } from 'react-router'
import { ColCenter, ObjectToArray } from '../Commen'
import { remove, update } from '../models'
import { connect } from 'react-redux'

class OneRecruitmentNote extends React.Component {

    constructor(props){
        super(props)
        this.state={
          liked: false,
          showModel:false
        }
        this.onDelete = this.onDelete.bind(this)
        this.onLike = this.onLike.bind(this)
    }
    
    orgUserDeleteFlyer(){
        const { isAuthenticated, isOrg, RecruitmentNotesCreated } = this.props.user
        const { id } = this.props.data
        return isAuthenticated && isOrg && RecruitmentNotesCreated.hasOwnProperty(id)
    }
   
    userLoggedInAsStudentNotLikedFlyer(){
        const { isAuthenticated, isOrg, RecruitmentNotesSaved } = this.props.user
        const { id } = this.props.data
        return isAuthenticated && !isOrg && !RecruitmentNotesSaved.hasOwnProperty(id)
    }

    userLoggedInAsStudentLikedFlyer(){
        const { isAuthenticated, isOrg, RecruitmentNotesSaved } = this.props.user
        const { id } = this.props.data
        return isAuthenticated && !isOrg && RecruitmentNotesSaved.hasOwnProperty(id)
    } 

    onLike(){
        const { uid } = this.props.user
        const { id } = this.props.data
        var newRec = {}
        newRec[`${id}`] = id

        if(this.userLoggedInAsStudentNotLikedFlyer()){
            //update method will only update the field, not overwriting the whol thing
            update(`users/${uid}/RecruitmentNotesSaved`, newRec)
            // update(`events/${id}`, {likes: likes + 1})
        }
        if(this.userLoggedInAsStudentLikedFlyer()){
            remove(`users/${uid}/RecruitmentNotesSaved/${id}`)
            // update(`events/${id}`, {likes: likes - 1})
        }

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

        //prepare the liked state of the button
        var isLiked = this.state.liked
        if(this.userLoggedInAsStudentLikedFlyer()){ //don't allow org to like flyers
            isLiked = true
        }
        if(this.userLoggedInAsStudentNotLikedFlyer()){
            isLiked = false
        }
        const btnColor =  isLiked ? 'danger' : 'info'
        // const HeatIcon =  isLiked ?  FaHeart : FaHeartO
        const title = isLiked ? 'Unsave' : 'Save'
        const titleAndLikeBtn = (
            <div>
                {name}
                <span className='pull-right'>
                    <Button onClick={this.onLike} bsStyle={btnColor}>
                        {title}
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
                  {titleAndLikeBtn}
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
