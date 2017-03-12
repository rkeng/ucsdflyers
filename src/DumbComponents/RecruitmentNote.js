import React from 'react';
import { Panel } from 'react-bootstrap';
import { FaCalendar, FaGroup, FaEnvelope, FaStreetView } from 'react-icons/lib/fa';
import { Link } from 'react-router'
import { ColCenter } from '../Commen'

class RecruitmentNote extends React.Component {

    render(){
      const { clubName, seeking, dueDate, email, description } = this.props.data
      return (
            <Panel bsStyle='info' header={clubName}>
              <ColCenter>
                  <h5><FaStreetView/> {seeking}</h5>
                  <h5><FaCalendar/> Due date: {dueDate} <br/></h5>
                  <h5><FaGroup/> Organization: {clubName} <br/></h5>
                  <h5><FaEnvelope/> Email: {email} <br/></h5>
                  <p>{description}</p>

                  <Link className='btn btn-success'>Apply Now!</Link>
              </ColCenter>
            </Panel>
        )
    }
}

RecruitmentNote.propTypes = {
    data: React.PropTypes.any.isRequired
};

export { RecruitmentNote };
