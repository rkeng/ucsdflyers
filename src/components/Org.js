import React from 'react';
import { Panel, PanelGroup } from 'react-bootstrap';

class Org extends React.Component {

    getOrgList(){
        return this.props.orgs.map((org, index) => {
            let name = org.name;
            let estdate = org.estdate;
            let description = org.description;

            return (
                <Panel header={name} eventKey={index}>Establishment date: {estdate} <br/>{description}</Panel>
            );

        });
    }

    render(){
        return (
            <div className='container'>
                <h1>UCSD Student Orgs</h1>
                <p>Click on the orgs to see details.</p>
                <hr/>
                <PanelGroup defaultActiveKey accordion>
                    {this.getOrgList()}
                </PanelGroup>
            </div >
        );
    }
}

export{Org};