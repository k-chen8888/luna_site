module.exports = function(components) {
	/* express.js */
	
	// Homepage
	components.express_js.home = {};
	components = require('./home/home.js')(components);
	
	// Log out
	components.express_js.logout = {};
	components = require('./logout/logout.js')(components);
	
	
	return components;
};