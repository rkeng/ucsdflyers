import React from 'react'
import { Panel, PanelGroup, Button, Col, Row } from 'react-bootstrap'

class Org extends React.Component {

  getOrgList () {
    return this.props.orgs.map((org, index) => {
      let name = org['name']
            // let estdate = org.estdate;
      let description = org['description']

      return (
                <Panel header={name} eventKey={index} key={index}>{description}<br/><Button href="#">Expand</Button></Panel>
      )
    })
  }

  render () {
    return (
            <Row>
              <Col sm={12} mdOffset={2} md={8}>
                <h1>UCSD Student Orgs</h1>
                <p>Click on the orgs to see details.</p>
                <hr/>
                <PanelGroup defaultActiveKey accordion>
                    {this.getOrgList()}
                </PanelGroup>
              </Col>
            </Row>
    )
  }

}

Org.propTypes = {
  orgs: React.PropTypes.array.isRequired
}


export { Org }
