import React from 'react';
import { Form, FormControl, Button, ControlLabel, Grid, Row, Col, select, ButtonToolbar, form, FormGroup} from 'react-bootstrap';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';

const buttonStyles = {maxWidth: 800}
const textStyles={height:200}

class NewRecruitmentNotes extends React.Component {
  constructor (props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit (event) {
    event.preventDefault()
    // console.log('button clicked')
    let name = findDOMNode(this.name).value
    let title = findDOMNode(this.title).value
    let description = findDOMNode(this.description).value

    let { dispatch } = this.props

  }

  render () {
    return (
      <Grid>
        <Row className="post-recruitment">
          <Col lg={6} lgPush={3}>
            <h1> Post new recruitment notes: </h1>
            <Form onSubmit={this.onSubmit}>
              <form horizontal >
                <FormGroup>
                  <br></br>
                  <Col>
                    <ControlLabel>Organization Name </ControlLabel>
                    <FormControl type="text" ref={ (node)=> this.name = node } placeholder="Enter your organization name here" />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col>
                    <ControlLabel>Recruitment Note Title </ControlLabel>
                    <FormControl type="text" ref={ (node)=> this.title = node } placeholder="Enter your title here" />
                  </Col>
                </FormGroup>
                  <FormGroup controlId="formControlsTextarea">
                  <ControlLabel>Recruitment description</ControlLabel>
                  <FormControl componentClass="textarea" ref={ (node)=> this.description = node } style={textStyles} placeholder="Enter your recruitment description" />
                </FormGroup>
              </form>

              <br/>
              <div className="Button" style={buttonStyles}>
                <ButtonToolbar>
                  <Button onClick={this.onSubmit} bsStyle="success" type='submit'>Submit</Button>
                  <Button bsStyle="danger">Cancel</Button>
                </ButtonToolbar>
              </div>
              <br/>
            </Form>
          </Col>
        </Row>
      </Grid>
    )
  }
}

// new component that listens to state
const PostRecruitment = connect()(NewRecruitmentNotes)
export { PostRecruitment }
