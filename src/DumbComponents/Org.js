import React from 'react'
import { Panel, PanelGroup, Button } from 'react-bootstrap'
import AnimakitExpander from 'animakit-expander';

class Org extends React.Component {

  constructor (props) {
    super(props);
    this.state = {expanded: false};

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick () {
    this.setState(prevState => ({
      expanded: !prevState.expanded
    }));
  }
  
  getOrgList () {
    const that = this;
    return this.props.orgs.map((org, index) => {
      let name = org['name']
      let description = org['description']

      return (
                <Panel header={name} eventKey={index} key={index}>
                  {description}
                  <br/>
                  <Button onClick={that.handleClick}>{that.state.expanded ? 'Hide' : 'Expand'}</Button>
                  <AnimakitExpander expanded={that.state.expanded}>
                    <div className="text">
                      More about {name}!
                    </div>
                  </AnimakitExpander>
                </Panel>
      )
    })
  }

  render () {
    return (
            <div className='container'>
                <h1>UCSD Student Orgs</h1>
                <p>Click on the orgs to see details.</p>
                <hr/>
                <PanelGroup defaultActiveKey accordion>
                    {this.getOrgList()}
                </PanelGroup>
            </div >
    )
  }

}

Org.propTypes = {
  orgs: React.PropTypes.array.isRequired
}


export { Org }
