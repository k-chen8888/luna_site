/* Defines a function that performs an INSERT query given an object consisting of...
 * 	@param(table) is the table in which to INSERT
 * 	@param(columns) is an optional list of columns into which to insert
 * 		Optional in that it's not required if data for each column is given
 * 	@param(data) is the data to be inserted
 * 		If the data is given such that (1) there are a number of inputs equal to the number of columns and (2) the data is in the correct order, then the column labels are not needed
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
				if (params.columns) query += ('(' + params.columns.join(',') + ') ');
				
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