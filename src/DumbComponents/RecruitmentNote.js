import React from 'react';
import { Panel } from 'react-bootstrap';
import AnimakitExpander from 'animakit-expander';
import { Button } from 'react-bootstrap'
import { FaCalendar, FaGroup, FaEnvelope, FaStreetView } from 'react-icons/lib/fa';
import { ColCenter } from '../Commen'

class RecruitmentNote extends React.Component {

  constructor(props){
    super(props);
    this.state={
      expanded: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick () {
    this.setState(prevState => ({
      expanded: !prevState.expanded
    }));
  }

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

              <Button onClick={this.handleClick}>{this.state.expanded ? 'Cancel' : 'Apply Now'}</Button>
              <AnimakitExpander expanded={this.state.expanded}>
                  <div className="text">
                    Send Email to <a href="mailto:">{email}</a>
                  </div>
              </AnimakitExpander>
          </ColCenter>
        </Panel>
      )
    }
}

RecruitmentNote.propTypes = {
    data: React.PropTypes.any.isRequired
};

export { RecruitmentNote };
