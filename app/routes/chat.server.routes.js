'use strict';
var chat = require('../../app/controllers/chat.server.controller');
 
module.exports = function(app) {
   app.route('/chat').get(chat.index, function (req, res){
    });
	 app.route('/api/chat')
		 .post(chat.postMessage)
		 .get(chat.getMessages);
	 app.route('/api/chat/messages/:date')
		 .get(chat.getMessagesFromDate);
};
