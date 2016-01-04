var Express = require('express');
var app = Express();

var http = require('http').Server(app),
	port = 1337;
	debug = require('debug')('http');

//var modules = require('./modules/modules.js')();

app.use(Express.static('pages'));

app.get('/', function(req,res) {
	//console.log(modules.blog.b);
	res.sendFile(__dirname + '/pages/main/test.html');
});


http.listen(port, function() {
	debug('Listening on port *:' + port);
});