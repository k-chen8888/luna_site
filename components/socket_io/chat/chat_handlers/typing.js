module.exports = function(components) {
	// socket.on('typing', ...)
	// Note: On the front end, condense the message if > 3 people are typing at once
	components.socket_io.chat.chat_handlers.typing_fn = function(socket, is_typing) {
		// Send the message to show the typing dialog if is_typing, otherwise, hide it
		if (is_typing) return;
		else return;
	};
	
	return components;
}