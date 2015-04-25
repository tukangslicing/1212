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

  var chooseDate = $('.chooseDate input').datepicker({
    orientation: 'top left',
    format: 'D, dd M yyyy',
    autoclose: true
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

  $(document).on('click', '.btn-edit-this-cc', function (argument) {
    var $this = $(this);
    var $blockCreditCarditem = $this.parents('.card-item').toggleClass('open')
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
