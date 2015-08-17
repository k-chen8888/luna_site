/* socket.io client */
socket = io();

$(window).load(function() {
	// Fire a welcome signal
	socket.emit('welcome', {});
	
	
	/* Client fires socket events at the server */
	
	// Chat with the club
	$('form#inputmsg').submit(function() {
		// Send message
		socket.emit('chat message', $('form#inputmsg #m').val());
		
		// Reset the form
		$('form#inputmsg #m').val('');
		
		// Don't refresh the page
		return false;
	});
	
	// Log In
	$('form#login').submit(function() {
		// Send the login form
		socket.emit('register', {
			user: $("form#login #user").val(),
			pass: $("form#login #pass").val(),
			remember: $("form#login #remember").is(':checked')
		});
		
		// Reset the form
		$('form#login #user').val('');
		$('form#login #pass').val('');
		$('form#login #remember').attr('checked', false);
		
		// Don't refresh the page
		return false;
	});
	
	// Register
	$('form#register').submit(function() {
		// Send the registration form
		socket.emit('register', {
			user: $('form#register #user').val(),
			pass: $('form#register #pass').val(),
			email: $('form#register #email').val()
		});
		
		// Reset the form
		$('form#register #user').val('');
		$('form#register #pass').val('');
		$('form#register #email').val('');
		
		// Don't refresh the page
		return false;
	});
	
	
	/* Client receives socket events from the server */
	
	// Receive a chat message
	socket.on('chat message', function(msg) {
		$('#messages').append($('<li>').append(msg));
		$('#messages').scrollTop($('#messages').scrollTop() + $(window).height());
	});
	
	// Response after logging in
	socket.on('login', function(res) {
		// Error, ask for information again and display error toast
		
		// Success, get rid of login window and reload homepage
		
	});
	
	// Response after register
	socket.on('register', function(res) {
		// Error, ask for information again and display error toast
			
		// Success, get rid of registration window
		
	});
});