'use strict';

var mongoose = require('mongoose'),
						Schema = mongoose.Schema;

var ChatSchema = new Schema({
	Rooms: { type: Schema.Types.ObjectId, ref: 'ChatRoom' }	
});

var ChatRoomSchema = new Schema({
	Message : { type: Schema.Types.ObjectId, ref: 'ChatMessage' }
});

var ChatMessageSchema = new Schema({
	User : { type: Schema.Types.ObjectId, ref: 'User' },
	Text : String,
	Timestamp : { type: Date, default: Date.now }
});

mongoose.model('ChatMessage', ChatMessageSchema);
mongoose.model('ChatRoom', ChatRoomSchema);
mongoose.model('Chat', ChatSchema);							
