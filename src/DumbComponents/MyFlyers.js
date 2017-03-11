import React from 'react'
import { connect } from 'react-redux'
import { Flyer } from './Flyer'
import { ObjectToArray } from '../Commen'

//You should be able to access user info through this.props.user
//That is just static/local info. If you need to update user info on firebase, you need to
// use functions in models/index.js

//To center the UI, you can use <ColCenter>  ... </ColCenter>, 
//It is avaiable in Commen:
//import { ColCenter } from '../Commen'
class MyFlyersPage extends React.Component{

    render(){
        console.log('user state', this.props.user)
        const { FlyersLiked } = this.props.user
        let flyerArray = ObjectToArray(FlyersLiked)
        flyerArray.map(
            (flyer) => {
                return <Flyer flyer={flyer}/>
            }
        )
        return <div> This is MyFlyers Page</div>
    }
}

function mapStateToProps(state){
    return{
        user: state.user
    }
}

const MyFlyers = connect(mapStateToProps)(MyFlyersPage)
export { MyFlyers }