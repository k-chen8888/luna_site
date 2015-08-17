module.exports = function(components) {
	// socket.on('chat message', ...)
	components.socket_io.chat.chat_handlers.chat_message_fn = function(socket, msg) {
		// Don't handle empty messages
		if (msg.length == 0) return;
		
		components.io.to(socket.id).emit('chat message', msg);
	};
	
	return components;
};