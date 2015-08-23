'use strict';

var mongoose = require('mongoose'),
						Schema = mongoose.Schema;

var ChatSchema = new Schema({
	_Room: { type: Schema.Types.ObjectId, ref: 'ChatRoom' }	
});

var ChatRoomSchema = new Schema({
	_Messages : { type: [Schema.Types.ObjectId], ref: 'ChatMessage' }
});

var ChatMessageSchema = new Schema({
	_User : { type: Schema.Types.ObjectId, ref: 'User' },
	Text : String,
	Timestamp : { type: Date, default: Date.now }
});

mongoose.model('ChatMessage', ChatMessageSchema);
mongoose.model('ChatRoom', ChatRoomSchema);
mongoose.model('Chat', ChatSchema);							
