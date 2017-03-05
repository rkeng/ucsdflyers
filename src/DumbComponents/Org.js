import React from 'react'
import { Panel, PanelGroup, Button, Col, Row } from 'react-bootstrap'
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
  
  render () {
  	const {
  		name,
  		description
  	} = this.props.org;

    return (
          <Col sm={12} mdOffset={2} md={8}>
              {description}
              <br/>
              <Button onClick={this.handleClick}>{this.state.expanded ? 'See less' : 'See more'}</Button>
              <AnimakitExpander expanded={this.state.expanded}>
                <div className="text">
                  More about {name}!
                </div>
              </AnimakitExpander>
          </Col>
    )
  }
}
export { Org }
