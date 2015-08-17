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
		user = require('./app/controllers/users/users.profile.server.controller'),
		usernames = {};

io.on('connection', function (socket) {

	socket.on('addUser', function(username){
		console.log(chalk.red('Adding user: ' + username));
		// store the username in the socket session for this client
		socket.username = username;
		// store the room name in the socket session for this client
		socket.room = 'room1';
		// add the client's username to the global list
		usernames[username] = username;
		// send client to room 1
		socket.join('room1');
		// echo to client they've connected
		socket.emit('updateChat', 'SERVER', 'you have connected to room1');
		// echo to room 1 that a person has connected to their room
		console.log(chalk.red('Firing updateChat!'));
		socket.broadcast.to('room1').emit('updateChat', 'SERVER', username + ' has connected to this room');
		// socket.emit('updaterooms', rooms, 'room1');
	});

	// when the client emits 'sendchat', this listens and executes
	socket.on('sendChat', function (data) {
		// we tell the client to execute 'updatechat' with 2 parameters
		io.sockets.in(socket.room).emit('updateChat', socket.username, data);
	});

	socket.on('switchRoom', function(newroom){
		// leave the current room (stored in session)
		socket.leave(socket.room);
		// join new room, received as function parameter
		socket.join(newroom);
		socket.emit('updateChat', 'SERVER', 'you have connected to '+ newroom);
		// sent message to OLD room
		socket.broadcast.to(socket.room).emit('updateChat', 'SERVER', socket.username+' has left this room');
		// update socket session room title
		socket.room = newroom;
		socket.broadcast.to(newroom).emit('updateChat', 'SERVER', socket.username+' has joined this room');
		// socket.emit('updaterooms', rooms, newroom);
	});

}); // end io.on('connection')

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
