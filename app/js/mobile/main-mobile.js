(function () {
  var $body = document.body;
  var $menuTrigger = $body.getElementsByClassName('menu-trigger')[0];
  if (typeof $menuTrigger !== 'undefined') {
    $menuTrigger.addEventListener('click', function () {
      $body.className = ($body.className === 'menu-active') ? '' : 'menu-active';

      var overlay = document.createElement('div');

      overlay.className = 'main-menu-overlay';

      document.body.appendChild(overlay);

      overlay.addEventListener('click', function () {
        if (hasClass(document.body, 'menu-active')) {
          document.body.className = '';
          document.querySelector('.main-menu-overlay').remove();
        }
      });
    });
  }

  function hasClass(el, className) {
    return el.classList ? el.classList.contains(className) : new RegExp('\b' + className + '\b').test(el.className);
  }

}).call(this);

$(function () {
  $(document).on('click', '#backToTop', function (e) {
    $('html, body').animate({ scrollTop: '0px' }, 800);
  });

  $(document).scroll(function () {
    if ($(this).scrollTop() > 80) {
      $('#backToTop').stop(true, true).fadeIn();
    } else {
      $('#backToTop').stop(true, true).fadeOut();
    }
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
        value = parseInt(target.val()) + 1;
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
        value = parseInt(target.val()) - 1;
      }
      if (value > 9) {
        return false
      } else {
        target.val(value);
      }
    }
  });

  $('.tour-tabs .nav-tabs li a').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
  })

})

