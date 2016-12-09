$('document').ready(function($) {




$(window).scroll(function() {
  if($(this).scrollTop() > 50)  /*height in pixels when the navbar becomes non opaque*/
  {
      $('#opaque-navbar').addClass('opaque');
      $('[id="asbestos"]').addClass('white');
  } else {
      $('#opaque-navbar').removeClass('opaque');
      $('[id="asbestos"]').removeClass('white');
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
  			'#homie': 'body',
  			'#aboutie': '#aboutMe',
  			'#porty': '#myPortfolio',
  			'#conty': '#contactMe',
  			'.back-to-top': 'body',
  			'.fa-envelope-o': '#Contact'
    	};
    	for (var key in scrollers) {
    		scroll(key, scrollers[key]);
    	}
    });
});
