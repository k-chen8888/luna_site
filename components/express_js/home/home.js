module.exports = function(components) {
	/* Homepage */
	components.express_js.home.home_fn = function(req, res) {
		// Send the home page
		res.sendFile(__dirname + '/pages/index.html');
	};
	
	return components;
};