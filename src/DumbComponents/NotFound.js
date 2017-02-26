import React from 'react'
import {Grid, Row, Col} from 'react-bootstrap'
import { connect } from 'react-redux'

class NotFoundPage extends React.Component {
  render () {
    return (
        <Grid>
            <Row className="show-404">
                <Col md={12} mdOffset={4}>
                    <h1>404 Page Not Found</h1>
                </Col>
            </Row>
        </Grid>
    )
  }
}

const NotFound = connect()(NotFoundPage)

export { NotFound }
