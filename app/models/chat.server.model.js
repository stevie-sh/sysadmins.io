'use strict';

var mongoose = require('mongoose'),
		moment = require('moment'),
		chalk = require('chalk'),
		Schema = mongoose.Schema;

var ChatSchema = new Schema({
	_Room: { type: Schema.Types.ObjectId, ref: 'ChatRoom' }	
});

var ChatMessageSchema = new Schema({
	_User : { type: Schema.Types.ObjectId, ref: 'User' },
	_ChatRoom : { type: Schema.Types.ObjectId, ref: 'ChatRoom' },	
	Text : String,
	Timestamp : { type: Date, default: Date.now }
});

var ChatRoomSchema = new Schema({
	_Ticket : { type: Schema.Types.ObjectId, ref: 'Ticket' },
	_Messages : [ChatMessageSchema] 
});

ChatRoomSchema.statics.exists = function (ticket_id) {
	var _this = this;	

	return new Promise(function (resolve, reject) {
		console.log('ChatRoomExists: ' + ticket_id);	
		var e = new Error();	
		if (ticket_id === null)	// On refresh
		{
			e.name = 'NullTicketId';
			reject(e);
		}	
		
		_this.find({ _Ticket : ticket_id }).exec(function(err, chatRoom) {
			if (err) reject(err);	
			// The array of chatRoom's matching ticket_id is empty; No chat rooms found
			else if (chatRoom.length === 0) {
				e.name = 'InexistantChatRoom';
				reject(e); 
			}
			resolve(chatRoom);	
		});
	});	
};

/*
 * Used to get a chat room which satisfies the _Ticket, and whose messages.Timestamp is > date
 * Used by socket.on('refreshChat')
 */
ChatRoomSchema.statics.getMessagesFromDateInRoom = function (ticket_id, date) {
	var ChatRoom = this;		// Get's me the ChatRoom model object
	var Message = mongoose.model('ChatMessage');
	
	return new Promise(function (resolve, reject) {
			// Return the ChatRoom that has messges after date, and exists for the given ticket
			ChatRoom.findOne({'_Ticket' : ticket_id}).populate('_Messages._User', '-password -salt -resetPasswordExpires -resetPasswordToken').exec(function (err, chatRoom) {
				if (err) {
					console.log('[chat.server.model.js] ', chalk.red(err));
					reject(err);
				}
				var messages = chatRoom._Messages;
				var ret = []; 
				var mmnt = moment(Number(date));
				console.log(mmnt.format());
				if (messages !== null) {
					messages.forEach(function (val, index, array) {
						if (moment(val.Timestamp) > mmnt)
							ret.push(val);	
					});	
					resolve(ret);
				}
		});	
		});	
};

ChatMessageSchema.statics.getRoom = function (ticket_id) {
	var _this = this;
	var ChatRoom = mongoose.model('ChatRoom');

	return new Promise (function (resolve, reject) {
		ChatRoom.findOne({ _Ticket: ticket_id }).exec(function (err, chatRoom) {
			if (err) reject(err);	
			resolve(chatRoom);
		});	
	});
};

mongoose.model('ChatMessage', ChatMessageSchema);
mongoose.model('ChatRoom', ChatRoomSchema);
mongoose.model('Chat', ChatSchema);							
