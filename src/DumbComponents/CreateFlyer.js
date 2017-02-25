import React from 'react'
import { FormGroup, Form, ControlLabel, FormControl, Grid,Row, Col, PageHeader, Modal } from 'react-bootstrap'
import { Button, Badge, Panel } from 'react-bootstrap';
import { findDOMNode } from 'react-dom';
import DatePicker from 'react-bootstrap-date-picker'
import TimePicker from 'rc-time-picker';



class CreateFlyer extends React.Component {
  constructor (props) {
    super(props)
    this.onPreview = this.onPreview.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      show: false,
      title: "",
      date: new Date().toISOString(),
      description: "",
      location: "",
      time: 0,
    }
  }

onPreview(event){
  event.preventDefault();
  this.setState({ show: true})

  const title = findDOMNode(this.title).value;
  this.setState({ title: title  })
  const description = findDOMNode(this.description).value;
  this.setState({ description: description })
  const location = findDOMNode(this.location).value;
  this.setState({ location: location})

}



getFlyer () {
    var ourDate = this.state.date
    var x = ourDate.substring(0,10)

    let header = (
              <div>
                  <Badge>{this.state.title}</Badge>
                  <Badge>{x}</Badge>
                  <Badge>{this.state.location}</Badge>
              </div>
          )

    return <Panel key={this.state.title} bsStyle='info'
    header={header}>{this.state.description}</Panel>

}

handleChange(value){
  this.setState({
    date:value
  })
}

handleTimeChange(time){
  this.setState({time});
}


  render() {
    return (
      <Grid>
          <Row className="create-flyer">
              <Col md={8} mdOffset={2}>

      <PageHeader>Create Event Flyer <small>Name of organization</small></PageHeader>
      <Form>
        <FormGroup>
          <ControlLabel>Title</ControlLabel>
          <FormControl
            type="text"
            placeholder="Enter title"
            ref={(node) => {this.title = node}}
          />
        </FormGroup>

        <FormGroup>
          <ControlLabel>Date</ControlLabel>
          <DatePicker onChange={this.handleChange} value={this.state.date} />
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



      <Button
          bsStyle="primary"
          bsSize="small"
          onClick={this.onPreview}
        >
          Preview flyer page
        </Button>

        <Modal show={this.state.show} onHide={this.close}>
                 <Modal.Body>
                 <div>
                 {this.getFlyer()}
                 </div>
                 </Modal.Body>
                 <Modal.Footer>
                   <Button onClick={() => this.setState({show: false})}>Close</Button>
                 </Modal.Footer>
        </Modal>
      </Col>
    </Row>
  </Grid>
    );
  }
}

  export { CreateFlyer }
