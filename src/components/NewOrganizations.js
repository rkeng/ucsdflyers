import React from 'react';
import ReactDOM from 'react-dom';
import {FormControl, Checkbox, Button, ControlLabel, Grid, Row, Col, select, ButtonToolbar, form} from 'react-bootstrap'

const buttonStyles = {maxWidth: 800};

class NewOrganizations extends React.Component{

  render(){
    return(
      <Grid>
        <Row className = "show-registration">
          <Col lg={6} lgPush={3}>
            <h1> Sign up as organizations: </h1>
            <form>
              <form inline>

                <div class="form-group">
                  <br></br>
                  <ControlLabel for="firstName">Organization Name </ControlLabel>
                  {'  '}
                  <input type="text" class="form-control" id="firstName" placeholder="Enriching" />
                </div>

              </form>
              <br/>
              
              <div class="checkbox ">
                <ControlLabel>Student Type</ControlLabel>
                {'  '}
              </div>

              <div class="checkbox ">
                <ControlLabel class="checkbox-inline"><input type="checkbox" id="inlineCheckbox1" value=" " />Undergraduates</ControlLabel>
              </div>

              <div class="checkbox">
                <ControlLabel class="checkbox-inline"><input type="checkbox" id="inlineCheckbox2" value=" " />Graduates</ControlLabel>
              </div>

              <div class="checkbox">
                <ControlLabel class="checkbox-inline"><input type="checkbox" id="inlineCheckbox3" value=" " />All Studens</ControlLabel>
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
                <ControlLabel for="College">Category:</ControlLabel>
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



              <div class="form-group">
                <ControlLabel for="Major">Choose Your Major:</ControlLabel>
                {'  '}

                <select class="form-control" id="Major">
                  <option>Anthropology</option>
                  <option>Bioengineering</option>
                  <option>Biological Sciences</option>
                  <option>Chemistry and Biochemistry</option>
                  <option>Chinese Studies</option>
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


export { NewOrganizations };
