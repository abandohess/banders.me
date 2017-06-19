$('document').ready(function($) {
  var resizeWidth = 768;
  // Navar shrinks when user scrolls down 100 pixels
  if ($(window).width() > 400) {
    $('#mainNav').affix({
      offset: {
        top: 100
      }
    });
  }
  else {
    $('#mainNav').affix({
      offset: {
        top: 0
      }
    });
  }

  // size of slideshow interface depends on size of image
  var img = document.getElementById('slidePic');
  var imgHeight = img.clientHeight;
  var window_height = $(window).height();
  if ( imgHeight > window_height) {
    $(".item").css({"height": window_height});
  }
  else {
    $(".item").css({"height": imgHeight});
  }
  // load all slide images into array
  slidePicsArray = $('.slidePic');
  $(window).resize(function() {
    // find the image being displayed
    for (i = 0; i < slidePicsArray.length; i++) {
      img = slidePicsArray[i];
      imgHeight = img.clientHeight;
      // if not 0, image is being displayed
      if (imgHeight != 0) {
        break;
      }
    }
    window_height = $(window).height();
    if ( imgHeight > window_height) {
      $(".item").css({"height": window_height});
    }
    else {
      $(".item").css({"height": imgHeight});
    }
  });

  // If screen is in mobile mode, make sure links appear in proper format
  var window_width = $(window).width();
  if( window_width < resizeWidth ) {
    document.getElementById('navbarRight').style.float = 'none';

  }
  else {
    document.getElementById('navbarRight').style.float = 'right';
  }
  $(window).resize(function() {
    window_width = $(window).width();
    if (window_width < resizeWidth) {
      document.getElementById('navbarRight').style.float = 'none';
    }
    else {
      document.getElementById('navbarRight').style.float = 'right';
    }
  });

  // Prevent navbar formatting from getting squished
  $(window).on("resize", function () {
    var startResizingNav = 1220;
    window_width = $(window).width();
    if (window_width < startResizingNav && window_width > resizeWidth) {
      //
      if (window_width > 1000) $(".navLinkFont").css({"margin-left": "-3px"});

      if (window_width < 1000) {
        $(".navLinkFont").css({"margin-left": "-4px"})
        $(".logoFontRed").css({"font-size": 1.7 + "em"});
        $(".logoFontBlue").css({"font-size": 1.7 + "em"});
        $(".navLinkFont").css({"font-size": 1 + "em"});
        document.getElementById('logo').style.width = '60px';
      }
      else {
        $(".navLinkFont").css({"margin-left": "-3px"})
        $(".logoFontRed").css({"font-size": 2 + "em"});
        $(".logoFontBlue").css({"font-size": 2 + "em"});
        $(".navLinkFont").css({"font-size": 1.5 + "em"});
        document.getElementById('logo').style.width = '95px';
      }
    }
    else if (window_width < 400) {
      var nav = document.getElementById('mainNav');
      var navHeight = nav.clientHeight;
      $("#myCarousel").css({"margin-top": navHeight})
      $(".logoFontRed").css({"font-size": 1.7 + "em"});
      $(".logoFontBlue").css({"font-size": 1.7 + "em"});
      $(".navLinkFont").css({"font-size": 1.3 + "em"});
      document.getElementById('logo').style.width = '75px';
    }
    else {
      $(".navLinkFont").css({"margin-left": "0px"})
      $(".logoFontRed").css({"font-size": 2 + "em"});
      $(".logoFontBlue").css({"font-size": 2 + "em"});
      $(".navLinkFont").css({"font-size": 1.5 + "em"});
      document.getElementById('logo').style.width = '95px';
    }
  // Invoke the resize event immediately
  }).resize();

});
