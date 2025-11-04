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
	var containerCerts = $('#cert-wrapper');

	containerProjects.imagesLoaded( function() {

		containerProjects.masonry( {		  
		  	itemSelector: '.folio-item',
		  	resize: true 
		});

	});

	containerCerts.imagesLoaded( function() {

		containerCerts.masonry( {		  
		  	itemSelector: '.cert-item',
		  	resize: true 
		});

	});


	/*----------------------------------------------------*/
	/*	Modal Popup
	------------------------------------------------------*/
	$('.item-wrap a, .cert-wrap a, a.overlay').magnificPopup({

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
				var el = entry.target;
				var delay = el.getAttribute('data-anim-delay');
				if(entry.isIntersecting){
					// when entering viewport, apply delay (if any) and make visible
					if(delay) el.style.transitionDelay = delay;
					el.classList.add('is-visible');
				} else {
					// remove visibility when element leaves so animation can replay
					el.classList.remove('is-visible');
					// clear inline delay so re-entry picks up any new delay attribute
					if(delay) el.style.transitionDelay = '';
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
	if(typeof document === 'undefined') return;

	var container = document.querySelector('#skills-tools .row.about-content');
	if(!container) return;

	var cards = Array.prototype.slice.call(container.querySelectorAll('.skill-card'));
	if(!cards.length) return;

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

	// ensure container doesn't allow pointer scroll (we control movement)
	container.style.overflowX = 'hidden';

	var current = 0;

	function clamp(i){ return Math.max(0, Math.min(cards.length - 1, i)); }

	function centerCard(index){
		index = clamp(index);
		var card = cards[index];
		if(!card) return;
		// compute target scrollLeft so the card is centered in the container
		var containerRect = container.getBoundingClientRect();
		var cardRect = card.getBoundingClientRect();
		// card.offsetLeft is relative to the container's content box
		var target = card.offsetLeft + (cardRect.width / 2) - (container.clientWidth / 2);
		// clamp target
		target = Math.max(0, Math.min(target, container.scrollWidth - container.clientWidth));
		container.scrollTo({ left: target, behavior: 'smooth' });
		// update classes
		current = index;
		updateActiveClasses();
	}

	function updateActiveClasses(){
		cards.forEach(function(c, i){
			if(i === current){
				c.classList.add('active');
				c.classList.remove('inactive');
				c.setAttribute('aria-hidden', 'false');
			} else {
				c.classList.remove('active');
				c.classList.add('inactive');
				c.setAttribute('aria-hidden', 'true');
			}
		});
	}

	prev.addEventListener('click', function(){
		centerCard(clamp(current - 1));
	});
	next.addEventListener('click', function(){
		centerCard(clamp(current + 1));
	});

	// keyboard navigation (left/right)
	prev.addEventListener('keydown', function(e){ if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); centerCard(current - 1); } });
	next.addEventListener('keydown', function(e){ if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); centerCard(current + 1); } });

	document.addEventListener('keydown', function(e){
		if(e.key === 'ArrowLeft') centerCard(current - 1);
		if(e.key === 'ArrowRight') centerCard(current + 1);
	});

	// allow clicking a card to center it
	cards.forEach(function(c, i){
		c.style.cursor = 'pointer';
		c.addEventListener('click', function(){ centerCard(i); });
	});

	// set initial position: center the first card after a short delay so layout settles
	window.setTimeout(function(){ centerCard(0); }, 60);

})();

/* Trigger skill-bars fill when About section is visible */
(function(){
	// Replay-capable skill-bar fill. Adds/removes `.has-fill` when #about
	// enters/exits the viewport so the animation can replay, and also
	// injects a small "Replay" button to manually restart the animation.

	var sb = document.querySelector('.skill-bars');
	var about = document.getElementById('about');
	if(!sb || !about) {
		// If either element is missing, try graceful fallback: add class once
		if(sb) sb.classList.add('has-fill');
		return;
	}

	function addFill(){ sb.classList.add('has-fill'); }
	function removeFill(){ sb.classList.remove('has-fill'); }
	function replayFill(){
		// restart CSS animation by removing and re-adding the class
		removeFill();
		// force layout so the subsequent add restarts the transition
		// eslint-disable-next-line no-unused-expressions
		void sb.offsetWidth;
		addFill();
	}

	// Replay button injection removed — keep replayFill() available for manual calls.

	if(!('IntersectionObserver' in window)){
		// fallback: add immediately
		addFill();
		return;
	}

	var io = new IntersectionObserver(function(entries){
		entries.forEach(function(entry){
			if(entry.isIntersecting){
				addFill();
			} else {
				// remove so the animation can run again when re-entering
				removeFill();
			}
		});
	}, { root: null, threshold: 0.25 });

	io.observe(about);
})();

/* Certificate Show More/Less Toggle */
(function(){
	var toggleBtn = document.getElementById('cert-toggle-btn');
	var hiddenCerts = document.querySelectorAll('.cert-item.hidden-cert');
	var certWrapper = document.getElementById('cert-wrapper');
	var isExpanded = false;

	if(!toggleBtn || !hiddenCerts.length) return;

	toggleBtn.addEventListener('click', function(){
		isExpanded = !isExpanded;

		if(isExpanded){
			// Show all certificates with drawer opening effect
			hiddenCerts.forEach(function(cert){
				cert.classList.add('show-cert');
			});

			// Update button text and icon
			toggleBtn.innerHTML = 'Show Less <i class="fa fa-chevron-up"></i>';
			toggleBtn.classList.add('expanded');

			// Re-trigger Masonry layout after animation completes
			setTimeout(function(){
				if($(certWrapper).data('masonry')){
					$(certWrapper).masonry('reloadItems');
					$(certWrapper).masonry('layout');
				}
			}, 700);

		} else {
			// Hide certificates with drawer closing effect
			hiddenCerts.forEach(function(cert){
				cert.classList.remove('show-cert');
			});

			// Update button text and icon
			toggleBtn.innerHTML = 'Show More <i class="fa fa-chevron-down"></i>';
			toggleBtn.classList.remove('expanded');

			// Scroll to certifications section smoothly
			setTimeout(function(){
				var certSection = document.getElementById('certifications');
				if(certSection){
					var yOffset = -100; // offset for fixed header
					var y = certSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
					window.scrollTo({top: y, behavior: 'smooth'});
				}
			}, 200);

			// Re-trigger Masonry layout after animation completes
			setTimeout(function(){
				if($(certWrapper).data('masonry')){
					$(certWrapper).masonry('reloadItems');
					$(certWrapper).masonry('layout');
				}
			}, 600);
		}
	});
})();