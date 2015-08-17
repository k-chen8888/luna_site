module.exports = function(components) {
	
	// Allows the user to register as a member
	components.socket_io.register.register_fn = function() {
		socket.on('register', function() {
			
		});
	};
	
	return components;
};