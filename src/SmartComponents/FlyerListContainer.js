import React from 'react'
import { FlyerList } from '../DumbComponents/FlyerList'
import { connect } from 'react-redux'
import { SearchBar, compareDates } from '../Commen'
import { Grid, Row, Col, DropdownButton, MenuItem, InputGroup } from 'react-bootstrap';

class FlyerListContainerPage extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      sortDate: true,
      search: ''
    }
    this.dateSort = this.dateSort.bind(this)
    this.filterSearch = this.filterSearch.bind(this)
  }

  filterSearch(event){
      this.setState({search: event.target.value.substr(0,20)});
  }

  dateSort(e, time) {
      e.preventDefault();
      this.setState({
        sortDate: !this.state.sortDate
      })
  }

  render () {
    let activeFlyers = this.props.flyers.filter((flyer) => flyer.active)
    let filteredFlyers = activeFlyers.filter(
      (flyer)=>{
        return flyer.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
        || flyer.description.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
      }
    )
    if(this.state.sortDate){
      filteredFlyers.sort(compareDates)
    } else {
      filteredFlyers.sort(!compareDates)
    }
    const sortByWhat = this.state.sortDate ? 'past' : 'recent'
    const sortBtnName = this.state.sortDate ? 'farthest future' : 'closest upcoming'

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

FlyerListContainerPage.defaultProps = {
    flyers: []
}

function mapStateToProps(state){
  return {
    flyers: state.data.events
  }
}

const FlyerListContainer = connect(mapStateToProps)(FlyerListContainerPage)

export { FlyerListContainer }
