'use strict';

var mongoose = require('mongoose'),
						Schema = mongoose.Schema;

var ChatSchema = new Schema({
	Room : { type: Schema.Types.Mixed, ref: 'ChatRoom' }	 
});

var ChatRoomSchema = new Schema({
	Message : { type: Schema.Types.Mixed, ref: 'ChatMessage' }
});

var ChatMessageSchema = new Schema({
	User : { type: Schema.Types.Mixed, ref: 'User' },
	Text : String,
	Timestamp : { type: Date, default: Date.now }
});

mongoose.model('ChatMessage', ChatMessageSchema);
mongoose.model('ChatRoom', ChatRoomSchema);
mongoose.model('Chat', ChatSchema);							
