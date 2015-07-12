import React from 'react';

export default React.createClass({
  displayName: 'ReactFlipCard.Front',

  render: function () {
    return (
      <div>{this.props.children}</div>
    );
  }
});

