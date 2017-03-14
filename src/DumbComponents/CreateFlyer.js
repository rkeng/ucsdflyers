import React from 'react'
import { FormGroup, Form, ControlLabel, FormControl, Grid,Row, Col, PageHeader, Modal, Image } from 'react-bootstrap'
import { Button, Well } from 'react-bootstrap';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux'
import DatePicker from 'react-bootstrap-date-picker';
import { Link } from 'react-router';
import { createNew, uploadImages, update } from '../models/index.js';
import { ImageDropzone } from './ImageDropzone.js';
import { PureFlyer } from './Flyer';
import Logo from '../asset/logoHorizontal.png';
import { IDtoObject } from '../Commen/index.js';
// import TimePicker from 'react-times';
import 'react-times/css/classic/default.css';
import Alert from 'react-s-alert';
import { NoPersmission } from './NoPermission'

// import { AuthWrapper, ORG } from '../Commen'


class CreateFlyerPage extends React.Component {
  constructor (props) {
    super(props)
    this.onPreview = this.onPreview.bind(this);
    this.onCreate = this.onCreate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onClear = this.onClear.bind(this);
    this.getFlyer = this.getFlyer.bind(this);
    this.state = {
      active: true,
      success: false,
      show: false,
      likes: 0,
      name: "",
      date: new Date().toISOString(),
      time: "",
      description: "",
      location: "",
      files: [],
      minute: "",
      hour: "",
      timefocus: false,
      eventURL: "",
    }
  }

  onClear(event){
    event.preventDefault();
    this.setState({ success: false, time: ""})

    findDOMNode(this.name).value = "";
    findDOMNode(this.description).value = "";
    findDOMNode(this.location).value = "";
    findDOMNode(this.eventURL).value = "";
    findDOMNode(this.time).value = "";

  }


  onPreview(event){
    event.preventDefault();
    const name = findDOMNode(this.name).value;
    const description = findDOMNode(this.description).value;
    const location = findDOMNode(this.location).value;
    const eventURL = findDOMNode(this.eventURL).value;
    const time = findDOMNode(this.time).value;

    var imagesFiles = []
    if(this.refs.dropzone && this.refs.dropzone.state.files){
      imagesFiles = this.refs.dropzone.state.files
    }
    if(!imagesFiles.length)//file is not uploaded
     Alert.error('Please upload at least one image to preview');
     else{
    this.setState({
      show: true,
      location: location,
      name: name,
      time: time,
      description: description,
      eventURL: eventURL,
      files: imagesFiles
    })
   }
  }

  onCreate(event){
    event.preventDefault();
    const { hasOrg, uid } = this.props.user
    const orgArray = this.props.orgs.filter((org)=>org.id === hasOrg)
    const clubID = uid;
    // const { time } = this.state
    const flyer = {
      name: findDOMNode(this.name).value,
      description: findDOMNode(this.description).value,
      location: findDOMNode(this.location).value,
      eventURL: findDOMNode(this.eventURL).value,
      time: findDOMNode(this.time).value,
      date: this.state.date.substring(0,10),
      active: true,
      likes: 0,
      belongsTo: orgArray[0].name,
    }

    var imagesFiles = this.refs.dropzone.state.files
    if(flyer.name === "")
      Alert.error('Please enter valid name!');
    else if(flyer.time === "")
      Alert.error('Please enter valid time!');
    else if(flyer.description === "")
      Alert.error('Please enter valid description!');
    else if(flyer.location === "")
      Alert.error('Please enter valid location!');
    else if(!imagesFiles.length)//file is not uploaded
      Alert.error('Please upload at least one image!');
    else if(!imagesFiles.length)//file is not uploaded
      Alert.error('Please enter the eventURL!');
    else{

      this.setState({ success: true})
      let flyerID = createNew('events',flyer)
      let flyerIDobj = IDtoObject(flyerID)
      // let uid = this.props.user.uid
      update(`users/${uid}/FlyersCreated`, flyerIDobj)
      if(hasOrg){
        update(`clubs/${hasOrg}/belongsTo/FlyersCreated`, flyerIDobj)
      }
       // image uploading
       // let files = this.refs.dropzone.state.files
       uploadImages("events", flyerID, clubID, imagesFiles)

    }
  }

  onTimeChange(newtime) {
    if(this.state.timefocus){
      const [ hour, minute ] = newtime.split(':');
      this.setState({hour, minute, time:newtime})
    }
    else if(this.state.time2focus){
      const [ hour, minute ] = newtime.split(':');
      this.setState({hour, minute, time2:newtime})
    }
  }

  onFocusChange(newfocus) {
    this.setState({timefocus:newfocus})
  }

  timeTrigger(event){
    const focused = this.state.timefocus;
    this.setState({ timefocus: !focused });
  }

