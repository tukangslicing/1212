$(window).load(function () {
  'use strict';

})

$(function () {
  'use strict';

  $('.flexslider').flexslider({
    animation: 'slide',
    slideshow: false,
    directionNav: false
  });

  $(window).on('scroll', function () {
    if ($('.nav-go-to').length > 0) {
      var navHeight = $('.nav-go-to').offset().top;
      var navSticky = $('.nav-go-to');

      if ($(window).scrollTop() > 982) {
        navSticky.addClass('fixed')
      } else {
        navSticky.removeClass('fixed');
      }
    }
  });

  $('.tour-list .tour-item').hover(function (e) {
    // console.log(this);
    // var $curent = $(this);
    // var $rolloverBlock = $curent.find('.rollover');
    // $rolloverBlock.animate({
    //   top: '+=50'
    // }, 5000, function () {
    //   console.log('complete');
    // });

  })
})
