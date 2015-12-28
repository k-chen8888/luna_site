/* Defines a function that performs a SELECT query given an object consisting of...
 * 	@param(columns) is a list of columns to include in the output (default *)
 * 	@param(table) is the table in which to look
 * 	@param(where) is a list of condition/comparator/value pairs
 * 		For example, WHERE `friends` = 0 would be given as [['friends', '=', 0]]
 * 		Adding more conditions: [['friends', '=', 0], ['age', '>', 21]]
 * 	@param(limit) defines how many results should be given
 * Promise() resolve()'s an object on success and reject()'s any errors
 */
modules.exports = function(conn) {
	return function(params) {
		return new Promise(function(resolve, reject) {
			conn.getConnection(function(err, connection) {
				// Couldn't get a connection...
				if (err) reject(err);
				
				// Errors in params are not expected because params is generated server-side
				
				// Construct a query
				var query = 'SELECT ';
				
				// Columns to get
				if (params.columns) {
					params.columns.forEach(function(val, i, arr) {
						arr[i] = conn.escape(val);
					});
					query += (params.columns.join(', ') + ' ');
				} else query += '* ';
				
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
				
				// Any restrictions on result quantity?
				if (params.limit) query += (' LIMIT ' + params.limit);
				
				// Use the connection to perform the query
				connection.query(query, function(err, rows) {
					// Something went wrong...
					if (err) {
						connection.release();
						reject(err);
					}
					
					// Done; resolve() data and release the connection back into the pool
					connection.release();
					resolve(rows);
				});
			});
		});
	};
};