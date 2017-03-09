import React from 'react'
import { TopBar } from './TopBar'
import { connect } from 'react-redux'
import { Grid, Row } from 'react-bootstrap'
import { ColCenter } from '../Commen'

class FlyersAppForm extends React.Component {
  render () {
    return (
            <Grid fluid>
                <Row>
                    <ColCenter>
                        <TopBar fixedTop/>
                        <TopBar dummy/>{/*This is NOT code duplication!!! It's a UI place holder!!!!!*/}
                    </ColCenter>
                </Row>
                <Row>
                        {this.props.children}
                </Row>
            </Grid>
    )
  }
}
FlyersAppForm.propTypes = {
  children: React.PropTypes.any
}

const FlyersApp = connect()(FlyersAppForm)

export { FlyersApp }
