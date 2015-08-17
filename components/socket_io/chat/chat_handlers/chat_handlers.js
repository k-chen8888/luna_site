module.exports = function(components) {
	/* Chat handlers
	 * 
	 * 	chat_message() -> Fired when a user sends a message to the room
	 * 	change_room() -> Fired when a user sends a request to change room
	 * 	typing() -> Fired when a user starts or stops tying into the form 
	 */
	
	components = require('./chat_message.js')(components);
	components = require('./change_room.js')(components);
	components = require('./typing.js')(components);
	
	return components;
}