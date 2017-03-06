var React = require('react');
var Loading = require('react-loading');

var Loader = React.createClass({
  render: function() {
    return (
      <div>
      <Loading type='bars' color='gray' />
      </div>
    );
  }
});
export { Loader }
