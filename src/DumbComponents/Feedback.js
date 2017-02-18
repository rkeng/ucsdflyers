import React from 'react'
import { Form, FormGroup, FormControl, ControlLabel, PageHeader, HelpBlock, Col, Button } from 'react-bootstrap'

class Feedback extends React.Component {
  constructor (props) {
    super(props)
    this.state = { email: ''}
    this.onEmailChange = this.onEmailChange.bind(this)
  }

  validateEmail () {
    const length = this.state.email.length
    if (length > 10) return 'success'
    else if (length > 5) return 'warning'
    else if (length > 0) return 'error'
  }

  onEmailChange (e) {
    this.setState({ value: e.target.value })
  }

  render () {
    return (
            <div className="container">
                <PageHeader>Feedback</PageHeader>
                <Col sm={12}>
                <Form horizontal>
                    <FormGroup
                        controlId="email"
                        validationState={this.validateEmail()}>

                        <Col componentClass={ControlLabel} sm={2}>
                            <ControlLabel>E-mail Address</ControlLabel>
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                type="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                            />
                            <HelpBlock className="small text-muted">
                                Validation is based on string length. TODO: E-mail validation function
                            </HelpBlock>
                        </Col>
                        <FormControl.Feedback/>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            Feedback
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                componentClass="textarea"
                                value={this.state.feedback}
                                placeholder="Write your feedback to us here."
                                style={{height: 400}}
                            />
                        </Col>
                        <FormControl.Feedback/>
                    </FormGroup>

                    <FormGroup className="col-sm-12 text-right">
                        <Button type="submit">Send</Button>
                    </FormGroup>
                </Form>
                </Col>
            </div>
    )
  }
}

export { Feedback }
