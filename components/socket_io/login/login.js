module.exports = function(components) {
	
	// Allows members to log in
	components.socket_io.login.login_fn = function() {
		socket.on('login', function() {
			
		});
	};
	
	return components;
};