/* Defines a function that performs a DELETE query given an object consisting of...
 * Promise() resolve()'s the result of the operation on success and reject()'s any errors
 */
modules.exports = function(conn) {
	return function(params) {
		return new Promise(function(resolve, reject) {
			conn.getConnection(function(err, connection) {
				// Couldn't get a connection...
				if (err) reject(err);
				
				// Errors in params are not expected because params is generated server-side
				
				// Construct a query
				var query = 'DELETE ';
				
				// Table to look in
				query += ('FROM ' + conn.escape(params.table));
				
				// Any conditions?
				if (params.where) {
					query += 'WHERE '
					params.where.forEach(function(val, i, arr) {
						if (i > 0) this += ' AND ';
						
						this += ('`' + val[0] + '` ' + val[1] + ' ' + conn.escape(val[2]));
					}, query);
				}
				
				// Use the connection to perform the query
				connection.query('', function(err, result) {
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