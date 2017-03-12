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

        const { FlyersLiked } = this.props.user
        //flyer array
        let flyerArray = ObjectToArray(FlyersLiked)
        console.log('this.props', this.props)
        let likedFlyers = (this.props.flyers || []).filter(
            (flyer) => {
               return flyerArray.includes(flyer.id)
            }
        )
        var listOfFlyersLiked = likedFlyers.map(
            (flyer, index) => {
                return <Flyer flyer={flyer} key={index}/>
            }
        )

        return(
            <div>
                {listOfFlyersLiked}
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        user: state.user,
        flyers: state.data.events
    }
}

const MyFlyers = connect(mapStateToProps)(MyFlyersPage)
export { MyFlyers }