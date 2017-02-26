import React from 'react';
import { Badge, Panel, Button, Card } from 'react-bootstrap';

class RecruitmentNoteList extends React.Component {

    //Generates a list of feedbacks
    getRecruitmentNoteList () {
        console.log('recruitmentNotes?', this.props.recruitmentNotes)
        return this.props.recruitmentNotes.map((recruitmentNotes) => {
            let name = recruitmentNotes.name;
            let date = recruitmentNotes.date;
            let title = recruitmentNotes.title;
            let description = recruitmentNotes.description;

            let header = (
                <div>
                    <Badge>{name}</Badge>
                    <Badge>{date}</Badge>
                    <Badge>{title}</Badge>
                </div>
            );

            return(
             <div>
              <Panel key={name} bsStyle='info' header={header}>
              {description}<br/><br/>
              <Button bsStyle="default" bsSize="small">Learn more</Button>
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
    recruitmentNotes: React.PropTypes.array.isRequired
};

export { RecruitmentNoteList };
