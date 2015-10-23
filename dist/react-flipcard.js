(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"), require("ReactDOM"));
	else if(typeof define === 'function' && define.amd)
		define(["React", "ReactDOM"], factory);
	else if(typeof exports === 'object')
		exports["ReactFlipcard"] = factory(require("React"), require("ReactDOM"));
	else
		root["ReactFlipcard"] = factory(root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(3);
	
	var _classnames = __webpack_require__(4);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _helpersContains = __webpack_require__(5);
	
	var _helpersContains2 = _interopRequireDefault(_helpersContains);
	
	var _helpersInjectStyle = __webpack_require__(6);
	
	var _helpersInjectStyle2 = _interopRequireDefault(_helpersInjectStyle);
	
	// Auto inject the styles (will only be done once)
	(0, _helpersInjectStyle2['default'])();
	
	exports['default'] = _react2['default'].createClass({
	  displayName: 'ReactFlipCard',
	
	  propTypes: {
	    type: _react.PropTypes.string,
	    flipped: _react.PropTypes.bool,
	    disabled: _react.PropTypes.bool,
	    onFlip: _react.PropTypes.func,
	    onKeyDown: _react.PropTypes.func,
	    children: function children(props, propName, componentName) {
	      var prop = props[propName];
	
	      if (_react2['default'].Children.count(prop) !== 2) {
	        return new Error('`' + componentName + '` ' + 'should contain exactly two children. ' + 'The first child represents the front of the card. ' + 'The second child represents the back of the card.');
	      }
	    }
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      type: 'horizontal',
	      flipped: false,
	      disabled: false
	    };
	  },
	
	  getInitialState: function getInitialState() {
	    return {
	      hasFocus: false,
	      isFlipped: this.props.flipped
	    };
	  },
	
	  componentDidMount: function componentDidMount() {
	    this._hideFlippedSide();
	  },
	
	  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
	    var _this = this;
	
	    // Make sure both sides are displayed for animation
	    this._showBothSides();
	
	    // Wait for display above to take effect
	    setTimeout(function () {
	      _this.setState({
	        isFlipped: newProps.flipped
	      });
	    }, 0);
	  },
	
	  componentWillUpdate: function componentWillUpdate(nextProps, nextState) {
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
	
	  componentDidUpdate: function componentDidUpdate() {
	    // If card has flipped to front, and focus is still within the card
	    // return focus to the element that triggered flipping to the back.
	    if (!this.props.flipped && this.focusElement && (0, _helpersContains2['default'])((0, _reactDom.findDOMNode)(this), document.activeElement)) {
	      this.focusElement.focus();
	      this.focusElement = null;
	    }
	    // Direct focus to the back if needed
	    /* eslint brace-style:0 */
	    else if (this.focusBack) {
	        this.refs.back.focus();
	        this.focusBack = false;
	      }
	
	    // Notify card being flipped
	    if (this.notifyFlip && typeof this.props.onFlip === 'function') {
	      this.props.onFlip(this.state.isFlipped);
	      this.notifyFlip = false;
	    }
	
	    // Hide whichever side of the card is down
	    setTimeout(this._hideFlippedSide, 600);
	  },
	
	  handleFocus: function handleFocus() {
	    if (this.props.disabled) return;
	
	    this.setState({
	      isFlipped: true
	    });
	  },
	
	  handleBlur: function handleBlur() {
	    if (this.props.disabled) return;
	
	    this.setState({
	      isFlipped: false
	    });
	  },
	
	  handleKeyDown: function handleKeyDown(e) {
	    if (typeof this.props.onKeyDown === 'function') {
	      this.props.onKeyDown(e);
	    }
	  },
	
	  render: function render() {
	    return _react2['default'].createElement(
	      'div',
	      {
	        className: (0, _classnames2['default'])({
	          'ReactFlipCard': true,
	          'ReactFlipCard--vertical': this.props.type === 'vertical',
	          'ReactFlipCard--horizontal': this.props.type !== 'vertical',
	          'ReactFlipCard--flipped': this.state.isFlipped,
	          'ReactFlipCard--enabled': !this.props.disabled
	        }),
	        tabIndex: 0,
	        onFocus: this.handleFocus,
	        onBlur: this.handleBlur,
	        onKeyDown: this.handleKeyDown
	      },
	      _react2['default'].createElement(
	        'div',
	        {
	          className: 'ReactFlipCard__Flipper'
	        },
	        _react2['default'].createElement(
	          'div',
	          {
	            className: 'ReactFlipCard__Front',
	            ref: 'front',
	            tabIndex: -1,
	            'aria-hidden': this.state.isFlipped
	          },
	          this.props.children[0]
	        ),
	        _react2['default'].createElement(
	          'div',
	          {
	            className: 'ReactFlipCard__Back',
	            ref: 'back',
	            tabIndex: -1,
	            'aria-hidden': !this.state.isFlipped
	          },
	          this.props.children[1]
	        )
	      )
	    );
	  },
	
	  _showBothSides: function _showBothSides() {
	    this.refs.front.style.display = '';
	    this.refs.back.style.display = '';
	  },
	
	  _hideFlippedSide: function _hideFlippedSide() {
	    // This prevents the flipped side from being tabbable
	    if (this.props.disabled) {
	      if (this.state.isFlipped) {
	        this.refs.front.style.display = 'none';
	      } else {
	        this.refs.back.style.display = 'none';
	      }
	    }
	  }
	});
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2015 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */
	
	(function () {
		'use strict';
	
		var hasOwn = {}.hasOwnProperty;
	
		function classNames () {
			var classes = '';
	
			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;
	
				var argType = typeof arg;
	
				if (argType === 'string' || argType === 'number') {
					classes += ' ' + arg;
				} else if (Array.isArray(arg)) {
					classes += ' ' + classNames.apply(null, arg);
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes += ' ' + key;
						}
					}
				}
			}
	
			return classes.substr(1);
		}
	
		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ },
