/* Required packages */

// express.js
var Express = require('express'),
	app = Express();

// Sessions and data stores
var session = require('express-session'),
	MongoStore = require('connect-mongo')(session);

// Cookies
var CookieParser = require('cookie-parser'),
	ioCookieParser = require('socket.io-cookie');

// HTML form input
var BodyParser = require('body-parser');

// Strips HTML tags out of user input
var striptags = require('striptags'),
	msg_tags = ['a',
				'p',
				
				// Formatting
				'hr',
				'br',
				'strong',
				'i',
				'u',
				's',
				
				// Lists
				'ul',
				'ol',
				'li',
				
				// Headings
				'h1',
				'h2',
				'h3',
				'h4',
				'h5',
				'h6'
				]; // For message input only

// HTTP Server
var http = require('http').Server(app),
	port = 3000;

// socket.io
var io = require('socket.io')(http);

// MongoDB through mongoose
var mongodb = require('./components/db/schema.js')();


/* Cookie data */

/* Key and secret */
var luna_key = 'luna.sid';
var luna_secret = 'bde701b40ca870af68d6a7e0c678fa17400154794511010248fcd129df8889ca'; 

// How long are cookies valid?
var timeout = 7 * 24 * 60 * 60 * 1000; // 1 week


/* Session */

// Session store
var store = new MongoStore({
	mongooseConnection: mongodb.mongoose.connection
});

// Session variable
var luna_session = session({
	key: luna_key,
	secret: luna_secret,
	resave: true,
	saveUninitialized: true,
	store: store,
	cookie: {
		maxAge: timeout
	}
});


/* components.js */

var components = require('./components/components.js')(
	{
		express_pages: __dirname + '/pages/',
		socket_io: io,
		db_tools: mongodb,
		cookie_parser: CookieParser,
		cookie_data: {
			key: luna_key,
			secret: luna_secret
		},
		store: store,
		strip_tags: {
			tool: striptags,
			keep: msg_tags
		}
	}, function(err) {
		if (err) console.log(err);
	}
);


/* express.js middleware */

// Cookies
app.use(CookieParser());

// Add session middleware
app.use(luna_session);

// Static files
app.use(Express.static('pages'));


/* express.js routes */
	
// Home page
app.get('/', function(req, res) {
	if (!components.err) components.express_js.home.home_fn(req, res);
});

// Logout
app.get('/logout', function(req, res) {
	if (!components.err) components.express_js.logout.logout_fn(req, res);
});


/* socket.io handlers */

io.on('connection', function(socket) {
	if (!components.err) components.socket_io.chat.enter_chat(socket);
});


/* Server listens for requests */

http.listen(port, function() {
	console.log('Listening on *:' + port);
});