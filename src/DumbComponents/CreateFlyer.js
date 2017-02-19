import React from 'react'
import { FormGroup, Form, ControlLabel, FormControl, Grid,Row, Col, PageHeader, Modal } from 'react-bootstrap'
import { Button, tooltip, Badge, Panel } from 'react-bootstrap';
import { findDOMNode } from 'react-dom';


class CreateFlyer extends React.Component {
  constructor (props) {
    super(props)
    this.onPreview = this.onPreview.bind(this);
    this.state = {
      show: false,
      title: "",
      date: "",
      description: "",
      location: "",
    }
  }


onPreview(event){
  event.preventDefault();
  this.setState({ show: true})

  const title = findDOMNode(this.title).value;
  this.setState({ title: title  })
  const date = findDOMNode(this.date).value;
  this.setState({ date: date })
  const description = findDOMNode(this.description).value;
  this.setState({ description: description })
  const location = findDOMNode(this.location).value;
  this.setState({ location: location})

}

getFlyer () {
    let header = (
              <div>
                  <Badge>{this.state.title}</Badge>
                  <Badge>{this.state.date}</Badge>
                  <Badge>{this.state.location}</Badge>
              </div>
          )

    return <Panel key={this.state.title} bsStyle='info'
    header={header}>{this.state.description}</Panel>

}


  render() {
    return (
      <Grid>
          <Row className="show-404">
              <Col md={8} mdOffset={2}>

      <PageHeader>Create Event Flyer <small>Name of organization</small></PageHeader>
      <Form>
        <FormGroup bsSize='large'>
          <ControlLabel>Title</ControlLabel>
          <FormControl
            type="text"
            placeholder="Enter title"
            ref={(node) => {this.title = node}}
          />
        </FormGroup>
        <FormGroup bsSize='large'>
          <ControlLabel>Date</ControlLabel>
          <FormControl
            type="text"
            placeholder="Enter date"
            ref={(node) => {this.date = node}}

          />
          </FormGroup>
          <FormGroup bsSize='large'>
          <ControlLabel>Description</ControlLabel>
          <FormControl
            type="text"
            placeholder="Enter description"
            ref={(node) => {this.description = node}}
          />
          </FormGroup>

          <FormGroup bsSize='large'>
          <ControlLabel>Location</ControlLabel>
          <FormControl
            type="text"
            placeholder="Enter location"
            ref={(node) => {this.location = node}}
          />
          <FormControl.Feedback />
        </FormGroup>
      </Form>

      <Button
          bsStyle="primary"
          bsSize="large"
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
