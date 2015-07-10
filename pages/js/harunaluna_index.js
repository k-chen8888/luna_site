/* Hides the old id and reveals the new one */
var change_hide = function(classname, hide, show) {
	$(classname + '#' + hide).fadeTo(500, 0, function(){
		$(classname + '#' + hide).css({'pointer-events': 'none'});
	});
	
	$(classname + '#' + show).fadeTo(500, 1, function(){
		$(classname + '#' + show).css({'pointer-events': ''});
	});
};

/* Hides everything BUT the given id */
var hideaway = function(classname, id) {
	$(classname).each(function() {
		if ($(this).attr('id') === id) {
			$(this).fadeTo(500, 1);
		} else {
			$(this).fadeTo(500, 0, function(){
				$(this).css({'pointer-events': 'none'});
			});
		}
	});
};

/* Grabs everything that belongs in the slideshow when the window loads, and...
 *  - Hides non-active elements
 *  - Listens for clicks to fade things in and out
 */
$(document).ready(function() {
	var new_height = $(window).height() - $('div.sidebar#right form').height() - 6;
	$('div.sidebar#right #messages').css({'height' : new_height + "px"});
	
	// Changes the height of the message box on resize
	$(window).resize(function(){
		var new_height = $(window).height() - $('div.sidebar#right form').height() - 6;
		$('div.sidebar#right #messages').css({'height' : new_height + "px"});
	});
	
	// The class to work on
	var classname = '.content';
	
	// Keep track of what's visible
	var revealed = 'home';
	$('.sidebar#left ul li a#' + revealed).parent().addClass('active');
	
	// Hide content (except id="home")
	hideaway(classname, revealed);
	
	// Listen for clicks
	// Hide/show content accordingly
	$('.sidebar#left ul li a').click(function(){
		// Only fire if new content will be revealed
		if (revealed !== $(this).attr('id')) {
			// Change what's hidden
			change_hide(classname, revealed, $(this).attr('id'));
			
			// Change active classes
			$(this).parent().addClass('active');
			$('.sidebar#left ul li a#' + revealed).parent().removeClass('active');
			
			// New revealed content
			revealed = $(this).attr('id');
		}
	});
});