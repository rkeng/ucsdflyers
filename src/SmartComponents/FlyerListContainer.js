import React from 'react'
import { FlyerList } from '../DumbComponents/FlyerList'
import { connect } from 'react-redux'
import { fetchDataAsArray } from '../models'
import { SearchBar, compareDates } from '../Commen'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import { Grid, Row, Col, DropdownButton, MenuItem, InputGroup } from 'react-bootstrap';

class FlyerListContainerPage extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      flyers: [],
      sortDate: false,
    }
    this.dateSort = this.dateSort.bind(this)
  }

  componentWillMount () {
    const that = this;

    function isActive (flyer) {
      return flyer.active===true;
    }

    fetchDataAsArray('events')
    .then(function(events){
        var newFlyersList = events.filter(isActive);
        newFlyersList.sort(compareDates)
        that.setState({
            flyers: newFlyersList,
        })
    })
    .catch(function(error){
        NotificationManager.error('Something is wrong', 'Opps!', 2222);
    })
  }

  dateSort(e, time) {
      e.preventDefault();
      const that = this;

      var newFlyersList = that.state.flyers
      if(time === 'recent')
        newFlyersList.sort(compareDates)
      else 
        newFlyersList.sort(!compareDates)

      that.setState({
          flyers: newFlyersList,
          sortDate: !this.state.sortDate
      })
    console.log('component state', this.state)
  }

  render () {
    const sortByWhat = this.state.sortDate ? 'past' : 'recent'
    const sortBtnName = this.state.sortDate ? 'farthest future' : 'closest upcoming'
    return (
        <Grid>
          <NotificationContainer/>
          <Row>
            <SearchBar placeholder='search for flyers'>
              <DropdownButton
                componentClass={InputGroup.Button}
                id="input-dropdown-addon"
                title="Sort By"
              >
                <MenuItem key="1" onClick={(e)=>this.dateSort(e, {sortByWhat})}>{sortBtnName}</MenuItem>
              </DropdownButton>
            </SearchBar>
         </Row>
         <Row>
           <Col>
              <FlyerList flyers={this.state.flyers}/>
            </Col>
          </Row>
        </Grid>
    )
  }
}

const FlyerListContainer = connect()(FlyerListContainerPage)

export { FlyerListContainer }
