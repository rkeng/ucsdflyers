import React from 'react'
import {FormGroup, form, ControlLabel, FormControl, Grid,Row, Col, PageHeader} from 'react-bootstrap'
import {Button} from 'react-bootstrap'


class CreateFlyer extends React.Component {


  render() {
    return (
      <Grid>
          <Row className="show-404">
              <Col md={8} mdOffset={2}>

      <PageHeader>Create Event Flyer <small>Name of organization</small></PageHeader>
      <form>
        <FormGroup bsSize='large'>
          <ControlLabel>Title</ControlLabel>
          <FormControl
            type="text"
            placeholder="Enter title"
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup bsSize='large'>
          <ControlLabel>Date</ControlLabel>
          <FormControl
            type="text"
            placeholder="Enter date"
            onChange={this.handleChange}
          />
          </FormGroup>
          <FormGroup bsSize='large'>
          <ControlLabel>Description</ControlLabel>
          <FormControl
            type="text"
            placeholder="Enter description"
            onChange={this.handleChange}
          />
          </FormGroup>
          <FormGroup bsSize='large'>

          <ControlLabel>Location</ControlLabel>
          <FormControl
            type="text"
            placeholder="Enter location"
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
        </FormGroup>
      </form>

      <Button
          bsStyle="primary"
          bsSize="large"
          onClick={this.open}
        >
          Preview flyer page
        </Button>


      </Col>
  </Row>
</Grid>
    );
  }
}

  export { CreateFlyer }
