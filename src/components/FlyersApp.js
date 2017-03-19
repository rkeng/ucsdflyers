import React from 'react'
import { TopBar } from './TopBar'
import { connect } from 'react-redux'
import { Grid, Row } from 'react-bootstrap'
import { ColCenter } from '../commons'
import Alert from 'react-s-alert';

class FlyersAppForm extends React.Component {
  render () {
    return (
            <Grid fluid>
                <Row>
                    <ColCenter>
                        <TopBar fixedTop/>
                        <TopBar dummy={true}/>{/*This is NOT code duplication!!! It's a UI place holder!!!!!*/}
                    </ColCenter>
                </Row>
                <Row>
                        {this.props.children}
                </Row>
                <Alert stack={{limit: 4, spacing: 10}} timeout={1333} position='bottom-right' effect='jelly'/>
            </Grid>
    )
  }
}
FlyersAppForm.propTypes = {
  children: React.PropTypes.any
}

const FlyersApp = connect()(FlyersAppForm)

export { FlyersApp }
