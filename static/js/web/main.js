Mustache.Formatters = {
  date : function (date) {
    return moment(date).fromNow();
  }
}

$(window).load(function () {
  'use strict';

  var sliderTemplate = $('#testimony-slider-list-template').html();
  var carouselTemplate = $('#testimony-carousel-list-template').html();
  var testimonySlider = $('#testimony-slider');
  var testimonyCarousel = $('#carousel.flexslider');
  var tweetApi;

  if (window.location.host === 'localhost:3001') {
    tweetApi = 'http://localhost:3001/page/1/0'
  } else {
    tweetApi = 'https://shopee1212.herokuapp.com/page/1/0'
  }

  var options = {
    method: 'GET',
    url: tweetApi,
    cache: false,
    success: function (respone) {
      testimonySlider.html('').append(Mustache.render(sliderTemplate, { tweets : respone }));
      testimonyCarousel.html('').append(Mustache.render(carouselTemplate, { tweets : respone }));

      tweetParser('.tweet', {
        urlClass : 'tweet-link',
        userClass : 'tweet=user',
        hashtagClass : 'hashtag',
        target : '_blank',
        searchWithHashtags : true,
        parseUsers : true,
        parseHashtags : true,
        parseUrls : true
      });

      var optCarousel = {
        animation: 'slide',
        controlNav: false,
        animationLoop: false,
        slideshow: true,
        itemMargin: 0,
        asNavFor: '#testimony-slider'
      }

      if ($(window).width() > 960) {
        optCarousel.itemWidth = 244
      } else {
        optCarousel.itemWidth = 204
      }

      $('#carousel').flexslider(optCarousel);

      $('#testimony-slider').flexslider({
        animation: 'slide',
        controlNav: false,
        // directionNav: false,
        animationLoop: false,
        slideshow: true,
        sync: '#carousel'
      });
    },
    error: function (jqXHR, textStatus) {
      console.log(jqXHR, textStatus)
    }
  }

  $.ajax(options);

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
