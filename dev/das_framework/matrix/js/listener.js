////+ RESIZE LISTENER */
//(function($,sr){
//
//  // debouncing function from John Hann
//  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
//  var debounce = function (func, threshold, execAsap) {
//      var timeout;
//
//      return function debounced () {
//          var obj = this, args = arguments;
//          function delayed () {
//              if (!execAsap)
//                  func.apply(obj, args);
//              timeout = null;
//          };
//
//          if (timeout)
//              clearRequestTimeout(timeout);
//          else if (execAsap)
//              func.apply(obj, args);
//
//          timeout = rTimeout(delayed, threshold || 200);
//      };
//  }
//  // smartresize
//  jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };
//
//})(jQuery,'resizeStopped');
//
//
////+ SCROLL LISTENER */
//(function($,sr){
//
//  // debouncing function from John Hann
//  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
//  var debounce = function (func, threshold, execAsap) {
//      var timeout;
//
//      return function debounced () {
//          var obj = this, args = arguments;
//          function delayed () {
//              if (!execAsap)
//                  func.apply(obj, args);
//              timeout = null;
//          };
//
//          if (timeout)
//              clearRequestTimeout(timeout);
//          else if (execAsap)
//              func.apply(obj, args);
//
//          timeout = rTimeout(delayed, threshold || 200);
//      };
//  }
//  // smartresize
//  jQuery.fn[sr] = function(fn){  return fn ? this.bind('scroll', debounce(fn)) : this.trigger(sr); };
//
//})(jQuery,'scrollStopped');