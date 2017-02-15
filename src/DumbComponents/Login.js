import React from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'
import { Form, FormControl, Checkbox, Button, ControlLabel,
Grid, Row, Col } from 'react-bootstrap'
import { LoginUserAction } from '../State/actions'
import { NotificationContainer, NotificationManager } from 'react-notifications'

class LoginForm extends React.Component {
  constructor (props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  testNotification () {
    NotificationManager.error('Info message', 'hhhh', 2222)
  }

  onSubmit (event) {
    event.preventDefault();

    const email = findDOMNode(this.email).value;
    const password = findDOMNode(this.password).value;

    const { dispatch } = this.props;
    dispatch(LoginUserAction(email, password));

  }

  render () {
    return (
          <Grid>
            <Row className="show-login">
              <Col lg={6} lgPush={3}>
                <Form onSubmit={this.onSubmit}>
                  <ControlLabel>Email address</ControlLabel>
                  <FormControl
                    id="formControlsEmail"
                    type="email"
                    label="Email address"
                    placeholder="Enter email"
                    ref={(node) => { this.email = node }}
                  />
                  <ControlLabel>Password</ControlLabel>
                  <FormControl
                    id="formControlsPassword"
                    label="Password"
                    type="password"
                    placeholder="Enter password"
                    ref={(node) => { this.password = node }}
                  />
                  <Checkbox checked readOnly>Remember me</Checkbox>
                  <Button type="submit">Login</Button>
                  <Button onClick={() => this.testNotification()}>Forget Password</Button>
                  <NotificationContainer/>
                </Form>
              </Col>
            </Row>
          </Grid>
    )
  }
}

const Login = connect()(LoginForm)

export { Login }
