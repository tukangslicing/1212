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
