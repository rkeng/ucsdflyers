import React from 'react'
import { Button } from 'react-bootstrap'
import AnimakitExpander from 'animakit-expander';
import { ColCenter } from '../Commen'

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
  		description,
      website
  	} = this.props.org;

    return (
          <ColCenter>
              {description}
              <br/>
              <Button onClick={this.handleClick}>{this.state.expanded ? 'See less' : 'See more'}</Button>
              <AnimakitExpander expanded={this.state.expanded}>
                <div className="text">
                  {name}'s Website: {website==='N/A'? 'N/A':<a id="link" href={website} target="_blank">{website}</a>}
                </div>
              </AnimakitExpander>
          </ColCenter>
    )
  }
}
export { Org }
