var	scrollTop = 0;
function checkLurker(scrollTop) {
	if ($('.js-lurk').length) {
		scrollTop = $(this).scrollTop(); // get the vertical scroll position
		$('.js-lurk').each(function( index ) {

			if (getResponsiveBreakpointName() === 'small') {
				var inset= 1;
			} else {
				var inset= .9;
			}
				var lurkTrigger= $(this).offset().top - ($(window).height()*inset) - scrollTop;

			if (lurkTrigger <= 0) {
				$(this).removeClass('js-lurk').addClass('js-lurked');
			}
		});
	}
}
//* DOCUMENT READY	*/
jQuery(document).ready(function($) {
		checkLurker(scrollTop);
// on scroll
	$(window).scroll(function(){
			checkLurker(scrollTop);
	});
}); //on ready