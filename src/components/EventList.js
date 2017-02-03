import React from 'react';
import { Badge, Panel } from 'react-bootstrap';



class EventList extends React.Component { 

    //Generates a list of feedbacks
    getEventList(){
        return this.props.events.map((event, index) => {
            let name = event.name;
            let date = event.date;
            let description = event.description;

            let header = (
                <div>
                    <Badge>{name}</Badge>
                    <Badge>{date}</Badge>
                </div>
            );

            return <Panel key={index} bsStyle='info' header={header}>{description}</Panel>;
        });
    }

    render(){
        return (
            <div className='container'>
              {this.getEventList()}
            </div>
        );
    }

}

EventList.propTypes = {
    events: React.PropTypes.array.isRequired
}

export { EventList };