import React from 'react'
import { Form, FormGroup, FormControl, ControlLabel, PageHeader, Col, Button } from 'react-bootstrap'
// import { connect } from 'react-redux'
import { getCurrentUser, createNew } from '../models/index.js'

export class Feedback extends React.Component {
  constructor (props) {
    super(props)
    this.state = { submitted: false }
    getCurrentUser().then((user) => {
      this.setState({uid: user.uid})
      console.log(this.state)
    })
    this.onButtonClick = this.onButtonClick.bind(this)
    this.feedbackChange = this.feedbackChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onButtonClick(e) {
    // e.preventDefault()
  }

  feedbackChange(e) {
    let that = this
    that.setState({feedback: e.target.value})
  }


  onSubmit(e) {
    if (!this.state.uid) {
      alert("You must be logged in.")
    } else if (!this.state.feedback) {
      alert("You cannot send a blank message.")
    } else {
      let feedback = {
        userId: this.state.uid,
        feedback: this.state.feedback
      }
      createNew('feedback', feedback)
      let that = this
      that.setState({submitted: false})

    }
    console.log(this.state)
    return false
  }

  render () {
    var submitted = (<div className="well bg-success">Submitted.</div>)
    return (
            <div className="container">
                <PageHeader>Contact Us <small>Have comments or concerns? Send us feedback. </small></PageHeader>
                {this.state.submitted ? submitted : null}
                <Col sm={12}>
                <Form horizontal onSubmit={this.onSubmit}>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            Message
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                componentClass="textarea"
                                onChange={this.feedbackChange}
                                placeholder="Write your feedback to us here."
                                style={{height: 400}}
                            />
                        </Col>
                        <FormControl.Feedback/>
                    </FormGroup>

                    <FormGroup className="col-sm-12 text-right">
                        <Button type="submit" onClick={this.onButtonClick}>Send</Button>
                    </FormGroup>
                </Form>
                </Col>
            </div>
    )
  }
}
