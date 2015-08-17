module.exports = function(components) {
	/* Sets up chat routes */
	components.socket_io.chat.chat_handlers = {};
	components = require('./chat_handlers/chat_handlers.js')(components);
	
	// Enters a chat room and sets up the handlers
	components.socket_io.chat.enter_chat = function(socket, next) {
		// Sending a chat message
		socket.on('chat message', function(msg) {
			components.socket_io.chat.chat_handlers.chat_message_fn(socket, msg);
		});
		
		// Changing the room
		socket.on('change room', function(room) {
			components.socket_io.chat.chat_handlers.change_room_fn(socket, room);
		});
		
		// I'm typing... or not... send a signal to turn off the <
		socket.on('typing', function(is_typing) {
			components.socket_io.chat.chat_handlers.typing_fn(socket, is_typing);
		});
	}
	
	return components;
};