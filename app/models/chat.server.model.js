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

ChatRoomSchema.statics.getMessagesFromDate = function (date) {
	var _this = mongoose.model('ChatMessage');

	var ret = new Promise (function (resolve, reject) {
		_this.find({ Timestamp : { $gte : date }}).populate('_User', '-password -salt -resetPasswordExpires -resetPasswordToken').exec(function(err, messages) {
			if (err) reject(err);
			resolve(messages);	
		});	
	});

	return ret;
};

mongoose.model('ChatMessage', ChatMessageSchema);
mongoose.model('ChatRoom', ChatRoomSchema);
mongoose.model('Chat', ChatSchema);							
