import React from 'react';
import ReactDOM from 'react-dom';
import { TopBar } from './TopBar';



class About extends React.Component {
  // return this.props.events.map((event) => {
  //     let name = us.name;
  //     let bDay = us.bDay;
  //     let description = us.description;
  //     let born = us.born;


    render(){
        return (
            <div>
            About us
                <hr/>
                We are cool
            </div>
        )
    }
}


export { About };
