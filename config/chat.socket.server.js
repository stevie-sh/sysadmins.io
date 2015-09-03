'use strict';

/* socket.io chat */
var socket = require('socket.io'),
		http = require('http'),
		chalk = require('chalk'),
		config = require('./config'),
		mongoose = require('mongoose'),
		moment = require('moment'),
		User =  mongoose.model('User'),
		Ticket = mongoose.model('Ticket'),
		ChatMessage = mongoose.model('ChatMessage'),
		ChatRoom = mongoose.model('ChatRoom'),
		Chat = mongoose.model('Chat');		

var SaveChatRoom = function (ticket_id) {
	var chatRoom = new ChatRoom(); 
	chatRoom._Ticket = ticket_id;
	chatRoom.messages = [];
	chatRoom.save(function(err) {
		if (err) throw err;	
	});	
};

module.exports = function(app) {
	var server = http.createServer(app),
	io = socket.listen(server);
	io.on('connection', function (socket) {
		console.log(chalk.red('Got connection'));
		socket.on('addUser', function(username, firstMessageDate, ticketId){
			// store the username in the socket session for this client
			if (!socket.username) {
				socket.username = username;
				console.log(chalk.red('Adding user: ' + username));
			}

			socket.firstMessageDate = firstMessageDate;
			socket.ticketId = ticketId;
			socket.room = ticketId;
			// store the room name in the socket session for this client
			// socket.room = 'room1';
			// send client to room 1
			// socket.join('room1');
			// echo to client they've connected
			// socket.emit('updateChat', 'SERVER-addUser', 'you have connected to room1');
			// echo to room 1 that a person has connected to their room
			// socket.broadcast.to('room1').emit('updateChat', 'SERVER', username + ' has connected to this room');
			// socket.emit('updaterooms', rooms, 'room1');
		});

		// when the client emits 'sendchat', this listens and executes
		socket.on('sendChat', function (data) {
			// Create a new chatmessage object using username	
			User.getUserId(socket.username)
				.then(function(userId) {	
					console.log('sendChat: ' + chalk.red(data));	
					console.log('[chat.socket.server.js] ', socket.ticketId);
					var msg = new ChatMessage({
						_User : userId, 
						_ChatRoom : socket.ticketId,	
						Text : data	
					});

					msg.save(function(err) {
						if (err) console.log(chalk.red(err));	
					});

					// Get the current chat room for this ticket
					ChatMessage.getRoom(socket.ticketId)
						.then(function(chatRoom) {
							console.log('getRoom-Success');
							console.log('[chat.socket.server.js] ', chatRoom._id);
							if (chatRoom._id !== null) {	
								// Push a new message to its array
								new Promise(function(resolve, reject) { 
									ChatRoom.update({_id: chatRoom._id }, {$push: { '_Messages' : msg }}, {upsert:true}, 
											function(err, data){ 
												if (err) reject(err);
												resolve(msg);
											});
								})
								.then(function (msg) {
									console.log(chalk.red('Firing updateChat!'));
									console.log('[chat.socket.server.js] ', chalk.red(socket.room));
									socket.emit('updateChat', socket.username, msg.Text);
									socket.broadcast.to(socket.room).emit('updateChat', socket.username, msg.Text);
									
									// ChatRoom.getMessagesFromDateInRoom(socket.ticketId, socket.firstMessageDate)	
									// 	.then(function(messages) {
									// 		io.sockets.in(socket.room).emit('refreshChat', messages);	
									// 	});
								});
							}
						});
				})
			.catch(function(err) {
				console.error(err);	
			});

	}); // end of send chat

		socket.on('switchRoom', function(newroom){
			console.log('[chat.socket.server.js] ', 'Leaving room: ' + socket.room);	
			// sent message to OLD room
			socket.broadcast.to(socket.room).emit('updateChat', 'SERVER', socket.username+' has left this room');
			// leave the current room (stored in session)
			socket.leave(socket.room);
			console.log('[chat.socket.server.js] ', 'Joining room: ' + newroom);
			// join new room, received as function parameter
			socket.join(newroom);
			socket.emit('updateChat', 'SERVER-switchRoom', 'you have connected to '+ newroom);
			socket.broadcast.to(newroom).emit('updateChat', 'SERVER', socket.username +' has joined this room');
			// update socket session room title
			socket.room = newroom;
			console.log('[chat.socket.server.js] ', chalk.red('User: ' + socket.username + ' joined room: ' + socket.room));	
			
			// Create a new ChatRoom in the DB with the current messages
			ChatRoom.exists(socket.ticketId)
				.then(function(chatRoom) {
					console.log('ChatRoom.exists-success');
					console.log('date: ' + moment(Number(socket.firstMessageDate)).format());	
					ChatRoom.getMessagesFromDateInRoom(socket.ticketId, socket.firstMessageDate)	
						.then(function(messages) {
							socket.emit('refreshChat', messages);	
						});
				})
			.then (null, function(err) {
				console.log('ChatRoom.exists-error');	
				// If chatRoom is []	

				if (err) {	
					if (err.name === 'InexistantChatRoom') {
						console.log(err.name);
						SaveChatRoom(socket.ticketId);
					}
					else if (err.name === 'NullTicketId') {
						console.log(err.name);
						// Find the first ticket available
						new Promise (function (resolve, reject) {
							Ticket.findOne().exec(function (err, ticket) {
								if (err) reject(err);
								resolve(ticket);							
							});
						})
						.then(function(ticket) {
							console.log(err.name + ticket);
							// And join that chatroom if it exists
							ChatRoom.exists(ticket._id)
								.then(null, function(err) {
									console.log(err);
									// If no chat rooms were found	
									if (err.name === 'InexistantChatRoom')
										SaveChatRoom(ticket._id);
								});
						});
					}
				}
			});
			// socket.emit('updaterooms', rooms, newroom);
		}); // end socket.on('switchRoom')

		}); // end io.on('connection')

		// start app
		//app.listen(app.get('port')); //this breaks socket.io
		server.listen(config.port, function(){
			console.log('Listening on http://localhost:%d', config.port);
		});
	};


