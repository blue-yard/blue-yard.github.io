
if (document.getElementById('page-header')) {
	var swiper = {

	    touchStartX: 0,
	    touchEndX: 0,
	    minSwipePixels: 30,
	    detectionZone: undefined,
	    swiperCallback: function() {},

	    init: function (detectionZone, callback) {
	        swiper.swiperCallback = callback
	        detectionZone.addEventListener('touchstart', function (event) {
	            swiper.touchStartX = event.changedTouches[0].screenX;
	        }, false);
	        detectionZone.addEventListener('touchend', function (event) {
	            swiper.touchEndX = event.changedTouches[0].screenX;
	            swiper.handleSwipeGesture();
	        }, false);
	    },

	    handleSwipeGesture: function () {
	        var direction,
	            moved
	        if (swiper.touchEndX <= swiper.touchStartX) {
	            moved = swiper.touchStartX - swiper.touchEndX
	            direction = "left"
	        }
	        if (swiper.touchEndX >= swiper.touchStartX) {
	            moved = swiper.touchEndX - swiper.touchStartX
	            direction = "right"
	        }
	        if (moved > swiper.minSwipePixels && direction !== "undefined") {
	            swiper.swipe(direction, moved)
	        }
	    },

	    swipe: function (direction, movedPixels) {
	        var ret = {}
	        ret.direction = direction
	        ret.movedPixels = movedPixels
	        swiper.swiperCallback(ret)
	    }
	}


	var gestureZone = document.getElementById('page-header');
	swiper.init(gestureZone, function(e) {
	    if (e.direction == 'left') {
				quandamove(1,'swipe:left');
	    } else if (e.direction == 'right') {
				quandamove(-1,'swipe:right');
	    }
	})

}
//var animationHue = 227;
//var stepHue = 80;
//
//function assignHue() {
//	animationHue = animationHue + stepHue;
//	document.body.style.setProperty('--cover-h', animationHue);//set
//}



const qandaSlideDuration = 10000;


function playvideo(mediaElement) {
	if(mediaElement) {
		if(mediaElement.duration > 0){ //wont play if setting playbackrate on iOS if duration is NaN
			mediaElement.playbackRate = mediaElement.duration / ((qandaSlideDuration + 1000) / 1000); // +1s for the blending
			mediaElement.currentTime = 0; //AbortError: The operation was aborted. is expected in Firefox<70 . https://bugzilla.mozilla.org/show_bug.cgi?id=1507193
		}
		//console.log('video:', mediaElement);
		//console.log('duration:', mediaElement.duration);
		//console.log('playbackrate:', mediaElement.playbackRate);
		mediaElement.play();
	}
}


function pausevideo(mediaElement) {
	if(mediaElement) {
		mediaElement.pause();
	}
}




var matches = function(el, selector) {
  return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
};



function quandamove(distance, debug='') {
		//assignHue()

		let recentvideo = document.querySelector('.movie .current');
	 	let pauserecentvideo=window.rTimeout(function(){pausevideo(recentvideo);
		},1000);


		var parents = document.getElementsByClassName('qanda-parent');
		for (parent of parents) {
			for (i=0; i<Math.abs(distance);i++) {
				var recent = parent.querySelector('.current');
				console.log(parent.lastChild);
				recent.classList.remove('current');
				if(distance > 0) {
					if ( recent.nextElementSibling )  {
						console.log('next');
						recent.nextElementSibling.classList.add('current');
					} else {
						console.log('first');
						parent.firstChild.classList.add('current');
					}
				} else {
					if ( recent.previousElementSibling )  {
					//	console.log('previous');
						recent.previousElementSibling.classList.add('current');
					} else {
						//console.log('last');
						parent.lastChild.classList.add('current');
					}
				}
			}
		}
		quandaautonextinit('move: '+ distance +' '+ debug);
};




