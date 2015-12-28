module.exports = function (debug) {
	var database = {
		mysql: require('mysql')
	};
	
	/* Debugging
	 * 	DEBUG=<some name>, <some name>, etc. or DEBUG=* for everything
	 * 
	 * Note: set DEBUG=<this>,<this>,etc.-not_this on Windows
	 */
	database.debug = require('debug')('database');
	
	// Attempt to connect to the database
	require('./connect.js')(database, {
		connectionLimit: 10,
		host: 'moonlit_spring.org',
		user: 'admin',
		password: 'admin'
	}).then(function(conn) {
		// On successful connection, use the connection pool to generate functions for querying from the database
		database.sel = require('./select.js')(conn);
		database.ins = require('./insert.js')(conn);
		database.update = require('./update.js')(conn);
		database.del = require('./delete.js')(conn);
		database.close_connection = require('./close_connection.js')(conn);
	}, function (err) {
		debug(err);
	});
	
	// For when the node.js process itself ends...
	process.on('SIGINT', function() {
		// Close any connections
		if (database.connection) {
			database.close_connection().then(function (success) {
				debug(success);
				debug('I am dying');
				process.exit();
			}, function(err) {
				debug(err);
				debug('Process did not end!');
			});
		} else {
			debug('I am dying');
			process.exit();
		}
	});
	
	return database;
};