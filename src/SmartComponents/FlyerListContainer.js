import React from 'react'
import { FlyerList } from '../DumbComponents/FlyerList'
import { connect } from 'react-redux'
import { fetchDataAsArray } from '../models'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import { FormControl } from 'react-bootstrap';
import { FaSearch } from 'react-icons/lib/fa'

class FlyerListContainerPage extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      flyers: [],
      search: ""
    }
  }

  filterSearch(event){
      this.setState({search: event.target.value.substr(0,20)});
  }

  componentWillMount () {
    const that = this;

    fetchDataAsArray('events')
    .then(function(events){
        var newFlyersList = events
        that.setState({
            flyers: newFlyersList
        })
    })
    .catch(function(error){
        NotificationManager.error('Something is wrong', 'Opps!', 2222);
    })
  }

  render () {
    let filteredFlyers=this.state.flyers.filter(
      (flyer)=>{
        return flyer.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
        || flyer.location.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
      }
    );
    return (
        <div>
          <div className='container'>
            <FaSearch />
            <FormControl type="text"
                   placeholder="Search For Flyers"
                   value={this.state.search || ''}
                   onChange={this.filterSearch.bind(this)}/>
         </div>
         <p></p>
            <FlyerList flyers={filteredFlyers}/>
            <NotificationContainer/>
        </div>
    )
  }
}

const FlyerListContainer = connect()(FlyerListContainerPage)

export { FlyerListContainer }
