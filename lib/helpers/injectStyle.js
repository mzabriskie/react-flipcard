const CSS = `
.ReactFlipCard {
  -webkit-perspective: 1000;
  -moz-perspective: 1000;
  -ms-perspective: 1000;
  perspective: 1000;

  -ms-transform: perspective(1000px);
  -moz-transform: perspective(1000px);
  -moz-transform-style: preserve-3d;
  -ms-transform-style: preserve-3d;

  display: inline-block;
}

/* START: Accommodating for IE */
.ReactFlipCard--enabled.ReactFlipCard:hover .ReactFlipCard__Back,
.ReactFlipCard--flipped .ReactFlipCard__Back {
  -webkit-transform: rotateY(0deg);
  -moz-transform: rotateY(0deg);
  -ms-transform: rotateY(0deg);
  -o-transform: rotateY(0deg);
  transform: rotateY(0deg);
}

.ReactFlipCard--enabled.ReactFlipCard:hover .ReactFlipCard__Front,
.ReactFlipCard--flipped .ReactFlipCard__Front {
  -webkit-transform: rotateY(180deg);
  -moz-transform: rotateY(180deg);
  -ms-transform: rotateY(180deg);
  -o-transform: rotateY(180deg);
  transform: rotateY(180deg);
}
/* END: Accommodating for IE */

.ReactFlipCard__Flipper {
  -webkit-transition: 0.6s;
  -webkit-transform-style: preserve-3d;
  -ms-transition: 0.6s;

  -moz-transition: 0.6s;
  -moz-transform: perspective(1000px);
  -moz-transform-style: preserve-3d;
  -ms-transform-style: preserve-3d;

  transition: 0.6s;
  transform-style: preserve-3d;

  position: relative;
}

.ReactFlipCard__Front, .ReactFlipCard__Back {
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -ms-backface-visibility: hidden;
  backface-visibility: hidden;

  -webkit-transition: 0.6s;
  -webkit-transform-style: preserve-3d;
  -webkit-transform: rotateY(0deg);

  -moz-transition: 0.6s;
  -moz-transform-style: preserve-3d;
  -moz-transform: rotateY(0deg);

  -o-transition: 0.6s;
  -o-transform-style: preserve-3d;
  -o-transform: rotateY(0deg);

  -ms-transition: 0.6s;
  -ms-transform-style: preserve-3d;
  -ms-transform: rotateY(0deg);

  transition: 0.6s;
  transform-style: preserve-3d;
  transform: rotateY(0deg);

  position: absolute;
  top: 0;
  left: 0;
}

.ReactFlipCard__Front {
  -webkit-transform: rotateY(0deg);
  -moz-transform: rotateY(0deg);
  -ms-transform: rotateY(0deg);
  -o-transform: rotateY(0deg);
  z-index: 2;
}

.ReactFlipCard__Back {
  -webkit-transform: rotateY(-180deg);
  -moz-transform: rotateY(-180deg);
  -ms-transform: rotateY(-180deg);
  -o-transform: rotateY(-180deg);
    transform: rotateY(-180deg);
}

/* vertical */
.ReactFlipCard--vertical {
  position: relative;
}

.ReactFlipCard--vertical .ReactFlipCard__Back {
  -webkit-transform: rotateX(180deg);
  -moz-transform: rotateX(180deg);
  -ms-transform: rotateX(180deg);
  -o-transform: rotateX(180deg);
  transform: rotateX(180deg);
}

.ReactFlipCard--vertical .ReactFlipCard__Flipper {
  -webkit-transform-origin: 100% 150px;
  -moz-transform-origin: 100% 150px;
  -ms-transform-origin: 100% 150px;
  -o-transform-origin: 100% 150px;
  transform-origin: 100% 150px;
}

/* START: Accommodating for IE */
.ReactFlipCard--enabled.ReactFlipCard--vertical:hover .ReactFlipCard__Back,
.ReactFlipCard--vertical.ReactFlipCard--flipped .ReactFlipCard__Back {
  -webkit-transform: rotateX(0deg);
  -moz-transform: rotateX(0deg);
  -ms-transform: rotateX(0deg);
  -o-transform: rotateX(0deg);
  transform: rotateX(0deg);
}

.ReactFlipCard--enabled.ReactFlipCard--vertical:hover .ReactFlipCard__Front,
.ReactFlipCard--vertical.ReactFlipCard--flipped .ReactFlipCard__Front {
  -webkit-transform: rotateX(180deg);
  -moz-transform: rotateX(180deg);
  -ms-transform: rotateX(180deg);
  -o-transform: rotateX(180deg);
  transform: rotateX(180deg);
}
/* END: Accommodating for IE */
`;

export default function() {
  let style = document.getElementById('react-flipcard-style');
  if (!style) {
    style = document.createElement('style');
    style.setAttribute('id', 'react-flipcard-style');
    const head = document.querySelector('head');
    head.insertBefore(style, head.firstChild);
  }
  style.innerHTML = CSS;
}
