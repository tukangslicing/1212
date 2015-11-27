$(window).load(function () {
  'use strict';
});

$(function () {
  'use strict';

  $('.hero-banner .flexslider').flexslider({
    animation: 'slide',
    slideshow: false,
    controlNav: false,
    directionNav: true
  });

})

function isNumber (evt) {
  var theEvent = evt || window.event;
  var key = theEvent.keyCode || theEvent.which;
  key = String.fromCharCode(key);
  if (key.length === 0) {
    return true
  }
  var regex = /^[0-9.,\b]+$/;
  if (!regex.test(key)) {
    theEvent.returnValue = false;
    if (theEvent.preventDefault) {
      return theEvent.preventDefault();
    }
  }
}
