/*
 * Copyright (c) 2017 marketify
 * Author: marketify
 * This file is made for CURRENT TEMPLATE
*/

jQuery(document).ready(function(){

	"use strict";
	
	// here all ready functions
	
	//var H = jQuery( window ).height();
	//var W = jQuery( window ).width();
	
	macro_tm_title_animation();
	macro_tm_home_slider_height();
	macro_tm_imgtosvg();
	macro_tm_hamburger();
	macro_tm_waypoint();
	macro_tm_flesslider();
	macro_tm_portfolio();
	macro_tm_magnific_popup();
	macro_tm_blog_animation();
	macro_tm_totop();
	macro_tm_totop_myhide();
	macro_tm_audiobox();
	macro_tm_audio_off();
	macro_tm_jarallax();
    macro_tm_nav_bg_scroll();
	macro_tm_contact_form();
	macro_tm_anchor();
	macro_tm_owl_carousel();
	macro_tm_miniboxes();
	macro_tm_sticky_sidebar();
	macro_tm_kenburn_slider();
	macro_tm_animate_text();
	
	jQuery(window).on('scroll',function(){
		//e.preventDefault();
		macro_tm_totop_myhide();
		macro_tm_nav_bg_scroll();
		
	});
	
	jQuery(window).on('resize',function(){
		macro_tm_home_slider_height();
		macro_tm_miniboxes();
	});
	
	jQuery(window).on('load', function(e) {
		e.preventDefault();
	});
	
});

// -----------------------------------------------------
// --------------------  FUNCTIONS  --------------------
// -----------------------------------------------------

// -----------------------------------------------------
// ---------------  HERO TITLE ANIMATION ---------------
// -----------------------------------------------------

function macro_tm_title_animation(){
	
	"use strict";
	
	var H			= jQuery(window).height();
	var title		= jQuery('.marketify_text_animation');
	var titleH		= title.outerHeight(); 
	var headerH		= jQuery('.macro_tm_header').outerHeight();
	var height		= H/2 - titleH/2 - headerH;
	
	jQuery(window).on('scroll',function(){
		var winscroll		= jQuery(window).scrollTop();
		title.css({opacity:1-(winscroll/height)});
		console.log(titleH);
	});
}

// -----------------------------------------------------
// ---------------  HOME SLIDER HEIGHT -----------------
// -----------------------------------------------------
function macro_tm_home_slider_height(){
	
	"use strict";
	
	var H			= jQuery(window).height();
	var element		= jQuery('.top_bg_content.home');
	
	element.css({height:H});
}
// -----------------------------------------------------
// ---------------    IMAGE TO SVG    ------------------
// -----------------------------------------------------
function macro_tm_imgtosvg(){
	
	"use strict";
	
	jQuery('img.svg').each(function(){
		
		var jQueryimg 		= jQuery(this);
		var imgClass		= jQueryimg.attr('class');
		var imgURL			= jQueryimg.attr('src');

		jQuery.get(imgURL, function(data) {
			// Get the SVG tag, ignore the rest
			var jQuerysvg = jQuery(data).find('svg');

			// Add replaced image's classes to the new SVG
			if(typeof imgClass !== 'undefined') {
				jQuerysvg = jQuerysvg.attr('class', imgClass+' replaced-svg');
			}

			// Remove any invalid XML tags as per http://validator.w3.org
			jQuerysvg = jQuerysvg.removeAttr('xmlns:a');

			// Replace image with new SVG
			jQueryimg.replaceWith(jQuerysvg);

		}, 'xml');

	});
}

