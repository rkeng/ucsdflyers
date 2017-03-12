import React from 'react'
import { Form, FormGroup, FormControl, ControlLabel, PageHeader, Col, Button } from 'react-bootstrap'
import { connect } from 'react-redux'

class FeedbackPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      "submitted": false
    }

    this.onSubmit = this.onSubmit.bind(this)
  }

  onFeedbackChange(e) {
    e.preventDefault()
  }

  onSubmit (e) {
    e.preventDefault()
  }

  render () {
    return (
            <div className="container">
                <PageHeader>Contact Us <small>Have comments or concerns? Send us feedback anonymously.</small></PageHeader>
                <Col sm={12}>
                <Form method="post" action="https://formspree.io/ucsdflyers@gmail.com" horizontal>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            Feedback
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                componentClass="textarea"
                                name="Feedback"
                                onChange={this.onFeedbackChange}
                                placeholder="Write your feedback to us here."
                                style={{height: 400}}
                            />
                        </Col>
                        <FormControl.Feedback/>
                    </FormGroup>
                    <input type="hidden" name="_next" value="/" />
                    <FormGroup className="col-sm-12 text-right">
                        <Button type="submit">Send</Button>
                    </FormGroup>
                </Form>
                </Col>
            </div>
    )
  }
}

const Feedback = connect()(FeedbackPage)

export { Feedback }
