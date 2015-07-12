import React from 'react';

export default React.createClass({
  displayName: 'ReactFlipCard.Back',

  render: function () {
    return (
      <div>{this.props.children}</div>
    );
  }
});
