module.exports = function(components) {
	// socket.on('change room', ...)
	components.socket_io.chat.chat_handlers.change_room_fn = function(socket, room) {
		// Leave the current room
		
		// Confirm that the room is in the database and that the user has access
		
		// Join the room
		socket.join(room);
	};
	
	return components;
}