module.exports = function(components) {
	
	// Clicking on links keeps the user's session alive
	components.socket_io.wakeup.wakeup_fn = function() {
		socket.on('wakeup', function() {
			// Set the user's last on time to when they last clicked
		});
	};
	
	return components;
};