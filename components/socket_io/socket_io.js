module.exports = function(components) {
	/* Chat */
	components.socket_io.chat = {};
	components = require('./chat/chat.js')(components);
	
	/* Login */
	components.socket_io.login = {};
	components = require('./login/login.js')(components);
	
	/* Register */
	components.socket_io.register = {};
	components = require('./register/register.js')(components);
	
	/* Wake-up */
	components.socket_io.wakeup = {};
	components = require('./wakeup/wakeup.js')(components);
	
	return components;
};