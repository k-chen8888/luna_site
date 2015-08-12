var express = require('express');
var app = express();

var http = require('http').Server(app);

var modules = require('./modules/modules.js')();

app.use(express.static('pages'));

app.get('/', function(req,res) {
	console.log(modules.blog.b);
	res.sendFile(__dirname + '/pages/test.html');
});

http.listen(1337, function() {
	console.log('listening on port 1337');
});