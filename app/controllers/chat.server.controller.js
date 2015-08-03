'use strict';

var mongoose = require('mongoose'),
		Chat = mongoose.model('Chat'),
		ChatRoom = mongoose.model('ChatRoom'),
		Message = mongoose.model('ChatMessage');

exports.index = function (req, res) {
    res.render('mvp1', {
        user: req.user || null,
        request: req
    });
};

exports.createMessage = function (msg) {
	var message = new Message(msg);
	message.save(function(err) {
		if (err) console.log(err);
		//res.json({ message: 'Message successfully created!'});	
	});
};

exports.getMessages = function (req, res) {
	var messages = Message.find(function (err, messages){
		if (err) res.send(err);
		res.send(messages);		
	});
};
