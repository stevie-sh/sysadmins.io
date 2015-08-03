'use strict';
/**
 * Module dependencies.
 */
var init = require('./config/init')(),
		config = require('./config/config'),
		mongoose = require('mongoose'),
		chalk = require('chalk');



/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Bootstrap db connection
var db = mongoose.connect(config.db.uri, config.db.options, function(err) {
	if (err) {
		console.error(chalk.red('Could not connect to MongoDB!'));
		console.log(chalk.red(err));
	}
});
mongoose.connection.on('error', function(err) {
	console.error(chalk.red('MongoDB connection error: ' + err));
	process.exit(-1);
}
);

// Init the express application
var app = require('./config/express')(db);


/* socket.io chat */
var io = require('socket.io'),
		http = require('http'),
		server = http.createServer(app),
		io = io.listen(server),
		chat = require('./app/controllers/chat.server.controller'),
		user = require('./app/controllers/users/users.profile.server.controller');

io.on('connection', function (socket) {
	socket.on('message', function (from, user, msg) {

		console.log('recieved message from', 
				from, 'msg', JSON.stringify(msg));

		console.log('broadcasting message');
		console.log('payload is', msg);
		
	
		chat.createMessage({
			User: user,
			Text: msg,
			Timestamp: Date.now()
		});	
		io.sockets.emit('broadcast', {
			payload: msg,
			source: from
		});
		console.log('broadcast complete');
	});
});

// Bootstrap passport config
require('./config/passport')();

// Start the app by listening on <port>
//app.listen(config.port);


// start app
//app.listen(app.get('port')); //this breaks socket.io
server.listen(config.port, function(){
	console.log('Listening on http://localhost:%d', config.port);
});




// Expose app
exports = module.exports = app;

// Logging initialization
console.log('--');
console.log(chalk.green(config.app.title + ' application started'));
console.log(chalk.green('Environment:\t\t\t' + process.env.NODE_ENV));
console.log(chalk.green('Port:\t\t\t\t' + config.port));
console.log(chalk.green('Database:\t\t\t' + config.db.uri));
if (process.env.NODE_ENV === 'secure') {
	console.log(chalk.green('HTTPs:\t\t\t\ton'));
}
console.log('--');
