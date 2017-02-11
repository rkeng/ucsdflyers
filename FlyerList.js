import React from 'react';
import { Badge, Panel } from 'react-bootstrap';


class FlyerList extends React.Component {

    //Generates a list of feedbacks
    constructor(props) {
        super(props);
        this.state = { search: '',
                       flyers: props.flyers}
    }

    filterSearch(event){
      this.setState({search: event.target.value.substr(0,20)});
    }

    getFlyerList () {
        console.log('flyers?', this.props.flyers)
        let filteredFlyer=this.state.flyers.filter(
          (flyer)=>{
            return flyer.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
            || flyer.location.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
          }
        );
        return filteredFlyer.map((flyer) => {
            let name = flyer.name;
            let date = flyer.date;
            let location = flyer.location;
            let description = flyer.description;

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

    render () {
        return (
            <div className='container'>
              <input type = "text"
                     placeholder = "Search"
                     value = {this.state.search || ''}
                     onChange={this.filterSearch.bind(this)}
              />
              {this.getFlyerList()}
            </div>
        );
    }

}

FlyerList.propTypes = {
    flyers: React.PropTypes.array.isRequired
};

export { FlyerList };
