(function($) {

	"use strict";

	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	$('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active');
  });

})(jQuery);


$(document).ready(function(){
    $("button").click(function(){
        $('#login1').animate({
            left: '-=190'}, {
            duration: 5000
            
                
            
         });
    });
  });