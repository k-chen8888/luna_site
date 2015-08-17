module.exports = function(components) {
	/* Log the user out */
	components.express_js.logout.logout_fn = function(req, res) {
		// Clear out the session
		
		// Redirect to home page
		res.redirect('/');
	};
	
	return components;
};