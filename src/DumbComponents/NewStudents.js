import React from 'react'
import { Form, FormControl, Button, ControlLabel, Grid, Row, Col, select, ButtonToolbar, form, FormGroup} from 'react-bootstrap'
import { connect } from 'react-redux'
import { findDOMNode } from 'react-dom'
import { createUserAction } from '../State/actions'

const buttonStyles = {maxWidth: 800}

class NewStudentsForm extends React.Component {
  constructor (props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit (event) {
    event.preventDefault()
    // console.log('button clicked')
    let email = findDOMNode(this.email).value
    let password = findDOMNode(this.password).value

    let { dispatch } = this.props

    dispatch(createUserAction(email, password))
  }

  render () {
    return (
      <Grid>
        <Row className = "show-registration">
          <Col lg={6} lgPush={3}>
            <h1> Sign up as students: </h1>
            <Form onSubmit={this.onSubmit}>
              <form horizontal >
                <FormGroup>
                  <br></br>
                  <Col>
                    <ControlLabel>First Name </ControlLabel>
                    <FormControl type="text" placeholder="Enriching" />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col>
                    <ControlLabel>Middle Name </ControlLabel>
                    <FormControl type="text" placeholder="Student" />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Col>
                    <ControlLabel>Last Name</ControlLabel>
                    <FormControl type="text" placeholder="Life" />
                  </Col>
                </FormGroup>
              </form>

              <div class="checkbox ">
                <p>
                    <ControlLabel>Your Gender</ControlLabel>
                      <Col>
                    <ControlLabel class="checkbox-inline" ><input type="checkbox" id="inlineCheckbox1" value=" " />Female</ControlLabel>
                      {'  '}
                    <ControlLabel class="checkbox-inline" ><input type="checkbox" id="inlineCheckbox2" value=" " />Male</ControlLabel>
                      {'  '}
                    <ControlLabel class="checkbox-inline"><input type="checkbox" id="inlineCheckbox3" value=" " />Wish not to tell</ControlLabel>
                  </Col>
                </p>
              </div>

              <p>
                <form horizontal>
                  <FormGroup>
                    <br></br>
                    <Col>
                      <ControlLabel>Email address </ControlLabel>
                      <FormControl type="email" ref={ (node) => this.email = node } placeholder="Enter email" />
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Col>
                      <ControlLabel>Password </ControlLabel>
                      <FormControl type="password" ref={ (node) => this.password = node } placeholder="Enter password" />
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Col>
                      <ControlLabel>Re-Enter Password</ControlLabel>
                      <FormControl type="password" placeholder="Re-Enter password" />
                    </Col>
                  </FormGroup>
                </form>
              </p>

              <br></br>
              <Col>
                <p>
                  <div class="form-group">
                    <ControlLabel for="College">Choose Your College:</ControlLabel>
                    {'  '}
                    <select class="form-control" id="College">
                      <option>Revelle College</option>
                      <option>John Muir College</option>
                      <option>Thurgood Marshall College</option>
                      <option>Earl Warren College</option>
                      <option>Eleanor Roosevelt College</option>
                      <option>Sixth College</option>
                    </select>
                  </div>
                </p>

                <p>
                  <div class="form-group">
                    <ControlLabel for="Grade Level">Choose Your Grade:</ControlLabel>
                    {'  '}
                    <select class="form-control" id="Grade Level">
                      <option>Freshman</option>
                      <option>Sophomore</option>
                      <option>Junior</option>
                      <option>Senior</option>
                    </select>
                  </div>
                </p>

                <p>
                  <div class="form-group">
                    <ControlLabel for="Major">Choose Your Major:</ControlLabel>
                    {'  '}
                    <select class="form-control" id="Major">
                      <option>Anthropology</option>
                      <option>Bioengineering</option>
                      <option>Biological Sciences</option>
                      <option>Chemistry and Biochemistry</option>
                      <option>Chinese Studies</option>
                      <option>Classical Studies</option>
                      <option>Cognitive Science</option>
                      <option>Communication</option>
                      <option>Computer Science and Engineering</option>
                      <option>Critical Gender Studies</option>
                      <option>Economics</option>
                      <option>Electrical and Computer Engineering</option>
                      <option>Environmental Systems Program</option>
                      <option>Ethnic Studies</option>
                      <option>Family and Preventive Medicine</option>
                      <option>German Studies</option>
                      <option>Global Health</option>
                      <option>History</option>
                      <option>Human Development</option>
                      <option>Individual Majors</option>
                      <option>International Studies</option>
                      <option>Italian Studies</option>
                      <option>Japanese Studies</option>
                      <option>Judaic Studies</option>
                      <option>Latin American Studies</option>
                      <option>Linguistics</option>
                      <option>Literature</option>
                      <option>Mathematics</option>
                      <option>Mechanical and Aerospace Engineering</option>
                      <option>Music</option>
                      <option>NanoEngineering</option>
                      <option>Philosophy</option>
                      <option>Political Science</option>
                      <option>Psychology</option>
                      <option>Study of Religion</option>
                      <option>Russian and Soviet Studies</option>
                      <option>Scripps Institution of Oceanography</option>
                      <option>Sociology</option>
                      <option>Structural Engineering</option>
                      <option>Theatre and Dance</option>
                      <option>Third World Studies</option>
                      <option>Undeclared</option>
                      <option>Urban Studies and Planning</option>
                      <option>Visual Arts</option>
                    </select>
                  </div>
                </p>
              </Col>

              <br/>
              <div className="Button" style={buttonStyles}>
                <ButtonToolbar>
                  <Button bsStyle="success" type='submit'>Submit</Button>
                  <Button bsStyle="danger">Cancel</Button>
                  <Button bsStyle="primary">Return to Homepage</Button>
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
const NewStudents = connect()(NewStudentsForm)
export { NewStudents }
