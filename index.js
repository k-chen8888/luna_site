var Express = require('express');
var app = Express();

var http = require('http').Server(app),
	port = 1337,
	debug = require(debug)('http');

var modules = require('./modules/modules.js')();

app.use(Express.static('pages'));

app.get('/', function(req,res) {
	console.log(modules.blog.b);
	res.sendFile(__dirname + '/pages/test.html');
});


http.listen(port, function() {
	debug('listening on port *:port');
});