/* 5 */
/***/ function(module, exports) {

	// Checks to see if a parent element contains a child element
	/* eslint no-param-reassign:0, no-cond-assign:0 */
	"use strict";
	
	module.exports = function contains(parent, child) {
	  do {
	    if (parent === child) {
	      return true;
	    }
	  } while (child && (child = child.parentNode));
	  return false;
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var CSS = '\n.ReactFlipCard {\n  -webkit-perspective: 1000;\n  -moz-perspective: 1000;\n  -ms-perspective: 1000;\n  perspective: 1000;\n\n  -ms-transform: perspective(1000px);\n  -moz-transform: perspective(1000px);\n  -moz-transform-style: preserve-3d;\n  -ms-transform-style: preserve-3d;\n\n  display: inline-block;\n}\n\n/* START: Accommodating for IE */\n.ReactFlipCard--enabled.ReactFlipCard:hover .ReactFlipCard__Back,\n.ReactFlipCard--flipped .ReactFlipCard__Back {\n  -webkit-transform: rotateY(0deg);\n  -moz-transform: rotateY(0deg);\n  -ms-transform: rotateY(0deg);\n  -o-transform: rotateY(0deg);\n  transform: rotateY(0deg);\n}\n\n.ReactFlipCard--enabled.ReactFlipCard:hover .ReactFlipCard__Front,\n.ReactFlipCard--flipped .ReactFlipCard__Front {\n  -webkit-transform: rotateY(180deg);\n  -moz-transform: rotateY(180deg);\n  -ms-transform: rotateY(180deg);\n  -o-transform: rotateY(180deg);\n  transform: rotateY(180deg);\n}\n/* END: Accommodating for IE */\n\n.ReactFlipCard__Flipper {\n  -webkit-transition: 0.6s;\n  -webkit-transform-style: preserve-3d;\n  -ms-transition: 0.6s;\n\n  -moz-transition: 0.6s;\n  -moz-transform: perspective(1000px);\n  -moz-transform-style: preserve-3d;\n  -ms-transform-style: preserve-3d;\n\n  transition: 0.6s;\n  transform-style: preserve-3d;\n\n  position: relative;\n}\n\n.ReactFlipCard__Front, .ReactFlipCard__Back {\n  -webkit-backface-visibility: hidden;\n  -moz-backface-visibility: hidden;\n  -ms-backface-visibility: hidden;\n  backface-visibility: hidden;\n\n  -webkit-transition: 0.6s;\n  -webkit-transform-style: preserve-3d;\n  -webkit-transform: rotateY(0deg);\n\n  -moz-transition: 0.6s;\n  -moz-transform-style: preserve-3d;\n  -moz-transform: rotateY(0deg);\n\n  -o-transition: 0.6s;\n  -o-transform-style: preserve-3d;\n  -o-transform: rotateY(0deg);\n\n  -ms-transition: 0.6s;\n  -ms-transform-style: preserve-3d;\n  -ms-transform: rotateY(0deg);\n\n  transition: 0.6s;\n  transform-style: preserve-3d;\n  transform: rotateY(0deg);\n\n  position: absolute;\n  top: 0;\n  left: 0;\n}\n\n.ReactFlipCard__Front {\n  -webkit-transform: rotateY(0deg);\n  -moz-transform: rotateY(0deg);\n  -ms-transform: rotateY(0deg);\n  -o-transform: rotateY(0deg);\n  z-index: 2;\n}\n\n.ReactFlipCard__Back {\n  -webkit-transform: rotateY(-180deg);\n  -moz-transform: rotateY(-180deg);\n  -ms-transform: rotateY(-180deg);\n  -o-transform: rotateY(-180deg);\n    transform: rotateY(-180deg);\n}\n\n/* vertical */\n.ReactFlipCard--vertical {\n  position: relative;\n}\n\n.ReactFlipCard--vertical .ReactFlipCard__Back {\n  -webkit-transform: rotateX(180deg);\n  -moz-transform: rotateX(180deg);\n  -ms-transform: rotateX(180deg);\n  -o-transform: rotateX(180deg);\n  transform: rotateX(180deg);\n}\n\n.ReactFlipCard--vertical .ReactFlipCard__Flipper {\n  -webkit-transform-origin: 100% 150px;\n  -moz-transform-origin: 100% 150px;\n  -ms-transform-origin: 100% 150px;\n  -o-transform-origin: 100% 150px;\n  transform-origin: 100% 150px;\n}\n\n/* START: Accommodating for IE */\n.ReactFlipCard--enabled.ReactFlipCard--vertical:hover .ReactFlipCard__Back,\n.ReactFlipCard--vertical.ReactFlipCard--flipped .ReactFlipCard__Back {\n  -webkit-transform: rotateX(0deg);\n  -moz-transform: rotateX(0deg);\n  -ms-transform: rotateX(0deg);\n  -o-transform: rotateX(0deg);\n  transform: rotateX(0deg);\n}\n\n.ReactFlipCard--enabled.ReactFlipCard--vertical:hover .ReactFlipCard__Front,\n.ReactFlipCard--vertical.ReactFlipCard--flipped .ReactFlipCard__Front {\n  -webkit-transform: rotateX(180deg);\n  -moz-transform: rotateX(180deg);\n  -ms-transform: rotateX(180deg);\n  -o-transform: rotateX(180deg);\n  transform: rotateX(180deg);\n}\n/* END: Accommodating for IE */\n';
	
	exports['default'] = function () {
	  var style = document.getElementById('react-flipcard-style');
	  if (!style) {
	    style = document.createElement('style');
	    style.setAttribute('id', 'react-flipcard-style');
	    var head = document.querySelector('head');
	    head.insertBefore(style, head.firstChild);
	  }
	  style.innerHTML = CSS;
	};
	
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=react-flipcard.js.map