import React from 'react';
import { FormControl, Checkbox, Button, ControlLabel,
Grid, Row, Col } from 'react-bootstrap';

class Login extends React.Component {
    render () {
        return (
          <Grid>
            <Row className="show-login">
              <Col lg={6} lgPush={3}>
                <form>
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
                  <Checkbox checked readOnly>Remember me</Checkbox>
                  <Button type="submit">Submit</Button>
                  <Button type="submit">Forget Password</Button>
                </form>
              </Col>
            </Row>
          </Grid>
        );
    }
}

export { Login };
