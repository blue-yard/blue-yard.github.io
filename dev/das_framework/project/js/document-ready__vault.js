//* DEFINING SOME GLOBAL FUNCTIONS IN GLOBAL EXECUTION CONTEXT	*/


function getResponsiveBreakpoint() {
	return (window.getComputedStyle(document.querySelector('#responsive-breakpoint'), ':after').content);
}
function getResponsiveBreakpointName() {
	str = getResponsiveBreakpoint();
	ret = str.substring(1, str.indexOf(','));
	return ret;
}
function getResponsiveBreakpointWidth() {
	str = getResponsiveBreakpoint();
	ret = parseInt(str.substring(str.indexOf(',') + 1, str.length - 1 ));
	return ret;
}

function getDocumentHeight() {
		var D = document;
		return Math.max(
				D.body.scrollHeight, D.documentElement.scrollHeight,
				D.body.offsetHeight, D.documentElement.offsetHeight,
				D.body.clientHeight, D.documentElement.clientHeight
		);
}


//* JUST LOADED class to handle splash screens or fadein*/

function justLoaded() {
//	$('html').addClass('is-just-loaded');
	justloadedEnd=window.rTimeout(function(){
		$('.is-just-loaded').removeClass('is-just-loaded');
	},1000);
};


//* DOCUMENT READY	*/


