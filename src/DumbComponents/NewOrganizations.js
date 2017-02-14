import React from 'react'
import ReactDOM from 'react-dom'
import {FormControl, Checkbox, Button, ControlLabel, Grid, Row, Col, select, ButtonToolbar, form} from 'react-bootstrap'

const buttonStyles = {maxWidth: 800}

class NewOrganizations extends React.Component {

  render () {
    return (
      <Grid>
        <Row className = "show-registration">
          <Col lg={6} lgPush={3}>
            <h1> Sign up as organizations: </h1>
            <form>
                <div class="form-group">
                  <ControlLabel for="organizationName">Organization Name</ControlLabel>
                  {'  '}
                  <input type="text" class="form-control" id="organizationName" placeholder="Please Enter Organization Name" />
                </div>
              <br/>

              <ControlLabel>Email address</ControlLabel>
              <FormControl
                id="formControlsEmail"
                type="email"
                label="Email address"
                placeholder="Enter email"
                />

              <ControlLabel>Password</ControlLabel>
              <FormControl
                id="formControlsPassword"
                label="Password"
                type="password"
                placeholder="Enter password"
                />

              <ControlLabel>Re-Enter Password</ControlLabel>
              <FormControl
                id="formControlsRePassword"
                label="Re-password"
                type="password"
                placeholder="Re-Enter password"
                />
              <br/>

              <div class="form-group">
                <ControlLabel for="Category">Choose Category:</ControlLabel>
                {'  '}

                <select class="form-control" id="College">
                  <option>Academic</option>
                  <option>Co-Ops/Enterprise</option>
                  <option>Cultural</option>
                  <option>Dance</option>
                  <option>Educational</option>
                  <option>Health Professional</option>
                  <option>Interfraternity Council(IFC)</option>
                  <option>Martial Arts</option>
                  <option>Media</option>
                  <option>Multi-Cultural Greek Council(MCG)-Fraternity</option>
                  <option>Multi-Cultural Greek Council(MCG)-Sorority</option>
                  <option>Panhellenic</option>
                  <option>Political</option>
                  <option>Pre-Professional</option>
                  <option>Recreation (Must Utilize Campus Recreation Facilities)</option>
                  <option>Service</option>
                  <option>Social</option>
                  <option>Spiritual</option>
                  <option>Student Affirmative Action Committe(SAAC)</option>
                  <option>Others</option>
                </select>
              </div>

              <div class="form-group">
                <ControlLabel for="studentType">Choose Student Type:</ControlLabel>
                {'  '}

                <select class="form-control" id="Grade Level">
                  <option>Undergraduates</option>
                  <option>Graduates</option>
                  <option>All Students</option>
                </select>
              </div>
              <br/>

              <div className="Button" style={buttonStyles}>
                <ButtonToolbar>
                  <Button bsStyle="success">Submit</Button>
                  <Button bsStyle="danger">Cancel</Button>
                  <Button bsStyle="primary">Return to Homepage</Button>
                </ButtonToolbar>
              </div>
              <br/>

            </form>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export { NewOrganizations }
