module.exports = function(options){
	
	/* Constants */
	
	// The amount of time (milliseconds) to wait before declaring a user "away from keyboard" (disconnected)
	exports.afk = 2500;
	
	// The amount of time (milliseconds) to keep a user logged in if they don't want to be remembered
	exports.forget = 30 * 60 * 1000; // 30 minutes
	
	// Extracted from options
	exports.express_pages = options.express_pages // Location of .html files for res.sendFile(...)
	exports.io = options.socket_io;               // socket.io
	exports.mongodb = options.db_tools;           // Database
	exports.CookieParser = options.cookie_parser; // Cookie parser
	exports.k_chat = options.cookie_data.key;     // Cookie key
	exports.s_chat = options.cookie_data.secret;  // Cookie secret
	exports.store = options.store;                // Data store
	exports.striptags = options.strip_tags.tool;  // Strip HTML tags from messages
	exports.msg_tags = options.strip_tags.keep;   // HTML tags allowed in messages
	
	// Check for missing information
	if (!exports.io) {
		exports.err = {
			type: 'Missing Info',
			msg: new Error('No socket.io')
		};
	}
	if (!exports.mongodb) {
		exports.err = {
			type: 'Missing Info',
			msg: new Error('No database')
		};
	}
	if (!exports.CookieParser || !exports.k_chat || !exports.s_chat) {
		exports.err = {
			type: 'Missing Info',
			msg: new Error('No cookie parser')
		};
	}
	if (!exports.store) {
		exports.err = {
			type: 'Missing Info',
			msg: new Error('No data store')
		};
	}
	
	if (exports.err) {
		console.log('[' + exports.err.type + '] ' + exports.err.msg);
		return exports;
	}
	
	
	/* express.js components */
	exports.express_js = {};
	exports = require('./express_js/express.js')(exports)
	
	
	/* socket.io components */
	exports.socket_io = {};
	exports = require('./socket_io/socket_io.js')(exports);
	
	
	return exports;
};