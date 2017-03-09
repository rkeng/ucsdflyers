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
      sortClub: false,
      search: ''
    }
    this.dateSort = this.dateSort.bind(this)
    this.filterSearch = this.filterSearch.bind(this)
  }

  filterSearch(event){
      this.setState({search: event.target.value.substr(0,20)});
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
    // console.log('component state', this.state)
  }

  render () {
    let filteredFlyers=this.state.flyers.filter(
      (flyer)=>{
        return flyer.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
        || flyer.description.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
      }
    )
    const sortByWhat = this.state.sortDate ? 'past' : 'recent'
    const sortBtnName = this.state.sortDate ? 'farthest future' : 'closest upcoming'

    return (
        <Grid>
          <NotificationContainer/>
          <Row>
            <SearchBar placeholder='search flyers' value={this.state.search || ''}
                onChange={this.filterSearch}>
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
              <FlyerList flyers={filteredFlyers}/>
            </Col>
          </Row>
        </Grid>
    )
  }
}

// function mapStateToProps(state){
//   return {
//     flyers: state.data.events
//   }
// }

const FlyerListContainer = connect()(FlyerListContainerPage)

export { FlyerListContainer }
