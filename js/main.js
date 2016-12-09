// $('document').ready(function($) {
//
//
//
// });
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
