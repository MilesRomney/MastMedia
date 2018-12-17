// -----------------------------------------------------
// ------------    NAV BACKGROUND  SCROLL    -----------
// -----------------------------------------------------
function macro_tm_nav_bg_scroll(){
	
	"use strict";
	
    macro_tm_nav_bg_scroll_adjust_class();

    jQuery(window).scroll(function(){
        macro_tm_nav_bg_scroll_adjust_class();
    });
}

function macro_tm_nav_bg_scroll_adjust_class(){

    var els 			= jQuery('.report_scroll_state');
	var windowScroll	= jQuery(window).scrollTop();
    var videos          = jQuery('video.pause_on_scroll');

    if(windowScroll >= '100'){
        els.addClass('scroll');
        jQuery.each(videos, function(i, v){ v.pause(); });
    }
    else{
        els.removeClass('scroll');  
        jQuery.each(videos, function(i, v){ v.play(); });
    }
}