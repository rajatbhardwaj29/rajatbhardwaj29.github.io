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




	/*-----------------------------------------------------*/
  	/* Navigation Menu
   ------------------------------------------------------ */
   var toggleButton = $('.menu-toggle'),
       nav = $('.main-navigation');

   // toggle button
   toggleButton.on('click', function(e) {

		e.preventDefault();
		toggleButton.toggleClass('is-clicked');
		nav.slideToggle();

	});

   // nav items
  	nav.find('li a').on("click", function() {

   	// update the toggle button
   	toggleButton.toggleClass('is-clicked');
   	// fadeout the navigation panel
   	nav.fadeOut();

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

	/*----------------------------------------------------*/
	/*	Modal Popup
	------------------------------------------------------*/
	$('.item-wrap a').magnificPopup({

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
  

				/*----------------------------------------------------*/
				/* Highlight the current section in the navigation bar
				------------------------------------------------------*/

$(window).on("scroll", function() {
  var currentPos = $(window).scrollTop();

  $('.nav li a').each(function() {
    var sectionLink = $(this);
    // capture the height of the navbar
    var navHeight = $('#nav-wrap').outerHeight() + 1;
    var section = $(sectionLink.attr('href'));

    // subtract the navbar height from the top of the section
    if(section.position().top - navHeight  <= currentPos && sectionLink.offset().top + section.height()> currentPos) {
      $('.nav li').removeClass('current');
      sectionLink.parent().addClass('current');
    } else {
      sectionLink.parent().removeClass('current');
    }
  });
});
					/*----------------------------------------------------*/
					/*	Fade In/Out Primary Navigation
					------------------------------------------------------*/

					   $(window).on('scroll', function() {

							var h = $('header').height();
							var y = $(window).scrollTop();
					      var nav = $('#nav-wrap');

						   if ( (y > h*.20) && (y < h) && ($(window).outerWidth() > 768 ) ) {
						      nav.fadeOut('fast');
						   }
					      else {
					         if (y < h*.20) {
					            nav.removeClass('opaque').fadeIn('fast');
					         }
					         else {
					            nav.addClass('opaque').fadeIn('fast');
					         }
					      }

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
		      url: "/submit",
		      data: $(form).serialize(),
		      beforeSend: function() { 
				$('#submit-old').hide();
				$('#submit-new').fadeIn();
		      	sLoader.fadeIn(); 
				console.log("sending....")
		      },
		      success: function(response) {
				   console.log('message sent')
	            	sLoader.fadeOut(); 
	               $('#message-warning').hide();
	               $('#contactForm').fadeOut();
	               $('#message-success').fadeIn();   
	            },
		      error: function(error) {

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

})(jQuery);
