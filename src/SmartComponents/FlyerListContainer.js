import React from 'react'
import { FlyerList } from '../DumbComponents/FlyerList'
import { connect } from 'react-redux'
import { SearchBar, compareDates, compareLikes, compareTitles, compareDatesReverse } from '../Commen'
import { Grid, Row, Col, DropdownButton, MenuItem, InputGroup } from 'react-bootstrap';

var SortType = {
    Recent: 'Most Recent',
    Popularity: 'Popularity',
    Title: 'Title'
}


class FlyerListContainerPage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      search: '',
      sortBy: 'most recent' 
    }
    this.filterSearch = this.filterSearch.bind(this)
  }

  filterSearch(event){
      this.setState({search: event.target.value});
  }


  render () {
    // let activeFlyers = this.props.flyers.filter((flyer) => activeDate(flyer.date))
    let allFlyers = this.props.flyers
    let filteredFlyers = allFlyers.filter(
      (flyer)=>{
        return flyer.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
        || flyer.description.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
        || flyer.location.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
        || flyer.date.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
        || (flyer.belongsTo || '').toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
        || (flyer.time || '').toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
      }
    )

    switch(this.state.sortBy){
      case SortType.Recent:{
        filteredFlyers.sort(compareDates)
        break;
      }
      case SortType.Popularity:{
        filteredFlyers.sort((a, b)=> -(a.likes - b.likes))
        break;
      }
      case SortType.Title:{
        filteredFlyers.sort(compareTitles)
        break;
      } 
    }

    const sortBtnName = this.state.sortDate ? 'Farthest Future' : 'Most Recent'
    const newDateSort = this.state.sortBy === SortType.Future ? SortType.Recent : SortType.Future

    return (
        <Grid>
          <Row>
            <SearchBar placeholder='search flyers' value={this.state.search || ''}
                onChange={this.filterSearch}>
              <DropdownButton
                componentClass={InputGroup.Button}
                id="input-dropdown-addon"
                title='Sort By'
              >
                <MenuItem key="1" onClick={(e)=>this.setState({sortBy: SortType.Recent})}>Most Recent</MenuItem>
                <MenuItem key="3" onClick={(e)=>this.setState({sortBy: SortType.Popularity})}>Popularity</MenuItem>
                <MenuItem key="4" onClick={(e)=>this.setState({sortBy: SortType.Title})}>Title</MenuItem>
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
