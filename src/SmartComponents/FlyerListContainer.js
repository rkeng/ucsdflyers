import React from 'react'
import { FlyerList } from '../DumbComponents/FlyerList'
import { connect } from 'react-redux'
import { SearchBar, compareDates, compareLikes, compareTitles, compareDatesReverse } from '../Commen'
import { Grid, Row, Col, DropdownButton, MenuItem, InputGroup } from 'react-bootstrap';

class FlyerListContainerPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      sortDate: true,
      search: '',
      sortLike: false,
      sortTitle: false
    }
    this.dateSort = this.dateSort.bind(this)
    this.filterSearch = this.filterSearch.bind(this)
    this.likeSort = this.likeSort.bind(this)
    this.titleSort = this.titleSort.bind(this)
  }

  filterSearch(event){
      this.setState({search: event.target.value.substr(0,20)});
  }

  dateSort(e, time) {
      e.preventDefault();
      this.setState({
        sortDate: !this.state.sortDate,
        sortLike: false,
        sortTitle: false
      })
  }

  likeSort(e){
      e.preventDefault();
      this.setState({
          sortLike: true,
          sortDate: false,
          sortTitle: false
      })
  }

  titleSort(e){
      e.preventDefault();
      this.setState({
          sortLike: false,
          sortDate: false,
          sortTitle: true
      })
  }

  render () {
    let activeFlyers = this.props.flyers.filter((flyer) => flyer.active)
    let filteredFlyers = activeFlyers.filter(
      (flyer)=>{
        return flyer.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
        || flyer.description.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
        || flyer.location.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
        || flyer.date.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
      }
    )
    if(this.state.sortDate){
      filteredFlyers.sort(compareDatesReverse)
  }
    else if (this.state.sortLike) {
      console.log(filteredFlyers)
      filteredFlyers.sort(compareLikes)
      console.log(filteredFlyers)
  }
    else if (this.state.sortTitle){
      filteredFlyers.sort(compareTitles)
    }
    else{
      filteredFlyers.sort(compareDates)
    }
    const sortByWhat = this.state.sortDate ? 'recent' : 'past'
    const sortBtnName = this.state.sortDate ? 'Most Recent' : 'Farthest Future'

    return (
        <Grid>
          <Row>
            <SearchBar placeholder='search flyers' value={this.state.search || ''}
                onChange={this.filterSearch}>
              <DropdownButton
                componentClass={InputGroup.Button}
                id="input-dropdown-addon"
                title="Sort By"
              >
                <MenuItem key="1" onClick={(e)=>this.dateSort(e, {sortByWhat})}>{sortBtnName}</MenuItem>
                <MenuItem key="2" onClick={(e)=>this.likeSort(e)}>Popularity</MenuItem>
                <MenuItem key="3" onClick={(e)=>this.titleSort(e)}>Title</MenuItem>
              </DropdownButton>
            </SearchBar>
         </Row>
        <br/>
         <Row>
           <Col>
              <FlyerList flyers={filteredFlyers} />
            </Col>
          </Row>
        </Grid>
    )
  }
}

FlyerListContainerPage.defaultProps = {
    flyers: []
}

function mapStateToProps(state){
  return {
    flyers: state.data.events,
    user: state.user
  }
}

const FlyerListContainer = connect(mapStateToProps)(FlyerListContainerPage)

export { FlyerListContainer }