jQuery(document).ready(function($) {

//console.log(getResponsiveBreakpointName() );

//* JUST LOADED */
justLoaded();




//* SET CLASSES ON SCROLL*/

// setting classes in the html node reflecting the scrolling state.
// is-scroll--start
// is-scrolling
// is-scrolling--down
// is-scrolling--up
// is-scrolled--down
// is-scrolled--up
// is-scroll--end


	var	scrollDownThreshold = 5, // user needs to scroll down for $scrollDownThreshold px to set html.is-scrolled--down
			scrollUpThreshold = 5, // user needs to scroll up for $scrollUpThreshold px to set html.is-scrolled--up
			scrollTopThreshold = 5, // user needs to scroll down for $scrollTopThreshold px to get things going
			scrollTop = 0,
			lastScrollTop,
			scrollIncrement,
			scrollDirection,
			scrollNotDirection,
			lastScrollDirection,
			scrollReversed,
			scrollSum = 0;
	doScroll(); /* to fix reloading a page already scrolled and set these vars */


// on scroll
	$(window).scroll(function(){
		doScroll();
	//	stickyCheck(scrollTop); // for sticky elements
		$('html').addClass('is-scrolling');
	});

	function doScroll() {
		scrollTop = $(this).scrollTop(); // get the vertical scroll position
		scrollIncrement = scrollTop - lastScrollTop; // how far have we scrolled today?
		lastScrollTop = scrollTop; // remember for next time

		if (scrollTop < scrollTopThreshold){ // still very much at the top of the page
			$('html').addClass('is-scroll--start') // add a class
			scrolled(0); // remove some classes
		} else if (scrollTop + scrollTopThreshold >= getDocumentHeight() - $(window).height()) { // are we at the end of the document?
			$('html').addClass('is-scroll--end') // add a class
			scrolled(0); // remove some classes
		} else { // somewhere in between
			$('html').removeClass('is-scroll--end is-scroll--start') // remove the special classes
			scrolled(scrollIncrement); // set some classes
			}
	}

	function scrolled(scrollIncrement) {

		lastScrollDirection = scrollDirection; // remember the direction for next time

		if (scrollIncrement > 0) { // we are scrolling down the document
			$('html').addClass('is-scrolling--down') // set the class
			scrollDirection = 'is-scrolled--down'; // the direction is down
			scrollNotDirection = 'is-scrolled--up'; // the direction is not up

			if (scrollSum >= scrollDownThreshold && scrollReversed == 0) { // did we scroll far enough to make it a fact? did the direction reverse?
				scrollReversed = 1; // so we only do this once until we reverse scroll direction again.
				$('html').removeClass(scrollNotDirection).addClass(scrollDirection); // set the classes
				//console.log(scrollSum);
			}

		} else if (scrollIncrement < 0) { // we are scrolling up the document
			$('html').addClass('is-scrolling--up') // set the class
			scrollDirection = 'is-scrolled--up'; // the direction is up
			scrollNotDirection = 'is-scrolled--down'; // the direction is not down
			if (scrollSum <= scrollUpThreshold * -1 && scrollReversed == 0) { // did we scroll far enough to make it a fact? did the direction reverse?
				scrollReversed = 1; // so we only do this once until we reverse scroll direction again.
				$('html').removeClass(scrollNotDirection).addClass(scrollDirection); // set the classes
			//	console.log(scrollSum);
			}

		} else if (scrollIncrement == 0) { // special case when we are on top or bottom. called from doScroll() as scrolled(0)
			$('html').removeClass('is-scrolled--up is-scrolled--down'); // removing these classes
			scrollReversed = 0; // get ready to reverse
		}

		if (scrollDirection != lastScrollDirection) { // we reversed direction
			scrollSum = scrollIncrement; // restarting the sum
			scrollReversed = 0; // get ready to reverse
		} else {
			scrollSum += scrollIncrement; // summing up the amount of pixels scrolled in one direction
		}
	}

	$(window).scrollStopped(function () {
			$('html.is-scrolling').removeClass('is-scrolling is-scrolling--down is-scrolling--up');
	});


	$(window).resizeStopped(function () {
		scrolled(0); // makes things easier after resize
	});



//* FORCE REPAINT TRANSIT MODE FOR RESIZE AND ORIENTATION */


	 window.onresize = function(e) {
		window.onorientationchange();
	};


	window.onorientationchange = function() {
		$('body').addClass('in-transit');
		forceRepaintFix=window.rTimeout(function(){
			$('body').removeClass('in-transit');
		},500);
	};

	//* ANIMATED SCROLL TO ANCHORS ON SAME PAGE */


	$('a[href="#"]').click(function (e) {
	 	e.preventDefault();
	});


	function setAnchorScrollAniminationOffset(target) {
		//window.anchorScrollAniminationOffset = $('#page-header__banner').outerHeight(true)/-1 - 32;
		window.anchorScrollAniminationOffset = 0;
	}
	setAnchorScrollAniminationOffset();
	$(window).resizeStopped(function () {
		setAnchorScrollAniminationOffset();
	});


	$('a[href^="#"]:not([href="#"])').click(function (e) {
			e.preventDefault();
			$(this).blur();
			var target = $(this).attr('href');
			setAnchorScrollAniminationOffset(target);
			var url = window.location.href.substring(0, window.location.href.indexOf('#'));
			var scrollTop = $(window).scrollTop();
			if ($(this).hasClass('js-noscroll') || target=='#') {
				window.location.replace(url+target);
				window.scrollTo(0, scrollTop);
			} else {
				//	window.scrollTo(0, scrollTop);
				animateScrollTimeout=window.rTimeout(function(){
					var scrollGoal = Math.floor($(target).offset().top + anchorScrollAniminationOffset);
					anchorScrollAnimation (scrollGoal);
				},100);
				locationReplaceTimeout=window.rTimeout(function(){
					window.location.hash = target;
				},900);
			}
	});



	function anchorScrollAnimation (scrollGoal) {
		$('html').addClass('animating-to-anchor');
		anchorScrollAniminationTime = 800; // + Math.abs(scrollGoal - $(window).scrollTop()) * .8; // calculate animation timing from distance

		//console.log(anchorScrollAniminationTime);
		$('html, body').animate({
			scrollTop: scrollGoal
		}, anchorScrollAniminationTime,
		function callback(){
			if ($(window).scrollTop() > scrollGoal) {
				window.scrollBy(0, anchorScrollAniminationOffset);
			}
			removeTimeout = rTimeout( function(){
				$('html').removeClass('animating-to-anchor is-scrolled--up').addClass('is-scrolled--down');
				if ($(window).scrollTop() <= scrollTopThreshold) {
					scrolled(0);
				}
			},200 ); // needs to wait a bit
		});
	}


	//* SCROLL PAGE WHEN URL HAS ANCHOR*/

	if (window.location.href.indexOf('#') > 0) {
			window.scrollTo(0, 0);
			var target = window.location.href.substring(window.location.href.indexOf('#'), window.location.href.length);
			var scrollGoal = Math.floor($(target).offset().top + anchorScrollAniminationOffset);
			anchorScrollAnimation (scrollGoal);

	}

	//* OPEN EXTERNAL LINKS IN NEW TAB */ cookie consent behaviour might break this.

	$('a').each(function() {
		var a = new RegExp('/' + window.location.host + '/');
		var isMail = (this.href.indexOf('mailto') + this.href.indexOf('tel'))/2;
		//console.log(isMail)
		if(!a.test(this.href) && isMail == -1) {
			 $(this).click(function(event) {
					event.preventDefault();
					event.stopPropagation();
					window.open(this.href, '_blank');
			 });
		}
	});

}); //on ready
