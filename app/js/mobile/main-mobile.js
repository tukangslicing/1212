(function () {
  var $body = document.body;
  var $menuTrigger = $body.getElementsByClassName('menu-trigger')[0];
  if (typeof $menuTrigger !== 'undefined') {
    $menuTrigger.addEventListener('click', function () {
      $body.className = ($body.className === 'menu-active') ? '' : 'menu-active';
    });
  }
}).call(this);

$(function () {
  $(document).on('click', '#main-content', function (e) {
  });


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

})

