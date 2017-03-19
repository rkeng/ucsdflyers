import React from 'react';
import { PanelGroup } from 'react-bootstrap'
import { Org } from './Org';
import { ColCenter, ColFull } from '../commons'


class OrgList extends React.Component {

    getOrgList () {
        return this.props.orgs.map((org, index) => (
            <ColFull key={index}>
                <Org org={org} eventKey={index}/>
            </ColFull>
        ))
    }

    render (){
        return (
            <ColCenter>
                <PanelGroup>
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