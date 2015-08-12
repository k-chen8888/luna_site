module.exports = function () {
	var exports = {};
	
	exports.blog = require('./blog/blog.js')();
	return exports;
	
};