// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

/* RafTimeout */

window.rTimeout=function(callback,delay){
 var dateNow=Date.now,
     requestAnimation=window.requestAnimationFrame,
     start=dateNow(),
     stop,
     timeoutFunc=function(){
      dateNow()-start<delay?stop||requestAnimation(timeoutFunc):callback()
     };
 requestAnimation(timeoutFunc);
 return{
  clear:function(){stop=1}
 }
}


/* RafInterval */

window.rInterval=function(callback,delay){
 var dateNow=Date.now,
     requestAnimation=window.requestAnimationFrame,
     start=dateNow(),
     stop,
     intervalFunc=function(){
      dateNow()-start<delay||(start+=delay,callback());
      stop||requestAnimation(intervalFunc)
     }
 requestAnimation(intervalFunc);
 return{
  clear:function(){stop=1}
 }
}

function clearRequestInterval(foo) {
		foo.clear();
}
function clearRequestTimeout(foo) {
		foo.clear();
}

/* USAGE


var interval1,timeout1;
window.onload=function(){
 interval1=window.rInterval(function(){console.log('interval1')},2000);
 timeout1=window.rTimeout(function(){console.log('timeout1')},5000);
}

/* to clear
interval1.clear();
timeout1.clear();
*/