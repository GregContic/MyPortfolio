/** 
 * ===================================================================
 * main js
 *
 * ------------------------------------------------------------------- 
 */ 

(function($) {

	"use strict";

	/*---------------------------------------------------- */
	/* Preloader
	------------------------------------------------------ */ 
   $(window).load(function() {

      // will first fade out the loading animation 
    	$("#loader").fadeOut("slow", function(){

        // will fade out the whole DIV that covers the website.
        $("#preloader").delay(300).fadeOut("slow");

      });       

  	})


  	/*---------------------------------------------------- */
  	/* FitText Settings
  	------------------------------------------------------ */
  	setTimeout(function() {

   	$('#intro h1').fitText(1, { minFontSize: '42px', maxFontSize: '84px' });

  	}, 100);


	/*---------------------------------------------------- */
	/* FitVids
	------------------------------------------------------ */ 
  	$(".fluid-video-wrapper").fitVids();


	/*---------------------------------------------------- */
	/* Owl Carousel
	------------------------------------------------------ */ 
	$("#owl-slider").owlCarousel({
        navigation: false,
        pagination: true,
        itemsCustom : [
	        [0, 1],
	        [700, 2],
	        [960, 3]
	     ],
        navigationText: false
    });


	/*----------------------------------------------------- */
	/* Alert Boxes
  	------------------------------------------------------- */
	$('.alert-box').on('click', '.close', function() {
	  $(this).parent().fadeOut(500);
	});	


	/*----------------------------------------------------- */
	/* Stat Counter
  	------------------------------------------------------- */
   var statSection = $("#stats"),
       stats = $(".stat-count");

   statSection.waypoint({

   	handler: function(direction) {

      	if (direction === "down") {       		

			   stats.each(function () {
				   var $this = $(this);

				   $({ Counter: 0 }).animate({ Counter: $this.text() }, {
				   	duration: 4000,
				   	easing: 'swing',
				   	step: function (curValue) {
				      	$this.text(Math.ceil(curValue));
				    	}
				  	});
				});

       	} 

       	// trigger once only
       	this.destroy();      	

		},
			
		offset: "90%"
	
	});	


	/*---------------------------------------------------- */
	/*	Masonry
	------------------------------------------------------ */
	var containerProjects = $('#folio-wrapper');

	containerProjects.imagesLoaded( function() {

		containerProjects.masonry( {		  
		  	itemSelector: '.folio-item',
		  	resize: true 
		});

	});


	/*----------------------------------------------------*/
	/*	Modal Popup
	------------------------------------------------------*/
	$('.item-wrap a, a.overlay').magnificPopup({

      type:'inline',
      fixedContentPos: false,
      removalDelay: 300,
      showCloseBtn: false,
      mainClass: 'mfp-fade'

   });

   $(document).on('click', '.popup-modal-dismiss', function (e) {
   	e.preventDefault();
   	$.magnificPopup.close();
   });

	
	/*-----------------------------------------------------*/
  	/* Navigation Menu
   ------------------------------------------------------ */  
   var toggleButton = $('.menu-toggle'),
	   nav = $('#main-nav-wrap');

   // toggle button
   toggleButton.on('click', function(e) {

		e.preventDefault();
		var isClicked = toggleButton.toggleClass('is-clicked').hasClass('is-clicked');
		// slide the existing .main-navigation if present
		nav.toggleClass('open');
		nav.find('.main-navigation').stop(true, true).slideToggle();
		// accessibility
		toggleButton.attr('aria-expanded', isClicked ? 'true' : 'false');

	});

   // nav items
   	nav.find('li a').on("click", function() {    

	// update the toggle button 		
	toggleButton.removeClass('is-clicked').attr('aria-expanded', 'false'); 
	// hide the navigation panel
	nav.removeClass('open').find('.main-navigation').fadeOut();    		 
    	 
   	});


   /*---------------------------------------------------- */
  	/* Highlight the current section in the navigation bar
  	------------------------------------------------------ */
	var sections = $("section"),
	navigation_links = $("#main-nav-wrap li a");	

	sections.waypoint( {

       handler: function(direction) {

		   var active_section;

			active_section = $('section#' + this.element.id);

			if (direction === "up") active_section = active_section.prev();

			var active_link = $('#main-nav-wrap a[href="#' + active_section.attr("id") + '"]');			

         navigation_links.parent().removeClass("current");
			active_link.parent().addClass("current");

		}, 

		offset: '25%'
	});


	/*---------------------------------------------------- */
  	/* Smooth Scrolling
  	------------------------------------------------------ */
  	$('.smoothscroll').on('click', function (e) {
	 	
	 	e.preventDefault();

   	var target = this.hash,
    	$target = $(target);

    	$('html, body').stop().animate({
       	'scrollTop': $target.offset().top
      }, 800, 'swing', function () {
      	window.location.hash = target;
      });

  	});  
  

   /*---------------------------------------------------- */
	/*  Placeholder Plugin Settings
	------------------------------------------------------ */ 
	$('input, textarea, select').placeholder()  


  	/*---------------------------------------------------- */
	/*	contact form
	------------------------------------------------------ */

	/* local validation */
	$('#contactForm').validate({

		/* submit via ajax */
		submitHandler: function(form) {

			var sLoader = $('#submit-loader');

			$.ajax({      	

		      type: "POST",
		      url: "inc/sendEmail.php",
		      data: $(form).serialize(),
		      beforeSend: function() { 

		      	sLoader.fadeIn(); 

		      },
		      success: function(msg) {

	            // Message was sent
	            if (msg == 'OK') {
	            	sLoader.fadeOut(); 
	               $('#message-warning').hide();
	               $('#contactForm').fadeOut();
	               $('#message-success').fadeIn();   
	            }
	            // There was an error
	            else {
	            	sLoader.fadeOut(); 
	               $('#message-warning').html(msg);
		            $('#message-warning').fadeIn();
	            }

		      },
		      error: function() {

		      	sLoader.fadeOut(); 
		      	$('#message-warning').html("Something went wrong. Please try again.");
		         $('#message-warning').fadeIn();

		      }

	      });     		
  		}

	});


 	/*----------------------------------------------------- */
  	/* Back to top
   ------------------------------------------------------- */ 
	var pxShow = 300; // height on which the button will show
	var fadeInTime = 400; // how slow/fast you want the button to show
	var fadeOutTime = 400; // how slow/fast you want the button to hide
	var scrollSpeed = 300; // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'

   // Show or hide the sticky footer button
	jQuery(window).scroll(function() {

		if (!( $("#header-search").hasClass('is-visible'))) {

			if (jQuery(window).scrollTop() >= pxShow) {
				jQuery("#go-top").fadeIn(fadeInTime);
			} else {
				jQuery("#go-top").fadeOut(fadeOutTime);
			}

		}		

	});		

	// Header shrink on scroll
	var header = $('.site-header');
	var shrinkPx = 60;
	jQuery(window).on('scroll', function() {
		if (jQuery(window).scrollTop() > shrinkPx) {
			header.addClass('shrink');
		} else {
			header.removeClass('shrink');
		}
	});


	/*---------------------------------------------------- */
	/* Scroll reveal (IntersectionObserver)
	/* Add class `animate` to elements you want animated on scroll
	   optional attributes: data-anim-type="fade-up|fade-left|fade-right|zoom-in"
	                        data-anim-delay="0.12s" (CSS-compatible)
	------------------------------------------------------ */
	(function(){
		if(!('IntersectionObserver' in window)) return; // fallback: elements will remain visible

		var io = new IntersectionObserver(function(entries){
			entries.forEach(function(entry){
				if(entry.isIntersecting){
					var el = entry.target;
					var delay = el.getAttribute('data-anim-delay');
					if(delay) el.style.transitionDelay = delay;
					el.classList.add('is-visible');
					io.unobserve(el);
				}
			});
		},{
			root: null,
			rootMargin: '0px 0px -8% 0px',
			threshold: 0.08
		});

		// auto-bind common elements
		var items = document.querySelectorAll('section, .row, .item-wrap, .popup-modal, header, footer, .intro-content');
		items.forEach(function(node){
			// avoid double-wrapping: if already animated, keep type
			if(!node.classList.contains('animate')) node.classList.add('animate', 'animate--fade-up');
			io.observe(node);
		});

	})();

})(jQuery);

