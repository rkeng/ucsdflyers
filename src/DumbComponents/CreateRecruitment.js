import React from 'react'
import { FormGroup, Form, ControlLabel, FormControl, Grid,Row, Col, PageHeader, Modal } from 'react-bootstrap'
import { Button, ButtonToolbar } from 'react-bootstrap';
import { connect } from 'react-redux'
import { findDOMNode } from 'react-dom';
import DatePicker from 'react-bootstrap-date-picker'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import { Link } from 'react-router';
import { createNew, update } from '../models/index.js';
import { RecruitmentNote } from './RecruitmentNote.js';
import { IDtoObject } from '../Commen/index.js';

const buttonStyles = {maxWidth: 800}
const textStyles={height:200}

class CreateRecruitmentPage extends React.Component {
  constructor (props) {
    super(props)
    this.onPreview = this.onPreview.bind(this);
    this.onCreate = this.onCreate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      show: false,
      seeking: "",
      dueDate: new Date().toISOString(),
      clubName: "",
      email:"",
      description: ""
    }
  }

  onPreview(event){
    event.preventDefault();
    const orgName = findDOMNode(this.clubName).value;
    const seeking = findDOMNode(this.seeking).value;
    const email = findDOMNode(this.email).value;
    const description = findDOMNode(this.description).value;
    this.setState({
      show: true,
      clubName: orgName,
      seeking: seeking,
      email: email,
      description: description
    })
  }

  onCreate(event){
    event.preventDefault();
    const { uid } = this.props.user
    const note = {
      clubName: findDOMNode(this.clubName).value,
      seeking: findDOMNode(this.seeking).value,
      email: findDOMNode(this.email).value,
      dueDate: this.state.dueDate.substring(0,10),
      description: findDOMNode(this.description).value,
      belongsTo: uid
    }
    if(note.clubName === "")
      NotificationManager.error('Error', 'Please enter valid name!', 2222);
    else if(note.seeking === "")
      NotificationManager.error('Error', 'Please enter valid position!', 2222);
    else if(note.description === "")
      NotificationManager.error('Error', 'Please enter valid description!', 2222);
    else if(note.email === "")
      NotificationManager.error('Error', 'Please enter valid email!', 2222);
    else{
      let noteID = createNew('recruitmentNotes',note)
      let noteIDobj = IDtoObject(noteID)
      update(`users/${uid}/RecruitmentNotesCreated`, noteIDobj)
      NotificationManager.success('Sweet', 'You have successfully created a recruitment note', 2222);
      findDOMNode(this.clubName).value = "";
      findDOMNode(this.seeking).value = "";
      findDOMNode(this.description).value = "";
      findDOMNode(this.email).value = "";
    }
  }

  getRecruitments () {
    var ourDate = this.state.dueDate
    var dueDate = (ourDate || new Date().toISOString() ).substring(0,10)
    const { clubName, email, description, seeking } = this.state
    const noteData = {
      clubName: clubName,
      description: description,
      dueDate: dueDate,
      seeking: seeking,
      email: email
    }
    return(
      <Col sm={12} md={12}>
          <RecruitmentNote data={noteData} />
      </Col>
  )}

  handleChange(value,formattedValue){
    this.setState({
      dueDate:value,
    })
  }


  render() {
    return (
      <Grid>
      <Row className="CreateRecruitment">
      <Col md={8} mdOffset={2}>

      <PageHeader>Post Recruitment Notes <small>Name of organization</small></PageHeader>
      <Form>
      <FormGroup>
        <Col>
          <ControlLabel>Organization Name </ControlLabel>
          <FormControl type="text" ref={ (node)=> {this.clubName = node} } placeholder="Enter your organization name here" />
        </Col>
      </FormGroup>

      <FormGroup>
        <Col>
          <ControlLabel>Seeking for: </ControlLabel>
          <FormControl type="text" ref={ (node)=> {this.seeking = node} } placeholder="Enter your title here" />
        </Col>
      </FormGroup>

      <FormGroup controlId="formControlsTextarea">
        <ControlLabel>Contact Email</ControlLabel>
        <FormControl type="text" ref={ (node)=> {this.email = node } } placeholder="Enter your contact email" />
      </FormGroup>

      <FormGroup controlId="formControlsTextarea">
        <ControlLabel>Date</ControlLabel>
        <DatePicker onChange={this.handleChange} value={this.state.dueDate} />
      </FormGroup>

      <FormGroup controlId="formControlsTextarea">
        <ControlLabel>Recruitment description</ControlLabel>
        <FormControl componentClass="textarea" ref={ (node)=> {this.description = node } } style={textStyles} placeholder="Enter your recruitment description" />
      </FormGroup>

      </Form>

      <br/>
      <div className="Button" style={buttonStyles}>
        <ButtonToolbar>
          <Button onClick={this.onPreview} bsStyle="info" type='submit'>Preview</Button>
          <Button onClick={this.onCreate} bsStyle="success" type='submit'>Submit</Button>
          <Button bsStyle="danger">Cancel</Button>
        </ButtonToolbar>
      </div>
      <br/>

      <Modal show={this.state.show} onHide={this.close}>
        <Modal.Body>
          <div>
            {this.getRecruitments()}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.setState({show: false})}>Close</Button>
        </Modal.Footer>
      </Modal>
      </Col>
      </Row>
      <NotificationContainer/>
      </Grid>
    );
  }
}

function mapStateToProps(state){
  return{
    user: state.user
  }
}
const CreateRecruitment = connect(mapStateToProps)(CreateRecruitmentPage)
export { CreateRecruitment }
