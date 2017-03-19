import React from 'react'
import { FormGroup, Form, ControlLabel, FormControl, Grid,Row, Col, PageHeader, Modal } from 'react-bootstrap'
import { Button, ButtonToolbar } from 'react-bootstrap';
import { connect } from 'react-redux'
import { findDOMNode } from 'react-dom';
import DatePicker from 'react-bootstrap-date-picker'
import { Link } from 'react-router';
import { createRecruitment } from '../firebase/index.js';
import { RecruitmentNote } from './RecruitmentNote.js';
import Alert from 'react-s-alert';
import { NoPersmission } from './NoPermission'
// import { CreateRecruitmentAction } from '../State/actions'


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

  getOrgName(){
    const { hasOrg } = this.props.user
    var orgArray = this.props.orgs.filter((org)=>org.id === hasOrg)
    return orgArray[0].name
  }

  onPreview(event){
    event.preventDefault();
    const seeking = findDOMNode(this.seeking).value;
    const email = findDOMNode(this.email).value;
    const description = findDOMNode(this.description).value;
    this.setState({
      show: true,
      clubName: this.getOrgName(),
      seeking: seeking,
      email: email,
      description: description
    })
  }

  onCreate(event){
    event.preventDefault();
    const { uid, email } = this.props.user
    const note = {
      clubName: this.getOrgName(),
      seeking: findDOMNode(this.seeking).value,
      email: findDOMNode(this.email).value,
      dueDate: this.state.dueDate.substring(0,10),
      description: findDOMNode(this.description).value,
      belongsTo: uid,
      orgEmail: email
    }
    if(note.clubName === "")
      Alert.error('Please enter valid name!');
    else if(note.seeking === "")
      Alert.error('Please enter valid position!');
    else if(note.description === "")
      Alert.error('Please enter valid description!');
    else if(note.email === "")
      Alert.error('Please enter valid email!');
    else{
      createRecruitment(note, this.props.user).then(_ => {
        Alert.success('You have successfully created a recruitment note How Lovely');
        findDOMNode(this.seeking).value = "";
        findDOMNode(this.description).value = "";
        findDOMNode(this.email).value = "";
      })
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
    const { isAuthenticated, isOrg } = this.props.user
    var ToRender = <NoPersmission/>

    if(isAuthenticated && isOrg){
       ToRender = (
            <Grid>
            <Row className="CreateRecruitment">
            <Col md={8} mdOffset={2}>

            <PageHeader>Post Recruitment Notes</PageHeader>
            <Form>
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
              <DatePicker onChange={this.handleChange} value={this.state.dueDate} showClearButton={false}/>
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
                <Link className='btn btn-danger' to='/recruitments' >Cancel</Link>
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
            </Grid>

        )
    }
    return (
      <div> {ToRender} </div>
    );
  }
}

function mapStateToProps(state){
  return{
    user: state.user,
    orgs: state.data.orgs
  }
}
const CreateRecruitment = connect(mapStateToProps)(CreateRecruitmentPage)
export { CreateRecruitment }