  getFlyer () {
      var ourDate = this.state.date
      var date = (ourDate || new Date().toISOString() ).substring(0,10)
      const { name, location, description, likes, files, time, eventURL } = this.state

      const flyerData = {
        name: name,
        location: location,
        description: description,
        date: date,
        time: time,
        images: files,
        eventURL: eventURL,
        likes: likes,
      }
      //console.log('this.refs?', imagesFiles)
          // <Col sm={12} md={12}>
        return(
            <Col sm={12} mdOffset={1} md={8} >
              <Well>
                <PureFlyer flyer={flyerData} />
              </Well>
            </Col>
        )
    }

  handleChange(value){
    this.setState({
      date: value,
    })
  }


  render() {
 
    const { isAuthenticated, isOrg } = this.props.user
    var ToRender = <NoPersmission/>
    if(isAuthenticated && isOrg){

     ToRender=( 
          <Grid>
            <Row className="header">
              <Col sm={12} md={8} mdOffset={2}>

              <PageHeader>Create Event Flyer</PageHeader>
              </Col>
            </Row>
            <Row className="name">
              <Col sm={12} md={8} mdOffset={2}>
              <Form>
                <FormGroup>
                  <ControlLabel>What is the name of your upcoming event?</ControlLabel>

                  <FormControl
                    type="text"
                    placeholder="Enter name"
                    ref={(node) => {this.name = node}}
                  />
                </FormGroup>
              </Form>
              </Col>
            </Row>
            <Row className="time">
              <Col md={4} mdOffset={2}>
                <FormGroup >
                  <ControlLabel>When will it take place?</ControlLabel>
                  <DatePicker onChange={this.handleChange} value={this.state.date} showClearButton={false}/>
                </FormGroup>
              </Col>
              <Col md={4} mdOffset={0.5}>
                <FormGroup>
                  <ControlLabel>Time</ControlLabel>
                  {/*}<TimePicker
                    theme="classic"
                    time={this.state.time}
                    onFocusChange={this.onFocusChange.bind(this)}
                    onTimeChange={this.onTimeChange.bind(this)}
                    focused={this.state.timefocus}
                    trigger={(
                      <FormControl
                        placeHolder="Please choose time"
                        value={this.state.time} onClick={this.timeTrigger.bind(this)}
                      />)}
                    />*/}

                    <FormControl
                      type="text"
                      placeholder="Enter time"
                      ref={(node) => {this.time = node}}
                    />
                </FormGroup>
              </Col>
            </Row>
            <br/>
            <Row className="location">
              <Col sm={12} md={8} mdOffset={2}>
              <Form>
                <FormGroup>
                  <ControlLabel>Where is the new event going to be?</ControlLabel>
                  <FormControl
                    type="text"
                    placeholder="Enter location"
                    ref={(node) => {this.location = node}}
                  />
                  <FormControl.Feedback />
                </FormGroup>

                <FormGroup>
                  <ControlLabel>Please give students a detail description of your event</ControlLabel>
                  <FormControl
                    componentClass="textarea"
                    placeholder="Enter description"
                    ref={(node) => {this.description = node}}
                  />
                </FormGroup>

                <FormGroup>
                  <ControlLabel>Please enter the eventURL</ControlLabel>
                  <FormControl
                    type="text"
                    placeholder="Enter EventURL"
                    ref={(node) => {this.eventURL = node}}
                  />
                </FormGroup>


                <ImageDropzone ref="dropzone"/>


              </Form>
            </Col>
          </Row>

          <br/>

          <Row className="newButton">
            <Col md={1} mdOffset={2}>
              <Button
                bsStyle="primary"
                bsSize="small"
                onClick={this.onCreate}>CreateFlyer
              </Button>
            </Col>

            <Col md={1} >
              <Button
                bsStyle="success"
                bsSize="small"
                onClick={this.onPreview}>
                Preview flyer page
              </Button>

              <Modal show={this.state.success} onHide={this.close}>

                <Modal.Body>
                   <Modal.Title className='text-center' style={{color: 'blue'}}>
                      <div>Your flyer was successfully created!!!</div>
                    </Modal.Title>
                   <Image src={Logo} style={{marginTop:100}} responsive/>
                </Modal.Body>

                <Modal.Footer>
                  <Button onClick={this.onClear}>Create another flyer</Button>
                  <Link className='btn' to='/' onClick={() => this.setState({success: false})}>
                  Home Page</Link>
                </Modal.Footer>
              </Modal>

                <Modal show={this.state.show} onHide={this.close}>
                  <Modal.Body style={{height:600}}>
                      { this.getFlyer() }
                      <br/>
                      <br/>
                      <br/>
                      <br/>
                  </Modal.Body>

                  <Modal.Footer>
                    <Button onClick={() => this.setState({show: false})}>Close</Button>
                  </Modal.Footer>
                </Modal>

            </Col>
          </Row>
        </Grid>)
    }

    return (
      <div> {ToRender} </div>
    ) 
  }
}


function mapStateToProps(state){
  return{
    user: state.user,
    orgs: state.data.orgs
  }
}
// const CreateFlyer = AuthWrapper(connect(mapStateToProps)(CreateFlyerPage), ORG)
const CreateFlyer = connect(mapStateToProps)(CreateFlyerPage)
export { CreateFlyer }
