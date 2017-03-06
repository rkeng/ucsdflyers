import React from 'react';
import { Badge, Panel, Col } from 'react-bootstrap';
import { FaCalendar, FaGroup, FaEnvelope, FaStreetView } from 'react-icons/lib/fa';
import { Link } from 'react-router'
import { ColCenter } from '../Commen'

class RecruitmentNoteList extends React.Component {


    //Generates a list of feedbacks
    getRecruitmentNoteList () {
        return this.props.recruitmentNotesList.map((recruitmentNotesList, index) => {
            let name = recruitmentNotesList.clubName;
            let date = recruitmentNotesList.dueDate;
            let title = recruitmentNotesList.seeking;
            let email = recruitmentNotesList.email;

            // const titles = title.map((title, index) => {
            //   return <Badge key={index}> {title} </Badge>
            // });
            let description = recruitmentNotesList.description;

            let header = (
                <div>
                    <h4>{name}</h4>
                </div>
            );

            return(
              <Panel bsStyle='info' header={header}>
                <Col sm={12} mdOffset={3} md={8} key={index}>
                  <h5><FaStreetView/> {title}</h5>
                  <h5><FaCalendar/> Due date: {date} <br/></h5>
                  <h5><FaGroup/> Organization: {name} <br/></h5>
                  <h5><FaEnvelope/> Email: {email} <br/></h5>
                  <p>{description}</p>
                  <Link className='btn btn-success'>Apply Now!</Link>
                </Col>
              </Panel>
            )
        });
    }

    render () {
        return (
            <ColCenter>
              {this.getRecruitmentNoteList()}
            </ColCenter>
        );
    }

}

RecruitmentNoteList.propTypes = {
    recruitmentNotesList: React.PropTypes.array.isRequired
};

export { RecruitmentNoteList };
