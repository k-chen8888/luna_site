module.exports = function(conn) {
	return function() {
		return new Promise(function(resolve, reject) {
			conn.end(function(err) {
				if (err) reject(err);
				else resolve('Connection closed');
			});
		});
	};
};