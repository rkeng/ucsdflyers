import React from 'react'
import { FormGroup, Form, ControlLabel, FormControl, Grid,Row, Col, PageHeader, Modal } from 'react-bootstrap'
import { Button, Panel } from 'react-bootstrap';
import { findDOMNode } from 'react-dom';
import DatePicker from 'react-bootstrap-date-picker';
import { createNew } from '../models/index.js';
import { NotificationContainer, NotificationManager } from 'react-notifications'
import { Link } from 'react-router';



class CreateFlyer extends React.Component {
  constructor (props) {
    super(props)
    this.onPreview = this.onPreview.bind(this);
    this.onCreate = this.onCreate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onClear = this.onClear.bind(this);


    this.state = {
      success: false,
      show: false,
      like: 0,
      go: 0,
        name: "",
        date: new Date().toISOString(),
        time: "",
        description: "",
        location: "",
        files: "",

    }
  }

  onClear(event){
    event.preventDefault();
    this.setState({ success: false})

    findDOMNode(this.name).value = "";
    findDOMNode(this.time).value = "";
    findDOMNode(this.description).value = "";
    findDOMNode(this.location).value = "";
  }

  onPreview(event){
    event.preventDefault();
    this.setState({ show: true})

    const name = findDOMNode(this.name).value;
    this.setState({ name: name  })
    const time = findDOMNode(this.time).value;
    this.setState({ time: time })
    const description = findDOMNode(this.description).value;
    this.setState({ description: description })
    const location = findDOMNode(this.location).value;
    this.setState({ location: location})

  }

  onCreate(event){
    event.preventDefault();
      const flyer = {
        name: findDOMNode(this.name).value,
        time: findDOMNode(this.time).value,
        description: findDOMNode(this.description).value,
        location: findDOMNode(this.location).value,
        date: this.state.date.substring(0,10),
        active: true
      }

      if(flyer.name == "")
      NotificationManager.error('Error', 'Please enter valid name!', 2222);
      else if(flyer.time == "")
      NotificationManager.error('Error', 'Please enter valid time!', 2222);
      else if(flyer.description == "")
      NotificationManager.error('Error', 'Please enter valid description!', 2222);
      else if(flyer.location == "")
      NotificationManager.error('Error', 'Please enter valid location!', 2222);
      else{
      createNew('events',flyer)
      this.setState({ success: true})
}
  }



  getFlyer () {
      var ourDate = this.state.date
      var x = ourDate.substring(0,10)

      return(
        <Panel key={this.state.name} bsStyle='success'
            header={this.state.name}>
          <h3>{this.state.name}</h3>
            <p>
              Date: {x} <br />
              Time: {this.state.time}<br />
              Description: {this.state.description}<br />
              Location: {this.state.location}
            </p>
        </Panel>
      )
  }


  handleChange(value){
    this.setState({
      date:value
    })
  }


  render() {
    return (
      <Grid>
        <Row className="create-flyer">
          <Col md={8} mdOffset={2}>

          <PageHeader>Create Event <small>Name of club</small></PageHeader>

          <Form>
            <FormGroup>
              <ControlLabel>name</ControlLabel>

              <FormControl
                type="text"
                placeholder="Enter name"
                ref={(node) => {this.name = node}}
              />
            </FormGroup>

            <FormGroup>
              <ControlLabel>Date</ControlLabel>
              <DatePicker onChange={this.handleChange} value={this.state.date} />
              <ControlLabel>Time</ControlLabel>

              <FormControl
                type="text"
                placeholder="Enter time"
                ref={(node) => {this.time = node}}
              />
            </FormGroup>

            <FormGroup>
              <ControlLabel>Description</ControlLabel>
              <FormControl
                componentClass="textarea"
                placeholder="Enter description"
                ref={(node) => {this.description = node}}
              />
            </FormGroup>

            <FormGroup>
              <ControlLabel>Location</ControlLabel>
              <FormControl
                componentClass="textarea"
                placeholder="Enter location"
                ref={(node) => {this.location = node}}
              />
              <FormControl.Feedback />
            </FormGroup>


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

        <Col md={1} mdPush={1}>
          <Button
            bsStyle="success"
            bsSize="small"
            onClick={this.onPreview} >Preview flyer page
          </Button>

          <Modal show={this.state.success} onHide={this.close}>

            <Modal.Body>
                <div> Success! Flyer was created </div>
            </Modal.Body>

            <Modal.Footer>
            <Button onClick={this.onClear}>Create another flyer</Button>

              <Link className='btn' to='/' onClick={() => this.setState({success: false})}>
              Home Page</Link>

            </Modal.Footer>
          </Modal>

          <Modal show={this.state.show} onHide={this.close}>

            <Modal.Body>
                <div> { this.getFlyer() } </div>
            </Modal.Body>

            <Modal.Footer>
              <Button onClick={() => this.setState({show: false})}>Close</Button>
            </Modal.Footer>
          </Modal>

        </Col>
      </Row>

      <br/>
      <br/>
      <br/>

      <NotificationContainer/>

    </Grid>


    );
  }
}


export { CreateFlyer }
