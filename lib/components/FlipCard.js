import React, { PropTypes } from 'react';
import contains from '../helpers/contains';
import injectStyle from '../helpers/injectStyle';

// Auto inject the styles (will only be done once)
injectStyle();

export default React.createClass({
  displayName: 'ReactFlipCard',

  propTypes: {
    type: PropTypes.string,
    flipped: PropTypes.bool,
    disabled: PropTypes.bool,
    onFlip: PropTypes.func,
    onKeyDown: PropTypes.func,
    children(props, propName, componentName) {
      var prop = props[propName];

      if (React.Children.count(prop) !== 2) {
        return new Error(
          '`' + componentName + '` ' +
          'should contain exactly two children. ' +
          'The first child represents the front of the card. ' +
          'The second child represents the back of the card.'
        );
      }
    }
  },

  getDefaultProps() {
    return {
      type: 'horizontal',
      flipped: false,
      disabled: false
    };
  },

  getInitialState() {
    return {
      hasFocus: false,
      isFlipped: this.props.flipped
    };
  },

  componentWillReceiveProps(newProps) {
    this.setState({
      isFlipped: newProps.flipped
    });
  },

  componentWillUpdate(nextProps, nextState) {
    // If card is flipping to back via props, track element for focus
    if (!this.props.flipped && nextProps.flipped) {
      // The element that focus will return to when flipped back to front
      this.focusElement = document.activeElement;
      // Indicates that the back of card needs focus
      this.focusBack = true;
    }

    // If isFlipped has changed need to notify
    if (this.state.isFlipped !== nextState.isFlipped) {
      this.notifyFlip = true;
    }
  },

  componentDidUpdate() {
    // If card has flipped to front, and focus is still within the card
    // return focus to the element that triggered flipping to the back.
    if (!this.props.flipped &&
         this.focusElement &&
         contains(this.getDOMNode(), document.activeElement)
       ) {
      this.focusElement.focus();
      this.focusElement = null;
    }
    // Direct focus to the back if needed
    else if (this.focusBack) {
      this.refs.back.getDOMNode().focus();
      this.focusBack = false;
    }

    // Notify card being flipped
    if (this.notifyFlip && typeof this.props.onFlip === 'function') {
      this.props.onFlip(this.state.isFlipped);
      this.notifyFlip = false;
    }
  },

  handleFocus() {
    if (this.props.disabled) return;

    this.setState({
      isFlipped: true
    });
  },

  handleBlur() {
    if (this.props.disabled) return;

    this.setState({
      isFlipped: false
    });
  },

  handleKeyDown(e) {
    if (typeof this.props.onKeyDown === 'function') {
      this.props.onKeyDown(e);
    }
  },

  render() {
    var className = (
      'ReactFlipCard ReactFlipCard--' +
      (this.props.type === 'vertical' ? 'vertical' : 'horizontal')
    );

    if (this.state.isFlipped) {
      className += ' ReactFlipCard--flipped';
    }

    if (!this.props.disabled) {
      className += ' ReactFlipCard--enabled';
    }

    return (
      <div
        className={className}
        tabIndex={0}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onKeyDown={this.handleKeyDown}
      >
        <div
          className="ReactFlipCard__Flipper"
        >
          <div
            className="ReactFlipCard__Front"
            ref="front"
            tabIndex={-1}
            aria-hidden={this.state.isFlipped}
          >
            {this.props.children[0]}
          </div>
          <div
            className="ReactFlipCard__Back"
            ref="back"
            tabIndex={-1}
            aria-hidden={!this.state.isFlipped}
          >
            {this.props.children[1]}
          </div>
        </div>
      </div>
    );
  }
});