// -----------------------------------------------------
// ---------------  HAMBURGER  -------------------------
// -----------------------------------------------------
function macro_tm_hamburger(){
	
	"use strict";
	
	var hamburger 		= jQuery('.hamburger');
	var mobileMenu		= jQuery('.macro_tm_mobile_menu_wrap');
	
	hamburger.on('click',function(){
		var element 	= jQuery(this);
		
		if(element.hasClass('is-active')){
			element.removeClass('is-active');
			mobileMenu.slideUp();
		}else{
			element.addClass('is-active');
			mobileMenu.slideDown();
		}
		return false;
	});
}
// -----------------------------------------------------
// ----------------     WAYPOINT     -------------------
// -----------------------------------------------------
function macro_tm_waypoint(){
	
	"use strict";
	
	//var shortB			= jQuery('.macro_tm_section');
	//var child			= shortB.find('li');
	
	var listItem 		= jQuery('ul.macro_list.another_animation');
	
	listItem.each(function(){

		var Item		= jQuery(this);
		var ItemLi		= Item.find('li.list_li');
		
		ItemLi.each(function(index){
			var www		= jQuery(this);
			www.waypoint({
			handler: function(){
				setTimeout(function(){
					www.addClass('animated');
					www.addClass('slideInUp');
					www.removeClass('hideforanimation');
				},index*100);
			},
			offset: '70%'
		});
		});
	});
	
	var about			= jQuery('.hideanimation .macro_tm_about_me_wrap .my_image');
	var aboutDef		= jQuery('.hideanimation .macro_tm_about_me_wrap .image_definition');
	
		about.waypoint({
			handler: function(){
				setTimeout(function(){
					about.addClass('animated');
					about.addClass('fadeInLeft');
					about.removeClass('hideforanimation');
				},100);
				
			},
			offset: '70%'
		});
		
		aboutDef.waypoint({
			handler: function(){
				setTimeout(function(){
					aboutDef.addClass('animated');
					aboutDef.addClass('fadeInRight');
					aboutDef.removeClass('hideforanimation');
				},100);
				
			},
			offset: '70%'
		});
}
// -----------------------------------------------------
// -------------------    COUNTER    -------------------
// -----------------------------------------------------
	jQuery('.macro_tm_counter').each(function() {
		
		"use strict";
		
        var el 			= jQuery(this);
		el.waypoint({
			handler: function(){
				
				if(!el.hasClass('stop')){
					el.addClass('stop').countTo({
						refreshInterval: 50,
						formatter: function (value, options) {
							return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
						},	
					});
				}
			},offset:'70%'	
		});
    });

// -----------------------------------------------------
// -----------------    PROGRESS BAR    ----------------
// -----------------------------------------------------
function tdProgress(container){

	"use strict";

	container.find('.macro_tm_progress').each(function(i) {
		var progress 		= jQuery(this);
		var pValue 			= parseInt(progress.data('value'), 10);
		var pColor			= progress.data('color');
		var pBarWrap 		= progress.find('.macro_tm_bar_wrap');
		var pBar 			= progress.find('.macro_tm_bar');
		pBar.css({width:pValue+'%', backgroundColor:pColor});
		setTimeout(function(){pBarWrap.addClass('open');},(i*500));
	});
}
jQuery('.macro_tm_progress_wrap').each(function() {
	"use strict";
	var pWrap 			= jQuery(this);
	pWrap.waypoint({handler: function(){tdProgress(pWrap);},offset:'90%'});	
});

// -----------------------------------------------------
// --------------     MAIN FLEXSLIDER     --------------
// -----------------------------------------------------
function macro_tm_flesslider(){
	
	"use strict";
	
	var flexslider 			= jQuery('.macro_tm_testimonials_wrap .flexslider');
	
	flexslider.flexslider({
		animation: "fade",
		controlNav: false,
		directionNav: true,
		slideshowSpeed: 5000,
		pauseOnAction: true,
		after: function(slider){
			if(!slider.playing){
				slider.play();
			}
		}
	});
	
	var flexslider2 			= jQuery('.macro_tm_flexslider_wrap .flexslider');
	
	flexslider2.flexslider({
		animation: "fade",
		controlNav: false,
		directionNav: true,
		slideshowSpeed: 7000,
		pauseOnAction: true,
		after: function(slider){
			if(!slider.playing){
				slider.play();
			}
		}
	});
	
	var  aa = jQuery('.eloisa_tm_mainslider .flex-direction-nav li a');
	aa.html('<span class="line"></span>');
}
// -----------------------------------------------------
// -----------------    PORTFOLIO    ---------------
// -------------------------------------------------