/* Skills carousel initializer (runs after DOM ready handlers above) */
(function(){
	// guard
	if(typeof document === 'undefined') return;

	var container = document.querySelector('#skills-tools .row.about-content');
	if(!container) return;

	// create controls
	var prev = document.createElement('button');
	prev.className = 'skills-carousel-btn skills-prev';
	prev.setAttribute('aria-label','Previous');
	prev.innerHTML = '&#9664;';

	var next = document.createElement('button');
	next.className = 'skills-carousel-btn skills-next';
	next.setAttribute('aria-label','Next');
	next.innerHTML = '&#9654;';

	// attach to parent
	var parent = document.getElementById('skills-tools');
	if(parent) {
		parent.appendChild(prev);
		parent.appendChild(next);
	}

	// helper to scroll by one card
	function scrollByCard(direction){
		var card = container.querySelector('.skill-card');
		if(!card) return;
		var gap = parseInt(getComputedStyle(container).gap) || 24;
		var scrollAmount = card.getBoundingClientRect().width + gap;
		container.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
	}

	prev.addEventListener('click', function(){ scrollByCard(-1); });
	next.addEventListener('click', function(){ scrollByCard(1); });

	// Disable native pointer/wheel/keyboard navigation so only buttons work
	// hide native scrollbar and prevent pointer-driven scrolling
	container.style.overflowX = 'hidden';

})();