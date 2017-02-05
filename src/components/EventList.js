import React from 'react';
import { Badge, Panel } from 'react-bootstrap';



class EventList extends React.Component { 

    //Generates a list of feedbacks
    getEventList(){
        return this.props.events.map((event) => { //function(events, index){...}
            let name = event.name;
            let date = event.date;
            let location = event.location;
            let description = event.description;

            let header = (
                <div>
                    <Badge>{name}</Badge>
                    <Badge>{date}</Badge>
                    <Badge>{location}</Badge>
                </div>
            );

            return <Panel key={name} bsStyle='info' header={header}>{description}</Panel>;
        });
    }

    // const events = [
    //     {name:'p Day', date:'Feb 20, 2017', location:'PC', description:'Everyone handout to catch pokemons'},
    //     {name:'Hack Day', date:'Jan 31, 2017', location:'CSE building', description:'Hack into others computer'},
    //     {name:'Water Fun', date:'Feb 02, 2017', location:'Sun God', description:'Get wet and swag'}
    // ]

    render(){
        return (
            <div className='container'>
              {this.getEventList()}    {/*returns an array of Panel*/}
            </div>
        );
    }

}

// var numbers = [1,2,3,4,5];
// console.log(numbers) // [1,2,3,4,5]

// var new_numbers = numbers.map(function(element){
//     return element + 1;   
// })

// console.log(new_numbers) //[2,3,4,5,6]

EventList.propTypes = {
    events: React.PropTypes.array.isRequired
}

export { EventList };