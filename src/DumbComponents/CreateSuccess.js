import React from 'react'
import {Grid, Row, Col} from 'react-bootstrap'
import { connect } from 'react-redux'

class CreateSuccess extends React.Component {
  render () {
    return (
        <Grid>
            <Row className="success">
                <Col md={12} mdOffset={4}>
                    <h1>Success!</h1>
                    <h1>Flyer was created!</h1>

                </Col>
            </Row>
        </Grid>
    )
  }
}

const CSuccess = connect()(CreateSuccess)

export { CreateSuccess }
