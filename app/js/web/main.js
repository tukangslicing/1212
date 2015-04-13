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

  $('.inline-text form input[type=text]').attr('size', function () {
    var length = 2;

    if (this.value.length < 1) {
      $(this).addClass('is-empty');
    } else {
      $(this).removeClass('is-empty');
    }

    if (this.value.length > 5) {
      length = this.value.length;
    }

    if (length > 14) {
      length = length - (length / 6)
    }
    return Math.ceil(length);

  }).on('keyup', function () {
    var length = 2;

    if (this.value.length < 1) {
      $(this).addClass('is-empty');
    } else {
      $(this).removeClass('is-empty');
    }

    if (this.value.length > 5) {
      length = this.value.length;
    }

    if (length > 14) {
      length = length - (length / 6)
    }

    if (length === 7) {
      length = length + 1
    }

    $(this).attr('size', Math.ceil(length));


  }).trigger('keyup');

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
