$(window).load(function () {
  'use strict';

  $('#carousel').flexslider({
    animation: 'slide',
    controlNav: false,
    animationLoop: false,
    slideshow: false,
    itemWidth: 244,
    itemMargin: 0,
    asNavFor: '#testimony-slider'
  });

  $('#testimony-slider').flexslider({
    animation: 'slide',
    controlNav: false,
    directionNav: false,
    animationLoop: false,
    slideshow: false,
    sync: '#carousel'
  });

});

$(function () {
  'use strict';

  $('.hero-banner .flexslider').flexslider({
    animation: 'slide',
    slideshow: false,
    controlNav: false,
    directionNav: true
  });

  var timelineBlocks = $('.cd-timeline-block');
  var offset = 0.8;

  $(window).on('scroll', function () {

    if (!window.requestAnimationFrame) {

      setTimeout(function () {
        showBlocks(timelineBlocks, offset);
      }, 100)

    } else {
      window.requestAnimationFrame(function () {
        showBlocks(timelineBlocks, offset);
      });
    }

  });

  function hideBlocks(blocks, offset) {
    blocks.each(function () {
      if ($(this).offset().top > $(window).scrollTop() + $(window).height() * offset) {

        $(this)
          .find('.cd-timeline-img, .cd-timeline-content')
          .addClass('is-hidden');
      }
    });
  }

  function showBlocks(blocks, offset) {
    blocks.each(function () {
      var checked = $(this).find('.cd-timeline-img').hasClass('is-hidden');

      if ($(this).offset().top <= $(window).scrollTop() + $(window).height() * offset && checked){
        $(this)
          .find('.cd-timeline-img, .cd-timeline-content')
          .removeClass('is-hidden')
          .addClass('bounce-in');
      }
    });
  }

  hideBlocks(timelineBlocks, offset);

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
