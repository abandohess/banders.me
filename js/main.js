$('document').ready(function($) {

  //transparent menu
  $(window).scroll(function() {
    if($(this).scrollTop() < 50) { /*height in pixels when the navbar becomes non opaque*/
      $('#opaque-navbar').removeClass('opaque');  //navbar becomes clear
      $('[id="asbestos"]').removeClass('white');
    }
    else {
      $('#opaque-navbar').addClass('opaque'); //navbar becomes black
      $('[id="asbestos"]').addClass('white');
    }
  });

  // Smooth scrolling
  var scroll = function(key, val) {
  	$(key).click(function() {
      $('body, html').stop().animate({
        scrollTop: $(val).offset().top
      }, 1750);
      return false;
    });
  };

  $(function() {
  	var scrollers = {
  		'.big-brand': 'body',
			'[id="homie"]': 'body',
			'[id="aboutie"]': '#aboutMe',
			'[id="porty"]': '#myPortfolio',
			'[id="conty"]': '#contactMe',
			'.back-to-top': 'body',
			'.fa-envelope-o': '#Contact'
  	};
  	for (var key in scrollers) {
  		scroll(key, scrollers[key]);
  	}
  });

  // collapsable mobile menu
  $( ".cross" ).hide();
  $( ".menu" ).hide();
  $( ".hamburger" ).click(function() {
  $( ".menu" ).slideToggle( "slow", function() {
  // $( ".hamburger" ).hide();
  // $( ".cross" ).show();
  });
  });

  $( ".hamburgerItem" ).click(function() {
  $( ".menu" ).slideToggle( "slow", function() {
  });
  });

  // $( ".cross" ).click(function() {
  // $( ".menu" ).slideToggle( "slow", function() {
  // $( ".cross" ).hide();
  // $( ".hamburger" ).show();
  // });
  // });

});