// filterable 
function macro_tm_portfolio(){

	"use strict";

	if(jQuery().isotope) {

		// Needed variables
		var list 		 = jQuery('.macro_tm_portfolio_list');
		var filter		 = jQuery('.macro_tm_portfolio_filter');

		if(filter.length){
			// Isotope Filter 
			filter.find('a').on('click', function(){
				var selector = jQuery(this).attr('data-filter');
				list.isotope({ 
					filter				: selector,
					animationOptions	: {
						duration			: 750,
						easing				: 'linear',
						queue				: false
					}
				});
				return false;
			});	

			// Change active element class
			filter.find('a').on('click', function() {
				filter.find('a').removeClass('current');
				jQuery(this).addClass('current');
				return false;
			});	
		}
	}
}
	
// -----------------------------------------------------
// --------------    MAGNIFIC POPUP    -----------------
// -----------------------------------------------------
function macro_tm_magnific_popup(){
	
	"use strict";
	
	jQuery('.open-popup-link').magnificPopup({
		type:'inline',
		midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
	});
	
	jQuery('.gallery').each(function() { // the containers for all your galleries
		jQuery(this).magnificPopup({
			delegate: 'a', // the selector for gallery item
			type: 'image',
			gallery: {
			  enabled:true
			}
		});
	});
	jQuery('.gallery_zoom').each(function() { // the containers for all your galleries
		jQuery(this).magnificPopup({
			delegate: 'a.zoom', // the selector for gallery item
			type: 'image',
			gallery: {
			  enabled:true
			},
			removalDelay: 300,
			mainClass: 'mfp-fade'
		});
		
	});
	jQuery('.popup-youtube').each(function() { // the containers for all your galleries
		jQuery(this).magnificPopup({
			type: 'iframe',
		});
	});
}
// -----------------------------------------------------
// --------------    BLOG ANIMATION    -----------------
// -----------------------------------------------------
function macro_tm_blog_animation(){
	"use strict";
	
	var element			= jQuery('.macro_tm_list_wrap.section_blog .list_li');
	
	element.each(function(){
		var list		= jQuery(this);
		var effect		= list.find('.description_blog');
		
		list.on('mouseenter',function(){
			effect.slideDown();
		}).on('mouseleave',function(){
			effect.slideUp();
		});
		
	});
}

// -----------------------------------------------------
// --------------------    TOTOP    --------------------
// -----------------------------------------------------
function macro_tm_totop(){
	
	"use strict";
	
	jQuery(".macro_tm_totop").on('click', function(e) {
		e.preventDefault();		
		jQuery("html, body").animate({ scrollTop: 0 }, 'slow');
		return false;
	});
}
function macro_tm_totop_myhide(){
	
	"use strict";
	
	var toTop		=jQuery(".macro_tm_totop");
	if(toTop.length){
		var topOffSet 	=toTop.offset().top;
		
		if(topOffSet > 1000){
			toTop.addClass('opened');	
		}else{
			toTop.removeClass('opened');
		}
	}
}

// -----------------------------------------------------
// -----------------    AUDIOBOX    --------------------
// -----------------------------------------------------
function macro_tm_audiobox(){
	
	 "use strict";

	 var curPlaying; 
	 var speaker			= jQuery('.macro_tm_header .social_icons .audio'); 
	 
	 speaker.on('click',function(e) {

		e.preventDefault();
		 if(!speaker.hasClass('paused')){
			 speaker.addClass('paused');
		 }else{
			 speaker.removeClass('paused');
		 }
		var song 		= jQuery('audio')[0];

		if(song.paused){
			song.play();
			if(curPlaying) {jQuery("audio", "#"+curPlaying)[0].pause();}
		} 
		else {song.pause();}
		curPlaying 		= jQuery(this).parent()[0].id;
		 
	});
 }
