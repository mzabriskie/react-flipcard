import React from 'react';
import TestUtils from 'react-addons-test-utils';
import FlipCard from '../../main';
import { equal, throws } from 'assert';

/* eslint func-names:0 */
describe('react-flipcard', function() {
  it('should throw an error if less than 2 children are provided', function() {
    throws(function() {
      TestUtils.renderIntoDocument(<FlipCard/>);
    }, TypeError);
  });

  it('should flip vertically', function() {
    const card = TestUtils.renderIntoDocument(
      <FlipCard type="vertical">
        <div>foo</div>
        <div>bar</div>
      </FlipCard>
    );
    equal(card.getDOMNode().classList.contains('ReactFlipCard--vertical'), true);
    equal(card.getDOMNode().classList.contains('ReactFlipCard--horizontal'), false);
  });

  it('should flip horizontally by default', function() {
    const card = TestUtils.renderIntoDocument(
      <FlipCard>
        <div>foo</div>
        <div>bar</div>
      </FlipCard>
    );
    equal(card.getDOMNode().classList.contains('ReactFlipCard--vertical'), false);
    equal(card.getDOMNode().classList.contains('ReactFlipCard--horizontal'), true);
  });

  it('should default to enabled', function() {
    const card = TestUtils.renderIntoDocument(
      <FlipCard>
        <div>foo</div>
        <div>bar</div>
      </FlipCard>
    );
    equal(card.getDOMNode().classList.contains('ReactFlipCard--enabled'), true);
  });

  it('should allow disabling', function() {
    const card = TestUtils.renderIntoDocument(
      <FlipCard disabled={true}>
        <div>foo</div>
        <div>bar</div>
      </FlipCard>
    );
    equal(card.getDOMNode().classList.contains('ReactFlipCard--enabled'), false);
  });

  // TODO: Why doesn't this work?
  // it('should call onFlip', function (done) {
  //   var called = false;
  //   function handleOnFlip() {
  //     console.log('foo');
  //     called = true;
  //   }
  //
  //   var card = TestUtils.renderIntoDocument(
  //     <FlipCard onFlip={handleOnFlip}>
  //       <div>foo</div>
  //       <div>bar</div>
  //     </FlipCard>
  //   );
  //
  //   card.getDOMNode().focus();
  //   setTimeout(function () {
  //     ok(called);
  //     done();
  //   }, 0);
  // });
});
