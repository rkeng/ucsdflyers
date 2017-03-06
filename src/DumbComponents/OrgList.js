import React from 'react';
import { Panel, PanelGroup } from 'react-bootstrap';
import { Org } from './Org';
import { ColCenter } from '../Commen'
class OrgList extends React.Component {
  constructor (props) {
    super(props);
  }

    getOrgList () {
        return this.props.orgs.map((org, index) => (
            <Panel header={org.name} eventKey={index} key={index}>
                <Org key={index} org={org}/>
            </Panel>
        ))
    }

    render (){
        return (
            <ColCenter>
                <h1>UCSD Student Orgs</h1>
                <p>Click on the orgs to see details.</p>
                <hr/>
                <PanelGroup defaultActiveKey accordion>
                    {this.getOrgList()}
                </PanelGroup>
            </ColCenter>
          )
      }
}

OrgList.propTypes = {
  orgs: React.PropTypes.array.isRequired
}

export {OrgList};