function macro_tm_audio_off(){
	
	"use strict";
	
	var element			= jQuery('.macro_tm_wrapper_all');
	var dataAudio		= element.data('audio');
	var audioBox		= jQuery('.macro_tm_audio_wrap');
	
	if(dataAudio !== 'off'){
		audioBox.find('audio').attr('autoplay','');
	}
	
}

// -----------------------------------------------------
// --------------------    JARALLAX    -----------------
// -----------------------------------------------------
function macro_tm_jarallax(){
	
	"use strict";
	
	jQuery('.jarallax').each(function(){
		var element			= jQuery(this);
		var	customSpeed		= element.data('speed');
		
		if(customSpeed !== "undefined" && customSpeed !== ""){
			customSpeed = customSpeed;
		}else{
			customSpeed 	= 0.5;
		}
		
		element.jarallax({
			speed: customSpeed
		});
	});
}

// -----------------------------------------------------
// ------------    NAV BACKGROUND  SCROLL    -----------
// -----------------------------------------------------
/*function macro_tm_nav_bg_scroll(){
	
	"use strict";
	
	var header 			= jQuery('.macro_tm_header');
	var windowScroll	= jQuery(window).scrollTop();
	var W				=jQuery(window).width();
	
	 if(W>1040){
		 jQuery(window).scroll(function(){
            if(windowScroll >= '100'){
                header.addClass('scroll');
            }
            else{
                header.removeClass('scroll');  
            }
        });
	 }
}*/

// -----------------------------------------------------
// ----------------    CONTACT FORM    -----------------
// -----------------------------------------------------
function macro_tm_contact_form(){
	
	"use strict";
	
	jQuery(".contact_form #send_message").on('click', function(){
		
		var name 		= jQuery(".contact_form #name").val();
		var email 		= jQuery(".contact_form #email").val();
		var message 	= jQuery(".contact_form #message").val();
		var subject 	= jQuery(".contact_form #subject").val();
		var success     = jQuery(".contact_form .returnmessage").data('success');
	
		jQuery(".contact_form .returnmessage").empty(); //To empty previous error/success message.
		//checking for blank fields	
		if(name===''||email===''||message===''){
			
			jQuery('div.empty_notice').slideDown(500).delay(2000).slideUp(500);
		}
		else{
			// Returns successful data submission message when the entered information is stored in database.
			jQuery.post("modal/contact.php",{ ajax_name: name, ajax_email: email, ajax_message:message, ajax_subject: subject}, function(data) {
				
				jQuery(".contact_form .returnmessage").append(data);//Append returned message to message paragraph
				
				
				if(jQuery(".contact_form .returnmessage span.contact_error").length){
					jQuery(".contact_form .returnmessage").slideDown(500).delay(2000).slideUp(500);		
				}else{
					jQuery(".contact_form .returnmessage").append("<span class='contact_success'>"+ success +"</span>");
					jQuery(".contact_form .returnmessage").slideDown(500).delay(4000).slideUp(500);
				}
				
				if(data===""){
					jQuery("#contact_form")[0].reset();//To reset form fields on success
				}
				
			});
		}
		return false; 
	});
}

function macro_tm_anchor(){
	
	"use strict";
	
	jQuery('.anchor_nav').onePageNav();
	
	var scrollOffset = 70;
	
	jQuery(".anchor > a").on('click', function(evn){
		evn.preventDefault();
		jQuery('html,body').scrollTo(this.hash, this.hash, {
			gap: { y: -scrollOffset },
			animation:{
				duration: 1500,
				easing: "easeInOutExpo"
			}
		});
		return false;	
	});
	
}

// -----------------------------------------------------
// --------------------    OWL CAROUSEL    -------------
// -----------------------------------------------------

