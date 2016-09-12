import React from 'react';
import DOM from 'react-dom';
import FlipCard from '../../lib/main';


const App = React.createClass({
  getInitialState() {
    return {
      isFlipped: false
    };
  },

  handleOnFlip(flipped) {
    if (flipped) {
      this.refs.backButton.focus();
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
          disabled
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
  }
});

DOM.render(<App/>, document.getElementById('example'));
