module.exports = function(){
	exports = {};
	
	/* Setup */
	
	// Better timekeeping with Moment
	exports.moment = require('moment');
	//exports.mformat = "dddd, MMMM Do YYYY, h:mm:ss a";
	exports.mformat_display = "h:mm a";
	
	// MongoDB through Mongoose
	exports.mongoose = require('mongoose');
	exports.mongoose.connect('mongodb://localhost/luna');
	
	// Authentication
	exports.crypto = require('crypto');
	
	// Set up the connection
	exports.db = exports.mongoose.connection;
	exports.db.on('error', console.error.bind(console, 'connection error:'));
	exports.db.once('open', function(err){
		if (err) console.log(err);
		// Success
	});
	
	
	return exports;
};