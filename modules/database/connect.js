/* Creates a MySQL connection pool given a set of options:
 * 	@param(connectionLimit)
 * 	@param(host)
 * 	@param(user)
 * 	@param(password)
 */
module.exports = function(database, options) {
	return new Promise(function(resolve, reject) {
		if (!options.host || !options.user || !options.password) reject(new Error("Cannot connect to database"));
		
		// Create a connection and resolve() it
		database.connection = database.mysql.createPool(options)
		resolve(database.connection);
	});
};