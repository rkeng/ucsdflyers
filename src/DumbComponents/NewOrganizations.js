import React from 'react'
import {Modal, FormControl, Button, ControlLabel, Grid, Row, Col, select, ButtonToolbar, form} from 'react-bootstrap'
import logo from './logo.png'

const buttonStyles = {maxWidth: 800}

class NewOrganizations extends React.Component {

  render () {
    return (
        <div className="modal-dialog modal-sm" style={{height:100}}>

            <Modal.Dialog className="modal-backdrop">
              <Modal.Header style={{color: "white"}}>
                <div className="row text-center">
                  <img width={100} height={100} src={logo} className="rounded mx-auto d-block" alt=""/>
                  <Modal.Title>Sign Up As An Organization</Modal.Title>
                </div>
              </Modal.Header>

              <Modal.Body>
                <Row className="show-registration">
                  <Col lg={6} lgPush={3}>
                    <form>
                        <div className="form-group">
                          <ControlLabel htmlFor="organizationName">Organization Name</ControlLabel>
                          {'  '}
                          <input type="text" className="form-control" id="organizationName" placeholder="Please Enter Organization Name" />
                        </div>

                      <ControlLabel>Email address</ControlLabel>
                      <FormControl
                        id="formControlsEmail"
                        type="email"
                        label="Email address"
                        placeholder="Enter email"
                        />
                        <br/>

                      <ControlLabel>Password</ControlLabel>
                      <FormControl
                        id="formControlsPassword"
                        label="Password"
                        type="password"
                        placeholder="Enter password"
                        />
                        <br/>

                      <ControlLabel>Re-Enter Password</ControlLabel>
                      <FormControl
                        id="formControlsRePassword"
                        label="Re-password"
                        type="password"
                        placeholder="Re-Enter password"
                        />
                      <br/>

                      <div className="form-group">
                        <ControlLabel htmlFor="Category">Choose Category:</ControlLabel>
                        {'  '}

                        <select className="form-control" id="College">
                          <option>--</option>
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

                      <div className="form-group">
                        <ControlLabel htmlFor="studentType">Choose Student Type:</ControlLabel>
                        {'  '}

                        <select className="form-control" id="Grade Level">
                          <option>--</option>
                          <option>Undergraduates</option>
                          <option>Graduates</option>
                          <option>All Students</option>
                        </select>
                      </div>

                    </form>
                  </Col>
                </Row>
              </Modal.Body>

              <Modal.Footer>
                <div id='toolbar'>
                  <div class='wrapper text-center'>
                    <div class="btn-group">
                      <Button>Return to Homepage</Button>
                      <Button bsStyle="primary">Submit</Button>
                    </div>
                  </div>
                </div>
              </Modal.Footer>

            </Modal.Dialog>
          </div>
    )
  }
}

export { NewOrganizations }
