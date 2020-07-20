//* DOCUMENT READY	*/




var documentready = function(){
	justloadedEnd=window.rTimeout(function(){
		 document.querySelector('.is-just-loaded').classList.remove('is-just-loaded');
	},1000);
};

if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
  documentready();
} else {
  document.addEventListener("DOMContentLoaded", documentready);
}
