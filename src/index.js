import React from 'react';
import ReactDOM from 'react-dom';

class HelloWorld extends React.Component {
    render(){
        return <h1> {this.props.who} says hello world </h1>
    }
}


ReactDOM.render(
    <HelloWorld who='Ryan' do='sda'/>,
    document.getElementById('app') 
)