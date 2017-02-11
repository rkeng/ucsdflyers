import React from 'react';
import { Panel, PanelGroup } from 'react-bootstrap';

class Org extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      search: '',
      orgs: props.orgs
    }
  }

  filterSearch(event){
      this.setState({search: event.target.value.substr(0,20)});
    }

    getOrgList(){
      let filteredOrgs=this.state.orgs.filter(
        (org)=>{
          return org.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
          || org.description.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
        }
      );
        return filteredOrgs.map((org, index) => {
            let name = org.name;
            let estdate = org.estdate;
            let description = org.description;

            return (
                <Panel header={name} eventKey={index}>Establishment date: {estdate} <br/>{description}</Panel>
            );

        });
    }

    render(){
        return (
            <div className='container'>
                <h1>UCSD Student Orgs</h1>
                <input type = "text"
                     placeholder = "Search"
                     value = {this.state.search || ''}
                     onChange={this.filterSearch.bind(this)}
                />
                <p>Click on the orgs to see details.</p>
                <hr/>
                <PanelGroup defaultActiveKey accordion>
                    {this.getOrgList()}
                </PanelGroup>
            </div >
        );
    }
}

export{Org};
