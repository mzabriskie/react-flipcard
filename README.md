#react-flipcard

React flip card component

## Installing

```bash
$ npm install react-flipcard
# or
$ bower install react-flipcard
```

## Demo

[http://mzabriskie.github.io/react-flipcard/basic](http://mzabriskie.github.io/react-flipcard/basic)

## Example

```js
import React from 'react';
import FlipCard from 'react-flipcard';

var App = React.createClass({
  getInitialState() {
    return {
      isFlipped: false
    };
  },

  showBack() {
    this.setState({
      isFlipped: true
    });
  },

  showFront() {
    this.setState({
      isFlipped: false
    });
  },

  handleOnFlip(flipped) {
    if (flipped) {
      this.refs.backButton.getDOMNode().focus();
    }
  },

  handleKeyDown(e) {
    if (this.state.isFlipped && e.keyCode === 27) {
      this.showFront();
    }
  },

  render() {
    return (
      <div>
        {/* Default behavior is horizontal flip on hover, or focus */}
        <FlipCard>
          {/* The first child is used as the front of the card */}
          <div>
            <div>Front</div>
            <div><small>(horizontal flip)</small></div>
          </div>
          {/* The second child is used as the back of the card */}
          <div>Back</div>
        </FlipCard>

        {/* The `type` attribute allows using a vertical flip */}
        <FlipCard type="vertical">
          <div>
            <div>Front</div>
            <div><small>(vertical flip)</small></div>
          </div>
          <div>Back</div>
        </FlipCard>

        {/*
          The `disabled` attribute allows turning off the auto-flip
          on hover, or focus. This allows manual control over flipping.

          The `flipped` attribute indicates whether to show the front,
          or the back, with `true` meaning show the back.
        */}
        <FlipCard
          disabled={true}
          flipped={this.state.isFlipped}
          onFlip={this.handleOnFlip}
          onKeyDown={this.handleKeyDown}
        >
          <div>
            <div>Front</div>
            <button type="button" onClick={this.showBack}>Show back</button>
            <div><small>(manual flip)</small></div>
          </div>
          <div>
            <div>Back</div>
            <button type="button" ref="backButton" onClick={this.showFront}>Show front</button>
          </div>
        </FlipCard>
      </div>
    );
  }
});

React.render(<App/>, document.getElementById('container'));
```

## Credits

This component is largely a React wrapper for CSS created by [David Walsh](http://davidwalsh.name/css-flip).

## License

MIT
