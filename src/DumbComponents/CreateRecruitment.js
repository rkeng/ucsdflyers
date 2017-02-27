import React from 'react'
import { FormGroup, Form, ControlLabel, FormControl, Grid,Row, Col, PageHeader, Modal } from 'react-bootstrap'
import { Button, ButtonToolbar, tooltip, Badge, Panel } from 'react-bootstrap';
import { findDOMNode } from 'react-dom';
import { createNew } from '../models/index.js';

const buttonStyles = {maxWidth: 800}
const textStyles={height:200}

class CreateRecruitment extends React.Component {
  constructor (props) {
    super(props)
    this.onPreview = this.onPreview.bind(this);
    this.state = {
      show: false,
      name: "",
      title: "",
      description: ""
    }
  }


  onPreview(event){
    event.preventDefault();
    this.setState({ show: true})

    const name = findDOMNode(this.name).value;
    this.setState({ name: name  })
    const title = findDOMNode(this.title).value;
    this.setState({ title: title })
    const description = findDOMNode(this.description).value;
    this.setState({ description: description })
  }

  onCreate(event){
    event.preventDefault();

    const note = {
      name: findDOMNode(this.name).value,
      title: findDOMNode(this.title).value,
      description: findDOMNode(this.description).value
    }
    createNew('recruitmentNotes',note)
  }

  getRecruitments () {
    let header = (
      <div>
      <Badge>{this.state.name}</Badge>
      <Badge>{this.state.title}</Badge>
      </div>
    )

    return <Panel key={this.state.title} bsStyle='info' header={header}>{this.state.description}</Panel>

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
          <FormControl type="text" ref={ (node)=> {this.name = node} } placeholder="Enter your organization name here" />
        </Col>
      </FormGroup>

      <FormGroup>
        <Col>
          <ControlLabel>Recruitment Note Title </ControlLabel>
          <FormControl type="text" ref={ (node)=> {this.title = node} } placeholder="Enter your title here" />
        </Col>
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
      </Grid>
    );
  }
}

export { CreateRecruitment }
