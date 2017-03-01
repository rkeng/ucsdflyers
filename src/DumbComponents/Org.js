import React from 'react'
import { Panel, PanelGroup, Button } from 'react-bootstrap'

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
            <div className='container'>
                <h1>UCSD Student Orgs</h1>
                <p>Click on the orgs to see details.</p>
                <hr/>
                <PanelGroup defaultActiveKey accordion>
                    {this.getOrgList()}
                </PanelGroup>
            </div >
    )
  }

}

Org.propTypes = {
  orgs: React.PropTypes.array.isRequired
}


export { Org }
