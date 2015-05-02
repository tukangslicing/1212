$(window).load(function () {
  'use strict';
});


$(function () {
  'use strict';

  // The slider being synced must be initialized first
  $('#gallery-slider-carousel').flexslider({
    animation: 'slide',
    controlNav: false,
    animationLoop: false,
    slideshow: false,
    itemWidth: 60,
    itemMargin: 5,
    asNavFor: '#gallery-slider',
    prevText: '',
    nextText: ''
  });

  $('#gallery-slider').flexslider({
    animation: 'slide',
    controlNav: false,
    animationLoop: false,
    slideshow: false,
    sync: '#gallery-slider-carousel',
    directionNav: false
  });

  $('.hero-banner .flexslider').flexslider({
    animation: 'slide',
    slideshow: false,
    directionNav: false
  });

  $('.inline-text form input[type=text]').attr('size', function () {
    var length = 3;

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
    var length = 3;

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

  var nowDate = new Date();
  var today = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate(), 0, 0, 0, 0);

  var chooseDate = $('.chooseDate input').datepicker({
    orientation: 'top left',
    format: 'D, dd M yyyy',
    autoclose: true,
    startDate: today
    // todayHighlight: true
  });

  $('.flight-form form input.date').datepicker({
    orientation: 'top left',
    format: 'dd-mm-yy',
    // autoclose: true,
    container: '.menu-flight-form',
    startDate: today
    // todayHighlight: true
  });

  $('.hotel-form form input.date').datepicker({
    orientation: 'top left',
    format: 'dd-mm-yy',
    // autoclose: true,
    container: '.menu-hotel-form',
    startDate: today
    // todayHighlight: true
  });

  $(document).on('click', '.increase .ico', function () {
    var _this  = $(this);
    var target = _this.parent().parent().find('input');
    console.log(target);
    var value;

    if (!validator.isNumeric(parseInt(target.val()))) {
      target.val(0);
    } else {

      if (validator.isNull(target.val())) {
        value = 0
      } else {
        value = parseInt(target.val()) - 1;
      }

      if (value > 9) {
        target.val(9);
      } else if (value >= 0) {
        target.val(value);
      } else {
        target.val(0);
      }

    }
  })

  $(document).on('click', '.decrease .ico', function () {
    var _this  = $(this);
    var target = _this.parent().parent().find('input');
    var value;

    if (!validator.isNumeric(parseInt(target.val()))) {
      target.val(0);
    } else {

      if (validator.isNull(target.val())) {
        value = 0
      } else {
        value = parseInt(target.val()) + 1;
      }
      if (value > 9) {
        return false
      } else {
        target.val(value);
      }
    }
  });

  function adjustModalMaxHeightAndPosition() {
    $('.modal').each(function () {
      if ($(this).hasClass('in') === false) {
        $(this).show();
      }
      var contentHeight = $(window).height() - 60;
      var headerHeight = $(this).find('.modal-header').outerHeight() || 2;
      var footerHeight = $(this).find('.modal-footer').outerHeight() || 2;

      $(this).find('.modal-content').css({
        'max-height': function () {
          return contentHeight;
        }
      });

      $(this).find('.modal-body').css({
        'max-height': function () {
          return contentHeight - (headerHeight + footerHeight);
        }
      });

      $(this).find('.modal-dialog').addClass('modal-dialog-center').css({
        'margin-top': function () {
          return -($(this).outerHeight() / 2);
        },
        'margin-left': function () {
          return -($(this).outerWidth() / 2);
        }
      });
      if ($(this).hasClass('in') === false) {
        $(this).hide();
      }
    });
  }
  if ($(window).height() >= 320) {
    $(window).resize(adjustModalMaxHeightAndPosition).trigger('resize');
  }

  $('input.cc-number').payment('formatCardNumber');
  // $('input.cc-exp').payment('formatCardExpiry');
  $('input.cc-cvc').payment('formatCardCVC');

  $(document).on('click', '.btn-edit-this-cc', function () {
    var $this = $(this);
    var $blockCreditCarditem = $this.parents('.card-item').toggleClass('open')
  })

  $('.aside').on('click', '.filtering .toggle .ico', function () {
    var thiz = $(this);
    var parent = thiz.parent('.toggle');
    var target = parent.siblings('.form-group');
    console.log(target);

    target.slideToggle(500, function () {
      if (thiz.hasClass('ico-down-circle-arrow-md')) {
        thiz.removeClass('ico-down-circle-arrow-md').addClass('ico-right-circle-arrow-md')
      } else {
        thiz.removeClass('ico-right-circle-arrow-md').addClass('ico-down-circle-arrow-md')
      }
    });

  })
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
