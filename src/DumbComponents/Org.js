import React from 'react'
import { Button } from 'react-bootstrap'
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
	  <div>
          {description}
          <br/>
          <Button onClick={this.handleClick}>{this.state.expanded ? 'Show less' : 'Show more'}</Button>
          <AnimakitExpander expanded={this.state.expanded}>
            <div className="text">
              More about {name}!
            </div>
          </AnimakitExpander>
	  </div>
    )
  }
}

export { Org }