function macro_tm_owl_carousel(){
	
	"use strict";
	
	var carusel			= jQuery('.macro_tm_parners_wrap .owl-carousel');
  	carusel.owlCarousel({
			loop:true,
			items: 4,
			lazyLoad: true,
			margin: 0,
			autoplay: true,
			autoplayTimeout: 5050,
			smartSpeed: 5000,
			dots: false,
			nav: false,
			navSpeed: true,
			responsive:{
			0:{items:1},
			480:{items:2},
			768:{items:3},
			1040:{items:4},
			1200:{items:4},
			1600:{items:4},
			}
	});
	
	var	prev		= jQuery('.carousel_nav a.prev');
	var	next		= jQuery('.carousel_nav a.next');
	
	prev.on('click',function(){
		carusel.trigger('prev.owl.carousel');
		return false;
	});
	next.on('click',function(){
		carusel.trigger('next.owl.carousel');
		return false;
	});
	
	var carusel2			= jQuery('.macro_tm_single_section_wrap .owl-carousel');
  	carusel2.owlCarousel({
		loop:true,
		margin:0,
		autoplay:2000,
		autoWidth: false,
		nav: false,
		items:1
	});
	
	var carusel3			= jQuery('.macro_tm_team_member_wrap .owl-carousel');
  	carusel3.owlCarousel({
		loop:true,
			items: 3,
			lazyLoad: true,
			margin: 20,
			autoplay: true,
			autoplayTimeout: 7000,
			smartSpeed: 5000,
			dots: false,
			nav: false,
			navSpeed: true,
			responsive:{
			0:{items:1},
			480:{items:2},
			768:{items:3},
			1040:{items:3},
			1200:{items:3},
			1600:{items:3},
			}
	});
	
}
// -----------------------------------------------------
// --------------------    MINI BOX   ------------------
// -----------------------------------------------------
function macro_tm_miniboxes(){
  "use strict";
	 
  var el 		= jQuery('.macro_tm_miniboxes');
	 
  if(el.length){
   el.each(function(index, element) {
         
    var child	= jQuery(element).children('.macro_tm_minibox');
    
    child.css({height:'auto'});
    // Get an array of all element heights
    
    var W 		= jQuery(window).width();
    if(W > 460){
     var elementHeights = child.map(function() {return jQuery(this).outerHeight();}).get();
    
     // Math.max takes a variable number of arguments
     // `apply` is equivalent to passing each height as an argument
     var maxHeight 		= Math.max.apply(null, elementHeights);
     
     // Set each height to the max height
     child.css({height:maxHeight+'px'}); 
    }
   });  
  }
 }

// -----------------------------------------------------
// ---------------   STICKY SIDEBAR    -----------------
// -----------------------------------------------------
function macro_tm_sticky_sidebar(){

	"use strict";
	
	jQuery('.sticky_sidebar').theiaStickySidebar({
		containerSelector: '', // The sidebar's container element. If not specified, it defaults to the sidebar's parent.
		additionalMarginTop: 150,
		additionalMarginBottom: 0,
		updateSidebarHeight: true, // Updates the sidebar's height. Use this if the background isn't showing properly, for example.
		minWidth: 1040, // The sidebar returns to normal if its width is below this value. 
	});
	
}

// -------------------------------------------------
// -------------  SLIDER KENBURN  ------------------
// -------------------------------------------------

function macro_tm_kenburn_slider(){
	
	"use strict";
	
		jQuery(function() {
			jQuery('.macro_tm_top_bg_wrap .overlay_slider').vegas({
			timer:false,	
			animation: [ 'kenburnsUp',  'kenburnsLeft', 'kenburnsRight'],
			delay:6000,

			slides: [
				{ src: 'img/testimonial/1.jpg' },
				{ src: 'img/testimonial/2.jpg' },
				{ src: 'img/testimonial/4.jpg' },
			]

		});
	});
}


// -------------------------------------------------
// -------------   ANIMATE TEXT  -------------------
// -------------------------------------------------

function macro_tm_animate_text(){
	
	"use strict";
	
	var animateSpan			= jQuery('.macro_tm_animation_text_word');
	
		animateSpan.typed({
			strings: ["Creative", "Awesome", "Professional"],
			loop: true,
			startDelay: 1e3,
			backDelay: 2e3
		});
}