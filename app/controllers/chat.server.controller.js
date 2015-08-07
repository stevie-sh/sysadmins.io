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

exports.postMessage = function (req, res) {
	if (req.body) {
		var message = new Message(req.body);
		message.save(function(err) {
			if (err) console.log(err);	
			res.json(message);
		});	
	}
};

exports.createMessage = function (msg) {
	var message = new Message(msg);
	message.save(function(err) {
		if (err) console.log(err);
		//res.json({ message: 'Message successfully created!'});	
	});
};

exports.getMessagesFromDate = function(req, res) {
	var messages = Message.find({Timestamp: { $gte : req.params.date} }, function(err, messages){
		if (err) res.send(err);	
		res.json(messages);		
});


};

exports.getMessages = function (req, res) {
	var messages = Message.find(function (err, messages){
		if (err) res.send(err);
		res.send(messages);		
	});
};
