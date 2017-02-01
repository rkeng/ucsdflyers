import React from 'react';
import ReactDOM from 'react-dom';
import { TopBar } from './TopBar';



class FlyersApp extends React.Component {
    render(){
        return (
            <div>
                <TopBar/>
                {this.props.children}
            </div>
        )
    }
}

export { FlyersApp };