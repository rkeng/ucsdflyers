import React from 'react';
import { Badge, Panel } from 'react-bootstrap';
import { FaCalendar, FaGroup, FaEnvelope, FaStreetView } from 'react-icons/lib/fa';
import { Link } from 'react-router'
import { ColCenter } from '../Commen'

class RecruitmentNote extends React.Component {

    render(){
    return (
          <Panel bsStyle='info' header={header}>
            <ColCenter>
                <h5><FaStreetView/> {titles}</h5>
                <h5><FaCalendar/> Due date: {date} <br/></h5>
                <h5><FaGroup/> Organization: {name} <br/></h5>
                <h5><FaEnvelope/> Email: {email} <br/></h5>
                <p>{description}</p>

                <Link className='btn btn-success'>Apply Now!</Link>
            </ColCenter>
          </Panel>
      )
    }
}

RecruitmentNoteList.propTypes = {
    data: React.PropTypes.Object.isRequired
};

export { RecruitmentNote };
