module.exports = function () {
	var database = {
		mysql: require('mysql')
	};
	
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
		console.log(err);
	});
	
	// For when the node.js process itself ends...
	process.on('SIGINT', function() {
		// Close any connections
		if (database.connection) {
			database.close_connection().then(function (success) {
				console.log(success);
				console.log('I am dying');
				process.exit();
			}, function(err) {
				console.log(err);
				console.log('Process did not end!');
			});
		} else {
			console.log('I am dying');
			process.exit();
		}
	});
	
	return database;
};