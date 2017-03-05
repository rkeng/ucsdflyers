import React from 'react';
import { Badge, Panel } from 'react-bootstrap';
import { FaCalendar, FaGroup, FaEnvelope, FaStreetView } from 'react-icons/lib/fa';
import { Link } from 'react-router'

class RecruitmentNoteList extends React.Component {


    //Generates a list of feedbacks
    getRecruitmentNoteList () {
        console.log('recruitmentNotes?', this.props.recruitmentNotesList)
        return this.props.recruitmentNotesList.map((recruitmentNotesList, index) => {
            let name = recruitmentNotesList.clubName;
            let date = recruitmentNotesList.dueDate;
            let title = recruitmentNotesList.seeking;
            let email = recruitmentNotesList.email;

            const titles = title.map((title, index) => {
              return <Badge key={index}> {title} </Badge>
            });
            let description = recruitmentNotesList.description;

            let header = (
                <div>
                    <h4>{name}</h4>
                </div>
            );

            return(
             <div key={index}>
              <Panel bsStyle='info' header={header}>
              <h5><FaStreetView/> {titles}</h5>


              <h5><FaCalendar/> Due date: {date} <br/></h5>
              <h5><FaGroup/> Organization: {name} <br/></h5>
              <h5><FaEnvelope/> Email: {email} <br/></h5>
              <p>{description}</p>

              <Link className='btn btn-success'>Apply Now!</Link>
              </Panel>
              </div>

            )
        });
    }

    render () {
        return (
            <div className='container'>
              {this.getRecruitmentNoteList()}
            </div>
        );
    }

}

RecruitmentNoteList.propTypes = {
    recruitmentNotesList: React.PropTypes.array.isRequired
};

export { RecruitmentNoteList };
