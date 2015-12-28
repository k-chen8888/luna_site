/* Defines a function that performs an UPDATE query given an object consisting of...
 * 	@param(table) is the table in which to UPDATE entries
 * 	@param(columns) is a list of columns to update information for
 * 	@param(data) is the data to be applied in the update
 * 	@param(where) looks for the entries to be updated
 * 		Omitting this means that all rows are updated!
 * Promise() resolve()'s an object that represents what was inserted on success and reject()'s any errors
 */
modules.exports = function(conn) {
	return function(params) {
		return new Promise(function(resolve, reject) {
			conn.getConnection(function(err, connection) {
				// Couldn't get a connection...
				if (err) reject(err);
				
				// Errors in params are not expected because params is generated server-side
				
				// Construct a query
				var query = 'INSERT INTO ' + params.table + ' ';
				
				// Any columns?
				query += ('(' + params.columns.join(',') + ') ');
				
				// Values
				query += ('(' + params.data.join(',')+ ') ');
				
				// Use the connection to perform the query
				connection.query(query, function(err, rows) {
					// Something went wrong...
					if (err) {
						connection.release();
						reject(err);
					}
					
					// Be sure to commit
					connection.commit(function(err) {
						// Done; resolve() data and release the connection back into the pool
						connection.release();
						
						if (err) {
							reject(connection.rollback(function() {
								throw err;
							});
						} else resolve(rows);
					});
				});
			});
		});
	};
};