function watchfocus() { // to stop animation when tab or browser is not in focus

	// browser has focus?
	window.addEventListener("blur", function(event){
	  quandaautonextclear('blur');
		pausevideo(document.querySelector('.movie .current'));
	}, false);

	window.addEventListener("focus", function(event){
		quandaautonextinit('focus');
	}, false);


	// https://caniuse.com/#feat=mdn-api_document_onvisibilitychange
	document.onvisibilitychange = function() {
	  if (document.hidden) {
	 		quandaautonextclear('hidden');
	 		pausevideo(document.querySelector('.movie .current'));
	  } else {
			quandaautonextinit('visible');
	  }

	};

// tab has focus?
// Set the name of the hidden property and the change event for visibility

//  var hidden, visibilityChange;
//  if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
//    hidden = "hidden";
//    visibilityChange = "visibilitychange";
//  } else if (typeof document.msHidden !== "undefined") {
//    hidden = "msHidden";
//    visibilityChange = "msvisibilitychange";
//  } else if (typeof document.webkitHidden !== "undefined") {
//    hidden = "webkitHidden";
//    visibilityChange = "webkitvisibilitychange";
//  }
//
//  function handleVisibilityChange() {
//    if (document[hidden]) {
//   		quandaautonextclear('hidden');
//  		$('video').trigger('pause');
//    } else {
//  		quandaautonextinit('visible');
//    }
//  }
//
//
//  // Warn if the browser doesn't support addEventListener or the Page Visibility API
//  if (typeof document.addEventListener === "undefined" || typeof document[hidden] === "undefined") {
//    //console.log("Visibility API is not supported on this Browser.");
//    alert("Visibility API is not supported on this Browser.");
//  } else {
//    // Handle page visibility change
//    document.addEventListener(visibilityChange, handleVisibilityChange, false);
//  }
//
//
};

watchfocus();



var quandaautonext=window.rTimeout(function(){
	//console.log('declaretimeout');
},0);


window.onload = function () {
		quandaautonextinit('onload');
}


function quandaautonextclear(debug='') {
		quandaautonext.clear();
	//	console.log('cleartimeout',debug)
	}


function quandaautonextinit(debug='') {
	 quandaautonextclear('init');
	playvideo(document.querySelector('.movie .current'));
	quandaautonext=window.rTimeout(function(){quandamove(1, 'automove');},qandaSlideDuration);
	//console.log('inittimeout', debug)
}



//function qandaRandomStart(){
//	$('#qanda__list .current').removeClass('current');
//	let arrEligible = new Array;
//	let probTotal = 0;
//	$('#qanda__list').children().each(function(){
//			probTotal += $(this).data('probability');
//	});
//
//	while(!arrEligible.length) {
//		$('#qanda__list').children().each(function(){
//				prob = $(this).data('probability') / probTotal;
//				r = Math.random();
//				if(prob > r) {
//					arrEligible.push($(this));
//				}
//		});
//	};
//	$(arrEligible[Math.floor(Math.random(arrEligible.length))]).addClass('current');
//}
//



document.addEventListener('keydown', logKey);

function logKey(e) {
	//console.log(e.code, e.keyCode);
		switch(e.keyCode) {
				case 37: // left
				e.preventDefault(); // prevent the default action (scroll / move caret)
				quandamove(-1,'leftkey')
				break;

	//			case 38: // up
	//			break;

				case 39: // right
				e.preventDefault(); // prevent the default action (scroll / move caret)
				quandamove(1,'rightkey');
				break;

	 //		 case 40: // down
	 //		 break;

				default: return; // exit this handler for other keys
		}
}


//* NAVCLICK */

var navclickelements = document.getElementsByClassName('qanda__nav-dot-item');

for ( var i = 0; i < navclickelements.length; i++ ) (function(i){
  navclickelements[i].onclick = function(el) {
		let currentindex = Array.from(navclickelements).indexOf(document.querySelector('#qanda__nav .current'));
    let distance = i - currentindex;
		if (distance != 0) {
  	quandamove(distance,'navclick');
  	}
  }
})(i);


//window.onresize = function() { //fixing mobile viewport height
//    document.body.height = window.innerHeight;
//}
//
//window.onresize(); // called to initially set the height.
//

//* DOCUMENT READY	*/
//jQuery(document).ready(function($) {
	//if($('#qanda__list').length) {
	//	qandaRandomStart();
	//	};
//}); //on ready


