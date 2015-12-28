module.exports = function () {
	var exports = {};
	
	/* MySQL database
	 */
	exports.database = require('./database/database.js')();
	
	/* Login
	 *
	 * Requires a database to query for user data
	 * Requires socket.io to receive and send information
	 * Requires RedisStore to generate cookies and remember who's logged in and for how long
	 */
	exports.login = require('./login/login.js')();
	
	/* Blog
	 * 
	 * Requires a database to perform queries for blog posts
	 */
	exports.blog = require('./blog/blog.js')(exports.database);
	
	/* Chat
	 * 
	 * Requires a database to store chat logs
	 * Requires socket.io to send and receive messages
	 * Requires RedisStore to check if the user is allowed to chat
	 */
	exports.chat = require('./chat/chat.js');
	
	/* Handlers for general pages on the site
	 */
	exports.pages = require('./pages/pages.js')();
	
	return exports;
};