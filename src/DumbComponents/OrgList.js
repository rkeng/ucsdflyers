import React from 'react';
import { PanelGroup } from 'react-bootstrap'
import { Org } from './Org';
import { ColCenter, ColFull } from '../Commen'
import Masonry from 'react-masonry-component'


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
                <Masonry
                className={'my-gallery-class'}
                options={{transitionDuration: 800}}
                enableResizableChildren={true} 
                >
                    {this.getOrgList()}
                </Masonry>
            </ColCenter>
        )
    }
}

OrgList.propTypes = {
  orgs: React.PropTypes.array.isRequired
}

export {OrgList};