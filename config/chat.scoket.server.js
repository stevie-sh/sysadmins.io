'use strict';

/* socket.io chat */
var socket = require('socket.io'),
		http = require('http'),
		chalk = require('chalk'),
		config = require('./config'),
		mongoose = require('mongoose'),
		User =  mongoose.model('User'),
		ChatMessage = mongoose.model('ChatMessage'),
		ChatRoom = mongoose.model('ChatRoom'),
		Chat = mongoose.model('Chat');		

module.exports = function(app) {
	var server = http.createServer(app),
	io = socket.listen(server);
	io.on('connection', function (socket) {

		socket.on('addUser', function(username){
			console.log(chalk.red('Adding user: ' + username));
			// store the username in the socket session for this client
			socket.username = username;
			// store the room name in the socket session for this client
			// socket.room = 'room1';
			// send client to room 1
			// socket.join('room1');
			// echo to client they've connected
			// socket.emit('updateChat', 'SERVER-addUser', 'you have connected to room1');
			// echo to room 1 that a person has connected to their room
			console.log(chalk.red('Firing updateChat!'));
			// socket.broadcast.to('room1').emit('updateChat', 'SERVER', username + ' has connected to this room');
			// socket.emit('updaterooms', rooms, 'room1');
		});

		// when the client emits 'sendchat', this listens and executes
		socket.on('sendChat', function (data) {
			// we tell the client to execute 'updatechat' with 2 parameters
			io.sockets.in(socket.room).emit('updateChat', socket.username, data);

			User.getUserId(socket.username)
				.then(function(userId) {	
					var msg = new ChatMessage({
						_User : userId, 
						Text : data	
					})
					.save(function(err) {
						if (err) console.log(chalk.red(err));	
					});
				})
				.catch(function(err) {
					console.error(err);	
				});
		});

		socket.on('switchRoom', function(newroom){
			console.log(newroom);	
			// leave the current room (stored in session)
			socket.leave(socket.room);
			// join new room, received as function parameter
			socket.join(newroom);
			socket.emit('updateChat', 'SERVER-switchRoom', 'you have connected to '+ newroom);
			// sent message to OLD room
			socket.broadcast.to(socket.room).emit('updateChat', 'SERVER', socket.username+' has left this room');
			// update socket session room title
			socket.room = newroom;
			socket.broadcast.to(newroom).emit('updateChat', 'SERVER', socket.username+' has joined this room');
			// socket.emit('updaterooms', rooms, newroom);
		});

	}); // end io.on('connection')

	// start app
	//app.listen(app.get('port')); //this breaks socket.io
	server.listen(config.port, function(){
		console.log('Listening on http://localhost:%d', config.port);
	});
};


